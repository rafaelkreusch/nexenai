from db import engine
from sqlmodel import Session, select
from models import Organization

with Session(engine) as session:
    for org in session.exec(select(Organization)).all():
        print(org.id, org.slug, org.webhook_url)
