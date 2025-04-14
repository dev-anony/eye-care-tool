import base64
import queue
import threading
import os
import tensorflow as tf # type: ignore
#import tensorflow.keras as keras # type: ignore
#install below packages
from flask_cors import CORS
import cv2 
from flask import Flask, render_template, request, jsonify # type: ignore
import numpy as np
from PIL import Image

app = Flask(__name__)
CORS(app) 

results_queue = queue.Queue()

model1 = tf.keras.models.load_model(r"./models/acr3origaa2rmsprop09382/multidata GL model.h5")
model2 = tf.keras.models.load_model(r"./models/mildnorm/best_model.h5")
#model3 = tf.keras.models.load_model(r"./models/kcn/kc_model.h5")


UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
UPLOAD2_FOLDER = 'uploads/cropped'
if not os.path.exists(UPLOAD2_FOLDER):
    os.makedirs(UPLOAD2_FOLDER)
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/return', methods=['POST'])
def pre():
    if request.method == 'POST':
        return render_template('index.html')
'''
@app.route('/predictkcn', methods=['POST'])
def predictkc():
    if request.method == 'POST':
        file = request.files['file']
        name = request.form['name']
        age = request.form['age']
        if file:
            result = kcn(file)
            return jsonify({
                'patient': name,
                'age': age,
                'result': result
            })
    #return render_template('index.html')
    return jsonify({'error': 'Invalid request'}), 400
'''

@app.route('/predictgldr', methods=['POST'])
def predict():
    if request.method == 'POST':
        file = request.files['file1']
        cropdata = request.files['file2']
        #image_data = cropdata.read()
        name = request.form['name']
        age = request.form['age']
        #imgout = preprocess_image(imgg)
        ##base64_image = base64.b64encode(image_data).decode('utf-8')
        if file and cropdata:
            #img = cv2.imdecode(np.fromstring(image_data, np.uint8), cv2.IMREAD_COLOR)
            #img = preprocess_image(img)
            file_path = os.path.join(UPLOAD_FOLDER, file.filename)
            file.save(file_path)

            file_path2 = os.path.join(UPLOAD2_FOLDER, file.filename)
            cropdata.save(file_path2)

            image = cv2.imread(file_path)
            #preprocessed_image = cropped(file_path)

            _, buffer = cv2.imencode('.png', image)
            preprocessed_image_base64 = base64.b64encode(buffer).decode('utf-8')

            thread1 = threading.Thread(target=gl, args=(file_path2,))
            thread2 = threading.Thread(target=dr, args=(file_path,))

            thread1.start()
            thread2.start()

            thread1.join()
            thread2.join()

            results = {}
            while not results_queue.empty():
                task_name, result = results_queue.get()
                results[task_name] = result            
            #return render_template('result.html', patient=name, age=age, image=preprocessed_image_base64, result1=results['gl'], result2=results['dr'])
            return jsonify({
                'patient': name,
                'age': age,
                'image': preprocessed_image_base64,
                'result1': results['gl'],
                'result2': results['dr']
            })
    #return render_template('index.html')
    return jsonify({'error': 'Invalid request'}), 400

def preprocess_imagedr(filepath):
    image = cv2.imread(filepath)
    image = cv2.resize(image, (448, 448))
    image = image.astype('float32') / 255
    image = np.expand_dims(image, axis=0)
    return image

def preprocess_image(filepath):
    image = cv2.imread(filepath)
    image = cv2.resize(image, (36, 36))
    image = image.astype('float32') / 255
    image = np.expand_dims(image, axis=0)
    return image

def preprocess_filekcn(file):
    test = pd.read_csv(file)
    names=['Unnamed: 0', 'En.Anterior.', 'idEye', ]
    test.drop(columns=names , axis=1, inplace=True)
    return test

def kcn(file):
    test = preprocess_filekcn(file)
    prediction = model3.predict(test)
    result3 = np.argmax(prediction)
    result3 = process_prediction(result3, 'kcn')
    return result3


def gl(filepath):
    image = preprocess_image(filepath)
    prediction = model1.predict(image)
    result1 = np.argmax(prediction)
    result1 = process_prediction(result1, 'gl')
    results_queue.put(("gl", result1))

def dr(filepath):
    image = preprocess_imagedr(filepath)
    prediction = model2.predict(image)
    result2 = np.argmax(prediction)
    result2 = process_prediction(result2, 'dr')
    results_queue.put(("dr", result2))

def process_prediction(prediction, cd):
    if cd == 'dr':
        if prediction == 0:
            return 'Mild DR not detected'
        if prediction == 1:
            return 'Mild DR'
    if cd == 'gl':
        if prediction == 0:
            return 'No Glaucoma detected'
        #if prediction == 1:
        else:
            return 'Glaucoma Detected'
    if cd == 'kcn':
        if prediction == 0:
            return 'Normal'
        if prediction == 1:
            return 'Suspect'
        if prediction == 2:
            return 'Mild'
        if prediction == 3:
            return 'Keratoconus'


if __name__ == '__main__':
    #app.run(debug=True)
    app.run(host='127.0.0.1', port=6899, debug=True)
