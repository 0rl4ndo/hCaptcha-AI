import time
import httpx


a = {
    "websiteKey": "4c672d35-0701-42b2-88c3-78380b0db560",
    "websiteURL": "discord.com",
    "proxy": "69"
}


def Captcha():
    task = httpx.post("https://c7d5-185-126-0-134.eu.ngrok.io/createTask/",json=a).json()
    print(f"(*) Task ID: {task}")

    b = {
        "taskId": task['taskId']
    }


    cap = None
    while cap is None:
        time.sleep(1.5)
        result = httpx.post("https://c7d5-185-126-0-134.eu.ngrok.io/getTaskResult/",json=b).json()
        try:
            if result['Messsage']== 'Processing':
                pass
        except: cap = result['captcha_key']
    
    return cap


print(str(Captcha()))
        
        