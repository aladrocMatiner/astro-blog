FROM python:3.12-alpine
RUN apk add --no-cache docker-cli
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY exporter.py exporter.py
EXPOSE 9800
CMD ["python", "exporter.py"]
