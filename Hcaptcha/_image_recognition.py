import requests,random
from services.hcaptcha_challenger import (HolyChallenger)
from services.settings import *
from services.scaffold import *


headers = {
    'authority': 'imgs.hcaptcha.com',
    'accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'accept-language': 'en-US,en;q=0.9',
    'referer': 'https://newassets.hcaptcha.com/',
    'sec-fetch-dest': 'image',
    'sec-fetch-mode': 'no-cors',
    'sec-fetch-site': 'same-site',
    'sec-gpc': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
}

def _image_recognition(img_url, img_label):
    if img_label.endswith("."):img_label = img_label.rstrip(img_label[-1])
    else: pass
    challenger = HolyChallenger(dir_workspace=DIR_CHALLENGE, dir_model=DIR_MODEL, lang='en', debug=True,path_objects_yaml=PATH_OBJECTS_YAML, onnx_prefix="yolov6n")
    challenger.label = img_label
    model = challenger.switch_solution() 

    data = requests.get(img_url,headers=headers,stream=True).content
    try:_ = model.solution(img_stream=data, label=challenger.label_alias[img_label])
    except KeyError:logger.error(f"Challenge type {img_label} not yet supported.");_ = random.choices([True,False])
    logger.debug(f"SLoved Image: {_}, {img_label}")
    return _


    