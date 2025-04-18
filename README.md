# 🧿 Eye Disease Detection Tool

A smart healthcare web application that uses Deep Learning to detect various eye conditions from retinal images. It provides a user-friendly frontend and a powerful backend that runs pre-trained models to identify issues like Cataract, Glaucoma, and Diabetic Retinopathy.

---

## 🚀 Features

- 🔍 Detects multiple eye diseases using CNN models
- ⚙️ Multithreaded backend for running multiple models efficiently
- 🌐 Web interface for image upload and result visualization
- 📊 Separate modules for model training and image preprocessing
- 📄 Comes with documentation and an unpublished research paper
- 
---

## 🧠 Tech Stack

| Layer      | Tech Used                         |
|------------|-----------------------------------|
| Frontend   | JavaScript (`app.js` and others)  |
| Backend    | Python Flask (`app.py`)           |
| AI Models  | TensorFlow/Keras or PyTorch (CNNs)|
| Training   | Jupyter Notebooks (`.ipynb`)      |
| Deployment | Docker (separate for frontend/backend) | 

---

## 📁 Project Structure

eye-disease-detector/ │ ├── frontend/ # Frontend files (JS, HTML, CSS) │ └── app.js │ ├── backend/ # Backend Flask API │ ├── app.py │ └── model/ # Contains trained DL models │ ├── notebooks/ # Model training & image processing │ ├── training.ipynb │ └── image_processing.ipynb │ ├── docs/ # Technical documentation │ └── architecture.md │ ├── research/ # Unpublished research paper │ └── paper.pdf │ ├── Dockerfile (x2) # Separate Dockerfiles for frontend & backend ├── docker-compose.yml # (Optional) To run both containers together ├── requirements.txt └── README.md
