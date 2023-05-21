from flask import Flask;from flask import request;import hashlib,math,base64,json;from datetime import datetime






def _HSL(req):
    x = "0123456789/:abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    fields = req.split(".")
    req = {
        "header": json.loads(base64.b64decode(fields[0])),
        "payload": json.loads(base64.b64decode(fields[1] + ("=" * ((4 - len(fields[1]) % 4) % 4)))),
        "signature": base64.b64decode(fields[2].replace("_", "/").replace("-", "+")  + ("=" * ((4 - len(fields[1]) % 4) % 4))),
        "raw": {
            "header": fields[0],
            "payload": fields[1],
            "signature": fields[2]
        }
    }

    def a(r):
        for t in range(len(r) - 1, -1, -1):
            if r[t] < len(x) - 1:
                r[t] += 1
                return True
            r[t] = 0
        return False

    def i(r):
        t = ""
        for n in range(len(r)):
            t += x[r[n]]
        return t

    def o(r, e):
        n = e
        hashed = hashlib.sha1(e.encode())
        o = hashed.hexdigest()
        t = hashed.digest()
        e = None
        n = -1
        o = []
        for n in range(n + 1, 8 * len(t)):
            e = t[math.floor(n / 8)] >> n % 8 & 1
            o.append(e)
        a = o[:r]
        def index2(x,y):
            if y in x:
                return x.index(y)
            return -1
        return 0 == a[0] and index2(a, 1) >= r - 1 or -1 == index2(a, 1)
    
    def get():
        for e in range(25):
            n = [0 for i in range(e)]
            while a(n):
                u = req["payload"]["d"] + "::" + i(n)
                if o(req["payload"]["s"], u):
                    return i(n)
                
    result = get()
    hsl = ":".join([
        "1",
        str(req["payload"]["s"]),
        datetime.now().isoformat()[:19] \
            .replace("T", "") \
            .replace("-", "") \
            .replace(":", ""),
        req["payload"]["d"],
        "",
        result
    ])
    return hsl



    
if __name__ == '__main__':
    app = Flask(__name__)
    @app.route('/n')
    def lol():
        req = request.args.get('req')
        return str(_HSL(req))

    app.run('0.0.0.0', 1234)