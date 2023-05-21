import httpx



print(httpx.get("https://google.com",proxies="http://219.100.37.125:443",timeout=300))