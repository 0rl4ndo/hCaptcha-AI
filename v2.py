from Hcaptcha.hCaptcha import Hcaptcha
from Hcaptcha.RQData import Hcaptcha_REQ
from services.scaffold import Scaffold
from services.update import *;from services.settings import *;from flask import Flask,request,jsonify;import base64,binascii,string,random,jwt,datetime,logging as uwulog,threading;Installer()
#Scaffold().install()

app = Flask(__name__)
log = uwulog.getLogger('werkzeug')
log.disabled = True
app.logger.disabled = True

tasks = {}


@app.route('/createTask/', methods=['POST', 'GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'PATCH' , 'TRACE', 'CONNECT'])
def get_task():
    if request.method == 'POST':
        try:
            op = request.get_json()
            rqdata =  op['rqdata']
        except:rqdata = False
        
        try:
            op = request.get_json()
            site_key = op['websiteKey']
            website_url =  op['websiteURL']
            proxy = op['proxy']
            if proxy == '69':proxy = "69"
            else: proxy = f"http://{proxy}"  
        except:return "Bruh"
        id = binascii.b2a_hex(os.urandom(15)).decode('utf-8')+''.join(random.sample(string.ascii_letters+string.ascii_lowercase+string.ascii_uppercase, 8))+base64.b64encode(str(datetime.datetime.now()).encode()).decode()+"."+str(int(len(binascii.b2a_hex(os.urandom(15)).decode('utf-8')+''.join(random.sample(string.ascii_letters+string.ascii_lowercase+string.ascii_uppercase, 8))+base64.b64encode(str(datetime.datetime.now()).encode()).decode()))+int(int(datetime.datetime.now().hour+datetime.datetime.now().minute+datetime.datetime.now().microsecond+datetime.datetime.now().month+datetime.datetime.now().year)*random.randint(1,999999999999999999999999)))+"."+str()

        id_ = id
        
        if rqdata:tasks.update({id_:{"site_key":site_key,"website_url":website_url,"proxy": proxy, "rqdata": rqdata}})
        else:tasks.update({id_:{"site_key":site_key,"website_url":website_url,"proxy": proxy}})

        logger.debug(f'Task Created. [{id_[:20]}]')

        threading.Thread(target=SLove,args=[id_]).start()
        return jsonify(taskId=id_)
    else:
        return jsonify(message="Method Not Allowed"), 405


def SLove(task_id):
    website_url = tasks[task_id]['website_url'];site_key = tasks[task_id]['site_key'];proxy = tasks[task_id]['proxy']
    if proxy == '69':proxy = False
    else: proxy = proxy
    
    try:
        rqdata = tasks[task_id]['rqdata']
    except:
        rqdata = False

    #print(proxy)

    if rqdata:
        response = str(Hcaptcha_REQ(rqdata,proxy if proxy else None, site_key,website_url)._())
        tasks[task_id]['SLoved_Captcha'] = str(response)
        #print(tasks)
    else:
        response = str(Hcaptcha(proxy if proxy  else None, site_key,website_url)._())
        tasks[task_id]['SLoved_Captcha'] = str(response)
        #print(tasks)
        
    if str(response) == 'None':
        logger.debug(f'Error With Sloving Captcha. [{task_id[:20]}]')
    else:
        logger.debug(f'Captcha SLoved: {response[:32]}. [{task_id[:20]}]')
    return str(response)



@app.route('/getTaskResult/', methods=['POST', 'GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'PATCH' , 'TRACE', 'CONNECT'])
def getTaskResult():
    if request.method == 'POST':
        try:
            op = request.get_json()
            Task = op['taskId']
        except:return "Bruh"

        try:
            check = tasks[Task]
        except:
            return jsonify(Messsage="Invalid Task ID") 



        try:
            Result = tasks[Task]['SLoved_Captcha']
        except:
            return jsonify(Messsage="Processing") 


        tasks.pop(Task)
        return jsonify(captcha_key=Result) 

    else:
        return jsonify(message="Method Not Allowed"), 405

app.run('0.0.0.0', 9999)