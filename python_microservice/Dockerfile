FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /usr/src/app

COPY . .
RUN pip install --no-cache-dir -r ./requirements.txt

EXPOSE 5000
CMD ["gunicorn", "-c", "app/gunicorn_config.py", "app.main:app"]