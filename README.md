# Eye Disease Detection Tool

A smart healthcare web application that uses Deep Learning to detect various eye conditions from retinal images. It provides a user-friendly frontend and a powerful backend that runs pre-trained models to identify issues like Glaucoma, Keratoconus and Diabetic Retinopathy.

 #### Features

- Detects multiple eye diseases using CNN & FCNN models.
- Multithreaded backend for running multiple models efficiently.
- Web interface for image upload and result visualization.
- Separate modules for model training and image preprocessing.

---

## Tech Stack

| Layer      | Tech Used                         |
|------------|-----------------------------------|
| Frontend   | JavaScript (`app.js` and others)  |
| Backend    | Python Flask (`app.py`)           |
| AI Models  | TensorFlow/Keras (CNNs)           |
| Training   | Jupyter Notebooks (`.ipynb`)      |
| Deployment | Docker (separate for frontend/backend) | 
## Getting Started with Docker-Compose

 - Clone the repository:
```bash
git clone https://github.com/dev-anony/eye-care-tool.git
cd eye-care-tool
```

- Start the app using Docker Compose:
	```bash 
	docker-compose up --build 
	```

- Open your browser and go to:
	```
	http://localhost:3000
	```

## Getting Started with Docker

#### Frontend

 - Clone the repository:
```bash
git clone https://github.com/dev-anony/eye-care-tool.git
cd eye-care-tool/frontend
```

- Build the Docker image: 
	```bash 
	docker build -t react . 
	```

- Run the container: 
	```
	bashdocker run -p 3000:3000 react
	```

- Open your browser and go to:
	```
	http://localhost:3000
	```

#### Backend

 - Clone the repository:
```bash
git clone https://github.com/dev-anony/eye-care-tool.git
cd eye-care-tool/backend
```

- Build the Docker image: 
	```bash 
	docker build -t flask . 
	```

- Run the container: 
	```
	bashdocker run -p 6899:6899 flask
	```

## Setting up the environment 

###### Note:  This environment setup is only applicable for models training with basic image processing methods.

[Anaconda](https://www.anaconda.com/) is required to create dev environment.

- Create new environment for the project	
	```bash
	conda create -n myenv python=3.9
	```
-  Activate the environment:    
	```bash
	conda activate myenv
	```
- Install packages from `requirements.txt` using pip:
	```bash
	pip install -r requirements.txt
	```

##  License

This project is licensed under the MIT License.

##  Contributing

Feel free to contribute by submitting issues or pull requests to improve functionality or performance.

	

