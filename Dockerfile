FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PORT=8080
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py index.html ./
COPY static ./static

# PicoPaaS rejects root images; a numeric UID avoids file-permission surprises
USER 10001:10001
EXPOSE 8080
CMD exec gunicorn --bind 0.0.0.0:${PORT} --workers 2 app:app
