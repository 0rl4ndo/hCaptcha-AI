from undetected_chromedriver import Chrome, ChromeOptions;from loguru import logger;from flask import Flask;from flask import request;import logging as uwulog
import httpx,os,json,base64;os.system("cls")


class hsw():
    def __init__(self) -> None:

        logger.debug("Browser is ready!")

    def _HSW(_self, req_id: str):
        try:
                code = _Get_HSW_Code_()
                json_data = {
                    'script': code,
                    'req': req_id
                }
                response = httpx.post('https://hcaptcha.vxxx.cf/hsw', json=json_data).json()
                logger.debug(f'Result: {response["result"]}')
                return response["result"]
        except : return _self._HSW(req_id=req_id)


def _Get_HSW_Code_():
    respone = httpx.get("https://hcaptcha.com/1/api.js",headers={'authority': 'hcaptcha.com','accept': 'application/json','accept-language': 'en-US,en;q=0.9','content-length': '0','content-type': 'text/plain','origin': 'https://newassets.hcaptcha.com','referer': 'https://newassets.hcaptcha.com/','sec-fetch-dest': 'empty','sec-fetch-mode': 'cors','sec-fetch-site': 'same-site','sec-gpc': '1','user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'}).text;s = respone.find("https://newassets.hcaptcha.com/captcha/") + 42;f = respone[s:].find("/") + s;o = httpx.get(f'https://hcaptcha.com/checksiteconfig?v={respone[s:f]}&host=accounts.hcaptcha.com&sitekey=f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34&sc=1&swa=1',headers={'authority': 'hcaptcha.com','accept': 'application/json','accept-language': 'en-US,en;q=0.9','content-length': '0','content-type': 'text/plain','origin': 'https://newassets.hcaptcha.com','referer': 'https://newassets.hcaptcha.com/','sec-fetch-dest': 'empty','sec-fetch-mode': 'cors','sec-fetch-site': 'same-site','sec-gpc': '1','user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'}).json()
    l = json.loads(base64.b64decode(str((o["c"]["req"].split(".")[1]) + ("=" * 8)).encode()).decode())["l"] + '/hsw.js'
    return l

    
if __name__ == '__main__':
    print(_Get_HSW_Code_())
    HSW = hsw()
    app = Flask(__name__)
    log = uwulog.getLogger('werkzeug')
    log.disabled = True
    app.logger.disabled = True

    @app.route('/n')
    def lol():
        req = request.args.get('req')
        return str(HSW._HSW(req))

    app.run('0.0.0.0', 1234)
    

