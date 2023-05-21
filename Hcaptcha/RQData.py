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

class Hcaptcha_REQ():
    def __init__(self,RQData, proxy: str = None, site_key: str = '4c672d35-0701-42b2-88c3-78380b0db560', website_url: str = 'discord.com') -> None:
        self._client = httpx.Client(proxies=proxy,cookies=cookies,timeout=3000)
        self._client.headers = baseheader
        self.site_key = site_key
        self.website = website_url
        self.RQData = RQData
        self.retry = 0
    
    def _Cheak_Captcha_MotionData(self):
        return "{\"st\":1665051623226,\"dct\":1665051623226,\"mm\":[[118,118,1665051623310],[117,119,1665051623327],[117,120,1665051623343],[117,122,1665051623361],[128,129,1665051623377],[158,142,1665051623393],[196,154,1665051623415],[306,173,1665051623443],[365,178,1665051623464],[374,194,1665051623761],[304,279,1665051623793],[273,314,1665051623811],[239,343,1665051623827],[207,362,1665051623843],[186,367,1665051623860],[155,365,1665051623877],[129,351,1665051623894],[104,330,1665051623910],[81,299,1665051623927],[61,266,1665051623943],[48,238,1665051623960],[38,201,1665051623977],[39,175,1665051623994],[49,159,1665051624010],[64,155,1665051624027],[81,152,1665051624043],[101,151,1665051624060],[127,152,1665051624077],[156,157,1665051624093],[187,165,1665051624110],[222,177,1665051624127],[255,189,1665051624143],[288,200,1665051624160],[322,210,1665051624177],[357,220,1665051624193],[391,229,1665051624210],[386,299,1665051624993],[364,296,1665051625010],[335,291,1665051625027],[302,284,1665051625043],[267,277,1665051625060],[227,269,1665051625077],[189,262,1665051625093],[159,256,1665051625110],[137,251,1665051625126],[123,248,1665051625144],[117,246,1665051625160],[112,244,1665051625177],[111,244,1665051625194],[112,244,1665051625261],[112,243,1665051625277],[113,242,1665051625294],[113,240,1665051625310],[114,237,1665051625326],[115,235,1665051625343],[115,232,1665051625359],[114,229,1665051625376],[110,223,1665051625393],[105,218,1665051625410],[101,214,1665051625427],[98,211,1665051625444],[96,208,1665051625460],[95,207,1665051625477],[95,206,1665051625494],[95,204,1665051625527],[99,200,1665051625543],[101,198,1665051625560],[102,197,1665051625576],[103,196,1665051625593],[105,195,1665051625627],[107,194,1665051625643],[109,193,1665051625660],[108,197,1665051625810],[103,207,1665051625827],[96,221,1665051625843],[87,237,1665051625859],[78,255,1665051625877],[73,273,1665051625894],[71,286,1665051625910],[70,295,1665051625927],[71,299,1665051625943],[72,300,1665051625960],[73,300,1665051625977],[76,299,1665051625993],[75,300,1665051626127],[73,305,1665051626143],[70,315,1665051626160],[67,330,1665051626176],[67,353,1665051626193],[67,378,1665051626210],[66,403,1665051626227],[66,425,1665051626243],[66,444,1665051626260],[66,457,1665051626276],[68,466,1665051626293],[69,469,1665051626309],[69,470,1665051626327],[70,469,1665051626421],[69,469,1665051626510],[70,468,1665051626610],[71,467,1665051626627],[72,465,1665051626643],[75,463,1665051626660],[80,462,1665051626677],[90,459,1665051626693],[104,455,1665051626710],[123,451,1665051626727],[146,445,1665051626743],[171,438,1665051626760],[199,429,1665051626776],[224,421,1665051626793],[244,417,1665051626809],[264,414,1665051626827],[281,411,1665051626843],[295,410,1665051626859],[305,409,1665051626877],[311,409,1665051626894],[313,409,1665051626910],[314,408,1665051626926],[316,407,1665051626994],[317,406,1665051627010],[319,404,1665051627027],[321,402,1665051627043],[322,400,1665051627060],[322,398,1665051627076],[323,395,1665051627093],[323,393,1665051627110],[323,392,1665051627127],[323,391,1665051627144],[323,390,1665051627160],[324,393,1665051627210],[330,407,1665051627227],[338,424,1665051627243],[344,440,1665051627260],[347,448,1665051627276],[347,447,1665051627343],[347,444,1665051627360],[348,440,1665051627376],[349,435,1665051627393],[350,430,1665051627410],[351,425,1665051627426],[352,419,1665051627443],[352,414,1665051627459],[352,407,1665051627477],[352,401,1665051627493],[353,398,1665051627510],[353,397,1665051627526],[353,396,1665051627544],[353,395,1665051627577],[353,392,1665051627594],[353,385,1665051627627],[352,388,1665051627693],[349,397,1665051627710],[345,407,1665051627726],[343,414,1665051627744],[342,416,1665051627760],[342,411,1665051627943],[342,401,1665051627959],[344,388,1665051627977],[344,370,1665051627993],[343,346,1665051628010],[341,324,1665051628026],[340,307,1665051628044],[340,298,1665051628060],[340,295,1665051628077],[340,304,1665051628260],[343,323,1665051628276],[346,351,1665051628293],[349,381,1665051628310],[352,419,1665051628327],[355,458,1665051628343],[357,491,1665051628360],[360,518,1665051628377],[364,537,1665051628394],[366,550,1665051628410],[367,555,1665051628427],[367,556,1665051628444],[367,555,1665051628610],[367,554,1665051628627],[367,553,1665051628694],[366,553,1665051628710],[363,552,1665051628744],[347,548,1665051628777],[331,543,1665051628793],[311,536,1665051628810],[285,523,1665051628826],[253,506,1665051628843],[223,487,1665051628860],[198,468,1665051628876],[181,452,1665051628893],[172,438,1665051628910],[170,431,1665051628927],[170,430,1665051628943],[171,430,1665051628959],[172,429,1665051629060],[180,436,1665051629076],[193,446,1665051629093],[208,457,1665051629109],[227,471,1665051629126],[247,485,1665051629143],[266,498,1665051629159],[287,511,1665051629176],[305,521,1665051629193],[318,527,1665051629209],[323,530,1665051629226],[324,531,1665051629244],[324,532,1665051629260],[325,534,1665051629277],[327,537,1665051629293],[328,539,1665051629310],[330,541,1665051629327],[333,545,1665051629344],[337,546,1665051629360],[340,547,1665051629377],[341,547,1665051629394],[342,550,1665051629576],[343,552,1665051629593],[344,554,1665051629609],[344,556,1665051629627],[345,556,1665051629643]],\"mm-mp\":28.14666666666667,\"md\":[[109,193,1665051625660],[76,299,1665051625995],[70,469,1665051626422],[342,416,1665051627778],[340,295,1665051628079],[171,430,1665051628959],[345,556,1665051629695]],\"md-mp\":672.5,\"mu\":[[109,193,1665051625716],[76,299,1665051626069],[69,469,1665051626515],[342,416,1665051627878],[340,295,1665051628177],[171,429,1665051629022],[345,556,1665051629771]],\"mu-mp\":675.8333333333334,\"topLevel\":{\"st\":1665051620006,\"sc\":{\"availWidth\":1920,\"availHeight\":1050,\"width\":1920,\"height\":1080,\"colorDepth\":24,\"pixelDepth\":24,\"top\":0,\"left\":0,\"availTop\":0,\"availLeft\":0,\"mozOrientation\":\"landscape-primary\",\"onmozorientationchange\":null},\"nv\":{\"permissions\":{},\"pdfViewerEnabled\":true,\"doNotTrack\":\"1\",\"maxTouchPoints\":0,\"mediaCapabilities\":{},\"oscpu\":\"Windows NT 10.0; Win64; x64\",\"vendor\":\"\",\"vendorSub\":\"\",\"productSub\":\"20100101\",\"cookieEnabled\":true,\"buildID\":\"20181001000000\",\"mediaDevices\":{},\"serviceWorker\":{},\"credentials\":{},\"clipboard\":{},\"mediaSession\":{},\"webdriver\":false,\"hardwareConcurrency\":12,\"geolocation\":{},\"appCodeName\":\"Mozilla\",\"appName\":\"Netscape\",\"appVersion\":\"5.0 (Windows)\",\"platform\":\"Win32\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0\",\"product\":\"Gecko\",\"language\":\"en-US\",\"languages\":[\"en-US\",\"en\"],\"locks\":{},\"onLine\":true,\"storage\":{},\"plugins\":[\"internal-pdf-viewer\",\"internal-pdf-viewer\",\"internal-pdf-viewer\",\"internal-pdf-viewer\",\"internal-pdf-viewer\"]},\"dr\":\"\",\"inv\":false,\"exec\":false,\"wn\":[[1334,937,1,1665051620006]],\"wn-mp\":0,\"xy\":[[0,204,1,1665051620006],[0,0,1,1665051623260],[0,4,1,1665051624443],[0,12,1,1665051624460],[0,24,1,1665051624477],[0,45,1,1665051624493],[0,101,1,1665051624510],[0,142,1,1665051624543],[0,184,1,1665051624560],[0,222,1,1665051624577],[0,254,1,1665051624593],[0,281,1,1665051624610],[0,298,1,1665051624627],[0,306,1,1665051624644],[0,300,1,1665051624776],[0,290,1,1665051624793],[0,264,1,1665051624810],[0,235,1,1665051624826],[0,205,1,1665051624843],[0,176,1,1665051624860],[0,146,1,1665051624877],[0,115,1,1665051624893],[0,86,1,1665051624910],[0,60,1,1665051624927],[0,38,1,1665051624943],[0,20,1,1665051624960],[0,7,1,1665051624977],[0,1,1,1665051624993],[0,0,1,1665051625010]],\"xy-mp\":178.71428571428572,\"mm\":[[1331,574,1665051622144],[1248,575,1665051622160],[1157,577,1665051622177],[1061,577,1665051622193],[982,575,1665051622210],[896,569,1665051622227],[831,561,1665051622244],[786,548,1665051622260],[755,533,1665051622277],[739,520,1665051622293],[737,511,1665051622310],[737,502,1665051622327],[825,483,1665051622845],[966,496,1665051622877],[1045,500,1665051622894],[1115,503,1665051622911],[1182,508,1665051622927],[1233,511,1665051622944],[1265,512,1665051622960],[1278,513,1665051622977],[1276,513,1665051622994],[1262,515,1665051623010],[1236,518,1665051623027],[1194,518,1665051623044],[1138,515,1665051623060],[1065,508,1665051623077],[987,502,1665051623094],[919,498,1665051623111],[856,495,1665051623127],[1017,351,1665051623477],[1100,354,1665051623493],[1174,355,1665051623510],[1241,350,1665051623527],[1291,338,1665051623543],[1319,325,1665051623560],[1317,301,1665051623593],[1295,290,1665051623610],[1255,277,1665051623626],[1204,267,1665051623643],[1158,263,1665051623660],[1117,262,1665051623677],[1083,266,1665051623693],[1054,276,1665051623710],[1020,295,1665051623727],[982,325,1665051623743],[1001,404,1665051624226],[1037,411,1665051624243],[1069,415,1665051624260],[1096,415,1665051624276],[1114,413,1665051624293],[1121,408,1665051624310],[1123,400,1665051624326],[1125,387,1665051624343],[1123,376,1665051624360],[1115,371,1665051624376],[1107,371,1665051624393],[1100,377,1665051624410],[1093,386,1665051624426],[1082,402,1665051624443],[1073,420,1665051624460],[1065,439,1665051624477],[1061,467,1665051624493],[1061,524,1665051624510],[1058,729,1665051624677],[1053,730,1665051624693],[1049,730,1665051624710],[1045,730,1665051624727],[1041,732,1665051624743],[1037,735,1665051624760],[1034,733,1665051624776],[1031,728,1665051624793],[1028,706,1665051624810],[1026,679,1665051624826],[1023,652,1665051624843],[1021,626,1665051624860],[1019,598,1665051624877],[1015,570,1665051624893],[1011,544,1665051624910],[1005,521,1665051624927],[998,501,1665051624943],[989,485,1665051624960],[975,472,1665051624977]],\"mm-mp\":32.976744186046524},\"v\":1}".replace('1665051', str(round(datetime.datetime.now().timestamp()))[:7])


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
            'rqdata': self.RQData,
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
                
