FROM python:3.11
WORKDIR /backend
COPY . .
RUN pip install -r requirements.txt
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \ 
    && rm -rf /var/lib/apt/lists/*
EXPOSE 6899
CMD ["python", "app.py"]

#for deploying models maually copy the models folder from project root
#since docker doesn't allow copying files outside build context
#required while working on backend only