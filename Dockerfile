FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app/backend

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY backend/ /app/backend/
COPY frontend/ /app/frontend/

RUN pip install --upgrade pip setuptools \
    && pip install --no-cache-dir -r requirements.txt

RUN chmod +x /app/backend/start.sh

CMD ["/app/backend/start.sh"]
