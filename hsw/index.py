from undetected_chromedriver import Chrome, ChromeOptions;from loguru import logger;from flask import Flask;from flask import request
import httpx,os,json,base64;os.system("cls")


class hsw():
    def __init__(self) -> None:
        chrome_opts = ChromeOptions()
        chrome_opts.add_argument('--lang=en');chrome_opts.add_argument('--no-sandbox');chrome_opts.add_argument('--disable-setuid-sandbox');chrome_opts.add_argument('--disable-infobars');chrome_opts.add_argument('--single-process');chrome_opts.add_argument('--no-zygote');chrome_opts.add_argument('--no-first-run');chrome_opts.add_argument('--window-position=00');chrome_opts.add_argument('--ignore-certificate-errors');chrome_opts.add_argument('--ignore-certificate-errors-skip-list');chrome_opts.add_argument('--disable-dev-shm-usage');chrome_opts.add_argument('--disable-accelerated-2d-canvas');chrome_opts.add_argument('--disable-gpu');chrome_opts.add_argument('--hide-scrollbars');chrome_opts.add_argument('--disable-cpu');chrome_opts.add_argument('--disable-notifications');chrome_opts.add_argument('--disable-background-timer-throttling');chrome_opts.add_argument('--disable-backgrounding-occluded-windows');chrome_opts.add_argument('--disable-breakpad');chrome_opts.add_argument('--disable-component-extensions-with-background-pages');chrome_opts.add_argument('--disable-extensions');chrome_opts.add_argument('--disable-features=TranslateUIBlinkGenPropertyTrees');chrome_opts.add_argument('--disable-ipc-flooding-protection');chrome_opts.add_argument('--disable-renderer-backgrounding');chrome_opts.add_argument('--enable-features=NetworkServiceNetworkServiceInProcess');chrome_opts.add_argument('--force-color-profile=srgb');chrome_opts.add_argument('--metrics-recording-only');chrome_opts.add_argument('--mute-audio');chrome_opts.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0')
        self.driver = Chrome(options=chrome_opts,driver_executable_path="./chromedriver.exe")
        logger.debug("Browser is ready!")

    def _HSW(_self, req_id: str):
                code = httpx.get(_Get_HSW_Code_()).text
                while True: # ?
                    try:return _self.driver.execute_script(f"{code}; return hsw('{req_id}')")
                    except Exception as e:pass



def _Get_HSW_Code_():
    respone = httpx.get("https://hcaptcha.com/1/api.js",headers={'authority': 'hcaptcha.com','accept': 'application/json','accept-language': 'en-US,en;q=0.9','content-length': '0','content-type': 'text/plain','origin': 'https://newassets.hcaptcha.com','referer': 'https://newassets.hcaptcha.com/','sec-fetch-dest': 'empty','sec-fetch-mode': 'cors','sec-fetch-site': 'same-site','sec-gpc': '1','user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'}).text;s = respone.find("https://newassets.hcaptcha.com/captcha/") + 42;f = respone[s:].find("/") + s;o = httpx.get(f'https://hcaptcha.com/checksiteconfig?v={respone[s:f]}&host=accounts.hcaptcha.com&sitekey=f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34&sc=1&swa=1',headers={'authority': 'hcaptcha.com','accept': 'application/json','accept-language': 'en-US,en;q=0.9','content-length': '0','content-type': 'text/plain','origin': 'https://newassets.hcaptcha.com','referer': 'https://newassets.hcaptcha.com/','sec-fetch-dest': 'empty','sec-fetch-mode': 'cors','sec-fetch-site': 'same-site','sec-gpc': '1','user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'}).json()
    l = json.loads(base64.b64decode(str((o["c"]["req"].split(".")[1]) + ("=" * 8)).encode()).decode())["l"] + '/hsw.js'
    return l

    
if __name__ == '__main__':
    print(_Get_HSW_Code_())
    HSW = hsw()
    app = Flask(__name__)
    @app.route('/n')
    def lol():
        req = request.args.get('req')
        return str(HSW._HSW(req))

    app.run('0.0.0.0', 1234)
    

