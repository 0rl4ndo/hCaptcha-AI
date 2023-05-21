/* https://hcaptcha.com/license */ ! function () {
    "use strict";

    function t(t) {
        var e = this.constructor;
        return this.then((function (i) {
            return e.resolve(t()).then((function () {
                return i
            }))
        }), (function (i) {
            return e.resolve(t()).then((function () {
                return e.reject(i)
            }))
        }))
    }

    function e(t) {
        return new this((function (e, i) {
            if (!t || "undefined" == typeof t.length) return i(new TypeError(typeof t + " " + t + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
            var n = Array.prototype.slice.call(t);
            if (0 === n.length) return e([]);
            var s = n.length;

            function o(t, i) {
                if (i && ("object" == typeof i || "function" == typeof i)) {
                    var r = i.then;
                    if ("function" == typeof r) return void r.call(i, (function (e) {
                        o(t, e)
                    }), (function (i) {
                        n[t] = {
                            status: "rejected",
                            reason: i
                        }, 0 == --s && e(n)
                    }))
                }
                n[t] = {
                    status: "fulfilled",
                    value: i
                }, 0 == --s && e(n)
            }
            for (var r = 0; r < n.length; r++) o(r, n[r])
        }))
    }
    var i = setTimeout,
        n = "undefined" != typeof setImmediate ? setImmediate : null;

    function s(t) {
        return Boolean(t && "undefined" != typeof t.length)
    }

    function o() {}

    function r(t) {
        if (!(this instanceof r)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof t) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = undefined, this._deferreds = [], d(t, this)
    }

    function a(t, e) {
        for (; 3 === t._state;) t = t._value;
        0 !== t._state ? (t._handled = !0, r._immediateFn((function () {
            var i = 1 === t._state ? e.onFulfilled : e.onRejected;
            if (null !== i) {
                var n;
                try {
                    n = i(t._value)
                } catch (s) {
                    return void h(e.promise, s)
                }
                l(e.promise, n)
            } else(1 === t._state ? l : h)(e.promise, t._value)
        }))) : t._deferreds.push(e)
    }

    function l(t, e) {
        try {
            if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
            if (e && ("object" == typeof e || "function" == typeof e)) {
                var i = e.then;
                if (e instanceof r) return t._state = 3, t._value = e, void c(t);
                if ("function" == typeof i) return void d((n = i, s = e, function () {
                    n.apply(s, arguments)
                }), t)
            }
            t._state = 1, t._value = e, c(t)
        } catch (o) {
            h(t, o)
        }
        var n, s
    }

    function h(t, e) {
        t._state = 2, t._value = e, c(t)
    }

    function c(t) {
        2 === t._state && 0 === t._deferreds.length && r._immediateFn((function () {
            t._handled || r._unhandledRejectionFn(t._value)
        }));
        for (var e = 0, i = t._deferreds.length; e < i; e++) a(t, t._deferreds[e]);
        t._deferreds = null
    }

    function u(t, e, i) {
        this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = i
    }

    function d(t, e) {
        var i = !1;
        try {
            t((function (t) {
                i || (i = !0, l(e, t))
            }), (function (t) {
                i || (i = !0, h(e, t))
            }))
        } catch (n) {
            if (i) return;
            i = !0, h(e, n)
        }
    }
    r.prototype["catch"] = function (t) {
        return this.then(null, t)
    }, r.prototype.then = function (t, e) {
        var i = new this.constructor(o);
        return a(this, new u(t, e, i)), i
    }, r.prototype["finally"] = t, r.all = function (t) {
        return new r((function (e, i) {
            if (!s(t)) return i(new TypeError("Promise.all accepts an array"));
            var n = Array.prototype.slice.call(t);
            if (0 === n.length) return e([]);
            var o = n.length;

            function r(t, s) {
                try {
                    if (s && ("object" == typeof s || "function" == typeof s)) {
                        var a = s.then;
                        if ("function" == typeof a) return void a.call(s, (function (e) {
                            r(t, e)
                        }), i)
                    }
                    n[t] = s, 0 == --o && e(n)
                } catch (l) {
                    i(l)
                }
            }
            for (var a = 0; a < n.length; a++) r(a, n[a])
        }))
    }, r.allSettled = e, r.resolve = function (t) {
        return t && "object" == typeof t && t.constructor === r ? t : new r((function (e) {
            e(t)
        }))
    }, r.reject = function (t) {
        return new r((function (e, i) {
            i(t)
        }))
    }, r.race = function (t) {
        return new r((function (e, i) {
            if (!s(t)) return i(new TypeError("Promise.race accepts an array"));
            for (var n = 0, o = t.length; n < o; n++) r.resolve(t[n]).then(e, i)
        }))
    }, r._immediateFn = "function" == typeof n && function (t) {
        n(t)
    } || function (t) {
        i(t, 0)
    }, r._unhandledRejectionFn = function (t) {
        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t)
    };
    var p, f = function () {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof global) return global;
        throw new Error("unable to locate global object")
    }();
    "function" != typeof f.Promise ? f.Promise = r : (f.Promise.prototype["finally"] || (f.Promise.prototype["finally"] = t), f.Promise.allSettled || (f.Promise.allSettled = e)), Array.prototype.indexOf || (Array.prototype.indexOf = function (t) {
        return function (e, i) {
            if (null === this || this === undefined) throw TypeError("Array.prototype.indexOf called on null or undefined");
            var n = t(this),
                s = n.length >>> 0,
                o = Math.min(0 | i, s);
            if (o < 0) o = Math.max(0, s + o);
            else if (o >= s) return -1;
            if (void 0 === e) {
                for (; o !== s; ++o)
                    if (void 0 === n[o] && o in n) return o
            } else if (e != e) {
                for (; o !== s; ++o)
                    if (n[o] != n[o]) return o
            } else
                for (; o !== s; ++o)
                    if (n[o] === e) return o;
            return -1
        }
    }(Object)), Array.isArray || (Array.isArray = function (t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }), document.getElementsByClassName || (window.Element.prototype.getElementsByClassName = document.constructor.prototype.getElementsByClassName = function (t) {
        if (document.querySelectorAll) return document.querySelectorAll("." + t);
        for (var e = document.getElementsByTagName("*"), i = new RegExp("(^|\\s)" + t + "(\\s|$)"), n = [], s = 0; s < e.length; s++) i.test(e[s].className) && n.push(e[s]);
        return n
    }), String.prototype.startsWith || (String.prototype.startsWith = function (t, e) {
        return this.substr(!e || e < 0 ? 0 : +e, t.length) === t
    }), String.prototype.endsWith || (String.prototype.endsWith = function (t, e) {
        return (e === undefined || e > this.length) && (e = this.length), this.substring(e - t.length, e) === t
    });
    try {
        if (Object.defineProperty && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(Element.prototype, "textContent") && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
            var m = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
            Object.defineProperty(Element.prototype, "textContent", {
                get: function () {
                    return m.get.call(this)
                },
                set: function (t) {
                    m.set.call(this, t)
                }
            })
        }
    } catch (Os) {}
    Function.prototype.bind || (Function.prototype.bind = function (t) {
        if ("function" != typeof this) throw new TypeError("Function.prototype.bind: Item Can Not Be Bound.");
        var e = Array.prototype.slice.call(arguments, 1),
            i = this,
            n = function () {},
            s = function () {
                return i.apply(this instanceof n ? this : t, e.concat(Array.prototype.slice.call(arguments)))
            };
        return this.prototype && (n.prototype = this.prototype), s.prototype = new n, s
    }), "function" != typeof Object.create && (Object.create = function (t, e) {
        function i() {}
        if (i.prototype = t, "object" == typeof e)
            for (var n in e) e.hasOwnProperty(n) && (i[n] = e[n]);
        return new i
    }), Date.now || (Date.now = function () {
        return (new Date).getTime()
    }), window.console || (window.console = {});
    for (var y, g, v, b, w = ["error", "info", "log", "show", "table", "trace", "warn"], x = function (t) {}, C = w.length; --C > -1;) p = w[C], window.console[p] || (window.console[p] = x);
    if (window.atob) try {
        window.atob(" ")
    } catch (Ts) {
        window.atob = function (t) {
            var e = function (e) {
                return t(String(e).replace(/[\t\n\f\r ]+/g, ""))
            };
            return e.original = t, e
        }(window.atob)
    } else {
        var k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            _ = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
        window.atob = function (t) {
            if (t = String(t).replace(/[\t\n\f\r ]+/g, ""), !_.test(t)) throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
            var e, i, n;
            t += "==".slice(2 - (3 & t.length));
            for (var s = "", o = 0; o < t.length;) e = k.indexOf(t.charAt(o++)) << 18 | k.indexOf(t.charAt(o++)) << 12 | (i = k.indexOf(t.charAt(o++))) << 6 | (n = k.indexOf(t.charAt(o++))), s += 64 === i ? String.fromCharCode(e >> 16 & 255) : 64 === n ? String.fromCharCode(e >> 16 & 255, e >> 8 & 255) : String.fromCharCode(e >> 16 & 255, e >> 8 & 255, 255 & e);
            return s
        }
    }
    if (Event.prototype.preventDefault || (Event.prototype.preventDefault = function () {
            this.returnValue = !1
        }), Event.prototype.stopPropagation || (Event.prototype.stopPropagation = function () {
            this.cancelBubble = !0
        }), window.Prototype && Array.prototype.toJSON) {
        console.error("[hCaptcha] Custom JSON polyfill detected, please remove to ensure hCaptcha works properly");
        var E = Array.prototype.toJSON,
            S = JSON.stringify;
        JSON.stringify = function (t) {
            try {
                return delete Array.prototype.toJSON, S(t)
            } finally {
                Array.prototype.toJSON = E
            }
        }
    }
    Object.keys || (Object.keys = (y = Object.prototype.hasOwnProperty, g = !Object.prototype.propertyIsEnumerable.call({
            toString: null
        }, "toString"), b = (v = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]).length, function (t) {
            if ("function" != typeof t && ("object" != typeof t || null === t)) throw new TypeError("Object.keys called on non-object");
            var e, i, n = [];
            for (e in t) y.call(t, e) && n.push(e);
            if (g)
                for (i = 0; i < b; i++) y.call(t, v[i]) && n.push(v[i]);
            return n
        }))
        /*! Raven.js 3.27.2 (6d91db933) | github.com/getsentry/raven-js */
        ,
        function (t) {
            if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
            else if ("function" == typeof define && define.amd) define("raven-js", t);
            else {
                ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Raven = t()
            }
        }((function () {
            return function t(e, i, n) {
                function s(r, a) {
                    if (!i[r]) {
                        if (!e[r]) {
                            var l = "function" == typeof require && require;
                            if (!a && l) return l(r, !0);
                            if (o) return o(r, !0);
                            var h = new Error("Cannot find module '" + r + "'");
                            throw h.code = "MODULE_NOT_FOUND", h
                        }
                        var c = i[r] = {
                            exports: {}
                        };
                        e[r][0].call(c.exports, (function (t) {
                            var i = e[r][1][t];
                            return s(i || t)
                        }), c, c.exports, t, e, i, n)
                    }
                    return i[r].exports
                }
                for (var o = "function" == typeof require && require, r = 0; r < n.length; r++) s(n[r]);
                return s
            }({
                1: [function (t, e, i) {
                    function n(t) {
                        this.name = "RavenConfigError", this.message = t
                    }
                    n.prototype = new Error, n.prototype.constructor = n, e.exports = n
                }, {}],
                2: [function (t, e, i) {
                    var n = t(5);
                    e.exports = {
                        wrapMethod: function (t, e, i) {
                            var s = t[e],
                                o = t;
                            if (e in t) {
                                var r = "warn" === e ? "warning" : e;
                                t[e] = function () {
                                    var t = [].slice.call(arguments),
                                        a = n.safeJoin(t, " "),
                                        l = {
                                            level: r,
                                            logger: "console",
                                            extra: {
                                                arguments: t
                                            }
                                        };
                                    "assert" === e ? !1 === t[0] && (a = "Assertion failed: " + (n.safeJoin(t.slice(1), " ") || "console.assert"), l.extra.arguments = t.slice(1), i && i(a, l)) : i && i(a, l), s && Function.prototype.apply.call(s, o, t)
                                }
                            }
                        }
                    }
                }, {
                    5: 5
                }],
                3: [function (t, e, i) {
                    (function (i) {
                        function n() {
                            return +new Date
                        }

                        function s(t, e) {
                            return v(e) ? function (i) {
                                return e(i, t)
                            } : e
                        }

                        function o() {
                            for (var t in this.a = !("object" != typeof JSON || !JSON.stringify), this.b = !g(z), this.c = !g(U), this.d = null, this.e = null, this.f = null, this.g = null, this.h = null, this.i = null, this.j = {}, this.k = {
                                    release: Z.SENTRY_RELEASE && Z.SENTRY_RELEASE.id,
                                    logger: "javascript",
                                    ignoreErrors: [],
                                    ignoreUrls: [],
                                    whitelistUrls: [],
                                    includePaths: [],
                                    headers: null,
                                    collectWindowErrors: !0,
                                    captureUnhandledRejections: !0,
                                    maxMessageLength: 0,
                                    maxUrlLength: 250,
                                    stackTraceLimit: 50,
                                    autoBreadcrumbs: !0,
                                    instrument: !0,
                                    sampleRate: 1,
                                    sanitizeKeys: []
                                }, this.l = {
                                    method: "POST",
                                    referrerPolicy: R() ? "origin" : ""
                                }, this.m = 0, this.n = !1, this.o = Error.stackTraceLimit, this.p = Z.console || {}, this.q = {}, this.r = [], this.s = n(), this.t = [], this.u = [], this.v = null, this.w = Z.location, this.x = this.w && this.w.href, this.y(), this.p) this.q[t] = this.p[t]
                        }
                        var r = t(6),
                            a = t(7),
                            l = t(8),
                            h = t(1),
                            c = t(5),
                            u = c.isErrorEvent,
                            d = c.isDOMError,
                            p = c.isDOMException,
                            f = c.isError,
                            m = c.isObject,
                            y = c.isPlainObject,
                            g = c.isUndefined,
                            v = c.isFunction,
                            b = c.isString,
                            w = c.isArray,
                            x = c.isEmptyObject,
                            C = c.each,
                            k = c.objectMerge,
                            _ = c.truncate,
                            E = c.objectFrozen,
                            S = c.hasKey,
                            A = c.joinRegExp,
                            L = c.urlencode,
                            H = c.uuid4,
                            B = c.htmlTreeAsString,
                            M = c.isSameException,
                            V = c.isSameStacktrace,
                            O = c.parseUrl,
                            T = c.fill,
                            F = c.supportsFetch,
                            R = c.supportsReferrerPolicy,
                            D = c.serializeKeysForMessage,
                            $ = c.serializeException,
                            P = c.sanitize,
                            I = t(2).wrapMethod,
                            j = "source protocol user pass host port path".split(" "),
                            N = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/,
                            Z = "undefined" != typeof window ? window : void 0 !== i ? i : "undefined" != typeof self ? self : {},
                            z = Z.document,
                            U = Z.navigator;
                        o.prototype = {
                            VERSION: "3.27.2",
                            debug: !1,
                            TraceKit: r,
                            config: function (t, e) {
                                var i = this;
                                if (i.g) return this.z("error", "Error: Raven has already been configured"), i;
                                if (!t) return i;
                                var n = i.k;
                                e && C(e, (function (t, e) {
                                    "tags" === t || "extra" === t || "user" === t ? i.j[t] = e : n[t] = e
                                })), i.setDSN(t), n.ignoreErrors.push(/^Script error\.?$/), n.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/), n.ignoreErrors = A(n.ignoreErrors), n.ignoreUrls = !!n.ignoreUrls.length && A(n.ignoreUrls), n.whitelistUrls = !!n.whitelistUrls.length && A(n.whitelistUrls), n.includePaths = A(n.includePaths), n.maxBreadcrumbs = Math.max(0, Math.min(n.maxBreadcrumbs || 100, 100));
                                var s = {
                                        xhr: !0,
                                        console: !0,
                                        dom: !0,
                                        location: !0,
                                        sentry: !0
                                    },
                                    o = n.autoBreadcrumbs;
                                "[object Object]" === {}.toString.call(o) ? o = k(s, o) : !1 !== o && (o = s), n.autoBreadcrumbs = o;
                                var a = {
                                        tryCatch: !0
                                    },
                                    l = n.instrument;
                                return "[object Object]" === {}.toString.call(l) ? l = k(a, l) : !1 !== l && (l = a), n.instrument = l, r.collectWindowErrors = !!n.collectWindowErrors, i
                            },
                            install: function () {
                                var t = this;
                                return t.isSetup() && !t.n && (r.report.subscribe((function () {
                                    t.A.apply(t, arguments)
                                })), t.k.captureUnhandledRejections && t.B(), t.C(), t.k.instrument && t.k.instrument.tryCatch && t.D(), t.k.autoBreadcrumbs && t.E(), t.F(), t.n = !0), Error.stackTraceLimit = t.k.stackTraceLimit, this
                            },
                            setDSN: function (t) {
                                var e = this,
                                    i = e.G(t),
                                    n = i.path.lastIndexOf("/"),
                                    s = i.path.substr(1, n);
                                e.H = t, e.h = i.user, e.I = i.pass && i.pass.substr(1), e.i = i.path.substr(n + 1), e.g = e.J(i), e.K = e.g + "/" + s + "api/" + e.i + "/store/", this.y()
                            },
                            context: function (t, e, i) {
                                return v(t) && (i = e || [], e = t, t = {}), this.wrap(t, e).apply(this, i)
                            },
                            wrap: function (t, e, i) {
                                function n() {
                                    var n = [],
                                        o = arguments.length,
                                        r = !t || t && !1 !== t.deep;
                                    for (i && v(i) && i.apply(this, arguments); o--;) n[o] = r ? s.wrap(t, arguments[o]) : arguments[o];
                                    try {
                                        return e.apply(this, n)
                                    } catch (a) {
                                        throw s.L(), s.captureException(a, t), a
                                    }
                                }
                                var s = this;
                                if (g(e) && !v(t)) return t;
                                if (v(t) && (e = t, t = void 0), !v(e)) return e;
                                try {
                                    if (e.M) return e;
                                    if (e.N) return e.N
                                } catch (o) {
                                    return e
                                }
                                for (var r in e) S(e, r) && (n[r] = e[r]);
                                return n.prototype = e.prototype, e.N = n, n.M = !0, n.O = e, n
                            },
                            uninstall: function () {
                                return r.report.uninstall(), this.P(), this.Q(), this.R(), this.S(), Error.stackTraceLimit = this.o, this.n = !1, this
                            },
                            T: function (t) {
                                this.z("debug", "Raven caught unhandled promise rejection:", t), this.captureException(t.reason, {
                                    mechanism: {
                                        type: "onunhandledrejection",
                                        handled: !1
                                    }
                                })
                            },
                            B: function () {
                                return this.T = this.T.bind(this), Z.addEventListener && Z.addEventListener("unhandledrejection", this.T), this
                            },
                            P: function () {
                                return Z.removeEventListener && Z.removeEventListener("unhandledrejection", this.T), this
                            },
                            captureException: function (t, e) {
                                if (e = k({
                                        trimHeadFrames: 0
                                    }, e || {}), u(t) && t.error) t = t.error;
                                else {
                                    if (d(t) || p(t)) {
                                        var i = t.name || (d(t) ? "DOMError" : "DOMException"),
                                            n = t.message ? i + ": " + t.message : i;
                                        return this.captureMessage(n, k(e, {
                                            stacktrace: !0,
                                            trimHeadFrames: e.trimHeadFrames + 1
                                        }))
                                    }
                                    if (f(t)) t = t;
                                    else {
                                        if (!y(t)) return this.captureMessage(t, k(e, {
                                            stacktrace: !0,
                                            trimHeadFrames: e.trimHeadFrames + 1
                                        }));
                                        e = this.U(e, t), t = new Error(e.message)
                                    }
                                }
                                this.d = t;
                                try {
                                    var s = r.computeStackTrace(t);
                                    this.V(s, e)
                                } catch (o) {
                                    if (t !== o) throw o
                                }
                                return this
                            },
                            U: function (t, e) {
                                var i = Object.keys(e).sort(),
                                    n = k(t, {
                                        message: "Non-Error exception captured with keys: " + D(i),
                                        fingerprint: [l(i)],
                                        extra: t.extra || {}
                                    });
                                return n.extra.W = $(e), n
                            },
                            captureMessage: function (t, e) {
                                if (!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(t)) {
                                    var i, n = k({
                                        message: t += ""
                                    }, e = e || {});
                                    try {
                                        throw new Error(t)
                                    } catch (s) {
                                        i = s
                                    }
                                    i.name = null;
                                    var o = r.computeStackTrace(i),
                                        a = w(o.stack) && o.stack[1];
                                    a && "Raven.captureException" === a.func && (a = o.stack[2]);
                                    var l = a && a.url || "";
                                    if ((!this.k.ignoreUrls.test || !this.k.ignoreUrls.test(l)) && (!this.k.whitelistUrls.test || this.k.whitelistUrls.test(l))) {
                                        if (this.k.stacktrace || e.stacktrace || "" === n.message) {
                                            n.fingerprint = null == n.fingerprint ? t : n.fingerprint, (e = k({
                                                trimHeadFrames: 0
                                            }, e)).trimHeadFrames += 1;
                                            var h = this.X(o, e);
                                            n.stacktrace = {
                                                frames: h.reverse()
                                            }
                                        }
                                        return n.fingerprint && (n.fingerprint = w(n.fingerprint) ? n.fingerprint : [n.fingerprint]), this.Y(n), this
                                    }
                                }
                            },
                            captureBreadcrumb: function (t) {
                                var e = k({
                                    timestamp: n() / 1e3
                                }, t);
                                if (v(this.k.breadcrumbCallback)) {
                                    var i = this.k.breadcrumbCallback(e);
                                    if (m(i) && !x(i)) e = i;
                                    else if (!1 === i) return this
                                }
                                return this.u.push(e), this.u.length > this.k.maxBreadcrumbs && this.u.shift(), this
                            },
                            addPlugin: function (t) {
                                var e = [].slice.call(arguments, 1);
                                return this.r.push([t, e]), this.n && this.F(), this
                            },
                            setUserContext: function (t) {
                                return this.j.user = t, this
                            },
                            setExtraContext: function (t) {
                                return this.Z("extra", t), this
                            },
                            setTagsContext: function (t) {
                                return this.Z("tags", t), this
                            },
                            clearContext: function () {
                                return this.j = {}, this
                            },
                            getContext: function () {
                                return JSON.parse(a(this.j))
                            },
                            setEnvironment: function (t) {
                                return this.k.environment = t, this
                            },
                            setRelease: function (t) {
                                return this.k.release = t, this
                            },
                            setDataCallback: function (t) {
                                var e = this.k.dataCallback;
                                return this.k.dataCallback = s(e, t), this
                            },
                            setBreadcrumbCallback: function (t) {
                                var e = this.k.breadcrumbCallback;
                                return this.k.breadcrumbCallback = s(e, t), this
                            },
                            setShouldSendCallback: function (t) {
                                var e = this.k.shouldSendCallback;
                                return this.k.shouldSendCallback = s(e, t), this
                            },
                            setTransport: function (t) {
                                return this.k.transport = t, this
                            },
                            lastException: function () {
                                return this.d
                            },
                            lastEventId: function () {
                                return this.f
                            },
                            isSetup: function () {
                                return !(!this.a || !this.g && (this.ravenNotConfiguredError || (this.ravenNotConfiguredError = !0, this.z("error", "Error: Raven has not been configured.")), 1))
                            },
                            afterLoad: function () {
                                var t = Z.RavenConfig;
                                t && this.config(t.dsn, t.config).install()
                            },
                            showReportDialog: function (t) {
                                if (z) {
                                    if (!(t = k({
                                            eventId: this.lastEventId(),
                                            dsn: this.H,
                                            user: this.j.user || {}
                                        }, t)).eventId) throw new h("Missing eventId");
                                    if (!t.dsn) throw new h("Missing DSN");
                                    var e = encodeURIComponent,
                                        i = [];
                                    for (var n in t)
                                        if ("user" === n) {
                                            var s = t.user;
                                            s.name && i.push("name=" + e(s.name)), s.email && i.push("email=" + e(s.email))
                                        } else i.push(e(n) + "=" + e(t[n]));
                                    var o = this.J(this.G(t.dsn)),
                                        r = z.createElement("script");
                                    r.async = !0, r.src = o + "/api/embed/error-page/?" + i.join("&"), (z.head || z.body).appendChild(r)
                                }
                            },
                            L: function () {
                                var t = this;
                                this.m += 1, setTimeout((function () {
                                    t.m -= 1
                                }))
                            },
                            $: function (t, e) {
                                var i, n;
                                if (this.b) {
                                    for (n in e = e || {}, t = "raven" + t.substr(0, 1).toUpperCase() + t.substr(1), z.createEvent ? (i = z.createEvent("HTMLEvents")).initEvent(t, !0, !0) : (i = z.createEventObject()).eventType = t, e) S(e, n) && (i[n] = e[n]);
                                    if (z.createEvent) z.dispatchEvent(i);
                                    else try {
                                        z.fireEvent("on" + i.eventType.toLowerCase(), i)
                                    } catch (s) {}
                                }
                            },
                            _: function (t) {
                                var e = this;
                                return function (i) {
                                    if (e.aa = null, e.v !== i) {
                                        var n;
                                        e.v = i;
                                        try {
                                            n = B(i.target)
                                        } catch (s) {
                                            n = "<unknown>"
                                        }
                                        e.captureBreadcrumb({
                                            category: "ui." + t,
                                            message: n
                                        })
                                    }
                                }
                            },
                            ba: function () {
                                var t = this;
                                return function (e) {
                                    var i;
                                    try {
                                        i = e.target
                                    } catch (s) {
                                        return
                                    }
                                    var n = i && i.tagName;
                                    if (n && ("INPUT" === n || "TEXTAREA" === n || i.isContentEditable)) {
                                        var o = t.aa;
                                        o || t._("input")(e), clearTimeout(o), t.aa = setTimeout((function () {
                                            t.aa = null
                                        }), 1e3)
                                    }
                                }
                            },
                            ca: function (t, e) {
                                var i = O(this.w.href),
                                    n = O(e),
                                    s = O(t);
                                this.x = e, i.protocol === n.protocol && i.host === n.host && (e = n.relative), i.protocol === s.protocol && i.host === s.host && (t = s.relative), this.captureBreadcrumb({
                                    category: "navigation",
                                    data: {
                                        to: e,
                                        from: t
                                    }
                                })
                            },
                            C: function () {
                                var t = this;
                                t.da = Function.prototype.toString, Function.prototype.toString = function () {
                                    return "function" == typeof this && this.M ? t.da.apply(this.O, arguments) : t.da.apply(this, arguments)
                                }
                            },
                            Q: function () {
                                this.da && (Function.prototype.toString = this.da)
                            },
                            D: function () {
                                function t(t) {
                                    return function (e, n) {
                                        for (var s = new Array(arguments.length), o = 0; o < s.length; ++o) s[o] = arguments[o];
                                        var r = s[0];
                                        return v(r) && (s[0] = i.wrap({
                                            mechanism: {
                                                type: "instrument",
                                                data: {
                                                    "function": t.name || "<anonymous>"
                                                }
                                            }
                                        }, r)), t.apply ? t.apply(this, s) : t(s[0], s[1])
                                    }
                                }

                                function e(t) {
                                    var e = Z[t] && Z[t].prototype;
                                    e && e.hasOwnProperty && e.hasOwnProperty("addEventListener") && (T(e, "addEventListener", (function (e) {
                                        return function (n, o, r, a) {
                                            try {
                                                o && o.handleEvent && (o.handleEvent = i.wrap({
                                                    mechanism: {
                                                        type: "instrument",
                                                        data: {
                                                            target: t,
                                                            "function": "handleEvent",
                                                            handler: o && o.name || "<anonymous>"
                                                        }
                                                    }
                                                }, o.handleEvent))
                                            } catch (l) {}
                                            var h, c, u;
                                            return s && s.dom && ("EventTarget" === t || "Node" === t) && (c = i._("click"), u = i.ba(), h = function (t) {
                                                if (t) {
                                                    var e;
                                                    try {
                                                        e = t.type
                                                    } catch (i) {
                                                        return
                                                    }
                                                    return "click" === e ? c(t) : "keypress" === e ? u(t) : void 0
                                                }
                                            }), e.call(this, n, i.wrap({
                                                mechanism: {
                                                    type: "instrument",
                                                    data: {
                                                        target: t,
                                                        "function": "addEventListener",
                                                        handler: o && o.name || "<anonymous>"
                                                    }
                                                }
                                            }, o, h), r, a)
                                        }
                                    }), n), T(e, "removeEventListener", (function (t) {
                                        return function (e, i, n, s) {
                                            try {
                                                i = i && (i.N ? i.N : i)
                                            } catch (o) {}
                                            return t.call(this, e, i, n, s)
                                        }
                                    }), n))
                                }
                                var i = this,
                                    n = i.t,
                                    s = this.k.autoBreadcrumbs;
                                T(Z, "setTimeout", t, n), T(Z, "setInterval", t, n), Z.requestAnimationFrame && T(Z, "requestAnimationFrame", (function (t) {
                                    return function (e) {
                                        return t(i.wrap({
                                            mechanism: {
                                                type: "instrument",
                                                data: {
                                                    "function": "requestAnimationFrame",
                                                    handler: t && t.name || "<anonymous>"
                                                }
                                            }
                                        }, e))
                                    }
                                }), n);
                                for (var o = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], r = 0; r < o.length; r++) e(o[r])
                            },
                            E: function () {
                                function t(t, i) {
                                    t in i && v(i[t]) && T(i, t, (function (i) {
                                        return e.wrap({
                                            mechanism: {
                                                type: "instrument",
                                                data: {
                                                    "function": t,
                                                    handler: i && i.name || "<anonymous>"
                                                }
                                            }
                                        }, i)
                                    }))
                                }
                                var e = this,
                                    i = this.k.autoBreadcrumbs,
                                    n = e.t;
                                if (i.xhr && "XMLHttpRequest" in Z) {
                                    var s = Z.XMLHttpRequest && Z.XMLHttpRequest.prototype;
                                    T(s, "open", (function (t) {
                                        return function (i, n) {
                                            return b(n) && -1 === n.indexOf(e.h) && (this.ea = {
                                                method: i,
                                                url: n,
                                                status_code: null
                                            }), t.apply(this, arguments)
                                        }
                                    }), n), T(s, "send", (function (i) {
                                        return function () {
                                            function n() {
                                                if (s.ea && 4 === s.readyState) {
                                                    try {
                                                        s.ea.status_code = s.status
                                                    } catch (t) {}
                                                    e.captureBreadcrumb({
                                                        type: "http",
                                                        category: "xhr",
                                                        data: s.ea
                                                    })
                                                }
                                            }
                                            for (var s = this, o = ["onload", "onerror", "onprogress"], r = 0; r < o.length; r++) t(o[r], s);
                                            return "onreadystatechange" in s && v(s.onreadystatechange) ? T(s, "onreadystatechange", (function (t) {
                                                return e.wrap({
                                                    mechanism: {
                                                        type: "instrument",
                                                        data: {
                                                            "function": "onreadystatechange",
                                                            handler: t && t.name || "<anonymous>"
                                                        }
                                                    }
                                                }, t, n)
                                            })) : s.onreadystatechange = n, i.apply(this, arguments)
                                        }
                                    }), n)
                                }
                                i.xhr && F() && T(Z, "fetch", (function (t) {
                                    return function () {
                                        for (var i = new Array(arguments.length), n = 0; n < i.length; ++n) i[n] = arguments[n];
                                        var s, o = i[0],
                                            r = "GET";
                                        if ("string" == typeof o ? s = o : "Request" in Z && o instanceof Z.Request ? (s = o.url, o.method && (r = o.method)) : s = "" + o, -1 !== s.indexOf(e.h)) return t.apply(this, i);
                                        i[1] && i[1].method && (r = i[1].method);
                                        var a = {
                                            method: r,
                                            url: s,
                                            status_code: null
                                        };
                                        return t.apply(this, i).then((function (t) {
                                            return a.status_code = t.status, e.captureBreadcrumb({
                                                type: "http",
                                                category: "fetch",
                                                data: a
                                            }), t
                                        }))["catch"]((function (t) {
                                            throw e.captureBreadcrumb({
                                                type: "http",
                                                category: "fetch",
                                                data: a,
                                                level: "error"
                                            }), t
                                        }))
                                    }
                                }), n), i.dom && this.b && (z.addEventListener ? (z.addEventListener("click", e._("click"), !1), z.addEventListener("keypress", e.ba(), !1)) : z.attachEvent && (z.attachEvent("onclick", e._("click")), z.attachEvent("onkeypress", e.ba())));
                                var o = Z.chrome,
                                    r = !(o && o.app && o.app.runtime) && Z.history && Z.history.pushState && Z.history.replaceState;
                                if (i.location && r) {
                                    var a = Z.onpopstate;
                                    Z.onpopstate = function () {
                                        var t = e.w.href;
                                        if (e.ca(e.x, t), a) return a.apply(this, arguments)
                                    };
                                    var l = function (t) {
                                        return function () {
                                            var i = arguments.length > 2 ? arguments[2] : void 0;
                                            return i && e.ca(e.x, i + ""), t.apply(this, arguments)
                                        }
                                    };
                                    T(Z.history, "pushState", l, n), T(Z.history, "replaceState", l, n)
                                }
                                if (i.console && "console" in Z && console.log) {
                                    var h = function (t, i) {
                                        e.captureBreadcrumb({
                                            message: t,
                                            level: i.level,
                                            category: "console"
                                        })
                                    };
                                    C(["debug", "info", "warn", "error", "log"], (function (t, e) {
                                        I(console, e, h)
                                    }))
                                }
                            },
                            R: function () {
                                for (var t; this.t.length;) {
                                    var e = (t = this.t.shift())[0],
                                        i = t[1],
                                        n = t[2];
                                    e[i] = n
                                }
                            },
                            S: function () {
                                for (var t in this.q) this.p[t] = this.q[t]
                            },
                            F: function () {
                                var t = this;
                                C(this.r, (function (e, i) {
                                    var n = i[0],
                                        s = i[1];
                                    n.apply(t, [t].concat(s))
                                }))
                            },
                            G: function (t) {
                                var e = N.exec(t),
                                    i = {},
                                    n = 7;
                                try {
                                    for (; n--;) i[j[n]] = e[n] || ""
                                } catch (s) {
                                    throw new h("Invalid DSN: " + t)
                                }
                                if (i.pass && !this.k.allowSecretKey) throw new h("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");
                                return i
                            },
                            J: function (t) {
                                var e = "//" + t.host + (t.port ? ":" + t.port : "");
                                return t.protocol && (e = t.protocol + ":" + e), e
                            },
                            A: function (t, e) {
                                (e = e || {}).mechanism = e.mechanism || {
                                    type: "onerror",
                                    handled: !1
                                }, this.m || this.V(t, e)
                            },
                            V: function (t, e) {
                                var i = this.X(t, e);
                                this.$("handle", {
                                    stackInfo: t,
                                    options: e
                                }), this.fa(t.name, t.message, t.url, t.lineno, i, e)
                            },
                            X: function (t, e) {
                                var i = this,
                                    n = [];
                                if (t.stack && t.stack.length && (C(t.stack, (function (e, s) {
                                        var o = i.ga(s, t.url);
                                        o && n.push(o)
                                    })), e && e.trimHeadFrames))
                                    for (var s = 0; s < e.trimHeadFrames && s < n.length; s++) n[s].in_app = !1;
                                return n = n.slice(0, this.k.stackTraceLimit)
                            },
                            ga: function (t, e) {
                                var i = {
                                    filename: t.url,
                                    lineno: t.line,
                                    colno: t.column,
                                    "function": t.func || "?"
                                };
                                return t.url || (i.filename = e), i.in_app = !(this.k.includePaths.test && !this.k.includePaths.test(i.filename) || /(Raven|TraceKit)\./.test(i["function"]) || /raven\.(min\.)?js$/.test(i.filename)), i
                            },
                            fa: function (t, e, i, n, s, o) {
                                var r, a = (t ? t + ": " : "") + (e || "");
                                if ((!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(e) && !this.k.ignoreErrors.test(a)) && (s && s.length ? (i = s[0].filename || i, s.reverse(), r = {
                                        frames: s
                                    }) : i && (r = {
                                        frames: [{
                                            filename: i,
                                            lineno: n,
                                            in_app: !0
                                        }]
                                    }), (!this.k.ignoreUrls.test || !this.k.ignoreUrls.test(i)) && (!this.k.whitelistUrls.test || this.k.whitelistUrls.test(i)))) {
                                    var l = k({
                                            exception: {
                                                values: [{
                                                    type: t,
                                                    value: e,
                                                    stacktrace: r
                                                }]
                                            },
                                            transaction: i
                                        }, o),
                                        h = l.exception.values[0];
                                    null == h.type && "" === h.value && (h.value = "Unrecoverable error caught"), !l.exception.mechanism && l.mechanism && (l.exception.mechanism = l.mechanism, delete l.mechanism), l.exception.mechanism = k({
                                        type: "generic",
                                        handled: !0
                                    }, l.exception.mechanism || {}), this.Y(l)
                                }
                            },
                            ha: function (t) {
                                var e = this.k.maxMessageLength;
                                if (t.message && (t.message = _(t.message, e)), t.exception) {
                                    var i = t.exception.values[0];
                                    i.value = _(i.value, e)
                                }
                                var n = t.request;
                                return n && (n.url && (n.url = _(n.url, this.k.maxUrlLength)), n.Referer && (n.Referer = _(n.Referer, this.k.maxUrlLength))), t.breadcrumbs && t.breadcrumbs.values && this.ia(t.breadcrumbs), t
                            },
                            ia: function (t) {
                                for (var e, i, n, s = ["to", "from", "url"], o = 0; o < t.values.length; ++o)
                                    if ((i = t.values[o]).hasOwnProperty("data") && m(i.data) && !E(i.data)) {
                                        n = k({}, i.data);
                                        for (var r = 0; r < s.length; ++r) e = s[r], n.hasOwnProperty(e) && n[e] && (n[e] = _(n[e], this.k.maxUrlLength));
                                        t.values[o].data = n
                                    }
                            },
                            ja: function () {
                                if (this.c || this.b) {
                                    var t = {};
                                    return this.c && U.userAgent && (t.headers = {
                                        "User-Agent": U.userAgent
                                    }), Z.location && Z.location.href && (t.url = Z.location.href), this.b && z.referrer && (t.headers || (t.headers = {}), t.headers.Referer = z.referrer), t
                                }
                            },
                            y: function () {
                                this.ka = 0, this.la = null
                            },
                            ma: function () {
                                return this.ka && n() - this.la < this.ka
                            },
                            na: function (t) {
                                var e = this.e;
                                return !(!e || t.message !== e.message || t.transaction !== e.transaction) && (t.stacktrace || e.stacktrace ? V(t.stacktrace, e.stacktrace) : t.exception || e.exception ? M(t.exception, e.exception) : !t.fingerprint && !e.fingerprint || Boolean(t.fingerprint && e.fingerprint) && JSON.stringify(t.fingerprint) === JSON.stringify(e.fingerprint))
                            },
                            oa: function (t) {
                                if (!this.ma()) {
                                    var e = t.status;
                                    if (400 === e || 401 === e || 429 === e) {
                                        var i;
                                        try {
                                            i = F() ? t.headers.get("Retry-After") : t.getResponseHeader("Retry-After"), i = 1e3 * parseInt(i, 10)
                                        } catch (s) {}
                                        this.ka = i || (2 * this.ka || 1e3), this.la = n()
                                    }
                                }
                            },
                            Y: function (t) {
                                var e = this.k,
                                    i = {
                                        project: this.i,
                                        logger: e.logger,
                                        platform: "javascript"
                                    },
                                    s = this.ja();
                                if (s && (i.request = s), t.trimHeadFrames && delete t.trimHeadFrames, (t = k(i, t)).tags = k(k({}, this.j.tags), t.tags), t.extra = k(k({}, this.j.extra), t.extra), t.extra["session:duration"] = n() - this.s, this.u && this.u.length > 0 && (t.breadcrumbs = {
                                        values: [].slice.call(this.u, 0)
                                    }), this.j.user && (t.user = this.j.user), e.environment && (t.environment = e.environment), e.release && (t.release = e.release), e.serverName && (t.server_name = e.serverName), t = this.pa(t), Object.keys(t).forEach((function (e) {
                                        (null == t[e] || "" === t[e] || x(t[e])) && delete t[e]
                                    })), v(e.dataCallback) && (t = e.dataCallback(t) || t), t && !x(t) && (!v(e.shouldSendCallback) || e.shouldSendCallback(t))) return this.ma() ? void this.z("warn", "Raven dropped error due to backoff: ", t) : void("number" == typeof e.sampleRate ? Math.random() < e.sampleRate && this.qa(t) : this.qa(t))
                            },
                            pa: function (t) {
                                return P(t, this.k.sanitizeKeys)
                            },
                            ra: function () {
                                return H()
                            },
                            qa: function (t, e) {
                                var i = this,
                                    n = this.k;
                                if (this.isSetup()) {
                                    if (t = this.ha(t), !this.k.allowDuplicates && this.na(t)) return void this.z("warn", "Raven dropped repeat event: ", t);
                                    this.f = t.event_id || (t.event_id = this.ra()), this.e = t, this.z("debug", "Raven about to send:", t);
                                    var s = {
                                        sentry_version: "7",
                                        sentry_client: "raven-js/" + this.VERSION,
                                        sentry_key: this.h
                                    };
                                    this.I && (s.sentry_secret = this.I);
                                    var o = t.exception && t.exception.values[0];
                                    this.k.autoBreadcrumbs && this.k.autoBreadcrumbs.sentry && this.captureBreadcrumb({
                                        category: "sentry",
                                        message: o ? (o.type ? o.type + ": " : "") + o.value : t.message,
                                        event_id: t.event_id,
                                        level: t.level || "error"
                                    });
                                    var r = this.K;
                                    (n.transport || this._makeRequest).call(this, {
                                        url: r,
                                        auth: s,
                                        data: t,
                                        options: n,
                                        onSuccess: function () {
                                            i.y(), i.$("success", {
                                                data: t,
                                                src: r
                                            }), e && e()
                                        },
                                        onError: function (n) {
                                            i.z("error", "Raven transport failed to send: ", n), n.request && i.oa(n.request), i.$("failure", {
                                                data: t,
                                                src: r
                                            }), n = n || new Error("Raven send failed (no additional details provided)"), e && e(n)
                                        }
                                    })
                                }
                            },
                            _makeRequest: function (t) {
                                var e = t.url + "?" + L(t.auth),
                                    i = null,
                                    n = {};
                                if (t.options.headers && (i = this.sa(t.options.headers)), t.options.fetchParameters && (n = this.sa(t.options.fetchParameters)), F()) {
                                    n.body = a(t.data);
                                    var s = k({}, this.l),
                                        o = k(s, n);
                                    return i && (o.headers = i), Z.fetch(e, o).then((function (e) {
                                        if (e.ok) t.onSuccess && t.onSuccess();
                                        else {
                                            var i = new Error("Sentry error code: " + e.status);
                                            i.request = e, t.onError && t.onError(i)
                                        }
                                    }))["catch"]((function () {
                                        t.onError && t.onError(new Error("Sentry error code: network unavailable"))
                                    }))
                                }
                                var r = Z.XMLHttpRequest && new Z.XMLHttpRequest;
                                r && (("withCredentials" in r || "undefined" != typeof XDomainRequest) && ("withCredentials" in r ? r.onreadystatechange = function () {
                                    if (4 === r.readyState)
                                        if (200 === r.status) t.onSuccess && t.onSuccess();
                                        else if (t.onError) {
                                        var e = new Error("Sentry error code: " + r.status);
                                        e.request = r, t.onError(e)
                                    }
                                } : (r = new XDomainRequest, e = e.replace(/^https?:/, ""), t.onSuccess && (r.onload = t.onSuccess), t.onError && (r.onerror = function () {
                                    var e = new Error("Sentry error code: XDomainRequest");
                                    e.request = r, t.onError(e)
                                })), r.open("POST", e), i && C(i, (function (t, e) {
                                    r.setRequestHeader(t, e)
                                })), r.send(a(t.data))))
                            },
                            sa: function (t) {
                                var e = {};
                                for (var i in t)
                                    if (t.hasOwnProperty(i)) {
                                        var n = t[i];
                                        e[i] = "function" == typeof n ? n() : n
                                    } return e
                            },
                            z: function (t) {
                                this.q[t] && (this.debug || this.k.debug) && Function.prototype.apply.call(this.q[t], this.p, [].slice.call(arguments, 1))
                            },
                            Z: function (t, e) {
                                g(e) ? delete this.j[t] : this.j[t] = k(this.j[t] || {}, e)
                            }
                        }, o.prototype.setUser = o.prototype.setUserContext, o.prototype.setReleaseContext = o.prototype.setRelease, e.exports = o
                    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                }, {
                    1: 1,
                    2: 2,
                    5: 5,
                    6: 6,
                    7: 7,
                    8: 8
                }],
                4: [function (t, e, i) {
                    (function (i) {
                        var n = t(3),
                            s = "undefined" != typeof window ? window : void 0 !== i ? i : "undefined" != typeof self ? self : {},
                            o = s.Raven,
                            r = new n;
                        r.noConflict = function () {
                            return s.Raven = o, r
                        }, r.afterLoad(), e.exports = r, e.exports.Client = n
                    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                }, {
                    3: 3
                }],
                5: [function (t, e, i) {
                    (function (i) {
                        function n(t) {
                            switch (Object.prototype.toString.call(t)) {
                                case "[object Error]":
                                case "[object Exception]":
                                case "[object DOMException]":
                                    return !0;
                                default:
                                    return t instanceof Error
                            }
                        }

                        function s(t) {
                            return "[object DOMError]" === Object.prototype.toString.call(t)
                        }

                        function o(t) {
                            return void 0 === t
                        }

                        function r(t) {
                            return "[object Object]" === Object.prototype.toString.call(t)
                        }

                        function a(t) {
                            return "[object String]" === Object.prototype.toString.call(t)
                        }

                        function l(t) {
                            return "[object Array]" === Object.prototype.toString.call(t)
                        }

                        function h() {
                            if (!("fetch" in x)) return !1;
                            try {
                                return new Headers, new Request(""), new Response, !0
                            } catch (t) {
                                return !1
                            }
                        }

                        function c(t, e) {
                            var i, n;
                            if (o(t.length))
                                for (i in t) d(t, i) && e.call(null, i, t[i]);
                            else if (n = t.length)
                                for (i = 0; i < n; i++) e.call(null, i, t[i])
                        }

                        function u(t, e) {
                            if ("number" != typeof e) throw new Error("2nd argument to `truncate` function should be a number");
                            return "string" != typeof t || 0 === e || t.length <= e ? t : t.substr(0, e) + "…"
                        }

                        function d(t, e) {
                            return Object.prototype.hasOwnProperty.call(t, e)
                        }

                        function p(t) {
                            for (var e, i = [], n = 0, s = t.length; n < s; n++) a(e = t[n]) ? i.push(e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : e && e.source && i.push(e.source);
                            return new RegExp(i.join("|"), "i")
                        }

                        function f(t) {
                            var e, i, n, s, o, r = [];
                            if (!t || !t.tagName) return "";
                            if (r.push(t.tagName.toLowerCase()), t.id && r.push("#" + t.id), (e = t.className) && a(e))
                                for (i = e.split(/\s+/), o = 0; o < i.length; o++) r.push("." + i[o]);
                            var l = ["type", "name", "title", "alt"];
                            for (o = 0; o < l.length; o++) n = l[o], (s = t.getAttribute(n)) && r.push("[" + n + '="' + s + '"]');
                            return r.join("")
                        }

                        function m(t, e) {
                            return !!(!!t ^ !!e)
                        }

                        function y(t, e) {
                            if (m(t, e)) return !1;
                            var i = t.frames,
                                n = e.frames;
                            if (void 0 === i || void 0 === n) return !1;
                            if (i.length !== n.length) return !1;
                            for (var s, o, r = 0; r < i.length; r++)
                                if (s = i[r], o = n[r], s.filename !== o.filename || s.lineno !== o.lineno || s.colno !== o.colno || s["function"] !== o["function"]) return !1;
                            return !0
                        }

                        function g(t) {
                            return function (t) {
                                return ~-encodeURI(t).split(/%..|./).length
                            }(JSON.stringify(t))
                        }

                        function v(t) {
                            if ("string" == typeof t) {
                                return u(t, 40)
                            }
                            if ("number" == typeof t || "boolean" == typeof t || void 0 === t) return t;
                            var e = Object.prototype.toString.call(t);
                            return "[object Object]" === e ? "[Object]" : "[object Array]" === e ? "[Array]" : "[object Function]" === e ? t.name ? "[Function: " + t.name + "]" : "[Function]" : t
                        }

                        function b(t, e) {
                            return 0 === e ? v(t) : r(t) ? Object.keys(t).reduce((function (i, n) {
                                return i[n] = b(t[n], e - 1), i
                            }), {}) : Array.isArray(t) ? t.map((function (t) {
                                return b(t, e - 1)
                            })) : v(t)
                        }
                        var w = t(7),
                            x = "undefined" != typeof window ? window : void 0 !== i ? i : "undefined" != typeof self ? self : {},
                            C = 3,
                            k = 51200,
                            _ = 40;
                        e.exports = {
                            isObject: function (t) {
                                return "object" == typeof t && null !== t
                            },
                            isError: n,
                            isErrorEvent: function (t) {
                                return "[object ErrorEvent]" === Object.prototype.toString.call(t)
                            },
                            isDOMError: s,
                            isDOMException: function (t) {
                                return "[object DOMException]" === Object.prototype.toString.call(t)
                            },
                            isUndefined: o,
                            isFunction: function (t) {
                                return "function" == typeof t
                            },
                            isPlainObject: r,
                            isString: a,
                            isArray: l,
                            isEmptyObject: function (t) {
                                if (!r(t)) return !1;
                                for (var e in t)
                                    if (t.hasOwnProperty(e)) return !1;
                                return !0
                            },
                            supportsErrorEvent: function () {
                                try {
                                    return new ErrorEvent(""), !0
                                } catch (t) {
                                    return !1
                                }
                            },
                            supportsDOMError: function () {
                                try {
                                    return new DOMError(""), !0
                                } catch (t) {
                                    return !1
                                }
                            },
                            supportsDOMException: function () {
                                try {
                                    return new DOMException(""), !0
                                } catch (t) {
                                    return !1
                                }
                            },
                            supportsFetch: h,
                            supportsReferrerPolicy: function () {
                                if (!h()) return !1;
                                try {
                                    return new Request("pickleRick", {
                                        referrerPolicy: "origin"
                                    }), !0
                                } catch (t) {
                                    return !1
                                }
                            },
                            supportsPromiseRejectionEvent: function () {
                                return "function" == typeof PromiseRejectionEvent
                            },
                            wrappedCallback: function (t) {
                                return function (e, i) {
                                    var n = t(e) || e;
                                    return i && i(n) || n
                                }
                            },
                            each: c,
                            objectMerge: function (t, e) {
                                return e ? (c(e, (function (e, i) {
                                    t[e] = i
                                })), t) : t
                            },
                            truncate: u,
                            objectFrozen: function (t) {
                                return !!Object.isFrozen && Object.isFrozen(t)
                            },
                            hasKey: d,
                            joinRegExp: p,
                            urlencode: function (t) {
                                var e = [];
                                return c(t, (function (t, i) {
                                    e.push(encodeURIComponent(t) + "=" + encodeURIComponent(i))
                                })), e.join("&")
                            },
                            uuid4: function () {
                                var t = x.crypto || x.msCrypto;
                                if (!o(t) && t.getRandomValues) {
                                    var e = new Uint16Array(8);
                                    t.getRandomValues(e), e[3] = 4095 & e[3] | 16384, e[4] = 16383 & e[4] | 32768;
                                    var i = function (t) {
                                        for (var e = t.toString(16); e.length < 4;) e = "0" + e;
                                        return e
                                    };
                                    return i(e[0]) + i(e[1]) + i(e[2]) + i(e[3]) + i(e[4]) + i(e[5]) + i(e[6]) + i(e[7])
                                }
                                return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (function (t) {
                                    var e = 16 * Math.random() | 0;
                                    return ("x" === t ? e : 3 & e | 8).toString(16)
                                }))
                            },
                            htmlTreeAsString: function (t) {
                                for (var e, i = [], n = 0, s = 0, o = " > ".length; t && n++ < 5 && !("html" === (e = f(t)) || n > 1 && s + i.length * o + e.length >= 80);) i.push(e), s += e.length, t = t.parentNode;
                                return i.reverse().join(" > ")
                            },
                            htmlElementAsString: f,
                            isSameException: function (t, e) {
                                return !m(t, e) && (t = t.values[0], e = e.values[0], t.type === e.type && t.value === e.value && ! function (t, e) {
                                    return o(t) && o(e)
                                }(t.stacktrace, e.stacktrace) && y(t.stacktrace, e.stacktrace))
                            },
                            isSameStacktrace: y,
                            parseUrl: function (t) {
                                if ("string" != typeof t) return {};
                                var e = t.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/),
                                    i = e[6] || "",
                                    n = e[8] || "";
                                return {
                                    protocol: e[2],
                                    host: e[4],
                                    path: e[5],
                                    relative: e[5] + i + n
                                }
                            },
                            fill: function (t, e, i, n) {
                                if (null != t) {
                                    var s = t[e];
                                    t[e] = i(s), t[e].M = !0, t[e].O = s, n && n.push([t, e, s])
                                }
                            },
                            safeJoin: function (t, e) {
                                if (!l(t)) return "";
                                for (var i = [], s = 0; s < t.length; s++) try {
                                    i.push(String(t[s]))
                                } catch (n) {
                                    i.push("[value cannot be serialized]")
                                }
                                return i.join(e)
                            },
                            serializeException: function E(t, e, i) {
                                if (!r(t)) return t;
                                i = "number" != typeof (e = "number" != typeof e ? C : e) ? k : i;
                                var n = b(t, e);
                                return g(w(n)) > i ? E(t, e - 1) : n
                            },
                            serializeKeysForMessage: function (t, e) {
                                if ("number" == typeof t || "string" == typeof t) return t.toString();
                                if (!Array.isArray(t)) return "";
                                if (0 === (t = t.filter((function (t) {
                                        return "string" == typeof t
                                    }))).length) return "[object has no keys]";
                                if (e = "number" != typeof e ? _ : e, t[0].length >= e) return t[0];
                                for (var i = t.length; i > 0; i--) {
                                    var n = t.slice(0, i).join(", ");
                                    if (!(n.length > e)) return i === t.length ? n : n + "…"
                                }
                                return ""
                            },
                            sanitize: function (t, e) {
                                if (!l(e) || l(e) && 0 === e.length) return t;
                                var i, n = p(e),
                                    o = "********";
                                try {
                                    i = JSON.parse(w(t))
                                } catch (s) {
                                    return t
                                }
                                return function a(t) {
                                    return l(t) ? t.map((function (t) {
                                        return a(t)
                                    })) : r(t) ? Object.keys(t).reduce((function (e, i) {
                                        return e[i] = n.test(i) ? o : a(t[i]), e
                                    }), {}) : t
                                }(i)
                            }
                        }
                    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                }, {
                    7: 7
                }],
                6: [function (t, e, i) {
                    (function (i) {
                        function n() {
                            return "undefined" == typeof document || null == document.location ? "" : document.location.href
                        }
                        var s = t(5),
                            o = {
                                collectWindowErrors: !0,
                                debug: !1
                            },
                            r = "undefined" != typeof window ? window : void 0 !== i ? i : "undefined" != typeof self ? self : {},
                            a = [].slice,
                            l = "?",
                            h = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
                        o.report = function () {
                            function t(e, i) {
                                var n = null;
                                if (!i || o.collectWindowErrors) {
                                    for (var s in p)
                                        if (p.hasOwnProperty(s)) try {
                                            p[s].apply(null, [e].concat(a.call(arguments, 2)))
                                        } catch (t) {
                                            n = t
                                        }
                                    if (n) throw n
                                }
                            }

                            function e(e, r, a, c, d) {
                                var p = s.isErrorEvent(d) ? d.error : d,
                                    f = s.isErrorEvent(e) ? e.message : e;
                                if (y) o.computeStackTrace.augmentStackTraceWithInitialElement(y, r, a, f), i();
                                else if (p && s.isError(p)) t(o.computeStackTrace(p), !0);
                                else {
                                    var m, g = {
                                            url: r,
                                            line: a,
                                            column: c
                                        },
                                        v = void 0;
                                    if ("[object String]" === {}.toString.call(f))(m = f.match(h)) && (v = m[1], f = m[2]);
                                    g.func = l, t({
                                        name: v,
                                        message: f,
                                        url: n(),
                                        stack: [g]
                                    }, !0)
                                }
                                return !!u && u.apply(this, arguments)
                            }

                            function i() {
                                var e = y,
                                    i = f;
                                f = null, y = null, m = null, t.apply(null, [e, !1].concat(i))
                            }

                            function c(t, e) {
                                var n = a.call(arguments, 1);
                                if (y) {
                                    if (m === t) return;
                                    i()
                                }
                                var s = o.computeStackTrace(t);
                                if (y = s, m = t, f = n, setTimeout((function () {
                                        m === t && i()
                                    }), s.incomplete ? 2e3 : 0), !1 !== e) throw t
                            }
                            var u, d, p = [],
                                f = null,
                                m = null,
                                y = null;
                            return c.subscribe = function (t) {
                                d || (u = r.onerror, r.onerror = e, d = !0), p.push(t)
                            }, c.unsubscribe = function (t) {
                                for (var e = p.length - 1; e >= 0; --e) p[e] === t && p.splice(e, 1)
                            }, c.uninstall = function () {
                                d && (r.onerror = u, d = !1, u = void 0), p = []
                            }, c
                        }(), o.computeStackTrace = function () {
                            function t(t) {
                                if ("undefined" != typeof t.stack && t.stack) {
                                    for (var e, i, s, o = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, r = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx(?:-web)|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, a = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i, h = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, c = /\((\S*)(?::(\d+))(?::(\d+))\)/, u = t.stack.split("\n"), d = [], p = (/^(.*) is undefined$/.exec(t.message), 0), f = u.length; p < f; ++p) {
                                        if (i = o.exec(u[p])) {
                                            var m = i[2] && 0 === i[2].indexOf("native");
                                            i[2] && 0 === i[2].indexOf("eval") && (e = c.exec(i[2])) && (i[2] = e[1], i[3] = e[2], i[4] = e[3]), s = {
                                                url: m ? null : i[2],
                                                func: i[1] || l,
                                                args: m ? [i[2]] : [],
                                                line: i[3] ? +i[3] : null,
                                                column: i[4] ? +i[4] : null
                                            }
                                        } else if (i = r.exec(u[p])) s = {
                                            url: i[2],
                                            func: i[1] || l,
                                            args: [],
                                            line: +i[3],
                                            column: i[4] ? +i[4] : null
                                        };
                                        else {
                                            if (!(i = a.exec(u[p]))) continue;
                                            i[3] && i[3].indexOf(" > eval") > -1 && (e = h.exec(i[3])) ? (i[3] = e[1], i[4] = e[2], i[5] = null) : 0 !== p || i[5] || "undefined" == typeof t.columnNumber || (d[0].column = t.columnNumber + 1), s = {
                                                url: i[3],
                                                func: i[1] || l,
                                                args: i[2] ? i[2].split(",") : [],
                                                line: i[4] ? +i[4] : null,
                                                column: i[5] ? +i[5] : null
                                            }
                                        }
                                        if (!s.func && s.line && (s.func = l), s.url && "blob:" === s.url.substr(0, 5)) {
                                            var y = new XMLHttpRequest;
                                            if (y.open("GET", s.url, !1), y.send(null), 200 === y.status) {
                                                var g = y.responseText || "",
                                                    v = (g = g.slice(-300)).match(/\/\/# sourceMappingURL=(.*)$/);
                                                if (v) {
                                                    var b = v[1];
                                                    "~" === b.charAt(0) && (b = ("undefined" == typeof document || null == document.location ? "" : document.location.origin ? document.location.origin : document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "")) + b.slice(1)), s.url = b.slice(0, -4)
                                                }
                                            }
                                        }
                                        d.push(s)
                                    }
                                    return d.length ? {
                                        name: t.name,
                                        message: t.message,
                                        url: n(),
                                        stack: d
                                    } : null
                                }
                            }

                            function e(t, e, i, n) {
                                var s = {
                                    url: e,
                                    line: i
                                };
                                if (s.url && s.line) {
                                    if (t.incomplete = !1, s.func || (s.func = l), t.stack.length > 0 && t.stack[0].url === s.url) {
                                        if (t.stack[0].line === s.line) return !1;
                                        if (!t.stack[0].line && t.stack[0].func === s.func) return t.stack[0].line = s.line, !1
                                    }
                                    return t.stack.unshift(s), t.partial = !0, !0
                                }
                                return t.incomplete = !0, !1
                            }

                            function i(t, r) {
                                for (var a, h, c = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, u = [], d = {}, p = !1, f = i.caller; f && !p; f = f.caller)
                                    if (f !== s && f !== o.report) {
                                        if (h = {
                                                url: null,
                                                func: l,
                                                line: null,
                                                column: null
                                            }, f.name ? h.func = f.name : (a = c.exec(f.toString())) && (h.func = a[1]), "undefined" == typeof h.func) try {
                                            h.func = a.input.substring(0, a.input.indexOf("{"))
                                        } catch (y) {}
                                        d["" + f] ? p = !0 : d["" + f] = !0, u.push(h)
                                    } r && u.splice(0, r);
                                var m = {
                                    name: t.name,
                                    message: t.message,
                                    url: n(),
                                    stack: u
                                };
                                return e(m, t.sourceURL || t.fileName, t.line || t.lineNumber, t.message || t.description), m
                            }

                            function s(e, s) {
                                var a = null;
                                s = null == s ? 0 : +s;
                                try {
                                    if (a = t(e)) return a
                                } catch (r) {
                                    if (o.debug) throw r
                                }
                                try {
                                    if (a = i(e, s + 1)) return a
                                } catch (r) {
                                    if (o.debug) throw r
                                }
                                return {
                                    name: e.name,
                                    message: e.message,
                                    url: n()
                                }
                            }
                            return s.augmentStackTraceWithInitialElement = e, s.computeStackTraceFromStackProp = t, s
                        }(), e.exports = o
                    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                }, {
                    5: 5
                }],
                7: [function (t, e, i) {
                    function n(t, e) {
                        for (var i = 0; i < t.length; ++i)
                            if (t[i] === e) return i;
                        return -1
                    }

                    function s(t, e) {
                        var i = [],
                            s = [];
                        return null == e && (e = function (t, e) {
                                return i[0] === e ? "[Circular ~]" : "[Circular ~." + s.slice(0, n(i, e)).join(".") + "]"
                            }),
                            function (o, r) {
                                if (i.length > 0) {
                                    var a = n(i, this);
                                    ~a ? i.splice(a + 1) : i.push(this), ~a ? s.splice(a, 1 / 0, o) : s.push(o), ~n(i, r) && (r = e.call(this, o, r))
                                } else i.push(r);
                                return null == t ? r instanceof Error ? function (t) {
                                    var e = {
                                        stack: t.stack,
                                        message: t.message,
                                        name: t.name
                                    };
                                    for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                                    return e
                                }(r) : r : t.call(this, o, r)
                            }
                    }
                    i = e.exports = function (t, e, i, n) {
                        return JSON.stringify(t, s(e, n), i)
                    }, i.getSerialize = s
                }, {}],
                8: [function (t, e, i) {
                    function n(t, e) {
                        var i = (65535 & t) + (65535 & e);
                        return (t >> 16) + (e >> 16) + (i >> 16) << 16 | 65535 & i
                    }

                    function s(t, e, i, s, o, r) {
                        return n(function (t, e) {
                            return t << e | t >>> 32 - e
                        }(n(n(e, t), n(s, r)), o), i)
                    }

                    function o(t, e, i, n, o, r, a) {
                        return s(e & i | ~e & n, t, e, o, r, a)
                    }

                    function r(t, e, i, n, o, r, a) {
                        return s(e & n | i & ~n, t, e, o, r, a)
                    }

                    function a(t, e, i, n, o, r, a) {
                        return s(e ^ i ^ n, t, e, o, r, a)
                    }

                    function l(t, e, i, n, o, r, a) {
                        return s(i ^ (e | ~n), t, e, o, r, a)
                    }

                    function h(t, e) {
                        t[e >> 5] |= 128 << e % 32, t[14 + (e + 64 >>> 9 << 4)] = e;
                        var i, s, h, c, u, d = 1732584193,
                            p = -271733879,
                            f = -1732584194,
                            m = 271733878;
                        for (i = 0; i < t.length; i += 16) s = d, h = p, c = f, u = m, d = o(d, p, f, m, t[i], 7, -680876936), m = o(m, d, p, f, t[i + 1], 12, -389564586), f = o(f, m, d, p, t[i + 2], 17, 606105819), p = o(p, f, m, d, t[i + 3], 22, -1044525330), d = o(d, p, f, m, t[i + 4], 7, -176418897), m = o(m, d, p, f, t[i + 5], 12, 1200080426), f = o(f, m, d, p, t[i + 6], 17, -1473231341), p = o(p, f, m, d, t[i + 7], 22, -45705983), d = o(d, p, f, m, t[i + 8], 7, 1770035416), m = o(m, d, p, f, t[i + 9], 12, -1958414417), f = o(f, m, d, p, t[i + 10], 17, -42063), p = o(p, f, m, d, t[i + 11], 22, -1990404162), d = o(d, p, f, m, t[i + 12], 7, 1804603682), m = o(m, d, p, f, t[i + 13], 12, -40341101), f = o(f, m, d, p, t[i + 14], 17, -1502002290), d = r(d, p = o(p, f, m, d, t[i + 15], 22, 1236535329), f, m, t[i + 1], 5, -165796510), m = r(m, d, p, f, t[i + 6], 9, -1069501632), f = r(f, m, d, p, t[i + 11], 14, 643717713), p = r(p, f, m, d, t[i], 20, -373897302), d = r(d, p, f, m, t[i + 5], 5, -701558691), m = r(m, d, p, f, t[i + 10], 9, 38016083), f = r(f, m, d, p, t[i + 15], 14, -660478335), p = r(p, f, m, d, t[i + 4], 20, -405537848), d = r(d, p, f, m, t[i + 9], 5, 568446438), m = r(m, d, p, f, t[i + 14], 9, -1019803690), f = r(f, m, d, p, t[i + 3], 14, -187363961), p = r(p, f, m, d, t[i + 8], 20, 1163531501), d = r(d, p, f, m, t[i + 13], 5, -1444681467), m = r(m, d, p, f, t[i + 2], 9, -51403784), f = r(f, m, d, p, t[i + 7], 14, 1735328473), d = a(d, p = r(p, f, m, d, t[i + 12], 20, -1926607734), f, m, t[i + 5], 4, -378558), m = a(m, d, p, f, t[i + 8], 11, -2022574463), f = a(f, m, d, p, t[i + 11], 16, 1839030562), p = a(p, f, m, d, t[i + 14], 23, -35309556), d = a(d, p, f, m, t[i + 1], 4, -1530992060), m = a(m, d, p, f, t[i + 4], 11, 1272893353), f = a(f, m, d, p, t[i + 7], 16, -155497632), p = a(p, f, m, d, t[i + 10], 23, -1094730640), d = a(d, p, f, m, t[i + 13], 4, 681279174), m = a(m, d, p, f, t[i], 11, -358537222), f = a(f, m, d, p, t[i + 3], 16, -722521979), p = a(p, f, m, d, t[i + 6], 23, 76029189), d = a(d, p, f, m, t[i + 9], 4, -640364487), m = a(m, d, p, f, t[i + 12], 11, -421815835), f = a(f, m, d, p, t[i + 15], 16, 530742520), d = l(d, p = a(p, f, m, d, t[i + 2], 23, -995338651), f, m, t[i], 6, -198630844), m = l(m, d, p, f, t[i + 7], 10, 1126891415), f = l(f, m, d, p, t[i + 14], 15, -1416354905), p = l(p, f, m, d, t[i + 5], 21, -57434055), d = l(d, p, f, m, t[i + 12], 6, 1700485571), m = l(m, d, p, f, t[i + 3], 10, -1894986606), f = l(f, m, d, p, t[i + 10], 15, -1051523), p = l(p, f, m, d, t[i + 1], 21, -2054922799), d = l(d, p, f, m, t[i + 8], 6, 1873313359), m = l(m, d, p, f, t[i + 15], 10, -30611744), f = l(f, m, d, p, t[i + 6], 15, -1560198380), p = l(p, f, m, d, t[i + 13], 21, 1309151649), d = l(d, p, f, m, t[i + 4], 6, -145523070), m = l(m, d, p, f, t[i + 11], 10, -1120210379), f = l(f, m, d, p, t[i + 2], 15, 718787259), p = l(p, f, m, d, t[i + 9], 21, -343485551), d = n(d, s), p = n(p, h), f = n(f, c), m = n(m, u);
                        return [d, p, f, m]
                    }

                    function c(t) {
                        var e, i = "",
                            n = 32 * t.length;
                        for (e = 0; e < n; e += 8) i += String.fromCharCode(t[e >> 5] >>> e % 32 & 255);
                        return i
                    }

                    function u(t) {
                        var e, i = [];
                        for (i[(t.length >> 2) - 1] = void 0, e = 0; e < i.length; e += 1) i[e] = 0;
                        var n = 8 * t.length;
                        for (e = 0; e < n; e += 8) i[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;
                        return i
                    }

                    function d(t) {
                        var e, i, n = "0123456789abcdef",
                            s = "";
                        for (i = 0; i < t.length; i += 1) e = t.charCodeAt(i), s += n.charAt(e >>> 4 & 15) + n.charAt(15 & e);
                        return s
                    }

                    function p(t) {
                        return unescape(encodeURIComponent(t))
                    }

                    function f(t) {
                        return function (t) {
                            return c(h(u(t), 8 * t.length))
                        }(p(t))
                    }

                    function m(t, e) {
                        return function (t, e) {
                            var i, n, s = u(t),
                                o = [],
                                r = [];
                            for (o[15] = r[15] = void 0, s.length > 16 && (s = h(s, 8 * t.length)), i = 0; i < 16; i += 1) o[i] = 909522486 ^ s[i], r[i] = 1549556828 ^ s[i];
                            return n = h(o.concat(u(e)), 512 + 8 * e.length), c(h(r.concat(n), 640))
                        }(p(t), p(e))
                    }
                    e.exports = function (t, e, i) {
                        return e ? i ? m(e, t) : function (t, e) {
                            return d(m(t, e))
                        }(e, t) : i ? f(t) : function (t) {
                            return d(f(t))
                        }(t)
                    }
                }, {}]
            }, {}, [4])(4)
        }));
    var A = {
            getCookie: function (t) {
                var e = document.cookie.replace(/ /g, "").split(";");
                try {
                    for (var i = "", n = e.length; n-- && !i;) e[n].indexOf(t) >= 0 && (i = e[n]);
                    return i
                } catch (Ts) {
                    return ""
                }
            },
            hasCookie: function (t) {
                return !!A.getCookie(t)
            },
            supportsAPI: function () {
                try {
                    return "hasStorageAccess" in document && "requestStorageAccess" in document
                } catch (Ts) {
                    return !1
                }
            },
            hasAccess: function () {
                return new Promise((function (t) {
                    document.hasStorageAccess().then((function () {
                        t(!0)
                    }))["catch"]((function () {
                        t(!1)
                    }))
                }))
            },
            requestAccess: function () {
                try {
                    return document.requestStorageAccess()
                } catch (Ts) {
                    return Promise.resolve()
                }
            }
        },
        L = {
            array: function (t) {
                if (0 === t.length) return t;
                for (var e, i, n = t.length; --n > -1;) i = Math.floor(Math.random() * (n + 1)), e = t[n], t[n] = t[i], t[i] = e;
                return t
            }
        };

    function H(t) {
        this.r = 255, this.g = 255, this.b = 255, this.a = 1, this.h = 1, this.s = 1, this.l = 1, this.parseString(t)
    }

    function B(t, e, i) {
        return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + 6 * (e - t) * i : i < .5 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t
    }
    H.hasAlpha = function (t) {
        return "string" == typeof t && (-1 !== t.indexOf("rgba") || 9 === t.length && "#" === t[0])
    }, H.prototype.parseString = function (t) {
        t && (0 === t.indexOf("#") ? this.fromHex(t) : 0 === t.indexOf("rgb") && this.fromRGBA(t))
    }, H.prototype.fromHex = function (t) {
        var e = 1;
        9 === t.length && (e = parseInt(t.substr(7, 2), 16) / 255);
        var i = (t = t.substr(1, 6)).replace(/^([a-f\d])([a-f\d])([a-f\d])?$/i, (function (t, e, i, n) {
                return e + e + i + i + n + n
            })),
            n = parseInt(i, 16),
            s = n >> 16,
            o = n >> 8 & 255,
            r = 255 & n;
        this.setRGBA(s, o, r, e)
    }, H.prototype.fromRGBA = function (t) {
        var e = t.indexOf("rgba"),
            i = t.substr(e).replace(/rgba?\(/, "").replace(/\)/, "").replace(/[\s+]/g, "").split(","),
            n = Math.floor(parseInt(i[0])),
            s = Math.floor(parseInt(i[1])),
            o = Math.floor(parseInt(i[2])),
            r = parseFloat(i[3]);
        this.setRGBA(n, s, o, r)
    }, H.prototype.setRGB = function (t, e, i) {
        this.setRGBA(t, e, i, 1)
    }, H.prototype.setRGBA = function (t, e, i, n) {
        this.r = t, this.g = e, this.b = i, this.a = isNaN(n) ? this.a : n, this.updateHSL()
    }, H.prototype.hsl2rgb = function (t, e, i) {
        if (0 === e) {
            var n = Math.round(255 * i);
            return this.setRGB(n, n, n), this
        }
        var s = i <= .5 ? i * (1 + e) : i + e - i * e,
            o = 2 * i - s;
        return this.r = Math.round(255 * B(o, s, t + 1 / 3)), this.g = Math.round(255 * B(o, s, t)), this.b = Math.round(255 * B(o, s, t - 1 / 3)), this.h = t, this.s = e, this.l = i, this
    }, H.prototype.updateHSL = function () {
        var t, e = this.r / 255,
            i = this.g / 255,
            n = this.b / 255,
            s = Math.max(e, i, n),
            o = Math.min(e, i, n),
            r = null,
            a = (s + o) / 2;
        if (s === o) r = t = 0;
        else {
            var l = s - o;
            switch (t = a > .5 ? l / (2 - s - o) : l / (s + o), s) {
                case e:
                    r = (i - n) / l + (i < n ? 6 : 0);
                    break;
                case i:
                    r = (n - e) / l + 2;
                    break;
                case n:
                    r = (e - i) / l + 4
            }
            r /= 6
        }
        return this.h = r, this.s = t, this.l = a, this
    }, H.prototype.getHex = function () {
        return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1)
    }, H.prototype.getRGBA = function () {
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
    }, H.prototype.clone = function () {
        var t = new H;
        return t.setRGBA(this.r, this.g, this.b, this.a), t
    }, H.prototype.mix = function (t, e) {
        t instanceof H || (t = new H(t));
        var i = new H,
            n = Math.round(this.r + e * (t.r - this.r)),
            s = Math.round(this.g + e * (t.g - this.g)),
            o = Math.round(this.b + e * (t.b - this.b));
        return i.setRGB(n, s, o), i
    }, H.prototype.blend = function (t, e) {
        var i;
        t instanceof H || (t = new H(t));
        for (var n = [], s = 0; s < e; s++) i = this.mix.call(this, t, s / e), n.push(i);
        return n
    }, H.prototype.lightness = function (t) {
        return t > 1 && (t /= 100), this.hsl2rgb(this.h, this.s, t), this
    }, H.prototype.saturation = function (t) {
        return t > 1 && (t /= 100), this.hsl2rgb(this.h, t, this.l), this
    }, H.prototype.hue = function (t) {
        return this.hsl2rgb(t / 360, this.s, this.l), this
    };
    var M = {
            decode: function (t) {
                try {
                    var e = t.split(".");
                    return {
                        header: JSON.parse(atob(e[0])),
                        payload: JSON.parse(atob(e[1])),
                        signature: atob(e[2].replace(/_/g, "/").replace(/-/g, "+")),
                        raw: {
                            header: e[0],
                            payload: e[1],
                            signature: e[2]
                        }
                    }
                } catch (Ts) {
                    throw new Error("Token is invalid.")
                }
            },
            checkExpiration: function (t) {
                if (new Date(1e3 * t) <= new Date(Date.now())) throw new Error("Token is expired.");
                return !0
            }
        },
        V = {
            _setup: !1,
            _af: null,
            _fps: 60,
            _singleFrame: 1 / 60,
            _lagThreshold: 500,
            _adjustedLag: 1 / 60 * 2,
            _startTime: 0,
            _lastTime: 0,
            _nextTime: 1 / 60,
            _elapsed: 0,
            _difference: 0,
            _renders: [],
            _paused: !1,
            _running: !1,
            _tick: !1,
            frame: 0,
            time: 0,
            requestFrame: null,
            cancelFrame: null,
            _init: function () {
                for (var t, e = window.requestAnimationFrame, i = window.cancelAnimationFrame, n = ["ms", "moz", "webkit", "o"], s = n.length; --s > -1 && !e;) e = window[n[s] + "RequestAnimationFrame"], i = window[n[s] + "CancelAnimationFrame"] || window[n[s] + "CancelRequestAnimationFrame"];
                e ? (V.requestFrame = e.bind(window), V.cancelFrame = i.bind(window)) : (V.requestFrame = (t = Date.now(), function (e) {
                    window.setTimeout((function () {
                        e(Date.now() - t)
                    }), 1e3 * V._singleFrame)
                }), V.cancelFrame = function (t) {
                    return clearTimeout(t), null
                }), V._setup = !0, V._startTime = V._lastTime = Date.now()
            },
            add: function (t, e) {
                V._renders.push({
                    callback: t,
                    paused: !1 == !e || !1
                }), !1 == !e && V.start()
            },
            remove: function (t) {
                for (var e = V._renders.length; --e > -1;) V._renders[e].callback === t && (V._renders[e].paused = !0, V._renders.splice(e, 1))
            },
            start: function (t) {
                if (!1 === V._setup && V._init(), t)
                    for (var e = V._renders.length; --e > -1;) V._renders[e].callback === t && (V._renders[e].paused = !1);
                !0 !== V._running && (V._paused = !1, V._running = !0, V._af = V.requestFrame(V._update))
            },
            stop: function (t) {
                if (t)
                    for (var e = V._renders.length; --e > -1;) V._renders[e].callback === t && (V._renders[e].paused = !0);
                else !1 !== V._running && (V._af = V.cancelFrame(V._af), V._paused = !0, V._running = !1)
            },
            elapsed: function () {
                return Date.now() - V._startTime
            },
            fps: function (t) {
                return arguments.length ? (V._fps = t, V._singleFrame = 1 / (V._fps || 60), V._adjustedLag = 2 * V._singleFrame, V._nextTime = V.time + V._singleFrame, V._fps) : V._fps
            },
            isRunning: function () {
                return V._running
            },
            _update: function () {
                if (!V._paused && (V._elapsed = Date.now() - V._lastTime, V._tick = !1, V._elapsed > V._lagThreshold && (V._startTime += V._elapsed - V._adjustedLag), V._lastTime += V._elapsed, V.time = (V._lastTime - V._startTime) / 1e3, V._difference = V.time - V._nextTime, V._difference > 0 && (V.frame++, V._nextTime += V._difference + (V._difference >= V._singleFrame ? V._singleFrame / 4 : V._singleFrame - V._difference), V._tick = !0), V._af = V.requestFrame(V._update), !0 === V._tick && V._renders.length > 0))
                    for (var t = V._renders.length; --t > -1;) V._renders[t] && !1 === V._renders[t].paused && V._renders[t].callback(V.time)
            }
        },
        O = [{
            family: "UC Browser",
            patterns: ["(UC? ?Browser|UCWEB|U3)[ /]?(\\d+)\\.(\\d+)\\.(\\d+)"]
        }, {
            family: "Opera",
            name_replace: "Opera Mobile",
            patterns: ["(Opera)/.+Opera Mobi.+Version/(\\d+)\\.(\\d+)", "(Opera)/(\\d+)\\.(\\d+).+Opera Mobi", "Opera Mobi.+(Opera)(?:/|\\s+)(\\d+)\\.(\\d+)", "Opera Mobi", "(?:Mobile Safari).*(OPR)/(\\d+)\\.(\\d+)\\.(\\d+)"]
        }, {
            family: "Opera",
            name_replace: "Opera Mini",
            patterns: ["(Opera Mini)(?:/att|)/?(\\d+|)(?:\\.(\\d+)|)(?:\\.(\\d+)|)", "(OPiOS)/(\\d+).(\\d+).(\\d+)"]
        }, {
            family: "Opera",
            name_replace: "Opera Neon",
            patterns: ["Chrome/.+( MMS)/(\\d+).(\\d+).(\\d+)"]
        }, {
            name_replace: "Opera",
            patterns: ["(Opera)/9.80.*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(?:Chrome).*(OPR)/(\\d+)\\.(\\d+)\\.(\\d+)"]
        }, {
            family: "Firefox",
            name_replace: "Firefox Mobile",
            patterns: ["(Fennec)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)", "(Fennec)/(\\d+)\\.(\\d+)(pre)", "(Fennec)/(\\d+)\\.(\\d+)", "(?:Mobile|Tablet);.*(Firefox)/(\\d+)\\.(\\d+)", "(FxiOS)/(\\d+)\\.(\\d+)(\\.(\\d+)|)(\\.(\\d+)|)"]
        }, {
            name_replace: "Coc Coc",
            patterns: ["(coc_coc_browser)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)"]
        }, {
            family: "QQ",
            name_replace: "QQ Mini",
            patterns: ["(MQQBrowser/Mini)(?:(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)|)"]
        }, {
            family: "QQ",
            name_replace: "QQ Mobile",
            patterns: ["(MQQBrowser)(?:/(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)|)"]
        }, {
            name_replace: "QQ",
            patterns: ["(QQBrowser)(?:/(\\d+)(?:\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)|)"]
        }, {
            family: "Edge",
            name: "Edge Mobile",
            patterns: ["Windows Phone .*(Edge)/(\\d+)\\.(\\d+)", "(EdgiOS|EdgA)/(\\d+)\\.(\\d+).(\\d+).(\\d+)"]
        }, {
            name_replace: "Edge",
            patterns: ["(Edge|Edg)/(\\d+)(?:\\.(\\d+)|)"]
        }, {
            patterns: ["(Puffin)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)"]
        }, {
            family: "Chrome",
            name_replace: "Chrome Mobile",
            patterns: ["Version/.+(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "; wv\\).+(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(CriOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(CrMo)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+) Mobile(?:[ /]|$)", " Mobile .*(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)"]
        }, {
            family: "Yandex",
            name_replace: "Yandex Mobile",
            patterns: ["(YaBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+).*Mobile"]
        }, {
            name_replace: "Yandex",
            patterns: ["(YaBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)"]
        }, {
            patterns: ["(Vivaldi)/(\\d+)\\.(\\d+)", "(Vivaldi)/(\\d+)\\.(\\d+)\\.(\\d+)"]
        }, {
            name_replace: "Brave",
            patterns: ["(brave)/(\\d+)\\.(\\d+)\\.(\\d+) Chrome"]
        }, {
            family: "Chrome",
            patterns: ["(Chromium|Chrome)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)"]
        }, {
            name_replace: "Internet Explorer Mobile",
            patterns: ["(IEMobile)[ /](\\d+)\\.(\\d+)"]
        }, {
            family: "Safari",
            name_replace: "Safari Mobile",
            patterns: ["(iPod|iPhone|iPad).+Version/(d+).(d+)(?:.(d+)|).*[ +]Safari", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).* AppleNews\\/\\d+\\.\\d+\\.\\d+?", "(iPod|iPhone|iPad).+Version/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).*Mobile.*[ +]Safari", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).*Mobile", "(iPod|iPod touch|iPhone|iPad).* Safari", "(iPod|iPod touch|iPhone|iPad)"]
        }, {
            name_replace: "Safari",
            patterns: ["(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|).*Safari/"]
        }, {
            name_replace: "Internet Explorer",
            patterns: ["(Trident)/(7|8).(0)"],
            major_replace: "11"
        }, {
            name_replace: "Internet Explorer",
            patterns: ["(Trident)/(6)\\.(0)"],
            major_replace: "10"
        }, {
            name_replace: "Internet Explorer",
            patterns: ["(Trident)/(5)\\.(0)"],
            major_replace: "9"
        }, {
            name_replace: "Internet Explorer",
            patterns: ["(Trident)/(4)\\.(0)"],
            major_replace: "8"
        }, {
            family: "Firefox",
            patterns: ["(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)", "(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*|)"]
        }],
        T = [{
            family: "Windows",
            name_replace: "Windows Phone",
            patterns: ["(Windows Phone) (?:OS[ /])?(\\d+)\\.(\\d+)", "^UCWEB.*; (wds) (\\d+)\\.(d+)(?:\\.(\\d+)|);", "^UCWEB.*; (wds) (\\d+)\\.(\\d+)(?:\\.(\\d+)|);"]
        }, {
            family: "Windows",
            name_replace: "Windows Mobile",
            patterns: ["(Windows ?Mobile)"]
        }, {
            name_replace: "Android",
            patterns: ["(Android)[ \\-/](\\d+)(?:\\.(\\d+)|)(?:[.\\-]([a-z0-9]+)|)", "(Android) (d+);", "^UCWEB.*; (Adr) (\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+)|);", "^(JUC).*; ?U; ?(?:Android|)(\\d+)\\.(\\d+)(?:[\\.\\-]([a-z0-9]+)|)", "(android)\\s(?:mobile\\/)(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)|)|)", "(Silk-Accelerated=[a-z]{4,5})", "Puffin/[\\d\\.]+AT", "Puffin/[\\d\\.]+AP"]
        }, {
            name_replace: "Chrome OS",
            patterns: ["(x86_64|aarch64)\\ (\\d+)\\.(\\d+)\\.(\\d+).*Chrome.*(?:CitrixChromeApp)$", "(CrOS) [a-z0-9_]+ (\\d+)\\.(\\d+)(?:\\.(\\d+)|)"]
        }, {
            name_replace: "Windows",
            patterns: ["(Windows 10)", "(Windows NT 6\\.4)", "(Windows NT 10\\.0)"],
            major_replace: "10"
        }, {
            name_replace: "Windows",
            patterns: ["(Windows NT 6\\.3; ARM;)", "(Windows NT 6.3)"],
            major_replace: "8",
            minor_replace: "1"
        }, {
            name_replace: "Windows",
            patterns: ["(Windows NT 6\\.2)"],
            major_replace: "8"
        }, {
            name_replace: "Windows",
            patterns: ["(Windows NT 6\\.1)"],
            major_replace: "7"
        }, {
            name_replace: "Windows",
            patterns: ["(Windows NT 6\\.0)"],
            major_replace: "Vista"
        }, {
            name_replace: "Windows",
            patterns: ["(Windows (?:NT 5\\.2|NT 5\\.1))"],
            major_replace: "XP"
        }, {
            name_replace: "Mac OS X",
            patterns: ["((?:Mac[ +]?|; )OS[ +]X)[\\s+/](?:(\\d+)[_.](\\d+)(?:[_.](\\d+)|)|Mach-O)", "\\w+\\s+Mac OS X\\s+\\w+\\s+(\\d+).(\\d+).(\\d+).*", "(?:PPC|Intel) (Mac OS X)"]
        }, {
            name_replace: "Mac OS X",
            patterns: [" (Dar)(win)/(10).(d+).*((?:i386|x86_64))"],
            major_replace: "10",
            minor_replace: "6"
        }, {
            name_replace: "Mac OS X",
            patterns: [" (Dar)(win)/(11).(\\d+).*\\((?:i386|x86_64)\\)"],
            major_replace: "10",
            minor_replace: "7"
        }, {
            name_replace: "Mac OS X",
            patterns: [" (Dar)(win)/(12).(\\d+).*\\((?:i386|x86_64)\\)"],
            major_replace: "10",
            minor_replace: "8"
        }, {
            name_replace: "Mac OS X",
            patterns: [" (Dar)(win)/(13).(\\d+).*\\((?:i386|x86_64)\\)"],
            major_replace: "10",
            minor_replace: "9"
        }, {
            name_replace: "iOS",
            patterns: ["^UCWEB.*; (iPad|iPh|iPd) OS (\\d+)_(\\d+)(?:_(\\d+)|);", "(CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS)[ +]+(\\d+)[_\\.](\\d+)(?:[_\\.](\\d+)|)", "(iPhone|iPad|iPod); Opera", "(iPhone|iPad|iPod).*Mac OS X.*Version/(\\d+)\\.(\\d+)", "\\b(iOS[ /]|iOS; |iPhone(?:/| v|[ _]OS[/,]|; | OS : |\\d,\\d/|\\d,\\d; )|iPad/)(\\d{1,2})[_\\.](\\d{1,2})(?:[_\\.](\\d+)|)", "\\((iOS);", "(iPod|iPhone|iPad)", "Puffin/[\\d\\.]+IT", "Puffin/[\\d\\.]+IP"]
        }, {
            family: "Chrome",
            name_replace: "Chromecast",
            patterns: ["(CrKey -)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "(CrKey[ +]armv7l)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "(CrKey)(?:[/](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)"]
        }, {
            name_replace: "Debian",
            patterns: ["([Dd]ebian)"]
        }, {
            family: "Linux",
            name_replace: "Linux",
            patterns: ["(Linux Mint)(?:/(\\d+)|)"]
        }, {
            family: "Linux",
            patterns: ["(Ubuntu|Kubuntu|Arch Linux|CentOS|Slackware|Gentoo|openSUSE|SUSE|Red Hat|Fedora|PCLinuxOS|Mageia|(?:Free|Open|Net|\\b)BSD)", "(Mandriva)(?: Linux|)/(?:[\\d.-]+m[a-z]{2}(\\d+).(\\d)|)", "(Linux)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "\\(linux-gnu\\)"]
        }, {
            family: "BlackBerry",
            name_replace: "BlackBerry OS",
            patterns: ["(BB10);.+Version/(\\d+)\\.(\\d+)\\.(\\d+)", "(Black[Bb]erry)[0-9a-z]+/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(Black[Bb]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(Black[Bb]erry)"]
        }, {
            patterns: ["(Fedora|Red Hat|PCLinuxOS|Puppy|Ubuntu|Kindle|Bada|Sailfish|Lubuntu|BackTrack|Slackware|(?:Free|Open|Net|\\b)BSD)[/ ](\\d+)\\.(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)"]
        }],
        F = navigator.userAgent,
        R = function () {
            return F
        },
        D = function (t) {
            return I(t || F, O)
        },
        $ = function (t) {
            return I(t || F, T)
        };

    function P(t, e) {
        try {
            var i = new RegExp(e).exec(t);
            return i ? {
                name: i[1] || "Other",
                major: i[2] || "0",
                minor: i[3] || "0",
                patch: i[4] || "0"
            } : null
        } catch (Ts) {
            return null
        }
    }

    function I(t, e) {
        for (var i = null, n = null, s = -1, o = !1; ++s < e.length && !o;) {
            i = e[s];
            for (var r = -1; ++r < i.patterns.length && !o;) o = null !== (n = P(t, i.patterns[r]))
        }
        return o ? (n.family = i.family || i.name_replace || n.name, i.name_replace && (n.name = i.name_replace), i.major_replace && (n.major = i.major_replace), i.minor_replace && (n.minor = i.minor_replace), i.patch_replace && (n.minor = i.patch_replace), n) : {
            family: "Other",
            name: "Other",
            major: "0",
            minor: "0",
            patch: "0"
        }
    }

    function j() {
        var t = this,
            e = D(),
            i = R();
        this.agent = i.toLowerCase(), this.language = window.navigator.userLanguage || window.navigator.language, this.isCSS1 = "CSS1Compat" === (document.compatMode || ""), this.width = function () {
            return window.innerWidth && window.document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || window.document.documentElement.clientWidth || document.body.clientWidth
        }, this.height = function () {
            return window.innerHeight || window.document.documentElement.clientHeight || document.body.clientHeight
        }, this.scrollX = function () {
            return window.pageXOffset !== undefined ? window.pageXOffset : t.isCSS1 ? document.documentElement.scrollLeft : document.body.scrollLeft
        }, this.scrollY = function () {
            return window.pageYOffset !== undefined ? window.pageYOffset : t.isCSS1 ? document.documentElement.scrollTop : document.body.scrollTop
        }, this.type = "Edge" === e.family ? "edge" : "Internet Explorer" === e.family ? "ie" : "Chrome" === e.family ? "chrome" : "Safari" === e.family ? "safari" : "Firefox" === e.family ? "firefox" : e.family.toLowerCase(), this.version = 1 * (e.major + "." + e.minor) || 0, this.hasPostMessage = !!window.postMessage
    }
    j.prototype.hasEvent = function (t, e) {
        return "on" + t in (e || document.createElement("div"))
    }, j.prototype.getScreenDimensions = function () {
        var t = {};
        for (var e in window.screen) t[e] = window.screen[e];
        return delete t.orientation, t
    }, j.prototype.interrogateNavigator = function () {
        var t = {};
        for (var e in window.navigator) try {
            t[e] = window.navigator[e]
        } catch (Os) {}
        if (delete t.plugins, delete t.mimeTypes, t.plugins = [], window.navigator.plugins)
            for (var i = 0; i < window.navigator.plugins.length; i++) t.plugins[i] = window.navigator.plugins[i].filename;
        return t
    }, j.prototype.supportsCanvas = function () {
        var t = document.createElement("canvas");
        return !(!t.getContext || !t.getContext("2d"))
    }, j.prototype.supportsWebAssembly = function () {
        try {
            if ("object" == typeof WebAssembly && "function" == typeof WebAssembly.instantiate) {
                var t = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
                if (t instanceof WebAssembly.Module) return new WebAssembly.Instance(t) instanceof WebAssembly.Instance
            }
        } catch (Ts) {
            return !1
        }
    };
    var N = {
            Browser: new j,
            System: new function () {
                var t, e, i = $(),
                    n = R();
                this.mobile = (t = !!("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0), e = !1, i && (e = ["iOS", "Windows Phone", "Windows Mobile", "Android", "BlackBerry OS"].indexOf(i.name) >= 0), t && e), this.dpr = function () {
                    return window.devicePixelRatio || 1
                }, this.mobile && i && "Windows" === i.family && n.indexOf("touch") < 0 && (this.mobile = !1), this.os = "iOS" === i.family ? "ios" : "Android" === i.family ? "android" : "Mac OS X" === i.family ? "mac" : "Windows" === i.family ? "windows" : "Linux" === i.family ? "linux" : i.family.toLowerCase(), this.version = function () {
                    if (!i) return "unknown";
                    var t = i.major;
                    return i.minor && (t += "." + i.minor), i.patch && (t += "." + i.patch), t
                }()
            }
        },
        Z = {
            host: null,
            file: null,
            sitekey: null,
            a11y_tfe: null,
            pingdom: "safari" === N.Browser.type && "windows" !== N.System.os && "mac" !== N.System.os && "ios" !== N.System.os && "android" !== N.System.os,
            assetDomain: "https://newassets.hcaptcha.com",
            assetUrl: "https://newassets.hcaptcha.com/captcha/v1/1f7dc62/static",
            width: null,
            height: null,
            mobile: null
        },
        z = {
            theme: {
                contrast: {
                    hcolor: "#FFF",
                    hfcolor: "#000"
                },
                light: {
                    hcolor: "#00838F",
                    hfcolor: "#FFF"
                }
            },
            text: "#555555",
            accent: "#926FC1",
            warn: {
                base: "#EB5757",
                hover: "#DE3F3F"
            },
            link: {
                base: "#00838f",
                hover: "#00838f"
            },
            white: "#fff",
            grey: {
                base: "#333",
                placeholder: "#f0eff0"
            },
            purple: "#65549b",
            hoverOff: "#00838f",
            skipHoverOff: "#737373",
            hoverOn: "#00838f",
            error: "#fc481e"
        },
        U = {
            se: null,
            custom: !1,
            tplinks: "on",
            language: null,
            reportapi: "https://accounts.hcaptcha.com",
            endpoint: "https://hcaptcha.com",
            endpointOverride: null,
            size: "normal",
            theme: "light",
            assethost: null,
            imghost: null,
            recaptchacompat: "true"
        },
        W = "https://30910f52569b4c17b1081ead2dae43b4@sentry.hcaptcha.com/6",
        q = "1f7dc62",
        G = "prod";

    function K(t, e) {
        t.style.width = "304px", t.style.height = "78px", t.style.backgroundColor = "#f9e5e5", t.style.position = "relative", t.innerHTML = "";
        var i = document.createElement("div");
        i.style.width = "284px", i.style.position = "absolute", i.style.top = "12px", i.style.left = "10px", i.style.color = "#7c0a06", i.style.fontSize = "14px", i.style.fontWeight = "normal", i.style.lineHeight = "18px", i.innerHTML = e || "Please <a style='color:inherit;text-decoration:underline; font: inherit' target='_blank' href='https://www.whatismybrowser.com/guides/how-to-update-your-browser/auto'>upgrade your browser</a> to complete this captcha.", t.appendChild(i)
    }
    var J = !0;

    function Y(t) {
        var e = {
            message: t.name + ": " + t.message
        };
        t.stack && (e.stack_trace = {
            trace: t.stack
        }), et("report error", "internal", "debug", e), Q("internal error", "error", Z.file)
    }

    function X(t) {
        J = t
    }

    function Q(t, e, i, n) {
        if (e = e || "error", J) {
            var s = "warn" === e ? "warning" : e;
            window.Raven && Raven.captureMessage(t, {
                level: s,
                logger: i,
                extra: n
            })
        }
    }

    function tt(t, e, i) {
        return (i = i || {}).error = e, Q(e.message || "Missing error message", "error", t, i)
    }

    function et(t, e, i, n) {
        J && window.Raven && Raven.captureBreadcrumb({
            message: t,
            category: e,
            level: i,
            data: n
        })
    }
    var it = {
            init: function (t) {
                window.Raven && Raven.config(W, {
                    release: q,
                    environment: G,
                    autoBreadcrumbs: {
                        xhr: !0,
                        dom: !0,
                        sentry: !0
                    },
                    tags: {
                        "site-host": Z.host,
                        "site-key": Z.sitekey,
                        "endpoint-url": U.endpoint,
                        "asset-url": Z.assetUrl
                    },
                    sampleRate: .01,
                    ignoreErrors: ["canvas.contentDocument", "Can't find variable: ZiteReader", "Cannot redefine property: hcaptcha", "Cannot redefine property: BetterJsPop", "grecaptcha is not defined", "jQuery is not defined", "$ is not defined", "Asset failed", "Script is not a function"]
                }), window.Raven && Raven.setUserContext({
                    "Browser-Agent": N.Browser.agent,
                    "Browser-Type": N.Browser.type,
                    "Browser-Version": N.Browser.version,
                    "System-OS": N.System.os,
                    "System-Version": N.System.version,
                    "Is-Mobile": N.System.mobile
                }), et(t, "setup", "info"), window.onerror = function (t, e, i, n, s) {
                    et(t, "global", "debug", {
                        name: s.name || "Error",
                        url: e,
                        line: i,
                        column: n,
                        stack: s.stack || ""
                    }), tt("global", s, {
                        message: t
                    })
                }
            }
        },
        nt = function (t) {
            for (var e, i, n, s = {}, o = t ? t.indexOf("&") >= 0 ? t.split("&") : [t] : [], r = 0; r < o.length; r++)
                if (o[r].indexOf("=") >= 0) {
                    if (e = o[r].split("="), i = decodeURIComponent(e[0]), "false" !== (n = decodeURIComponent(e[1])) && "true" !== n || (n = "true" === n), "theme" === i || "themeConfig" === i) try {
                        n = JSON.parse(n)
                    } catch (Ts) {}
                    s[i] = n
                } return s
        },
        st = function (t) {
            var e = [];
            for (var i in t) {
                var n = t[i];
                n = "object" == typeof n ? JSON.stringify(n) : n, e.push([encodeURIComponent(i), encodeURIComponent(n)].join("="))
            }
            return e.join("&")
        },
        ot = {
            __proto__: null,
            Decode: nt,
            Encode: st
        };

    function rt(t, e, i) {
        return Math.min(Math.max(t, e), i)
    }

    function at(t, e, i, n, s, o) {
        var r = (t - e) * (s - n) / (i - e) + n;
        return !1 === o ? r : rt(r, Math.min(n, s), Math.max(n, s))
    }

    function lt(t) {
        return t * (Math.PI / 180)
    }

    function ht(t) {
        return 180 * t / Math.PI
    }
    var ct = {
        __proto__: null,
        clamp: rt,
        range: at,
        toRadians: lt,
        toDegrees: ht
    };

    function ut(t) {
        var e = [].slice.call(arguments, 1);
        "string" == typeof t ? window[t] ? "function" == typeof window[t] ? window[t].apply(null, e) : console.log("[hCaptcha] Callback '" + t + "' is not a function.") : console.log("[hCaptcha] Callback '" + t + "' is not defined.") : "function" == typeof t ? t.apply(null, e) : console.log("[hcaptcha] Invalid callback '" + t + "'.")
    }

    function dt() {
        try {
            ut.apply(null, arguments)
        } catch (Os) {
            console.error("[hCaptcha] There was an error in your callback."), console.error(Os)
        }
    }
    var pt = {
        UUID: function (t) {
            return /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i.test(t) || !1
        },
        UUIDv4: function (t) {
            return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(t) || !1
        },
        URL: function (t) {
            var e = new RegExp("^(http|https)://"),
                i = new RegExp("^((?!(data|javascript):).)*$");
            return e.test(t) && i.test(t)
        }
    };

    function ft(t, e) {
        var i, n = "attempts" in (e = e || {}) ? e.attempts : 1,
            s = e.delay || 0,
            o = e.onFail;
        return i = function (e, i, r) {
            t().then(e, (function (t) {
                var e = n-- > 0;
                o && (e = !1 !== o(t) && e), e ? setTimeout(r, s) : i(t)
            }))
        }, new Promise((function (t, e) {
            i(t, e, (function n() {
                i(t, e, n)
            }))
        }))
    }

    function mt() {
        var t = this;
        this._bottom = 0, this._top = 0, this.storage = {}, this.add = function (e) {
            return t.storage[t._top] = e, t._top++, e
        }, this.remove = function () {
            if (!t.empty()) {
                var e = t._bottom,
                    i = t.storage[e];
                return t.storage[e] = null, t._bottom++, i
            }
        }, this.empty = function () {
            return t._top === t._bottom
        }, this.size = function () {
            return t._top - t._bottom
        }
    }
    var yt = {
        queue: mt,
        depth: function Fs(t, e, i) {
            if ("object" == typeof t && t[e] && t[e].length > 0)
                for (var n = t[e].length; --n > -1;) Fs(t[e][n], e, i);
            t !== undefined && i(t)
        },
        breathe: function (t, e, i) {
            var n = new mt,
                s = null;
            for (n.add(t), s = n.remove(); s;) {
                for (var o = 0; o < s[e].length; o++) n.add(s[e][o]);
                i(s), s = n.remove()
            }
        }
    };

    function gt() {
        this.children = [], this._events = []
    }
    gt.prototype.initComponent = function (t, e) {
        var i = new t(e);
        return i._parent = this, this.children.push(i), i
    }, gt.prototype.destroy = function () {
        var t = this;
        try {
            yt.depth(this, "children", (function (e) {
                if (t !== e)
                    for (var i = t.children.length; --i > -1;) t.children[i] === e && t.children.splice(i, 1);
                e._destroy && e._destroy(), e = null
            }))
        } catch (Ts) {
            throw new Error("Trouble destroying nodes: " + Ts)
        }
        return null
    }, gt.prototype._destroy = function () {
        this.onDestroy && this.onDestroy();
        for (var t = this._events.length || 0; --t > -1;) this._events.splice(t, 1);
        this.children = null, this._destroy = null, this._events = null, this.destroy = null, this.emit = null, this.on = null, this.off = null, this.initComponent = null
    }, gt.prototype.on = function (t, e) {
        for (var i = this._events.length, n = !1; --i > -1 && !1 === n;) this._events[i].event === t && (n = this._events[i]);
        !1 === n && (n = {
            event: t,
            listeners: []
        }, this._events.push(n)), n.listeners.push(e)
    }, gt.prototype.off = function (t, e) {
        for (var i = this._events.length; --i > -1;)
            if (this._events[i].event === t) {
                for (var n = this._events[i].listeners.length; --n > -1;) this._events[i].listeners[n] === e && this._events[i].listeners[n].splice(n, 1);
                0 === this._events[i].listeners.length && this._events[i].splice(i, 1)
            }
    }, gt.prototype.emit = function (t) {
        for (var e = Array.prototype.slice.call(arguments, 1), i = this._events.length; --i > -1;)
            if (this._events[i].event === t)
                for (var n = this._events[i].listeners.length; --n > -1;) this._events[i].listeners[n].apply(this, e)
    };
    var vt = {
            eventName: function (t) {
                var e = t;
                return "down" === t || "up" === t || "move" === t || "over" === t || "out" === t ? e = !N.System.mobile || "down" !== t && "up" !== t && "move" !== t ? "mouse" + t : "down" === t ? "touchstart" : "up" === t ? "touchend" : "touchmove" : "enter" === t && (e = "keydown"), e
            },
            actionName: function (t) {
                var e = t;
                return "touchstart" === e || "mousedown" === e ? e = "down" : "touchmove" === e || "mousemove" === e ? e = "move" : "touchend" === e || "mouseup" === e ? e = "up" : "mouseover" === e ? e = "over" : "mouseout" === e && (e = "out"), e
            },
            eventCallback: function (t, e, i) {
                var n = vt.actionName(t);
                return function (s) {
                    if (s = s || window.event, "down" === n || "move" === n || "up" === n || "over" === n || "out" === n || "click" === n) {
                        var o = vt.eventCoords(s);
                        if (!o) return;
                        var r = i.getBoundingClientRect();
                        s.windowX = o.x, s.windowY = o.y, s.elementX = s.windowX - (r.x || r.left), s.elementY = s.windowY - (r.y || r.top)
                    }
                    s.keyNum = s.which || s.keyCode || 0, "enter" === t && 13 !== s.keyNum && 32 !== s.keyNum || (s.action = n, s.targetElement = i, e(s))
                }
            },
            eventCoords: function (t) {
                if (!t) return null;
                var e = t;
                if (t.touches || t.changedTouches) {
                    var i = t.touches && t.touches.length >= 1 ? t.touches : t.changedTouches;
                    i && i[0] && (e = i[0])
                }
                return "number" == typeof e.pageX && "number" == typeof e.pageY ? {
                    x: e.pageX,
                    y: e.pageY
                } : "number" == typeof e.clientX && "number" == typeof e.clientY ? {
                    x: e.clientX,
                    y: e.clientY
                } : null
            }
        },
        bt = ["Webkit", "Moz", "ms"],
        wt = document.createElement("div").style,
        xt = {};

    function Ct(t) {
        var e = xt[t];
        return e || (t in wt ? t : xt[t] = function (t) {
            for (var e = t[0].toUpperCase() + t.slice(1), i = bt.length; i--;)
                if ((t = bt[i] + e) in wt) return t
        }(t) || t)
    }

    function kt(t, e, i) {
        if (this.dom = null, this._clss = [], this._nodes = [], this._listeners = [], this._frag = null, t && "object" == typeof t) {
            this.dom = t;
            var n = [],
                s = [];
            "string" == typeof t.className && (s = t.className.split(" "));
            for (var o = 0; o < s.length; o++) "" !== s[o] && " " !== s[o] && n.push(s[o]);
            this._clss = n
        } else i !== undefined && null !== i || (i = !0), (!t || "string" == typeof t && (t.indexOf("#") >= 0 || t.indexOf(".") >= 0)) && (t && (e = t), t = "div"), this.dom = document.createElement(t), e && (e.indexOf("#") >= 0 ? this.dom.id = e.split("#")[1] : (e.indexOf(".") >= 0 && (e = e.split(".")[1]), this.addClass.call(this, e)));
        !0 === i && (this._frag = document.createDocumentFragment(), this._frag.appendChild(this.dom))
    }
    kt.prototype.createElement = function (t, e) {
        var i = new kt(t, e, !1);
        return this.appendElement.call(this, i), this._nodes.push(i), i
    }, kt.prototype.appendElement = function (t) {
        if (t === undefined) return Y({
            name: "DomElement Add Child",
            message: "Child Element is undefined"
        });
        var e;
        e = t._frag !== undefined && null !== t._frag ? t._frag : t.dom !== undefined ? t.dom : t;
        try {
            t instanceof kt && (t._parent = this), this.dom.appendChild(e)
        } catch (Ts) {
            Y({
                name: "DomElement Add Child",
                message: "Failed to append child."
            })
        }
        return this
    }, kt.prototype.removeElement = function (t) {
        try {
            var e;
            if (t._nodes)
                for (e = t._nodes.length; e--;) t.removeElement(t._nodes[e]);
            for (e = this._nodes.length; --e > -1;) this._nodes[e] === t && this._nodes.splice(e, 1);
            this.dom.removeChild(t.dom || t), t.__destroy && t.__destroy()
        } catch (Ts) {
            Y({
                name: "DomElement Remove Child",
                message: "Failed to remove child."
            })
        }
    }, kt.prototype.addClass = function (t) {
        return !1 === this.hasClass.call(this, t) && (this._clss.push(t), this.dom.className = this._clss.join(" ")), this
    }, kt.prototype.hasClass = function (t) {
        for (var e = -1 !== this.dom.className.split(" ").indexOf(t), i = this._clss.length; i-- && !e;) e = this._clss[i] === t;
        return e
    }, kt.prototype.removeClass = function (t) {
        for (var e = this._clss.length; --e > -1;) this._clss[e] === t && this._clss.splice(e, 1);
        return this.dom.className = this._clss.join(" "), this
    }, kt.prototype.text = function (t) {
        if (this && this.dom) {
            if (!t) return this.dom.textContent;
            for (var e, i, n, s, o = /&(.*?);/g, r = /<[a-z][\s\S]*>/i; null !== (e = o.exec(t));) {
                !1 === r.test(e[0]) ? (n = e[0], s = void 0, (s = document.createElement("div")).innerHTML = n, i = s.textContent, t = t.replace(new RegExp(e[0], "g"), i)) : t = t.replace(e[0], "")
            }
            return this.dom.textContent = t, this
        }
    }, kt.prototype.content = kt.prototype.text, kt.prototype.css = function (t) {
        var e, i = "ie" === N.Browser.type && 8 === N.Browser.version;
        for (var n in t) {
            e = t[n];
            try {
                "opacity" !== n && "zIndex" !== n && "fontWeight" !== n && isFinite(e) && parseFloat(e) === e && (e += "px");
                var s = Ct(n);
                i && "opacity" === n ? this.dom.style.filter = "alpha(opacity=" + 100 * e + ")" : i && H.hasAlpha(e) ? this.dom.style[s] = new H(e).getHex() : this.dom.style[s] = e
            } catch (Os) {}
        }
        return this
    }, kt.prototype.backgroundImage = function (t, e, i, n) {
        var s = e !== undefined && i !== undefined,
            o = {
                "-ms-high-contrast-adjust": "none"
            };
        if ("object" == typeof e && (n = e), n === undefined && (n = {}), s) {
            var r = t.width / t.height,
                a = e,
                l = a / r;
            n.cover && l < i && (a = (l = i) * r), n.contain && l > i && (a = (l = i) * r), o.width = a, o.height = l, n.center && (o.marginLeft = -a / 2, o.marginTop = -l / 2, o.position = "absolute", o.left = "50%", o.top = "50%"), (n.left || n.right) && (o.left = n.left || 0, o.top = n.top || 0)
        }
        "ie" === N.Browser.type && 8 === N.Browser.version ? o.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + t.src + "',sizingMethod='scale')" : (o.background = "url(" + t.src + ")", o.backgroundPosition = "50% 50%", o.backgroundRepeat = "no-repeat", o.backgroundSize = s ? a + "px " + l + "px" : n.cover ? "cover" : n.contain ? "contain" : "100%"), this.css.call(this, o)
    }, kt.prototype.setAttribute = function (t, e) {
        var i;
        if ("object" == typeof t)
            for (var n in t) i = t[n], this.dom.setAttribute(n, i);
        else this.dom.setAttribute(t, e)
    }, kt.prototype.removeAttribute = function (t, e) {
        var i;
        if ("object" == typeof t)
            for (var n in t) i = t[n], this.dom.removeAttribute(n, i);
        else this.dom.removeAttribute(t, e)
    }, kt.prototype.addEventListener = function (t, e, i) {
        var n = {
            event: vt.eventName(t),
            handler: vt.eventCallback(t, e, this.dom),
            callback: e
        };
        this._listeners.push(n), this.dom.addEventListener ? this.dom.addEventListener(n.event, n.handler, i) : this.dom.attachEvent("on" + n.event, n.handler)
    }, kt.prototype.removeEventListener = function (t, e, i) {
        for (var n, s = this._listeners.length; --s > -1;)(n = this._listeners[s]).event === t && n.callback === e && (this._listeners.splice(s, 1), this.dom.removeEventListener ? this.dom.removeEventListener(n.event, n.handler, i) : this.dom.detachEvent("on" + n.event, n.handler))
    }, kt.prototype.focus = function () {
        this.dom.focus()
    }, kt.prototype.blur = function () {
        this.dom.blur()
    }, kt.prototype.html = function (t) {
        return t && (this.dom.innerHTML = t), this.dom.innerHTML
    }, kt.prototype.__destroy = function () {
        for (var t, e = this._listeners.length; --e > -1;) t = this._listeners[e], this._listeners.splice(e, 1), this.dom.removeEventListener ? this.dom.removeEventListener(t.event, t.handler) : this.dom.detachEvent("on" + t.event, t.handler);
        return this.dom = null, this._clss = [], this._nodes = [], this._listeners = [], this._frag = null, t = null, null
    };
    var _t = {
        self: function (t, e) {
            var i = {},
                n = Array.prototype.slice.call(arguments, 2);
            for (var s in e.apply(t, n), t) i[s] = t[s]
        },
        proto: function (t, e) {
            t.prototype = Object.create(e.prototype), t.prototype.constructor = t
        }
    };

    function Et(t, e) {
        _t.self(this, kt, e || "div", t), this.children = [], this._events = []
    }
    _t.proto(Et, kt), Et.prototype.initComponent = function (t, e, i) {
        var n = new t(e);
        return n._parent = this, this.children.push(n), n.dom && (i !== undefined ? i.appendElement && i.appendElement(n) : this.appendElement(n)), n
    }, Et.prototype.removeComponent = function (t) {
        for (var e = this.children.length; --e > -1;)
            if (this.children[e] === t) {
                this.children.splice(e, 1);
                break
            } t._destroy && t._destroy(), t = null
    }, Et.prototype.removeAllComponents = function () {
        for (var t = this.children.length; --t > -1;) this.children[t]._destroy && this.children[t]._destroy();
        this.children = []
    }, Et.prototype.destroy = function () {
        var t = this;
        try {
            yt.depth(this, "children", (function (e) {
                if (t !== e)
                    for (var i = t.children.length; --i > -1;) t.children[i] === e && t.children.splice(i, 1);
                e._destroy && e._destroy(), e = null
            }))
        } catch (Ts) {
            throw new Error("Trouble destroying nodes: " + Ts)
        }
        return null
    }, Et.prototype._destroy = function () {
        try {
            this.onDestroy && this.onDestroy(), this._parent.removeElement && this._parent.removeElement(this);
            for (var t = this._events.length; --t > -1;) this._events.splice(t, 1);
            this.children = null, this._destroy = null, this._events = null, this.destroy = null, this.emit = null, this.on = null, this.off = null, this.initComponent = null
        } catch (Ts) {
            Y({
                name: "DomComponent",
                message: "Failed to destroy."
            })
        }
    }, Et.prototype.on = function (t, e) {
        for (var i = this._events.length, n = !1; --i > -1 && !1 === n;) this._events[i].event === t && (n = this._events[i]);
        !1 === n && (n = {
            event: t,
            listeners: []
        }, this._events.push(n)), n.listeners.push(e)
    }, Et.prototype.off = function (t, e) {
        for (var i = this._events.length; --i > -1;)
            if (this._events[i].event === t) {
                for (var n = this._events[i].listeners.length; --n > -1;) this._events[i].listeners[n] === e && this._events[i].listeners.splice(n, 1);
                0 === this._events[i].listeners.length && this._events.splice(i, 1)
            }
    }, Et.prototype.emit = function (t) {
        for (var e = Array.prototype.slice.call(arguments, 1), i = this._events.length; --i > -1 && this._events;)
            if (this._events[i].event === t)
                for (var n = this._events[i].listeners.length; --n > -1;) this._events[i].listeners[n].apply(this, e)
    };
    var St = {
            CHALLENGE_PASSED: "challenge-passed",
            CHALLENGE_ESCAPED: "challenge-escaped",
            CHALLENGE_CLOSED: "challenge-closed",
            CHALLENGE_EXPIRED: "challenge-expired",
            CHALLENGE_ALREADY_CLOSED: "challenge-already-closed"
        },
        At = {
            INVALID_DATA: "invalid-data",
            BUNDLE_ERROR: "bundle-error",
            NETWORK_ERROR: "network-error",
            RATE_LIMITED: "rate-limited",
            CHALLENGE_ERROR: "challenge-error",
            INCOMPLETE_ANSWER: "incomplete-answer",
            MISSING_CAPTCHA: "missing-captcha",
            MISSING_SITEKEY: "missing-sitekey",
            INVALID_CAPTCHA_ID: "invalid-captcha-id"
        },
        Lt = {
            __proto__: null,
            CaptchaEvent: St,
            CaptchaError: At
        };

    function Ht(t) {
        if (null === t) return "";
        var e = [];
        return Bt(t, e), e.join("&")
    }

    function Bt(t, e) {
        var i, n;
        if ("object" == typeof t)
            for (n in t) !0 === Mt(i = t[n]) ? Bt(i, e) : e[e.length] = Vt(n, i);
        else if (!0 === Array.isArray(t))
            for (var s = 0; s < t.length; s++) !0 === Mt(i = t[s]) ? Bt(t, e) : e[e.length] = Vt(n, i);
        else e[e.length] = Vt(t)
    }

    function Mt(t) {
        return !0 === Array.isArray(t) || "object" == typeof t
    }

    function Vt(t, e) {
        return encodeURIComponent(t) + "=" + encodeURIComponent(null === e ? "" : e)
    }
    var Ot = {
            af: "Afrikaans",
            sq: "Albanian",
            am: "Amharic",
            ar: "Arabic",
            hy: "Armenian",
            az: "Azerbaijani",
            eu: "Basque",
            be: "Belarusian",
            bn: "Bengali",
            bg: "Bulgarian",
            bs: "Bosnian",
            my: "Burmese",
            ca: "Catalan",
            ceb: "Cebuano",
            zh: "Chinese",
            "zh-CN": "Chinese Simplified",
            "zh-TW": "Chinese Traditional",
            co: "Corsican",
            hr: "Croatian",
            cs: "Czech",
            da: "Danish",
            nl: "Dutch",
            en: "English",
            eo: "Esperanto",
            et: "Estonian",
            fa: "Persian",
            fi: "Finnish",
            fr: "French",
            fy: "Frisian",
            gd: "Gaelic",
            gl: "Galacian",
            ka: "Georgian",
            de: "German",
            el: "Greek",
            gu: "Gujurati",
            ht: "Haitian",
            ha: "Hausa",
            haw: "Hawaiian",
            he: "Hebrew",
            hi: "Hindi",
            hmn: "Hmong",
            hu: "Hungarian",
            is: "Icelandic",
            ig: "Igbo",
            id: "Indonesian",
            ga: "Irish",
            it: "Italian",
            ja: "Japanese",
            jw: "Javanese",
            kn: "Kannada",
            kk: "Kazakh",
            km: "Khmer",
            rw: "Kinyarwanda",
            ky: "Kirghiz",
            ko: "Korean",
            ku: "Kurdish",
            lo: "Lao",
            la: "Latin",
            lv: "Latvian",
            lt: "Lithuanian",
            lb: "Luxembourgish",
            mk: "Macedonian",
            mg: "Malagasy",
            ms: "Malay",
            ml: "Malayalam",
            mt: "Maltese",
            mi: "Maori",
            mr: "Marathi",
            mn: "Mongolian",
            ne: "Nepali",
            no: "Norwegian",
            ny: "Nyanja",
            or: "Oriya",
            pl: "Polish",
            "pt-BR": "Portuguese (Brazil)",
            pt: "Portuguese (Portugal)",
            ps: "Pashto",
            pa: "Punjabi",
            ro: "Romanian",
            ru: "Russian",
            sm: "Samoan",
            sn: "Shona",
            sd: "Sindhi",
            si: "Singhalese",
            sr: "Serbian",
            sk: "Slovak",
            sl: "Slovenian",
            so: "Somani",
            st: "Southern Sotho",
            es: "Spanish",
            su: "Sundanese",
            sw: "Swahili",
            sv: "Swedish",
            tl: "Tagalog",
            tg: "Tajik",
            ta: "Tamil",
            tt: "Tatar",
            te: "Teluga",
            th: "Thai",
            tr: "Turkish",
            tk: "Turkmen",
            ug: "Uyghur",
            uk: "Ukrainian",
            ur: "Urdu",
            uz: "Uzbek",
            vi: "Vietnamese",
            cy: "Welsh",
            xh: "Xhosa",
            yi: "Yiddish",
            yo: "Yoruba",
            zu: "Zulu"
        },
        Tt = {
            zh: {
                "I am human": "我是人"
            },
            ar: {
                "I am human": "أنا الإنسان"
            },
            af: {
                "I am human": "Ek is menslike"
            },
            am: {
                "I am human": "እኔ ሰው ነኝ"
            },
            hy: {
                "I am human": "Ես մարդ եմ"
            },
            az: {
                "I am human": "Mən insanam"
            },
            eu: {
                "I am human": "Gizakia naiz"
            },
            bn: {
                "I am human": "আমি মানব নই"
            },
            bg: {
                "I am human": "Аз съм човек"
            },
            ca: {
                "I am human": "Sóc humà"
            },
            hr: {
                "I am human": "Ja sam čovjek"
            },
            cs: {
                "I am human": "Jsem člověk"
            },
            da: {
                "I am human": "Jeg er et menneske"
            },
            nl: {
                "I am human": "Ik ben een mens"
            },
            et: {
                "I am human": "Ma olen inimeste"
            },
            fi: {
                "I am human": "Olen ihminen"
            },
            fr: {
                "I am human": "Je suis humain"
            },
            gl: {
                "I am human": "Eu son humano"
            },
            ka: {
                "I am human": "მე ვარ ადამიანი"
            },
            de: {
                "I am human": "Ich bin ein Mensch"
            },
            el: {
                "I am human": "Είμαι άνθρωπος"
            },
            gu: {
                "I am human": "હું માનવ છું"
            },
            iw: {
                "I am human": ". אני אנושי"
            },
            hi: {
                "I am human": "मैं मानव हूं"
            },
            hu: {
                "I am human": "Nem vagyok robot"
            },
            is: {
                "I am human": "Ég er manneskja"
            },
            id: {
                "I am human": "Aku manusia"
            },
            it: {
                "I am human": "Sono un essere umano"
            },
            ja: {
                "I am human": "私は人間です"
            },
            kn: {
                "I am human": "ನಾನು ಮಾನವನು"
            },
            ko: {
                "I am human": "사람입니다"
            },
            lo: {
                "I am human": "ຂ້ອຍເປັນມະນຸດ"
            },
            lv: {
                "I am human": "Es esmu cilvēks"
            },
            lt: {
                "I am human": "Aš esu žmogaus"
            },
            ms: {
                "I am human": "Saya manusia"
            },
            ml: {
                "I am human": "ഞാൻ മനുഷ്യനാണ്"
            },
            mr: {
                "I am human": "मी मानवी आहे"
            },
            mn: {
                "I am human": "Би бол хүн"
            },
            no: {
                "I am human": "Jeg er menneskelig"
            },
            fa: {
                "I am human": "من انسانی هستم"
            },
            pl: {
                "I am human": "Jestem człowiekiem"
            },
            pt: {
                "I am human": "Sou humano"
            },
            ro: {
                "I am human": "Eu sunt om"
            },
            ru: {
                "I am human": "Я человек"
            },
            sr: {
                "I am human": "Ja sam ljudski"
            },
            si: {
                "I am human": "මම මිනිස්සු"
            },
            sk: {
                "I am human": "Ja som človek"
            },
            sl: {
                "I am human": "Jaz sem človeški"
            },
            es: {
                "I am human": "Soy humano"
            },
            sw: {
                "I am human": "Mimi ni binadamu"
            },
            sv: {
                "I am human": "Jag är människa"
            },
            ta: {
                "I am human": "நான் மனித"
            },
            te: {
                "I am human": "నేను మనిషిని"
            },
            th: {
                "I am human": "ผมมนุษย์"
            },
            tr: {
                "I am human": "Ben bir insanım"
            },
            uk: {
                "I am human": "Я людини"
            },
            ur: {
                "I am human": "میں انسان ہوں"
            },
            vi: {
                "I am human": "Tôi là con người"
            },
            zu: {
                "I am human": "Ngingumuntu"
            }
        },
        Ft = null,
        Rt = {
            translate: function (t, e) {
                var i = Rt.getBestTrans(Tt),
                    n = i && i[t];
                if (n = n || t, e)
                    for (var s = Object.keys(e), o = s.length; o--;) n = n.replace(new RegExp("{{" + s[o] + "}}", "g"), e[s[o]]);
                return n
            },
            getBestTrans: function (t) {
                var e = Rt.getLocale();
                return e in t ? t[e] : Rt.getShortLocale(e) in t ? t[Rt.getShortLocale(e)] : "en" in t ? t.en : null
            },
            getLocale: function () {
                var t = Ft || window.navigator.userLanguage || window.navigator.language,
                    e = Rt.getShortLocale(t);
                return "in" === e && (t = "id"), "iw" === e && (t = "he"), "nb" === e && (t = "no"), "ji" === e && (t = "yi"), "zh-CN" === t && (t = "zh"), "jv" === e && (t = "jw"), Ot[t] ? t : Ot[e] ? e : "en"
            },
            setLocale: function (t) {
                Ft = t
            },
            getShortLocale: function (t) {
                return t.indexOf("-") >= 0 ? t.substring(0, t.indexOf("-")) : t
            },
            isShortLocale: function (t) {
                return 2 === t.length || 3 === t.length
            },
            addTable: function (t, e) {
                if (e || (e = Object.create(null)), Tt[t]) {
                    var i = Tt[t];
                    for (var n in e) i[n] = e[n]
                } else Tt[t] = e;
                return Tt[t]
            },
            getTable: function (t) {
                return Tt[t]
            },
            addTables: function (t) {
                for (var e in t) Rt.addTable(e, t[e]);
                return Tt
            },
            getTables: function () {
                return Tt
            }
        },
        Dt = {
            400: "Rate limited or network error. Please retry.",
            429: "Your computer or network has sent too many requests.",
            500: "Cannot contact hCaptcha. Check your connection and try again."
        },
        $t = function (t) {
            try {
                return Rt.translate(Dt[t])
            } catch (Ts) {
                return !1
            }
        },
        Pt = "undefined" != typeof XDomainRequest && !("withCredentials" in XMLHttpRequest.prototype);

    function It(t, e, i) {
        i = i || {};
        var n = {
            url: e,
            method: t.toUpperCase(),
            responseType: i.responseType || "string",
            dataType: i.dataType || null,
            withCredentials: i.withCredentials || !1,
            headers: i.headers || null,
            data: i.data || null,
            timeout: i.timeout || null
        };
        return n.legacy = n.withCredentials && Pt, n.data && ("json" === n.dataType && "object" == typeof n.data && (n.data = JSON.stringify(n.data)), "query" === n.dataType && (n.data = Ht(n.data))), i.retry ? ft((function () {
            return jt(n)
        }), i.retry) : jt(n)
    }

    function jt(t) {
        var e = t.legacy ? new XDomainRequest : new XMLHttpRequest,
            i = "function" == typeof t.url ? t.url() : t.url;
        return new Promise((function (n, s) {
            var o, r = function (o) {
                return function () {
                    var r = e.response || e.responseText,
                        a = e.statusText || "",
                        l = e.status,
                        h = e.readyState;
                    if (4 === h || t.legacy) {
                        if ("json" === t.responseType && r) try {
                            r = JSON.parse(r)
                        } catch (c) {}
                        if ("error" === o || l >= 400 && l <= 511) return void s({
                            event: At.NETWORK_ERROR,
                            endpoint: i,
                            response: r,
                            state: h,
                            status: l,
                            message: $t(l || 400) || a
                        });
                        n({
                            state: h,
                            status: l,
                            body: r,
                            message: a
                        })
                    }
                }
            };
            if ((e.onload = r("complete"), e.onerror = e.ontimeout = r("error"), e.open(t.method, i), t.timeout && (e.timeout = t.timeout), !t.legacy) && (e.withCredentials = t.withCredentials, t.headers))
                for (var a in t.headers) o = t.headers[a], e.setRequestHeader(a, o);
            setTimeout((function () {
                e.send(t.data)
            }), 0)
        }))
    }
    var Nt = function (t, e) {
            if ("object" == typeof t && e === undefined && (t = (e = t).url), null === t) throw new Error("Url missing");
            return It("GET", t, e)
        },
        Zt = function (t, e) {
            if ("object" == typeof t && e === undefined && (t = (e = t).url), null === t) throw new Error("Url missing");
            return It("POST", t, e)
        },
        zt = function (t) {
            return t.toLowerCase().match(/\.(?:jpg|gif|png|jpeg|svg)$/g) ? "image" : t.toLowerCase().match(/\.(?:js)$/g) ? "script" : "file"
        },
        Ut = function (t) {
            if (U.assethost && t.indexOf(Z.assetDomain) >= 0) return U.assethost + t.replace(Z.assetDomain, "");
            if (U.imghost && t.indexOf("imgs") >= 0) {
                var e = t.indexOf(".ai") >= 0 ? t.indexOf(".ai") + 3 : t.indexOf(".com") + 4;
                return U.imghost + t.substr(e, t.length)
            }
            return t
        },
        Wt = ["svg", "gif", "png"];

    function qt(t, e) {
        e = e || {};
        var i, n = t;
        if (0 === n.indexOf("data:image"))
            for (var s = !1, o = Wt.length, r = -1; r++ < o && !s;)(s = n.indexOf(Wt[r]) >= 0) && (i = Wt[r]);
        else i = n.substr(n.lastIndexOf(".") + 1, n.length);
        !!(!document.createElementNS || !document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect) && e.fallback && (e.fallback.indexOf(".") >= 0 ? i = (n = e.fallback).substr(n.lastIndexOf(".") + 1, n.length) : (n = t.substr(0, t.indexOf(i)) + e.fallback, i = e.fallback)), e.prefix && (n = e.prefix + "/" + n), this.attribs = {
            crossOrigin: e.crossOrigin || null
        }, this.id = n, this.src = Ut(n), this.ext = i, this.width = 0, this.height = 0, this.aspect = 0, this.loaded = !1, this.error = !1, this.element = null, this.cb = {
            load: [],
            error: []
        }
    }

    function Gt(t, e, i) {
        for (var n = t[e], s = n.length, o = null; --s > -1;) o = n[s], n.splice(s, 1), o(i);
        "error" === e ? t.load = [] : t.error = []
    }

    function Kt(t, e) {
        var i = t;
        e || (e = {}), e.prefix && (i = e.prefix + "/" + t), this.attribs = {
            defer: e.defer || null,
            async: e.async || null,
            crossOrigin: e.crossOrigin || null
        }, this.id = i, this.src = Ut(i), this.loaded = !1, this.error = !1, this.element = null, this.cb = {
            load: [],
            error: []
        }
    }

    function Jt(t, e, i) {
        for (var n = t[e], s = n.length, o = null; --s > -1;) o = n[s], n.splice(s, 1), o(i);
        "error" === e ? t.load = [] : t.error = []
    }

    function Yt(t, e) {
        var i = t;
        e || (e = {}), e.prefix && (i = e.prefix + "/" + t), this.id = i, this.src = Ut(i), this.loaded = !1, this.error = !1, this.cb = {
            load: [],
            error: []
        }, this.data = null
    }

    function Xt(t, e, i) {
        for (var n = t[e], s = n.length, o = null; --s > -1;) o = n[s], n.splice(s, 1), o(i);
        "error" === e ? t.load = [] : t.error = []
    }
    qt.prototype.load = function () {
        return ("svg" === this.ext ? this._loadSvg() : this._loadImg())["catch"]((function (t) {
            throw Q("Asset failed", "error", "assets", {
                error: t
            }), t
        }))
    }, qt.prototype._loadSvg = function () {
        var t, e = this,
            i = this.src,
            n = this.id;
        if (0 === i.indexOf("data:image/svg+xml")) {
            var s = i.slice("data:image/svg+xml,".length);
            t = Promise.resolve(decodeURIComponent(s))
        } else t = Nt(i).then((function (t) {
            return t.body
        }));
        return t.then((function (t) {
            var i = (new DOMParser).parseFromString(t, "image/svg+xml").documentElement,
                n = parseInt(i.getAttribute("width")),
                s = parseInt(i.getAttribute("height"));
            return e._imgLoaded(i, n, s), e
        }))["catch"]((function (t) {
            e.error = !0;
            var i = (t && t.message ? t.message : t || "Loading Error") + ": " + n;
            throw Gt(e.cb, "error", i), i
        }))
    }, qt.prototype._loadImg = function () {
        var t = this,
            e = this.attribs,
            i = this.src,
            n = this.id;
        return new Promise((function (s, o) {
            var r = new Image;
            e.crossOrigin && (r.crossOrigin = e.crossOrigin), r.onerror = function () {
                t.error = !0, r.onload = r.onerror = null;
                var e = "Loading Error: " + n;
                Gt(t.cb, "error", e), o(e)
            }, r.onload = function () {
                t.loaded || (t._imgLoaded(r, r.width, r.height), r.onload = r.onerror = null, s(t))
            }, r.src = i, r.complete && r.onload()
        }))
    }, qt.prototype._imgLoaded = function (t, e, i) {
        this.element = new kt(t), this.width = e, this.height = i, this.aspect = e / i, this.loaded = !0, Gt(this.cb, "load", this)
    }, qt.prototype.onload = function (t) {
        this.error || (this.loaded ? t(this) : this.cb.load.push(t))
    }, qt.prototype.onerror = function (t) {
        this.loaded && !this.error || (this.error ? t(this) : this.cb.error.push(t))
    }, Kt.prototype.load = function () {
        var t = this,
            e = this.attribs,
            i = this.src,
            n = this.id;
        return new Promise((function (s, o) {
            var r = document.createElement("script");
            t.element = r, r.onerror = function () {
                t.error = !0, r.onload = r.onreadystatechange = r.onerror = null;
                var e = "Loading Error: " + n;
                Jt(t.cb, "error", e), o(e)
            }, r.onload = r.onreadystatechange = function () {
                this.loaded || r.readyState && "loaded" !== r.readyState && "complete" !== r.readyState || (t.loaded = !0, r.onload = r.onreadystatechange = r.onerror = null, document.body.removeChild(r), Jt(t.cb, "load", t), s(t))
            }, r.type = "text/javascript", r.src = i, e.crossOrigin && (r.crossorigin = e.crossOrigin), e.async && (r.async = !0), e.defer && (r.defer = !0), document.body.appendChild(r), r.complete && r.onload()
        }))
    }, Kt.prototype.onload = function (t) {
        this.error || (this.loaded ? t(this) : this.cb.load.push(t))
    }, Kt.prototype.onerror = function (t) {
        this.loaded && !this.error || (this.error ? t(this) : this.cb.error.push(t))
    }, Yt.prototype.load = function () {
        var t = this,
            e = this.src,
            i = this.id;
        return new Promise((function (n, s) {
            var o = {};
            e.indexOf("json") >= 0 && (o.responseType = "json"), Nt(e, o).then((function (e) {
                t.loaded = !0, t.data = e.body, Xt(t.cb, "load", t), n(t)
            }))["catch"]((function (e) {
                t.error = !0;
                var n = (e && e.message ? e.message : "Loading Error") + ": " + i;
                Xt(t.cb, "error", n), s(n)
            }))
        }))
    }, Yt.prototype.onload = function (t) {
        this.error || (this.loaded ? t(this) : this.cb.load.push(t))
    }, Yt.prototype.onerror = function (t) {
        this.loaded && !this.error || (this.error ? t(this) : this.cb.error.push(t))
    };
    var Qt = [],
        te = {
            add: function (t, e) {
                var i = zt(t);
                return te[i] ? te[i](t, e) : Promise.resolve(null)
            },
            batch: function (t, e) {
                for (var i = [], n = -1; ++n < t.length;) {
                    var s = t[n];
                    i.push(te.add(s, e))
                }
                return Promise.all(i)["finally"]((function () {
                    i = []
                }))
            },
            image: function (t, e) {
                var i = new qt(t, e);
                return Qt.push(i), i.load()
            },
            script: function (t, e) {
                var i = new Kt(t, e);
                return Qt.push(i), i.load()
            },
            file: function (t, e) {
                var i = new Yt(t, e);
                return Qt.push(i), i.load()
            },
            retrieve: function (t) {
                return new Promise((function (e, i) {
                    for (var n = Qt.length, s = !1, o = null; --n > -1 && !s;) s = (o = Qt[n]).id === t || -1 !== o.id.indexOf("/" === t[0] ? "" : "/" + t);
                    if (!s) return e(null);
                    o.onload(e), o.onerror(i)
                }))
            }
        },
        ee = [],
        ie = !1,
        ne = !1;

    function se(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        !0 !== ne && "interactive" !== document.readyState && "loaded" !== document.readyState && "complete" !== document.readyState ? (ee.push({
            fn: t,
            args: e
        }), !1 === ie && oe()) : setTimeout((function () {
            t(e)
        }), 1)
    }

    function oe() {
        document.addEventListener ? (document.addEventListener("DOMContentLoaded", ae), window.addEventListener("load", ae)) : (document.attachEvent("onreadystatechange", re), window.attachEvent("onload", ae)), ie = !0
    }

    function re() {
        "interactive" !== document.readyState && "loaded" !== document.readyState && "complete" !== document.readyState || ae()
    }

    function ae() {
        if (!1 === ne) {
            for (var t = 0; t < ee.length; t++) ee[t].fn.apply(null, ee[t].args);
            ee = []
        }
        ne = !0, document.removeEventListener ? (document.removeEventListener("DOMContentLoaded", ae), window.removeEventListener("load", ae)) : (document.detachEvent("onreadystatechange", re), window.detachEvent("onload", ae))
    }
    var le = new kt(document),
        he = new kt(window),
        ce = {
            __proto__: null,
            Loader: te,
            BaseComponent: gt,
            DomComponent: Et,
            DomElement: kt,
            Extend: _t,
            Normalize: vt,
            Dom: {
                __proto__: null,
                Window: he,
                Document: le,
                Element: kt,
                Ready: se,
                Find: function (t) {
                    for (var e, i, n = null, s = !1, o = t.split(" "), r = 0; r < o.length; r++)
                        if ((e = o[r]).indexOf("#") >= 0 && (n = document.getElementById(e.replace("#", ""))), e.indexOf(".") >= 0)
                            if (null === n && (n = document), s) {
                                for (var a = [], l = 0; l < n.length; l++) {
                                    i = n[l].getElementsByClassName(e.replace(".", ""));
                                    for (var h = 0; h < i.length; h++) a.push(i[h])
                                }
                                n = a, a = []
                            } else n = n.getElementsByClassName(e.replace(".", "")), s = !0;
                    if (!0 === s) {
                        if (1 === n.length) return n[0];
                        for (var c = [], u = 0; u < n.length; u++) c.push(n[u]);
                        return c
                    }
                    return n
                }
            }
        };

    function ue(t, e) {
        this._period = t, this._interval = e, this._date = [], this._data = [], this._prevTimestamp = 0, this._meanPeriod = 0, this._meanCounter = 0
    }
    ue.prototype.getMeanPeriod = function () {
        return this._meanPeriod
    }, ue.prototype.getData = function () {
        return this._cleanStaleData(), this._data
    }, ue.prototype.getSize = function () {
        return this._cleanStaleData(), this._data.length
    }, ue.prototype.getCapacity = function () {
        return 0 === this._period ? this._interval : Math.ceil(this._interval / this._period)
    }, ue.prototype.push = function (t, e) {
        this._cleanStaleData();
        var i = 0 === this._date.length;
        if (t - (this._date[this._date.length - 1] || 0) >= this._period && (this._date.push(t), this._data.push(e)), !i) {
            var n = t - this._prevTimestamp;
            this._meanPeriod = (this._meanPeriod * this._meanCounter + n) / (this._meanCounter + 1), this._meanCounter++
        }
        this._prevTimestamp = t
    }, ue.prototype._cleanStaleData = function () {
        for (var t = Date.now(), e = this._date.length - 1; e >= 0; e--) {
            if (t - this._date[e] >= this._interval) {
                this._date.splice(0, e + 1), this._data.splice(0, e + 1);
                break
            }
        }
    };
    var de = {
            touchstart: "ts",
            touchend: "te",
            touchmove: "tm",
            touchcancel: "tc"
        },
        pe = {
            mousedown: "md",
            mouseup: "mu",
            mousemove: "mm"
        },
        fe = {
            keydown: "kd",
            keyup: "ku"
        },
        me = {
            devicemotion: "dm"
        },
        ye = function (t, e) {
            var i = pe[t],
                n = null;
            return function (t) {
                n = function (t) {
                    return [t.windowX, t.windowY, Date.now()]
                }(t), e(i, n)
            }
        },
        ge = function (t, e) {
            var i = de[t],
                n = null;
            return function (t) {
                n = function (t) {
                    var e = [];
                    try {
                        var i, n;
                        if (t.touches && t.touches.length >= 1 ? i = t.touches : t.changedTouches && t.changedTouches.length >= 1 && (i = t.changedTouches), i) {
                            for (var s = 0; s < i.length; s++)(n = vt.eventCoords(i[s])) && e.push([i[s].identifier, n.x, n.y]);
                            e.push(Date.now())
                        }
                        return e
                    } catch (Ts) {
                        return e
                    }
                }(t), e(i, n)
            }
        },
        ve = function (t, e) {
            var i = fe[t],
                n = null;
            return function (t) {
                n = function (t) {
                    return [t.keyNum, Date.now()]
                }(t), e(i, n)
            }
        },
        be = function (t, e) {
            var i = me[t],
                n = null,
                s = [];
            return function (t) {
                n = function (t, e) {
                    (t.acceleration === undefined || t.acceleration && t.acceleration.x === undefined) && (t.acceleration = {
                        x: 0,
                        y: 0,
                        z: 0
                    });
                    (t.rotationRate === undefined || t.rotationRate && t.rotationRate.alpha === undefined) && (t.rotationRate = {
                        alpha: 0,
                        beta: 0,
                        gamma: 0
                    });
                    var i = [t.acceleration.x, t.acceleration.y, t.acceleration.z, t.rotationRate.alpha, t.rotationRate.beta, t.rotationRate.gamma, Date.now()],
                        n = [];
                    if (0 === e.length) e = i, n = i;
                    else {
                        for (var s, o = 0, r = 0; r < 6; r++) s = e[r] - i[r], n.push(i[r]), o += Math.abs(s);
                        if (n.push(Date.now()), e = i, o <= 0) return null
                    }
                    return {
                        motion: n,
                        prevmotion: e
                    }
                }(t, s), null !== n && (s = n.prevmotion, n = n.motion, e(i, n))
            }
        };

    function we() {
        this._manifest = {}, this.state = {
            timeBuffers: {},
            loadTime: Date.now(),
            recording: !1,
            initRecord: !1,
            record: {
                mouse: !0,
                touch: !0,
                keys: !1,
                motion: !0
            }
        }, this._recordEvent = this._recordEvent.bind(this)
    }
    we.prototype.record = function (t, e, i, n) {
        if (this._manifest.st = Date.now(), this.state.record.mouse = t === undefined ? this.state.record.mouse : t, this.state.record.touch = i === undefined ? this.state.record.touch : i, this.state.record.keys = e === undefined ? this.state.record.keys : e, this.state.record.motion = n === undefined ? this.state.record.motion : n, !1 === this.state.initRecord) {
            var s = new kt(document.body);
            this.state.record.mouse && (s.addEventListener("mousedown", ye("mousedown", this._recordEvent), !0), s.addEventListener("mousemove", ye("mousemove", this._recordEvent), !0), s.addEventListener("mouseup", ye("mouseup", this._recordEvent), !0)), !0 === this.state.record.keys && (s.addEventListener("keyup", ve("keyup", this._recordEvent), !0), s.addEventListener("keydown", ve("keydown", this._recordEvent), !0)), this.state.record.touch && !0 === N.Browser.hasEvent("touchstart", document.body) && (s.addEventListener("touchstart", ge("touchstart", this._recordEvent), !0), s.addEventListener("touchmove", ge("touchmove", this._recordEvent), !0), s.addEventListener("touchend", ge("touchend", this._recordEvent), !0)), this.state.record.motion && !0 === N.Browser.hasEvent("devicemotion", window) && s.addEventListener("devicemotion", be("devicemotion", this._recordEvent), !0), this.state.initRecord = !0
        }
        this.state.recording = !0
    }, we.prototype.stop = function () {
        this.state.recording = !1
    }, we.prototype.time = function () {
        return this.state.loadTime
    }, we.prototype.getData = function () {
        for (var t in this.state.timeBuffers) this._manifest[t] = this.state.timeBuffers[t].getData(), this._manifest[t + "-mp"] = this.state.timeBuffers[t].getMeanPeriod();
        return this._manifest
    }, we.prototype.setData = function (t, e) {
        this._manifest[t] = e
    }, we.prototype.resetData = function () {
        this._manifest = {}, this.state.timeBuffers = {}
    }, we.prototype.circBuffPush = function (t, e) {
        this._recordEvent(t, e)
    }, we.prototype._recordEvent = function (t, e) {
        if (!1 !== this.state.recording) try {
            var i = e[e.length - 1];
            this.state.timeBuffers[t] || (this.state.timeBuffers[t] = new ue(16, 15e3)), this.state.timeBuffers[t].push(i, e)
        } catch (Os) {
            tt("motion", Os)
        }
    };
    var xe = new we;

    function Ce(t) {
        t = t || {}, this.x = t.x || 0, this.y = t.y || 0, this.rotate = this.rotate.bind(this), this.getDistance = this.getDistance.bind(this), this.radius = 0, this.tolerance = 0, this.fill = !1, this.stroke = !1, this.fillColor = "#fff", this.strokeColor = "#fff", this.strokeWidth = 1
    }

    function ke(t, e, i) {
        _t.self(this, Ce, t), this.handleIn = new Ce(e), this.handleOut = new Ce(i), this.prev = null, this.next = null, this.index = 0
    }

    function _e(t) {
        this._closed = !1, this.stroke = !1, this.fill = !1, this.fillColor = "#fff", this.strokeColor = "#fff", this.strokeWidth = 1, this.showPoints = !1, this.pointRadius = 0, this._head = null, this._tail = null, this.segments = [], this.addPoint = this.addPoint.bind(this), this.removePoint = this.removePoint.bind(this), this.forEachPoint = this.forEachPoint.bind(this), this.getBounding = this.getBounding.bind(this), this.getCenter = this.getCenter.bind(this), this.destroy = this.destroy.bind(this), t && t.length && this.addPoints(t)
    }

    function Ee(t, e) {
        if (e.y <= t.y) {
            if (e.next.y > t.y && Se(e, e.next, t) > 0) return 1
        } else if (e.next.y <= t.y && Se(e, e.next, t) < 0) return -1;
        return 0
    }

    function Se(t, e, i) {
        return (e.x - t.x) * (i.y - t.y) - (i.x - t.x) * (e.y - t.y)
    }

    function Ae() {
        _t.self(this, kt, "canvas");
        var t = this;
        this.element = this.dom, this.ctx = this.element.getContext("2d"), this.scale = 1, this.dpr = window.devicePixelRatio || 1, this.clearColor = "#fff", this.ctx.roundedRect = function (e, i, n, s, o) {
            var r = n > 0 ? o : -o,
                a = s > 0 ? o : -o;
            t.ctx.beginPath(), t.ctx.moveTo(e + r, i), t.ctx.lineTo(e + n - r, i), t.ctx.quadraticCurveTo(e + n, i, e + n, i + a), t.ctx.lineTo(e + n, i + s - a), t.ctx.quadraticCurveTo(e + n, i + s, e + n - r, i + s), t.ctx.lineTo(e + r, i + s), t.ctx.quadraticCurveTo(e, i + s, e, i + s - a), t.ctx.lineTo(e, i + a), t.ctx.quadraticCurveTo(e, i, e + r, i), t.ctx.closePath()
        }
    }

    function Le(t, e) {
        var i = t instanceof HTMLIFrameElement;
        try {
            i ? t.parentNode && t.contentWindow.postMessage(JSON.stringify(e), "*") : t.postMessage(JSON.stringify(e), "*")
        } catch (Os) {
            tt("messaging", Os)
        }
    }

    function He(t, e) {
        this.target = t, this.id = e, this.messages = [], this.incoming = [], this.waiting = []
    }

    function Be(t, e) {
        var i = this,
            n = {},
            s = new Promise((function (t, e) {
                n.resolve = t, n.reject = e
            })),
            o = {
                source: "hcaptcha",
                label: t,
                id: i.id,
                promise: null,
                lookup: e
            };
        return s.then((function (t) {
            o.promise = "resolve", null !== t && (o.contents = t), Le(i.target, o)
        }))["catch"]((function (t) {
            o.promise = "reject", null !== t && (o.error = t), Le(i.target, o)
        })), n
    }
    Ce.prototype.rotate = function (t, e) {
        var i = lt(e),
            n = Math.sin(i),
            s = Math.cos(i),
            o = this.x - t.x,
            r = this.y - t.y;
        this.x = o * s - r * n + t.x, this.y = o * n + r * s + t.y
    }, Ce.prototype.getDistance = function (t) {
        return Math.sqrt(Math.pow(this.x - t.x, 2) + Math.pow(this.y - t.y, 2))
    }, Ce.prototype.getAngle = function (t) {
        var e = t.x - this.x,
            i = t.y - this.y,
            n = ht(Math.atan2(i, e));
        return n < 0 && (n += 360), n
    }, Ce.prototype.hitTest = function (t) {
        return this.radius + this.tolerance >= this.getDistance(t)
    }, Ce.prototype.restrict = function (t, e, i, n) {
        if ("x" !== t && "y" !== t) throw new Error("Point.restrict requires a value: x or y");
        return e + this[t] < i ? e = this[t] - i : e + this[t] > n && (e = n - this[t]), this[t] + e
    }, Ce.prototype.draw = function (t) {
        t.ctx.beginPath(), t.ctx.arc(this.x, this.y, this.radius / t.scale, 0, 2 * Math.PI, !1), this.fill && (t.ctx.fillStyle = this.fillColor, t.ctx.fill()), this.stroke && (t.ctx.strokeStyle = this.strokeColor, t.ctx.lineWidth = this.strokeWidth / t.scale, t.ctx.stroke())
    }, _t.proto(ke, Ce), ke.prototype.set = function (t, e, i) {
        this.x = t.x || this.x, this.y = t.y || this.y, e === undefined ? (this.handleIn.x = this.x, this.handleIn.y = this.y) : (this.handleIn.x = e.x, this.handleIn.y = e.y), i === undefined ? (this.handleOut.x = this.x, this.handleOut.y = this.y) : (this.handleOut.x = i.x, this.handleOut.y = i.y)
    }, ke.prototype.clone = function () {
        var t = {
                x: this.x,
                y: this.y
            },
            e = {
                x: this.handleIn.x,
                y: this.handleIn.y
            },
            i = {
                x: this.handleOut.x,
                y: this.handleOut.y
            },
            n = new ke;
        return e.x === i.x && e.y === i.y ? n.set(t) : n.set(t, e, i), n.index = this.index, n.prev = this.prev, n.next = this.next, n.radius = this.radius, n.tolerance = this.tolerance, n.fill = this.fill, n.stroke = this.stroke, n.fillColor = this.fillColor, n.strokeColor = this.strokeColor, n.strokeWidth = this.strokeWidth, n
    }, ke.prototype.move = function (t, e) {
        this.x += t, this.y += e, this.handleIn.x += t, this.handleIn.y += e, this.handleOut.x += t, this.handleOut.y += e
    }, ke.prototype.render = function (t) {
        this.handleIn.x !== this.x && this.handleIn.y !== this.y && this.handleIn.draw(t), this.handleOut.x !== this.x && this.handleOut.y !== this.y && this.handleOut.draw(t), this.draw(t)
    }, _e.prototype.addPoint = function (t) {
        var e;
        return t instanceof ke ? e = t.clone() : ((e = new ke).set(t), e.radius = this.pointRadius), e.index = this.segments.length, null === this._head ? (this._head = e, this._tail = e) : (e.prev = this._tail, this._tail.next = e, this._tail = e), this._head.prev = this._tail, this._tail.next = this._head, this.segments.push(e), e
    }, _e.prototype.addPoints = function (t) {
        for (var e = 0; e < t.length; e++) this.addPoint(t[e]);
        t = null
    }, _e.prototype.setPoints = function (t, e) {
        e === undefined && (e = 0);
        for (var i = e; i < t.length; i++) this.segments[i] === undefined ? this.addPoint(t[i]) : this.segments[i].set(t[i]);
        t = null, e = null
    }, _e.prototype.setPointRadius = function (t) {
        for (var e = -1; ++e < this.segments.length;) undefined.radius = t
    }, _e.prototype.removePoint = function (t) {
        for (var e = this.segments.length, i = null; --e > -1 && null === i;) i = this.segments[e], t.x === i.x && t.y === i.y && (this.segments.splice(e, 1), i === this._head && i === this._tail ? (this._head = null, this._tail = null) : i === this.head ? (this._head = this._head.next, this._head.prev = null) : i === this._tail ? (this._tail = this._tail.prev, this._tail.next = null) : (i.prev.next = i.next, i.next.prev = i.prev));
        return i
    }, _e.prototype.forEachPoint = function (t, e) {
        if (0 !== this.segments.length && this.segments)
            for (var i, n = !1, s = this.segments.length; --s > -1 && !n;) i = this.segments[e ? this.segments.length - 1 - s : s], t && (n = t(i))
    }, _e.prototype.close = function (t) {
        this._closed = t
    }, _e.prototype.isClosed = function () {
        return this._closed
    }, _e.prototype.start = function () {
        return this._head
    }, _e.prototype.end = function () {
        return this._tail
    }, _e.prototype.rotate = function (t, e) {
        e === undefined && (e = this.getCenter());
        for (var i, n = -1; ++n < this.segments.length;)(i = this.segments[n]).handleIn.rotate(e, t), i.rotate(e, t), i.handleOut.rotate(e, t)
    }, _e.prototype.move = function (t, e) {
        for (var i = -1; ++i < this.segments.length;) this.segments[i].move(t, e)
    }, _e.prototype.getPoint = function (t) {
        return this.segments[t]
    }, _e.prototype.getLength = function () {
        return this.segments.length
    }, _e.prototype.getCenter = function () {
        var t = this.getBounding();
        return {
            x: (t.right - t.left) / 2 + t.left,
            y: (t.bottom - t.top) / 2 + t.top
        }
    }, _e.prototype.getDimensions = function () {
        var t = this.getBounding();
        return {
            width: t.right - t.left,
            height: t.bottom - t.top
        }
    }, _e.prototype.getBounding = function () {
        for (var t, e = null, i = null, n = null, s = null, o = -1; ++o < this.segments.length;) t = this.segments[o], (null === e || t.x < e) && (e = t.x), (null === i || t.x > i) && (i = t.x), (null === n || t.y < n) && (n = t.y), (null === s || t.y > s) && (s = t.y);
        return {
            left: e,
            top: n,
            bottom: s,
            right: i
        }
    }, _e.prototype.draw = function (t) {
        t.ctx.beginPath();
        for (var e = -1, i = this.segments.length; ++e < i;) {
            var n = this.segments[e],
                s = n.x !== n.handleIn.x || n.y !== n.handleIn.y || n.prev.x !== n.prev.handleOut.x || n.prev.y !== n.prev.handleOut.y;
            if (0 === n.index) t.ctx.moveTo(n.x, n.y);
            else if (s) {
                t.ctx.bezierCurveTo(n.prev.handleOut.x, n.prev.handleOut.y, n.handleIn.x, n.handleIn.y, n.x, n.y), (n.next.x !== n.next.handleIn.x || n.next.y !== n.next.handleIn.y) && this._closed && this._tail === n && t.ctx.bezierCurveTo(n.handleOut.x, n.handleOut.y, n.next.handleIn.x, n.next.handleIn.y, n.next.x, n.next.y)
            } else t.ctx.lineTo(n.x, n.y)
        }
        this._closed && t.ctx.closePath(), this.fill && (t.ctx.fillStyle = this.fillColor, t.ctx.fill()), this.stroke && (t.ctx.strokeStyle = this.strokeColor, t.ctx.lineWidth = this.strokeWidth / t.scale, t.ctx.stroke()), !0 === this.showPoints && this.forEachPoint((function (e) {
            e.fill = !0, e.render(t)
        }))
    }, _e.prototype.hitTest = function (t, e) {
        e === undefined && (e = {});
        var i, n = !1,
            s = 0,
            o = !1;
        e.segment = e.segment === undefined || e.segment, e.path = e.path === undefined || e.path;
        for (var r = -1; ++r < this.segments.length;) i = this.segments[r], e.path && this._closed && (s += Ee(t, i)), e.segment && i.hitTest(t) && (o = i);
        return e.path && 0 !== s && !1 === o ? n = {
            type: "path",
            geometry: this
        } : o && (n = {
            type: "segment",
            geometry: o
        }), n
    }, _e.prototype.destroy = function () {
        for (var t = this.segments.length; --t > -1;) this.segments.splice(t, 1);
        return this._head = null, this._tail = null, this.segments = [], null
    }, _t.proto(Ae, kt), Ae.prototype.dimensions = function (t, e) {
        this.css({
            width: t,
            height: e
        }), this.element.width = Math.round(t / this.scale) * this.dpr, this.element.height = Math.round(e / this.scale) * this.dpr, this.ctx.scale(this.dpr, this.dpr), this.width = Math.round(t / this.scale), this.height = Math.round(e / this.scale)
    }, Ae.prototype.clear = function () {
        this.ctx && this.ctx.clearRect(0, 0, this.element.width, this.element.height)
    }, Ae.prototype.draw = function () {
        this.ctx && (this.ctx.fillStyle = this.clearColor, this.ctx.fillRect(0, 0, this.element.width, this.element.height))
    }, Ae.prototype._destroy = function () {
        this.__destroy(), this.element = null, this.ctx = null, this.width = null, this.height = null
    }, He.prototype.setID = function (t) {
        this.id = t
    }, He.prototype.contact = function (t, e) {
        if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
        var i = this,
            n = Date.now().toString(36),
            s = {
                source: "hcaptcha",
                label: t,
                id: this.id,
                promise: "create",
                lookup: n
            };
        if (e) {
            if ("object" != typeof e) throw new Error("Message must be an object.");
            s.contents = e
        }
        return new Promise((function (e, o) {
            i.waiting.push({
                label: t,
                reject: o,
                resolve: e,
                lookup: n
            }), Le(i.target, s)
        }))
    }, He.prototype.listen = function (t, e) {
        if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
        for (var i = this.messages.length, n = !1; --i > -1 && !1 === n;) this.messages[i].label === t && (n = this.messages[i]);
        !1 === n && (n = {
            label: t,
            listeners: []
        }, this.messages.push(n)), n.listeners.push(e)
    }, He.prototype.answer = function (t, e) {
        if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
        for (var i = this.incoming.length, n = !1; --i > -1 && !1 === n;) this.incoming[i].label === t && (n = this.incoming[i]);
        !1 === n && (n = {
            label: t,
            listeners: []
        }, this.incoming.push(n)), n.listeners.push(e)
    }, He.prototype.send = function (t, e) {
        if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
        var i = {
            source: "hcaptcha",
            label: t,
            id: this.id
        };
        if (e) {
            if ("object" != typeof e) throw new Error("Message must be an object.");
            i.contents = e
        }
        Le(this.target, i)
    }, He.prototype.check = function (t, e) {
        for (var i = [].concat.apply([], [this.messages, this.incoming, this.waiting]), n = [], s = -1; ++s < i.length;)
            if (i[s].label === t) {
                if (e && i[s].lookup && e !== i[s].lookup) continue;
                n.push(i[s])
            } return n
    }, He.prototype.respond = function (t) {
        for (var e, i, n = -1, s = 0, o = [].concat.apply([], [this.messages, this.incoming, this.waiting]); ++n < o.length;)
            if (o[n].label === t.label) {
                if (t.lookup && o[n].lookup && t.lookup !== o[n].lookup) continue;
                var r = [];
                if (e = o[n], t.error && r.push(t.error), t.contents && r.push(t.contents), t.promise && "create" !== t.promise) {
                    e[t.promise].apply(e[t.promise], r);
                    for (var a = this.waiting.length, l = !1; --a > -1 && !1 === l;) this.waiting[a].label === e.label && this.waiting[a].lookup === e.lookup && (l = !0, this.waiting.splice(a, 1));
                    continue
                }
                for (s = 0; s < e.listeners.length; s++) {
                    if (i = e.listeners[s], "create" === t.promise) {
                        var h = Be.call(this, e.label, t.lookup);
                        r.push(h)
                    }
                    i.apply(i, r)
                }
            } o = null
    }, He.prototype.destroy = function () {
        return this.messages = null, this.incoming = null, this.waiting = null, null
    };
    var Me = {
        chats: [],
        isSupported: function () {
            return !!window.postMessage
        },
        createChat: function (t, e) {
            var i = new He(t, e);
            return Me.chats.push(i), i
        },
        addChat: function (t) {
            Me.chats.push(t)
        },
        removeChat: function (t) {
            for (var e = !1, i = Me.chats.length; --i > -1 && !1 === e;) t.id === Me.chats[i].id && t.target === Me.chats[i].target && (e = Me.chats[i], Me.chats.splice(i, 1));
            return e
        },
        handle: function (t) {
            var e = t.data;
            if ("string" == typeof e) try {
                if (!(e.indexOf("hcaptcha") >= 0)) return;
                e = JSON.parse(e);
                for (var i, n = Me.chats, s = -1; ++s < n.length;)(i = n[s]).id === e.id && i.respond(e)
            } catch (Os) {
                et("postMessage handler error", "postMessage", "debug", {
                    event: t,
                    error: Os
                })
            }
        }
    };
    window.addEventListener ? window.addEventListener("message", Me.handle) : window.attachEvent("onmessage", Me.handle);
    var Ve = new He(window.parent);

    function Oe(t, e) {
        for (var i in e) {
            var n = e[i];
            switch (typeof n) {
                case "string":
                    t[i] = n;
                    break;
                case "object":
                    t[i] = t[i] || {}, Oe(t[i], n);
                    break;
                default:
                    throw new Error("Source theme contains invalid data types. Only string and object types are supported.")
            }
        }
    }

    function Te(t, e) {
        try {
            return t in e
        } catch (i) {
            return !1
        }
    }

    function Fe(t) {
        return !!t && "object" == typeof t
    }

    function Re(t) {
        return Fe(t) ? De({}, t) : t
    }

    function De(t, e) {
        var i, n = {},
            s = Object.keys(t);
        for (i = 0; i < s.length; i++) n[s[i]] = Re(t[s[i]]);
        var o, r, a = Object.keys(e);
        for (i = 0; i < a.length; i++) {
            var l = a[i];
            if (!(!Te(o = l, r = t) || Object.hasOwnProperty.call(r, o) && Object.propertyIsEnumerable.call(r, o))) return;
            Te(l, t) && Fe(t[l]) ? n[l] = De(t[l], e[l]) : n[l] = Re(e[l])
        }
        return n
    }
    Ve.init = function (t) {
        Ve.setID(t), Me.addChat(Ve)
    };
    var $e = {
            transparent: "transparent",
            white: "#ffffff",
            black: "#000000"
        },
        Pe = {
            100: "#fafafa",
            200: "#f5f5f5",
            300: "#E0E0E0",
            400: "#D7D7D7",
            500: "#BFBFBF",
            600: "#919191",
            700: "#555555",
            800: "#333333",
            900: "#222222",
            1e3: "#14191F"
        },
        Ie = {
            300: "#4DE1D2",
            500: "#00838F"
        },
        je = {
            300: "#EB5757",
            500: "#EB5757",
            700: "#DE3F3F"
        },
        Ne = {
            __proto__: null,
            common: $e,
            grey: Pe,
            teal: Ie,
            red: je
        },
        Ze = {
            mode: "light",
            grey: Pe,
            primary: {
                main: Ie[500]
            },
            secondary: {
                main: Ie[300]
            },
            warn: {
                light: je[300],
                main: je[500],
                dark: je[700]
            },
            text: {
                heading: Pe[700],
                body: Pe[700]
            }
        },
        ze = {
            mode: "dark",
            grey: Pe,
            primary: {
                main: Ie[500]
            },
            secondary: {
                main: Ie[300]
            },
            text: {
                heading: Pe[200],
                body: Pe[200]
            }
        };

    function Ue(t, e) {
        return "dark" === e && t in ze ? ze[t] : Ze[t]
    }

    function We() {
        this._themes = Object.create(null), this._active = "light", this.add("light", {}), this.add("dark", {
            palette: {
                mode: "dark"
            }
        })
    }
    We.prototype.get = function (t) {
        if (!t) return this._themes[this._active];
        var e = this._themes[t];
        if (!e) throw new Error("Cannot find theme with name: " + t);
        return e
    }, We.prototype.use = function (t) {
        this._themes[t] ? this._active = t : console.error("Cannot find theme with name: " + t)
    }, We.prototype.active = function () {
        return this._active
    }, We.prototype.add = function (t, e) {
        e || (e = {}), e.palette = function (t) {
            t || (t = {});
            var e = t.mode || "light",
                i = t.primary || Ue("primary", e),
                n = t.secondary || Ue("secondary", e),
                s = t.warn || Ue("warn", e),
                o = t.grey || Ue("grey", e),
                r = t.text || Ue("text", e);
            return De({
                common: $e,
                mode: e,
                primary: i,
                secondary: n,
                grey: o,
                warn: s,
                text: r
            }, t)
        }(e.palette), e.component = e.component || Object.create(null), this._themes[t] = e
    }, We.prototype.extend = function (t, e) {
        "string" == typeof e && (e = JSON.parse(e));
        var i = JSON.parse(JSON.stringify(this.get(t)));
        return Oe(i, e), i
    }, We.merge = function (t, e) {
        return De(t, e || {})
    };
    var qe = {
            __proto__: null,
            Colors: Ne,
            Theme: We
        },
        Ge = new We;

    function Ke(t) {
        _t.self(this, Et, "link", "a"), this.config = {
            url: t.url,
            text: t.text,
            underline: t.underline || !1,
            theme: t.theme,
            onDarkBg: t.onDarkBg
        }, this.setAttribute("tabindex", 0), this.onSelect = this.onSelect.bind(this), this.onHover = this.onHover.bind(this), this.addEventListener("enter", this.onSelect), this.addEventListener("click", this.onSelect), this.addEventListener("over", this.onHover), this.addEventListener("out", this.onHover), this.translate()
    }

    function Je(t) {
        _t.self(this, Et, null, "span"), this.config = {
            text: t.text,
            bold: t.bold
        }, this.text(this.config.text)
    }

    function Ye(t) {
        _t.self(this, Et, t.selector || null, t.element || "div"), this.state = {
            theme: t.theme
        }
    }

    function Xe(t) {
        if ("string" != typeof t.src && !(t.src instanceof HTMLElement)) throw new TypeError("Graphic src must be string or HTMLElement. Passed src: " + t.src);
        _t.self(this, Et, t.selector || ".graphic"), this.state = {
            loaded: !1
        }, this.config = {
            src: t.src,
            fallback: t.fallback || !1,
            width: t.width || 0,
            height: t.height || t.width || 0,
            fill: t.fill
        }, this.image = null, (t.autoLoad || t.autoLoad === undefined) && this.load()
    }

    function Qe(t) {
        _t.self(this, Et, "logo", "a"), this.state = {
            url: t.url || "",
            width: t.width || 0,
            height: t.height || 0
        }, this.setAttribute("tabindex", 0), this.setAttribute("target", "_blank"), this.setAttribute("href", this.state.url);
        var e = {
            selector: ".logo-graphic",
            src: t.src,
            fallback: t.fallback,
            autoLoad: t.autoLoad
        };
        this.$graphic = this.initComponent(Xe, e), this.$graphic.css({
            cursor: "pointer",
            "-ms-high-contrast-adjust": "none"
        }), this.onSelect = this.onSelect.bind(this), this.addEventListener("click", this.onSelect), this.addEventListener("enter", this.onSelect)
    }

    function ti(t) {
        _t.self(this, Et, t.selector || ".border"), this.state = {
            visible: t.visible === undefined || t.visible,
            thickness: t.thickness || 1,
            color: t.color || "#000000",
            rounded: t.rounded || 0
        }, this.$top = this.createElement("div"), this.$right = this.createElement("div"), this.$left = this.createElement("div"), this.$bottom = this.createElement("div")
    }

    function ei(t) {
        var e = t.palette,
            i = t.component;
        return We.merge({
            main: {
                fill: e.common.white,
                icon: e.grey[700],
                text: e.text.main
            },
            hover: {
                fill: e.grey[200],
                icon: e.primary.main,
                text: e.text.main
            },
            focus: {
                icon: e.primary.main
            },
            active: {
                icon: e.grey[700]
            }
        }, i.button)
    }

    function ii(t) {
        _t.self(this, Et, t.selector), this._theme = t.theme, this.state = {
            selectable: !1 !== t.selectable,
            title: t.title,
            label: t.label,
            visible: !0,
            locked: !1,
            mobile: !1,
            selected: !1,
            width: t.width,
            height: t.height,
            closedAt: Date.now(),
            downAt: 0,
            style: ei(this._theme.get())
        }, this.addClass("button"), this.setAttribute("tabindex", 0), this.setAttribute("role", "button"), this.onDown = this.onDown.bind(this), this.onHover = this.onHover.bind(this), this.onSelect = this.onSelect.bind(this), this.addEventListener("down", this.onDown), this.addEventListener("click", this.onSelect), this.addEventListener("enter", this.onSelect), !1 === N.System.mobile && (this.addEventListener("over", this.onHover), this.addEventListener("out", this.onHover)), this.setTitle(), this.setLabel()
    }
    Ge.add("contrast", {
        component: {
            prompt: {
                main: {
                    fill: "#fff",
                    text: "#000"
                }
            },
            expandButton: {
                main: {
                    fill: "#000"
                }
            }
        }
    }), Ge.add("grey-red", {
        component: {
            breadcrumb: {
                active: {
                    fill: "#FF0000"
                }
            },
            prompt: {
                main: {
                    fill: "#6a6a6a"
                }
            },
            task: {
                selected: {
                    border: "#ff1f17"
                }
            },
            expandButton: {
                main: {
                    fill: "#6a6a6a"
                }
            },
            verifyButton: {
                main: {
                    fill: "#ff1f17"
                },
                hover: {
                    fill: "#ff1f17"
                }
            },
            skipButton: {
                main: {
                    fill: "#6a6a6a"
                },
                hover: {
                    fill: "#6a6a6a"
                }
            }
        }
    }), _t.proto(Ke, Et), Ke.prototype.style = function (t) {
        var e = t.fontSize || 12,
            i = t.color || "inherit";
        this.css({
            color: i,
            fontWeight: 500,
            fontSize: e,
            cursor: "pointer",
            textDecoration: this.config.underline ? "underline" : "none",
            display: "inline-block",
            lineHeight: e
        })
    }, Ke.prototype.translate = function () {
        var t = Rt.translate(this.config.text);
        this.content(t)
    }, Ke.prototype.onHover = function (t) {
        var e = "over" === t.action;
        if (this.css({
                textDecoration: e || this.config.underline ? "underline" : "none"
            }), this.config.theme) {
            var i = this.config.theme.get().palette;
            this.css({
                color: e ? this.config.onDarkBg ? i.secondary.main : i.primary.main : "inherit"
            })
        }
    }, Ke.prototype.onSelect = function () {
        window.open(this.config.url, "_blank")
    }, _t.proto(Je, Et), Je.prototype.style = function (t) {
        var e = t.fontSize || 12,
            i = t.color || "#000";
        this.css({
            color: i,
            fontWeight: this.config.bold ? 700 : 500,
            fontSize: e,
            lineHeight: e
        })
    }, Je.prototype.translate = function () {
        var t = Rt.translate(this.config.text);
        this.text(t)
    }, _t.proto(Ye, Et), Ye.prototype.style = function (t) {
        for (var e = this.children.length; --e > -1;) this.children[e].style(t)
    }, Ye.prototype.parseText = function (t) {
        var e, i, n = [{
                type: "BOLD",
                regex: /\*\*([^*]*)\*\*/g
            }, {
                type: "LINK",
                regex: /\[([^[]+)]\(([^)]*)\)/g
            }],
            s = [];
        for (e = n.length; --e > -1;)
            for (; null != (i = n[e].regex.exec(t));) i.type = n[e].type, s.push(i);
        s = s.sort((function (t, e) {
            return t.index - e.index
        })), this.removeAllComponents();
        var o = 0;
        for (e = 0; e < s.length; e++) switch (i = s[e], this.initComponent(Je, {
            text: t.substring(o, i.index)
        }), o = i.index + i[0].length, i.type) {
            case "BOLD":
                this.initComponent(Je, {
                    text: i[1],
                    bold: !0
                });
                break;
            case "LINK":
                this.initComponent(Ke, {
                    text: i[1],
                    url: i[2],
                    underline: !0,
                    onDarkBg: !0,
                    theme: this.state.theme
                })
        }
        o < t.length && this.initComponent(Je, {
            text: t.substring(o)
        }), this.style({
            fontSize: "inherit",
            color: "inherit"
        })
    }, _t.proto(Xe, Et), Xe.prototype.load = function () {
        if (this.state.loaded) return Promise.resolve();
        this.state.loaded = !0;
        var t = this,
            e = this.config.src;
        return te.image(e, {
            fallback: this.config.fallback
        }).then((function (e) {
            t.image = e, t.appendElement(e.element), t.size(), t.fill()
        }))["catch"]((function () {
            et("graphic failed to load", "image", "info", {
                src: e
            })
        }))
    }, Xe.prototype.size = function (t, e) {
        this.config.width = t || this.config.width, this.config.height = e || t || this.config.height, this.css({
            width: this.config.width,
            height: this.config.height
        }), this.image && this.image.element.css({
            width: this.config.width,
            height: this.config.height,
            display: "block"
        })
    }, Xe.prototype.fill = function (t) {
        if (this.config.fill = t || this.config.fill, this.image && "svg" === this.image.ext && this.config.fill) {
            var e = this.image.element.dom,
                i = e.children || e.childNodes;
            if (i)
                for (var n = 0; n < i.length; n++) i[n].style && (i[n].style.fill = this.config.fill)
        }
    }, _t.proto(Qe, Et), Qe.prototype.setUrl = function (t) {
        this.state.url = t
    }, Qe.prototype.getUrl = function () {
        return this.state.url
    }, Qe.prototype.size = function (t, e) {
        t && (this.state.width = t), e ? this.state.height = e : t && (this.state.height = t), this.css({
            display: "block",
            width: this.state.width,
            height: this.state.height
        }), this.$graphic.size(this.state.width, this.state.height)
    }, Qe.prototype.onSelect = function (t) {
        t.preventDefault && t.preventDefault(), window.open(this.state.url, "_blank")
    }, _t.proto(ti, Et), ti.prototype.style = function (t, e, i) {
        e || (e = t), i !== undefined && (this.state.thickness = i), this.css({
            width: t,
            height: e,
            opacity: this.state.visible ? 1 : 0,
            position: "absolute",
            left: 0,
            top: 0,
            overflow: "hidden",
            borderRadius: this.state.rounded
        }), this.$top.css({
            position: "absolute",
            left: 0,
            top: 0,
            width: t,
            height: this.state.thickness,
            backgroundColor: this.state.color
        }), this.$bottom.css({
            position: "absolute",
            left: 0,
            bottom: 0,
            width: t,
            height: this.state.thickness,
            backgroundColor: this.state.color
        }), this.$right.css({
            position: "absolute",
            right: 0,
            top: 0,
            width: this.state.thickness,
            height: e,
            backgroundColor: this.state.color
        }), this.$left.css({
            position: "absolute",
            left: 0,
            top: 0,
            width: this.state.thickness,
            height: e,
            backgroundColor: this.state.color
        })
    }, ti.prototype.setVisibility = function (t) {
        this.state.visible = t, this.css({
            opacity: t ? 1 : 0
        })
    }, ti.prototype.setColor = function (t) {
        this.state.color = t, this.$top.css({
            backgroundColor: this.state.color
        }), this.$bottom.css({
            backgroundColor: this.state.color
        }), this.$right.css({
            backgroundColor: this.state.color
        }), this.$left.css({
            backgroundColor: this.state.color
        })
    }, ti.prototype.isVisible = function () {
        return this.state.visible
    }, _t.proto(ii, Et), ii.prototype.style = function (t) {
        this.state.mobile = t, this.state.style = ei(this._theme.get()), this.css({
            width: this.state.width,
            height: this.state.height,
            cursor: this.state.locked ? "default" : "pointer",
            display: this.state.visible ? "inline-block" : "none",
            border: "none",
            color: this.state.style.main.text,
            backgroundColor: this.state.style.main.fill,
            borderRadius: 4
        }), this.emit("style")
    }, ii.prototype.getWidth = function () {
        return this.state.width
    }, ii.prototype.getHeight = function () {
        return this.state.height
    }, ii.prototype.onDown = function () {
        this.state.downAt = Date.now()
    }, ii.prototype.onHover = function (t) {
        null === this.emit || !0 === this.state.locked || this.state.selected || (this.emit("hover", t), this._updateStyle("over" === t.action))
    }, ii.prototype._updateStyle = function (t) {
        this.css({
            backgroundColor: t ? this.state.style.hover.fill : this.state.style.main.fill,
            color: t ? this.state.style.hover.text : this.state.style.main.text
        }), this.emit("style-update", t)
    }, ii.prototype.onSelect = function (t) {
        this.emit && !0 !== this.state.locked && (Math.abs(this.state.downAt - this.state.closedAt) < 30 || (this._setState(!!this.state.selectable && !this.state.selected), this.emit("click", {
            selected: this.state.selected,
            usingKb: "enter" === t.action
        })))
    }, ii.prototype.setLock = function (t) {
        this.state.locked = t, this.css({
            cursor: t ? "default" : "pointer"
        })
    }, ii.prototype.enable = function (t) {
        this.state.visible = t, this.css({
            display: t ? "inline-block" : "none"
        }), this.setLock.call(this, !t)
    }, ii.prototype.reset = function () {
        this._setState(!1)
    }, ii.prototype._setState = function (t) {
        this.state.selected = t, this.css({
            backgroundColor: this.state.style.main.fill
        }), t ? this._updateStyle(!0) : this.state.closedAt = Date.now(), this.emit("state-changed", t)
    }, ii.prototype.setLabel = function (t) {
        t ? this.setAttribute("aria-label", t) : this.state.label && this.setAttribute("aria-label", Rt.translate(this.state.label))
    }, ii.prototype.setTitle = function (t) {
        t ? this.setAttribute("title", t) : this.state.title && this.setAttribute("title", Rt.translate(this.state.title))
    }, ii.prototype.controlsMenu = function (t) {
        this.setAttribute("aria-expanded", !1), this.setAttribute("aria-haspopup", "menu"), this.setAttribute("aria-controls", t.dom.id), t.setAttribute("aria-labelledby", this.dom.id), t.setAttribute("role", "menu"), t.setAttribute("tabindex", -1), this.on("state-changed", (function (t) {
            this.setAttribute("aria-expanded", t)
        }))
    }, ii.prototype.ownsListBox = function (t) {
        this.setAttribute("aria-expanded", !1), this.setAttribute("aria-haspopup", "listbox"), this.setAttribute("aria-owns", t.dom.id), t.setAttribute("aria-labelledby", this.dom.id), t.setAttribute("role", "listbox"), this.on("state-changed", (function (t) {
            this.setAttribute("aria-expanded", t)
        }))
    };
    var ni = "https://newassets.hcaptcha.com/captcha/v1/1f7dc62/static/images";

    function si(t) {
        t.selector = t.selector || t.name, _t.self(this, ii, t), this.$on = this.initComponent(Xe, {
            selector: "." + t.name + "-on",
            src: t.src,
            fallback: ni + "/" + t.name + "-on.png",
            autoLoad: !1
        }), this.$off = this.initComponent(Xe, {
            selector: "." + t.name + "-off",
            src: t.src,
            fallback: ni + "/" + t.name + "-off.png",
            autoLoad: !1
        }), this.on("state-changed", this._onStateChange.bind(this)), this.on("style", this._onStyle.bind(this)), this.on("style-update", this._onStyleUpdate.bind(this))
    }

    function oi(t) {
        _t.self(this, ii, t), this.$text = this.createElement(".text"), this.on("style", this._onStyle.bind(this))
    }

    function ri(t) {
        _t.self(this, Et, t.selector || "list-native", "select");
        var e = this;
        this._options = [], this._selected = null, this.setAttribute("tabindex", -1), this.addEventListener("change", (function () {
            e.select(e.dom.value)
        }))
    }
    _t.proto(si, ii), si.prototype.load = function () {
        return Promise.all([this.$on.load(), this.$off.load()])
    }, si.prototype._onStyle = function () {
        var t = this.getWidth(),
            e = t - 10,
            i = (t - e) / 2;
        this.$on.size(e), this.$on.fill(this.state.style.focus.icon), this.$on.css({
            "-ms-high-contrast-adjust": "none",
            position: "absolute",
            top: i,
            left: i
        }), this.$off.size(e), this.$off.fill(this.state.style.main.icon), this.$off.css({
            "-ms-high-contrast-adjust": "none",
            position: "absolute",
            top: i,
            left: i
        })
    }, si.prototype._onStyleUpdate = function (t) {
        "ie" === N.Browser.type && 8 === N.Browser.version ? (this.$on.css({
            display: t ? "block" : "none"
        }), this.$off.css({
            display: t ? "none" : "block"
        })) : (this.$on.css({
            opacity: t ? 1 : 0
        }), this.$off.css({
            opacity: t ? 0 : 1
        }))
    }, si.prototype._onStateChange = function (t) {
        "ie" === N.Browser.type && 8 === N.Browser.version ? (this.$on.css({
            display: t ? "block" : "none"
        }), this.$off.css({
            display: t ? "none" : "block"
        })) : (this.$on.css({
            opacity: t ? 1 : 0
        }), this.$off.css({
            opacity: t ? 0 : 1
        }))
    }, _t.proto(oi, ii), oi.prototype.setText = function (t) {
        this.$text.text(t)
    }, oi.prototype._onStyle = function () {
        this.css({
            cursor: "pointer"
        }), this.$text.css({
            width: "100%",
            height: "100%",
            textAlign: "center",
            fontSize: 11,
            fontWeight: 600,
            lineHeight: this.state.height,
            position: "absolute"
        })
    }, _t.proto(ri, Et), ri.prototype.getSelected = function () {
        return this._selected
    }, ri.prototype.setCopy = function () {
        for (var t = this._options.length; t--;) this._options[t].element.text(Rt.translate(this._options[t].text))
    }, ri.prototype.setOptions = function (t) {
        for (var e, i = this._options.length; i--;) this.removeElement(this._options[i].element);
        for (this._options = t, i = 0; i < t.length; i++)(e = this.createElement("option", t[i].selector || ".option")).dom.value = t[i].value, e.text(t[i].text), this._options[i].element = e
    }, ri.prototype.select = function (t) {
        for (var e = null, i = this._options.length; i--;) t === this._options[i].value && (e = this._options[i]);
        if (!e) throw new Error("Cannot select a missing option value: " + t);
        this._selected && this._selected.element.removeAttribute("selected"), e.element.setAttribute("selected", "selected"), this._selected = e, this.dom.value = e.value, this.emit("hide"), this.emit("select", e)
    }, ri.prototype.deselect = function () {
        this._selected && this._selected.element.removeAttribute("selected"), this._selected = null, this.dom.value = null
    }, ri.prototype.style = function () {
        this.css({
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            zIndex: 50
        })
    };
    var ai = 37,
        li = 39,
        hi = 38,
        ci = 40,
        ui = ("onwheel" in document || document, document, "ontouchstart" in document),
        di = navigator.maxTouchPoints && navigator.maxTouchPoints > 1,
        pi = !!window.navigator.msPointerEnabled,
        fi = "onkeydown" in document;

    function mi(t) {
        this.state = {
            pause: !1,
            action: null,
            position: {
                x: 0,
                y: 0
            },
            delta: {
                x: 0,
                y: 0
            }
        }, this.config = {
            arrowScrolling: !1 !== t.arrowScrolling,
            keyStep: t.keyStep || 120,
            firefoxMult: t.firefoxMult || 15,
            touchMult: t.touchMult || 2,
            mouseMult: t.mouseMult || 1
        };
        var e = t.element || document.body;
        e instanceof kt || (e = new kt(e)), this.element = e, this.msBodyTouch = null, this.clamp = {
            enabled: !1,
            min: {
                x: 0,
                y: 0
            },
            max: {
                x: 0,
                y: 0
            }
        }, this.onWheel = this.onWheel.bind(this), this.onKey = this.onKey.bind(this), this.onTouch = this.onTouch.bind(this), this._addListeners()
    }

    function yi() {
        _t.self(this, Et, "scroll-container")
    }

    function gi(t) {
        _t.self(this, Et, t.selector || "list-custom"), this.state = {
            skipAnimationOnce: !1
        }, this.scroll = new mi({
            element: this,
            arrowScrolling: !1,
            mouseMult: .5,
            keyStep: 46
        }), this._container = this.initComponent(yi), this._handle = this.createElement("div"), this.on("scroll-update", this._onScrollUpdate.bind(this))
    }

    function vi(t) {
        var e = t.palette,
            i = t.component;
        return We.merge({
            main: {
                fill: e.common.transparent,
                line: e.grey[200],
                text: e.grey[700]
            },
            hover: {
                fill: e.grey[200],
                text: e.grey[900],
                border: e.secondary.main + "b3"
            },
            selected: {
                fill: "#5C6F8A",
                text: e.grey[100]
            }
        }, i.listItem)
    }

    function bi(t) {
        _t.self(this, Et, t.option.selector || ".option");
        var e = this;
        this.state = {
            style: vi(t.theme.get()),
            selected: !1,
            usingKb: !1,
            isLast: !1,
            size: t.size,
            option: t.option,
            theme: t.theme,
            isMenu: t.isMenu,
            height: t.height
        }, this.text = this.text.bind(this), this._text = this.createElement("span"), this._separator = this.createElement("div"), this.addEventListener("click", this.select.bind(this)), this.addEventListener("enter", this.select.bind(this)), this.addEventListener("over", this._onHover.bind(this, !0)), this.addEventListener("out", this._onHover.bind(this, !1)), this.addEventListener("blur", (function () {
            e.updateStyle(!1), e.emit("blur")
        })), this.addEventListener("focus", (function () {
            e.updateStyle(e.state.usingKb), e.emit("focus")
        })), this.setAttribute("tabindex", 0), this.setAttribute("aria-selected", this.state.selected), this.setAttribute("aria-setsize", this.state.size), this.setAttribute("role", this.state.isMenu ? "menuitem" : "option"), this.setCopy()
    }

    function wi(t) {
        _t.self(this, gi, {
            selector: t.selector || "list-custom"
        }), this.state = {
            theme: t.theme,
            isMenu: t.isMenu,
            usingKb: !1,
            visible: !1,
            centerOnce: !1,
            search: "",
            focusedId: -1,
            selected: null,
            optionStyle: null,
            searchTimer: null,
            optionsVisible: t.optionsVisible || 6,
            optionHeight: 46
        }, this._options = [], this.setAttribute("tabindex", -1), this.setAttribute("aria-expanded", !1), this.setAttribute("role", this.state.isMenu ? "presentation" : "listbox"), this.addEventListener("keydown", this.onKeyPress.bind(this))
    }

    function xi(t) {
        _t.self(this, Et, (t = t || {}).selector || ".box-container"), this._theme = t.theme, this.boxState = {
            ariaLabel: t.ariaLabel,
            visible: !0,
            css: {
                boxSizing: t.boxSizing,
                width: t.width,
                height: t.height,
                padding: t.padding,
                margin: t.margin,
                borderWidth: t.borderWidth,
                borderStyle: t.borderStyle,
                borderRadius: t.borderRadius,
                borderColor: t.borderColor,
                backgroundColor: t.backgroundColor,
                cursor: t.cursor
            }
        }, this.setStyle(this.boxState), this.setAriaLabel(), this.setVisible(!0)
    }
    mi.prototype.pause = function (t) {
        this.state.pause = t
    }, mi.prototype.update = function (t) {
        if (!this.state.pause) {
            var e = this.state.position,
                i = this.state.delta,
                n = this.state.action;
            e.x += i.x, e.y += i.y, this.clamp.enabled ? (e.x = rt(e.x, this.clamp.min.x, this.clamp.max.x), e.y = rt(e.y, this.clamp.min.y, this.clamp.max.y)) : console.log(e.y, this.element.dom.scrollHeight), this.element.emit("scroll-update", {
                x: e.x,
                y: e.y,
                delta: i,
                action: n,
                original: t
            })
        }
    }, mi.prototype._addListeners = function () {
        var t = {
            passive: !1
        };
        ("ie" !== N.Browser.type || "ie" === N.Browser.type && 8 !== N.Browser.version) && (this.element.addEventListener("DOMMouseScroll", this.onWheel), this.element.addEventListener("wheel", this.onWheel, t)), this.element.addEventListener("mousewheel", this.onWheel, t), ui && (this.element.addEventListener("touchstart", this.onTouch), this.element.addEventListener("touchmove", this.onTouch)), pi && di && (this.msBodyTouch = document.body.style.msTouchAction, document.body.style.msTouchAction = "none", this.element.addEventListener("MSPointerDown", this.onTouch, !0), this.element.addEventListener("MSPointerMove", this.onTouch, !0)), this.config.arrowScrolling && fi && this.element.addEventListener("keydown", this.onKey)
    }, mi.prototype.onWheel = function (t) {
        if (!this.state.pause) {
            (t = window.event || t).preventDefault && t.preventDefault();
            var e = this.state.delta,
                i = this.config.mouseMult,
                n = this.config.firefoxMult;
            "detail" in t && "wheel" !== t.type && 0 !== t.detail ? (e.y = -1 * t.detail, e.y *= n) : "wheelDelta" in t && !("wheelDeltaY" in t) ? e.y = -1 * t.wheelDelta : (e.x = -1 * (t.deltaX || t.wheelDeltaX), e.y = -1 * (t.deltaY || t.wheelDeltaY), "firefox" === N.Browser.type && 1 === t.deltaMode && n && (e.x *= n, e.y *= n)), i && (e.x *= i, e.y *= i), this.state.action = "wheel", this.update.call(this, t)
        }
    }, mi.prototype.onTouch = function (t) {
        if (!this.state.pause) {
            var e = this.state.position,
                i = this.state.delta,
                n = this.config.touchMult,
                s = t.targetTouches[0];
            "move" === t.action ? (i.x = (s.pageX - e.x) * n, i.y = (s.pageY - e.y) * n) : (i.x = 0, i.y = 0), this.state.action = "touch", this.update.call(this, t)
        }
    }, mi.prototype.onKey = function (t) {
        if (!this.state.pause && !t.metaKey) {
            var e = this.state.delta,
                i = this.config.keyStep;
            switch (t.keyCode) {
                case ci:
                    t.preventDefault && t.preventDefault(), e.x = 0, e.y = -i;
                    break;
                case hi:
                    t.preventDefault && t.preventDefault(), e.x = 0, e.y = i;
                    break;
                case ai:
                    e.x = -i, e.y = 0;
                    break;
                case li:
                    e.x = i, e.y = 0;
                    break;
                default:
                    return e.x = 0, void(e.y = 0)
            }
            this.state.action = "keypress", this.update.call(this, t)
        }
    }, mi.prototype.clampX = function (t, e, i) {
        this.clamp.enabled = t, this.clamp.min.x = e || 0, this.clamp.max.x = i || 0
    }, mi.prototype.clampY = function (t, e, i) {
        this.clamp.enabled = t, this.clamp.min.y = e || 0, this.clamp.max.y = i || 0
    }, mi.prototype.reset = function () {
        this.state.position = {
            x: 0,
            y: 0
        }, this.state.delta = {
            x: 0,
            y: 0
        }
    }, mi.prototype.setPosX = function (t) {
        this.setPos(t, this.state.position.y)
    }, mi.prototype.setPosY = function (t) {
        this.setPos(this.state.position.x, t)
    }, mi.prototype.moveYBy = function (t) {
        this.setPos(this.state.position.x, this.state.position.y + t)
    }, mi.prototype.getY = function () {
        return this.state.position.y
    }, mi.prototype.setPos = function (t, e) {
        this.clamp.enabled && (t = rt(t, this.clamp.min.x, this.clamp.max.x), e = rt(e, this.clamp.min.y, this.clamp.max.y)), this.state.position = {
            x: t,
            y: e
        }, this.state.delta = {
            x: 0,
            y: 0
        }, this.element.emit("scroll-update", {
            x: t,
            y: e,
            delta: this.state.delta,
            action: null
        })
    }, _t.proto(yi, Et), _t.proto(gi, Et), gi.prototype.getContainer = function () {
        return this._container
    }, gi.prototype.scrollInView = function (t, e, i) {
        this.dom.scrollTop = 0, this.state.skipAnimationOnce = i;
        var n = -t.offsetTop,
            s = t.offsetHeight,
            o = this.dom.clientHeight,
            r = this._container.dom.scrollHeight,
            a = this.scroll.getY(),
            l = a - o;
        this._handle.css({
            display: r <= o ? "none" : "block"
        }), this.scroll.clampY(!0, o - r, 0), e ? this.scroll.setPosY(n + o / 2 - s / 2) : n > a ? this.scroll.setPosY(n) : n - s < l && this.scroll.setPosY(n + o - s)
    }, gi.prototype._onScrollUpdate = function (t) {
        var e = t.y,
            i = this._handle.dom.offsetHeight,
            n = this.dom.clientHeight,
            s = (at(e, 0, n - this._container.dom.scrollHeight, 0, 1) || 0) * (n - i - 4);
        "ie" === N.Browser.type && 8 === N.Browser.version ? (this._container.css({
            top: e
        }), this._handle.css({
            top: s
        })) : (this._container.css({
            transform: "translateY(" + e + "px)",
            transition: this.state.skipAnimationOnce ? "none" : "transform 300ms"
        }), this._handle.css({
            transform: "translateY(" + s + "px)",
            transition: this.state.skipAnimationOnce ? "none" : "transform 300ms"
        }), this.state.skipAnimationOnce = !1)
    }, gi.prototype.baseStyle = function () {
        this._container.css({
            width: "100%",
            position: "absolute",
            overflowY: "hidden"
        }), this._handle.css({
            position: "absolute",
            willChange: "transform",
            width: 3,
            height: 40,
            top: 2,
            right: 5,
            borderRadius: 4,
            backgroundColor: "#6E829E"
        })
    }, _t.proto(bi, Et), bi.prototype.usingKb = function (t) {
        this.state.usingKb = t
    }, bi.prototype.select = function () {
        this.state.selected = !0, this.setAttribute("aria-selected", this.state.selected), this.updateStyle(this.state.usingKb), this.emit("select", this)
    }, bi.prototype.deselect = function () {
        this.state.selected = !1, this.dom && (this.setAttribute("aria-selected", this.state.selected), this.updateStyle())
    }, bi.prototype.focus = function () {
        this.dom && (this.dom.focus(), this.emit("focus"))
    }, bi.prototype.getOptionData = function () {
        return this.state.option
    }, bi.prototype.setCopy = function () {
        this._text.text(Rt.translate(this.state.option.text))
    }, bi.prototype._onHover = function (t) {
        this.emit("hover", t), this.usingKb(!1), this.updateStyle(t)
    }, bi.prototype.updateStyle = function (t) {
        if (this.dom) {
            var e = this.state.theme.get().palette,
                i = this.state.style;
            this.css({
                background: this.state.selected ? i.selected.fill : t ? i.hover.fill : i.main.fill,
                color: this.state.option.warn ? e.warn.main : this.state.selected ? i.selected.text : t ? i.hover.text : i.main.text,
                borderColor: this.state.usingKb && t ? i.hover.border : "transparent"
            }), this._separator.css({
                display: this.state.isLast || this.state.selected || t ? "none" : "block"
            })
        }
    }, bi.prototype.text = function () {
        return this._text.text()
    }, bi.prototype.style = function (t) {
        this.state.isLast = t, this.state.style = vi(this.state.theme.get());
        this.css({
            position: "relative",
            cursor: "pointer",
            height: this.state.height - 6,
            fontSize: 14,
            fontWeight: 400,
            borderWidth: 3,
            borderStyle: "solid",
            borderColor: "transparent"
        }), this._separator.css({
            position: "absolute",
            height: 1,
            bottom: -4,
            left: 10,
            right: 10,
            background: this.state.style.main.line
        }), this.updateStyle()
    }, _t.proto(wi, gi), wi.prototype.getSelected = function () {
        return this.state.selected && this.state.selected.getOptionData()
    }, wi.prototype.setCopy = function () {
        for (var t = this._options.length; t--;) this._options[t].setCopy()
    }, wi.prototype.setOptions = function (t) {
        for (var e, i = this._options.length; i--;) this.getContainer().removeElement(this._options[i]);
        for (this._options = [], i = 0; i < t.length; i++) {
            e = this.getContainer().initComponent(bi, {
                theme: this.state.theme,
                isMenu: this.state.isMenu,
                size: t.length,
                height: this.state.optionHeight,
                option: t[i]
            });
            var n = i === t.length - 1;
            e.usingKb(this.state.usingKb), e.style(n), this._options.push(e), e.on("select", this._onOptionSelect.bind(this, e)), e.on("focus", this._onOptionFocus.bind(this, i)), e.on("blur", this._onOptionBlur.bind(this, i)), e.on("hover", this._onOptionHover.bind(this))
        }
        var s = -1 === this.state.optionsVisible ? this._options.length : this.state.optionsVisible;
        this.css({
            height: s * this.state.optionHeight
        })
    }, wi.prototype.select = function (t) {
        for (var e = null, i = this._options.length; i--;) t === this._options[i].getOptionData().value && (e = this._options[i]);
        if (!e) throw new Error("Cannot select a missing option value: " + t);
        e.select()
    }, wi.prototype.deselect = function () {
        this.state.selected && this.state.selected.deselect(), this.state.selected = null
    }, wi.prototype._onOptionSelect = function (t) {
        this.hide(), this.state.selected && this.state.selected !== t && this.state.selected.deselect(), this.state.selected = t, this.emit("select", t.getOptionData())
    }, wi.prototype._onOptionFocus = function (t) {
        this.state.focusedId = t;
        var e = this._options[t],
            i = !this.state.centerOnce && e === this.state.selected;
        i && (this.state.centerOnce = !0), this.scrollInView(e.dom, i, i)
    }, wi.prototype._onOptionHover = function () {
        for (var t = this._options.length; t--;) this._options[t].updateStyle(!1)
    }, wi.prototype._onOptionBlur = function () {
        var t = this;
        this.state.focusedId = -1, setTimeout((function () {
            t.dom && -1 === t.state.focusedId && t.hide()
        }), 0)
    }, wi.prototype.isVisible = function () {
        return this.state.visible
    }, wi.prototype.hide = function () {
        this.state.visible && (this.state.visible = !1, this.setAttribute("aria-expanded", !1), this.css({
            display: "none"
        }), this.emit("hide"))
    }, wi.prototype.open = function () {
        if (!this.state.visible) {
            this.state.centerOnce = !1, this.state.visible = !0, this.setAttribute("aria-expanded", !0), this.css({
                display: "block"
            });
            var t = this.state.selected ? this.state.selected : this._options[0];
            t && t.focus(), this.emit("open")
        }
    }, wi.prototype.usingKb = function (t) {
        this.state.usingKb = t;
        for (var e = this._options.length; e--;) this._options[e].usingKb(t)
    }, wi.prototype.style = function (t) {
        var e = function (t) {
            var e = t.palette,
                i = t.component;
            return We.merge({
                main: {
                    fill: e.common.white,
                    border: "#6E829E"
                }
            }, i.list)
        }(this.state.theme.get());
        this.css({
            width: t || 160,
            display: this.isVisible() ? "block" : "none",
            zIndex: 100,
            background: e.main.fill,
            boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 4px",
            borderWidth: 1,
            borderRadius: 4,
            borderStyle: "solid",
            borderColor: e.main.border,
            position: "absolute",
            overflow: "hidden",
            left: 0
        }), this.getContainer().css({
            lineHeight: this.state.optionHeight - 6,
            whiteSpace: "nowrap",
            textAlign: "center"
        }), this.baseStyle()
    }, wi.prototype.onKeyPress = function (t) {
        var e = this;
        if (27 === t.keyNum) return t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), void e.hide();
        if (-1 === [13, 32].indexOf(t.keyNum)) {
            if (this.usingKb(!0), -1 !== [38, 40].indexOf(t.keyNum)) {
                var i = (e.state.focusedId + (38 === t.keyNum ? -1 : 1)) % e._options.length;
                return -1 === i && (i = e._options.length - 1), t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), void e._options[i].focus()
            }
            this.state.searchTimer && clearTimeout(this.state.searchTimer), this.state.searchTimer = setTimeout((function () {
                e.state.search = ""
            }), 500), this.state.search += String.fromCharCode(t.keyCode);
            var n = this._findByValue(this.state.search);
            n && n.focus()
        }
    }, wi.prototype._findByValue = function (t) {
        t = t.toLowerCase();
        for (var e = null, i = this._options.length; i--;) 0 === this._options[i].text().toLowerCase().indexOf(t) && (e = this._options[i]);
        return e
    }, _t.proto(xi, Et), xi.prototype.setStyle = function (t) {
        t = t || {};
        var e = function (t) {
            var e = t.palette,
                i = t.component,
                n = "light" === e.mode;
            return We.merge({
                main: {
                    fill: e.grey[n ? 100 : 800],
                    border: e.grey[n ? 300 : 200]
                },
                hover: {
                    fill: e.grey[n ? 200 : 900]
                }
            }, i.box)
        }(this._theme.get());
        this.boxState.css.boxSizing = t.boxSizing || this.boxState.css.boxSizing || "content-box", this.boxState.css.width = t.width || this.boxState.css.width || "100%", this.boxState.css.height = t.height || this.boxState.css.height || "100%", this.boxState.css.padding = t.padding || this.boxState.css.padding || 0, this.boxState.css.margin = t.margin || this.boxState.css.margin || 0, this.boxState.css.borderWidth = t.borderWidth || this.boxState.css.borderWidth || 0, this.boxState.css.borderRadius = t.borderRadius || this.boxState.css.borderRadius || 0, this.boxState.css.borderStyle = t.borderStyle || this.boxState.css.borderStyle || "solid", this.boxState.css.borderColor = t.borderColor || this.boxState.css.borderColor || e.main.border, this.boxState.css.backgroundColor = t.backgroundColor || this.boxState.css.backgroundColor || e.main.fill, this.boxState.css.cursor = t.cursor || this.boxState.css.cursor || "default", this.css(this.boxState.css)
    }, xi.prototype.setVisible = function (t) {
        this.boxState.visible = t, this.setAttribute("aria-hidden", !t), this.css({
            display: t ? "block" : "none"
        })
    }, xi.prototype.setAriaLabel = function (t) {
        t ? this.setAttribute("aria-label", t) : this.boxState.ariaLabel && this.setAttribute("aria-label", Rt.translate(this.boxState.ariaLabel))
    };
    var Ci = {
        __proto__: null,
        Graphic: Xe,
        ListNative: ri,
        ListCustom: wi,
        Link: Ke,
        Logo: Qe,
        Span: Je,
        Markdown: Ye,
        IconButton: si,
        TextButton: oi,
        Box: xi,
        Border: ti
    };

    function ki() {
        _t.self(this, si, {
            title: "Close Modal",
            name: "close",
            src: "data:image/svg+xml,%3csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.5669 4.17308C17.1764 3.78256 16.5432 3.78256 16.1527 4.17308L11 9.32578L5.84731 4.17309C5.45678 3.78257 4.82362 3.78257 4.43309 4.17309L4.17308 4.43311C3.78256 4.82363 3.78256 5.4568 4.17308 5.84732L9.32577 11L4.17309 16.1527C3.78257 16.5432 3.78257 17.1764 4.17309 17.5669L4.4331 17.8269C4.82363 18.2174 5.45679 18.2174 5.84732 17.8269L11 12.6742L16.1527 17.8269C16.5432 18.2174 17.1764 18.2174 17.5669 17.8269L17.8269 17.5669C18.2174 17.1764 18.2174 16.5432 17.8269 16.1527L12.6742 11L17.8269 5.84731C18.2174 5.45678 18.2174 4.82362 17.8269 4.43309L17.5669 4.17308Z'/%3e%3c/svg%3e",
            theme: Ge,
            width: 30,
            height: 30
        })
    }

    function _i() {
        _t.self(this, Et, "header"), this.state = {
            visible: !0
        }, this.$title = this.createElement("h2", "#modal-title"), this.$underline = this.createElement(".underline"), this.setAttribute("role", "heading")
    }

    function Ei(t) {
        var e = t.palette,
            i = t.component,
            n = "light" === e.mode;
        return We.merge({
            main: {
                fill: e.common.white,
                border: e.grey[n ? 300 : 200]
            },
            hover: {
                fill: e.grey[n ? 200 : 700]
            },
            focus: {
                border: "#0074BF"
            }
        }, i.modal)
    }

    function Si() {
        _t.self(this, Et, "modal");
        var t = this;
        this.state = {
            visible: !1,
            curr: null,
            prev: null
        }, this._style = Ei(Ge.get()), this.addClass("no-outline"), this.setAttribute("role", "dialog"), this.setAttribute("aria-modal", !0), this.setAttribute("tabindex", "0"), this.header = this.initComponent(_i), this.header.on("close", (function () {
            t.emit("close")
        })), this.$content = this.createElement("#modal-content"), this.$content.addClass("content"), this.setAttribute("aria-describedby", "#modal-content"), this.close = this.initComponent(ki), this.close.on("click", (function () {
            t.emit("close")
        })), this.addEventListener("keydown", (function (e) {
            t.dom && 9 === e.keyNum && (e.shiftKey ? document.activeElement === t.dom && (t.close.focus(), e.preventDefault && e.preventDefault()) : document.activeElement === t.close.dom && (t.focus(), e.preventDefault && e.preventDefault()))
        })), this.addEventListener("focus", (function () {
            t.css({
                border: "1px solid " + t._style.focus.border
            })
        })), this.addEventListener("blur", (function () {
            t.css({
                border: "1px solid " + t._style.main.border
            })
        }))
    }

    function Ai(t) {
        _t.self(this, Et, "link", "a");
        var e = this;
        this.state = {
            link: t.link,
            text: t.text,
            underline: t.underline || !1
        }, this.state.link && (this.setAttribute("href", this.state.link), this.setAttribute("target", "_blank"));
        var i = function () {
            e.state.link || e.emit("click")
        };
        if (this.addEventListener("enter", i), this.addEventListener("click", i), !1 === N.System.mobile) {
            var n = function (t) {
                var i = Ge.get().palette,
                    n = "light" === i.mode;
                e.css("over" === t.action ? {
                    color: i.primary.main,
                    textDecoration: "underline"
                } : {
                    color: n ? i.text.body : i.grey[700],
                    textDecoration: e.state.underline ? "underline" : "none"
                })
            };
            this.addEventListener("over", n), this.addEventListener("out", n)
        }
    }

    function Li(t) {
        _t.self(this, Et, "copy", "p");
        var e = this;
        t || (t = {}), this.state = {
            text: t.text || "",
            linkUnderline: t.linkUnderline || !1,
            link: t.link || !1,
            linkText: t.linkText || "",
            linkTo: t.linkTo || null,
            replaceText: t.replaceText || null
        }, this.state.link && (this.link = new Ai({
            text: this.state.linkText,
            link: this.state.linkTo,
            underline: this.state.linkUnderline
        }), this.state.linkTo && this.link.on("click", (function () {
            e.emit("click")
        })))
    }
    _t.proto(ki, si), ki.size = ki.prototype.size = 30, _t.proto(_i, Et), _i.prototype.style = function (t, e) {
        var i = e ? 40 : 44,
            n = Ge.get().palette,
            s = "light" === n.mode;
        return this.$title.css({
            color: s ? n.text.heading : n.grey[700],
            fontWeight: 600,
            textAlign: "left",
            fontSize: e ? 15 : 16,
            display: this.state.visible ? "table-cell" : "none",
            verticalAlign: "middle",
            paddingTop: 2,
            height: i,
            width: t - ki.size
        }), this.$underline.css({
            backgroundColor: n.primary.main,
            width: t,
            height: 1,
            top: i,
            position: "absolute"
        }), this.css({
            width: t,
            height: i,
            position: "relative",
            top: 0
        }), {
            height: i,
            width: t
        }
    }, _i.prototype.setCopy = function (t) {
        var e = Rt.translate(t);
        this.$title.text(e)
    }, _i.prototype.display = function (t) {
        this.state.visible = t, this.css({
            display: t ? "table-cell" : "none"
        })
    }, _i.prototype.isVisible = function () {
        return this.state.visible
    }, _t.proto(Si, Et), Si.prototype.load = function () {
        this.close.load()
    }, Si.prototype.style = function (t, e) {
        var i = t < 300;
        this._style = Ei(Ge.get()), this.css({
            width: t,
            maxHeight: e,
            position: "relative",
            margin: "0 auto",
            backgroundColor: this._style.main.fill,
            display: this.header ? "block" : "table",
            borderRadius: 4,
            zIndex: 10,
            overflow: "hidden",
            border: "1px solid " + this._style.main.border,
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 2px",
            padding: "0px 15px 15px"
        }), this.header.isVisible() ? (this.header.style(t, i), this.$content.css({
            display: "block",
            height: "auto",
            marginTop: 10
        })) : this.$content.css({
            display: "table-cell",
            verticalAlign: "middle",
            marginTop: 0,
            height: e
        }), this.close.style(), this.close.css({
            position: "absolute",
            right: 20,
            top: i ? 5 : 7
        })
    }, Si.prototype.setTitle = function (t) {
        t ? (this.header.display(!0), this.header.setCopy(t), this.close.setTitle()) : this.header.display(!1)
    }, _t.proto(Ai, Et), Ai.prototype.style = function (t) {
        var e = Ge.get().palette,
            i = "light" === e.mode;
        this.css({
            color: i ? e.text.body : e.grey[700],
            fontWeight: 400,
            fontSize: t,
            cursor: "pointer",
            textDecoration: this.state.underline ? "underline" : "none",
            display: "inline-block",
            lineHeight: t
        })
    }, Ai.prototype.translate = function () {
        var t = Rt.translate(this.state.text);
        this.text(t)
    }, _t.proto(Li, Et), Li.prototype.style = function (t, e) {
        var i = Ge.get().palette,
            n = "light" === i.mode;
        e || (e = "center"), this.css({
            width: "100%",
            fontSize: t,
            textAlign: e,
            fontWeight: 400,
            color: n ? i.text.body : i.grey[700],
            lineHeight: t + 6,
            display: "inline"
        }), this.state.link && (this.link.style(t), this.link.css({
            display: "inline"
        }))
    }, Li.prototype.translate = function () {
        var t = Rt.translate(this.state.text);
        if (this.state.link)
            if (this.link.translate(), this.state.replaceText) {
                var e = t.split("{{" + this.state.replaceText + "}}"),
                    i = document.createTextNode(e[0]);
                if (this.appendElement(i), this.appendElement(this.link), "" !== e[1]) {
                    var n = document.createTextNode(e[1]);
                    this.appendElement(n)
                }
            } else {
                var s = document.createTextNode(t + " ");
                this.appendElement(s), this.appendElement(this.link)
            }
        else this.content(t)
    };

    function Hi() {
        _t.self(this, Et, "instructions"), this.copy = this.initComponent(Li, {
            text: "hCaptcha is a service that reduces bots and spam by asking simple questions. Please follow the instructions at the top of the screen for each challenge. For more information visit {{site-url}}",
            link: !0,
            linkText: "hcaptcha.com",
            linkTo: "https://www.hcaptcha.com/what-is-hcaptcha-about?ref=" + Z.host + "&utm_campaign=" + Z.sitekey + "&utm_medium=embed_about",
            replaceText: "site-url"
        })
    }

    function Bi() {
        _t.self(this, Et, "feedback");
        var t = this;
        this.$info = this.createElement("span"), this.$link = this.createElement("a", ".feedback-link"), this.$link.setAttribute("tabindex", "0");
        var e = function () {
            t.emit("click")
        };
        this.$link.addEventListener("enter", e), this.$link.addEventListener("click", e)
    }

    function Mi() {
        _t.self(this, Et, "information");
        var t = this;
        this.instructions = this.initComponent(Hi, null, this.$content), this.feedback = this.initComponent(Bi, null, this.$content), this.feedback.on("click", (function () {
            t.emit("change", "feedback")
        }))
    }

    function Vi(t) {
        _t.self(this, Et, "checkmark");
        var e = this;
        this.state = {
            locked: !1,
            selected: !1,
            text: t.text,
            value: t.value
        }, this.$wrapper = this.createElement(".wrapper"), this.$input = this.$wrapper.createElement(".checkbox"), this.$input.bg = this.$input.createElement(".checkbox-bg"), this.$input.check = this.$input.createElement(".checkbox-mark"), this.$input.check.css({
            opacity: 0
        }), this.$text = this.$wrapper.createElement(".checkbox-text"), this.$text.dom.id = "checkmark-" + this.state.value, this.$input.setAttribute("tabindex", "0"), this.$input.setAttribute("role", "radio"), this.$input.setAttribute("aria-pressed", !1), this.$input.setAttribute("aria-labelledby", this.$text.dom.id);
        var i = function () {
            e.emit("select", e)
        };
        this.$input.addEventListener("up", i), this.$input.addEventListener("enter", i)
    }

    function Oi(t) {
        _t.self(this, Et, "options"), this.state = {
            visible: !0
        }, this.handeSelect = this.handeSelect.bind(this), this.$wrapper = this.createElement(".column-wrapper"), this.$left = this.$wrapper.createElement(".column-left"), this.$right = this.$wrapper.createElement(".column-right"), this.options = [];
        for (var e = null, i = null, n = 0; n < t.length; n++) i = n >= t.length / 2 ? this.$right : this.$left, (e = this.initComponent(Vi, t[n], i)).setCopy(), e.on("select", this.handeSelect), this.options.push(e)
    }

    function Ti(t) {
        var e = t.palette,
            i = t.component,
            n = "light" === e.mode;
        return We.merge({
            main: {
                fill: e.grey[100],
                border: e.grey[n ? 600 : 200]
            },
            focus: {
                fill: e.grey[200],
                border: e.grey[n ? 800 : 100]
            },
            disabled: {
                fill: e.grey[300]
            }
        }, i.input)
    }

    function Fi(t) {
        _t.self(this, Et, "comment");
        var e = this;
        this.state = {
            visible: !1,
            placeholder: t
        }, this._style = Ti(Ge.get()), this.$textarea = this.createElement("textarea", ".comment-textarea"), this.setPlaceholder.call(this), this.$textarea.addEventListener("input", (function (t) {
            e.emit("change", t.target.value)
        }))
    }

    function Ri(t) {
        var e = t.palette,
            i = t.component;
        return We.merge({
            main: {
                fill: e.common.white,
                icon: e.grey[700],
                text: e.text.main
            },
            hover: {
                fill: e.grey[200],
                icon: e.primary.main,
                text: e.text.main
            },
            focus: {
                icon: e.primary.main
            },
            active: {
                icon: e.grey[700]
            }
        }, i.button)
    }

    function Di(t) {
        _t.self(this, Et, "button-" + t.value), this.state = {
            visible: !0,
            locked: !1,
            value: t.value,
            text: t.text,
            lockText: null,
            desc: t.desc,
            type: t.type || "default"
        }, this.$copy = this.createElement(".send-text"), this._style = Ri(Ge.get()), this.onHover = this.onHover.bind(this), this.onSelect = this.onSelect.bind(this), this.setAttribute("tabindex", 0), this.setAttribute("role", "button"), this.addEventListener("click", this.onSelect), this.addEventListener("enter", this.onSelect), !1 === N.System.mobile && (this.addEventListener("over", this.onHover), this.addEventListener("out", this.onHover))
    }
    _t.proto(Hi, Et), Hi.prototype.style = function (t) {
        this.copy.style(t, "left")
    }, Hi.prototype.setCopy = function () {
        this.copy.translate()
    }, _t.proto(Bi, Et), Bi.prototype.style = function (t) {
        var e = Math.floor(at(t, 250, 300, 11, 13)),
            i = Ge.get().palette,
            n = "light" === i.mode;
        this.css({
            textAlign: "center",
            color: n ? i.text.body : i.grey[700],
            fontSize: e,
            fontWeight: 500,
            width: t,
            margin: "0 auto"
        }), this.$link.css({
            color: n ? i.text.body : i.grey[700],
            fontWeight: 500,
            marginLeft: 3,
            cursor: "pointer",
            textDecoration: "underline",
            display: "inline-block"
        })
    }, Bi.prototype.setCopy = function () {
        var t = Rt.translate("Having a problem?"),
            e = Rt.translate("Give feedback."),
            i = Rt.translate("Provide feedback regarding the hCaptcha service.");
        this.$info.text(t), this.$link.text(e), this.$link.setAttribute("aria-label", i)
    }, _t.proto(Mi, Et), Mi.prototype.style = function (t, e, i) {
        var n = Math.floor(at(t, 250, 275, 12, 14));
        this.instructions.style(n), this.instructions.css({
            marginBottom: 10
        }), this.feedback.style(t)
    }, Mi.prototype.setCopy = function () {
        this.instructions.setCopy(), this.feedback.setCopy()
    }, _t.proto(Vi, Et), Vi.prototype.style = function (t) {
        var e = at(t, 125, 150, 13, 14),
            i = 15,
            n = t - 27,
            s = function (t) {
                var e = t.palette,
                    i = t.component;
                return We.merge({
                    main: {
                        fill: e.grey[200],
                        border: e.grey[600]
                    },
                    selected: {
                        check: e.primary.main
                    }
                }, i.radio)
            }(Ge.get()),
            o = Ge.get().palette,
            r = "light" === o.mode;
        this.css({
            height: "auto",
            marginTop: 5,
            marginBottom: 5,
            position: "relative"
        }), this.$wrapper.css({
            cursor: "pointer",
            height: "auto",
            width: "auto",
            position: "relative",
            display: "inline-block"
        }), this.$input.css({
            position: "relative",
            display: "inline-block",
            width: i,
            height: i,
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid " + s.main.border,
            float: "left"
        }), this.$input.check.css({
            position: "absolute",
            top: 2,
            left: 2,
            zIndex: 10,
            width: 11,
            height: 11,
            borderRadius: 1,
            backgroundColor: s.selected.check
        }), this.$input.bg.css({
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
            width: i,
            height: i,
            backgroundColor: s.main.fill
        }), this.$text.css({
            position: "relative",
            display: "inline-block",
            width: n,
            fontSize: e,
            fontWeight: 400,
            color: r ? o.text.body : o.grey[700],
            float: "right",
            marginLeft: 10,
            marginTop: 1,
            wordBreak: "break-word"
        })
    }, Vi.prototype.toggle = function (t) {
        this.state.locked || (this.state.selected = t, this.$input.check.css({
            opacity: t ? 1 : 0
        }), this.$input.setAttribute("aria-pressed", t))
    }, Vi.prototype.lock = function (t) {
        this.state.locked = t
    }, Vi.prototype.setCopy = function () {
        var t = Rt.translate(this.state.text);
        this.$text.text(t)
    }, _t.proto(Oi, Et), Oi.prototype.style = function (t, e) {
        var i = Math.floor(t / 2);
        this.$left.css({
            width: "50%",
            display: "inline-block",
            float: "left"
        }), this.$right.css({
            width: "50%",
            display: "inline-block",
            float: "right"
        });
        for (var n = 0; n < this.options.length; n++) this.options[n].style(i)
    }, Oi.prototype.handeSelect = function (t) {
        if (this.state.visible) {
            for (var e = !1, i = 0; i < this.options.length; i++)(e = this.options[i] === t) && e === t.state.selected && (e = !e), this.options[i].toggle(e);
            this.emit("update", t)
        }
    }, Oi.prototype.visible = function (t) {
        this.state.visible = t, this.css({
            display: t ? "inline-block" : "none"
        });
        for (var e = 0; e < this.options.length; e++) this.options[e].lock(!t)
    }, Oi.prototype.setCopy = function () {
        for (var t = 0; t < this.options.length; t++) this.options[t].setCopy()
    }, _t.proto(Fi, Et), Fi.prototype.style = function (t, e) {
        this._style = Ti(Ge.get());
        var i = Ge.get().palette,
            n = "light" === i.mode;
        this.$textarea.css({
            width: t - 30,
            height: 50,
            borderRadius: 4,
            backgroundColor: this._style.main.fill,
            color: n ? i.text.body : i.grey[700],
            border: "1px solid " + this._style.main.border,
            fontSize: e ? 12 : 14,
            lineHeight: e ? 16 : 18,
            fontWeight: 500,
            boxSizing: "border-box",
            MozBoxSizing: "border-box",
            padding: "8px 12px",
            position: "absolute",
            left: "50%",
            marginLeft: -(t - 30) / 2
        }), this.css({
            height: 50,
            width: t,
            position: "relative"
        }), this.visible(this.state.visible)
    }, Fi.prototype.visible = function (t) {
        this.state.visible = t, this.css({
            display: t ? "block" : "none"
        })
    }, Fi.prototype.disable = function (t) {
        this.state.visible && (this.$textarea.dom.disabled = !t, this.$textarea.css({
            backgroundColor: t ? this._style.main.fill : this._style.disabled.fill
        }))
    }, Fi.prototype.getValue = function () {
        return this.$textarea.dom.value
    }, Fi.prototype.setValue = function (t) {
        this.$textarea.dom.value = t
    }, Fi.prototype.setPlaceholder = function () {
        this.$textarea.setAttribute("placeholder", Rt.translate(this.state.placeholder))
    }, _t.proto(Di, Et), Di.prototype.style = function () {
        var t = Ge.get().palette,
            e = "light" === t.mode;
        this._style = Ri(Ge.get()), this.css({
            width: "auto",
            height: 15,
            cursor: this.state.locked ? "default" : "pointer",
            display: "block",
            margin: "0 auto",
            textAlign: "center",
            borderRadius: 4,
            padding: "10px 15px"
        });
        var i = "warn" === this.state.type ? t.warn.main : t.primary.main;
        this.$copy.css({
            color: this.state.locked ? e ? t.text.body : t.grey[700] : i,
            fontSize: 15,
            fontWeight: 500,
            display: "inline-block"
        })
    }, Di.prototype.onHover = function (t) {
        if (!this.state.locked && this.state.visible) {
            var e = Ge.get().palette,
                i = "warn" === this.state.type ? e.warn.main : e.primary.main;
            this.css({
                backgroundColor: "over" === t.action ? this._style.hover.fill : this._style.main.fill
            }), this.$copy.css({
                color: i
            })
        }
    }, Di.prototype.onSelect = function (t) {
        !this.state.locked && this.state.visible && this.emit("click", t)
    }, Di.prototype.visible = function (t) {
        this.state.visible = t, this.css({
            display: t ? "block" : "none"
        })
    }, Di.prototype.lock = function (t, e) {
        var i = Ge.get().palette,
            n = "warn" === this.state.type ? i.warn.main : i.primary.main,
            s = "light" === i.mode;
        this.state.locked = t, this.state.lockText = e, this.setAttribute("aria-label", e || this.state.desc), this.$copy.css({
            color: t ? s ? i.text.body : i.grey[700] : n
        }), t ? this.setAttribute("aria-disabled", t) : this.removeAttribute("aria-disabled")
    }, Di.prototype.setCopy = function () {
        var t = Rt.translate(this.state.text),
            e = Rt.translate(this.state.locked && this.state.lockText ? this.state.lockText : this.state.desc);
        this.$copy.text(t), this.setAttribute("aria-label", e)
    };
    var $i = [{
        text: "Too Difficult",
        value: "difficulty"
    }, {
        text: "Inappropriate",
        value: "content"
    }, {
        text: "Software Bug",
        value: "software"
    }, {
        text: "Other",
        value: "other"
    }];

    function Pi() {
        _t.self(this, Et, "feedback");
        var t = this;
        this.selected = null, this.options = this.initComponent(Oi, $i), this.comment = this.initComponent(Fi, "Please describe your issue."), this.$buttons = this.createElement(".buttons"), this.cancel = this.initComponent(Di, {
            text: "Cancel",
            value: "cancel",
            desc: "Cancel Response",
            type: "warn"
        }, this.$buttons), this.send = this.initComponent(Di, {
            text: "Send",
            value: "send",
            desc: "Send Response"
        }, this.$buttons), this.send.lock(!0, "Please select an option to send response."), this.send.on("click", this.sendMessage.bind(this)), this.options.on("update", this.displayComment.bind(this)), this.comment.visible(!1), this.cancel.on("click", (function () {
            t.emit("close")
        })), this.setAttribute("role", "radiogroup")
    }
    _t.proto(Pi, Et), Pi.prototype.style = function (t, e, i) {
        this.$buttons.css({
            width: i ? 200 : 220,
            height: 35,
            position: "relative",
            margin: "10px auto 0px",
            clear: "both"
        }), this.options.style(t, i), this.options.css({
            float: "left",
            marginBottom: 10
        }), this.comment.style(t, i), this.comment.css({
            marginTop: 10,
            clear: "both"
        }), this.send.style(), this.cancel.style(t, i), this.cancel.css({
            position: "absolute",
            left: 0
        }), this.send.css({
            position: "absolute",
            right: 0
        })
    }, Pi.prototype.sendMessage = function () {
        var t = "",
            e = "",
            i = this.comment.getValue();
        this.selected && (t = this.selected.state.text, e = this.selected.state.value), this.comment.setValue(""), this.comment.visible(!1), this.options.visible(!1), this.send.visible(!1);
        var n = "software" === e || "other" === e ? "feedback" : "content" === e ? "report" : "accessibility";
        this.emit("report", {
            reason: t,
            comment: i
        }), this.emit("change", "thanks", {
            response: n
        })
    }, Pi.prototype.displayComment = function (t) {
        var e = t.state.selected,
            i = t.state.value,
            n = ("software" === i || "other" === i) && e;
        this.selected = e ? t : null, this.comment.visible(n), this.comment.disable(n), this.send.lock(null === this.selected)
    }, Pi.prototype.setCopy = function () {
        this.options.setCopy(), this.comment.setPlaceholder(), this.cancel.setCopy(), this.send.setCopy()
    };
    var Ii = [{
        text: "Can't Solve",
        value: "captcha_solve"
    }, {
        text: "Can't Click",
        value: "captcha_usability"
    }, {
        text: "Off Screen",
        value: "captcha_position"
    }, {
        text: "Other",
        value: "other"
    }];

    function ji() {
        _t.self(this, Et, "software-bug");
        var t = this;
        this.selected = null, this.options = this.initComponent(Oi, Ii), this.comment = this.initComponent(Fi, "Please provide details and steps to reproduce.", this), this.$buttons = this.createElement(".buttons"), this.cancel = this.initComponent(Di, {
            text: "Cancel",
            value: "cancel",
            desc: "Cancel Response",
            type: "warn"
        }, this.$buttons), this.send = this.initComponent(Di, {
            text: "Send",
            value: "send",
            desc: "Send Response"
        }, this.$buttons), this.send.lock(!0, "Please select an option to send response."), this.send.on("click", this.sendMessage.bind(this)), this.options.on("update", this.storeAnswer.bind(this)), this.cancel.on("click", (function () {
            t.emit("close")
        })), this.setAttribute("role", "radiogroup")
    }
    _t.proto(ji, Et), ji.prototype.style = function (t, e, i) {
        this.$buttons.css({
            width: i ? 200 : 220,
            height: 35,
            position: "relative",
            margin: "10px auto 0px",
            clear: "both"
        }), this.options.style(t, i), this.options.css({
            float: "left",
            marginBottom: 10
        }), this.comment.style(t, i), this.comment.css({
            marginTop: 10,
            clear: "both"
        }), this.send.style(), this.cancel.style(t, i), this.cancel.css({
            position: "absolute",
            left: 0
        }), this.send.css({
            position: "absolute",
            right: 0
        })
    }, ji.prototype.sendMessage = function () {
        var t = "",
            e = this.comment.getValue();
        this.selected && (t = this.selected.state.text), this.comment.setValue(""), this.comment.visible(!1), this.options.visible(!1), this.send.visible(!1), this.emit("report", {
            reason: t,
            comment: e
        }), this.emit("change", "thanks", {
            response: "feedback"
        })
    }, ji.prototype.storeAnswer = function (t) {
        var e = t.state.selected,
            i = "other" === t.state.value && e;
        this.comment.visible(i), this.selected = e ? t : null, this.send.lock(null === this.selected)
    }, ji.prototype.setCopy = function (t) {
        this.options.setCopy(), this.comment.setPlaceholder(), this.cancel.setCopy(), this.send.setCopy()
    };
    var Ni = [{
        text: "Inappropriate",
        value: "inappropriate"
    }, {
        text: "Violent",
        value: "violent"
    }, {
        text: "Too Difficult",
        value: "difficulty"
    }, {
        text: "Other",
        value: "other"
    }];

    function Zi(t) {
        _t.self(this, Et, "report");
        var e = this;
        this.selected = null, this.task_key = t.key || "", this.options = this.initComponent(Oi, Ni), this.comment = this.initComponent(Fi, "Please describe your issue."), this.$buttons = this.createElement(".buttons"), this.cancel = this.initComponent(Di, {
            text: "Cancel",
            value: "cancel",
            desc: "Cancel Response",
            type: "warn"
        }, this.$buttons), this.send = this.initComponent(Di, {
            text: "Send",
            value: "send",
            desc: "Send Response"
        }, this.$buttons), this.send.lock(!0, "Please select an option to send response."), this.send.on("click", this.sendMessage.bind(this)), this.options.on("update", this.storeAnswer.bind(this)), this.cancel.on("click", (function () {
            e.emit("close")
        })), this.setAttribute("role", "radiogroup")
    }

    function zi() {
        _t.self(this, Et, "thanks-feedback");
        var t = this;
        this.$copy = this.createElement(".feedback-thanks"), this.$resolve = this.createElement(".feedback-resolve"), this.$option = this.createElement(".accessibility-option"), this.$option.content = this.$option.createElement("span", ".text"), this.$option.link = this.$option.createElement("a", ".option-link"), this.$bug = this.createElement(".feedback-bug"), this.$bug.link = this.createElement("a", ".bug-link"), this.$option.link.setAttribute("tabindex", 0), this.$bug.link.setAttribute("tabindex", 0);
        var e = function () {
            window.open("https://www.hcaptcha.com/reporting-bugs")
        };
        this.$bug.link.addEventListener("enter", e), this.$bug.link.addEventListener("down", e);
        var i = function () {
            window.open("https://hcaptcha.com/accessibility")
        };
        if (this.$option.link.addEventListener("down", i), this.$option.link.addEventListener("enter", i), !1 === N.System.mobile) {
            var n = function (e) {
                var i = Ge.get().palette,
                    n = "light" === i.mode;
                t.$bug.link.css("over" === e.action ? {
                    color: i.primary.main,
                    textDecoration: "underline"
                } : {
                    color: n ? i.text.body : i.grey[700],
                    textDecoration: "none"
                })
            };
            this.$bug.link.addEventListener("over", n), this.$bug.link.addEventListener("out", n);
            var s = function (e) {
                var i = Ge.get().palette,
                    n = "light" === i.mode;
                t.$option.link.css("over" === e.action ? {
                    color: i.primary.main,
                    textDecoration: "underline"
                } : {
                    color: n ? i.text.body : i.grey[700],
                    textDecoration: "none"
                })
            };
            this.$option.link.addEventListener("over", s), this.$option.link.addEventListener("out", s)
        }
    }

    function Ui() {
        _t.self(this, Et, "thanks-accessibility");
        var t = this;
        this.$sorry = this.createElement(".accessibility-text"), this.$option = this.createElement(".accessibility-option"), this.$avoid = this.createElement(".accessibility-avoid");
        var e = function (t) {
            window.open("https://hcaptcha.com/accessibility")
        };
        if (this.$option.addEventListener("enter", e), this.$option.addEventListener("down", e), !1 === N.System.mobile) {
            var i = function (e) {
                var i = Ge.get().palette,
                    n = "light" === i.mode;
                t.$option.css("over" === e.action ? {
                    color: i.primary.main,
                    textDecoration: "underline"
                } : {
                    color: n ? i.text.body : i.grey[700],
                    textDecoration: "none"
                })
            };
            this.$option.addEventListener("over", i), this.$option.addEventListener("out", i)
        }
    }

    function Wi() {
        _t.self(this, Et, "thanks-feedback"), this.$copy = this.createElement(".feedback-thanks"), this.$resolve = this.createElement(".feedback-resolve")
    }

    function qi(t) {
        _t.self(this, Et, "thanks"), "feedback" === t.response ? this.copy = this.initComponent(zi, null, this.$content) : "accessibility" === t.response ? this.copy = this.initComponent(Ui, null, this.$content) : "report" === t.response && (this.copy = this.initComponent(Wi, null, this.$content))
    }
    _t.proto(Zi, Et), Zi.prototype.style = function (t, e, i) {
        this.$buttons.css({
            width: i ? 200 : 220,
            height: 35,
            position: "relative",
            margin: "10px auto 0px",
            clear: "both"
        }), this.options.style(t, i), this.options.css({
            float: "left",
            marginBottom: 10
        }), this.comment.style(t, i), this.comment.css({
            marginTop: 10,
            clear: "both"
        }), this.send.style(), this.cancel.style(t, i), this.cancel.css({
            position: "absolute",
            left: 0
        }), this.send.css({
            position: "absolute",
            right: 0
        })
    }, Zi.prototype.sendMessage = function () {
        var t = this.task_key,
            e = "",
            i = this.comment.getValue();
        this.selected && (e = this.selected.state.text), this.comment.setValue(""), this.comment.visible(!1), this.options.visible(!1), this.send.visible(!1), this.emit("report", {
            reason: e,
            comment: i,
            key: t
        }), this.emit("change", "thanks", {
            response: "report"
        })
    }, Zi.prototype.storeAnswer = function (t) {
        var e = t.state.selected,
            i = "other" === t.state.value && e;
        this.comment.visible(i), this.selected = e ? t : null, this.send.lock(null === this.selected)
    }, Zi.prototype.setCopy = function () {
        this.options.setCopy(), this.comment.setPlaceholder(), this.cancel.setCopy(), this.send.setCopy()
    }, _t.proto(zi, Et), zi.prototype.style = function (t, e) {
        var i = at(t, 280, 310, 260, 310),
            n = at(t, 280, 300, 12, 13),
            s = n + 4,
            o = Ge.get().palette,
            r = "light" === o.mode;
        this.css({
            fontWeight: 500,
            textAlign: "center",
            fontSize: n + 1,
            lineHeight: n + 4,
            color: r ? o.text.body : o.grey[700],
            width: t
        }), this.$copy.css({
            width: i,
            margin: "0 auto",
            fontWeight: 600,
            marginBottom: 2
        }), this.$resolve.css({
            fontSize: n,
            lineHeight: s,
            width: i,
            margin: "0 auto",
            marginBottom: 10
        }), this.$option.css({
            fontSize: n,
            lineHeight: s,
            marginBottom: 10
        }), this.$option.link.css({
            fontSize: n,
            lineHeight: s,
            color: r ? o.text.body : o.grey[700],
            cursor: "pointer"
        }), this.$bug.css({
            fontSize: n - 1,
            lineHeight: s - 1,
            width: i,
            margin: "0 auto",
            marginBottom: -2
        }), this.$bug.link.css({
            fontSize: n - 1,
            lineHeight: s - 1,
            width: i,
            margin: "0 auto",
            color: r ? o.text.body : o.grey[700],
            cursor: "pointer"
        })
    }, zi.prototype.setCopy = function () {
        var t = Rt.translate("Thank you for your feedback."),
            e = Rt.translate("We'll resolve your issue as quickly as we can."),
            i = Rt.translate("Reporting a functionality issue?"),
            n = Rt.translate("See how to report issues with detailed logs."),
            s = Rt.translate("Please also try turning off your ad blocker.‍"),
            o = Rt.translate("Our accessibility option may help.");
        this.$copy.text(t), this.$resolve.text(e), this.$bug.text(i + " "), this.$bug.link.text(n), this.$option.content.text(s + " "), this.$option.link.text(o);
        var r = Rt.translate("View our accessibility option."),
            a = Rt.translate("Give a detailed report of a bug you've encountered.");
        this.$option.link.setAttribute("aria-label", r), this.$bug.link.setAttribute("aria-label", a)
    }, _t.proto(Ui, Et), Ui.prototype.style = function (t, e) {
        var i = at(t, 280, 310, 260, 310),
            n = at(t, 280, 300, 12, 13),
            s = n + 4,
            o = Ge.get().palette,
            r = "light" === o.mode;
        this.css({
            fontWeight: 500,
            fontSize: n + 1,
            lineHeight: s,
            textAlign: "center",
            color: r ? o.text.body : o.grey[700],
            width: t
        }), this.$sorry.css({
            fontWeight: 600,
            width: i,
            margin: "0 auto",
            marginBottom: 2
        }), this.$option.css({
            fontSize: n,
            lineHeight: s,
            color: r ? o.text.body : o.grey[700],
            cursor: "pointer",
            marginBottom: 10
        }), this.$avoid.css({
            width: i,
            textAlign: "center",
            fontSize: n,
            lineHeight: s,
            margin: "0 auto"
        })
    }, Ui.prototype.setCopy = function () {
        var t = Rt.translate("Sorry to hear that!"),
            e = Rt.translate("Our accessibility option may help."),
            i = Rt.translate("This lets you avoid future questions by registering and setting a cookie."),
            n = Rt.translate("Please also try turning off your ad blocker.‍");
        this.$sorry.text(t + " "), this.$option.text(e), this.$avoid.text(i + " " + n)
    }, _t.proto(Wi, Et), Wi.prototype.style = function (t, e) {
        var i = at(t, 280, 310, 260, 310),
            n = at(t, 280, 300, 12, 13),
            s = n + 4;
        this.css({
            fontWeight: 500,
            textAlign: "center",
            fontSize: n + 1,
            lineHeight: n + 4,
            color: "#707070",
            width: t
        }), this.$copy.css({
            width: i,
            margin: "0 auto",
            fontWeight: 600,
            marginBottom: 2
        }), this.$resolve.css({
            fontSize: n,
            lineHeight: s,
            width: i,
            margin: "0 auto",
            marginBottom: 10
        })
    }, Wi.prototype.setCopy = function () {
        var t = {
            thanks: Rt.translate("Thank you for your feedback."),
            resolve: Rt.translate("We will look into the issue immediately.")
        };
        this.$copy.text(t.thanks), this.$resolve.text(t.resolve)
    }, _t.proto(qi, Si), qi.prototype.style = function (t, e, i) {
        this.copy.style(t, i)
    }, qi.prototype.setCopy = function () {
        this.copy.setCopy()
    }, qi.prototype.setFocus = function () {
        this.copy.focus()
    };
    var Gi = "https://newassets.hcaptcha.com/captcha/v1/1f7dc62/static/images";

    function Ki() {
        _t.self(this, Et, "cookie-icon"), this.$none = this.initComponent(Xe, {
            selector: ".icon-none",
            src: "data:image/svg+xml,%3csvg width='155' height='155' viewBox='0 0 155 155' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cmask id='mask0' mask-type='alpha' maskUnits='userSpaceOnUse' x='3' y='4' width='150' height='149'%3e%3cpath d='M153 78C153 119.421 119.421 153 78 153C36.5786 153 3 119.421 3 78C3 42.6044 27.5196 12.9356 60.5 5.0526C66.1145 3.71061 68 4 69.5 5.0526C71.6884 6.5883 62.5 20 69.5 31.5C76.5 43 89.5 39.5 101.5 53C107.488 59.7371 105.376 73.2409 117.5 79C137.5 88.5 151 71 153 78Z' fill='%23555555'/%3e%3c/mask%3e%3cg mask='url(%23mask0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M78 153C119.421 153 153 119.421 153 78C153 36.5786 119.421 3 78 3C36.5786 3 3 36.5786 3 78C3 119.421 36.5786 153 78 153ZM57 41.5C57 45.6421 53.6421 49 49.5 49C45.3579 49 42 45.6421 42 41.5C42 37.3579 45.3579 34 49.5 34C53.6421 34 57 37.3579 57 41.5ZM83 74C83 79.5228 78.5228 84 73 84C67.4772 84 63 79.5228 63 74C63 68.4772 67.4772 64 73 64C78.5228 64 83 68.4772 83 74ZM54 117C54 122.523 49.5229 127 44 127C38.4772 127 34 122.523 34 117C34 111.477 38.4772 107 44 107C49.5229 107 54 111.477 54 117ZM119.5 122C123.642 122 127 118.642 127 114.5C127 110.358 123.642 107 119.5 107C115.358 107 112 110.358 112 114.5C112 118.642 115.358 122 119.5 122ZM32 83C34.7614 83 37 80.7614 37 78C37 75.2386 34.7614 73 32 73C29.2386 73 27 75.2386 27 78C27 80.7614 29.2386 83 32 83ZM88 111C88 113.761 85.7614 116 83 116C80.2386 116 78 113.761 78 111C78 108.239 80.2386 106 83 106C85.7614 106 88 108.239 88 111Z' fill='%23555555'/%3e%3c/g%3e%3c/svg%3e",
            fallback: Gi + "/cookie-none.png",
            width: 18
        }), this.$blocked = this.initComponent(Xe, {
            selector: ".icon-blocked",
            src: "data:image/svg+xml,%3csvg width='155' height='155' viewBox='0 0 155 155' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cmask id='mask0' mask-type='alpha' maskUnits='userSpaceOnUse' x='3' y='4' width='150' height='149'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M78 153C119.421 153 153 119.421 153 78C152.203 75.2117 149.582 76.3107 145.452 78.0421C139.214 80.6575 129.534 84.7159 117.5 79C115.427 78.0152 113.77 76.804 112.418 75.4389L43.3324 144.524C53.7009 149.939 65.4929 153 78 153ZM26.783 132.789L103.528 56.0443C102.962 54.931 102.304 53.9045 101.5 53C95.5 46.25 89.25 43.75 83.625 41.5C78 39.25 73 37.25 69.5 31.5C64.8464 23.8548 67.3474 15.3646 68.904 10.0807C69.6888 7.41648 70.2336 5.56736 69.5 5.05259C68 3.99999 66.1145 3.7106 60.5 5.05259C27.5196 12.9356 3 42.6044 3 78C3 99.6193 12.1474 119.102 26.783 132.789Z' fill='%23EB4040'/%3e%3c/mask%3e%3cg mask='url(%23mask0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M78 153C119.421 153 153 119.421 153 78C153 36.5786 119.421 3 78 3C36.5786 3 3 36.5786 3 78C3 119.421 36.5786 153 78 153ZM57 41.5C57 45.6421 53.6421 49 49.5 49C45.3579 49 42 45.6421 42 41.5C42 37.3579 45.3579 34 49.5 34C53.6421 34 57 37.3579 57 41.5ZM83 74C83 79.5228 78.5228 84 73 84C67.4772 84 63 79.5228 63 74C63 68.4772 67.4772 64 73 64C78.5228 64 83 68.4772 83 74ZM54 117C54 122.523 49.5229 127 44 127C38.4772 127 34 122.523 34 117C34 111.477 38.4772 107 44 107C49.5229 107 54 111.477 54 117ZM119.5 122C123.642 122 127 118.642 127 114.5C127 110.358 123.642 107 119.5 107C115.358 107 112 110.358 112 114.5C112 118.642 115.358 122 119.5 122ZM32 83C34.7614 83 37 80.7614 37 78C37 75.2386 34.7614 73 32 73C29.2386 73 27 75.2386 27 78C27 80.7614 29.2386 83 32 83ZM88 111C88 113.761 85.7614 116 83 116C80.2386 116 78 113.761 78 111C78 108.239 80.2386 106 83 106C85.7614 106 88 108.239 88 111Z' fill='%23E25C5C'/%3e%3c/g%3e%3crect x='140.572' y='19' width='13' height='179' transform='rotate(45 140.572 19)' fill='%23555555'/%3e%3c/svg%3e",
            fallback: Gi + "/cookie-blocked.png",
            width: 18
        }), this.$found = this.initComponent(Xe, {
            selector: ".icon-found",
            src: "data:image/svg+xml,%3csvg width='155' height='155' viewBox='0 0 155 155' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cmask id='mask0' mask-type='alpha' maskUnits='userSpaceOnUse' x='3' y='4' width='150' height='149'%3e%3cpath d='M153 78C153 119.421 119.421 153 78 153C36.5786 153 3 119.421 3 78C3 42.6044 27.5196 12.9356 60.5 5.05259C66.1145 3.7106 68 3.99999 69.5 5.05259C71.6884 6.58829 62.5 20 69.5 31.5C76.5 43 89.5 39.5 101.5 53C107.488 59.737 105.376 73.2409 117.5 79C137.5 88.5 151 71 153 78Z' fill='%23555555'/%3e%3c/mask%3e%3cg mask='url(%23mask0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M78 153C119.421 153 153 119.421 153 78C153 36.5786 119.421 3 78 3C36.5786 3 3 36.5786 3 78C3 119.421 36.5786 153 78 153ZM57 41.5C57 45.6421 53.6421 49 49.5 49C45.3579 49 42 45.6421 42 41.5C42 37.3579 45.3579 34 49.5 34C53.6421 34 57 37.3579 57 41.5ZM83 74C83 79.5228 78.5228 84 73 84C67.4772 84 63 79.5228 63 74C63 68.4772 67.4772 64 73 64C78.5228 64 83 68.4772 83 74ZM54 117C54 122.523 49.5229 127 44 127C38.4772 127 34 122.523 34 117C34 111.477 38.4772 107 44 107C49.5229 107 54 111.477 54 117ZM119.5 122C123.642 122 127 118.642 127 114.5C127 110.358 123.642 107 119.5 107C115.358 107 112 110.358 112 114.5C112 118.642 115.358 122 119.5 122ZM32 83C34.7614 83 37 80.7614 37 78C37 75.2386 34.7614 73 32 73C29.2386 73 27 75.2386 27 78C27 80.7614 29.2386 83 32 83ZM88 111C88 113.761 85.7614 116 83 116C80.2386 116 78 113.761 78 111C78 108.239 80.2386 106 83 106C85.7614 106 88 108.239 88 111Z' fill='%2300838f'/%3e%3c/g%3e%3c/svg%3e",
            fallback: Gi + "/cookie-found.png",
            width: 18
        }), "ie" === N.Browser.type && 8 === N.Browser.version ? (this.$none.css({
            display: "none"
        }), this.$blocked.css({
            display: "none"
        }), this.$found.css({
            display: "none"
        })) : (this.$none.css({
            opacity: 0
        }), this.$blocked.css({
            opacity: 0
        }), this.$found.css({
            opacity: 0
        }))
    }
    _t.proto(Ki, Et), Ki.prototype.style = function () {
        this.css({
            width: 18,
            height: 18,
            display: "inline",
            position: "relative",
            background: "rgba(0,0,0,0)"
        });
        var t = {
            "-ms-high-contrast-adjust": "none",
            position: "absolute",
            left: 0,
            top: 0
        };
        this.$none.css(t), this.$blocked.css(t), this.$found.css(t)
    }, Ki.prototype.display = function (t) {
        "ie" === N.Browser.type && 8 === N.Browser.version ? (this.$none.css({
            display: "none" === t ? "block" : "none"
        }), this.$blocked.css({
            display: "blocked" === t ? "block" : "none"
        }), this.$found.css({
            display: "found" === t ? "block" : "none"
        })) : (this.$none.css({
            opacity: "none" === t ? 1 : 0
        }), this.$blocked.css({
            opacity: "blocked" === t ? 1 : 0
        }), this.$found.css({
            opacity: "found" === t ? 1 : 0
        }))
    };
    var Ji = {
            noAccess: "Accessibility cookie is not set. {{retrieve-cookie}}",
            hasAccess: "Cookies are disabled or the accessibility cookie is not set. {{enable-cookies}}"
        },
        Yi = "Accessibility cookie is set. For help, please email {{support}}",
        Xi = "support@hcaptcha.com";

    function Qi() {
        _t.self(this, Et, "status");
        var t = this;
        this.state = {
            hasCookie: !1,
            hasAccess: !1,
            allowedAccess: !1
        }, this.$header = this.createElement(".header"), this.$header.copy = this.$header.createElement(".text"), this.$header.setAttribute("aria-hidden", !0), this.icon = this.initComponent(Ki, null, this.$header), this.retrieve = this.initComponent(Li, {
            text: Ji.noAccess,
            link: !0,
            linkText: "Retrieve accessibility cookie.",
            linkUnderline: !0,
            linkTo: "https://dashboard.hcaptcha.com/signup?type=accessibility",
            replaceText: "retrieve-cookie"
        }), this.disabled = this.initComponent(Li, {
            text: Ji.hasAccess,
            link: !0,
            linkText: "Enable cross-site cookies.",
            linkUnderline: !0,
            replaceText: "enable-cookies"
        }), this.help = this.initComponent(Li, {
            text: Yi,
            link: !0,
            linkText: Xi,
            linkUnderline: !0,
            linkTo: "mailto:" + Xi,
            replaceText: "support"
        }), this.retrieve.dom.id = "status-retrieve", this.disabled.dom.id = "status-disabled", this.help.dom.id = "status-help", this.disabled.on("click", (function () {
            A.requestAccess().then((function () {
                t.setType()
            }))
        }))
    }
    _t.proto(Qi, Et), Qi.prototype.style = function (t) {
        this.css({
            fontSize: t,
            color: "#555555"
        }), this.$header.css({
            fontWeight: 600,
            marginBottom: 5
        }), this.$header.copy.css({
            display: "inline",
            position: "relative"
        }), this.icon.style(), this.icon.css({
            top: -2,
            marginLeft: 5
        }), this.retrieve.style(t, "left"), this.disabled.style(t, "left"), this.help.style(t, "left");
        var e = this.state.hasCookie;
        this.help.css({
            display: e ? "block" : "none"
        });
        var i = !this.state.hasCookie && (!this.hasAccess || this.state.hasAccess && !this.state.allowedAccess);
        this.retrieve.css({
            display: i ? "block" : "none"
        });
        var n = !this.state.hasCookie && this.state.hasAccess && !this.state.allowedAccess;
        this.disabled.css({
            display: n ? "block" : "none"
        })
    }, Qi.prototype.checkAccess = function () {
        var t = this;
        Ve.contact("get-ac").then((function (e) {
            t.state.hasCookie = !!e, A.supportsAPI() ? (t.state.hasAccess = !0, A.hasAccess().then((function (e) {
                t.state.allowedAccess = e, t.setType()
            }))) : (t.state.hasAccess = !1, t.setType())
        }))
    }, Qi.prototype.setType = function () {
        this.$header.copy.text(Rt.translate("Status:"));
        var t = this.state.hasCookie;
        this.help.css({
            display: t ? "block" : "none"
        });
        var e = !this.state.hasCookie && (!this.hasAccess || this.state.hasAccess && !this.state.allowedAccess);
        this.retrieve.css({
            display: e ? "block" : "none"
        });
        var i = !this.state.hasCookie && this.state.hasAccess && !this.state.allowedAccess;
        this.disabled.css({
            display: i ? "block" : "none"
        });
        var n = this.state.hasCookie ? "found" : this.state.hasAccess ? "blocked" : "none";
        this.icon.display(n)
    }, Qi.prototype.translate = function () {
        this.$header.copy.text(Rt.translate("Status:")), this.retrieve.translate(), this.disabled.translate(), this.help.translate()
    };

    function tn() {
        _t.self(this, Et, "accessibility"), this.copy = this.initComponent(Li, {
            text: "To bypass our visual challenge, we offer an accessibility cookie.",
            link: !0,
            linkText: "Learn more about hCaptcha Accessibility.",
            linkUnderline: !0,
            linkTo: "https://hcaptcha.com/accessibility?ref=" + Z.host + "&utm_campaign=" + Z.sitekey + "&utm_medium=challenge"
        }), this.status = this.initComponent(Qi), this.status.checkAccess()
    }

    function en() {
        _t.self(this, Et, "challenge-modal"), this.modalContent = null, this.state = {
            visible: !1,
            curr: null,
            prev: null
        }, this.config = {
            width: 0,
            height: 0,
            mobile: !1
        }, this.display = this.display.bind(this), this.close = this.close.bind(this), this.$container = this.createElement(".container"), this.modal = this.initComponent(Si, null, this.$container), this.modal.on("close", this.close), this.$bg = this.createElement(".modal-bg"), this.$bg.addEventListener("click", this.close);
        var t = "ie" === N.Browser.type && 8 === N.Browser.version;
        this.css({
            visibility: "hidden",
            display: t ? "none" : "table",
            zIndex: -1
        })
    }
    _t.proto(tn, Et), tn.prototype.style = function (t, e, i) {
        var n = Math.floor(at(t, 250, 275, 12, 14));
        this.copy.style(n, "left"), this.copy.css({
            position: "relative",
            display: "inline"
        }), this.status.style(n), this.status.css({
            marginTop: 10
        })
    }, tn.prototype.setCopy = function () {
        this.copy.translate(), this.status.translate()
    }, _t.proto(en, Et), en.prototype.load = function () {
        this.modal.load()
    }, en.prototype.style = function (t, e, i) {
        var n = at(t, 300, 450, 290, 375),
            s = at(e, 275, 300, 260, 275),
            o = n - 2 * at(t, 300, 450, 20, 25),
            r = "ie" === N.Browser.type && 8 === N.Browser.version;
        this.css({
            position: "absolute",
            width: "100%",
            height: "100%",
            display: r && !this.state.visible ? "none" : "table",
            top: 0,
            left: 0
        }), this.$container.css({
            display: "table-cell",
            verticalAlign: "middle"
        }), this.$bg.css({
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "#000",
            opacity: 0,
            zindex: 0,
            cursor: "pointer"
        }), this.config.width = o, this.config.height = s, this.config.mobile = i, this._styleContent()
    }, en.prototype._styleContent = function () {
        this.modal.style(this.config.width, this.config.height), this.modalContent && this.modalContent.style(this.config.width, this.config.height, this.config.mobile)
    }, en.prototype.close = function () {
        if (this.state.visible) {
            this.state.visible = !1, this.modalContent && (this.modalContent.off("close", this.close), this.modalContent = this.modalContent.destroy());
            var t = "ie" === N.Browser.type && 8 === N.Browser.version;
            this.css({
                visibility: "hidden",
                display: t ? "none" : "table",
                zIndex: -1
            }), "report_image" === this.state.prev && "thanks" === this.state.curr && this.emit("refresh"), this.emit("close")
        }
    }, en.prototype.display = function (t, e) {
        var i = this,
            n = null;
        this.modalContent && (this.modalContent = this.modalContent.destroy()), this.state.prev = this.state.curr, this.state.curr = t;
        var s = null;
        "info" === t ? (n = Mi, s = "Information") : "feedback" === t ? (n = Pi, s = "Feedback") : "report_bug" === t ? (n = ji, s = "Software Bug") : "report_image" === t ? (n = Zi, s = "Tell Us Why") : t.indexOf("thanks") >= 0 ? n = qi : t.indexOf("accessibility") >= 0 && (n = tn, s = "Accessibility"), this.state.visible && (this.modal.destroy(), this.modal = this.initComponent(Si, null, this.$container), this.modal.load(), this.modal.on("close", this.close)), this.modalContent = this.initComponent(n, e, this.modal.$content), this.modal.setTitle(s), this.modalContent.setCopy(), this.modalContent.on("close", this.close), this.modalContent.on("change", this.display), this.modalContent.on("report", (function (t) {
            i.emit("report", t)
        })), this._styleContent(), this.css({
            visibility: "visible",
            display: "table",
            zIndex: 200
        }), this.modal.focus(), this.state.visible = !0, this.emit("open")
    }, en.prototype.isOpen = function () {
        return this.state.visible
    };

    function nn() {
        _t.self(this, si, {
            title: "Refresh Challenge.",
            label: "Refresh Challenge.",
            name: "refresh",
            src: "data:image/svg+xml,%3csvg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M20.9148 19.6529C20.9994 19.7239 21.0106 19.8501 20.9381 19.9335C19.5234 21.5598 17.6702 22.7467 15.5981 23.3506C13.4619 23.9733 11.1891 23.9485 9.06708 23.2794C6.94502 22.6103 5.06902 21.327 3.67632 19.5917C2.28361 17.8564 1.43675 15.7471 1.24283 13.5306C1.0489 11.314 1.51662 9.08969 2.58684 7.13894C3.65706 5.18818 5.28171 3.5986 7.25535 2.57119C9.22898 1.54378 11.463 1.12469 13.6748 1.36692C15.8203 1.6019 17.8514 2.44889 19.527 3.80487C19.6129 3.87435 19.6238 4.00065 19.5528 4.08527L18.3637 5.50245C18.2927 5.58707 18.1666 5.5979 18.0805 5.5288C16.746 4.45867 15.1329 3.79007 13.4298 3.60355C11.6604 3.40977 9.87319 3.74503 8.29428 4.56696C6.71537 5.38889 5.41565 6.66056 4.55948 8.22116C3.7033 9.78176 3.32913 11.5612 3.48427 13.3345C3.63941 15.1077 4.3169 16.7952 5.43106 18.1834C6.54522 19.5716 8.04602 20.5982 9.74367 21.1335C11.4413 21.6688 13.2596 21.6886 14.9685 21.1905C16.6133 20.7111 18.0858 19.7725 19.2142 18.4869C19.287 18.4039 19.413 18.3927 19.4976 18.4637L20.9148 19.6529Z' fill='%23787878'/%3e%3cpath d='M22.7248 7.93974C22.7557 8.07007 22.6522 8.19336 22.5185 8.18555L14.9712 7.74462C14.807 7.73502 14.7239 7.54239 14.8297 7.4164L20.6321 0.501257C20.7379 0.375269 20.942 0.423631 20.98 0.583657L22.7248 7.93974Z' fill='%23787878'/%3e%3c/svg%3e",
            theme: Ge,
            width: 35,
            height: 35,
            selectable: !1
        })
    }

    function sn(t) {
        var e = t.palette,
            i = t.component;
        return We.merge({
            main: {
                fill: e.primary.main,
                text: e.common.white,
                border: e.primary.main
            },
            hover: {
                fill: e.primary.main,
                text: e.common.white,
                border: e.primary.main
            }
        }, i.verifyButton)
    }

    function on(t) {
        var e = t.palette,
            i = t.component;
        return We.merge({
            main: {
                fill: e.grey[700],
                text: e.common.white,
                border: e.grey[700]
            },
            hover: {
                fill: e.grey[800],
                text: e.common.white,
                border: e.grey[800]
            }
        }, i.skipButton)
    }

    function rn() {
        _t.self(this, Et, "button-submit"), this.state = {
            text: "Check",
            type: "check",
            label: "Submit Answers",
            locked: !1
        }, this._verifyStyle = sn(Ge.get()), this._skipStyle = on(Ge.get()), this.copy = this.createElement(".text"), this.addClass("button"), this.setAttribute("tabindex", 0), this.setAttribute("role", "button"), this.setLabel.call(this), this.onHover = this.onHover.bind(this), this.onSelect = this.onSelect.bind(this), this.addEventListener("click", this.onSelect), this.addEventListener("enter", this.onSelect), !1 === N.System.mobile && (this.addEventListener("over", this.onHover), this.addEventListener("out", this.onHover))
    }
    _t.proto(nn, si), _t.proto(rn, Et), rn.prototype.style = function (t) {
        var e = t ? 30 : 35,
            i = "check" === this.state.type || "next" === this.state.type;
        this._verifyStyle = sn(Ge.get()), this._skipStyle = on(Ge.get()), this.css({
            height: e,
            cursor: "pointer",
            minWidth: t ? 50 : 70,
            padding: "0px 5px",
            borderRadius: 4,
            border: "none"
        });
        var n = i ? this._verifyStyle.main.text : this._skipStyle.main.text;
        this.copy.css({
            color: n,
            width: "100%",
            height: "100%",
            textAlign: "center",
            position: "relative",
            pointerEvents: "none",
            lineHeight: e,
            fontSize: 14,
            fontWeight: 600,
            zIndex: 5
        }), this.height = e
    }, rn.prototype.action = function (t) {
        var e, i = t.charAt(0).toUpperCase() + t.slice(1),
            n = "check" === t || "next" === t || "report" === t ? this._verifyStyle.main.fill : this._skipStyle.main.fill;
        "check" === t ? e = "Submit Answers" : "next" === t ? e = "Next Challenge" : "report" === t ? e = "Report Images" : (e = "Skip Challenge", t = "skip"), this.state.type = t, this.state.text = i, this.state.label = e, this.css({
            backgroundColor: n
        }), this.setLabel.call(this)
    }, rn.prototype.onHover = function (t) {
        if (null !== this.emit && !0 !== this.state.locked) {
            var e = "over" === t.action,
                i = "check" === this.state.type || "next" === this.state.type ? this._verifyStyle : this._skipStyle,
                n = e ? "hover" : "main";
            this.css({
                backgroundColor: i[n].fill
            })
        }
    }, rn.prototype.onSelect = function (t) {
        null !== this.emit && !0 !== this.state.locked && this.emit("click", t)
    }, rn.prototype.setLock = function (t) {
        this.state.locked = t;
        var e = "check" === this.state.type || "next" === this.state.type ? this._verifyStyle : this._skipStyle;
        this.css({
            cursor: t ? "default" : "pointer",
            backgroundColor: e.main.fill
        })
    }, rn.prototype.setLabel = function () {
        var t = Rt.translate(this.state.text),
            e = Rt.translate(this.state.label);
        Rt.getLocale().indexOf("en") >= 0 && "check" === this.state.type && (t = "Verify"), this.copy.text(t), this.setAttribute("title", e), this.setAttribute("aria-label", e)
    }, rn.prototype.getElement = function () {
        return this && this.dom || null
    };

    function an() {
        _t.self(this, si, {
            selector: "#menu-info",
            title: "Get information about hCaptcha and accessibility options.",
            label: "Get information about hCaptcha and accessibility options.",
            name: "info",
            src: "data:image/svg+xml,%3csvg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='12.5' cy='21.6' r='2' fill='%23787878'/%3e%3ccircle cx='12.5' cy='12.5' r='2' fill='%23787878'/%3e%3ccircle cx='12.5' cy='3.40002' r='2' fill='%23787878'/%3e%3c/svg%3e",
            theme: Ge,
            width: 35,
            height: 35
        })
    }

    function ln() {
        _t.self(this, oi, {
            selector: "display-language",
            theme: Ge,
            width: 26,
            height: 16
        });
        var t = this;
        this.on("style", (function () {
            t.css({
                display: "block"
            })
        }))
    }

    function hn() {
        _t.self(this, Et, "language-selector");
        var t = this;
        this.state = {
            locked: !1
        }, this.list = this.initComponent(N.System.mobile ? ri : wi, {
            theme: Ge,
            selector: "#language-list",
            optionsVisible: 5
        }), this.display = this.initComponent(ln), this.display.ownsListBox(this.list);
        var e = [];
        for (var i in Ot) e.push({
            value: i,
            text: Ot[i]
        });
        this.list.setOptions(e), this.list.on("select", (function (e) {
            t.display.setLocale(e.value), e.value !== Rt.getLocale() && (Rt.setLocale(e.value), Ve.send("challenge-language", {
                locale: e.value
            }))
        })), this.display.on("click", (function (e) {
            e.selected ? (t.list.usingKb(e.usingKb), t.list.open()) : t.list.hide()
        })), this.list.on("hide", (function () {
            t.display.reset()
        })), this.style(), this.updateLocale()
    }
    _t.proto(an, si), _t.proto(ln, oi), ln.prototype.setLocale = function (t) {
        this.setText(Rt.getShortLocale(t).toUpperCase())
    }, _t.proto(hn, Et), hn.prototype.style = function (t) {
        this.display.style(), this.css({
            position: "relative",
            display: "inline-block",
            top: t ? 5 : 10,
            left: 0,
            zIndex: 100
        }), this.list.style(), this.list.css({
            bottom: 30
        })
    }, hn.prototype.setLabel = function () {
        var t = this.list.getSelected().text,
            e = Rt.translate("Select a language {{language}}", {
                language: t
            });
        this.display.setLabel(e), this.display.setTitle(Rt.translate("Language"))
    }, hn.prototype.updateLocale = function () {
        this.list.select(Rt.getLocale())
    }, hn.prototype.setVisible = function (t) {
        this.css({
            display: t ? "block" : "none "
        })
    }, hn.prototype.setLock = function (t) {
        this.state.locked = t, t ? this.list.setAttribute("disabled", t) : this.list.removeAttribute("disabled")
    };

    function cn(t) {
        _t.self(this, Et, "hcaptcha-logo"), this.mobile = !1, this.charity = t;
        var e = this.charity ? "data:image/svg+xml,%3csvg id='logo_charity' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'%3e%3crect x='306.25' y='418.75' width='56.25' height='56.25' style='fill:%230074bf%3bopacity:0.5%3bisolation:isolate'/%3e%3crect x='250' y='418.75' width='56.25' height='56.25' style='fill:%230074bf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='193.75' y='418.75' width='56.25' height='56.25' style='fill:%230074bf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='137.5' y='418.75' width='56.25' height='56.25' style='fill:%230074bf%3bopacity:0.5%3bisolation:isolate'/%3e%3crect x='362.5' y='362.5' width='56.25' height='56.25' style='fill:%230082bf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='306.25' y='362.5' width='56.25' height='56.25' style='fill:%230082bf%3bopacity:0.800000011920929%3bisolation:isolate'/%3e%3crect x='250' y='362.5' width='56.25' height='56.25' style='fill:%230082bf'/%3e%3crect x='193.75' y='362.5' width='56.25' height='56.25' style='fill:%230082bf'/%3e%3crect x='137.5' y='362.5' width='56.25' height='56.25' style='fill:%230082bf%3bopacity:0.800000011920929%3bisolation:isolate'/%3e%3crect x='81.25' y='362.5' width='56.25' height='56.25' style='fill:%230082bf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='418.75' y='306.25' width='56.25' height='56.25' style='fill:%23008fbf%3bopacity:0.5%3bisolation:isolate'/%3e%3crect x='362.5' y='306.25' width='56.25' height='56.25' style='fill:%23008fbf%3bopacity:0.800000011920929%3bisolation:isolate'/%3e%3crect x='306.25' y='306.25' width='56.25' height='56.25' style='fill:%23008fbf'/%3e%3crect x='250' y='306.25' width='56.25' height='56.25' style='fill:%23008fbf'/%3e%3crect x='193.75' y='306.25' width='56.25' height='56.25' style='fill:%23008fbf'/%3e%3crect x='137.5' y='306.25' width='56.25' height='56.25' style='fill:%23008fbf'/%3e%3crect x='81.25' y='306.25' width='56.25' height='56.25' style='fill:%23008fbf%3bopacity:0.800000011920929%3bisolation:isolate'/%3e%3crect x='25' y='306.25' width='56.25' height='56.25' style='fill:%23008fbf%3bopacity:0.5%3bisolation:isolate'/%3e%3crect x='418.75' y='250' width='56.25' height='56.25' style='fill:%23009dbf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='362.5' y='250' width='56.25' height='56.25' style='fill:%23009dbf'/%3e%3crect x='306.25' y='250' width='56.25' height='56.25' style='fill:%23009dbf'/%3e%3crect x='250' y='250' width='56.25' height='56.25' style='fill:%23009dbf'/%3e%3crect x='193.75' y='250' width='56.25' height='56.25' style='fill:%23009dbf'/%3e%3crect x='137.5' y='250' width='56.25' height='56.25' style='fill:%23009dbf'/%3e%3crect x='81.25' y='250' width='56.25' height='56.25' style='fill:%23009dbf'/%3e%3crect x='25' y='250' width='56.25' height='56.25' style='fill:%23009dbf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='418.75' y='193.75' width='56.25' height='56.25' style='fill:%2300abbf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='362.5' y='193.75' width='56.25' height='56.25' style='fill:%2300abbf'/%3e%3crect x='306.25' y='193.75' width='56.25' height='56.25' style='fill:%2300abbf'/%3e%3crect x='250' y='193.75' width='56.25' height='56.25' style='fill:%2300abbf'/%3e%3crect x='193.75' y='193.75' width='56.25' height='56.25' style='fill:%2300abbf'/%3e%3crect x='137.5' y='193.75' width='56.25' height='56.25' style='fill:%2300abbf'/%3e%3crect x='81.25' y='193.75' width='56.25' height='56.25' style='fill:%2300abbf'/%3e%3crect x='25' y='193.75' width='56.25' height='56.25' style='fill:%2300abbf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='418.75' y='137.5' width='56.25' height='56.25' style='fill:%2300b9bf%3bopacity:0.5%3bisolation:isolate'/%3e%3crect x='362.5' y='137.5' width='56.25' height='56.25' style='fill:%2300b9bf%3bopacity:0.800000011920929%3bisolation:isolate'/%3e%3crect x='306.25' y='137.5' width='56.25' height='56.25' style='fill:%2300b9bf'/%3e%3crect x='250' y='137.5' width='56.25' height='56.25' style='fill:%2300b9bf'/%3e%3crect x='193.75' y='137.5' width='56.25' height='56.25' style='fill:%2300b9bf'/%3e%3crect x='137.5' y='137.5' width='56.25' height='56.25' style='fill:%2300b9bf'/%3e%3crect x='81.25' y='137.5' width='56.25' height='56.25' style='fill:%2300b9bf%3bopacity:0.800000011920929%3bisolation:isolate'/%3e%3crect x='25' y='137.5' width='56.25' height='56.25' style='fill:%2300b9bf%3bopacity:0.5%3bisolation:isolate'/%3e%3crect x='362.5' y='81.25' width='56.25' height='56.25' style='fill:%2300c6bf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='306.25' y='81.25' width='56.25' height='56.25' style='fill:%2300c6bf%3bopacity:0.800000011920929%3bisolation:isolate'/%3e%3crect x='250' y='81.25' width='56.25' height='56.25' style='fill:%2300c6bf'/%3e%3crect x='193.75' y='81.25' width='56.25' height='56.25' style='fill:%2300c6bf'/%3e%3crect x='137.5' y='81.25' width='56.25' height='56.25' style='fill:%2300c6bf%3bopacity:0.800000011920929%3bisolation:isolate'/%3e%3crect x='81.25' y='81.25' width='56.25' height='56.25' style='fill:%2300c6bf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='306.25' y='25' width='56.25' height='56.25' style='fill:%2300d4bf%3bopacity:0.5%3bisolation:isolate'/%3e%3crect x='250' y='25' width='56.25' height='56.25' style='fill:%2300d4bf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='193.75' y='25' width='56.25' height='56.25' style='fill:%2300d4bf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='137.5' y='25' width='56.25' height='56.25' style='fill:%2300d4bf%3bopacity:0.5%3bisolation:isolate'/%3e%3cpath d='M190.87%2c158.6c36.33%2c0%2c46.52%2c26.05%2c59.6%2c34.41%2c12.11-8.36%2c22.29-34.41%2c59.59-34.41%2c36.34%2c0%2c65.18%2c29.8%2c66%2c67%2c2.78%2c54-90.26%2c135.93-125.63%2c159.19-36.34-23.26-128.42-105.16-126.6-159.19C125.69%2c188.4%2c153.56%2c158.6%2c190.87%2c158.6Z' style='fill:white'/%3e%3c/svg%3e" : "data:image/svg+xml,%3csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath opacity='0.5' d='M24 28H20V32H24V28Z' fill='%230074BF'/%3e%3cpath opacity='0.7' d='M20 28H16V32H20V28Z' fill='%230074BF'/%3e%3cpath opacity='0.7' d='M16 28H12V32H16V28Z' fill='%230074BF'/%3e%3cpath opacity='0.5' d='M12 28H8V32H12V28Z' fill='%230074BF'/%3e%3cpath opacity='0.7' d='M28 24H24V28H28V24Z' fill='%230082BF'/%3e%3cpath opacity='0.8' d='M24 24H20V28H24V24Z' fill='%230082BF'/%3e%3cpath d='M20 24H16V28H20V24Z' fill='%230082BF'/%3e%3cpath d='M16 24H12V28H16V24Z' fill='%230082BF'/%3e%3cpath opacity='0.8' d='M12 24H8V28H12V24Z' fill='%230082BF'/%3e%3cpath opacity='0.7' d='M8 24H4V28H8V24Z' fill='%230082BF'/%3e%3cpath opacity='0.5' d='M32 20H28V24H32V20Z' fill='%23008FBF'/%3e%3cpath opacity='0.8' d='M28 20H24V24H28V20Z' fill='%23008FBF'/%3e%3cpath d='M24 20H20V24H24V20Z' fill='%23008FBF'/%3e%3cpath d='M20 20H16V24H20V20Z' fill='%23008FBF'/%3e%3cpath d='M16 20H12V24H16V20Z' fill='%23008FBF'/%3e%3cpath d='M12 20H8V24H12V20Z' fill='%23008FBF'/%3e%3cpath opacity='0.8' d='M8 20H4V24H8V20Z' fill='%23008FBF'/%3e%3cpath opacity='0.5' d='M4 20H0V24H4V20Z' fill='%23008FBF'/%3e%3cpath opacity='0.7' d='M32 16H28V20H32V16Z' fill='%23009DBF'/%3e%3cpath d='M28 16H24V20H28V16Z' fill='%23009DBF'/%3e%3cpath d='M24 16H20V20H24V16Z' fill='%23009DBF'/%3e%3cpath d='M20 16H16V20H20V16Z' fill='%23009DBF'/%3e%3cpath d='M16 16H12V20H16V16Z' fill='%23009DBF'/%3e%3cpath d='M12 16H8V20H12V16Z' fill='%23009DBF'/%3e%3cpath d='M8 16H4V20H8V16Z' fill='%23009DBF'/%3e%3cpath opacity='0.7' d='M4 16H0V20H4V16Z' fill='%23009DBF'/%3e%3cpath opacity='0.7' d='M32 12H28V16H32V12Z' fill='%2300ABBF'/%3e%3cpath d='M28 12H24V16H28V12Z' fill='%2300ABBF'/%3e%3cpath d='M24 12H20V16H24V12Z' fill='%2300ABBF'/%3e%3cpath d='M20 12H16V16H20V12Z' fill='%2300ABBF'/%3e%3cpath d='M16 12H12V16H16V12Z' fill='%2300ABBF'/%3e%3cpath d='M12 12H8V16H12V12Z' fill='%2300ABBF'/%3e%3cpath d='M8 12H4V16H8V12Z' fill='%2300ABBF'/%3e%3cpath opacity='0.7' d='M4 12H0V16H4V12Z' fill='%2300ABBF'/%3e%3cpath opacity='0.5' d='M32 8H28V12H32V8Z' fill='%2300B9BF'/%3e%3cpath opacity='0.8' d='M28 8H24V12H28V8Z' fill='%2300B9BF'/%3e%3cpath d='M24 8H20V12H24V8Z' fill='%2300B9BF'/%3e%3cpath d='M20 8H16V12H20V8Z' fill='%2300B9BF'/%3e%3cpath d='M16 8H12V12H16V8Z' fill='%2300B9BF'/%3e%3cpath d='M12 8H8V12H12V8Z' fill='%2300B9BF'/%3e%3cpath opacity='0.8' d='M8 8H4V12H8V8Z' fill='%2300B9BF'/%3e%3cpath opacity='0.5' d='M4 8H0V12H4V8Z' fill='%2300B9BF'/%3e%3cpath opacity='0.7' d='M28 4H24V8H28V4Z' fill='%2300C6BF'/%3e%3cpath opacity='0.8' d='M24 4H20V8H24V4Z' fill='%2300C6BF'/%3e%3cpath d='M20 4H16V8H20V4Z' fill='%2300C6BF'/%3e%3cpath d='M16 4H12V8H16V4Z' fill='%2300C6BF'/%3e%3cpath opacity='0.8' d='M12 4H8V8H12V4Z' fill='%2300C6BF'/%3e%3cpath opacity='0.7' d='M8 4H4V8H8V4Z' fill='%2300C6BF'/%3e%3cpath opacity='0.5' d='M24 0H20V4H24V0Z' fill='%2300D4BF'/%3e%3cpath opacity='0.7' d='M20 0H16V4H20V0Z' fill='%2300D4BF'/%3e%3cpath opacity='0.7' d='M16 0H12V4H16V0Z' fill='%2300D4BF'/%3e%3cpath opacity='0.5' d='M12 0H8V4H12V0Z' fill='%2300D4BF'/%3e%3cpath d='M10.5141 14.9697L11.6379 12.4572C12.0459 11.8129 11.9958 11.0255 11.5449 10.5745C11.4876 10.5173 11.416 10.46 11.3444 10.4171C11.0366 10.2238 10.6572 10.1808 10.3065 10.2954C9.91993 10.4171 9.58349 10.6748 9.36875 11.0184C9.36875 11.0184 7.82972 14.6046 7.26421 16.2153C6.69871 17.8259 6.92062 20.7822 9.12536 22.987C11.4661 25.3277 14.8448 25.8575 17.0066 24.2397C17.0997 24.1967 17.1784 24.1395 17.2572 24.0751L23.9072 18.5202C24.2293 18.2554 24.7089 17.7042 24.2794 17.0743C23.8642 16.4586 23.0697 16.881 22.7404 17.0886L18.9107 19.8731C18.8391 19.9304 18.7318 19.9232 18.6673 19.8517C18.6673 19.8517 18.6673 19.8445 18.6602 19.8445C18.56 19.7228 18.5456 19.4079 18.696 19.2862L24.5657 14.304C25.074 13.8459 25.1456 13.1802 24.7304 12.7292C24.3295 12.2854 23.6924 12.2997 23.1842 12.7578L17.9157 16.881C17.8155 16.9597 17.6652 16.9454 17.5864 16.8452L17.5793 16.838C17.4719 16.7235 17.4361 16.5231 17.5506 16.4014L23.535 10.596C24.0074 10.1522 24.036 9.4149 23.5922 8.94245C23.3775 8.72054 23.084 8.59169 22.7762 8.59169C22.4612 8.59169 22.1606 8.70623 21.9387 8.92813L15.8255 14.6691C15.6823 14.8122 15.396 14.6691 15.3602 14.4973C15.3459 14.4328 15.3674 14.3684 15.4103 14.3255L20.0918 8.99972C20.5571 8.56306 20.5858 7.83292 20.1491 7.36763C19.7124 6.90234 18.9823 6.87371 18.517 7.31036C18.4955 7.32468 18.4812 7.34615 18.4597 7.36763L11.3659 15.2203C11.1082 15.478 10.736 15.4851 10.557 15.342C10.4425 15.2489 10.4282 15.0843 10.5141 14.9697Z' fill='white'/%3e%3c/svg%3e",
            i = "https://newassets.hcaptcha.com/captcha/v1/1f7dc62/static/images" + (this.charity ? "/icon-charity" : "/icon") + ".png";
        this.color = this.initComponent(Xe, {
            selector: ".logo",
            src: e,
            width: 32,
            fallback: i,
            autoLoad: !1
        })
    }

    function un(t) {
        _t.self(this, Et, "hcaptcha-logo"), t || (t = {}), this.mobile = !1, this.link = "https://www.hcaptcha.com/what-is-hcaptcha-about?ref=" + Z.host + "&utm_campaign=" + Z.sitekey + "&utm_medium=challenge", this.icon = this.initComponent(cn, !!t.charity), this.onClick = this.onClick.bind(this), this.addEventListener("click", this.onClick)
    }

    function dn() {
        _t.self(this, Et, "display-error"), this.visible = !1, this.setAttribute("aria-hidden", !0), this.setAttribute("role", "alert"), this.copy = this.createElement(".error-text"), this.appendElement(this.copy), this.setCopy.call(this), this.css({
            opacity: 0
        })
    }

    function pn() {
        _t.self(this, Et, "Crumb"), this.$bg = this.createElement(".crumb-bg")
    }

    function fn() {
        _t.self(this, Et, "challenge-breadcrumbs"), this.width = 0, this.height = 0, this.crumbs = [], this.$wrapper = this.createElement(".crumbs-wrapper")
    }
    _t.proto(cn, Et), cn.prototype.load = function () {
        this.color.load()
    }, cn.prototype.style = function (t) {
        this.mobile = t;
        var e = 32;
        return this.css({
            width: e,
            height: e,
            position: "absolute",
            top: 0,
            left: 0
        }), this.color.css({
            "-ms-high-contrast-adjust": "none",
            width: e,
            height: e,
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 5
        }), {
            width: e,
            height: e
        }
    }, _t.proto(un, Et), un.prototype.load = function () {
        this.icon.load()
    }, un.prototype.style = function (t, e) {
        t !== undefined && (this.mobile = t);
        var i = this.icon.style(this.mobile);
        this.css({
            display: e ? "block" : "none",
            width: i.width,
            height: i.height,
            left: "50%",
            marginLeft: -i.width / 2,
            cursor: "pointer",
            position: "absolute"
        }), this.height = i.height
    }, un.prototype.onClick = function (t) {
        null !== this.fireEvent && window.open(this.link)
    }, _t.proto(dn, Et), dn.prototype.style = function (t) {
        var e = Ge.get().palette;
        this.css({
            fontSize: t,
            color: e.warn.main,
            width: "100%",
            textAlign: "right"
        })
    }, dn.prototype.display = function (t) {
        this.css({
            opacity: t ? 1 : 0
        }), this.visible = t, this.setAttribute("aria-hidden", !t)
    }, dn.prototype.setCopy = function () {
        var t = Rt.translate("Please try again.");
        this.copy.text(t)
    }, _t.proto(pn, Et), pn.prototype.style = function (t) {
        this.css({
            width: t,
            height: t,
            overflow: "hidden",
            borderRadius: "50%"
        }), this.$bg.css({
            width: t,
            height: t
        })
    }, pn.prototype.active = function (t) {
        var e = function (t) {
            var e = t.palette,
                i = t.component;
            return We.merge({
                main: {
                    fill: e.grey[200]
                },
                active: {
                    fill: e.primary.main
                }
            }, i.breadcrumb)
        }(Ge.get());
        this.$bg.css({
            backgroundColor: t ? e.active.fill : e.main.fill
        })
    }, pn.prototype.hide = function () {
        this.css({
            opacity: 0
        })
    }, _t.proto(fn, Et), fn.prototype.createCrumbs = function (t) {
        this.display = !0;
        for (var e = null, i = 0; i < t; i++) e = this.initComponent(pn, null, this.$wrapper), this.crumbs.push(e)
    }, fn.prototype.removeCrumbs = function () {
        if (this.display = !1, 0 !== this.crumbs.length) {
            for (var t = -1; ++t < this.crumbs.length;) this.crumbs[t].destroy();
            this.crumbs = []
        }
    }, fn.prototype.style = function (t, e) {
        for (var i = e ? 6 : 7, n = e ? 4 : 5, s = -1; ++s < this.crumbs.length;) this.crumbs[s].style(i), this.crumbs[s].css({
            left: s * i + s * n,
            top: 0,
            position: "absolute"
        });
        this.css({
            width: t,
            height: i
        });
        var o = this.crumbs.length * i + n * (this.crumbs.length - 1);
        this.$wrapper.css({
            width: o,
            height: i,
            position: "absolute",
            left: (t - o) / 2
        }), this.height = i, this.width = t, this.mobile = e
    }, fn.prototype.setIndex = function (t) {
        for (var e = -1; ++e < this.crumbs.length;) this.crumbs[e].active(t === e)
    }, fn.prototype.hide = function () {
        for (var t = -1; ++t < this.crumbs.length;) this.crumbs[t].hide()
    };
    var mn = [{
        text: "Accessibility",
        value: "accessibility",
        selector: "#accessibility",
        type: "modal"
    }, {
        text: "Report Image",
        value: "report_image",
        selector: "#report_image",
        type: "custom",
        warn: !0
    }, {
        text: "Report Bug",
        value: "report_bug",
        selector: "#report_bug",
        type: "modal"
    }, {
        text: "Information",
        value: "info",
        selector: "#info",
        type: "modal"
    }];

    function yn() {
        _t.self(this, wi, {
            isMenu: !0,
            theme: Ge,
            selector: "#menu",
            optionsVisible: -1
        }), this.state.a11yChallenge = !1, this.options = [], this.on("select", (function (t) {
            t && ("link" === t.type ? window.open(t.value) : "modal" === t.type ? this.emit("display", t.value) : "challenge" === t.type && "text_challenge" === t.value && (Z.a11y_tfe = !0, this.emit("refresh")))
        }))
    }

    function gn() {
        _t.self(this, Et, "challenge-interface");
        var t = this;
        this.state = {
            isRq: !1,
            loaded: !1,
            action: null,
            locked: !1,
            visible: !1,
            whiteLabel: !1
        }, this.language = this.initComponent(hn), this.logo = this.initComponent(un), this.menu = this.initComponent(yn), this.text = this.initComponent(dn), this.breadcrumbs = this.initComponent(fn), this.btn = {
            info: this.initComponent(an),
            refresh: this.initComponent(nn),
            submit: this.initComponent(rn)
        }, this.btn.info.controlsMenu(this.menu), this.setAction = this.setAction.bind(this), this.focusMenuBtn = this.focusMenuBtn.bind(this), this.btn.info.on("click", (function (e) {
            t.menu.usingKb(e.usingKb), t.menu.visible(e.selected, t.state.isRq)
        })), this.menu.on("hide", (function () {
            t.btn.info.reset()
        })), this.btn.refresh.on("click", (function () {
            t.emit("refresh")
        })), this.btn.submit.on("click", (function () {
            t.emit("submit")
        })), this.menu.on("select", (function (e) {
            e && "report_image" === e.value && t.emit("report")
        })), this.menu.on("refresh", this.refresh.bind(this)), this.menu.on("display", (function (e) {
            t.emit("display", e)
        }))
    }

    function vn() {
        _t.self(this, Et, null, ".challenge-container"), this.handleResize = null, this.handleCheck = null, this.handleFocus = null, this.handleSubmit = null
    }
    _t.proto(yn, wi), yn.prototype.setA11yChallenge = function (t) {
        this.state.a11yChallenge = t
    }, yn.prototype._setOptions = function (t) {
        var e;
        for (this.options = [], e = 0; e < mn.length; e++) "report_image" === mn[e].value && t || this.options.push(mn[e]);
        this.state.a11yChallenge && this.options.splice(1, 0, {
            text: "Text Challenge",
            value: "text_challenge",
            selector: "#text_challenge",
            type: "challenge"
        }), this.setOptions(this.options)
    }, yn.prototype.visible = function (t, e) {
        t ? (this._setOptions(e), this.deselect(), this.open()) : this.hide()
    }, _t.proto(gn, Et), gn.prototype.removeCrumbs = function () {
        this.breadcrumbs.removeCrumbs()
    }, gn.prototype.refresh = function () {
        this.btn.refresh.dom.click()
    }, gn.prototype.load = function (t) {
        this.state.isRq = t, this.state.loaded || (this.state.loaded = !0, this.logo.load(), this.btn.info.load(), this.btn.refresh.load())
    }, gn.prototype.style = function (t, e, i) {
        var n = e ? 60 : 70,
            s = e ? 10 : 11,
            o = !this.state.whiteLabel,
            r = !this.state.whiteLabel;
        return this.breadcrumbs.display && (this.breadcrumbs.style(t, e), this.breadcrumbs.css({
            position: "absolute",
            top: e ? 12 : 20
        }), s = e ? 8 : 17, n = e ? 60 : 80), this.language.style(e), this.btn.refresh.style(e), this.btn.submit.style(e), this.btn.info.style(e, o), this.text.style(e ? 11 : 12), this.logo.style(t < 400, r), this.menu.style(190), this.menu.css({
            position: "absolute",
            left: 0,
            bottom: this.btn.info.getHeight() + i
        }), this.btn.info.css({
            position: "absolute",
            left: 0,
            bottom: (this.btn.submit.height - this.btn.info.getHeight()) / 2
        }), this.btn.refresh.css({
            position: "absolute",
            bottom: (this.btn.submit.height - this.btn.refresh.getHeight()) / 2,
            left: o ? this.btn.refresh.getWidth() + 10 : 0
        }), this.btn.submit.css({
            position: "absolute",
            display: "block",
            right: 0,
            bottom: 0
        }), this.logo.css({
            bottom: (this.btn.submit.height - this.logo.height) / 2
        }), this.text.css({
            position: "absolute",
            top: s
        }), this.css({
            width: t,
            height: n,
            position: "relative",
            left: i,
            top: i
        }), {
            width: t,
            height: n
        }
    }, gn.prototype.setupLogo = function (t, e) {
        t && (this.logo.destroy(), this.logo = this.initComponent(un, {
            charity: t
        }), this.logo.load()), this.logo.link = e || this.logo.link
    }, gn.prototype.setA11yChallenge = function (t) {
        this.menu.setA11yChallenge(t)
    }, gn.prototype.setAction = function (t) {
        this.state.action = t, this.btn.submit.action(t)
    }, gn.prototype.getAction = function () {
        return this.state.action
    }, gn.prototype.displayFail = function (t) {
        this.text.display(t)
    }, gn.prototype.setWhiteLabelEnabled = function (t) {
        this.state.whiteLabel = t
    }, gn.prototype.focusMenuBtn = function () {
        this.btn.info.focus()
    }, gn.prototype.displayLanguage = function (t) {
        this.language.setVisible(t)
    }, gn.prototype.enableRefresh = function (t) {
        this.btn.refresh.enable(t)
    }, gn.prototype.translate = function () {
        this.menu.setCopy(), this.text.setCopy(), this.language.updateLocale(), this.language.setLabel(), this.btn.info.setTitle(), this.btn.refresh.setTitle(), this.btn.submit.setLabel()
    }, gn.prototype.lockState = function (t) {
        this.state.locked = t, this.language.setLock(t), this.btn.info.setLock(t), this.btn.refresh.setLock(t), this.btn.submit.setLock(t)
    }, gn.prototype.isLocked = function () {
        return this.state.locked
    }, _t.proto(vn, Et), vn.prototype.style = function (t, e, i) {
        this.css({
            width: t,
            height: e,
            position: "relative",
            top: i,
            left: i,
            zIndex: 0
        })
    }, vn.prototype.mount = function (t) {
        var e = this;
        this.appendElement(t), this.handleResize = function () {
            e.emit("resize")
        }, this.handleCheck = function (i) {
            var n = "skip";
            i && (n = t.breadcrumbs && t.served < t.breadcrumbs ? "next" : "check"), e.emit("action-changed", n)
        }, this.handleFocus = function () {
            e.emit("focus-check")
        }, this.handleSubmit = function () {
            e.emit("submit")
        }, t.on && t.on("display-check", this.handleCheck), t.on && t.on("challenge-resize", this.handleResize), t.on && t.on("focus-check", this.handleFocus), t.on && t.on("submit", this.handleSubmit), this.isMounted = !0
    }, vn.prototype.unmount = function (t) {
        if (t.destroy) try {
            t.off && t.off("display-check", this.handleCheck), t.off && t.off("challenge-resize", this.handleResize), t.off && t.off("focus-check", this.handleFocus), t.off && t.off("submit", this.handleSubmit), t.destroy()
        } catch (Os) {} else this.removeElement(t);
        return this.isMounted = !1, null
    };
    var bn = null;

    function wn(t, e) {
        var i = this;
        e || (e = {}), Z.host = e.host ? e.host : "", Z.sitekey = e.sitekey ? e.sitekey : "", Z.charity = !!e.charity;
        var n = {
            visible: !1,
            create: !1,
            timer: null,
            timerExpired: !1,
            preventClose: !1,
            focus: "challenge"
        };
        t instanceof kt || (t = new kt(t));
        var s = new gn,
            o = new vn,
            r = new en;
        return t.appendElement(o), t.appendElement(s), t.appendElement(r), s.on("display", r.display), t.setAttribute("aria-hidden", !0), r.on("open", (function () {
            n.preventClose = !0
        })), r.on("close", (function () {
            n.visible && s.focusMenuBtn(), i.hideReport(!1), n.preventClose && (n.preventClose = !1, n.timerExpired && (n.timerExpired = !1, s.emit("refresh")))
        })), o.on("action-changed", (function (t) {
            s.setAction(t)
        })), o.on("submit", (function () {
            s.emit("submit")
        })), i.addTheme = function (t, e) {
            Ge.add(t, e)
        }, i.useTheme = function (t) {
            Ge.use(t)
        }, i.size = function (t, e) {
            return i.style(t, e)
        }, i.create = function (t) {
            n.create = !0, s.load(!!t.rq), s.displayLanguage(!t.rq), s.enableRefresh(!t.rq)
        }, i.isMounted = function () {
            return !!bn
        }, i.setup = function (t, e) {
            return new Promise((function (i, n) {
                try {
                    bn && bn.type !== e.request_type && (o.unmount(bn), bn = null), bn || (bn = new t({
                        theme: {
                            name: Ge.active(),
                            config: Ge.get()
                        }
                    }), o.mount(bn)), s.removeCrumbs(), bn.setup(e).then(i)["catch"]((function (t) {
                        var e = t;
                        t instanceof Error && (e = {
                            event: At.CHALLENGE_ERROR,
                            message: "Challenge encountered an error during setup.",
                            reason: t.toString()
                        }), n(e)
                    })), bn.breadcrumbs && "number" == typeof bn.breadcrumbs && bn.breadcrumbs > 1 && (s.breadcrumbs.createCrumbs(bn.breadcrumbs), s.breadcrumbs.setIndex(bn.served))
                } catch (Os) {
                    o.isMounted || (bn = null), n({
                        event: At.CHALLENGE_ERROR,
                        message: "Creating challenge failed.",
                        reason: Os.toString()
                    })
                }
            }))
        }, i.show = function (e) {
            if (!n.create) return Promise.reject(new Error(St.CHALLENGE_ALREADY_CLOSED));
            n.visible = !0, t.removeAttribute("aria-hidden"), xe.resetData(), xe.record(!0, !0, !0, !0), xe.setData("dct", Date.now());
            var o = i.setup(e.bundle, e.bundleData),
                r = i.style(e.width, e.height).then((function (o) {
                    n.visible && (s.lockState(!1), Ve.contact("challenge-ready", o).then((function () {
                        var o = "info" === n.focus && e.challengeType.indexOf("text") >= 0 && t.hasClass("using-kb"),
                            r = "info" === n.focus && e.challengeType.indexOf("text") < 0;
                        o || r ? (s.btn.info.focus(), n.focus = "challenge") : i.focus()
                    })))
                }));
            return new Promise((function (t, i) {
                r["catch"](i), o.then(t, i), n.timer && clearTimeout(n.timer), n.timer = setTimeout((function () {
                    n.timerExpired = !0, n.preventClose || i({
                        event: St.CHALLENGE_EXPIRED
                    })
                }), e.expiration)
            }))
        }, i.style = function (t, e) {
            return bn ? new Promise((function (i, n) {
                try {
                    bn.style(t, e).then((function (t) {
                        var e = s.style(t.width, t.mobile, 10);
                        o.style(t.width, t.height, 10);
                        var n = {
                            width: t.width + 20,
                            height: t.height + 20 + e.height
                        };
                        r.style(n.width, n.height, t.mobile), r.load(), i({
                            width: n.width,
                            height: n.height,
                            mobile: t.mobile
                        })
                    }))["catch"]((function (t) {
                        n({
                            event: At.CHALLENGE_ERROR,
                            message: "Error occurred in promise of .style()",
                            reason: t.toString()
                        })
                    }))
                } catch (Os) {
                    n({
                        event: At.CHALLENGE_ERROR,
                        message: "Error when calling .style()",
                        reason: Os.toString()
                    })
                }
            })) : Promise.resolve({
                width: 0,
                height: 0,
                mobile: !1
            })
        }, i.submit = function () {
            return i.hasBreadcrumbs() && i.getTotalServed() !== i.getTotalBreadcrumbs() || "skip" !== s.getAction() ? new Promise((function (t, e) {
                try {
                    if (bn && bn.submit(), i.hasBreadcrumbs()) {
                        var o = i.getTotalServed();
                        s.breadcrumbs.setIndex(o)
                    }
                    t("challenge-complete"), null !== n._timer && "check" === s.getAction() && (clearTimeout(n._timer), n._timer = null)
                } catch (Os) {
                    e(Os)
                }
            })) : Promise.resolve("challenge-skip")
        }, i.displayReport = function (t) {
            return new Promise((function (e, n) {
                try {
                    if (!i.isMounted()) return e();
                    if (!i.canReport()) {
                        var o;
                        if ("fallback" === t.request_type) o = t.key;
                        else {
                            var r = i.hasBreadcrumbs() ? i.getTotalServed() - 1 : 0;
                            o = t.tasklist[r].task_key
                        }
                        return e(o)
                    }
                    i.report().then(e), s.breadcrumbs && s.breadcrumbs.hide()
                } catch (Ts) {
                    n(Ts)
                }
            }))
        }, i.hideReport = function () {
            bn && bn.report && bn.report(!1)
        }, i.close = function () {
            n.timer && clearTimeout(n.timer), n.timer = null, t.setAttribute("aria-hidden", !0), i.close(), s.displayFail(!1), s.removeCrumbs(), r.close(), n.visible = !1, n.create = !1
        }, i.translateInterface = function (t) {
            if (t && t.locale && t.table) try {
                t.table && (Rt.setLocale(t.locale), Rt.addTable(t.locale, t.table)), s.translate(), document.documentElement.setAttribute("lang", Rt.getLocale())
            } catch (Os) {
                tt("translation", Os)
            }
        }, i.translateBundle = function () {
            bn && bn.translate && bn.translate()
        }, i.isVisible = function () {
            return n.visible
        }, i.setFocus = function (t) {
            n.focus = t
        }, i.triggerFocus = function (t, e) {
            "submit" === t ? s.btn.submit.focus() : i.focus(e)
        }, i.getContainer = function () {
            return o
        }, i.getInterface = function () {
            return s
        }, i.getModal = function () {
            return r
        }, i.getTotalServed = function () {
            return bn.served
        }, i.getTotalBreadcrumbs = function () {
            return bn ? bn.breadcrumbs : 0
        }, i.hasBreadcrumbs = function () {
            return !(!bn || !bn.breadcrumbs)
        }, i.canReport = function () {
            return bn.report && "function" == typeof bn.report
        }, i.report = function () {
            return new Promise((function (t) {
                var e = function (i) {
                    bn.off("report-image", e), t(i)
                };
                bn.report(!0), bn.on("report-image", e)
            }))
        }, i.close = function () {
            bn && (bn = o.unmount(bn))
        }, i.focus = function (t) {
            bn && bn.setFocus && bn.setFocus(t || 0)
        }, i
    }
    var xn = Object.create(null),
        Cn = null,
        kn = null,
        _n = null,
        En = function (t) {
            return Cn = null, kn = t, _n = new Promise((function (e, i) {
                try {
                    var n = M.decode(t.req);
                    if (et("Solve Proof", "proof", "info", t), !(-1 !== ["hsw", "hsj", "hsl"].indexOf(t.type) && (!("n" in n.payload) || n.payload.n === t.type))) return Q("Asset script invalid file", "error", "proof", {
                        seen: t.type,
                        wanted: n.n
                    }), e(), void(_n = null);
                    var s = n.payload.l + "/" + t.type + ".js";
                    (function (t, e) {
                        return new Promise((function (i, n) {
                            var s = xn[t];
                            s ? i(s) : te.script(e).then((function () {
                                s = window[t], xn[t] = s, i(s)
                            }))["catch"](n)
                        }))
                    })(t.type, s).then((function (e) {
                        return "function" != typeof e ? Promise.reject(new Error("Script is not a function")) : e(t.req, {
                            assethost: U.assethost
                        })
                    })).then((function (t) {
                        Cn = t, e(t)
                    }))["catch"]((function (t) {
                        "string" == typeof t && -1 !== t.indexOf("http") ? Q("Asset Script Failed", "error", "proof", {
                            error: t
                        }) : tt("proof", t), Cn = "fail", e()
                    }))["finally"]((function () {
                        _n = null
                    }))
                } catch (Os) {
                    tt("proof", Os), e(), _n = null
                }
            })), _n
        },
        Sn = function () {
            return new Promise((function (t, e) {
                function i() {
                    var e = Cn,
                        i = kn;
                    return Cn = null, kn = null, t({
                        solved: e,
                        spec: i
                    })
                }
                if (!_n) return i();
                _n["finally"](i)
            }))
        };

    function An(t) {
        window.__wdata = t
    }

    function Ln() {
        try {
            return Object.keys(window).sort().join(",")
        } catch (Ts) {
            return null
        }
    }
    var Hn = null,
        Bn = null,
        Mn = null,
        Vn = null,
        On = {},
        Tn = null,
        Fn = null,
        Rn = !1,
        Dn = {
            logAction: function (t) {
                Tn = t
            },
            getTaskData: function (t, e) {
                t === undefined && (t = {});
                var i = {
                    v: "1f7dc62",
                    sitekey: Z.sitekey,
                    host: Z.host,
                    hl: Rt.getLocale()
                };
                return U.se && (i.se = U.se), !0 === Z.a11y_tfe && (i.a11y_tfe = !0), null !== Tn && (i.action = Tn, Tn = null), null !== Vn && (i.extraData = JSON.stringify(Vn), Vn = null), t && (i.motionData = JSON.stringify(t)), null !== Hn && (Bn = Hn, i.old_ekey = Hn), null !== Fn && (i.rqdata = Fn), e && (i.n = e.solved || null, i.c = e.spec ? JSON.stringify(e.spec) : null), new Promise((function (t, e) {
                    try {
                        Zt({
                            url: U.endpoint + "/getcaptcha/" + i.sitekey,
                            data: i,
                            dataType: "query",
                            responseType: "json",
                            withCredentials: !0,
                            headers: {
                                Accept: "application/json",
                                "Content-type": "application/x-www-form-urlencoded"
                            }
                        }).then((function (e) {
                            var n = e.body || null;
                            if (!n) throw new Error("Missing response body.");
                            if (!1 === n.success) return -1 !== (n["error-codes"] || []).indexOf("invalid-data") && Q("invalid-data", "error", "api", {
                                motionData: i.motionData
                            }), void t(n);
                            Dn.setData(n), t(n)
                        }))["catch"](e)
                    } catch (Ts) {
                        e(Ts)
                    }
                }))
            },
            loadBundle: function (t) {
                return new Promise((function (e, i) {
                    if (On[t]) e(On[t]);
                    else {
                        var n = Dn.createBundleUrl(t);
                        te.script(n).then((function () {
                            On[t] = window[t], e(On[t])
                        }))["catch"]((function (t) {
                            i({
                                event: At.BUNDLE_ERROR,
                                message: "Failed to get challenge bundle.",
                                reason: t
                            })
                        }))
                    }
                }))
            },
            createBundleUrl: function (t) {
                return (U.assethost || Z.assetDomain) + "/captcha/challenge/" + t + "/1f7dc62/challenge.js"
            },
            checkAnswers: function (t, e, i) {
                var n = {
                    v: "1f7dc62",
                    job_mode: Vn.request_type,
                    answers: t,
                    serverdomain: Z.host,
                    sitekey: Z.sitekey,
                    motionData: JSON.stringify(e)
                };
                return U.se && (n.se = U.se), i && (n.n = i.solved, n.c = JSON.stringify(i.spec)), new Promise((function (t, e) {
                    try {
                        Zt({
                            url: U.endpoint + "/checkcaptcha/" + n.sitekey + "/" + Vn.key,
                            data: n,
                            dataType: "json",
                            responseType: "json",
                            withCredentials: !0,
                            headers: {
                                "Content-type": "application/json;charset=UTF-8"
                            }
                        }).then((function (e) {
                            var i = e.body || null;
                            if (!i) throw new Error("Missing response body.");
                            if (!1 === i.success) {
                                var s = i["error-codes"] || [""]; - 1 !== s.indexOf("invalid-data") && Q("invalid-data", "error", "api", {
                                    motionData: n.motionData
                                });
                                var o = s.join(", ");
                                throw new Error(o)
                            }
                            t(i)
                        }))["catch"](e)
                    } catch (Ts) {
                        e(Ts)
                    }
                }))
            },
            reportIssue: function (t, e, i) {
                var n = {
                    taskdata: Vn,
                    on_url: Z.url,
                    report_category: t,
                    sid: Mn
                };
                if (e && (n.user_comments = e), Bn && (n.last_ekey = Bn), i && Vn && "fallback" !== Vn.request_type) {
                    for (var s = Vn.tasklist, o = null, r = -1; ++r < s.length && !o;) s[r].task_key === i && (o = s[r]);
                    n.taskdata.tasklist = [o]
                }
                return Zt({
                    url: U.reportapi + "/bug-report",
                    data: n,
                    dataType: "json",
                    responseType: "json",
                    withCredentials: !0,
                    headers: {
                        "Content-type": "application/json;charset=UTF-8"
                    }
                })
            },
            getEKey: function () {
                return Hn
            },
            setData: function (t) {
                Vn = t, Hn = t.key, Rn = !!t.rq, Mn || (Mn = Hn)
            },
            setRqData: function (t) {
                Fn = t
            },
            getRqData: function () {
                return Fn
            },
            isRqChl: function () {
                return Rn
            },
            getData: function () {
                return Vn
            }
        };

    function $n() {
        this._events = Object.create(null)
    }

    function Pn(t, e, i, n) {
        this._events[t] || (this._events[t] = []), this._events[t].unshift({
            fn: e,
            once: n,
            context: i
        })
    }
    $n.prototype.on = function (t, e, i) {
        Pn.call(this, t, e, i, !1)
    }, $n.prototype.once = function (t, e, i) {
        Pn.call(this, t, e, i, !0)
    }, $n.prototype.off = function (t, e) {
        var i = this._events[t];
        if (i) {
            for (var n = i.length; --n > -1;) i[n].fn === e && i.splice(n, 1);
            0 === i.length && delete this._events[t]
        }
    }, $n.prototype.emit = function (t) {
        var e = this._events[t];
        if (e) {
            for (var i, n = Array.prototype.slice.call(arguments, 1), s = e.length; --s > -1;)(i = e[s]).fn.apply(i.context, n), i.once && e.splice(s, 1);
            0 === e.length && delete this._events[t]
        }
    }, $n.prototype.removeAllListeners = function () {
        this._events = Object.create(null)
    };
    var In = new We;
    In.add("contrast", {}), In.add("grey-red", {
        component: {
            checkbox: {
                main: {
                    border: "#6a6a6a"
                }
            }
        }
    });

    function jn() {
        _t.self(this, Et, "#a11y-label"), this.state = {
            ticked: !1
        }, this.setAttribute("aria-hidden", !0), this.css({
            display: "none"
        }), this.translate()
    }

    function Nn(t) {
        var e = t.palette,
            i = t.component,
            n = "light" === e.mode;
        return We.merge({
            main: {
                fill: e.grey[100],
                border: e.grey[n ? 600 : 200]
            },
            focus: {
                fill: e.grey[200],
                border: e.grey[n ? 800 : 100]
            }
        }, i.input)
    }

    function Zn() {
        _t.self(this, Et, "#checkbox"), this.state = {
            focused: !1,
            visible: !0,
            passed: !1
        }, this._style = Nn(In.get()), this.setAttribute("aria-haspopup", !0), this.setAttribute("aria-checked", !1), this.setAttribute("role", "checkbox"), this.setAttribute("tabindex", "0"), this.setAttribute("aria-live", "assertive"), this.setAttribute("aria-labelledby", "a11y-label"), this.onOver = this.onOver.bind(this), this.onOut = this.onOut.bind(this), this.addEventListener("focus", this.onOver), this.addEventListener("over", this.onOver), this.addEventListener("blur", this.onOut), this.addEventListener("out", this.onOut)
    }
    _t.proto(jn, Et), jn.prototype.setState = function (t) {
        this.state.ticked = "passed" === t, this.translate()
    }, jn.prototype.translate = function () {
        var t = this.state.ticked ? "hCaptcha checkbox. You are verified" : "hCaptcha checkbox. Select in order to trigger the challenge, or to bypass it if you have an accessibility cookie.";
        this.content(Rt.translate(t))
    }, _t.proto(Zn, Et), Zn.prototype.style = function () {
        this._style = Nn(In.get());
        var t = this.state.visible ? this._style.main.fill : "transparent",
            e = this.state.focused ? this._style.focus.border : this._style.main.border,
            i = this.state.visible ? e : "transparent";
        this.css({
            position: "absolute",
            width: 28,
            height: 28,
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: i,
            borderRadius: 4,
            backgroundColor: t,
            top: 0,
            left: 0
        })
    }, Zn.prototype.onOver = function (t) {
        this.state.focused || (this.state.focused = "focus" === t.action, this.css({
            borderColor: this._style.focus.border
        }))
    }, Zn.prototype.onOut = function (t) {
        if ("blur" === t.action) this.state.focused = !1;
        else if (this.state.focused) return;
        this.css({
            borderColor: this._style.main.border
        })
    }, Zn.prototype.display = function (t) {
        this.state.visible = t, this.setAttribute("tabindex", t ? 0 : -1), this.style()
    }, Zn.prototype.setState = function (t) {
        this.state.passed = "passed" === t, this.state.visible = "loading" !== t && "passed" !== t, this.setAttribute("tabindex", "loading" === t || "solving" === t ? -1 : 0), this.setAttribute("aria-checked", this.state.passed), this.style()
    };

    function zn() {
        _t.self(this, Xe, {
            selector: ".pulse",
            src: "data:image/svg+xml,%3c%3fxml version='1.0' encoding='utf-8'%3f%3e%3c!-- Generator: Adobe Illustrator 21.0.2%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 44 44' style='enable-background:new 0 0 44 44%3b' xml:space='preserve'%3e%3cstyle type='text/css'%3e .st0%7bfill:none%3bstroke:%23FF7B00%3bstroke-width:2%3b%7d%3c/style%3e%3cg%3e %3ccircle class='st0' cx='22' cy='22' r='1'%3e %3canimate accumulate='none' additive='replace' attributeName='r' begin='0s' calcMode='spline' dur='1.8s' fill='remove' keySplines='0.165%2c 0.84%2c 0.44%2c 1' keyTimes='0%3b 1' repeatCount='indefinite' restart='always' values='1%3b 20'%3e %3c/animate%3e %3canimate accumulate='none' additive='replace' attributeName='stroke-opacity' begin='0s' calcMode='spline' dur='1.8s' fill='remove' keySplines='0.3%2c 0.61%2c 0.355%2c 1' keyTimes='0%3b 1' repeatCount='indefinite' restart='always' values='1%3b 0'%3e %3c/animate%3e %3c/circle%3e %3ccircle class='st0' cx='22' cy='22' r='1'%3e %3canimate accumulate='none' additive='replace' attributeName='r' begin='-0.9s' calcMode='spline' dur='1.8s' fill='remove' keySplines='0.165%2c 0.84%2c 0.44%2c 1' keyTimes='0%3b 1' repeatCount='indefinite' restart='always' values='1%3b 20'%3e %3c/animate%3e %3canimate accumulate='none' additive='replace' attributeName='stroke-opacity' begin='-0.9s' calcMode='spline' dur='1.8s' fill='remove' keySplines='0.3%2c 0.61%2c 0.355%2c 1' keyTimes='0%3b 1' repeatCount='indefinite' restart='always' values='1%3b 0'%3e %3c/animate%3e %3c/circle%3e%3c/g%3e%3c/svg%3e",
            width: 30,
            fallback: "https://newassets.hcaptcha.com/captcha/v1/1f7dc62/static/images/pulse.png"
        }), this.state = {
            visible: !1
        }
    }
    _t.proto(zn, Xe), zn.prototype.style = function () {
        this.size(), this.css({
            display: this.state.visible ? "block" : "none",
            position: "absolute",
            top: 0,
            left: 0
        })
    }, zn.prototype.display = function (t) {
        this.state.visible = t, this.style()
    };

    function Un() {
        _t.self(this, Xe, {
            selector: ".check",
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAC00lEQVR4nO2aTU8TQRyHn39bIdXEm3jwLQhefPkAJorYLYslIF64ohwM8eQH0A/gzYSLIRooxBORKJr4Ultq4smz8YgQb3ow4YAmUHY8IEpgd7vQ3e0smee4+5/uPL+daXdmCwaDwWAwGAwGg8FgMBgM+wBr0u7JFe17QWrTUXcmbqxJuwdhTpDejsHO7Ne5hbJf/b4KYFMeJAuAcKleCPsmgB3ymwiX2m901BZfLHx0a5eKpXcR4ykPgPqdEvnk1Vai7Fgc1JMXkevlm+88p0CiA2hUHhIcQBjykNAAwpKHBAYQpjwkLICw5SFBAUQhDwkJICp5SEAAUcqD5gFELQ8aBxCHPGgaQFzyoGEAccpDwNXgxZmhLCr6sPJTvXk/eRSDYcpDgAAGxgcOZleW31hF+1GUIViTdo9S6qXfna+MlN6HfV3fAApjhdZfrauzInIFkdGoQoh72G/FM4ChmaGW1cPOM+Dav4MRhNBMefAJ4OfK8hjQv+OEyKhV7H0YRgjNmPPb8QxgndQDYMn1pHC30ZHQrDm/Hc8APoy8XVK1dDew6FrQwHTIFe0uRJ43a9hvpW7nc0/6TklmvQq0uxYoNV65VbqDoIJcMFe0uwR5DRxy+bBY5SHgg1B+On9SOZkqqNOuBQFD0E0edvEkuBFCeh7ocC2oE4KO8rCL9wLl4fK3tKOuAguuBT7fCbrKwx7WAvaEfcJJybyCTteCbSNBZ3nY42Ko+2nheKbmVOuFkJuyL+ssDw2sBnNT/cdErVWBMx4ls6D6/B5y4vidr0dDT3PWY+soBzLzwNngrfS485s09HK0crvynbVaDvgSrIVe8hDShsjfkVABznlX6ScPIe4I2dN2W82RisD5nWf1lIeQt8Tsabtt3aEMcuH/UX3lIeQ/SJSGSz9anLQF6vPGEb3lIaJN0cJE4ciaOK9IcV9n+WiJYRPVYDAYDAaDoRH+ALzfixyrasnFAAAAAElFTkSuQmCC",
            width: 30
        }), this.state = {
            visible: !1
        }
    }

    function Wn() {
        _t.self(this, Et, "#anchor-wr"), this.state = {
            loading: !1,
            checked: !1
        };
        var t = this.createElement("#anchor-td"),
            e = t.createElement("#anchor-tc"),
            i = e.createElement("#anchor-state");
        this.a11y = this.initComponent(jn), this.input = this.initComponent(Zn, null, i), this.loading = this.initComponent(zn, null, i), this.checked = this.initComponent(Un, null, i), this.table = t, this.cell = e, this.wrapper = i
    }
    _t.proto(Un, Xe), Un.prototype.style = function () {
        this.size(), this.css({
            display: this.state.visible ? "block" : "none",
            position: "absolute",
            top: 0,
            left: 0,
            animation: this.state.visible ? "pop 0.4s linear" : "auto"
        })
    }, Un.prototype.display = function (t) {
        this.state.visible = t, this.style()
    }, _t.proto(Wn, Et), Wn.prototype.style = function (t) {
        var e = t ? 60 : "100%",
            i = t ? "0px 12px" : "0px 15px";
        this.css({
            position: "relative",
            display: "inline-block",
            height: e,
            "-ms-high-contrast-adjust": "none"
        }), this.table.css({
            position: "relative",
            display: "table",
            top: 0,
            height: "100%"
        }), this.cell.css({
            display: "table-cell",
            verticalAlign: "middle"
        });
        this.wrapper.css({
            position: "relative",
            width: 30,
            height: 30,
            margin: i
        }), this.input.style(), this.loading.style(), this.checked.style()
    }, Wn.prototype.describeBy = function (t) {
        t && t.dom && t.dom.id ? this.input.setAttribute("aria-describedby", t.dom.id) : this.input.removeAttribute("aria-describedby")
    }, Wn.prototype.setState = function (t) {
        var e = "loading" === t,
            i = "passed" === t;
        this.checked.display(i), this.loading.display(e), this.a11y.setState(t), this.input.setState(t), this.state.loading = e, this.state.checked = i
    }, Wn.prototype.focus = function () {
        this.input.focus()
    }, Wn.prototype.getLocation = function () {
        var t = this.input.dom.getBoundingClientRect(),
            e = t.bottom - t.top,
            i = t.right - t.left;
        return {
            left: t.left,
            right: t.right,
            top: t.top,
            bottom: t.bottom,
            width: i,
            height: e,
            x: t.left + i / 2,
            y: t.top + e / 2
        }
    };

    function qn() {
        _t.self(this, Et, "label-container"), this.table = this.createElement("label-td"), this.cell = this.table.createElement("label-tc"), this.text = this.cell.createElement("#label"), this.translate()
    }
    _t.proto(qn, Et), qn.prototype.style = function (t) {
        var e = t ? 60 : "100%",
            i = t ? 100 : 170,
            n = In.get().palette;
        this.css({
            position: "relative",
            display: "inline-block",
            height: e,
            width: i
        }), this.table.css({
            position: "relative",
            display: "table",
            top: 0,
            height: "100%"
        }), this.cell.css({
            display: "table-cell",
            verticalAlign: "middle"
        }), this.text.css({
            color: n.text.body,
            fontSize: 14
        })
    }, qn.prototype.translate = function () {
        var t = Rt.translate("I am human");
        this.text.content(t)
    };
    var Gn = "Privacy",
        Kn = "https://hcaptcha.com/privacy",
        Jn = "hCaptcha Privacy Policy",
        Yn = "Terms",
        Xn = "https://hcaptcha.com/terms",
        Qn = "hCaptcha Terms of Service";

    function ts(t) {
        _t.self(this, Et, "anchor-links"), this.state = {
            theme: t.theme,
            size: t.size
        }, this.privacy = this.initComponent(Ke, {
            text: Gn,
            url: (t.privacyUrl || Kn) + "?ref=" + Z.host + "&utm_campaign=" + Z.sitekey + "&utm_medium=checkbox"
        }), this.hyphen = this.initComponent(Je, {
            text: " - "
        }), this.terms = this.initComponent(Ke, {
            text: Yn,
            url: (t.termsUrl || Xn) + "?ref=" + Z.host + "&utm_campaign=" + Z.sitekey + "&utm_medium=checkbox"
        }), this.translate()
    }
    _t.proto(ts, Et), ts.prototype.style = function () {
        var t = function (t) {
                var e = t.palette,
                    i = t.component,
                    n = "light" === e.mode;
                return We.merge({
                    main: e.grey[n ? 700 : 200]
                }, i.link)
            }(In.get()),
            e = {
                fontSize: 8,
                color: t.main
            };
        this.privacy.style(e), this.hyphen.style(e), this.terms.style(e)
    }, ts.prototype.translate = function () {
        this.privacy.translate(), this.terms.translate(), this.privacy.setAttribute("aria-label", Rt.translate(Jn)), this.terms.setAttribute("aria-label", Rt.translate(Qn))
    };
    var es = "https://www.hcaptcha.com/what-is-hcaptcha-about",
        is = "Visit hcaptcha.com to learn more about the service and its accessibility options.";

    function ns(t) {
        _t.self(this, Et, "anchor-brand"), this.state = {
            url: t.logoUrl || es + "?ref=" + Z.host + "&utm_campaign=" + Z.sitekey + "&utm_medium=checkbox",
            theme: "dark" === t.theme ? "dark" : "light",
            display: t.displayLogo
        };
        var e = "light" === this.state.theme ? "data:image/svg+xml,%3csvg width='44' height='46' viewBox='0 0 44 46' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath opacity='0.5' d='M30 28H26V32H30V28Z' fill='%230074BF'/%3e%3cpath opacity='0.7' d='M26 28H22V32H26V28Z' fill='%230074BF'/%3e%3cpath opacity='0.7' d='M22 28H18V32H22V28Z' fill='%230074BF'/%3e%3cpath opacity='0.5' d='M18 28H14V32H18V28Z' fill='%230074BF'/%3e%3cpath opacity='0.7' d='M34 24H30V28H34V24Z' fill='%230082BF'/%3e%3cpath opacity='0.8' d='M30 24H26V28H30V24Z' fill='%230082BF'/%3e%3cpath d='M26 24H22V28H26V24Z' fill='%230082BF'/%3e%3cpath d='M22 24H18V28H22V24Z' fill='%230082BF'/%3e%3cpath opacity='0.8' d='M18 24H14V28H18V24Z' fill='%230082BF'/%3e%3cpath opacity='0.7' d='M14 24H10V28H14V24Z' fill='%230082BF'/%3e%3cpath opacity='0.5' d='M38 20H34V24H38V20Z' fill='%23008FBF'/%3e%3cpath opacity='0.8' d='M34 20H30V24H34V20Z' fill='%23008FBF'/%3e%3cpath d='M30 20H26V24H30V20Z' fill='%23008FBF'/%3e%3cpath d='M26 20H22V24H26V20Z' fill='%23008FBF'/%3e%3cpath d='M22 20H18V24H22V20Z' fill='%23008FBF'/%3e%3cpath d='M18 20H14V24H18V20Z' fill='%23008FBF'/%3e%3cpath opacity='0.8' d='M14 20H10V24H14V20Z' fill='%23008FBF'/%3e%3cpath opacity='0.5' d='M10 20H6V24H10V20Z' fill='%23008FBF'/%3e%3cpath opacity='0.7' d='M38 16H34V20H38V16Z' fill='%23009DBF'/%3e%3cpath d='M34 16H30V20H34V16Z' fill='%23009DBF'/%3e%3cpath d='M30 16H26V20H30V16Z' fill='%23009DBF'/%3e%3cpath d='M26 16H22V20H26V16Z' fill='%23009DBF'/%3e%3cpath d='M22 16H18V20H22V16Z' fill='%23009DBF'/%3e%3cpath d='M18 16H14V20H18V16Z' fill='%23009DBF'/%3e%3cpath d='M14 16H10V20H14V16Z' fill='%23009DBF'/%3e%3cpath opacity='0.7' d='M10 16H6V20H10V16Z' fill='%23009DBF'/%3e%3cpath opacity='0.7' d='M38 12H34V16H38V12Z' fill='%2300ABBF'/%3e%3cpath d='M34 12H30V16H34V12Z' fill='%2300ABBF'/%3e%3cpath d='M30 12H26V16H30V12Z' fill='%2300ABBF'/%3e%3cpath d='M26 12H22V16H26V12Z' fill='%2300ABBF'/%3e%3cpath d='M22 12H18V16H22V12Z' fill='%2300ABBF'/%3e%3cpath d='M18 12H14V16H18V12Z' fill='%2300ABBF'/%3e%3cpath d='M14 12H10V16H14V12Z' fill='%2300ABBF'/%3e%3cpath opacity='0.7' d='M10 12H6V16H10V12Z' fill='%2300ABBF'/%3e%3cpath opacity='0.5' d='M38 8H34V12H38V8Z' fill='%2300B9BF'/%3e%3cpath opacity='0.8' d='M34 8H30V12H34V8Z' fill='%2300B9BF'/%3e%3cpath d='M30 8H26V12H30V8Z' fill='%2300B9BF'/%3e%3cpath d='M26 8H22V12H26V8Z' fill='%2300B9BF'/%3e%3cpath d='M22 8H18V12H22V8Z' fill='%2300B9BF'/%3e%3cpath d='M18 8H14V12H18V8Z' fill='%2300B9BF'/%3e%3cpath opacity='0.8' d='M14 8H10V12H14V8Z' fill='%2300B9BF'/%3e%3cpath opacity='0.5' d='M10 8H6V12H10V8Z' fill='%2300B9BF'/%3e%3cpath opacity='0.7' d='M34 4H30V8H34V4Z' fill='%2300C6BF'/%3e%3cpath opacity='0.8' d='M30 4H26V8H30V4Z' fill='%2300C6BF'/%3e%3cpath d='M26 4H22V8H26V4Z' fill='%2300C6BF'/%3e%3cpath d='M22 4H18V8H22V4Z' fill='%2300C6BF'/%3e%3cpath opacity='0.8' d='M18 4H14V8H18V4Z' fill='%2300C6BF'/%3e%3cpath opacity='0.7' d='M14 4H10V8H14V4Z' fill='%2300C6BF'/%3e%3cpath opacity='0.5' d='M30 0H26V4H30V0Z' fill='%2300D4BF'/%3e%3cpath opacity='0.7' d='M26 0H22V4H26V0Z' fill='%2300D4BF'/%3e%3cpath opacity='0.7' d='M22 0H18V4H22V0Z' fill='%2300D4BF'/%3e%3cpath opacity='0.5' d='M18 0H14V4H18V0Z' fill='%2300D4BF'/%3e%3cpath d='M16.5141 14.9697L17.6379 12.4572C18.0459 11.8129 17.9958 11.0255 17.5449 10.5745C17.4876 10.5173 17.416 10.46 17.3444 10.4171C17.0366 10.2238 16.6572 10.1808 16.3065 10.2954C15.9199 10.4171 15.5835 10.6748 15.3687 11.0184C15.3687 11.0184 13.8297 14.6046 13.2642 16.2153C12.6987 17.8259 12.9206 20.7822 15.1254 22.987C17.4661 25.3277 20.8448 25.8575 23.0066 24.2397C23.0997 24.1967 23.1784 24.1395 23.2572 24.0751L29.9072 18.5202C30.2293 18.2554 30.7089 17.7042 30.2794 17.0743C29.8642 16.4586 29.0697 16.881 28.7404 17.0886L24.9107 19.8731C24.8391 19.9304 24.7318 19.9232 24.6673 19.8517C24.6673 19.8517 24.6673 19.8445 24.6602 19.8445C24.56 19.7228 24.5456 19.4079 24.696 19.2862L30.5657 14.304C31.074 13.8459 31.1456 13.1802 30.7304 12.7292C30.3295 12.2854 29.6924 12.2997 29.1842 12.7578L23.9157 16.881C23.8155 16.9597 23.6652 16.9454 23.5864 16.8452L23.5793 16.838C23.4719 16.7235 23.4361 16.5231 23.5506 16.4014L29.535 10.596C30.0074 10.1522 30.036 9.4149 29.5922 8.94245C29.3775 8.72054 29.084 8.59169 28.7762 8.59169C28.4612 8.59169 28.1606 8.70623 27.9387 8.92813L21.8255 14.6691C21.6823 14.8122 21.396 14.6691 21.3602 14.4973C21.3459 14.4328 21.3674 14.3684 21.4103 14.3255L26.0918 8.99972C26.5571 8.56306 26.5858 7.83292 26.1491 7.36763C25.7124 6.90234 24.9823 6.87371 24.517 7.31036C24.4955 7.32468 24.4812 7.34615 24.4597 7.36763L17.3659 15.2203C17.1082 15.478 16.736 15.4851 16.557 15.342C16.4425 15.2489 16.4282 15.0843 16.5141 14.9697Z' fill='white'/%3e%3cpath d='M4.99195 43.6627H3.32946V40.8306C3.32946 40.1764 3.2488 39.6073 2.55423 39.6073C1.85966 39.6073 1.64905 40.2167 1.64905 41.0144V43.6627H0V36.112H1.64905V37.9045C1.64905 38.4512 1.64008 39.0427 1.64008 39.0427C1.89999 38.5632 2.38395 38.1689 3.13677 38.1689C4.61106 38.1689 4.99195 39.1637 4.99195 40.4766V43.6627Z' fill='%23555555'/%3e%3cpath d='M12.081 42.762C11.7181 43.1563 10.9652 43.7882 9.51337 43.7882C7.42069 43.7882 5.77612 42.3228 5.77612 39.8941C5.77612 37.4564 7.43861 36 9.50889 36C10.9742 36 11.7674 36.6453 11.9556 36.8514L11.4402 38.3167C11.3058 38.1285 10.544 37.5281 9.60299 37.5281C8.39757 37.5281 7.4655 38.3795 7.4655 39.8582C7.4655 41.337 8.43342 42.175 9.60299 42.175C10.4902 42.175 11.131 41.803 11.5209 41.3773L12.081 42.762Z' fill='%23555555'/%3e%3cpath d='M17.3016 43.6627H15.7242L15.6928 43.0936C15.4777 43.3221 15.0655 43.7837 14.2365 43.7837C13.3403 43.7837 12.3903 43.2684 12.3903 42.0674C12.3903 40.8665 13.4344 40.4587 14.3709 40.4139L15.6525 40.3601V40.2391C15.6525 39.67 15.2716 39.3743 14.6084 39.3743C13.9586 39.3743 13.3089 39.679 13.049 39.8538L12.6143 38.72C13.049 38.4915 13.8421 38.1733 14.7921 38.1733C15.7421 38.1733 16.2888 38.4019 16.6921 38.7962C17.082 39.1906 17.3016 39.7148 17.3016 40.6245V43.6627ZM15.657 41.2877L14.8414 41.3415C14.3351 41.3639 14.0348 41.5924 14.0348 41.9957C14.0348 42.4125 14.353 42.6634 14.8101 42.6634C15.2537 42.6634 15.5539 42.3587 15.657 42.1705V41.2877Z' fill='%23555555'/%3e%3cpath d='M21.6034 43.7792C20.8506 43.7792 20.3129 43.4835 19.9947 42.9816V45.6389H18.3456V38.2674H19.914L19.9051 38.9575H19.9275C20.2994 38.487 20.8461 38.1689 21.6213 38.1689C23.0867 38.1689 24.0142 39.3832 24.0142 40.9696C24.0142 42.5559 23.0777 43.7792 21.6034 43.7792ZM21.1284 39.549C20.4249 39.549 19.9409 40.1181 19.9409 40.9471C19.9409 41.7762 20.4249 42.3453 21.1284 42.3453C21.8409 42.3453 22.3249 41.7762 22.3249 40.9471C22.3249 40.1181 21.8409 39.549 21.1284 39.549Z' fill='%23555555'/%3e%3cpath d='M27.8321 39.6028H26.7074V41.5386C26.7074 42.0002 26.7701 42.1077 26.8508 42.2063C26.9225 42.296 27.0255 42.3363 27.2406 42.3363C27.4109 42.3318 27.5767 42.3004 27.738 42.2377L27.8187 43.6044C27.4378 43.7165 27.039 43.7747 26.6446 43.7792C26.0576 43.7792 25.6633 43.591 25.4079 43.2773C25.1524 42.9636 25.0449 42.511 25.0449 41.691V39.6028H24.3234V38.2809H25.0449V36.8156H26.7074V38.2809H27.8321V39.6028Z' fill='%23555555'/%3e%3cpath d='M32.7121 43.1339C32.6583 43.1787 32.1251 43.7792 30.7718 43.7792C29.3781 43.7792 28.0876 42.771 28.0876 40.9785C28.0876 39.1726 29.3961 38.1689 30.7897 38.1689C32.0892 38.1689 32.6762 38.738 32.6762 38.738L32.3133 40.0599C31.9458 39.7507 31.4843 39.5804 31.0048 39.5804C30.3013 39.5804 29.7456 40.0957 29.7456 40.9471C29.7456 41.7986 30.252 42.3363 31.0272 42.3363C31.8024 42.3363 32.3178 41.812 32.3178 41.812L32.7121 43.1339Z' fill='%23555555'/%3e%3cpath d='M38.3986 43.6627H36.7361V40.8306C36.7361 40.1764 36.6555 39.6073 35.9609 39.6073C35.2663 39.6073 35.0512 40.2212 35.0512 41.0188V43.6672H33.4067V36.112H35.0557V37.9045C35.0557 38.4512 35.0468 39.0427 35.0468 39.0427C35.3067 38.5632 35.7906 38.1689 36.5435 38.1689C38.0177 38.1689 38.3986 39.1637 38.3986 40.4766V43.6627Z' fill='%23555555'/%3e%3cpath d='M44 43.6627H42.4226L42.3913 43.0936C42.1762 43.3221 41.7639 43.7837 40.9349 43.7837C40.0387 43.7837 39.0887 43.2684 39.0887 42.0674C39.0887 40.8665 40.1328 40.4587 41.0693 40.4139L42.3509 40.3601V40.2391C42.3509 39.67 41.97 39.3743 41.3068 39.3743C40.6571 39.3743 40.0073 39.679 39.7474 39.8538L39.3127 38.7156C39.7474 38.487 40.5406 38.1689 41.4906 38.1689C42.4405 38.1689 42.9872 38.3974 43.3905 38.7917C43.7804 39.1861 44 39.7104 44 40.62V43.6627ZM42.3599 41.2877L41.5443 41.3415C41.038 41.3639 40.7377 41.5924 40.7377 41.9957C40.7377 42.4125 41.0559 42.6634 41.513 42.6634C41.9566 42.6634 42.2568 42.3587 42.3599 42.1705V41.2877V41.2877Z' fill='%23555555'/%3e%3c/svg%3e" : "data:image/svg+xml,%3csvg width='44' height='46' viewBox='0 0 44 46' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath opacity='0.5' d='M30 28H26V32H30V28Z' fill='%230074BF'/%3e%3cpath opacity='0.7' d='M26 28H22V32H26V28Z' fill='%230074BF'/%3e%3cpath opacity='0.7' d='M22 28H18V32H22V28Z' fill='%230074BF'/%3e%3cpath opacity='0.5' d='M18 28H14V32H18V28Z' fill='%230074BF'/%3e%3cpath opacity='0.7' d='M34 24H30V28H34V24Z' fill='%230082BF'/%3e%3cpath opacity='0.8' d='M30 24H26V28H30V24Z' fill='%230082BF'/%3e%3cpath d='M26 24H22V28H26V24Z' fill='%230082BF'/%3e%3cpath d='M22 24H18V28H22V24Z' fill='%230082BF'/%3e%3cpath opacity='0.8' d='M18 24H14V28H18V24Z' fill='%230082BF'/%3e%3cpath opacity='0.7' d='M14 24H10V28H14V24Z' fill='%230082BF'/%3e%3cpath opacity='0.5' d='M38 20H34V24H38V20Z' fill='%23008FBF'/%3e%3cpath opacity='0.8' d='M34 20H30V24H34V20Z' fill='%23008FBF'/%3e%3cpath d='M30 20H26V24H30V20Z' fill='%23008FBF'/%3e%3cpath d='M26 20H22V24H26V20Z' fill='%23008FBF'/%3e%3cpath d='M22 20H18V24H22V20Z' fill='%23008FBF'/%3e%3cpath d='M18 20H14V24H18V20Z' fill='%23008FBF'/%3e%3cpath opacity='0.8' d='M14 20H10V24H14V20Z' fill='%23008FBF'/%3e%3cpath opacity='0.5' d='M10 20H6V24H10V20Z' fill='%23008FBF'/%3e%3cpath opacity='0.7' d='M38 16H34V20H38V16Z' fill='%23009DBF'/%3e%3cpath d='M34 16H30V20H34V16Z' fill='%23009DBF'/%3e%3cpath d='M30 16H26V20H30V16Z' fill='%23009DBF'/%3e%3cpath d='M26 16H22V20H26V16Z' fill='%23009DBF'/%3e%3cpath d='M22 16H18V20H22V16Z' fill='%23009DBF'/%3e%3cpath d='M18 16H14V20H18V16Z' fill='%23009DBF'/%3e%3cpath d='M14 16H10V20H14V16Z' fill='%23009DBF'/%3e%3cpath opacity='0.7' d='M10 16H6V20H10V16Z' fill='%23009DBF'/%3e%3cpath opacity='0.7' d='M38 12H34V16H38V12Z' fill='%2300ABBF'/%3e%3cpath d='M34 12H30V16H34V12Z' fill='%2300ABBF'/%3e%3cpath d='M30 12H26V16H30V12Z' fill='%2300ABBF'/%3e%3cpath d='M26 12H22V16H26V12Z' fill='%2300ABBF'/%3e%3cpath d='M22 12H18V16H22V12Z' fill='%2300ABBF'/%3e%3cpath d='M18 12H14V16H18V12Z' fill='%2300ABBF'/%3e%3cpath d='M14 12H10V16H14V12Z' fill='%2300ABBF'/%3e%3cpath opacity='0.7' d='M10 12H6V16H10V12Z' fill='%2300ABBF'/%3e%3cpath opacity='0.5' d='M38 8H34V12H38V8Z' fill='%2300B9BF'/%3e%3cpath opacity='0.8' d='M34 8H30V12H34V8Z' fill='%2300B9BF'/%3e%3cpath d='M30 8H26V12H30V8Z' fill='%2300B9BF'/%3e%3cpath d='M26 8H22V12H26V8Z' fill='%2300B9BF'/%3e%3cpath d='M22 8H18V12H22V8Z' fill='%2300B9BF'/%3e%3cpath d='M18 8H14V12H18V8Z' fill='%2300B9BF'/%3e%3cpath opacity='0.8' d='M14 8H10V12H14V8Z' fill='%2300B9BF'/%3e%3cpath opacity='0.5' d='M10 8H6V12H10V8Z' fill='%2300B9BF'/%3e%3cpath opacity='0.7' d='M34 4H30V8H34V4Z' fill='%2300C6BF'/%3e%3cpath opacity='0.8' d='M30 4H26V8H30V4Z' fill='%2300C6BF'/%3e%3cpath d='M26 4H22V8H26V4Z' fill='%2300C6BF'/%3e%3cpath d='M22 4H18V8H22V4Z' fill='%2300C6BF'/%3e%3cpath opacity='0.8' d='M18 4H14V8H18V4Z' fill='%2300C6BF'/%3e%3cpath opacity='0.7' d='M14 4H10V8H14V4Z' fill='%2300C6BF'/%3e%3cpath opacity='0.5' d='M30 0H26V4H30V0Z' fill='%2300D4BF'/%3e%3cpath opacity='0.7' d='M26 0H22V4H26V0Z' fill='%2300D4BF'/%3e%3cpath opacity='0.7' d='M22 0H18V4H22V0Z' fill='%2300D4BF'/%3e%3cpath opacity='0.5' d='M18 0H14V4H18V0Z' fill='%2300D4BF'/%3e%3cpath d='M16.5141 14.9697L17.6379 12.4572C18.0459 11.8129 17.9958 11.0255 17.5449 10.5745C17.4876 10.5173 17.416 10.46 17.3444 10.4171C17.0366 10.2238 16.6572 10.1808 16.3065 10.2954C15.9199 10.4171 15.5835 10.6748 15.3687 11.0184C15.3687 11.0184 13.8297 14.6046 13.2642 16.2153C12.6987 17.8259 12.9206 20.7822 15.1254 22.987C17.4661 25.3277 20.8448 25.8575 23.0066 24.2397C23.0997 24.1967 23.1784 24.1395 23.2572 24.0751L29.9072 18.5202C30.2293 18.2554 30.7089 17.7042 30.2794 17.0743C29.8642 16.4586 29.0697 16.881 28.7404 17.0886L24.9107 19.8731C24.8391 19.9304 24.7318 19.9232 24.6673 19.8517C24.6673 19.8517 24.6673 19.8445 24.6602 19.8445C24.56 19.7228 24.5456 19.4079 24.696 19.2862L30.5657 14.304C31.074 13.8459 31.1456 13.1802 30.7304 12.7292C30.3295 12.2854 29.6924 12.2997 29.1842 12.7578L23.9157 16.881C23.8155 16.9597 23.6652 16.9454 23.5864 16.8452L23.5793 16.838C23.4719 16.7235 23.4361 16.5231 23.5506 16.4014L29.535 10.596C30.0074 10.1522 30.036 9.4149 29.5922 8.94245C29.3775 8.72054 29.084 8.59169 28.7762 8.59169C28.4612 8.59169 28.1606 8.70623 27.9387 8.92813L21.8255 14.6691C21.6823 14.8122 21.396 14.6691 21.3602 14.4973C21.3459 14.4328 21.3674 14.3684 21.4103 14.3255L26.0918 8.99972C26.5571 8.56306 26.5858 7.83292 26.1491 7.36763C25.7124 6.90234 24.9823 6.87371 24.517 7.31036C24.4955 7.32468 24.4812 7.34615 24.4597 7.36763L17.3659 15.2203C17.1082 15.478 16.736 15.4851 16.557 15.342C16.4425 15.2489 16.4282 15.0843 16.5141 14.9697Z' fill='white'/%3e%3cpath d='M4.99195 43.6627H3.32946V40.8306C3.32946 40.1764 3.2488 39.6073 2.55423 39.6073C1.85966 39.6073 1.64905 40.2167 1.64905 41.0144V43.6627H0V36.112H1.64905V37.9045C1.64905 38.4512 1.64008 39.0427 1.64008 39.0427C1.89999 38.5632 2.38395 38.1689 3.13677 38.1689C4.61106 38.1689 4.99195 39.1637 4.99195 40.4766V43.6627Z' fill='white'/%3e%3cpath d='M12.081 42.762C11.7181 43.1563 10.9652 43.7882 9.51337 43.7882C7.42069 43.7882 5.77612 42.3228 5.77612 39.8941C5.77612 37.4564 7.43861 36 9.50889 36C10.9742 36 11.7674 36.6453 11.9556 36.8514L11.4402 38.3167C11.3058 38.1285 10.544 37.5281 9.60299 37.5281C8.39757 37.5281 7.4655 38.3795 7.4655 39.8582C7.4655 41.337 8.43342 42.175 9.60299 42.175C10.4902 42.175 11.131 41.803 11.5209 41.3773L12.081 42.762Z' fill='white'/%3e%3cpath d='M17.3016 43.6627H15.7242L15.6928 43.0936C15.4777 43.3221 15.0655 43.7837 14.2365 43.7837C13.3403 43.7837 12.3903 43.2684 12.3903 42.0674C12.3903 40.8665 13.4344 40.4587 14.3709 40.4139L15.6525 40.3601V40.2391C15.6525 39.67 15.2716 39.3743 14.6084 39.3743C13.9586 39.3743 13.3089 39.679 13.049 39.8538L12.6143 38.72C13.049 38.4915 13.8421 38.1733 14.7921 38.1733C15.7421 38.1733 16.2888 38.4019 16.6921 38.7962C17.082 39.1906 17.3016 39.7148 17.3016 40.6245V43.6627ZM15.657 41.2877L14.8414 41.3415C14.3351 41.3639 14.0348 41.5924 14.0348 41.9957C14.0348 42.4125 14.353 42.6634 14.8101 42.6634C15.2537 42.6634 15.5539 42.3587 15.657 42.1705V41.2877Z' fill='white'/%3e%3cpath d='M21.6035 43.7792C20.8506 43.7792 20.3129 43.4835 19.9948 42.9816V45.6389H18.3457V38.2674H19.9141L19.9051 38.9575H19.9275C20.2995 38.487 20.8462 38.1689 21.6214 38.1689C23.0867 38.1689 24.0143 39.3832 24.0143 40.9696C24.0143 42.5559 23.0778 43.7792 21.6035 43.7792ZM21.1285 39.549C20.4249 39.549 19.941 40.1181 19.941 40.9471C19.941 41.7762 20.4249 42.3453 21.1285 42.3453C21.841 42.3453 22.3249 41.7762 22.3249 40.9471C22.3249 40.1181 21.841 39.549 21.1285 39.549Z' fill='white'/%3e%3cpath d='M27.8322 39.6028H26.7074V41.5386C26.7074 42.0002 26.7702 42.1077 26.8508 42.2063C26.9225 42.296 27.0256 42.3363 27.2407 42.3363C27.411 42.3318 27.5768 42.3004 27.7381 42.2377L27.8188 43.6044C27.4379 43.7165 27.039 43.7747 26.6447 43.7792C26.0577 43.7792 25.6633 43.591 25.4079 43.2773C25.1525 42.9636 25.0449 42.511 25.0449 41.691V39.6028H24.3235V38.2809H25.0449V36.8156H26.7074V38.2809H27.8322V39.6028Z' fill='white'/%3e%3cpath d='M32.712 43.1339C32.6583 43.1787 32.125 43.7792 30.7717 43.7792C29.3781 43.7792 28.0875 42.771 28.0875 40.9785C28.0875 39.1726 29.396 38.1689 30.7896 38.1689C32.0892 38.1689 32.6762 38.738 32.6762 38.738L32.3132 40.0599C31.9458 39.7507 31.4842 39.5804 31.0047 39.5804C30.3012 39.5804 29.7455 40.0957 29.7455 40.9471C29.7455 41.7986 30.2519 42.3363 31.0271 42.3363C31.8024 42.3363 32.3177 41.812 32.3177 41.812L32.712 43.1339Z' fill='white'/%3e%3cpath d='M38.3986 43.6627H36.7361V40.8306C36.7361 40.1764 36.6554 39.6073 35.9608 39.6073C35.2663 39.6073 35.0512 40.2212 35.0512 41.0188V43.6672H33.4066V36.112H35.0557V37.9045C35.0557 38.4512 35.0467 39.0427 35.0467 39.0427C35.3066 38.5632 35.7906 38.1689 36.5434 38.1689C38.0177 38.1689 38.3986 39.1637 38.3986 40.4766V43.6627Z' fill='white'/%3e%3cpath d='M44 43.6627H42.4227L42.3913 43.0936C42.1762 43.3221 41.764 43.7837 40.935 43.7837C40.0387 43.7837 39.0887 43.2684 39.0887 42.0674C39.0887 40.8665 40.1328 40.4587 41.0694 40.4139L42.351 40.3601V40.2391C42.351 39.67 41.9701 39.3743 41.3069 39.3743C40.6571 39.3743 40.0074 39.679 39.7475 39.8538L39.3128 38.7156C39.7475 38.487 40.5406 38.1689 41.4906 38.1689C42.4406 38.1689 42.9873 38.3974 43.3906 38.7917C43.7805 39.1861 44 39.7104 44 40.62V43.6627ZM42.3599 41.2877L41.5444 41.3415C41.038 41.3639 40.7378 41.5924 40.7378 41.9957C40.7378 42.4125 41.0559 42.6634 41.513 42.6634C41.9566 42.6634 42.2569 42.3587 42.3599 42.1705V41.2877V41.2877Z' fill='white'/%3e%3c/svg%3e",
            i = "https://newassets.hcaptcha.com/captcha/v1/1f7dc62/static/images/logo_combination-" + this.state.theme + ".png";
        t.logo && (i = "png", e = "object" == typeof t.logo ? t.logo[this.state.theme] || t.logo.light : t.logo);
        var n = {
            url: this.state.url,
            src: e,
            fallback: i,
            autoLoad: this.state.display
        };
        this.logo = this.initComponent(Qe, n)
    }

    function ss(t) {
        _t.self(this, Et, "anchor-info"), this.state = {
            size: t.size
        }, this.brand = this.initComponent(ns, t), t.linksOff || (this.links = this.initComponent(ts, t))
    }

    function os() {
        _t.self(this, Et, "#status"), this.state = {
            visible: !1,
            copy: ""
        }, this.translate(), this.setAttribute("aria-hidden", !0), this.setAttribute("aria-live", "polite")
    }

    function rs() {
        _t.self(this, Et, "#warning"), this.state = {
            visible: !1,
            copy: ""
        }, this.setAttribute("aria-hidden", !0), this.setAttribute("aria-live", "polite")
    }

    function as(t) {
        var e = t.palette,
            i = t.component,
            n = "light" === e.mode;
        return We.merge({
            main: {
                fill: e.grey[n ? 100 : 800],
                border: e.grey[n ? 300 : 200]
            },
            hover: {
                fill: e.grey[n ? 200 : 900]
            }
        }, i.checkbox)
    }

    function ls(t) {
        _t.self(this, xi, {
            selector: "#anchor",
            theme: In
        }), this.state = {
            selected: !1,
            warning: !1,
            error: !1,
            ticked: !1,
            defaultVisible: "invisible" !== t.size
        }, this.config = t, this._style = as(In.get()), this.setVisible(this.state.defaultVisible), this.onClick = this.onClick.bind(this), this.onHover = this.onHover.bind(this), this.anchor = this.initComponent(Wn), this.label = this.initComponent(qn), this.info = this.initComponent(ss, this.config), this.status = this.initComponent(os), this.warning = this.initComponent(rs), this.addEventListener("enter", this.onClick), this.addEventListener("click", this.onClick), this.addEventListener("over", this.onHover), this.addEventListener("out", this.onHover)
    }

    function hs(t, e) {
        var i = this;
        t instanceof kt || (t = new kt(t)), Z.host = e.host ? e.host : "", Z.sitekey = e.sitekey ? e.sitekey : "";
        var n = new $n,
            s = new ls(e);
        return s.style(), s.reset(), t.appendElement(s), t.css({
            display: "block"
        }), t.addEventListener("down", (function () {
            t.hasClass("using-kb") && t.removeClass("using-kb")
        })), t.addEventListener("keydown", (function (e) {
            9 === e.keyNum && t.addClass("using-kb")
        })), s.on("select", (function (t) {
            s.select(), n.emit("select", t.action)
        })), i.tick = function () {
            s.tick()
        }, i.reset = function () {
            s.reset(), s.anchor.focus()
        }, i.translate = function () {
            s.translate()
        }, i.setStatus = function (t, e) {
            t ? (s.status.set(t, e), s.anchor.describeBy(s.status)) : (s.status.reset(), s.anchor.describeBy(null))
        }, i.setWarning = function (t) {
            s.warning.set(t), s.warning.isVisible() ? s.anchor.describeBy(s.warning) : s.anchor.describeBy(null)
        }, i.on = function (t, e) {
            n.on(t, e)
        }, i.off = function (t, e) {
            n.off(t, e)
        }, i.getLocation = function () {
            return s.anchor.getLocation()
        }, i.setLoading = function (t) {
            return s.setLoading(t)
        }, i.getLogoUrl = function () {
            return s.getLogoUrl()
        }, i.theme = function (t, e) {
            e ? (In.add(t, In.extend(In.active(), e)), In.use(t)) : In.use(t), s.style()
        }, i
    }
    _t.proto(ns, Et), ns.prototype.style = function () {
        if (this.state.display) {
            this.logo.size(44, 50), this.logo.css({
                margin: "0 auto"
            })
        }
    }, ns.prototype.translate = function () {
        this.logo.setAttribute("aria-label", Rt.translate(is))
    }, ns.prototype.getLogoUrl = function () {
        return this.state.url
    }, _t.proto(ss, Et), ss.prototype.style = function () {
        var t = this.state.size,
            e = {
                display: "inline-block",
                height: "100%",
                width: 65
            },
            i = {
                margin: "0 auto",
                top: this.links ? 6 : 10,
                position: "relative"
            },
            n = {
                textAlign: "right",
                position: "fixed",
                bottom: 9,
                right: 12
            };
        "compact" === t && (e.width = "100%", e.height = "auto", e.marginTop = 5, i.top = this.links ? 0 : 10, n.textAlign = "center", n.position = "relative", n.bottom = 5, n.right = "auto"), this.css(e), this.links && (this.links.style(), this.links.css(n)), this.brand.style(), this.brand.css(i)
    }, ss.prototype.translate = function () {
        this.links && this.links.translate(), this.brand.translate()
    }, ss.prototype.getLogoUrl = function () {
        return this.brand.getLogoUrl()
    }, _t.proto(os, Et), os.prototype.style = function () {
        var t = In.get().palette;
        this.css({
            display: this.state.visible ? "block" : "none",
            color: t.warn.main,
            fontSize: 10,
            top: 5,
            left: 5,
            position: "absolute"
        })
    }, os.prototype.set = function (t, e) {
        if (t && t.indexOf("invalid-challenge") >= 0) {
            var i = t.replace(/-/g, " ");
            t = i.charAt(0).toUpperCase() + i.slice(1) + "."
        }
        this.state.visible = t && "" !== t && !e, this.state.copy = t, this.state.visible ? (this.translate(), this.setAttribute("aria-hidden", e || !t)) : this.removeAttribute("aria-label"), this.css({
            display: this.state.visible ? "block" : "none"
        })
    }, os.prototype.reset = function () {
        this.state.visible = !1, this.state.copy = "", this.removeAttribute("aria-label"), this.setAttribute("aria-hidden", !0), this.css({
            display: "none"
        })
    }, os.prototype.translate = function () {
        if ("" !== this.state.copy) {
            var t = Rt.translate(this.state.copy);
            this.setAttribute("aria-label", t), this.content(t)
        }
    }, os.prototype.isVisible = function () {
        return this.state.visible
    }, _t.proto(rs, Et), rs.prototype.style = function (t) {
        var e = t ? "95%" : "75%",
            i = t ? 50 : 5,
            n = In.get().palette;
        this.css({
            display: this.state.visible ? "block" : "none",
            color: n.warn.main,
            fontSize: 10,
            bottom: i,
            left: 5,
            width: e,
            position: "absolute"
        })
    }, rs.prototype.set = function (t) {
        this.state.visible = t && "" !== t, this.state.copy = t, this.state.visible ? this.translate() : this.removeAttribute("aria-label"), this.css({
            display: this.state.visible ? "block" : "none"
        })
    }, rs.prototype.translate = function () {
        if ("" !== this.state.copy) {
            var t = Rt.translate(this.state.copy);
            this.setAttribute("aria-label", t), this.content(t)
        }
    }, rs.prototype.isVisible = function () {
        return this.state.visible
    }, _t.proto(ls, xi), ls.prototype.style = function () {
        var t = "compact" === this.config.size;
        this._style = as(In.get()), this.info.style(), this.anchor.style(t), this.label.style(t), this.status.style(), this.warning.style(t);
        var e = t ? 156 : 300,
            i = t ? 136 : 74,
            n = {
                backgroundColor: this._style.main.fill,
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: this._style.main.border,
                borderRadius: 4,
                cursor: this.state.ticked ? "default" : "pointer",
                width: e,
                height: i
            };
        this.setStyle(n)
    }, ls.prototype.onHover = function (t) {
        var e = "over" === t.action ? "hover" : "main";
        this.css({
            backgroundColor: this._style[e].fill
        })
    }, ls.prototype.onClick = function (t) {
        var e = t.target || t.srcElement,
            i = "string" == typeof e.className ? e.className : "",
            n = i.indexOf("logo") >= 0 || i.indexOf("link") >= 0;
        if (this.state.selected || t.defaultPrevented || n) return !0;
        this.emit("select", t)
    }, ls.prototype.select = function () {
        this.state.selected = !0, this.setLoading(!0), this.setAttribute("aria-hidden", !0), this.anchor.setAttribute("aria-checked", "mixed"), this.anchor.setAttribute("tabindex", "-1")
    }, ls.prototype.reset = function () {
        this.state.ticked = !1, this.state.selected = !1, this.setVisible(this.state.defaultVisible), this.anchor.setState(null), this.css({
            cursor: "pointer"
        })
    }, ls.prototype.setLoading = function (t) {
        this.state.loading = t;
        var e = t ? "loading" : this.state.selected ? "solving" : null;
        this.anchor.setState(e), this.css({
            cursor: "default"
        })
    }, ls.prototype.tick = function () {
        this.state.ticked = !0, this.anchor.setState("passed"), this.css({
            cursor: "default"
        })
    }, ls.prototype.translate = function () {
        this.info.translate(), this.label.translate(), this.status.translate(), this.warning.translate()
    }, ls.prototype.getLogoUrl = function () {
        return this.info.getLogoUrl()
    };

    function cs(t) {
        if ("en" === t) return Promise.resolve();
        var e = t + ".json";
        return new Promise((function (i, n) {
            te.retrieve(e).then((function (i) {
                return i || te.file(e, {
                    prefix: "https://newassets.hcaptcha.com/captcha/v1/1f7dc62/static/i18n"
                }).then((function (e) {
                    return Rt.addTable(t, e.data), e
                }))
            })).then((function (t) {
                i(t.data)
            }))["catch"]((function (t) {
                n(t)
            }))
        }))
    }
    var us = ["10000000-ffff-ffff-ffff-000000000001", "20000000-ffff-ffff-ffff-000000000002", "30000000-ffff-ffff-ffff-000000000003"],
        ds = {
            sitekey: function (t) {
                return pt.UUIDv4(t) || "00000000-0000-0000-0000-000000000000" === t || -1 !== us.indexOf(t)
            },
            dummykey: function (t) {
                return -1 !== us.indexOf(t)
            }
        };

    function ps(t, e) {
        this.cause = t, this.message = e
    }

    function fs(t) {
        ps.call(this, At.INVALID_CAPTCHA_ID, "Invalid hCaptcha id: " + t)
    }

    function ms() {
        ps.call(this, At.MISSING_CAPTCHA, "No hCaptcha exists.")
    }

    function ys() {
        ps.call(this, At.MISSING_SITEKEY, "Missing sitekey - https://hcaptcha.com/docs/configuration#jsapi")
    }
    ps.prototype = Error.prototype;
    var gs = [],
        vs = [],
        bs = {
            add: function (t) {
                gs.push(t)
            },
            remove: function (t) {
                for (var e = !1, i = gs.length; --i > -1 && !1 === e;) gs[i].id === t.id && (e = gs[i], gs.splice(i, 1));
                return e
            },
            each: function (t) {
                for (var e = -1; ++e < gs.length;) t(gs[e])
            },
            isValidId: function (t) {
                for (var e = !1, i = -1; ++i < gs.length && !1 === e;) gs[i].id === t && (e = !0);
                return e
            },
            getByIndex: function (t) {
                for (var e = !1, i = -1; ++i < gs.length && !1 === e;) i === t && (e = gs[i]);
                return e
            },
            getById: function (t) {
                for (var e = !1, i = -1; ++i < gs.length && !1 === e;) gs[i].id === t && (e = gs[i]);
                return e
            },
            getCaptchaIdList: function () {
                var t = [];
                return bs.each((function (e) {
                    t.push(e.id)
                })), t
            },
            pushSession: function (t, e) {
                vs.push([t, e]), vs.length > 10 && vs.splice(0, vs.length - 10)
            },
            getSession: function () {
                return vs
            }
        };

    function ws(t, e) {
        "object" != typeof t || e || (e = t, t = null);
        var i, n, s, o = !0 === (e = e || {}).async,
            r = new Promise((function (t, e) {
                n = t, s = e
            }));
        if (r.resolve = n, r.reject = s, i = t ? bs.getById(t) : bs.getByIndex(0)) xe.setData("exec", !0), o && i.setPromise(r), i.onReady(i.initChallenge, e);
        else if (t) {
            if (!o) throw new fs(t);
            r.reject(At.INVALID_CAPTCHA_ID)
        } else {
            if (!o) throw new ms;
            r.reject(At.MISSING_CAPTCHA)
        }
        if (o) return r
    }

    function xs(t) {
        var e = "",
            i = null;
        i = t ? bs.getById(t) : bs.getByIndex(0);
        try {
            for (var n = bs.getSession(), s = n.length, o = !1; --s > -1 && !o;)(o = n[s][1] === i.id) && (e = n[s][0])
        } catch (r) {
            e = ""
        }
        return e
    }
    var Cs = ["light", "dark", "contrast", "grey-red"],
        ks = new We;

    function _s(t, e) {
        this.id = t, this.width = null, this.height = null, this.mobile = !1, this.ready = !1, this.listeners = [], this.config = e, this._visible = !1, this._selected = !1, this.$iframe = new kt("iframe"), this._host = Z.host || window.location.hostname;
        var i = Z.assetUrl;
        U.assethost && (i = U.assethost + Z.assetUrl.replace(Z.assetDomain, "")), this.$iframe.dom.src = i + "/hcaptcha.html#frame=challenge&id=" + this.id + "&host=" + this._host + (e ? "&" + st(this.config) : ""), this.$iframe.dom.title = "Main content of the hCaptcha challenge", this.$iframe.dom.frameBorder = 0, this.$iframe.dom.scrolling = "no", this.setupParentContainer(e), this._hasCustomContainer ? (this._hideIframe(), this._parent.appendChild(this.$iframe.dom)) : (this.$container = new kt("div"), this.$wrapper = this.$container.createElement("div"), this.$overlay = this.$container.createElement("div"), this.$arrow = this.$container.createElement("div"), this.$arrow.fg = this.$arrow.createElement("div"), this.$arrow.bg = this.$arrow.createElement("div"), this.style.call(this), this.$wrapper.appendElement(this.$iframe), this._parent.appendChild(this.$container.dom), this.$container.setAttribute("aria-hidden", !0)), this.chat = Me.createChat(this.$iframe.dom, t)
    }

    function Es(t, e, i) {
        this.id = e, this.response = null, this.location = {
            tick: null,
            offset: null,
            bounding: null
        }, this.config = i, this._ticked = !0, this.$container = t instanceof kt ? t : new kt(t), this._host = Z.host || window.location.hostname, this.$iframe = new kt("iframe");
        var n = Z.assetUrl;
        U.assethost && (n = U.assethost + Z.assetUrl.replace(Z.assetDomain, "")), this.$iframe.dom.src = n + "/hcaptcha.html#frame=checkbox&id=" + this.id + "&host=" + this._host + (i ? "&" + st(this.config) : ""), this.$iframe.dom.title = "widget containing checkbox for hCaptcha security challenge", this.$iframe.dom.tabIndex = this.config.tabindex || 0, this.$iframe.dom.frameBorder = "0", this.$iframe.dom.scrolling = "no", this.config.size && "invisible" === this.config.size && this.$iframe.setAttribute("aria-hidden", "true"), this.$iframe.setAttribute("data-hcaptcha-widget-id", e), this.$iframe.setAttribute("data-hcaptcha-response", ""), this.$container.appendElement(this.$iframe), "off" !== U.recaptchacompat && (this.$textArea0 = this.$container.createElement("textarea", "#g-recaptcha-response-" + e), this.$textArea0.dom.name = "g-recaptcha-response", this.$textArea0.css({
            display: "none"
        })), this.$textArea1 = this.$container.createElement("textarea", "#h-captcha-response-" + e), this.$textArea1.dom.name = "h-captcha-response", this.$textArea1.css({
            display: "none"
        }), this.chat = Me.createChat(this.$iframe.dom, e), this.clearLoading = this.clearLoading.bind(this)
    }

    function Ss(t, e, i) {
        if (!i.sitekey) throw new ys;
        this.id = e, this.visible = !1, this.overflow = {
            override: !1,
            cssUsed: !0,
            value: null,
            scroll: 0
        }, this.onError = null, this.onPass = null, this.onExpire = null, this.onChalExpire = null, this.onOpen = null, this.onClose = null, this._ready = !1, this._active = !1, this._listeners = [], this.config = i, Cs.indexOf(i.theme) >= 0 && ks.use(i.theme), this._state = {
            escaped: !1,
            passed: !1,
            expiredChallenge: !1,
            expiredResponse: !1
        }, this._origData = null, this._promise = null, this._responseTimer = null, this.challenge = new _s(e, i), this.checkbox = new Es(t, e, i), this.initChallenge = this.initChallenge.bind(this), this.closeChallenge = this.closeChallenge.bind(this), this.displayChallenge = this.displayChallenge.bind(this), this.getGetCaptchaManifest = this.getGetCaptchaManifest.bind(this)
    }
    ks.add("contrast", {}), ks.add("grey-red", {
        component: {
            challenge: {
                main: {
                    border: "#6a6a6a"
                }
            }
        }
    }), _s.prototype.setupParentContainer = function (t) {
        var e, i = t["challenge-container"];
        i && (e = "string" == typeof i ? document.getElementById(i) : i), e ? (this._hasCustomContainer = !0, this._parent = e) : (this._hasCustomContainer = !1, this._parent = document.body)
    }, _s.prototype._hideIframe = function () {
        var t = {};
        "ie" !== N.Browser.type || "ie" === N.Browser.type && 8 !== N.Browser.version ? (t.opacity = 0, t.visibility = "hidden") : t.display = "none", this.$iframe.setAttribute("aria-hidden", !0), this.$iframe.css(t)
    }, _s.prototype._showIframe = function () {
        var t = {};
        "ie" !== N.Browser.type || "ie" === N.Browser.type && 8 !== N.Browser.version ? (t.opacity = 1, t.visibility = "visible") : t.display = "block", this.$iframe.removeAttribute("aria-hidden"), this.$iframe.css(t)
    }, _s.prototype.style = function () {
        var t = function (t) {
            var e = t.palette,
                i = t.component;
            return We.merge({
                main: {
                    fill: e.common.white,
                    border: e.grey[400]
                }
            }, i.challenge)
        }(ks.get());
        if (this._hasCustomContainer) this.$iframe.css({
            border: 0,
            position: "relative",
            backgroundColor: t.main.fill
        });
        else {
            var e = {
                backgroundColor: t.main.fill,
                border: "1px solid " + t.main.border,
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 4px",
                borderRadius: 4,
                left: -1e4,
                top: -1e4,
                zIndex: -9999999999999,
                position: "absolute"
            };
            "ie" !== N.Browser.type || "ie" === N.Browser.type && 8 !== N.Browser.version ? (e.transition = "opacity 0.15s ease-out", e.opacity = 0, e.visibility = "hidden") : e.display = "none", this.$container.css(e), this.$wrapper.css({
                position: "relative",
                zIndex: 1
            }), this.$overlay.css({
                width: "100%",
                height: "100%",
                position: "fixed",
                pointerEvents: "none",
                top: 0,
                left: 0,
                zIndex: 0,
                backgroundColor: t.main.fill,
                opacity: .05
            }), this.$arrow.css({
                borderWidth: 11,
                position: "absolute",
                pointerEvents: "none",
                marginTop: -11,
                zIndex: 1,
                right: "100%"
            }), this.$arrow.fg.css({
                borderWidth: 10,
                borderStyle: "solid",
                borderColor: "transparent rgb(255, 255, 255) transparent transparent",
                position: "relative",
                top: 10,
                zIndex: 1
            }), this.$arrow.bg.css({
                borderWidth: 11,
                borderStyle: "solid",
                borderColor: "transparent " + t.main.border + " transparent transparent",
                position: "relative",
                top: -11,
                zIndex: 0
            }), this.$iframe.css({
                border: 0,
                zIndex: 2e9,
                position: "relative"
            })
        }
    }, _s.prototype.setup = function (t) {
        return this.chat.send("create-challenge", t)
    }, _s.prototype.sendTranslation = function (t) {
        var e = {
            locale: t,
            table: Rt.getTable(t) || {}
        };
        this.chat && this.chat.send("challenge-translate", e)
    }, _s.prototype.isVisible = function () {
        return this._visible
    }, _s.prototype.getDimensions = function (t, e) {
        return this._visible ? this.chat.contact("resize-challenge", {
            width: t,
            height: e
        }) : Promise.resolve(null)
    }, _s.prototype.show = function () {
        if (!0 !== this._visible)
            if (this._visible = !0, this._hasCustomContainer) this._showIframe();
            else {
                var t = {
                    zIndex: 9999999999999,
                    display: "block"
                };
                ("ie" !== N.Browser.type || "ie" === N.Browser.type && 8 !== N.Browser.version) && (t.opacity = 1, t.visibility = "visible"), this.$container.css(t), this.$container.removeAttribute("aria-hidden"), this.$overlay.css({
                    pointerEvents: "auto",
                    cursor: "pointer"
                }), this.$iframe.dom.focus()
            }
    }, _s.prototype.close = function (t) {
        if (this._visible = !1, this._hasCustomContainer) return this._hideIframe(), void this.chat.send("close-challenge", {
            event: t
        });
        var e = {
            left: -1e4,
            top: -1e4,
            zIndex: -9999999999999
        };
        "ie" !== N.Browser.type || "ie" === N.Browser.type && 8 !== N.Browser.version ? (e.opacity = 0, e.visibility = "hidden") : e.display = "none", this.$container.css(e), this._hasCustomContainer || this.$overlay.css({
            pointerEvents: "none",
            cursor: "default"
        }), this.chat.send("close-challenge", {
            event: t
        }), this.$container.setAttribute("aria-hidden", !0)
    }, _s.prototype.size = function (t, e, i) {
        this.width = t, this.height = e, this.mobile = i, this.$iframe.css({
            width: t,
            height: e
        }), this._hasCustomContainer || (this.$wrapper.css({
            width: t,
            height: e
        }), i ? this.$overlay.css({
            opacity: .5
        }) : this.$overlay.css({
            opacity: .05
        }))
    }, _s.prototype.position = function (t) {
        if (!this._hasCustomContainer && t) {
            var e = 10,
                i = window.document.documentElement,
                n = N.Browser.scrollY(),
                s = N.Browser.width(),
                o = N.Browser.height(),
                r = this.mobile || "invisible" === this.config.size || t.offset.left + t.tick.x <= t.tick.width / 2,
                a = Math.round(t.bounding.top) + n !== t.offset.top,
                l = this.height > i.clientHeight,
                h = r ? (s - this.width) / 2 : t.bounding.left + t.tick.right + 10;
            (h + this.width + e > s || h < 0) && (h = (s - this.width) / 2, r = !0);
            var c = (i.scrollHeight < i.clientHeight ? i.clientHeight : i.scrollHeight) - this.height - e,
                u = r ? (o - this.height) / 2 + n : t.bounding.top + t.tick.y + n - this.height / 2;
            a && u < n && (u = n + e), a && u + this.height >= n + o && (u = n + o - (this.height + e)), u = Math.max(Math.min(u, c), 10);
            var d = t.bounding.top + t.tick.y + n - u - 10,
                p = this.height - 10 - 30;
            return d = Math.max(Math.min(d, p), e), this.$container.css({
                left: h,
                top: u
            }), this.$arrow.fg.css({
                display: r ? "none" : "block"
            }), this.$arrow.bg.css({
                display: r ? "none" : "block"
            }), this.$arrow.css({
                top: d
            }), this.top = u, this.$container.dom.getBoundingClientRect(), l
        }
    }, _s.prototype.destroy = function () {
        this._visible && this.close.call(this), this._hasCustomContainer ? this._parent.removeChild(this.$iframe.dom) : (this._parent.removeChild(this.$container.dom), this.$container = this.$container.__destroy()), this.$iframe = this.$iframe.__destroy(), Me.removeChat(this.chat), this.chat = this.chat.destroy()
    }, _s.prototype.setReady = function (t) {
        if (this.ready = t, this.ready)
            for (var e, i = this.listeners.length; --i > -1;) e = this.listeners[i], this.listeners.splice(i, 1), e()
    }, _s.prototype.onReady = function (t) {
        var e = Array.prototype.slice.call(arguments, 1),
            i = function () {
                t.apply(null, e)
            };
        this.ready ? i() : this.listeners.push(i)
    }, _s.prototype.onOverlayClick = function (t) {
        this._hasCustomContainer || this.$overlay.addEventListener("click", t)
    }, _s.prototype.setConfig = function (t) {
        return this.chat ? this.chat.contact("challenge-update", t) : Promise.resolve()
    }, _s.prototype.setData = function (t) {
        this.chat && this.chat.send("challenge-data", t)
    }, Es.prototype.setResponse = function (t) {
        this.response = t, this.$iframe.dom.setAttribute("data-hcaptcha-response", t), "off" !== U.recaptchacompat && (this.$textArea0.dom.value = t), this.$textArea1.dom.value = t
    }, Es.prototype.style = function () {
        switch (this.config.size) {
            case "compact":
                this.$iframe.css({
                    width: 164,
                    height: 144
                });
                break;
            case "invisible":
                this.$iframe.css({
                    display: "none"
                });
                break;
            default:
                this.$iframe.css({
                    width: 303,
                    height: 78,
                    overflow: "hidden"
                })
        }
    }, Es.prototype.reset = function () {
        this._ticked = !1, this.chat && this.chat.send("checkbox-reset")
    }, Es.prototype.clearLoading = function () {
        this.chat && this.chat.send("checkbox-clear")
    }, Es.prototype.sendTranslation = function (t) {
        var e = {
            locale: t,
            table: Rt.getTable(t) || {}
        };
        this.chat && this.chat.send("checkbox-translate", e)
    }, Es.prototype.status = function (t, e) {
        this.chat && this.chat.send("checkbox-status", {
            text: t || null,
            a11yOnly: e || !1
        })
    }, Es.prototype.tick = function () {
        this._ticked = !0, this.chat && this.chat.send("checkbox-tick")
    }, Es.prototype.getTickLocation = function () {
        return this.chat.contact("checkbox-location")
    }, Es.prototype.getOffset = function () {
        var t = this.$iframe.dom;
        t.offsetParent || (t = t.parentElement);
        for (var e = 0, i = 0; t;) e += t.offsetLeft, i += t.offsetTop, t = t.offsetParent;
        return {
            top: i,
            left: e
        }
    }, Es.prototype.getBounding = function () {
        return this.$iframe.dom.getBoundingClientRect()
    }, Es.prototype.destroy = function () {
        this._ticked && this.reset(), this.$container.removeElement(this.$iframe), this.$container.removeElement(this.$textArea1), "off" !== U.recaptchacompat && (this.$container.removeElement(this.$textArea0), this.$textArea0 = this.$textArea0.__destroy()), this.$textArea1 = this.$textArea1.__destroy(), this.$container = this.$container.__destroy(), this.$iframe = this.$iframe.__destroy(), Me.removeChat(this.chat), this.chat = this.chat.destroy()
    }, Ss.prototype._resetTimer = function () {
        null !== this._responseTimer && (clearTimeout(this._responseTimer), this._responseTimer = null)
    }, Ss.prototype.initChallenge = function (t) {
        t || (t = {}), this._origData = t;
        var e = this.getGetCaptchaManifest(),
            i = t.charity || null,
            n = t.a11yChallenge || !1,
            s = t.link || null,
            o = t.action || "",
            r = t.rqdata || null,
            a = N.Browser.width(),
            l = N.Browser.height();
        this._active = !0, this._resetTimer(), this._resetState(), this.checkbox.setResponse(""), this.challenge.setup({
            a11yChallenge: n,
            manifest: e,
            width: a,
            height: l,
            charity: i,
            link: s,
            action: o,
            rqdata: r,
            wdata: Ln()
        })
    }, Ss.prototype.getGetCaptchaManifest = function () {
        var t = (this._origData || {}).manifest || null;
        return t || ((t = Object.create(null)).st = Date.now()), t.v = 1, t.topLevel = xe.getData(), t.session = bs.getSession(), t.widgetList = bs.getCaptchaIdList(), t.widgetId = this.id, t.href = window.location.href, t.prev = JSON.parse(JSON.stringify(this._state)), t
    }, Ss.prototype.displayChallenge = function (t) {
        if (this._active) {
            var e = this;
            this.visible = !0;
            var i = this.checkbox,
                n = this.challenge,
                s = N.Browser.height();
            if (!("ie" === N.Browser.type && 8 === N.Browser.version)) {
                var o = window.getComputedStyle(document.body).getPropertyValue("overflow-y");
                this.overflow.override = "hidden" === o, this.overflow.override && (this.overflow.cssUsed = "" === document.body.style.overflow && "" === document.body.style.overflowY, this.overflow.cssUsed || (this.overflow.value = "" === o ? "auto" : o), this.overflow.scroll = N.Browser.scrollY(), document.body.style.overflowY = "auto")
            }
            return new Promise((function (o) {
                i.status(), i.getTickLocation().then((function (r) {
                    if (e._active) {
                        if (n.size(t.width, t.height, t.mobile), n.show(), i.clearLoading(), i.location.bounding = i.getBounding(), i.location.tick = r, i.location.offset = i.getOffset(), n.position(i.location))(window.document.scrollingElement || document.getElementsByTagName("html")[0]).scrollTop = Math.abs(n.height - s) + n.top;
                        o()
                    }
                }))
            })).then((function () {
                e.onOpen && dt(e.onOpen)
            }))
        }
    }, Ss.prototype.resize = function (t, e, i) {
        var n = this,
            s = this.checkbox,
            o = this.challenge;
        o.getDimensions(t, e).then((function (t) {
            t && o.size(t.width, t.height, t.mobile), s.location.bounding = s.getBounding(), s.location.offset = s.getOffset(), N.System.mobile && !i || o.position(s.location)
        }))["catch"]((function (t) {
            n.closeChallenge.call(n, {
                event: At.CHALLENGE_ERROR,
                message: "Captcha resize caused error.",
                error: t
            })
        }))
    }, Ss.prototype.position = function () {
        var t = this.checkbox,
            e = this.challenge;
        N.System.mobile || (t.location.bounding = t.getBounding(), e.position(t.location))
    }, Ss.prototype.reset = function () {
        this.checkbox.reset(), this.checkbox.setResponse(""), this._resetTimer(), this._resetState()
    }, Ss.prototype._resetState = function () {
        for (var t in this._state) this._state[t] = !1
    }, Ss.prototype.closeChallenge = function (t) {
        this.visible = !1, this._active = !1;
        var e = this,
            i = this.checkbox,
            n = this.challenge;
        this.overflow.override && ((window.document.scrollingElement || document.getElementsByTagName("html")[0]).scrollTop = this.overflow.scroll, this.overflow.override = !1, this.overflow.scroll = 0, document.body.style.overflowY = this.overflow.cssUsed ? null : this.overflow.value);
        var s = t.response || "";
        switch (i.setResponse(s), n.close(t.event), i.$iframe.dom.focus(), t.event) {
            case St.CHALLENGE_ESCAPED:
                this._state.escaped = !0, i.reset(), e.onClose && dt(e.onClose), e._promise && e._promise.reject(St.CHALLENGE_CLOSED);
                break;
            case St.CHALLENGE_EXPIRED:
                this._state.expiredChallenge = !0, i.reset(), i.status("hCaptcha window closed due to timeout.", !0), e.onChalExpire && dt(e.onChalExpire), e._promise && e._promise.reject(St.CHALLENGE_EXPIRED);
                break;
            case At.CHALLENGE_ERROR:
            case At.BUNDLE_ERROR:
            case At.NETWORK_ERROR:
                var o = t.event;
                i.reset(), t.event === At.NETWORK_ERROR ? (i.status(t.message), 429 === t.status ? o = At.RATE_LIMITED : "invalid-data" === t.message && (o = At.INVALID_DATA)) : t.event === At.BUNDLE_ERROR ? o = At.CHALLENGE_ERROR : t.event === At.CHALLENGE_ERROR && "Answers are incomplete" === t.message && (o = At.INCOMPLETE_ANSWER), this.onError && dt(this.onError, o), e._promise && e._promise.reject(o);
                break;
            case St.CHALLENGE_PASSED:
                this._state.passed = !0, i.tick(), this.onPass && dt(this.onPass, s), e._promise && e._promise.resolve({
                    response: s,
                    key: xs(this.id)
                }), "number" == typeof t.expiration && (e._resetTimer(), e._responseTimer = setTimeout((function () {
                    try {
                        i.reset(), i.setResponse(""), i.status("hCaptcha security token has expired. Please complete the challenge again.", !0)
                    } catch (Os) {
                        tt("global", Os)
                    }
                    e.onExpire && dt(e.onExpire), e._responseTimer = null, e._state.expiredResponse = !0
                }), 1e3 * t.expiration))
        }
        e._promise = null
    }, Ss.prototype.updateTranslation = function (t) {
        this.checkbox.sendTranslation(t), this.challenge.sendTranslation(t)
    }, Ss.prototype.isReady = function () {
        return this._ready
    }, Ss.prototype.setReady = function (t) {
        if (this._ready = t, this._ready)
            for (var e, i = this._listeners.length; --i > -1;) e = this._listeners[i], this._listeners.splice(i, 1), e()
    }, Ss.prototype.setPromise = function (t) {
        this._promise = t
    }, Ss.prototype.onReady = function (t) {
        var e = Array.prototype.slice.call(arguments, 1),
            i = function () {
                t.apply(null, e)
            };
        this._ready ? i() : this._listeners.push(i)
    }, Ss.prototype.destroy = function () {
        (this._resetTimer(), this.overflow.override) && ((window.document.scrollingElement || document.getElementsByTagName("html")[0]).scrollTop = this.overflow.scroll, this.overflow.override = !1, this.overflow.scroll = 0, document.body.style.overflowY = this.overflow.cssUsed ? null : this.overflow.value);
        this.challenge.destroy(), this.checkbox.destroy(), this.challenge = null, this.checkbox = null
    }, Ss.prototype.setSiteConfig = function (t) {
        var e = t && t.features && t.features.custom_theme;
        if (this.config.themeConfig && e) {
            var i = "custom-" + this.id;
            ks.add(i, ks.extend(ks.active(), this.config.themeConfig)), ks.use(i), this.challenge.style()
        }
        return this.challenge.setConfig({
            siteConfig: t,
            wdata: Ln()
        })
    };
    var As = 0,
        Ls = ["hl", "custom", "tplinks", "sitekey", "theme", "size", "tabindex", "challenge-container"];
    var Hs = {
        render: function (t, e) {
            if ("string" == typeof t && (t = document.getElementById(t)), t && 1 === t.nodeType)
                if (function (t) {
                        if (!t || !("challenge-container" in t)) return !0;
                        var e = t["challenge-container"];
                        return "string" == typeof e && (e = document.getElementById(e)), !!e && 1 === e.nodeType
                    }(e)) {
                    if (!1 !== Me.isSupported()) {
                        for (var i, n, s = t.getElementsByTagName("iframe"), o = -1; ++o < s.length && !i;)(n = s[o].getAttribute("data-hcaptcha-widget-id")) && (i = !0);
                        if (i) return console.error("Only one captcha is permitted per parent container."), n;
                        var r = function (t, e) {
                                for (var i = ["hl", "custom", "tplinks", "sitekey", "theme", "type", "size", "tabindex", "callback", "expired-callback", "chalexpired-callback", "error-callback", "open-callback", "close-callback", "endpoint", "challenge-container"], n = {}, s = 0; s < i.length; s++) {
                                    var o = i[s],
                                        r = e && e[o];
                                    r || (r = t.getAttribute("data-" + o)), r && (n[o] = r)
                                }
                                return n
                            }(t, e),
                            a = As++ + Math.random().toString(36).substr(2),
                            l = Object.create(null);
                        l.sentry = J, l.reportapi = U.reportapi, l.recaptchacompat = U.recaptchacompat, l.custom = U.custom, U.endpointOverride && (l.endpoint = U.endpointOverride), null !== U.language && (l.hl = Rt.getLocale()), U.assethost && (l.assethost = U.assethost), U.imghost && (l.imghost = U.imghost), U.tplinks && (l.tplinks = U.tplinks), U.se && (l.se = U.se);
                        for (var h = 0; h < Ls.length; h++) {
                            var c = Ls[h];
                            c in r && (l[c] = r[c])
                        }
                        if (l.theme = U.theme, r.theme) try {
                            var u = r.theme;
                            "string" == typeof u && (u = JSON.parse(u)), l.themeConfig = u
                        } catch (Ts) {
                            l.theme = u
                        }
                        if (t instanceof HTMLButtonElement || t instanceof HTMLInputElement) {
                            var d = new kt("div", ".h-captcha");
                            d.css({
                                display: "none"
                            });
                            for (var p = null, f = 0; f < t.attributes.length; f++)(p = t.attributes[f]).name.startsWith("data-") && d.setAttribute(p.name, p.value);
                            var m = t.tagName.toLowerCase() + "[data-hcaptcha-widget-id='" + a + "']";
                            t.setAttribute("data-hcaptcha-widget-id", a), d.setAttribute("data-hcaptcha-source-id", m), t.parentNode.insertBefore(d.dom, t), t.onclick = function (t) {
                                return t.preventDefault(), ws(a)
                            }, t = d, l.size = "invisible"
                        }
                        try {
                            var y = new Ss(t, a, l);
                            y.challenge.style(), y.checkbox.style()
                        } catch (Os) {
                            var g = "Your browser plugins or privacy policies are blocking the hCaptcha service. Please disable them for hCaptcha.com";
                            return Os instanceof ys && (g = "hCaptcha has failed to initialize. Please see the developer tools console for more information.", console.error(Os.message)), void K(t, g)
                        }
                        return r.callback && (y.onPass = r.callback), r["expired-callback"] && (y.onExpire = r["expired-callback"]), r["chalexpired-callback"] && (y.onChalExpire = r["chalexpired-callback"]), r["open-callback"] && (y.onOpen = r["open-callback"]), r["close-callback"] && (y.onClose = r["close-callback"]), r["error-callback"] && (y.onError = r["error-callback"]), xe.setData("inv", "invisible" === l.size), y.checkbox.chat.listen("checkbox-selected", (function (t) {
                            xe.setData("exec", !1), y.onReady(y.initChallenge, t)
                        })), y.checkbox.chat.listen("checkbox-loaded", (function (t) {
                            y.checkbox.location.bounding = y.checkbox.getBounding(), y.checkbox.location.tick = t, y.checkbox.location.offset = y.checkbox.getOffset(), y.checkbox.sendTranslation(l.hl)
                        })), y.checkbox.chat.listen("checkbox-setup", (function (t) {
                            U.endpointOverride && "https://cloudflare.hcaptcha.com" !== U.endpointOverride && (t.endpoint = null), y.challenge.onReady((function () {
                                y.setSiteConfig(t).then((function () {
                                    y.setReady(!0)
                                }))
                            }))
                        })), y.challenge.chat.listen("challenge-loaded", (function () {
                            y.challenge.setReady(!0), y.challenge.sendTranslation(l.hl)
                        })), y.challenge.chat.answer("challenge-ready", (function (t, e) {
                            y.displayChallenge(t).then(e.resolve)
                        })), y.challenge.chat.listen("challenge-resize", (function () {
                            var t = N.Browser.width(),
                                e = N.Browser.height();
                            y.resize(t, e)
                        })), y.challenge.chat.listen(St.CHALLENGE_CLOSED, (function (t) {
                            xe.setData("lpt", Date.now()), y.closeChallenge(t)
                        })), y.challenge.chat.answer("get-url", (function (t) {
                            t.resolve(window.location.href)
                        })), y.challenge.chat.answer("getcaptcha-manifest", (function (t) {
                            t.resolve(y.getGetCaptchaManifest())
                        })), y.challenge.chat.answer("check-api", (function (t) {
                            t.resolve(xe.getData())
                        })), y.challenge.chat.listen("challenge-key", (function (t) {
                            bs.pushSession(t.key, y.id)
                        })), y.challenge.onOverlayClick((function () {
                            y.closeChallenge({
                                event: St.CHALLENGE_ESCAPED
                            })
                        })), y.challenge.chat.listen("challenge-language", v), v({
                            locale: l.hl
                        }, !0), y.challenge.chat.answer("get-ac", (function (t) {
                            t.resolve(A.hasCookie("hc_accessibility"))
                        })), bs.add(y), a
                    }
                    K(t, "Your browser is missing or has disabled Cross-Window Messaging. Please <a style='color:inherit;text-decoration:underline; font: inherit' target='_blank' href='https://www.whatismybrowser.com/guides/how-to-update-your-browser/auto'>upgrade your browser</a> or enable it for hCaptcha.com")
                } else console.log("[hCaptcha] render: invalid challenge container '" + e["challenge-container"] + "'.");
            else console.log("[hCaptcha] render: invalid container '" + t + "'.");

            function v(t, e) {
                var i = t.locale;

                function n(t) {
                    if (t) try {
                        t.updateTranslation(i)
                    } catch (Os) {
                        tt("translation", Os)
                    }
                }
                i && cs(i).then((function () {
                    e ? n(y) : bs.each(n)
                }))["catch"]((function (t) {
                    tt("api", t, {
                        locale: i
                    })
                }))
            }
        },
        reset: function (t) {
            var e;
            if (t) {
                if (!(e = bs.getById(t))) throw new fs(t);
                e.reset()
            } else {
                if (!(e = bs.getByIndex(0))) throw new ms;
                e.reset()
            }
        },
        remove: function (t) {
            var e = t ? bs.getById(t) : bs.getByIndex(0);
            if (!e) throw t ? new fs(t) : new ms;
            bs.remove(e), e.destroy(), e = null
        },
        execute: ws,
        getResponse: function (t) {
            var e, i;
            if ((i = t ? bs.getById(t) : bs.getByIndex(0)) && (e = i.checkbox.response || ""), void 0 !== e) return e;
            throw t ? new fs(t) : new ms
        },
        getRespKey: xs,
        close: function (t) {
            var e = !1;
            if (!(e = t ? bs.getById(t) : bs.getByIndex(0))) throw t ? new fs(t) : new ms;
            e.closeChallenge({
                event: St.CHALLENGE_ESCAPED
            })
        },
        setData: function (t, e) {
            if ("object" != typeof t || e || (e = t, t = null), !e || "object" != typeof e) throw Error("[hCaptcha] invalid data supplied");
            var i = !1;
            if (!(i = t ? bs.getById(t) : bs.getByIndex(0))) throw t ? new fs(t) : new ms;
            var n = i.challenge.setData.bind(i.challenge);
            i.onReady(n, e)
        },
        nodes: bs
    };

    function Bs(t) {
        Z.file = "hcaptcha";
        var e = document.currentScript,
            i = !1,
            n = !1,
            s = "on",
            o = N.Browser.width() / N.Browser.height(),
            r = !(!window.hcaptcha || !window.hcaptcha.render);

        function a() {
            var t = N.Browser.width(),
                e = N.Browser.height(),
                i = N.System.mobile && o !== t / e;
            o = t / e, c(), Hs.nodes.each((function (n) {
                n.visible && n.resize(t, e, i)
            }))
        }

        function l(t) {
            t.preventDefault && t.preventDefault(), h(), Hs.nodes.each((function (t) {
                t.visible && t.position()
            }))
        }

        function h() {
            xe.circBuffPush("xy", [N.Browser.scrollX(), N.Browser.scrollY(), document.documentElement.clientWidth / N.Browser.width(), Date.now()])
        }

        function c() {
            xe.circBuffPush("wn", [N.Browser.width(), N.Browser.height(), N.System.dpr(), Date.now()])
        }
        window.hcaptcha = {
            render: Hs.render,
            remove: Hs.remove,
            execute: Hs.execute,
            reset: Hs.reset,
            close: Hs.close,
            setData: Hs.setData,
            getResponse: Hs.getResponse,
            getRespKey: Hs.getRespKey
        }, se((function () {
            r || (! function () {
                var o;
                o = e ? [e] : document.getElementsByTagName("script");
                var r = -1,
                    a = !1,
                    l = null,
                    h = null;
                for (; ++r < o.length && !1 === a;) o[r] && o[r].src && (h = (l = o[r].src.split("?"))[0], /\/(hcaptcha|1\/api)\.js$/.test(h) && (a = o[r], h && -1 !== h.toLowerCase().indexOf("www.") && console.warn("[hCaptcha] JS API is being loaded from www.hcaptcha.com. Please use https://js.hcaptcha.com/1/api.js")));
                if (!1 === a) return;
                t = t || nt(l[1]), i = t.onload || !1, n = t.render || !1, "off" === t.tplinks && (s = "off");
                U.tplinks = s, U.language = t.hl || null, t.endpoint && (U.endpointOverride = t.endpoint);
                U.reportapi = t.reportapi || U.reportapi, U.imghost = t.imghost || null, U.custom = t.custom || U.custom, U.se = t.se || null, U.assethost = t.assethost || null, U.assethost && !pt.URL(U.assethost) && (U.assethost = null, console.error("Invalid assethost uri."));
                U.recaptchacompat = t.recaptchacompat || U.recaptchacompat, Z.host = t.host || window.location.hostname, U.language = U.language || window.navigator.userLanguage || window.navigator.language, Rt.setLocale(U.language), X(t.sentry === undefined || t.sentry), "off" === U.recaptchacompat ? console.log("recaptchacompat disabled") : window.grecaptcha = window.hcaptcha
            }(), function () {
                var t = Rt.getLocale();
                if (t.indexOf("en") >= 0) return;
                cs(t).then((function () {
                    Hs.nodes.each((function (e) {
                        if (e) try {
                            e.updateTranslation(t)
                        } catch (Os) {
                            tt("translation", Os)
                        }
                    }))
                }))["catch"]((function (e) {
                    tt("api", e, {
                        locale: t
                    })
                }))
            }(), !1 === n || "onload" === n ? function (t) {
                for (var e = document.getElementsByClassName("h-captcha"), i = [], n = 0; n < e.length; n++) i.push(e[n]);
                var s = [];
                if ("off" !== U.recaptchacompat)
                    for (var o = document.getElementsByClassName("g-recaptcha"), r = 0; r < o.length; r++) s.push(o[r]);
                for (var a = [].concat(i, s), l = 0; l < a.length; l++) t(a[l])
            }(Hs.render) : "explicit" !== n && console.log("hcaptcha: invalid render parameter '" + n + "', using 'explicit' instead."), i && setTimeout((function () {
                dt(i)
            }), 1), function () {
                try {
                    xe.record(), xe.setData("sc", N.Browser.getScreenDimensions()), xe.setData("nv", N.Browser.interrogateNavigator()), xe.setData("dr", document.referrer), c(), h()
                } catch (Os) {}
            }(), he.addEventListener("resize", a), he.addEventListener("scroll", l))
        }))
    }
    var Ms = window.location.hash.slice(1),
        Vs = nt(Ms).frame;
    window !== window.top ? "challenge" === Vs ? function () {
        var t = null,
            e = 0,
            i = null,
            n = null,
            s = null,
            o = [St.CHALLENGE_ALREADY_CLOSED, St.CHALLENGE_EXPIRED];
        window._sharedLibs = {
            packages: {
                config: {
                    Options: U,
                    Color: z
                },
                utils: {
                    MathUtil: ct,
                    Query: ot,
                    Sentry: it,
                    Render: V,
                    Color: H,
                    Shuffle: L,
                    JWT: M
                },
                canvas: {
                    Canvas: Ae,
                    Path: _e,
                    Segment: ke,
                    Point: Ce
                },
                constants: Lt,
                device: N,
                language: Rt,
                theme: qe,
                core: ce,
                ui: Ci
            }
        };
        var r = window.location.hash.slice(1),
            a = nt(r);

        function l(t) {
            null !== i && (clearTimeout(i), i = null), s.getInterface().lockState(!0), Sn().then((function (e) {
                return Dn.getTaskData(t, e)
            })).then((function (t) {
                return t.pass || !1 === t.success ? h(t) : (e = {
                    c: t.c,
                    rq: t.rq,
                    key: t.key,
                    challengeType: t.request_type
                }, e.challengeType ? (e.key && Ve.send("challenge-key", {
                    key: e.key
                }), s.create({
                    rq: e.rq
                }), e.c && En(e.c), Dn.loadBundle(e.challengeType).then((function (t) {
                    var i = Dn.getData();
                    return s.show({
                        width: Z.browserWidth,
                        height: Z.browserHeight,
                        bundle: t,
                        bundleData: i,
                        expiration: 1e3 * (i.expiration || 120),
                        challengeType: e.challengeType
                    })
                })).then((function (t) {
                    return new Promise((function (e) {
                        Promise.all([Sn(), Ve.contact("check-api")]).then((function (i) {
                            e({
                                answers: t,
                                proof: i[0],
                                motionData: i[1]
                            })
                        }))
                    }))
                })).then((function (t) {
                    xe.stop();
                    var e = t.answers,
                        i = t.proof,
                        n = xe.getData();
                    return n.topLevel = t.motionData, n.v = 1, Dn.checkAnswers(e, n, i)
                }))["catch"]((function (t) {
                    if (s.isVisible() || t && -1 === o.indexOf(t.message)) throw s.getInterface().lockState(!0), t
                }))) : Promise.resolve({
                    c: e.c,
                    skip: !0
                })).then(h);
                var e
            }))["catch"]((function (t) {
                var i = t instanceof Error ? {
                    event: At.CHALLENGE_ERROR,
                    message: t.message || ""
                } : t;
                Dn.logAction(i.event);
                var n = t.response && t.response["error-codes"],
                    s = n && -1 !== n.indexOf("invalid-data");
                et("challenge", "api", "debug", t), !s && (i.event === At.NETWORK_ERROR || i.event === At.CHALLENGE_ERROR || i.event === At.BUNDLE_ERROR) && e <= 2 ? (e += 1, c()) : (e > 2 && 0 !== t.status && 429 !== t.status && 403 !== t.status && 400 !== t.status && Q("api:getcaptcha failed", "error", "challenge", {
                    error: t
                }), e = 0, s && (i = {
                    event: At.NETWORK_ERROR,
                    message: (n || [""]).join(", ")
                }), Ve.send(St.CHALLENGE_CLOSED, i))
            }))
        }

        function h(t) {
            if (t.c && En(t.c), t.skip) Ve.send(St.CHALLENGE_CLOSED, {
                event: St.CHALLENGE_ESCAPED
            });
            else if (t.pass) Ve.send(St.CHALLENGE_CLOSED, {
                event: St.CHALLENGE_PASSED,
                response: t.generated_pass_UUID,
                expiration: t.expiration
            });
            else if (!1 === t.success) {
                var e = t["error-codes"] || [];
                if (-1 !== e.indexOf("expired-session") || -1 !== e.indexOf("client-fail")) return void c();
                Ve.send(St.CHALLENGE_CLOSED, {
                    event: At.NETWORK_ERROR,
                    message: (t["error-codes"] || [""]).join(", ")
                })
            } else s.getInterface().displayFail(!0), Dn.logAction("challenge-failed"), c()
        }

        function c() {
            if (Dn.isRqChl()) return s.getInterface().lockState(!0), void(i = setTimeout((function () {
                Ve.send(St.CHALLENGE_CLOSED, {
                    event: At.CHALLENGE_ERROR
                })
            }), 2e3));
            Ve.contact("getcaptcha-manifest").then((function (t) {
                l(t)
            }))
        }

        function u(t, e) {
            Z.browserWidth = t.width, Z.browserHeight = t.height, s.size(t.width, t.height).then((function (t) {
                e.resolve(t), et("challenge resized", "challenge", "info", t)
            }))
        }

        function d() {
            et("challenge refresh", "challenge", "info"), Dn.logAction("challenge-refresh"), c()
        }

        function p() {
            s.submit().then((function (t) {
                Dn.logAction(t), "challenge-skip" !== t || c()
            }))["catch"]((function (t) {
                Y(t), Dn.logAction(At.CHALLENGE_ERROR), c()
            }))
        }

        function f() {
            var t = Dn.getData();
            s.displayReport(t).then((function (t) {
                if (t) {
                    var e = function () {
                        d(), s.getModal().off("refresh", e)
                    };
                    s.getModal().display("report_image", {
                        key: t
                    }), s.getModal().on("refresh", e)
                }
            }))["catch"]((function (t) {
                Y(t), d()
            }))
        }
        a.sentry && it.init("challenge_internal"),
            function (e) {
                Z.host = e.host, Z.sitekey = e.sitekey, Z.file = "challenge", t = e.id, e.sentry !== undefined && "undefined" !== e.sentry && X(e.sentry), e.endpoint !== undefined && "undefined" !== e.endpoint && (U.endpoint = e.endpoint), e.reportapi !== undefined && "undefined" !== e.reportapi && (U.reportapi = e.reportapi), e.assethost !== undefined && "undefined" !== e.assethost && (pt.URL(e.assethost) ? U.assethost = e.assethost : console.error("Invalid assethost uri.")), e.imghost !== undefined && "undefined" !== e.imghost && (U.imghost = e.imghost), e.hl !== undefined && "undefined" !== e.hl && (U.language = e.hl, Rt.setLocale(U.language)), e.se !== undefined && "undefined" !== e.se && (U.se = e.se), U.theme = e.theme || U.theme, e.themeConfig && (U.themeConfig = e.themeConfig)
            }(a), s = new wn(document.body, {
                host: Z.host,
                sitekey: Z.sitekey
            }), U.themeConfig && s.addTheme("custom", U.themeConfig), Ve.init(t), n = new kt(document.body), Ve.answer("create-challenge", (function (t) {
                var e = {};
                if (t) {
                    Dn.setRqData(t.rqdata || Dn.getRqData()), t.wdata && An(t.wdata), t.width && (Z.browserWidth = t.width, Z.browserHeight = t.height), t.manifest && (e = t.manifest), s.setFocus("info"), "enter" === t.action ? n.addClass("using-kb") : n.hasClass("using-kb") && n.removeClass("using-kb");
                    var i = t.charity && !0 === t.charity;
                    s.getInterface().setupLogo(i, t.link), t.a11yChallenge && s.getInterface().setA11yChallenge(t.a11yChallenge)
                }
                N.System.mobile && s.setFocus("info"), l(e)
            })), Ve.answer("close-challenge", (function (t) {
                null !== i && (clearTimeout(i), i = null), t && t.event === St.CHALLENGE_ESCAPED && Dn.logAction("challenge-abandon-retry"), Dn.setRqData(null), s.close()
            })), Ve.answer("resize-challenge", u), Ve.answer("challenge-translate", (function (t) {
                s.translateInterface(t), s.isVisible() && ("en" !== t.locale ? (Dn.logAction("challenge-language-change"), c()) : s.translateBundle())
            })), Ve.answer("challenge-update", (function (t, e) {
                var i = t.siteConfig;
                t.wdata && An(t.wdata), i.endpoint && (U.endpoint = i.endpoint), s.getInterface().setWhiteLabelEnabled(!!i.custom), i.c && En(i.c);
                var n = i && i.features && i.features.custom_theme;
                U.themeConfig && n ? s.useTheme("custom") : s.useTheme(U.theme), e.resolve()
            })), Ve.contact("get-url").then((function (t) {
                Z.url = t
            })), Ve.answer("challenge-data", (function (t) {
                t.rqdata && Dn.setRqData(t.rqdata)
            })), s.getInterface().on("refresh", d), s.getInterface().on("submit", p), s.getInterface().on("report", f), s.getModal().on("report", (function (t) {
                Dn.reportIssue(t.reason, t.comment, t.key)["catch"]((function (t) {}))
            })), s.getContainer().on("resize", (function () {
                Ve.send("challenge-resize")
            })), s.getContainer().on("focus-check", (function () {
                n.addClass("using-kb"), s.triggerFocus("submit")
            })), n.addEventListener("down", (function (t) {
                s.getInterface().isLocked() || s.getInterface().displayFail(!1)
            })), n.addEventListener("keydown", (function (t) {
                27 === t.keyNum && (s.getModal().isOpen() ? (s.getModal().close(), s.hideReport()) : (Ve.send(St.CHALLENGE_CLOSED, {
                    event: St.CHALLENGE_ESCAPED
                }), s.close()))
            })), n.addEventListener("down", (function () {
                document.activeElement !== s.getInterface().btn.info.dom && n.hasClass("using-kb") && n.removeClass("using-kb")
            }), !0), n.addEventListener("keydown", (function (t) {
                9 === t.keyNum && (n.addClass("using-kb"), t.shiftKey || document.activeElement === s.getInterface().btn.submit.getElement() && (s.triggerFocus("challenge", 0), t.preventDefault && t.preventDefault()))
            }), !0), n.addEventListener("keydown", (function (t) {
                if (document.activeElement === s.getInterface().btn.submit.getElement()) {
                    var e = t.keyNum;
                    37 === e || 38 === e ? (n.addClass("using-kb"), s.triggerFocus("challenge", -1), t.preventDefault && t.preventDefault()) : 39 !== e && 40 !== e || (n.addClass("using-kb"), s.triggerFocus("challenge", 0), t.preventDefault && t.preventDefault())
                }
            })), Ve.send("challenge-loaded")
    }() : "checkbox" === Vs ? function () {
        var t = !1,
            e = !1,
            i = window.location.hash.slice(1),
            n = nt(i),
            s = Me.createChat(window.parent, n.id);
        ! function (t) {
            Z.id = t.id, Z.host = t.host, Z.sitekey = t.sitekey, Z.file = "checkbox", U.size = t.size || U.compact, U.custom = t.custom || U.custom, U.se = t.se || null, t.endpoint !== undefined && "undefined" !== t.endpoint && (U.endpoint = t.endpoint), t.assethost !== undefined && "undefined" !== t.assethost && (pt.URL(t.assethost) ? U.assethost = t.assethost : console.error("Invalid assethost uri.")), t.imghost !== undefined && "undefined" !== t.imghost && (U.imghost = t.imghost), t.hl !== undefined && "undefined" !== t.hl && (U.language = t.hl, Rt.setLocale(t.hl)), t.tplinks !== undefined && "undefined" !== t.tplinks && (U.tplinks = t.tplinks), U.theme = t.theme || U.theme, U.themeConfig = t.themeConfig, U.themeConfig && (t.custom = !0)
        }(n), n.sentry && it.init("checkbox_internal");
        var o, r = null,
            a = new Promise((function (t) {
                o = t
            }));
        ! function (t, e) {
            e.listen("checkbox-tick", (function () {
                t.then((function (t) {
                    t.tick()
                }))
            })), e.listen("checkbox-translate", (function (e) {
                try {
                    if (!e || !e.locale || !e.table) return;
                    Rt.setLocale(e.locale), Rt.addTable(e.locale, e.table), t.then((function (t) {
                        t.translate()
                    })), document.documentElement.setAttribute("lang", Rt.getLocale())
                } catch (Os) {
                    tt("translation", Os)
                }
            })), e.listen("checkbox-status", (function (e) {
                t.then((function (t) {
                    t.setStatus(e.text, e.a11yOnly)
                }))
            })), e.listen("checkbox-reset", (function () {
                t.then((function (t) {
                    t.reset(), xe.resetData(), xe.record()
                }))
            })), e.listen("checkbox-clear", (function () {
                t.then((function (t) {
                    t.setLoading(!1)
                }))
            })), e.listen("checkbox-location", (function (e) {
                t.then((function (t) {
                    var i = t.getLocation();
                    e.resolve(i)
                }))
            }))
        }(a, s);
        var l = function c() {
            var i, n, s, o, r, a = ds.dummykey(Z.sitekey);
            if ("localhost" === Z.host && !a) {
                var l = "Warning: localhost detected. Please use a valid host.";
                return console.error(l), Promise.reject(new Error(l))
            }
            return (i = Z.sitekey, n = Z.host, s = {
                attempts: 3,
                delay: 5e3,
                onFail: function (t) {
                    return et("checkbox", "api", "debug", t), !t || 0 !== t.status || "https://hcaptcha.com" !== U.endpoint && "https://cloudflare.hcaptcha.com" !== U.endpoint ? (Q("api:checksiteconfig failed", "error", "checkbox", {
                        error: t
                    }), t instanceof Error || 400 === t.status) : (U.endpoint = "https://api.hcaptcha.com", !0)
                }
            }, o = N.Browser.supportsCanvas() >>> 0, r = N.Browser.supportsWebAssembly() >>> 0, new Promise((function (t, e) {
                var a = {
                    v: "1f7dc62",
                    host: n,
                    sitekey: i,
                    sc: o,
                    swa: r
                };
                U.se && (a.se = U.se), Zt({
                    url: function () {
                        return U.endpoint + "/checksiteconfig?" + st(a)
                    },
                    responseType: "json",
                    withCredentials: !0,
                    timeout: 5e3,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "text/plain"
                    },
                    retry: s
                }).then((function (i) {
                    var n = i.body || null;
                    if (n)
                        if (!1 === n.success) {
                            var s = (n["error-codes"] || []).join(", ");
                            e(new Error(s))
                        } else !n.pass && n.error ? e(new Error(n.error)) : t(n);
                    else e(new Error("Missing response body."))
                }))["catch"](e)
            }))).then((function (i) {
                return et("/checksiteconfig success", "request", "info", i), !U.endpointOverride && i.endpoint ? (U.endpoint = U.endpointOverride = i.endpoint, c()) : (i.endpoint = i.endpoint || U.endpointOverride || U.endpoint, i.charity && (t = i.charity), i.features && (e = i.features.a11y_challenge), i)
            }))
        }().then((function (t) {
            var e = t && t.features;
            return e && (U.a11yChallenge = e.a11y_challenge), s.send("checkbox-setup", t), t
        }));

        function h(i, n) {
            var s = ds.sitekey(Z.sitekey),
                o = ds.dummykey(Z.sitekey),
                r = {
                    host: Z.host,
                    sitekey: Z.sitekey,
                    size: U.size,
                    theme: U.theme,
                    linksOff: "off" === U.tplinks,
                    displayLogo: "invisible" !== U.size,
                    logo: null,
                    logoUrl: null,
                    privacyUrl: null,
                    termsUrl: null
                },
                l = i && i.custom;
            if (l) {
                r.logo = l.logo, l.links && (r.logoUrl = l.links.logo, r.privacyUrl = l.links.privacy, r.termsUrl = l.links.terms);
                var h = l.copy;
                if (h) {
                    var c = {
                        checkbox_prompt: "I am human",
                        checkbox_a11y: "hCaptcha checkbox. Select in order to trigger the challenge, or to bypass it if you have an accessibility cookie."
                    };
                    for (var u in c) {
                        var d = h[u];
                        for (var p in d) {
                            var f = {};
                            f[c[u]] = d[p], Rt.addTable(p, f)
                        }
                    }
                    a.then((function (t) {
                        t.translate()
                    }))
                }
            }
            var m = new hs(document.body, r),
                y = i && i.features && i.features.custom_theme;
            return U.themeConfig && y ? m.theme("custom", U.themeConfig) : m.theme(U.theme), m.setStatus(!1), s || o ? o && m.setWarning("This hCaptcha is for testing only. Please contact the site admin if you see this.") : m.setWarning("The sitekey for this hCaptcha is incorrect. Please contact the site admin if you see this."), m.on("select", (function (i) {
                m.setStatus(!1), setTimeout((function () {
                    n.send("checkbox-selected", {
                        manifest: xe.getData(),
                        charity: t,
                        a11yChallenge: e,
                        link: m.getLogoUrl(),
                        action: i
                    })
                }), 1)
            })), m
        }
        n.custom || (r = h(null, s), o(r)), Promise.allSettled([l]).then((function (t) {
            var e = t[0].status,
                i = t[0].value,
                n = t[0].reason;
            r || (r = h("fulfilled" === e ? i : {}, s), o(r)), xe.resetData(), xe.record(!0, !0, !0, !0), s.send("checkbox-loaded", r.getLocation()), "rejected" === e && (r.setStatus(n.message), s.send(St.CHALLENGE_CLOSED, n))
        }))
    }() : Bs() : Bs()
}();