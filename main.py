from Hcaptcha.hCaptcha import Hcaptcha
from Hcaptcha.RQData import Hcaptcha_REQ
from services.scaffold import Scaffold
from services.update import *;from flask import Flask;import base64;#Installer()
#Scaffold().install()
Installer()

app = Flask(__name__)


@app.route('/hcaptcha/<string:website_url>/<string:site_key>/<string:proxy>')
def lol(website_url, site_key, proxy):
    try:
        website_url = str(website_url);site_key = str(site_key);proxy = str(proxy)
        if proxy == '69':proxy = False
        else: proxy = f"http://{proxy}"
    except:return "Bruh"
    response =  str(Hcaptcha(proxy if not proxy == False else None, site_key,website_url)._())
    if not response == 'None':return str(response), 200
    else:return str(response), 400

    
@app.route('/rq_hcaptcha/<string:website_url>/<string:site_key>/<string:proxy>/<string:rqdata>')
def hcap(website_url, site_key, proxy, rqdata):
    try:
        rqdata = str(str(base64.b64decode(rqdata).decode('utf-8')));website_url = str(website_url);site_key = str(site_key);proxy = str(proxy)
        if proxy == '69':proxy = False
        else: proxy = f"http://{proxy}"
        
    except:return "Bruh"
    response = str(Hcaptcha_REQ(rqdata,proxy if not proxy == False else None, site_key,website_url)._())
    if not response == 'None':return str(response), 200
    else:return str(response), 400


app.run('0.0.0.0', 9999)