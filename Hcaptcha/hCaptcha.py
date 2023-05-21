import httpx,random,json,datetime,urllib,threading,base64
from ._image_recognition import _image_recognition
from services.settings import *



baseheader = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
    'Accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Origin': 'https://newassets.hcaptcha.com',
    'DNT': '1',
    'Alt-Used': 'hcaptcha.com',
    'Connection': 'keep-alive',
    'Referer': 'https://newassets.hcaptcha.com/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
}

cookies = {
    'hc_accessibility': '2TvnAJH8ziaZ2vtQdHGkMqvT1IHW8WOHTYIFBYNSZ2+rj8/YvAUNmA44mc3x/Q6xmPOFlkbsVTymK83o/kjOEe7ezdddHLfBvvu0dIGWA56B4k5nr6u0hULA+4OypCMgF6eJr7SlX/VEoilNbO28FTLtSDPUL+sk+CzHvnmmHxV7Q6OenB9qxlxSJbDWONyTTvZwEzvHCvh05rYDYuXtzwPMOyUCmCsjwl/+TO+OsDVE3KSwEt7QP6lLrkQ8xQh5FLlaUFIofDRT9qalr9+PIRXIt0TYGjYxcXZ7madoLf6jm45UuWILR5H5xnEgErrKGmohifjPf+o9J0+o+RWRFytocxWxvCXuBwi5/TnSI71MtRGj9RcE2NWbA9LhZMjrRy4Rl7HS6VTR3r5lr8xCMsoeDFbRP6borF2yJtHJ2FDRODwhlgNvUsQRjnt7ewI1btHdVSo1D3IatKOHAwvO5pmSCZjihb71jPdmC1KOpNWlT8ZMowqMejjaivMWok+MnipntdYjeg6FL/JGC9YNZVyb2GPkO/r4rh0dKbwi0Y5nK2kE976SLDHr18o/vviz07jNaGKUAAhtTbDIGv5IJfduYOWP4HclH8TbE2zFhIinU1iCLiiqYH6fMxTrlXaVLd9MeoH8h6rFmc3m//NT5bj/SbGCxidO2sc0HpZlLfkGUN5dHOl3ZmBRbXgtqcJPUQ+AfLvLaRyEfzhCEdf9ogx+O5GGTH3bBq2wrjZ4+WQpIhCZeaPVN1NiY9PpgwqcMzN3AF4N5dZFKJ1hq0xvWA1cTX3/MYWGQVewgt+T4Ek0A0XlEQBjNsrul7bm+hApg4+AfdVXbOlYNZSwnz+2bNSjt9/XV2ZK+n1WxCUDJljLsBDguVHK3Jr5yAic57GOy0UchohQiiwbqZDukSYYzkjnMUKX0q14okty1rhlVC5kITa+cvBI6kLoR4Bdgp7pqeOoIW7yCof80sM956TxmudYKzQd1rv6jkqdphADaT62VV7hiyDJI6dMVAJ7WOrRm4SSei2qhZzXe6HYN4ptULDnXXzNaqw0tUT26PbBD6RjvdvH6vSpe//cDPMApM9kj7O6RiZiHJgASLE7JJ/Y+h8FuQ2eeDVsCHAKDVr/PXE=N5GYADwK5zyungBt'
}


_version = "a0e2c1c"

class Hcaptcha():
    def __init__(self, proxy: str = None, site_key: str = '4c672d35-0701-42b2-88c3-78380b0db560', website_url: str = 'discord.com') -> None:
        self._client = httpx.Client(proxies=proxy,timeout=3000)#,cookies=cookies
        self._client.headers = baseheader
        self.site_key = site_key
        self.website = website_url
        
        self.retry = 0
    
    def _Cheak_Captcha_MotionData(self):
        return "{\"st\":1665489226791,\"dct\":1665489226791,\"mm\":[[3,244,1665489227581],[20,243,1665489227598],[38,244,1665489227615],[54,248,1665489227631],[71,254,1665489227647],[90,262,1665489227664],[110,272,1665489227681],[134,283,1665489227698],[156,294,1665489227715],[181,303,1665489227731],[204,310,1665489227748],[225,317,1665489227764],[242,323,1665489227781],[256,326,1665489227798],[268,329,1665489227815],[274,331,1665489227831],[278,331,1665489227848],[280,332,1665489227864],[281,332,1665489227881],[283,332,1665489227898],[287,332,1665489227915],[293,332,1665489227931],[301,331,1665489227948],[311,330,1665489227964],[320,327,1665489227981],[330,323,1665489227998],[339,319,1665489228015],[347,315,1665489228031],[355,309,1665489228047],[361,304,1665489228064],[365,298,1665489228081],[369,292,1665489228098],[371,285,1665489228114],[372,277,1665489228131],[372,268,1665489228148],[371,260,1665489228165],[370,251,1665489228181],[370,244,1665489228214],[370,235,1665489228232],[366,227,1665489228265],[364,224,1665489228281],[360,219,1665489228298],[357,215,1665489228315],[354,212,1665489228331],[352,210,1665489228347],[351,210,1665489228364],[351,209,1665489228381],[350,209,1665489228465],[347,210,1665489228481],[339,212,1665489228498],[325,217,1665489228514],[309,225,1665489228531],[287,236,1665489228548],[263,252,1665489228565],[240,270,1665489228581],[215,292,1665489228598],[192,312,1665489228614],[173,328,1665489228631],[156,340,1665489228648],[143,347,1665489228665],[136,351,1665489228681],[133,353,1665489228698],[130,353,1665489228714],[125,353,1665489228731],[118,351,1665489228747],[110,348,1665489228764],[105,345,1665489228781],[103,343,1665489228798],[102,344,1665489228909],[100,351,1665489228931],[96,360,1665489228948],[93,372,1665489228965],[90,385,1665489228981],[87,403,1665489228997],[84,426,1665489229014],[81,451,1665489229031],[77,473,1665489229048],[75,489,1665489229064],[75,496,1665489229081],[75,497,1665489229098],[76,497,1665489229189],[82,497,1665489229214],[91,495,1665489229231],[106,493,1665489229248],[123,490,1665489229264],[140,488,1665489229281],[158,483,1665489229298],[173,478,1665489229314],[186,474,1665489229331],[201,470,1665489229347],[216,468,1665489229365],[233,466,1665489229381],[251,466,1665489229398],[271,466,1665489229414],[291,468,1665489229431],[314,471,1665489229448],[333,472,1665489229464],[344,472,1665489229481],[351,472,1665489229497],[352,472,1665489229514],[353,476,1665489229681],[352,484,1665489229697],[351,493,1665489229714],[351,504,1665489229731],[351,517,1665489229747],[353,528,1665489229765],[356,539,1665489229781],[359,549,1665489229798],[362,556,1665489229814],[365,561,1665489229830],[365,563,1665489229847],[366,566,1665489229864],[366,568,1665489229881],[366,569,1665489229897],[367,570,1665489229914],[369,573,1665489229931],[371,576,1665489229948],[372,578,1665489229964],[373,578,1665489229998],[373,577,1665489230080],[373,576,1665489230098],[371,574,1665489230114],[370,571,1665489230131],[369,569,1665489230148],[367,568,1665489230164],[367,567,1665489230181],[366,567,1665489230198]],\"mm-mp\":20.130769230769232,\"md\":[[351,209,1665489228420],[103,343,1665489228824],[75,497,1665489229098],[352,472,1665489229560],[367,567,1665489230188]],\"md-mp\":442,\"mu\":[[344,211,1665489228488],[102,344,1665489228909],[76,497,1665489229189],[352,472,1665489229639],[366,567,1665489230263]],\"mu-mp\":443.75,\"topLevel\":{\"st\":1665489223410,\"sc\":{\"availWidth\":1920,\"availHeight\":1050,\"width\":1920,\"height\":1080,\"colorDepth\":24,\"pixelDepth\":24,\"top\":0,\"left\":0,\"availTop\":0,\"availLeft\":0,\"mozOrientation\":\"landscape-primary\",\"onmozorientationchange\":null},\"nv\":{\"permissions\":{},\"pdfViewerEnabled\":true,\"doNotTrack\":\"1\",\"maxTouchPoints\":0,\"mediaCapabilities\":{},\"oscpu\":\"Windows NT 10.0; Win64; x64\",\"vendor\":\"\",\"vendorSub\":\"\",\"productSub\":\"20100101\",\"cookieEnabled\":true,\"buildID\":\"20181001000000\",\"mediaDevices\":{},\"serviceWorker\":{},\"credentials\":{},\"clipboard\":{},\"mediaSession\":{},\"webdriver\":false,\"hardwareConcurrency\":12,\"geolocation\":{},\"appCodeName\":\"Mozilla\",\"appName\":\"Netscape\",\"appVersion\":\"5.0 (Windows)\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0\",\"product\":\"Gecko\",\"language\":\"en-US\",\"languages\":[\"en-US\",\"en\"],\"locks\":{},\"onLine\":true,\"storage\":{},\"plugins\":[\"internal-pdf-viewer\",\"internal-pdf-viewer\",\"internal-pdf-viewer\",\"internal-pdf-viewer\",\"internal-pdf-viewer\"]},\"dr\":\"\",\"inv\":false,\"exec\":false,\"wn\":[[1292,937,1,1665489223412]],\"wn-mp\":0,\"xy\":[[0,0,1,1665489223412],[0,4,1,1665489224365],[0,23,1,1665489224382],[0,88,1,1665489224399],[0,176,1,1665489224415],[0,306,1,1665489224432],[0,423,1,1665489224448],[0,504,1,1665489224465],[0,566,1,1665489224482],[0,604,1,1665489224499],[0,612,1,1665489224516],[0,611,1,1665489224732],[0,580,1,1665489224748],[0,454,1,1665489224764],[0,290,1,1665489224782],[0,153,1,1665489224798],[0,50,1,1665489224815],[0,1,1,1665489224831],[0,0,1,1665489224848],[0,1,1,1665489225932],[0,6,1,1665489225948],[0,41,1,1665489225966],[0,147,1,1665489225982],[0,307,1,1665489225999],[0,444,1,1665489226015],[0,550,1,1665489226032],[0,627,1,1665489226049],[0,685,1,1665489226065],[0,713,1,1665489226081],[0,714,1,1665489226098],[0,690,1,1665489226398],[0,501,1,1665489226415],[0,333,1,1665489226432],[0,193,1,1665489226448],[0,80,1,1665489226465],[0,11,1,1665489226482],[0,0,1,1665489226498]],\"xy-mp\":85.72222222222223,\"mm\":[[1289,538,1665489223749],[1244,530,1665489223765],[1208,522,1665489223782],[1173,519,1665489223799],[1147,517,1665489223815],[1129,517,1665489223831],[1116,518,1665489223848],[1104,521,1665489223864],[1094,525,1665489223881],[1081,529,1665489223898],[1064,534,1665489223915],[1046,538,1665489223931],[1022,544,1665489223949],[998,550,1665489223965],[975,556,1665489223982],[948,565,1665489223998],[918,575,1665489224015],[890,584,1665489224031],[859,594,1665489224048],[829,603,1665489224064],[802,610,1665489224082],[778,616,1665489224098],[750,621,1665489224115],[723,626,1665489224132],[699,630,1665489224148],[687,632,1665489224165],[671,635,1665489224181],[663,636,1665489224198],[657,637,1665489224215],[650,638,1665489224232],[642,640,1665489224248],[637,642,1665489224265],[633,643,1665489224281],[624,646,1665489224298],[613,652,1665489224314],[602,658,1665489224331],[586,663,1665489224348],[570,673,1665489224365],[559,695,1665489224381],[541,766,1665489224398],[532,858,1665489224415],[529,991,1665489224432],[528,1110,1665489224448],[528,1194,1665489224465],[530,1258,1665489224482],[531,1296,1665489224498],[531,1305,1665489224516],[532,1305,1665489224549],[535,1304,1665489224565],[542,1302,1665489224582],[551,1299,1665489224598],[559,1295,1665489224615],[566,1291,1665489224631],[575,1284,1665489224648],[585,1275,1665489224664],[593,1265,1665489224682],[602,1253,1665489224698],[610,1246,1665489224715],[613,1244,1665489224731],[614,1213,1665489224748],[614,924,1665489224782],[615,684,1665489224815],[616,635,1665489224831],[616,635,1665489224848],[617,635,1665489224932],[618,635,1665489224948],[619,636,1665489224965],[620,636,1665489225115],[623,630,1665489225131],[625,620,1665489225148],[627,606,1665489225164],[628,590,1665489225181],[625,570,1665489225199],[621,548,1665489225215],[616,526,1665489225232],[609,503,1665489225248],[574,509,1665489225716],[577,519,1665489225732],[580,537,1665489225749],[588,558,1665489225765],[598,580,1665489225781],[612,605,1665489225798],[627,631,1665489225816],[668,674,1665489225848],[698,691,1665489225865],[731,704,1665489225882],[766,717,1665489225898],[797,731,1665489225915],[821,743,1665489225932],[840,758,1665489225948],[856,797,1665489225966],[868,903,1665489225982],[878,1062,1665489225999],[883,1199,1665489226015],[886,1305,1665489226032],[887,1382,1665489226049],[888,1441,1665489226065],[889,1474,1665489226382],[890,1460,1665489226398],[890,1282,1665489226415],[890,1115,1665489226432],[884,782,1665489226815],[870,782,1665489226832],[854,783,1665489226848],[815,790,1665489226865],[773,798,1665489226882],[727,800,1665489226898],[681,800,1665489226915],[639,797,1665489226931],[595,793,1665489226949],[545,786,1665489226981],[498,780,1665489226998],[481,775,1665489227014],[472,772,1665489227031],[468,769,1665489227049],[465,766,1665489227082],[460,762,1665489227098],[452,756,1665489227115],[442,747,1665489227131],[429,737,1665489227148],[420,728,1665489227165],[410,715,1665489227181],[409,703,1665489227198],[413,690,1665489227214],[424,675,1665489227231],[437,659,1665489227248],[452,642,1665489227265],[466,627,1665489227281],[481,609,1665489227297],[491,585,1665489227314],[497,556,1665489227331],[498,529,1665489227348],[496,508,1665489227364],[491,491,1665489227381],[484,477,1665489227397],[479,466,1665489227414],[478,459,1665489227431],[478,454,1665489227447],[481,447,1665489227464],[486,441,1665489227481],[493,434,1665489227497],[502,427,1665489227514],[513,421,1665489227531],[526,416,1665489227548],[541,412,1665489227564]],\"mm-mp\":25.697986577181215},\"v\":1}".replace('1665489', str(round(datetime.datetime.now().timestamp()))[:7])


    def _HSW(self, _req):
        while True: # ?
            try:response = httpx.get(f'http://127.0.0.1:1234/n?req={_req}', timeout=3000); return response.text
            except:pass

    def _Get_Task(self):
        logger.debug("Geting Task.")
        payload = {
            'v': _version,
            'host': self.website,
            'sitekey': self.site_key,
            'sc': '1',
            'swa': '1',
        } #🤷‍♂️
        self._client.headers['Content-Length'] = '0'
        self._client.headers['Content-Type'] = 'text/plain'
        response = self._client.post(f'https://hcaptcha.com/checksiteconfig?v={_version}&host={self.website}m&sitekey={self.site_key}&sc=1&swa=1')

        try:self._client.headers.pop('Content-Length') 
        except:pass


        return response.json()

    def _Get_Captcha(self, Task):
        p = {
            'v': _version,
            'sitekey': self.site_key,
            'host': self.website,
            'hl': 'en',
            'motionData': self._Cheak_Captcha_MotionData(),
            'n': self._HSW(Task['c']['req']),
            'c': json.dumps(Task['c'])
        }
        payload = urllib.parse.urlencode(p)
        self._client.headers['Content-Length'] = str(len(payload))
        self._client.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        response = self._client.post(f'https://hcaptcha.com/getcaptcha/{self.site_key}', data=payload)
        #print(response.json())
        try:self._client.headers.pop('Content-Length') 
        except:pass

        #print(f"[{Fore.LIGHTGREEN_EX}CAPTCHA{Fore.RESET}] Get Captcha.")

        return response.json()

    def _Image_Recognition(self, type, img):
        #try: img_type = base64.b64encode(img.encode("utf-8")).decode(); img_url = base64.b64encode(type.encode("utf-8")).decode(); response = httpx.get(f'http://127.0.0.1:1337/check/{img_type}/{img_url}', timeout=3000); return True if response.text == "True" else False
        #except Exception as e:
            #print(f'[{Fore.LIGHTRED_EX}ERROR{Fore.RESET}] Captcha Image Recognition Error: {e} ') # IR = Image Recognition
            #return random.choices([True, False]) # 🍀
        return _image_recognition(img_url=img,img_label=type)

    def _slove(self, Task): 
        answers = {}
        #print(Task)
        if not 'containing a ' in Task['requester_question']['en']: obj = Task['requester_question']['en'].split('Please click each image containing an ')[1].strip()
        else: obj = Task['requester_question']['en'].split('Please click each image containing a ')[1].strip()
        
        #print(f"[{Fore.LIGHTGREEN_EX}CAPTCHA{Fore.RESET}] Get Question: {obj}")
        logger.debug(f"Get Question: {obj}")

        
        def x_(task): answers[task['task_key']] = str(self._Image_Recognition(obj, task["datapoint_uri"])).replace(" ", "").lower(); 
        
        for _o in Task['tasklist']: threading.Thread(target=x_,args=[_o]).start()
        
        payload = {
            'v': _version,
            'job_mode': 'image_label_binary',
            'answers': answers,
            'serverdomain': self.website,
            'sitekey': self.site_key,            
            'motionData': self._Cheak_Captcha_MotionData(),
            'n': self._HSW(Task['c']['req']),
            'c': json.dumps(Task['c']),
            }
        #print(payload)

        self._client.headers['Content-Length'] = str(len(json.dumps(payload)))
        self._client.headers['Content-Type'] = 'application/json;charset=UTF-8'
        response = self._client.post(f'https://hcaptcha.com/checkcaptcha/{Task["key"]}?s={self.site_key}', json=payload)
        
        try:self._client.headers.pop('Content-Length')
        except:pass

        if 'generated_pass_UUID' in str(response.text):
            if response.json()['pass']: return response.json()['generated_pass_UUID'] 

        else:
            #print(f"[{Fore.LIGHTRED_EX}ERROR{Fore.RESET}] Captcha Error: {response.json()}")
            logger.error(f"Captcha Error: {response.json()}")

            pass

    def _(self):
        try:
            _Task = self._Get_Task();#print(_Task); 
            _Captcha = self._Get_Captcha(Task=_Task);#print(_Captcha)
            
            if 'generated_pass_UUID' in str(_Captcha): # 🤷‍♂️
                return _Captcha['generated_pass_UUID'] 
            
            Sloved = self._slove(_Captcha); return Sloved # Finished 🗿
        except Exception as e:
                print(e)
                if self.retry == 3:
                    return None
                self.retry +=1
                self._()
                
