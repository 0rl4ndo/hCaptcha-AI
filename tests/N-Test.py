import httpx,threading,time


#a = open("proxies.txt","r+").read().splitlines()

def x(p):
    # {p}
    _x = httpx.get(f"http://127.0.0.1:9999/hcaptcha/discord.com/4c672d35-0701-42b2-88c3-78380b0db560/69",timeout=99999).text
    if not _x == 'None':print(f'(*) SLoved Captcha Key: {_x[:32]}')
    else:print(f'(-) Error With Sloving Captcha!')

for i in range(20):
    threading.Thread(target=x,args=["i"]).start()
    time.sleep(0.001)
