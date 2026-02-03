from db import engine
from sqlmodel import Session, select
from models import DeviceSession
with Session(engine) as session:
    updated = 0
    for ds in session.exec(select(DeviceSession)).all():
        if ds.provider != 'uazapi':
            ds.provider = 'uazapi'
            session.add(ds)
            updated += 1
    if updated:
        session.commit()
    print('updated', updated)
