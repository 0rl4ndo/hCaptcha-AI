from flask import Flask
from Hcaptcha._image_recognition import _image_recognition
import base64

app = Flask(__name__)

@app.route('/check/<string:img_type>/<string:img_url>')
def show_post(img_type, img_url):
    try:
        img_type_decoded = str(base64.b64decode(img_type).decode('utf-8'))
        img_url_decoded = str(base64.b64decode(img_url).decode('utf-8'))
    except: return "bruh"
        
    response = _image_recognition(img_url_decoded, img_type_decoded)
    return str(response)

app.run('0.0.0.0', 6969)