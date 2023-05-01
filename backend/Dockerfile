# Dockerfile for production
FROM python:3.9.10-buster

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends pulseaudio alsa-utils sox libsox-fmt-mp3 psmisc


# Upgrade pip and install requirements
RUN pip install --upgrade pip
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

WORKDIR /app
COPY app.py .

# Set environment variables and start the app
ENV FLASK_APP=app
CMD ["python3", "app.py"]
