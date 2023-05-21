import httpx,threading,time,colorama


a = open("proxies.txt","r+").read().splitlines()
payload = {
    "websiteKey": "4c672d35-0701-42b2-88c3-78380b0db560",
    "websiteURL": "discord.com",
    "proxy": "69"
}


def Captcha(prox):
    payload['proxy'] = prox
    try:
        task = httpx.post("http://127.0.0.1:9999/createTask/",json=payload).json()
    except: 
        return Captcha()
    print(f"[{colorama.Fore.LIGHTBLUE_EX}DEBUG{colorama.Fore.RESET}] Task ID: {task['taskId'][:20]}")

    b = {
        "taskId": task['taskId']
    }


    cap = None
    while cap is None:
        try:
            
            result = httpx.post("http://127.0.0.1:9999/getTaskResult/",json=b).json()
            try:
                if result['Messsage']== 'Processing':
                    pass
            except: cap = result['captcha_key']
        except Exception as e:
            print(f'[{colorama.Fore.LIGHTRED_EX}ERROR{colorama.Fore.RESET}] Error With Geting Task Result: {e}')
    
    return cap


    
def x(p):
    # {p}
    start = time.time()


    _x = Captcha(p)

    if not _x == 'None' or not _x is None :print(f'[{colorama.Fore.LIGHTBLUE_EX}DEBUG{colorama.Fore.RESET}] SLoved Captcha Key: {_x[:32]}... | SLoved time: {time.time() - start}')
    else:print(f'[{colorama.Fore.LIGHTRED_EX}ERROR{colorama.Fore.RESET}] Error With Sloving Captcha!')

for i in a:
    threading.Thread(target=x,args=[i]).start()
    time.sleep(0.001)
