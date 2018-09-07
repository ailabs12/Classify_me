import os
import base64
import json
from PIL import Image
import numpy as np
from flask import Flask, render_template, url_for,redirect, request, make_response
from markupsafe import Markup

import emotion_gender_processor as eg_processor

INDEX_PAGE_TEMPLATE = "index.html"
CLASSIFY_IMAGE_TEMPLATE = "classifyImage.html"
UPLOAD_FOLDER = ""
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

UPLOAD_RESULT_FOLDER = os.path.join('static', 'result')

app = Flask(__name__)
app.config['UPLOAD_RESULT_FOLDER'] = UPLOAD_RESULT_FOLDER

@app.route('/')
def index():
    # url_for('static', filename='scripts/webcam.js')
    response = make_response(render_template(INDEX_PAGE_TEMPLATE))
    response.set_cookie('username', 'the username')
    return response

@app.route('/hello')
def hello():
    return 'Hello, world'

@app.route('/classifyImage', methods=['POST'])
def classifyImage():
    # image = request.files['image'].read()
    # print(image[:10], "this is image")
    dataUrl = request.form["dataUrl"]
    print("this is data url", dataUrl[:100])
    content = dataUrl.split(';')[1]
    img_encoded = content.split(',')[1]
    body = base64.decodebytes(img_encoded.encode("utf-8"))    
    prediction_result = eg_processor.process_image(body)

    # print(json.dumps(json_info, ensure_ascii=False, default=str))
    
    print(prediction_result)
    return render_template(CLASSIFY_IMAGE_TEMPLATE, json_result=prediction_result)

def isValidFile(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5000')