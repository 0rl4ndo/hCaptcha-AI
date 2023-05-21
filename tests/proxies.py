import httpx



r = httpx.get("https://google.com",timeout=1000,proxies="151.235.207.110:22866")

print(r)