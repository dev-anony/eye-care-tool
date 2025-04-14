FROM python:3.11
WORKDIR /back
COPY . .
RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \ 
    && rm -rf /var/lib/apt/lists/*
EXPOSE 6899
CMD ["python", "app.py"]