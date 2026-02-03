from db import get_session
from sqlmodel import select
from models import DeviceSession
with get_session() as session:
    ds = session.exec(select(DeviceSession).order_by(DeviceSession.created_at.desc())).first()
    if ds:
        print(ds.qr_code_payload)
