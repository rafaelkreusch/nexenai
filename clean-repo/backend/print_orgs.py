from db import engine
from models import Organization
from sqlmodel import Session, select
with Session(engine) as session:
    orgs = session.exec(select(Organization)).all()
    for org in orgs:
        print(org.id, org.slug, org.uazapi_server_url, bool(org.uazapi_admin_token))
