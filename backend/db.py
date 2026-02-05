import logging
import os
import re
from pathlib import Path
from typing import Iterable, Tuple

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.exc import OperationalError
from sqlmodel import SQLModel, Session

DATA_DIR = Path(__file__).resolve().parent / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)
DATABASE_FILE = DATA_DIR / "chat.db"
logger = logging.getLogger("chatdevalor.db")

def _create_engine(url: str) -> Tuple[Engine, bool]:
    is_sqlite = url.startswith("sqlite")
    connect_args: dict = {}
    if is_sqlite:
        connect_args["check_same_thread"] = False
    engine = create_engine(url, echo=False, **({"connect_args": connect_args} if connect_args else {}))
    return engine, is_sqlite


DATABASE_URL = os.getenv("DATABASE_URL") or f"sqlite:///{DATABASE_FILE}"
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = "postgresql://" + DATABASE_URL[len("postgres://") :]
engine, IS_SQLITE = _create_engine(DATABASE_URL)

if not IS_SQLITE:
    try:
        with engine.connect():
            pass
    except OperationalError as exc:
        fallback_url = f"sqlite:///{DATABASE_FILE}"
        logger.warning(
            "Falha ao conectar no banco %s (%s); voltando para SQLite local %s.",
            DATABASE_URL,
            exc,
            fallback_url,
        )
        engine, IS_SQLITE = _create_engine(fallback_url)
        DATABASE_URL = fallback_url


def init_db() -> None:
    import models  # noqa: F401 - ensure models are registered

    SQLModel.metadata.create_all(engine)
    apply_migrations()


def apply_migrations() -> None:
    """Execute simple in-place migrations for existing SQLite databases."""

    if not DATABASE_URL.startswith("sqlite"):
        return

    migrations: Iterable[tuple[str, str, str]] = [
        ("user", "organization_id", "INTEGER REFERENCES organization(id)"),
        ("user", "is_admin", "BOOLEAN DEFAULT 0"),
        ("conversation", "organization_id", "INTEGER REFERENCES organization(id)"),
        ("conversation", "owner_user_id", "INTEGER REFERENCES user(id)"),
        ("devicesession", "organization_id", "INTEGER REFERENCES organization(id)"),
        ("devicesession", "owner_user_id", "INTEGER REFERENCES user(id)"),
        ("devicesession", "integration_base_url", "TEXT"),
        ("devicesession", "integration_instance_id", "TEXT"),
        ("devicesession", "integration_token", "TEXT"),
        ("message", "author_user_id", "INTEGER REFERENCES user(id)"),
        ("message", "message_type", "TEXT DEFAULT 'text'"),
        ("message", "media_path", "TEXT"),
        ("message", "media_content_type", "TEXT"),
        ("message", "media_size_bytes", "INTEGER"),
        ("message", "media_duration_seconds", "REAL"),
        ("message", "integration_message_id", "TEXT"),
        ("message", "reply_to_message_id", "INTEGER REFERENCES message(id)"),
        ("tag", "owner_user_id", "INTEGER REFERENCES user(id)"),
    ]

    username_pattern = re.compile(r"[^a-z0-9._]")

    with engine.begin() as conn:
        def column_exists(table: str, column: str) -> bool:
            result = conn.exec_driver_sql(f"PRAGMA table_info('{table}')").fetchall()
            return any(row[1] == column for row in result)

        for table, column, ddl in migrations:
            if not column_exists(table, column):
                conn.exec_driver_sql(f"ALTER TABLE {table} ADD COLUMN {column} {ddl}")

        rows = conn.exec_driver_sql("SELECT id, username FROM user").fetchall()
        seen = set()
        for user_id, username in rows:
            normalized = username.lower().strip() if username else ""
            normalized = username_pattern.sub("_", normalized)
            normalized = normalized.strip("_") or f"user_{user_id}"
            base = normalized
            counter = 1
            while normalized in seen:
                normalized = f"{base}_{counter}"
                counter += 1
            if normalized != username:
                conn.exec_driver_sql(
                    "UPDATE user SET username = ? WHERE id = ?", (normalized, user_id)
                )
            seen.add(normalized)

        # backfill owner for conversations and author for messages
        admin_row = conn.exec_driver_sql(
            "SELECT id FROM user WHERE username = ?", ("admin",)
        ).fetchone()
        admin_id = admin_row[0] if admin_row else None
        if not admin_id:
            first_row = conn.exec_driver_sql(
                "SELECT id FROM user ORDER BY id LIMIT 1"
            ).fetchone()
            admin_id = first_row[0] if first_row else None
        if admin_id:
            conn.exec_driver_sql(
                "UPDATE conversation SET owner_user_id = ? WHERE owner_user_id IS NULL",
                (admin_id,),
            )
            conn.exec_driver_sql(
                "UPDATE message SET author_user_id = ? WHERE author_user_id IS NULL",
                (admin_id,),
            )
        conn.exec_driver_sql(
            "UPDATE user SET is_admin = 1 WHERE username = ?", ("admin",)
        )

        conn.exec_driver_sql(
            "CREATE UNIQUE INDEX IF NOT EXISTS uq_user_username ON user (username)"
        )


def get_session() -> Session:
    with Session(engine) as session:
        yield session
