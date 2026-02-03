import io
import os
import secrets
from dataclasses import dataclass
from pathlib import Path
from typing import Optional


@dataclass
class StoredMedia:
    key: str
    url: str
    content_type: str
    size: int


class BaseMediaStorage:
    def save_bytes(
        self,
        data: bytes,
        *,
        filename: Optional[str],
        content_type: Optional[str],
        prefix: Optional[str] = None,
    ) -> StoredMedia:
        raise NotImplementedError

    def build_url(self, key: str) -> str:
        raise NotImplementedError

    def is_local(self) -> bool:
        return False

    @property
    def local_base_path(self) -> Optional[Path]:
        return None


class LocalMediaStorage(BaseMediaStorage):
    def __init__(self, base_dir: Path, public_root: str = "/media") -> None:
        self.base_dir = base_dir
        self.base_dir.mkdir(parents=True, exist_ok=True)
        self.public_root = public_root.rstrip("/") or "/media"

    def save_bytes(
        self,
        data: bytes,
        *,
        filename: Optional[str],
        content_type: Optional[str],
        prefix: Optional[str] = None,
    ) -> StoredMedia:
        name = filename or "media.bin"
        extension = Path(name).suffix or ".bin"
        key_parts = [part for part in (prefix or "").split("/") if part]
        key_parts.append(secrets.token_urlsafe(8) + extension)
        relative = Path(*key_parts)
        target_path = self.base_dir / relative
        target_path.parent.mkdir(parents=True, exist_ok=True)
        with target_path.open("wb") as fp:
            fp.write(data)
        url = f"{self.public_root}/{relative.as_posix()}"
        return StoredMedia(
            key=relative.as_posix(),
            url=url,
            content_type=content_type or "application/octet-stream",
            size=len(data),
        )

    def build_url(self, key: str) -> str:
        clean = key.lstrip("/").replace("\\", "/")
        return f"{self.public_root}/{clean}"

    def is_local(self) -> bool:
        return True

    @property
    def local_base_path(self) -> Optional[Path]:
        return self.base_dir


class S3MediaStorage(BaseMediaStorage):
    def __init__(
        self,
        *,
        bucket: str,
        client,
        prefix: Optional[str] = None,
        public_url: Optional[str] = None,
        signed_expiration: int = 3600,
    ) -> None:
        self.bucket = bucket
        self.client = client
        self.prefix = (prefix or "").strip().strip("/")
        self.public_url = public_url.rstrip("/") if public_url else None
        self.signed_expiration = signed_expiration

    def _build_key(self, filename: Optional[str], prefix: Optional[str]) -> str:
        name = filename or "media.bin"
        extension = Path(name).suffix or ".bin"
        token = secrets.token_urlsafe(8) + extension
        parts = [part for part in (self.prefix or "").split("/") if part]
        if prefix:
            parts.extend(part for part in prefix.split("/") if part)
        parts.append(token)
        return "/".join(parts)

    def save_bytes(
        self,
        data: bytes,
        *,
        filename: Optional[str],
        content_type: Optional[str],
        prefix: Optional[str] = None,
    ) -> StoredMedia:
        key = self._build_key(filename, prefix)
        extra_args = {}
        if content_type:
            extra_args["ContentType"] = content_type
        fileobj = io.BytesIO(data)
        self.client.upload_fileobj(
            fileobj,
            self.bucket,
            key,
            ExtraArgs=extra_args or None,
        )
        url = self.build_url(key)
        return StoredMedia(
            key=key,
            url=url,
            content_type=content_type or "application/octet-stream",
            size=len(data),
        )

    def build_url(self, key: str) -> str:
        clean_key = key.lstrip("/")
        if self.public_url:
            return f"{self.public_url}/{clean_key}"
        return self.client.generate_presigned_url(
            "get_object",
            Params={"Bucket": self.bucket, "Key": clean_key},
            ExpiresIn=self.signed_expiration,
        )


def get_media_storage(data_dir: Path) -> BaseMediaStorage:
    backend = os.getenv("MEDIA_STORAGE_BACKEND", "local").lower()
    if backend == "s3":
        bucket = os.getenv("MEDIA_S3_BUCKET")
        if not bucket:
            raise RuntimeError("MEDIA_S3_BUCKET required for S3 storage")
        try:
            import boto3  # type: ignore
        except ImportError as exc:  # pragma: no cover
            raise RuntimeError("boto3 is required for S3 media storage") from exc
        session = boto3.session.Session(
            aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
            region_name=os.getenv("MEDIA_S3_REGION"),
        )
        client = session.client("s3")
        return S3MediaStorage(
            bucket=bucket,
            client=client,
            prefix=os.getenv("MEDIA_S3_PREFIX", "").strip(),
            public_url=os.getenv("MEDIA_S3_PUBLIC_URL"),
            signed_expiration=int(os.getenv("MEDIA_S3_SIGNED_EXPIRATION", "3600")),
        )
    media_dir = Path(os.getenv("MEDIA_LOCAL_DIR", data_dir / "media"))
    public_root = os.getenv("MEDIA_LOCAL_PUBLIC_ROOT", "/media")
    return LocalMediaStorage(media_dir, public_root=public_root)

