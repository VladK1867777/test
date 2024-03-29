/*! For license information please see npm-async-468f739d.e7fdc1cf4444a421953d.js.LICENSE.txt */
(self.__LOADABLE_LOADED_CHUNKS__ = self.__LOADABLE_LOADED_CHUNKS__ || []).push([[8400], {
    57525: (e,t,n)=>{
        var o;
        Object.create || (Object.create = function() {
            function e() {}
            return function(t) {
                if (1 != arguments.length)
                    throw new Error("Object.create implementation only accepts one parameter.");
                return e.prototype = t,
                new e
            }
        }()),
        Object.keys || (Object.keys = function(e, t, n) {
            for (t in n = [],
            e)
                n.hasOwnProperty.call(e, t) && n.push(t);
            return n
        }
        ),
        Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
            for (var t = 0; t < this.length; t++)
                if (this[t] === e)
                    return t;
            return -1
        }
        ),
        Array.prototype.forEach || (Array.prototype.forEach = function(e) {
            if (null == this)
                throw new TypeError;
            var t = Object(this)
              , n = t.length >>> 0;
            if ("function" != typeof e)
                throw new TypeError;
            for (var o = arguments.length >= 2 ? arguments[1] : void 0, i = 0; i < n; i++)
                i in t && e.call(o, t[i], i, t);
            return this
        }
        ),
        Array.prototype.filter || (Array.prototype.filter = function(e, t) {
            var n = [];
            return this.forEach((function(o, i, r) {
                e.call(t || void 0, o, i, r) && n.push(o)
            }
            )),
            n
        }
        ),
        Array.prototype.map || (Array.prototype.map = function(e, t) {
            var n = [];
            return this.forEach((function(o, i, r) {
                n.push(e.call(t || void 0, o, i, r))
            }
            )),
            n
        }
        ),
        Array.isArray || (Array.isArray = function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }
        ),
        "object" != typeof window || "object" != typeof window.location || window.location.assign || (window.location.assign = function(e) {
            window.location = e
        }
        ),
        Function.prototype.bind || (Function.prototype.bind = function(e) {
            if ("function" != typeof this)
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            function t() {}
            var n = [].slice
              , o = n.call(arguments, 1)
              , i = this
              , r = function() {
                return i.apply(this instanceof t ? this : e || window, o.concat(n.call(arguments)))
            };
            return t.prototype = this.prototype,
            r.prototype = new t,
            r
        }
        );
        var i = function(e) {
            return i.use(e)
        };
        i.utils = {
            extend: function(e) {
                return Array.prototype.slice.call(arguments, 1).forEach((function(t) {
                    if (Array.isArray(e) && Array.isArray(t))
                        Array.prototype.push.apply(e, t);
                    else if (e && (e instanceof Object || "object" == typeof e) && t && (t instanceof Object || "object" == typeof t) && e !== t)
                        for (var n in t)
                            "__proto__" !== n && "constructor" !== n && (e[n] = i.utils.extend(e[n], t[n]));
                    else
                        Array.isArray(t) && (t = t.slice(0)),
                        e = t
                }
                )),
                e
            }
        },
        i.utils.extend(i, {
            settings: {
                redirect_uri: window.location.href.split("#")[0],
                response_type: "token",
                display: "popup",
                state: "",
                oauth_proxy: "https://auth-server.herokuapp.com/proxy",
                timeout: 2e4,
                popup: {
                    resizable: 1,
                    scrollbars: 1,
                    width: 500,
                    height: 550
                },
                scope: ["basic"],
                scope_map: {
                    basic: ""
                },
                default_service: null,
                force: null,
                page_uri: window.location.href
            },
            services: {},
            use: function(e) {
                var t = Object.create(this);
                return t.settings = Object.create(this.settings),
                e && (t.settings.default_service = e),
                t.utils.Event.call(t),
                t
            },
            init: function(e, t) {
                var n = this.utils;
                if (!e)
                    return this.services;
                for (var o in e)
                    e.hasOwnProperty(o) && "object" != typeof e[o] && (e[o] = {
                        id: e[o]
                    });
                return n.extend(this.services, e),
                t && (n.extend(this.settings, t),
                "redirect_uri"in t && (this.settings.redirect_uri = n.url(t.redirect_uri).href)),
                this
            },
            login: function() {
                var e, t = this, n = t.utils, o = n.error, r = n.Promise(), a = n.args({
                    network: "s",
                    options: "o",
                    callback: "f"
                }, arguments), s = n.diffKey(a.options, t.settings), l = a.options = n.merge(t.settings, a.options || {});
                function u(e, t) {
                    i.emit(e, t)
                }
                if (l.popup = n.merge(t.settings.popup, a.options.popup || {}),
                a.network = a.network || t.settings.default_service,
                r.proxy.then(a.callback, a.callback),
                r.proxy.then(u.bind(this, "auth.login auth"), u.bind(this, "auth.failed auth")),
                "string" != typeof a.network || !(a.network in t.services))
                    return r.reject(o("invalid_network", "The provided network was not recognized"));
                var c = t.services[a.network]
                  , d = n.globalEvent((function(e) {
                    e ? "string" == typeof e && (e = JSON.parse(e)) : e = o("cancelled", "The authentication was not completed"),
                    e.error ? r.reject(e) : (n.store(e.network, e),
                    r.fulfill({
                        network: e.network,
                        authResponse: e
                    }))
                }
                ))
                  , f = n.url(l.redirect_uri).href
                  , p = c.oauth.response_type || l.response_type;
                /\bcode\b/.test(p) && !c.oauth.grant && (p = p.replace(/\bcode\b/, "token")),
                a.qs = n.merge(s, {
                    client_id: encodeURIComponent(c.id),
                    response_type: encodeURIComponent(p),
                    redirect_uri: encodeURIComponent(f),
                    state: {
                        client_id: c.id,
                        network: a.network,
                        display: l.display,
                        callback: d,
                        state: l.state,
                        redirect_uri: f
                    }
                });
                var m = n.store(a.network)
                  , h = /[,\s]+/
                  , g = t.settings.scope ? [t.settings.scope.toString()] : []
                  , v = n.merge(t.settings.scope_map, c.scope || {});
                if (l.scope && g.push(l.scope.toString()),
                m && "scope"in m && m.scope instanceof String && g.push(m.scope),
                g = g.join(",").split(h),
                g = n.unique(g).filter(b),
                a.qs.state.scope = g.join(","),
                g = (g = g.map((function(e) {
                    return e in v ? v[e] : e
                }
                ))).join(",").split(h),
                g = n.unique(g).filter(b),
                a.qs.scope = g.join(c.scope_delim || ","),
                !1 === l.force && m && "access_token"in m && m.access_token && "expires"in m && m.expires > (new Date).getTime() / 1e3 && 0 === n.diff((m.scope || "").split(h), (a.qs.state.scope || "").split(h)).length)
                    return r.fulfill({
                        unchanged: !0,
                        network: a.network,
                        authResponse: m
                    }),
                    r;
                if ("page" === l.display && l.page_uri && (a.qs.state.page_uri = n.url(l.page_uri).href),
                "login"in c && "function" == typeof c.login && c.login(a),
                (!/\btoken\b/.test(p) || parseInt(c.oauth.version, 10) < 2 || "none" === l.display && c.oauth.grant && m && m.refresh_token) && (a.qs.state.oauth = c.oauth,
                a.qs.state.oauth_proxy = l.oauth_proxy),
                a.qs.state = encodeURIComponent(JSON.stringify(a.qs.state)),
                1 === parseInt(c.oauth.version, 10) ? e = n.qs(l.oauth_proxy, a.qs, _) : "none" === l.display && c.oauth.grant && m && m.refresh_token ? (a.qs.refresh_token = m.refresh_token,
                e = n.qs(l.oauth_proxy, a.qs, _)) : e = n.qs(c.oauth.auth, a.qs, _),
                u("auth.init", a),
                "none" === l.display)
                    n.iframe(e, f);
                else if ("popup" === l.display)
                    var y = n.popup(e, f, l.popup)
                      , w = setInterval((function() {
                        if ((!y || y.closed) && (clearInterval(w),
                        !r.state)) {
                            var e = o("cancelled", "Login has been cancelled");
                            y || (e = o("blocked", "Popup was blocked")),
                            e.network = a.network,
                            r.reject(e)
                        }
                    }
                    ), 100);
                else
                    window.location = e;
                return r.proxy;
                function _(e) {
                    return e
                }
                function b(e) {
                    return !!e
                }
            },
            logout: function() {
                var e = this
                  , t = e.utils
                  , n = t.error
                  , o = t.Promise()
                  , r = t.args({
                    name: "s",
                    options: "o",
                    callback: "f"
                }, arguments);
                function a(e, t) {
                    i.emit(e, t)
                }
                if (r.options = r.options || {},
                o.proxy.then(r.callback, r.callback),
                o.proxy.then(a.bind(this, "auth.logout auth"), a.bind(this, "error")),
                r.name = r.name || this.settings.default_service,
                r.authResponse = t.store(r.name),
                r.name && !(r.name in e.services))
                    o.reject(n("invalid_network", "The network was unrecognized"));
                else if (r.name && r.authResponse) {
                    var s = function(e) {
                        t.store(r.name, null),
                        o.fulfill(i.utils.merge({
                            network: r.name
                        }, e || {}))
                    }
                      , l = {};
                    if (r.options.force) {
                        var u = e.services[r.name].logout;
                        if (u)
                            if ("function" == typeof u && (u = u(s, r)),
                            "string" == typeof u)
                                t.iframe(u),
                                l.force = null,
                                l.message = "Logout success on providers site was indeterminate";
                            else if (void 0 === u)
                                return o.proxy
                    }
                    s(l)
                } else
                    o.reject(n("invalid_session", "There was no session to remove"));
                return o.proxy
            },
            getAuthResponse: function(e) {
                return (e = e || this.settings.default_service) && e in this.services && this.utils.store(e) || null
            },
            events: {}
        }),
        i.utils.extend(i.utils, {
            error: function(e, t) {
                return {
                    error: {
                        code: e,
                        message: t
                    }
                }
            },
            qs: function(e, t, n) {
                if (t)
                    for (var o in n = n || encodeURIComponent,
                    t) {
                        var i = new RegExp("([\\?\\&])" + o + "=[^\\&]*");
                        e.match(i) && (e = e.replace(i, "$1" + o + "=" + n(t[o])),
                        delete t[o])
                    }
                return this.isEmpty(t) ? e : e + (e.indexOf("?") > -1 ? "&" : "?") + this.param(t, n)
            },
            param: function(e, t) {
                var n, o, i = {};
                if ("string" == typeof e) {
                    if (t = t || decodeURIComponent,
                    o = e.replace(/^[\#\?]/, "").match(/([^=\/\&]+)=([^\&]+)/g))
                        for (var r = 0; r < o.length; r++)
                            i[(n = o[r].match(/([^=]+)=(.*)/))[1]] = t(n[2]);
                    return i
                }
                t = t || encodeURIComponent;
                var a = e;
                for (var s in i = [],
                a)
                    a.hasOwnProperty(s) && a.hasOwnProperty(s) && i.push([s, "?" === a[s] ? "?" : t(a[s])].join("="));
                return i.join("&")
            },
            store: function() {
                for (var e, t = ["localStorage", "sessionStorage"], n = -1, o = "test"; t[++n]; )
                    try {
                        (e = window[t[n]]).setItem(o + n, n),
                        e.removeItem(o + n);
                        break
                    } catch (t) {
                        e = null
                    }
                if (!e) {
                    var i = null;
                    e = {
                        getItem: function(e) {
                            e += "=";
                            for (var t = document.cookie.split(";"), n = 0; n < t.length; n++) {
                                var o = t[n].replace(/(^\s+|\s+$)/, "");
                                if (o && 0 === o.indexOf(e))
                                    return o.substr(e.length)
                            }
                            return i
                        },
                        setItem: function(e, t) {
                            i = t,
                            document.cookie = e + "=" + t
                        }
                    },
                    i = e.getItem("hello")
                }
                return function(t, n, o) {
                    var i = function() {
                        var t = {};
                        try {
                            t = JSON.parse(e.getItem("hello")) || {}
                        } catch (e) {}
                        return t
                    }();
                    if (t && void 0 === n)
                        return i[t] || null;
                    if (t && null === n)
                        try {
                            delete i[t]
                        } catch (e) {
                            i[t] = null
                        }
                    else {
                        if (!t)
                            return i;
                        i[t] = n
                    }
                    return function(t) {
                        e.setItem("hello", JSON.stringify(t))
                    }(i),
                    i || null
                }
            }(),
            append: function(e, t, n) {
                var o = "string" == typeof e ? document.createElement(e) : e;
                if ("object" == typeof t)
                    if ("tagName"in t)
                        n = t;
                    else
                        for (var i in t)
                            if (t.hasOwnProperty(i))
                                if ("object" == typeof t[i])
                                    for (var r in t[i])
                                        t[i].hasOwnProperty(r) && (o[i][r] = t[i][r]);
                                else
                                    "html" === i ? o.innerHTML = t[i] : /^on/.test(i) ? o[i] = t[i] : o.setAttribute(i, t[i]);
                return "body" === n ? function e() {
                    document.body ? document.body.appendChild(o) : setTimeout(e, 16)
                }() : "object" == typeof n ? n.appendChild(o) : "string" == typeof n && document.getElementsByTagName(n)[0].appendChild(o),
                o
            },
            iframe: function(e) {
                this.append("iframe", {
                    src: e,
                    style: {
                        position: "absolute",
                        left: "-1000px",
                        bottom: 0,
                        height: "1px",
                        width: "1px"
                    }
                }, "body")
            },
            merge: function() {
                var e = Array.prototype.slice.call(arguments);
                return e.unshift({}),
                this.extend.apply(null, e)
            },
            args: function(e, t) {
                var n = {}
                  , o = 0
                  , i = null
                  , r = null;
                for (r in e)
                    if (e.hasOwnProperty(r))
                        break;
                if (1 === t.length && "object" == typeof t[0] && "o!" != e[r])
                    for (r in t[0])
                        if (e.hasOwnProperty(r) && r in e)
                            return t[0];
                for (r in e)
                    if (e.hasOwnProperty(r))
                        if (i = typeof t[o],
                        "function" == typeof e[r] && e[r].test(t[o]) || "string" == typeof e[r] && (e[r].indexOf("s") > -1 && "string" === i || e[r].indexOf("o") > -1 && "object" === i || e[r].indexOf("i") > -1 && "number" === i || e[r].indexOf("a") > -1 && "object" === i || e[r].indexOf("f") > -1 && "function" === i))
                            n[r] = t[o++];
                        else if ("string" == typeof e[r] && e[r].indexOf("!") > -1)
                            return !1;
                return n
            },
            url: function(e) {
                if (e) {
                    if (window.URL && URL instanceof Function && 0 !== URL.length)
                        return new URL(e,window.location);
                    var t = document.createElement("a");
                    return t.href = e,
                    t.cloneNode(!1)
                }
                return window.location
            },
            diff: function(e, t) {
                return t.filter((function(t) {
                    return -1 === e.indexOf(t)
                }
                ))
            },
            diffKey: function(e, t) {
                if (e || !t) {
                    var n = {};
                    for (var o in e)
                        o in t || (n[o] = e[o]);
                    return n
                }
                return e
            },
            unique: function(e) {
                return Array.isArray(e) ? e.filter((function(t, n) {
                    return e.indexOf(t) === n
                }
                )) : []
            },
            isEmpty: function(e) {
                if (!e)
                    return !0;
                if (Array.isArray(e))
                    return !e.length;
                if ("object" == typeof e)
                    for (var t in e)
                        if (e.hasOwnProperty(t))
                            return !1;
                return !0
            },
            Promise: function() {
                var e = function(t) {
                    if (!(this instanceof e))
                        return new e(t);
                    this.id = "Thenable/1.0.6",
                    this.state = 0,
                    this.fulfillValue = void 0,
                    this.rejectReason = void 0,
                    this.onFulfilled = [],
                    this.onRejected = [],
                    this.proxy = {
                        then: this.then.bind(this)
                    },
                    "function" == typeof t && t.call(this, this.fulfill.bind(this), this.reject.bind(this))
                };
                e.prototype = {
                    fulfill: function(e) {
                        return t(this, 1, "fulfillValue", e)
                    },
                    reject: function(e) {
                        return t(this, 2, "rejectReason", e)
                    },
                    then: function(t, o) {
                        var r = this
                          , a = new e;
                        return r.onFulfilled.push(i(t, a, "fulfill")),
                        r.onRejected.push(i(o, a, "reject")),
                        n(r),
                        a.proxy
                    }
                };
                var t = function(e, t, o, i) {
                    return 0 === e.state && (e.state = t,
                    e[o] = i,
                    n(e)),
                    e
                }
                  , n = function(e) {
                    1 === e.state ? o(e, "onFulfilled", e.fulfillValue) : 2 === e.state && o(e, "onRejected", e.rejectReason)
                }
                  , o = function(e, t, n) {
                    if (0 !== e[t].length) {
                        var o = e[t];
                        e[t] = [];
                        var i = function() {
                            for (var e = 0; e < o.length; e++)
                                o[e](n)
                        };
                        "object" == typeof process && "function" == typeof process.nextTick ? process.nextTick(i) : "function" == typeof setImmediate ? setImmediate(i) : setTimeout(i, 0)
                    }
                }
                  , i = function(e, t, n) {
                    return function(o) {
                        if ("function" != typeof e)
                            t[n].call(t, o);
                        else {
                            var i;
                            try {
                                i = e(o)
                            } catch (e) {
                                return void t.reject(e)
                            }
                            r(t, i)
                        }
                    }
                }
                  , r = function(e, t) {
                    if (e !== t && e.proxy !== t) {
                        var n;
                        if ("object" == typeof t && null !== t || "function" == typeof t)
                            try {
                                n = t.then
                            } catch (t) {
                                return void e.reject(t)
                            }
                        if ("function" != typeof n)
                            e.fulfill(t);
                        else {
                            var o = !1;
                            try {
                                n.call(t, (function(n) {
                                    o || (o = !0,
                                    n === t ? e.reject(new TypeError("circular thenable chain")) : r(e, n))
                                }
                                ), (function(t) {
                                    o || (o = !0,
                                    e.reject(t))
                                }
                                ))
                            } catch (t) {
                                o || e.reject(t)
                            }
                        }
                    } else
                        e.reject(new TypeError("cannot resolve promise with itself"))
                };
                return e
            }(),
            Event: function() {
                var e = /[\s\,]+/;
                return this.parent = {
                    events: this.events,
                    findEvents: this.findEvents,
                    parent: this.parent,
                    utils: this.utils
                },
                this.events = {},
                this.on = function(t, n) {
                    if (n && "function" == typeof n)
                        for (var o = t.split(e), i = 0; i < o.length; i++)
                            this.events[o[i]] = [n].concat(this.events[o[i]] || []);
                    return this
                }
                ,
                this.off = function(e, t) {
                    return this.findEvents(e, (function(e, n) {
                        t && this.events[e][n] !== t || (this.events[e][n] = null)
                    }
                    )),
                    this
                }
                ,
                this.emit = function(e) {
                    var t = Array.prototype.slice.call(arguments, 1);
                    t.push(e);
                    for (var n = function(n, o) {
                        t[t.length - 1] = "*" === n ? e : n,
                        this.events[n][o].apply(this, t)
                    }, o = this; o && o.findEvents; )
                        o.findEvents(e + ",*", n),
                        o = o.parent;
                    return this
                }
                ,
                this.emitAfter = function() {
                    var e = this
                      , t = arguments;
                    return setTimeout((function() {
                        e.emit.apply(e, t)
                    }
                    ), 0),
                    this
                }
                ,
                this.findEvents = function(t, n) {
                    var o = t.split(e);
                    for (var i in this.events)
                        if (this.events.hasOwnProperty(i) && o.indexOf(i) > -1)
                            for (var r = 0; r < this.events[i].length; r++)
                                this.events[i][r] && n.call(this, i, r)
                }
                ,
                this
            },
            globalEvent: function(e, t) {
                return t = t || "_hellojs_" + parseInt(1e12 * Math.random(), 10).toString(36),
                window[t] = function() {
                    try {
                        e.apply(this, arguments) && delete window[t]
                    } catch (e) {
                        console.error(e)
                    }
                }
                ,
                t
            },
            popup: function(e, t, n) {
                var o = document.documentElement;
                if (n.height && void 0 === n.top) {
                    var i = void 0 !== window.screenTop ? window.screenTop : screen.top
                      , r = screen.height || window.innerHeight || o.clientHeight;
                    n.top = parseInt((r - n.height) / 2, 10) + i
                }
                if (n.width && void 0 === n.left) {
                    var a = void 0 !== window.screenLeft ? window.screenLeft : screen.left
                      , s = screen.width || window.innerWidth || o.clientWidth;
                    n.left = parseInt((s - n.width) / 2, 10) + a
                }
                var l = [];
                Object.keys(n).forEach((function(e) {
                    var t = n[e];
                    l.push(e + (null !== t ? "=" + t : ""))
                }
                )),
                -1 !== navigator.userAgent.indexOf("Safari") && -1 === navigator.userAgent.indexOf("Chrome") && (e = t + "#oauth_redirect=" + encodeURIComponent(encodeURIComponent(e)));
                var u = window.open(e, "_blank", l.join(","));
                return u && u.focus && u.focus(),
                u
            },
            responseHandler: function(e, t) {
                var n, o = this, i = e.location;
                if ((n = o.param(i.search)) && n.state && (n.code || n.oauth_token))
                    try {
                        var r = JSON.parse(n.state);
                        n.redirect_uri = r.redirect_uri || i.href.replace(/[\?\#].*$/, "");
                        var a = o.qs(r.oauth_proxy, n);
                        return void (f(a) && i.assign(a))
                    } catch (e) {
                        return void console.error("Could not decode state parameter", e)
                    }
                if ((n = o.merge(o.param(i.search || ""), o.param(i.hash || ""))) && "state"in n) {
                    try {
                        var s = JSON.parse(n.state);
                        o.extend(n, s)
                    } catch (e) {
                        var l = decodeURIComponent(n.state);
                        try {
                            var u = JSON.parse(l);
                            o.extend(n, u)
                        } catch (e) {
                            console.error("Could not decode state parameter")
                        }
                    }
                    if ("access_token"in n && n.access_token && n.network)
                        n.expires_in && 0 !== parseInt(n.expires_in, 10) || (n.expires_in = 0),
                        n.expires_in = parseInt(n.expires_in, 10),
                        n.expires = (new Date).getTime() / 1e3 + (n.expires_in || 31536e3),
                        p(n, 0, t);
                    else if ("error"in n && n.error && n.network)
                        n.error = {
                            code: n.error,
                            message: n.error_message || n.error_description
                        },
                        p(n, 0, t);
                    else if (n.callback && n.callback in t) {
                        var c = !(!("result"in n) || !n.result) && JSON.parse(n.result);
                        m(t, n.callback)(c),
                        h()
                    }
                    n.page_uri && f(n.page_uri) && i.assign(n.page_uri)
                } else if ("oauth_redirect"in n) {
                    var d = decodeURIComponent(n.oauth_redirect);
                    return void (f(d) && i.assign(d))
                }
                function f(t) {
                    return /^https?:/.test(t) && (!Object.prototype.hasOwnProperty.call(e, "HELLOJS_REDIRECT_URL") || t.match(e.HELLOJS_REDIRECT_URL))
                }
                function p(e, t, n) {
                    var i = e.callback
                      , r = e.network;
                    if (o.store(r, e),
                    !("display"in e) || "page" !== e.display) {
                        if (n && i && i in n) {
                            try {
                                delete e.callback
                            } catch (e) {}
                            o.store(r, e);
                            var a = JSON.stringify(e);
                            try {
                                m(n, i)(a)
                            } catch (e) {}
                        }
                        h()
                    }
                }
                function m(e, t) {
                    return 0 !== t.indexOf("_hellojs_") ? function() {
                        throw "Could not execute callback " + t
                    }
                    : e[t]
                }
                function h() {
                    if (e.frameElement)
                        t.document.body.removeChild(e.frameElement);
                    else {
                        try {
                            e.close()
                        } catch (e) {}
                        e.addEventListener && e.addEventListener("load", (function() {
                            e.close()
                        }
                        ))
                    }
                }
            }
        }),
        i.utils.Event.call(i),
        function(e) {
            var t = {}
              , n = {};
            e.on("auth.login, auth.logout", (function(n) {
                n && "object" == typeof n && n.network && (t[n.network] = e.utils.store(n.network) || {})
            }
            )),
            function o() {
                var i = (new Date).getTime() / 1e3
                  , r = function(t) {
                    e.emit("auth." + t, {
                        network: a,
                        authResponse: s
                    })
                };
                for (var a in e.services)
                    if (e.services.hasOwnProperty(a)) {
                        if (!e.services[a].id)
                            continue;
                        var s = e.utils.store(a) || {}
                          , l = e.services[a]
                          , u = t[a] || {};
                        if (s && "callback"in s) {
                            var c = s.callback;
                            try {
                                delete s.callback
                            } catch (e) {}
                            e.utils.store(a, s);
                            try {
                                window[c](s)
                            } catch (e) {}
                        }
                        if (s && "expires"in s && s.expires < i) {
                            var d = l.refresh || s.refresh_token;
                            d && (!(a in n) || n[a] < i) ? (e.emit("notice", a + " has expired trying to resignin"),
                            e.login(a, {
                                display: "none",
                                force: !1
                            }),
                            n[a] = i + 600) : d || a in n || (r("expired"),
                            n[a] = !0);
                            continue
                        }
                        if (u.access_token === s.access_token && u.expires === s.expires)
                            continue;
                        !s.access_token && u.access_token ? r("logout") : s.access_token && !u.access_token ? r("login") : s.expires !== u.expires && r("update"),
                        t[a] = s,
                        a in n && delete n[a]
                    }
                setTimeout(o, 1e3)
            }()
        }(i),
        i.api = function() {
            var e = this
              , t = e.utils
              , n = t.error
              , o = t.Promise()
              , i = t.args({
                path: "s!",
                query: "o",
                method: "s",
                data: "o",
                timeout: "i",
                callback: "f"
            }, arguments);
            i.method = (i.method || "get").toLowerCase(),
            i.headers = i.headers || {},
            i.query = i.query || {},
            "get" !== i.method && "delete" !== i.method || (t.extend(i.query, i.data),
            i.data = {});
            var r = i.data = i.data || {};
            if (o.then(i.callback, i.callback),
            !i.path)
                return o.reject(n("invalid_path", "Missing the path parameter from the request"));
            i.path = i.path.replace(/^\/+/, "");
            var a = (i.path.split(/[\/\:]/, 2) || [])[0].toLowerCase();
            if (a in e.services) {
                i.network = a;
                var s = new RegExp("^" + a + ":?/?");
                i.path = i.path.replace(s, "")
            }
            i.network = e.settings.default_service = i.network || e.settings.default_service;
            var l = e.services[i.network];
            if (!l)
                return o.reject(n("invalid_network", "Could not match the service requested: " + i.network));
            if (i.method in l && i.path in l[i.method] && !1 === l[i.method][i.path])
                return o.reject(n("invalid_path", "The provided path is not available on the selected network"));
            i.oauth_proxy || (i.oauth_proxy = e.settings.oauth_proxy),
            "proxy"in i || (i.proxy = i.oauth_proxy && l.oauth && 1 === parseInt(l.oauth.version, 10)),
            "timeout"in i || (i.timeout = e.settings.timeout),
            "formatResponse"in i || (i.formatResponse = !0),
            i.authResponse = e.getAuthResponse(i.network),
            i.authResponse && i.authResponse.access_token && (i.query.access_token = i.authResponse.access_token);
            var u, c = i.path;
            i.options = t.clone(i.query),
            i.data = t.clone(r);
            var d = l[{
                delete: "del"
            }[i.method] || i.method] || {};
            if ("get" === i.method) {
                var f = c.split(/[\?#]/)[1];
                f && (t.extend(i.query, t.param(f)),
                c = c.replace(/\?.*?(#|$)/, "$1"))
            }
            return (u = c.match(/#(.+)/, "")) ? (c = c.split("#")[0],
            i.path = u[1]) : c in d ? (i.path = c,
            c = d[c]) : "default"in d && (c = d.default),
            i.redirect_uri = e.settings.redirect_uri,
            i.xhr = l.xhr,
            i.jsonp = l.jsonp,
            i.form = l.form,
            "function" == typeof c ? c(i, p) : p(c),
            o.proxy;
            function p(e) {
                (e = e.replace(/\@\{([a-z\_\-]+)(\|.*?)?\}/gi, (function(e, t, r) {
                    var a = r ? r.replace(/^\|/, "") : "";
                    return t in i.query ? (a = i.query[t],
                    delete i.query[t]) : i.data && t in i.data ? (a = i.data[t],
                    delete i.data[t]) : r || o.reject(n("missing_attribute", "The attribute " + t + " is missing from the request")),
                    a
                }
                ))).match(/^https?:\/\//) || (e = l.base + e),
                i.url = e,
                t.request(i, (function(e, n) {
                    if (i.formatResponse) {
                        if (!0 === e ? e = {
                            success: !0
                        } : e || (e = {}),
                        "delete" === i.method && (e = !e || t.isEmpty(e) ? {
                            success: !0
                        } : e),
                        l.wrap && (i.path in l.wrap || "default"in l.wrap)) {
                            var r = i.path in l.wrap ? i.path : "default"
                              , a = ((new Date).getTime(),
                            l.wrap[r](e, n, i));
                            a && (e = a)
                        }
                        e && "paging"in e && e.paging.next && ("?" === e.paging.next[0] ? e.paging.next = i.path + e.paging.next : e.paging.next += "#" + i.path),
                        !e || "error"in e ? o.reject(e) : o.fulfill(e)
                    } else
                        ("object" == typeof n ? n.statusCode >= 400 : "object" == typeof e && "error"in e) ? o.reject(e) : o.fulfill(e)
                }
                ))
            }
        }
        ,
        i.utils.extend(i.utils, {
            request: function(e, t) {
                var n = this
                  , o = n.error;
                if (n.isEmpty(e.data) || "FileList"in window || !n.hasBinary(e.data) || (e.xhr = !1,
                e.jsonp = !1),
                this.request_cors((function() {
                    return void 0 === e.xhr || e.xhr && ("function" != typeof e.xhr || e.xhr(e, e.query))
                }
                )))
                    a(e, (function(o) {
                        var i = n.xhr(e.method, o, e.headers, e.data, t);
                        i.onprogress = e.onprogress || null,
                        i.upload && e.onuploadprogress && (i.upload.onprogress = e.onuploadprogress)
                    }
                    ));
                else {
                    var i, r = e.query;
                    if (e.query = n.clone(e.query),
                    e.callbackID = n.globalEvent(),
                    !1 !== e.jsonp) {
                        if (e.query.callback = e.callbackID,
                        "function" == typeof e.jsonp && e.jsonp(e, e.query),
                        "get" === e.method)
                            return void a(e, (function(o) {
                                n.jsonp(o, t, e.callbackID, e.timeout)
                            }
                            ));
                        e.query = r
                    }
                    if (!1 !== e.form && (e.query.redirect_uri = e.redirect_uri,
                    e.query.state = JSON.stringify({
                        callback: e.callbackID
                    }),
                    "function" == typeof e.form && (i = e.form(e, e.query)),
                    "post" === e.method && !1 !== i))
                        return void a(e, (function(o) {
                            n.post(o, e.data, i, t, e.callbackID, e.timeout)
                        }
                        ));
                    t(o("invalid_request", "There was no mechanism for handling this request"))
                }
                function a(e, t) {
                    var o;
                    e.authResponse && e.authResponse.oauth && 1 === parseInt(e.authResponse.oauth.version, 10) && (o = e.query.access_token,
                    delete e.query.access_token,
                    e.proxy = !0),
                    !e.data || "get" !== e.method && "delete" !== e.method || (n.extend(e.query, e.data),
                    e.data = null);
                    var i = n.qs(e.url, e.query);
                    e.proxy && (i = n.qs(e.oauth_proxy, {
                        path: i,
                        access_token: o || "",
                        then: e.proxy_response_type || ("get" === e.method.toLowerCase() ? "redirect" : "proxy"),
                        method: e.method.toLowerCase(),
                        suppress_response_codes: e.suppress_response_codes || !0
                    })),
                    t(i)
                }
            },
            request_cors: function(e) {
                return "withCredentials"in new XMLHttpRequest && e()
            },
            domInstance: function(e, t) {
                var n = "HTML" + (e || "").replace(/^[a-z]/, (function(e) {
                    return e.toUpperCase()
                }
                )) + "Element";
                return !!t && (window[n] ? t instanceof window[n] : window.Element ? t instanceof window.Element && (!e || t.tagName && t.tagName.toLowerCase() === e) : !(t instanceof Object || t instanceof Array || t instanceof String || t instanceof Number) && t.tagName && t.tagName.toLowerCase() === e)
            },
            clone: function(e) {
                if (null === e || "object" != typeof e || e instanceof Date || "nodeName"in e || this.isBinary(e) || "function" == typeof FormData && e instanceof FormData)
                    return e;
                if (Array.isArray(e))
                    return e.map(this.clone.bind(this));
                var t = {};
                for (var n in e)
                    t[n] = this.clone(e[n]);
                return t
            },
            xhr: function(e, t, n, o, i) {
                var r, a = new XMLHttpRequest, s = this.error, l = !1;
                if ("blob" === e && (l = e,
                e = "GET"),
                e = e.toUpperCase(),
                a.onload = function(t) {
                    var n = a.response;
                    try {
                        n = JSON.parse(a.responseText)
                    } catch (e) {
                        401 === a.status && (n = s("access_denied", a.statusText))
                    }
                    var o = function(e) {
                        for (var t, n = {}, o = /([a-z\-]+):\s?(.*);?/gi; t = o.exec(e); )
                            n[t[1]] = t[2];
                        return n
                    }(a.getAllResponseHeaders());
                    o.statusCode = a.status,
                    i(n || ("GET" === e ? s("empty_response", "Could not get resource") : {}), o)
                }
                ,
                a.onerror = function(e) {
                    var t = a.responseText;
                    try {
                        t = JSON.parse(a.responseText)
                    } catch (e) {}
                    i(t || s("access_denied", "Could not get resource"))
                }
                ,
                "GET" === e || "DELETE" === e)
                    o = null;
                else if (o && "string" != typeof o && !(o instanceof FormData) && !(o instanceof File) && !(o instanceof Blob)) {
                    var u = new FormData;
                    for (r in o)
                        o.hasOwnProperty(r) && (o[r]instanceof HTMLInputElement ? "files"in o[r] && o[r].files.length > 0 && u.append(r, o[r].files[0]) : o[r]instanceof Blob ? u.append(r, o[r], o.name) : u.append(r, o[r]));
                    o = u
                }
                if (a.open(e, t, !0),
                l && ("responseType"in a ? a.responseType = l : a.overrideMimeType("text/plain; charset=x-user-defined")),
                n)
                    for (r in n)
                        a.setRequestHeader(r, n[r]);
                return a.send(o),
                a
            },
            jsonp: function(e, t, n, o) {
                var i, r = this, a = r.error, s = 0, l = document.getElementsByTagName("head")[0], u = a("server_error", "server_error"), c = function() {
                    s++ || window.setTimeout((function() {
                        t(u),
                        l.removeChild(d)
                    }
                    ), 0)
                };
                n = r.globalEvent((function(e) {
                    return u = e,
                    !0
                }
                ), n),
                e = e.replace(new RegExp("=\\?(&|$)"), "=" + n + "$1");
                var d = r.append("script", {
                    id: n,
                    name: n,
                    src: e,
                    async: !0,
                    onload: c,
                    onerror: c,
                    onreadystatechange: function() {
                        /loaded|complete/i.test(this.readyState) && c()
                    }
                });
                window.navigator.userAgent.toLowerCase().indexOf("opera") > -1 && (i = r.append("script", {
                    text: "document.getElementById('" + n + "').onerror();"
                }),
                d.async = !1),
                o && window.setTimeout((function() {
                    u = a("timeout", "timeout"),
                    c()
                }
                ), o),
                l.appendChild(d),
                i && l.appendChild(i)
            },
            post: function(e, t, n, o, i, r) {
                var a, s, l = this, u = l.error, c = document, d = null, f = [], p = 0, m = null, h = 0, g = function(e) {
                    h++ || o(e)
                };
                l.globalEvent(g, i);
                try {
                    s = c.createElement('<iframe name="' + i + '">')
                } catch (e) {
                    s = c.createElement("iframe")
                }
                if (s.name = i,
                s.id = i,
                s.style.display = "none",
                n && n.callbackonload && (s.onload = function() {
                    g({
                        response: "posted",
                        message: "Content was posted"
                    })
                }
                ),
                r && setTimeout((function() {
                    g(u("timeout", "The post operation timed out"))
                }
                ), r),
                c.body.appendChild(s),
                l.domInstance("form", t)) {
                    for (d = t.form,
                    p = 0; p < d.elements.length; p++)
                        d.elements[p] !== t && d.elements[p].setAttribute("disabled", !0);
                    t = d
                }
                if (l.domInstance("form", t))
                    for (d = t,
                    p = 0; p < d.elements.length; p++)
                        d.elements[p].disabled || "file" !== d.elements[p].type || (d.encoding = d.enctype = "multipart/form-data",
                        d.elements[p].setAttribute("name", "file"));
                else {
                    for (m in t)
                        t.hasOwnProperty(m) && l.domInstance("input", t[m]) && "file" === t[m].type && ((d = t[m].form).encoding = d.enctype = "multipart/form-data");
                    var v;
                    for (m in d || (d = c.createElement("form"),
                    c.body.appendChild(d),
                    a = d),
                    t)
                        if (t.hasOwnProperty(m)) {
                            var y = l.domInstance("input", t[m]) || l.domInstance("textArea", t[m]) || l.domInstance("select", t[m]);
                            if (y && t[m].form === d)
                                y && t[m].name !== m && (t[m].setAttribute("name", m),
                                t[m].name = m);
                            else {
                                var w = d.elements[m];
                                if (v)
                                    for (w instanceof NodeList || (w = [w]),
                                    p = 0; p < w.length; p++)
                                        w[p].parentNode.removeChild(w[p]);
                                (v = c.createElement("input")).setAttribute("type", "hidden"),
                                v.setAttribute("name", m),
                                y ? v.value = t[m].value : l.domInstance(null, t[m]) ? v.value = t[m].innerHTML || t[m].innerText : v.value = t[m],
                                d.appendChild(v)
                            }
                        }
                    for (p = 0; p < d.elements.length; p++)
                        (v = d.elements[p]).name in t || !0 === v.getAttribute("disabled") || (v.setAttribute("disabled", !0),
                        f.push(v))
                }
                d.setAttribute("method", "POST"),
                d.setAttribute("target", i),
                d.target = i,
                d.setAttribute("action", e),
                setTimeout((function() {
                    d.submit(),
                    setTimeout((function() {
                        try {
                            a && a.parentNode.removeChild(a)
                        } catch (e) {
                            try {
                                console.error("HelloJS: could not remove iframe")
                            } catch (e) {}
                        }
                        for (var e = 0; e < f.length; e++)
                            f[e] && (f[e].setAttribute("disabled", !1),
                            f[e].disabled = !1)
                    }
                    ), 0)
                }
                ), 100)
            },
            hasBinary: function(e) {
                for (var t in e)
                    if (e.hasOwnProperty(t) && this.isBinary(e[t]))
                        return !0;
                return !1
            },
            isBinary: function(e) {
                return e instanceof Object && (this.domInstance("input", e) && "file" === e.type || "FileList"in window && e instanceof window.FileList || "File"in window && e instanceof window.File || "Blob"in window && e instanceof window.Blob)
            },
            toBlob: function(e) {
                var t = /^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i
                  , n = e.match(t);
                if (!n)
                    return e;
                for (var o = atob(e.replace(t, "")), i = [], r = 0; r < o.length; r++)
                    i.push(o.charCodeAt(r));
                return new Blob([new Uint8Array(i)],{
                    type: n[1]
                })
            }
        }),
        function(e) {
            var t = e.api
              , n = e.utils;
            n.extend(n, {
                dataToJSON: function(e) {
                    var t = this
                      , n = window
                      , o = e.data;
                    if (t.domInstance("form", o) ? o = t.nodeListToJSON(o.elements) : "NodeList"in n && o instanceof NodeList ? o = t.nodeListToJSON(o) : t.domInstance("input", o) && (o = t.nodeListToJSON([o])),
                    ("File"in n && o instanceof n.File || "Blob"in n && o instanceof n.Blob || "FileList"in n && o instanceof n.FileList) && (o = {
                        file: o
                    }),
                    !("FormData"in n && o instanceof n.FormData))
                        for (var i in o)
                            if (o.hasOwnProperty(i))
                                if ("FileList"in n && o[i]instanceof n.FileList)
                                    1 === o[i].length && (o[i] = o[i][0]);
                                else {
                                    if (t.domInstance("input", o[i]) && "file" === o[i].type)
                                        continue;
                                    t.domInstance("input", o[i]) || t.domInstance("select", o[i]) || t.domInstance("textArea", o[i]) ? o[i] = o[i].value : t.domInstance(null, o[i]) && (o[i] = o[i].innerHTML || o[i].innerText)
                                }
                    return e.data = o,
                    o
                },
                nodeListToJSON: function(e) {
                    for (var t = {}, n = 0; n < e.length; n++) {
                        var o = e[n];
                        !o.disabled && o.name && ("file" === o.type ? t[o.name] = o : t[o.name] = o.value || o.innerHTML)
                    }
                    return t
                }
            }),
            e.api = function() {
                var e = n.args({
                    path: "s!",
                    method: "s",
                    data: "o",
                    timeout: "i",
                    callback: "f"
                }, arguments);
                return e.data && n.dataToJSON(e),
                t.call(this, e)
            }
        }(i),
        i.utils.responseHandler(window, window.opener || window.parent),
        "object" == typeof chrome && "object" == typeof chrome.identity && chrome.identity.launchWebAuthFlow && function() {
            i.utils.popup = function(e) {
                return t(e, !0)
            }
            ,
            i.utils.iframe = function(e) {
                t(e, !1)
            }
            ,
            i.utils.request_cors = function(e) {
                return e(),
                !0
            }
            ;
            var e = {};
            function t(e, n) {
                var o = {
                    closed: !1
                };
                return chrome.identity.launchWebAuthFlow({
                    url: e,
                    interactive: n
                }, (function(e) {
                    if (void 0 !== e) {
                        var n = i.utils.url(e)
                          , r = {
                            location: {
                                assign: function(e) {
                                    t(e, !1)
                                },
                                search: n.search,
                                hash: n.hash,
                                href: n.href
                            },
                            close: function() {}
                        };
                        i.utils.responseHandler(r, window)
                    } else
                        o.closed = !0
                }
                )),
                o
            }
            chrome.storage.local.get("hello", (function(t) {
                e = t.hello || {}
            }
            )),
            i.utils.store = function(t, n) {
                return 0 === arguments.length ? e : 1 === arguments.length ? e[t] || null : n ? (e[t] = n,
                chrome.storage.local.set({
                    hello: e
                }),
                n) : null === n ? (delete e[t],
                chrome.storage.local.set({
                    hello: e
                }),
                null) : void 0
            }
        }(),
        function() {
            if (/^file:\/{3}[^\/]/.test(window.location.href) && window.cordova) {
                i.utils.iframe = function(e, t) {
                    i.utils.popup(e, t, {
                        hidden: "yes"
                    })
                }
                ;
                var e = i.utils.popup;
                i.utils.popup = function(t, n, o) {
                    var r = e.call(this, t, n, o);
                    try {
                        if (r && r.addEventListener) {
                            var a = i.utils.url(n)
                              , s = a.origin || a.protocol + "//" + a.hostname;
                            r.addEventListener("loadstart", (function(e) {
                                var t = e.url;
                                if (0 === t.indexOf(s)) {
                                    var n = i.utils.url(t)
                                      , o = {
                                        location: {
                                            assign: function(e) {
                                                r.executeScript({
                                                    code: 'window.location.href = "' + e + ';"'
                                                })
                                            },
                                            search: n.search,
                                            hash: n.hash,
                                            href: n.href
                                        },
                                        close: function() {
                                            if (r.close) {
                                                r.close();
                                                try {
                                                    r.closed = !0
                                                } catch (e) {}
                                            }
                                        }
                                    };
                                    i.utils.responseHandler(o, window)
                                }
                            }
                            ))
                        }
                    } catch (e) {}
                    return r
                }
            }
        }(),
        function(e) {
            var t = {
                version: "1.0",
                auth: "https://www.dropbox.com/1/oauth/authorize",
                request: "https://api.dropbox.com/1/oauth/request_token",
                token: "https://api.dropbox.com/1/oauth/access_token"
            }
              , n = {
                version: 2,
                auth: "https://www.dropbox.com/1/oauth2/authorize",
                grant: "https://api.dropbox.com/1/oauth2/token"
            };
            function o(e) {
                e && "error"in e && (e.error = {
                    code: "server_error",
                    message: e.error.message || e.error
                })
            }
            function i(t, n, o) {
                if (!("object" != typeof t || "undefined" != typeof Blob && t instanceof Blob || "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer || "error"in t)) {
                    var i = ("app_folder" !== t.root ? t.root : "") + t.path.replace(/\&/g, "%26");
                    i = i.replace(/^\//, ""),
                    t.thumb_exists && (t.thumbnail = o.oauth_proxy + "?path=" + encodeURIComponent("https://api-content.dropbox.com/1/thumbnails/auto/" + i + "?format=jpeg&size=m") + "&access_token=" + o.options.access_token),
                    t.type = t.is_dir ? "folder" : t.mime_type,
                    t.name = t.path.replace(/.*\//g, ""),
                    t.is_dir ? t.files = i.replace(/^\//, "") : (t.downloadLink = e.settings.oauth_proxy + "?path=" + encodeURIComponent("https://api-content.dropbox.com/1/files/auto/" + i) + "&access_token=" + o.options.access_token,
                    t.file = "https://api-content.dropbox.com/1/files/auto/" + i),
                    t.id || (t.id = t.path.replace(/^\//, ""))
                }
            }
            function r(e) {
                return function(t, n) {
                    delete t.query.limit,
                    n(e)
                }
            }
            e.init({
                dropbox: {
                    name: "Dropbox",
                    oauth: n,
                    login: function(o) {
                        o.qs.scope = "";
                        var i = decodeURIComponent(o.qs.redirect_uri);
                        0 === i.indexOf("http:") && 0 !== i.indexOf("http://localhost/") ? e.services.dropbox.oauth = t : e.services.dropbox.oauth = n,
                        o.options.popup.width = 1e3,
                        o.options.popup.height = 1e3
                    },
                    base: "https://api.dropbox.com/1/",
                    root: "sandbox",
                    get: {
                        me: "account/info",
                        "me/files": r("metadata/auto/@{parent|}"),
                        "me/folder": r("metadata/auto/@{id}"),
                        "me/folders": r("metadata/auto/"),
                        default: function(e, t) {
                            e.path.match("https://api-content.dropbox.com/1/files/") && (e.method = "blob"),
                            t(e.path)
                        }
                    },
                    post: {
                        "me/files": function(t, n) {
                            var o = t.data.parent
                              , i = t.data.name;
                            t.data = {
                                file: t.data.file
                            },
                            "string" == typeof t.data.file && (t.data.file = e.utils.toBlob(t.data.file)),
                            n("https://api-content.dropbox.com/1/files_put/auto/" + o + "/" + i)
                        },
                        "me/folders": function(t, n) {
                            var o = t.data.name;
                            t.data = {},
                            n("fileops/create_folder?root=@{root|sandbox}&" + e.utils.param({
                                path: o
                            }))
                        }
                    },
                    del: {
                        "me/files": "fileops/delete?root=@{root|sandbox}&path=@{id}",
                        "me/folder": "fileops/delete?root=@{root|sandbox}&path=@{id}"
                    },
                    wrap: {
                        me: function(e) {
                            if (o(e),
                            !e.uid)
                                return e;
                            e.name = e.display_name;
                            var t = e.name.split(" ");
                            return e.first_name = t.shift(),
                            e.last_name = t.join(" "),
                            e.id = e.uid,
                            delete e.uid,
                            delete e.display_name,
                            e
                        },
                        default: function(e, t, n) {
                            return o(e),
                            e.is_dir && e.contents && (e.data = e.contents,
                            delete e.contents,
                            e.data.forEach((function(t) {
                                t.root = e.root,
                                i(t, 0, n)
                            }
                            ))),
                            i(e, 0, n),
                            e.is_deleted && (e.success = !0),
                            e
                        }
                    },
                    xhr: function(e) {
                        if (e.data && e.data.file) {
                            var t = e.data.file;
                            t && (t.files ? e.data = t.files[0] : e.data = t)
                        }
                        return "delete" === e.method && (e.method = "post"),
                        !0
                    },
                    form: function(e, t) {
                        delete t.state,
                        delete t.redirect_uri
                    }
                }
            })
        }(i),
        function(e) {
            e.init({
                facebook: {
                    name: "Facebook",
                    oauth: {
                        version: 2,
                        auth: "https://www.facebook.com/v2.9/dialog/oauth/",
                        grant: "https://graph.facebook.com/oauth/access_token"
                    },
                    scope: {
                        basic: "public_profile",
                        email: "email",
                        share: "user_posts",
                        birthday: "user_birthday",
                        events: "user_events",
                        photos: "user_photos",
                        videos: "user_videos",
                        friends: "user_friends",
                        files: "user_photos,user_videos",
                        publish_files: "user_photos,user_videos,publish_actions",
                        publish: "publish_actions",
                        offline_access: ""
                    },
                    refresh: !1,
                    login: function(e) {
                        e.options.force && (e.qs.auth_type = "reauthenticate"),
                        e.qs.display = e.options.display || "popup"
                    },
                    logout: function(t, n) {
                        var o = e.utils.globalEvent(t)
                          , i = encodeURIComponent(e.settings.redirect_uri + "?" + e.utils.param({
                            callback: o,
                            result: JSON.stringify({
                                force: !0
                            }),
                            state: "{}"
                        }))
                          , r = (n.authResponse || {}).access_token;
                        if (e.utils.iframe("https://www.facebook.com/logout.php?next=" + i + "&access_token=" + r),
                        !r)
                            return !1
                    },
                    base: "https://graph.facebook.com/v2.9/",
                    get: {
                        me: "me?fields=email,first_name,last_name,name,timezone,verified",
                        "me/friends": "me/friends",
                        "me/following": "me/friends",
                        "me/followers": "me/friends",
                        "me/share": "me/feed",
                        "me/like": "me/likes",
                        "me/files": "me/albums",
                        "me/albums": "me/albums?fields=cover_photo,name",
                        "me/album": "@{id}/photos?fields=picture",
                        "me/photos": "me/photos",
                        "me/photo": "@{id}",
                        "friend/albums": "@{id}/albums",
                        "friend/photos": "@{id}/photos"
                    },
                    post: {
                        "me/share": "me/feed",
                        "me/photo": "@{id}"
                    },
                    wrap: {
                        me: n,
                        "me/friends": o,
                        "me/following": o,
                        "me/followers": o,
                        "me/albums": i,
                        "me/photos": i,
                        "me/files": i,
                        default: i
                    },
                    xhr: function(t, n) {
                        return "get" !== t.method && "post" !== t.method || (n.suppress_response_codes = !0),
                        "post" === t.method && t.data && "string" == typeof t.data.file && (t.data.file = e.utils.toBlob(t.data.file)),
                        !0
                    },
                    jsonp: function(t, n) {
                        var o = t.method;
                        "get" === o || e.utils.hasBinary(t.data) ? "delete" === t.method && (n.method = "delete",
                        t.method = "post") : (t.data.method = o,
                        t.method = "get")
                    },
                    form: function(e) {
                        return {
                            callbackonload: !0
                        }
                    }
                }
            });
            var t = "https://graph.facebook.com/";
            function n(e) {
                return e.id && (e.thumbnail = e.picture = "https://graph.facebook.com/" + e.id + "/picture"),
                e
            }
            function o(e) {
                return "data"in e && e.data.forEach(n),
                e
            }
            function i(e, n, o) {
                if ("boolean" == typeof e && (e = {
                    success: e
                }),
                e && "data"in e) {
                    var i = o.query.access_token;
                    if (!(e.data instanceof Array)) {
                        var r = e.data;
                        delete e.data,
                        e.data = [r]
                    }
                    e.data.forEach((function(e) {
                        e.picture && (e.thumbnail = e.picture),
                        e.pictures = (e.images || []).sort((function(e, t) {
                            return e.width - t.width
                        }
                        )),
                        e.cover_photo && e.cover_photo.id && (e.thumbnail = t + e.cover_photo.id + "/picture?access_token=" + i),
                        "album" === e.type && (e.files = e.photos = t + e.id + "/photos"),
                        e.can_upload && (e.upload_location = t + e.id + "/photos")
                    }
                    ))
                }
                return e
            }
        }(i),
        function(e) {
            function t(t, n, o) {
                var i = (o ? "" : "flickr:") + "?method=" + t + "&api_key=" + e.services.flickr.id + "&format=json";
                for (var r in n)
                    n.hasOwnProperty(r) && (i += "&" + r + "=" + n[r]);
                return i
            }
            function n(n, o) {
                return o || (o = {}),
                function(i, r) {
                    var a;
                    (function(e) {
                        o.user_id = e,
                        r(t(n, o, !0))
                    }
                    )((a = e.getAuthResponse("flickr")) && a.user_nsid ? a.user_nsid : null)
                }
            }
            function o(e, t) {
                var n = "https://www.flickr.com/images/buddyicon.gif";
                return e.nsid && e.iconserver && e.iconfarm && (n = "https://farm" + e.iconfarm + ".staticflickr.com/" + e.iconserver + "/buddyicons/" + e.nsid + (t ? "_" + t : "") + ".jpg"),
                n
            }
            function i(e, t, n, o, i) {
                return "https://farm" + t + ".staticflickr.com/" + n + "/" + e + "_" + o + (i = i ? "_" + i : "") + ".jpg"
            }
            function r(e) {
                e && e.stat && "ok" != e.stat.toLowerCase() && (e.error = {
                    code: "invalid_request",
                    message: e.message
                })
            }
            function a(e) {
                if (e.photoset || e.photos) {
                    c(e = l(e, "photoset"in e ? "photoset" : "photos")),
                    e.data = e.photo,
                    delete e.photo;
                    for (var t = 0; t < e.data.length; t++) {
                        var n = e.data[t];
                        n.name = n.title,
                        n.picture = i(n.id, n.farm, n.server, n.secret, ""),
                        n.pictures = s(n.id, n.farm, n.server, n.secret),
                        n.source = i(n.id, n.farm, n.server, n.secret, "b"),
                        n.thumbnail = i(n.id, n.farm, n.server, n.secret, "m")
                    }
                }
                return e
            }
            function s(e, t, n, o) {
                return [{
                    id: "t",
                    max: 100
                }, {
                    id: "m",
                    max: 240
                }, {
                    id: "n",
                    max: 320
                }, {
                    id: "",
                    max: 500
                }, {
                    id: "z",
                    max: 640
                }, {
                    id: "c",
                    max: 800
                }, {
                    id: "b",
                    max: 1024
                }, {
                    id: "h",
                    max: 1600
                }, {
                    id: "k",
                    max: 2048
                }, {
                    id: "o",
                    max: 2048
                }].map((function(r) {
                    return {
                        source: i(e, t, n, o, r.id),
                        width: r.max,
                        height: r.max
                    }
                }
                ))
            }
            function l(e, t) {
                return t in e ? e = e[t] : "error"in e || (e.error = {
                    code: "invalid_request",
                    message: e.message || "Failed to get data from Flickr"
                }),
                e
            }
            function u(e) {
                if (r(e),
                e.contacts) {
                    c(e = l(e, "contacts")),
                    e.data = e.contact,
                    delete e.contact;
                    for (var t = 0; t < e.data.length; t++) {
                        var n = e.data[t];
                        n.id = n.nsid,
                        n.name = n.realname || n.username,
                        n.thumbnail = o(n, "m")
                    }
                }
                return e
            }
            function c(e) {
                e.page && e.pages && e.page !== e.pages && (e.paging = {
                    next: "?page=" + ++e.page
                })
            }
            e.init({
                flickr: {
                    name: "Flickr",
                    oauth: {
                        version: "1.0a",
                        auth: "https://www.flickr.com/services/oauth/authorize?perms=read",
                        request: "https://www.flickr.com/services/oauth/request_token",
                        token: "https://www.flickr.com/services/oauth/access_token"
                    },
                    base: "https://api.flickr.com/services/rest",
                    get: {
                        me: n("flickr.people.getInfo"),
                        "me/friends": n("flickr.contacts.getList", {
                            per_page: "@{limit|50}"
                        }),
                        "me/following": n("flickr.contacts.getList", {
                            per_page: "@{limit|50}"
                        }),
                        "me/followers": n("flickr.contacts.getList", {
                            per_page: "@{limit|50}"
                        }),
                        "me/albums": n("flickr.photosets.getList", {
                            per_page: "@{limit|50}"
                        }),
                        "me/album": n("flickr.photosets.getPhotos", {
                            photoset_id: "@{id}"
                        }),
                        "me/photos": n("flickr.people.getPhotos", {
                            per_page: "@{limit|50}"
                        })
                    },
                    wrap: {
                        me: function(e) {
                            if (r(e),
                            (e = l(e, "person")).id) {
                                if (e.realname) {
                                    e.name = e.realname._content;
                                    var t = e.name.split(" ");
                                    e.first_name = t.shift(),
                                    e.last_name = t.join(" ")
                                }
                                e.thumbnail = o(e, "l"),
                                e.picture = o(e, "l")
                            }
                            return e
                        },
                        "me/friends": u,
                        "me/followers": u,
                        "me/following": u,
                        "me/albums": function(e) {
                            return r(e),
                            c(e = l(e, "photosets")),
                            e.photoset && (e.data = e.photoset,
                            e.data.forEach((function(e) {
                                e.name = e.title._content,
                                e.photos = "https://api.flickr.com/services/rest" + t("flickr.photosets.getPhotos", {
                                    photoset_id: e.id
                                }, !0)
                            }
                            )),
                            delete e.photoset),
                            e
                        },
                        "me/photos": function(e) {
                            return r(e),
                            a(e)
                        },
                        default: function(e) {
                            return r(e),
                            a(e)
                        }
                    },
                    xhr: !1,
                    jsonp: function(e, t) {
                        "get" == e.method && (delete t.callback,
                        t.jsoncallback = e.callbackID)
                    }
                }
            })
        }(i),
        function(e) {
            function t(e) {
                !e.meta || 400 !== e.meta.code && 401 !== e.meta.code || (e.error = {
                    code: "access_denied",
                    message: e.meta.errorDetail
                })
            }
            function n(e) {
                e && e.id && (e.thumbnail = e.photo.prefix + "100x100" + e.photo.suffix,
                e.name = e.firstName + " " + e.lastName,
                e.first_name = e.firstName,
                e.last_name = e.lastName,
                e.contact && e.contact.email && (e.email = e.contact.email))
            }
            function o(e, t) {
                var n = t.access_token;
                return delete t.access_token,
                t.oauth_token = n,
                t.v = 20121125,
                !0
            }
            e.init({
                foursquare: {
                    name: "Foursquare",
                    oauth: {
                        version: 2,
                        auth: "https://foursquare.com/oauth2/authenticate",
                        grant: "https://foursquare.com/oauth2/access_token"
                    },
                    refresh: !0,
                    base: "https://api.foursquare.com/v2/",
                    get: {
                        me: "users/self",
                        "me/friends": "users/self/friends",
                        "me/followers": "users/self/friends",
                        "me/following": "users/self/friends"
                    },
                    wrap: {
                        me: function(e) {
                            return t(e),
                            e && e.response && n(e = e.response.user),
                            e
                        },
                        default: function(e) {
                            return t(e),
                            e && "response"in e && "friends"in e.response && "items"in e.response.friends && (e.data = e.response.friends.items,
                            e.data.forEach(n),
                            delete e.response),
                            e
                        }
                    },
                    xhr: o,
                    jsonp: o
                }
            })
        }(i),
        function(e) {
            function t(e, t) {
                var n = t ? t.statusCode : e && "meta"in e && "status"in e.meta && e.meta.status;
                401 !== n && 403 !== n || (e.error = {
                    code: "access_denied",
                    message: e.message || (e.data ? e.data.message : "Could not get response")
                },
                delete e.message)
            }
            function n(e) {
                e.id && (e.thumbnail = e.picture = e.avatar_url,
                e.name = e.login)
            }
            e.init({
                github: {
                    name: "GitHub",
                    oauth: {
                        version: 2,
                        auth: "https://github.com/login/oauth/authorize",
                        grant: "https://github.com/login/oauth/access_token",
                        response_type: "code"
                    },
                    scope: {
                        email: "user:email"
                    },
                    base: "https://api.github.com/",
                    get: {
                        me: "user",
                        "me/friends": "user/following?per_page=@{limit|100}",
                        "me/following": "user/following?per_page=@{limit|100}",
                        "me/followers": "user/followers?per_page=@{limit|100}",
                        "me/like": "user/starred?per_page=@{limit|100}"
                    },
                    wrap: {
                        me: function(e, o) {
                            return t(e, o),
                            n(e),
                            e
                        },
                        default: function(e, o, i) {
                            return t(e, o),
                            Array.isArray(e) && (e = {
                                data: e
                            }),
                            e.data && (function(e, t, n) {
                                if (e.data && e.data.length && t && t.Link) {
                                    var o = t.Link.match(/<(.*?)>;\s*rel=\"next\"/);
                                    o && (e.paging = {
                                        next: o[1]
                                    })
                                }
                            }(e, o),
                            e.data.forEach(n)),
                            e
                        }
                    },
                    xhr: function(e) {
                        return "get" !== e.method && e.data && (e.headers = e.headers || {},
                        e.headers["Content-Type"] = "application/json",
                        "object" == typeof e.data && (e.data = JSON.stringify(e.data))),
                        !0
                    }
                }
            })
        }(i),
        function(e) {
            var t = "https://www.google.com/m8/feeds/contacts/default/full?v=3.0&alt=json&max-results=@{limit|1000}&start-index=@{start|1}";
            function n(e) {
                return parseInt(e, 10)
            }
            function o(e) {
                return c(e),
                e.data = e.items,
                delete e.items,
                e
            }
            function i(e) {
                if (!e.error)
                    return e.name || (e.name = e.title || e.message),
                    e.picture || (e.picture = e.thumbnailLink),
                    e.thumbnail || (e.thumbnail = e.thumbnailLink),
                    "application/vnd.google-apps.folder" === e.mimeType && (e.type = "folder",
                    e.files = "https://www.googleapis.com/drive/v2/files?q=%22" + e.id + "%22+in+parents"),
                    e
            }
            function r(e) {
                return {
                    source: e.url,
                    width: e.width,
                    height: e.height
                }
            }
            function a(e) {
                if (c(e),
                "feed"in e && "entry"in e.feed)
                    e.data = e.feed.entry.map(u),
                    delete e.feed;
                else {
                    if ("entry"in e)
                        return u(e.entry);
                    "items"in e ? (e.data = e.items.map(i),
                    delete e.items) : i(e)
                }
                return e
            }
            function s(e) {
                e.name = e.displayName || e.name,
                e.picture = e.picture || (e.image ? e.image.url : null),
                e.thumbnail = e.picture
            }
            function l(e, t, n) {
                if (c(e),
                "feed"in e && "entry"in e.feed) {
                    for (var o = n.query.access_token, i = 0; i < e.feed.entry.length; i++) {
                        var r = e.feed.entry[i];
                        if (r.id = r.id.$t,
                        r.name = r.title.$t,
                        delete r.title,
                        r.gd$email && (r.email = r.gd$email && r.gd$email.length > 0 ? r.gd$email[0].address : null,
                        r.emails = r.gd$email,
                        delete r.gd$email),
                        r.updated && (r.updated = r.updated.$t),
                        r.link) {
                            var a = r.link.length > 0 ? r.link[0].href : null;
                            a && r.link[0].gd$etag && (a += (a.indexOf("?") > -1 ? "&" : "?") + "access_token=" + o,
                            r.picture = a,
                            r.thumbnail = a),
                            delete r.link
                        }
                        r.category && delete r.category
                    }
                    e.data = e.feed.entry,
                    delete e.feed
                }
                return e
            }
            function u(e) {
                var t, n = e.media$group, o = n.media$content.length ? n.media$content[0] : {}, i = n.media$content || [], a = n.media$thumbnail || [], s = i.concat(a).map(r).sort((function(e, t) {
                    return e.width - t.width
                }
                )), l = 0, u = {
                    id: e.id.$t,
                    name: e.title.$t,
                    description: e.summary.$t,
                    updated_time: e.updated.$t,
                    created_time: e.published.$t,
                    picture: o ? o.url : null,
                    pictures: s,
                    images: [],
                    thumbnail: o ? o.url : null,
                    width: o.width,
                    height: o.height
                };
                if ("link"in e)
                    for (l = 0; l < e.link.length; l++) {
                        var c = e.link[l];
                        if (c.rel.match(/\#feed$/)) {
                            u.upload_location = u.files = u.photos = c.href;
                            break
                        }
                    }
                if ("category"in e && e.category.length)
                    for (t = e.category,
                    l = 0; l < t.length; l++)
                        t[l].scheme && t[l].scheme.match(/\#kind$/) && (u.type = t[l].term.replace(/^.*?\#/, ""));
                return "media$thumbnail"in n && n.media$thumbnail.length && (t = n.media$thumbnail,
                u.thumbnail = t[0].url,
                u.images = t.map(r)),
                (t = n.media$content) && t.length && u.images.push(r(t[0])),
                u
            }
            function c(e) {
                if ("feed"in e && e.feed.openSearch$itemsPerPage) {
                    var t = n(e.feed.openSearch$itemsPerPage.$t)
                      , o = n(e.feed.openSearch$startIndex.$t);
                    o + t < n(e.feed.openSearch$totalResults.$t) && (e.paging = {
                        next: "?start=" + (o + t)
                    })
                } else
                    "nextPageToken"in e && (e.paging = {
                        next: "?pageToken=" + e.nextPageToken
                    })
            }
            function d() {
                var e = []
                  , t = (1e10 * Math.random()).toString(32)
                  , n = 0
                  , o = "\r\n"
                  , i = o + "--" + t
                  , r = function() {}
                  , a = /^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i;
                function s(e) {
                    var t = new FileReader;
                    t.onload = function(t) {
                        l(btoa(t.target.result), e.type + o + "Content-Transfer-Encoding: base64")
                    }
                    ,
                    t.readAsBinaryString(e)
                }
                function l(t, i) {
                    e.push(o + "Content-Type: " + i + o + o + t),
                    n--,
                    r()
                }
                this.append = function(e, t) {
                    "string" != typeof e && "length"in Object(e) || (e = [e]);
                    for (var i = 0; i < e.length; i++) {
                        n++;
                        var r = e[i];
                        if ("undefined" != typeof File && r instanceof File || "undefined" != typeof Blob && r instanceof Blob)
                            s(r);
                        else if ("string" == typeof r && r.match(a)) {
                            var u = r.match(a);
                            l(r.replace(a, ""), u[1] + o + "Content-Transfer-Encoding: base64")
                        } else
                            l(r, t)
                    }
                }
                ,
                this.onready = function(o) {
                    (r = function() {
                        0 === n && (e.unshift(""),
                        e.push("--"),
                        o(e.join(i), t),
                        e = [])
                    }
                    )()
                }
            }
            function f(e, t) {
                var n, o = {};
                if (e.data && "undefined" != typeof HTMLInputElement && e.data instanceof HTMLInputElement && (e.data = {
                    file: e.data
                }),
                !e.data.name && Object(Object(e.data.file).files).length && "post" === e.method && (e.data.name = e.data.file.files[0].name),
                "post" === e.method ? e.data = {
                    title: e.data.name,
                    parents: [{
                        id: e.data.parent || "root"
                    }],
                    file: e.data.file
                } : (o = e.data,
                e.data = {},
                o.parent && (e.data.parents = [{
                    id: e.data.parent || "root"
                }]),
                o.file && (e.data.file = o.file),
                o.name && (e.data.title = o.name)),
                !("file"in e.data) || (n = e.data.file,
                delete e.data.file,
                "object" == typeof n && "files"in n && (n = n.files),
                n && n.length)) {
                    var i = new d;
                    i.append(JSON.stringify(e.data), "application/json"),
                    n && i.append(n),
                    i.onready((function(n, i) {
                        e.headers["content-type"] = 'multipart/related; boundary="' + i + '"',
                        e.data = n,
                        t("upload/drive/v2/files" + (o.id ? "/" + o.id : "") + "?uploadType=multipart")
                    }
                    ))
                } else
                    t({
                        error: {
                            code: "request_invalid",
                            message: "There were no files attached with this request to upload"
                        }
                    })
            }
            e.init({
                google: {
                    name: "Google Sign-In",
                    oauth: {
                        version: 2,
                        auth: "https://accounts.google.com/o/oauth2/v2/auth",
                        grant: "https://www.googleapis.com/oauth2/v4/token"
                    },
                    scope: {
                        basic: "openid profile",
                        email: "email",
                        birthday: "",
                        events: "",
                        photos: "https://picasaweb.google.com/data/",
                        videos: "http://gdata.youtube.com",
                        files: "https://www.googleapis.com/auth/drive.readonly",
                        publish: "",
                        publish_files: "https://www.googleapis.com/auth/drive",
                        share: "",
                        create_event: "",
                        offline_access: ""
                    },
                    scope_delim: " ",
                    login: function(e) {
                        "code" === e.qs.response_type ? e.qs.access_type = "offline" : e.qs.response_type.indexOf("id_token") > -1 && (e.qs.nonce = parseInt(1e12 * Math.random(), 10).toString(36)),
                        e.options.force && (e.qs.prompt = "consent")
                    },
                    base: "https://www.googleapis.com/",
                    get: {
                        me: "oauth2/v3/userinfo?alt=json",
                        "me/following": t,
                        "me/followers": t,
                        "me/contacts": t,
                        "me/albums": "https://picasaweb.google.com/data/feed/api/user/default?alt=json&max-results=@{limit|100}&start-index=@{start|1}",
                        "me/album": function(e, t) {
                            var n = e.query.id;
                            delete e.query.id,
                            t(n.replace("/entry/", "/feed/"))
                        },
                        "me/photos": "https://picasaweb.google.com/data/feed/api/user/default?alt=json&kind=photo&max-results=@{limit|100}&start-index=@{start|1}",
                        "me/file": "drive/v2/files/@{id}",
                        "me/files": "drive/v2/files?q=%22@{parent|root}%22+in+parents+and+trashed=false&maxResults=@{limit|100}",
                        "me/folders": "drive/v2/files?q=%22@{id|root}%22+in+parents+and+mimeType+=+%22application/vnd.google-apps.folder%22+and+trashed=false&maxResults=@{limit|100}",
                        "me/folder": "drive/v2/files?q=%22@{id|root}%22+in+parents+and+trashed=false&maxResults=@{limit|100}"
                    },
                    post: {
                        "me/files": f,
                        "me/folders": function(e, t) {
                            e.data = {
                                title: e.data.name,
                                parents: [{
                                    id: e.data.parent || "root"
                                }],
                                mimeType: "application/vnd.google-apps.folder"
                            },
                            t("drive/v2/files")
                        }
                    },
                    put: {
                        "me/files": f
                    },
                    del: {
                        "me/files": "drive/v2/files/@{id}",
                        "me/folder": "drive/v2/files/@{id}"
                    },
                    patch: {
                        "me/file": "drive/v2/files/@{id}"
                    },
                    wrap: {
                        me: function(e) {
                            return e.sub && (e.id = e.sub),
                            e.id && (e.last_name = e.family_name || (e.name ? e.name.familyName : null),
                            e.first_name = e.given_name || (e.name ? e.name.givenName : null),
                            e.emails && e.emails.length && (e.email = e.emails[0].value),
                            s(e)),
                            e
                        },
                        "me/friends": function(e) {
                            return e.items && (c(e),
                            e.data = e.items,
                            e.data.forEach(s),
                            delete e.items),
                            e
                        },
                        "me/contacts": l,
                        "me/followers": l,
                        "me/following": l,
                        "me/share": o,
                        "me/feed": o,
                        "me/albums": a,
                        "me/photos": function(e) {
                            return "feed"in e && (e.data = "entry"in e.feed ? e.feed.entry.map(u) : [],
                            delete e.feed),
                            e
                        },
                        default: a
                    },
                    xhr: function(t) {
                        return "post" === t.method || "put" === t.method ? function(e) {
                            if ("object" == typeof e.data)
                                try {
                                    e.data = JSON.stringify(e.data),
                                    e.headers["content-type"] = "application/json"
                                } catch (e) {}
                        }(t) : "patch" === t.method && (e.utils.extend(t.query, t.data),
                        t.data = null),
                        !0
                    },
                    form: !1
                }
            })
        }(i),
        function(e) {
            function t(e) {
                return "string" == typeof e ? {
                    error: {
                        code: "invalid_request",
                        message: e
                    }
                } : (e && "meta"in e && "error_type"in e.meta && (e.error = {
                    code: e.meta.error_type,
                    message: e.meta.error_message
                }),
                e)
            }
            function n(e) {
                return i(e),
                e && "data"in e && e.data.forEach(o),
                e
            }
            function o(e) {
                e.id && (e.thumbnail = e.profile_picture,
                e.name = e.full_name || e.username)
            }
            function i(e) {
                "pagination"in e && (e.paging = {
                    next: e.pagination.next_url
                },
                delete e.pagination)
            }
            e.init({
                instagram: {
                    name: "Instagram",
                    oauth: {
                        version: 2,
                        auth: "https://instagram.com/oauth/authorize/",
                        grant: "https://api.instagram.com/oauth/access_token"
                    },
                    refresh: !0,
                    scope: {
                        basic: "basic",
                        photos: "",
                        friends: "relationships",
                        publish: "likes comments",
                        email: "",
                        share: "",
                        publish_files: "",
                        files: "",
                        videos: "",
                        offline_access: ""
                    },
                    scope_delim: " ",
                    base: "https://api.instagram.com/v1/",
                    get: {
                        me: "users/self",
                        "me/feed": "users/self/feed?count=@{limit|100}",
                        "me/photos": "users/self/media/recent?min_id=0&count=@{limit|100}",
                        "me/friends": "users/self/follows?count=@{limit|100}",
                        "me/following": "users/self/follows?count=@{limit|100}",
                        "me/followers": "users/self/followed-by?count=@{limit|100}",
                        "friend/photos": "users/@{id}/media/recent?min_id=0&count=@{limit|100}"
                    },
                    post: {
                        "me/like": function(e, t) {
                            var n = e.data.id;
                            e.data = {},
                            t("media/" + n + "/likes")
                        }
                    },
                    del: {
                        "me/like": "media/@{id}/likes"
                    },
                    wrap: {
                        me: function(e) {
                            return t(e),
                            "data"in e && (e.id = e.data.id,
                            e.thumbnail = e.data.profile_picture,
                            e.name = e.data.full_name || e.data.username),
                            e
                        },
                        "me/friends": n,
                        "me/following": n,
                        "me/followers": n,
                        "me/photos": function(e) {
                            return t(e),
                            i(e),
                            "data"in e && (e.data = e.data.filter((function(e) {
                                return "image" === e.type
                            }
                            )),
                            e.data.forEach((function(e) {
                                e.name = e.caption ? e.caption.text : null,
                                e.thumbnail = e.images.thumbnail.url,
                                e.picture = e.images.standard_resolution.url,
                                e.pictures = Object.keys(e.images).map((function(t) {
                                    return {
                                        source: (n = e.images[t]).url,
                                        width: n.width,
                                        height: n.height
                                    };
                                    var n
                                }
                                )).sort((function(e, t) {
                                    return e.width - t.width
                                }
                                ))
                            }
                            ))),
                            e
                        },
                        default: function(e) {
                            return i(e = t(e)),
                            e
                        }
                    },
                    xhr: function(e, t) {
                        var n = e.method
                          , o = "get" !== n;
                        return o && ("post" !== n && "put" !== n || !e.query.access_token || (e.data.access_token = e.query.access_token,
                        delete e.query.access_token),
                        e.proxy = o),
                        o
                    },
                    form: !1
                }
            })
        }(i),
        function(e) {
            function t(e, t) {
                var n, o;
                return e && "Message"in e && (o = e.Message,
                delete e.Message,
                "ErrorCode"in e ? (n = e.ErrorCode,
                delete e.ErrorCode) : n = function(e) {
                    switch (e.statusCode) {
                    case 400:
                        return "invalid_request";
                    case 403:
                        return "stale_token";
                    case 401:
                        return "invalid_token";
                    default:
                        return "server_error"
                    }
                }(t),
                e.error = {
                    code: n,
                    message: o,
                    details: e
                }),
                e
            }
            e.init({
                joinme: {
                    name: "join.me",
                    oauth: {
                        version: 2,
                        auth: "https://secure.join.me/api/public/v1/auth/oauth2",
                        grant: "https://secure.join.me/api/public/v1/auth/oauth2"
                    },
                    refresh: !1,
                    scope: {
                        basic: "user_info",
                        user: "user_info",
                        scheduler: "scheduler",
                        start: "start_meeting",
                        email: "",
                        friends: "",
                        share: "",
                        publish: "",
                        photos: "",
                        publish_files: "",
                        files: "",
                        videos: "",
                        offline_access: ""
                    },
                    scope_delim: " ",
                    login: function(e) {
                        e.options.popup.width = 400,
                        e.options.popup.height = 700
                    },
                    base: "https://api.join.me/v1/",
                    get: {
                        me: "user",
                        meetings: "meetings",
                        "meetings/info": "meetings/@{id}"
                    },
                    post: {
                        "meetings/start/adhoc": function(e, t) {
                            t("meetings/start")
                        },
                        "meetings/start/scheduled": function(e, t) {
                            var n = e.data.meetingId;
                            e.data = {},
                            t("meetings/" + n + "/start")
                        },
                        "meetings/schedule": function(e, t) {
                            t("meetings")
                        }
                    },
                    patch: {
                        "meetings/update": function(e, t) {
                            t("meetings/" + e.data.meetingId)
                        }
                    },
                    del: {
                        "meetings/delete": "meetings/@{id}"
                    },
                    wrap: {
                        me: function(e, n) {
                            return t(e, n),
                            e.email ? (e.name = e.fullName,
                            e.first_name = e.name.split(" ")[0],
                            e.last_name = e.name.split(" ")[1],
                            e.id = e.email,
                            e) : e
                        },
                        default: function(e, n) {
                            return t(e, n),
                            e
                        }
                    },
                    xhr: function(e, t) {
                        var n = t.access_token;
                        return delete t.access_token,
                        e.headers.Authorization = "Bearer " + n,
                        "get" !== e.method && e.data && (e.headers["Content-Type"] = "application/json",
                        "object" == typeof e.data && (e.data = JSON.stringify(e.data))),
                        "put" === e.method && (e.method = "patch"),
                        !0
                    }
                }
            })
        }(i),
        function(e) {
            function t(e) {
                e && "errorCode"in e && (e.error = {
                    code: e.status,
                    message: e.message
                })
            }
            function n(e) {
                if (!e.error)
                    return e.first_name = e.firstName,
                    e.last_name = e.lastName,
                    e.name = e.formattedName || e.first_name + " " + e.last_name,
                    e.thumbnail = e.pictureUrl,
                    e.email = e.emailAddress,
                    e
            }
            function o(e) {
                return t(e),
                i(e),
                e.values && (e.data = e.values.map(n),
                delete e.values),
                e
            }
            function i(e) {
                "_count"in e && "_start"in e && e._count + e._start < e._total && (e.paging = {
                    next: "?start=" + (e._start + e._count) + "&count=" + e._count
                })
            }
            function r(e) {
                e.access_token && (e.oauth2_access_token = e.access_token,
                delete e.access_token)
            }
            function a(e, t) {
                e.headers["x-li-format"] = "json";
                var n = e.data.id;
                e.data = ("delete" !== e.method).toString(),
                e.method = "put",
                t("people/~/network/updates/key=" + n + "/is-liked")
            }
            e.init({
                linkedin: {
                    oauth: {
                        version: 2,
                        response_type: "code",
                        auth: "https://www.linkedin.com/uas/oauth2/authorization",
                        grant: "https://www.linkedin.com/uas/oauth2/accessToken"
                    },
                    refresh: !0,
                    scope: {
                        basic: "r_basicprofile",
                        email: "r_emailaddress",
                        files: "",
                        friends: "",
                        photos: "",
                        publish: "w_share",
                        publish_files: "w_share",
                        share: "",
                        videos: "",
                        offline_access: ""
                    },
                    scope_delim: " ",
                    base: "https://api.linkedin.com/v1/",
                    get: {
                        me: "people/~:(picture-url,first-name,last-name,id,formatted-name,email-address)",
                        "me/share": "people/~/network/updates?count=@{limit|250}"
                    },
                    post: {
                        "me/share": function(e, t) {
                            var n = {
                                visibility: {
                                    code: "anyone"
                                }
                            };
                            e.data.id ? n.attribution = {
                                share: {
                                    id: e.data.id
                                }
                            } : (n.comment = e.data.message,
                            e.data.picture && e.data.link && (n.content = {
                                "submitted-url": e.data.link,
                                "submitted-image-url": e.data.picture
                            })),
                            e.data = JSON.stringify(n),
                            t("people/~/shares?format=json")
                        },
                        "me/like": a
                    },
                    del: {
                        "me/like": a
                    },
                    wrap: {
                        me: function(e) {
                            return t(e),
                            n(e),
                            e
                        },
                        "me/friends": o,
                        "me/following": o,
                        "me/followers": o,
                        "me/share": function(e) {
                            return t(e),
                            i(e),
                            e.values && (e.data = e.values.map(n),
                            e.data.forEach((function(e) {
                                e.message = e.headline
                            }
                            )),
                            delete e.values),
                            e
                        },
                        default: function(e, n) {
                            t(e),
                            function(e, t) {
                                "{}" === JSON.stringify(e) && 200 === t.statusCode && (e.success = !0)
                            }(e, n),
                            i(e)
                        }
                    },
                    jsonp: function(e, t) {
                        r(t),
                        "get" === e.method && (t.format = "jsonp",
                        t["error-callback"] = e.callbackID)
                    },
                    xhr: function(e, t) {
                        return "get" !== e.method && (r(t),
                        e.headers["Content-Type"] = "application/json",
                        e.headers["x-li-format"] = "json",
                        e.proxy = !0,
                        !0)
                    }
                }
            })
        }(i),
        function(e) {
            function t(e, t) {
                var n = t.access_token;
                return delete t.access_token,
                t.oauth_token = n,
                t["_status_code_map[302]"] = 200,
                !0
            }
            function n(e) {
                return e.id && (e.picture = e.avatar_url,
                e.thumbnail = e.avatar_url,
                e.name = e.username || e.full_name),
                e
            }
            e.init({
                soundcloud: {
                    name: "SoundCloud",
                    oauth: {
                        version: 2,
                        auth: "https://soundcloud.com/connect",
                        grant: "https://soundcloud.com/oauth2/token"
                    },
                    base: "https://api.soundcloud.com/",
                    get: {
                        me: "me.json",
                        "me/friends": "me/followings.json",
                        "me/followers": "me/followers.json",
                        "me/following": "me/followings.json",
                        default: function(e, t) {
                            t(e.path + ".json")
                        }
                    },
                    wrap: {
                        me: function(e) {
                            return n(e),
                            e
                        },
                        default: function(e) {
                            var t;
                            return Array.isArray(e) && (e = {
                                data: e.map(n)
                            }),
                            "next_href"in (t = e) && (t.paging = {
                                next: t.next_href
                            }),
                            e
                        }
                    },
                    xhr: t,
                    jsonp: t
                }
            })
        }(i),
        function(e) {
            function t(e) {
                return e.id && (e.name = e.display_name,
                e.thumbnail = e.images.length ? e.images[0].url : null,
                e.picture = e.thumbnail),
                e
            }
            function n(e) {
                e && "next"in e && (e.paging = {
                    next: e.next
                },
                delete e.next)
            }
            e.init({
                spotify: {
                    name: "Spotify",
                    oauth: {
                        version: 2,
                        auth: "https://accounts.spotify.com/authorize",
                        grant: "https://accounts.spotify.com/api/token"
                    },
                    scope_delim: " ",
                    scope: {
                        basic: "",
                        photos: "",
                        friends: "user-follow-read",
                        publish: "user-library-read",
                        email: "user-read-email",
                        share: "",
                        publish_files: "",
                        files: "",
                        videos: "",
                        offline_access: ""
                    },
                    base: "https://api.spotify.com",
                    get: {
                        me: "/v1/me",
                        "me/following": "/v1/me/following?type=artist",
                        "me/like": "/v1/me/tracks"
                    },
                    wrap: {
                        me: t,
                        "me/following": function(e) {
                            return n(e),
                            e && "artists"in e && (e.data = e.artists.items.forEach(t)),
                            e
                        },
                        "me/like": function(e) {
                            return n(e),
                            e.data = e.items,
                            e
                        }
                    },
                    xhr: function(e, t) {
                        var n = t.access_token;
                        return delete t.access_token,
                        e.headers.Authorization = "Bearer " + n,
                        !0
                    },
                    jsonp: !1
                }
            })
        }(i),
        function(e) {
            var t = "https://api.twitter.com/";
            function n(e) {
                if (e.id) {
                    if (e.name) {
                        var t = e.name.split(" ");
                        e.first_name = t.shift(),
                        e.last_name = t.join(" ")
                    }
                    e.thumbnail = e.profile_image_url_https || e.profile_image_url
                }
                return e
            }
            function o(e) {
                return i(e),
                r(e),
                e.users && (e.data = e.users.map(n),
                delete e.users),
                e
            }
            function i(e) {
                if (e.errors) {
                    var t = e.errors[0];
                    e.error = {
                        code: "request_failed",
                        message: t.message
                    }
                }
            }
            function r(e) {
                "next_cursor_str"in e && (e.paging = {
                    next: "?cursor=" + e.next_cursor_str
                })
            }
            e.init({
                twitter: {
                    oauth: {
                        version: "1.0a",
                        auth: t + "oauth/authenticate",
                        request: t + "oauth/request_token",
                        token: t + "oauth/access_token"
                    },
                    login: function(e) {
                        var t = "?force_login=true";
                        this.oauth.auth = this.oauth.auth.replace(t, "") + (e.options.force ? t : "")
                    },
                    base: t + "1.1/",
                    get: {
                        me: "account/verify_credentials.json",
                        "me/friends": "friends/list.json?count=@{limit|200}",
                        "me/following": "friends/list.json?count=@{limit|200}",
                        "me/followers": "followers/list.json?count=@{limit|200}",
                        "me/share": "statuses/user_timeline.json?count=@{limit|200}",
                        "me/like": "favorites/list.json?count=@{limit|200}"
                    },
                    post: {
                        "me/share": function(t, n) {
                            var o = t.data;
                            t.data = null;
                            var i = [];
                            o.message && (i.push(o.message),
                            delete o.message),
                            o.link && (i.push(o.link),
                            delete o.link),
                            o.picture && (i.push(o.picture),
                            delete o.picture),
                            i.length && (o.status = i.join(" ")),
                            o.file ? (o["media[]"] = o.file,
                            delete o.file,
                            t.data = o,
                            n("statuses/update_with_media.json")) : "id"in o ? n("statuses/retweet/" + o.id + ".json") : (e.utils.extend(t.query, o),
                            n("statuses/update.json?include_entities=1"))
                        },
                        "me/like": function(e, t) {
                            var n = e.data.id;
                            e.data = null,
                            t("favorites/create.json?id=" + n)
                        }
                    },
                    del: {
                        "me/like": function(e, t) {
                            e.method = "post";
                            var n = e.data.id;
                            e.data = null,
                            t("favorites/destroy.json?id=" + n)
                        }
                    },
                    wrap: {
                        me: function(e) {
                            return i(e),
                            n(e),
                            e
                        },
                        "me/friends": o,
                        "me/followers": o,
                        "me/following": o,
                        "me/share": function(e) {
                            return i(e),
                            r(e),
                            !e.error && "length"in e ? {
                                data: e
                            } : e
                        },
                        default: function(e) {
                            return r(e = function(e) {
                                return Array.isArray(e) ? {
                                    data: e
                                } : e
                            }(e)),
                            e
                        }
                    },
                    xhr: function(e) {
                        return "get" !== e.method
                    }
                }
            })
        }(i),
        function(e) {
            e.init({
                vk: {
                    name: "Vk",
                    oauth: {
                        version: 2,
                        auth: "https://oauth.vk.com/authorize",
                        grant: "https://oauth.vk.com/access_token"
                    },
                    scope: {
                        email: "email",
                        friends: "friends",
                        photos: "photos",
                        videos: "video",
                        share: "share",
                        offline_access: "offline"
                    },
                    refresh: !0,
                    login: function(e) {
                        e.qs.display = window.navigator && window.navigator.userAgent && /ipad|phone|phone|android/.test(window.navigator.userAgent.toLowerCase()) ? "mobile" : "popup"
                    },
                    base: "https://api.vk.com/method/",
                    get: {
                        me: function(e, t) {
                            e.query.fields = "id,first_name,last_name,photo_max",
                            t("users.get")
                        }
                    },
                    wrap: {
                        me: function(e, t, n) {
                            return function(e) {
                                if (e.error) {
                                    var t = e.error;
                                    e.error = {
                                        code: t.error_code,
                                        message: t.error_msg
                                    }
                                }
                            }(e),
                            function(e, t) {
                                return null !== e && "response"in e && null !== e.response && e.response.length && ((e = e.response[0]).id = e.uid,
                                e.thumbnail = e.picture = e.photo_max,
                                e.name = e.first_name + " " + e.last_name,
                                t.authResponse && null !== t.authResponse.email && (e.email = t.authResponse.email)),
                                e
                            }(e, n)
                        }
                    },
                    xhr: !1,
                    jsonp: !0,
                    form: !1
                }
            })
        }(i),
        function(e) {
            function t(e) {
                return "data"in e && e.data.forEach((function(e) {
                    e.picture && (e.thumbnail = e.picture),
                    e.images && (e.pictures = e.images.map(n).sort((function(e, t) {
                        return e.width - t.width
                    }
                    )))
                }
                )),
                e
            }
            function n(e) {
                return {
                    width: e.width,
                    height: e.height,
                    source: e.source
                }
            }
            function o(e, t, n) {
                if (e.id) {
                    var o = n.query.access_token;
                    if (e.emails && (e.email = e.emails.preferred),
                    !1 !== e.is_friend) {
                        var i = e.user_id || e.id;
                        e.thumbnail = e.picture = "https://apis.live.net/v5.0/" + i + "/picture?access_token=" + o
                    }
                }
                return e
            }
            function i(e, t, n) {
                return "data"in e && e.data.forEach((function(e) {
                    o(e, 0, n)
                }
                )),
                e
            }
            e.init({
                windows: {
                    name: "Windows live",
                    oauth: {
                        version: 2,
                        auth: "https://login.live.com/oauth20_authorize.srf",
                        grant: "https://login.live.com/oauth20_token.srf"
                    },
                    refresh: !0,
                    logout: function() {
                        return "http://login.live.com/oauth20_logout.srf?ts=" + (new Date).getTime()
                    },
                    scope: {
                        basic: "wl.signin,wl.basic",
                        email: "wl.emails",
                        birthday: "wl.birthday",
                        events: "wl.calendars",
                        photos: "wl.photos",
                        videos: "wl.photos",
                        friends: "wl.contacts_emails",
                        files: "wl.skydrive",
                        publish: "wl.share",
                        publish_files: "wl.skydrive_update",
                        share: "wl.share",
                        create_event: "wl.calendars_update,wl.events_create",
                        offline_access: "wl.offline_access"
                    },
                    base: "https://apis.live.net/v5.0/",
                    get: {
                        me: "me",
                        "me/friends": "me/friends",
                        "me/following": "me/contacts",
                        "me/followers": "me/friends",
                        "me/contacts": "me/contacts",
                        "me/albums": "me/albums",
                        "me/album": "@{id}/files",
                        "me/photo": "@{id}",
                        "me/files": "@{parent|me/skydrive}/files",
                        "me/folders": "@{id|me/skydrive}/files",
                        "me/folder": "@{id|me/skydrive}/files"
                    },
                    post: {
                        "me/albums": "me/albums",
                        "me/album": "@{id}/files/",
                        "me/folders": "@{id|me/skydrive/}",
                        "me/files": "@{parent|me/skydrive}/files"
                    },
                    del: {
                        "me/album": "@{id}",
                        "me/photo": "@{id}",
                        "me/folder": "@{id}",
                        "me/files": "@{id}"
                    },
                    wrap: {
                        me: o,
                        "me/friends": i,
                        "me/contacts": i,
                        "me/followers": i,
                        "me/following": i,
                        "me/albums": function(e) {
                            return "data"in e && e.data.forEach((function(e) {
                                e.photos = e.files = "https://apis.live.net/v5.0/" + e.id + "/photos"
                            }
                            )),
                            e
                        },
                        "me/photos": t,
                        default: t
                    },
                    xhr: function(t) {
                        return "get" === t.method || "delete" === t.method || e.utils.hasBinary(t.data) || ("string" == typeof t.data.file ? t.data.file = e.utils.toBlob(t.data.file) : (t.data = JSON.stringify(t.data),
                        t.headers = {
                            "Content-Type": "application/json"
                        })),
                        !0
                    },
                    jsonp: function(t) {
                        "get" === t.method || e.utils.hasBinary(t.data) || (t.data.method = t.method,
                        t.method = "get")
                    }
                }
            })
        }(i),
        function(e) {
            function t(e) {
                e && "meta"in e && "error_type"in e.meta && (e.error = {
                    code: e.meta.error_type,
                    message: e.meta.error_message
                })
            }
            function n(e, n, r) {
                return t(e),
                i(e, 0, r),
                e.query && e.query.results && e.query.results.contact && (e.data = e.query.results.contact,
                delete e.query,
                Array.isArray(e.data) || (e.data = [e.data]),
                e.data.forEach(o)),
                e
            }
            function o(e) {
                e.id = null,
                !e.fields || e.fields instanceof Array || (e.fields = [e.fields]),
                (e.fields || []).forEach((function(t) {
                    "email" === t.type && (e.email = t.value),
                    "name" === t.type && (e.first_name = t.value.givenName,
                    e.last_name = t.value.familyName,
                    e.name = t.value.givenName + " " + t.value.familyName),
                    "yahooid" === t.type && (e.id = t.value)
                }
                ))
            }
            function i(e, t, n) {
                return e.query && e.query.count && n.options && (e.paging = {
                    next: "?start=" + (e.query.count + (+n.options.start || 1))
                }),
                e
            }
            function r(e) {
                return "https://query.yahooapis.com/v1/yql?q=" + (e + " limit @{limit|100} offset @{start|0}").replace(/\s/g, "%20") + "&format=json"
            }
            e.init({
                yahoo: {
                    oauth: {
                        version: "1.0a",
                        auth: "https://api.login.yahoo.com/oauth/v2/request_auth",
                        request: "https://api.login.yahoo.com/oauth/v2/get_request_token",
                        token: "https://api.login.yahoo.com/oauth/v2/get_token"
                    },
                    login: function(e) {
                        e.options.popup.width = 560;
                        try {
                            delete e.qs.state.scope
                        } catch (e) {}
                    },
                    base: "https://social.yahooapis.com/v1/",
                    get: {
                        me: r("select * from social.profile(0) where guid=me"),
                        "me/friends": r("select * from social.contacts(0) where guid=me"),
                        "me/following": r("select * from social.contacts(0) where guid=me")
                    },
                    wrap: {
                        me: function(e) {
                            if (t(e),
                            e.query && e.query.results && e.query.results.profile) {
                                (e = e.query.results.profile).id = e.guid,
                                e.last_name = e.familyName,
                                e.first_name = e.givenName || e.nickname;
                                var n = [];
                                e.first_name && n.push(e.first_name),
                                e.last_name && n.push(e.last_name),
                                e.name = n.join(" "),
                                e.email = e.emails && e.emails[0] ? e.emails[0].handle : null,
                                e.thumbnail = e.image ? e.image.imageUrl : null
                            }
                            return e
                        },
                        "me/friends": n,
                        "me/following": n,
                        default: i
                    }
                }
            })
        }(i),
        void 0 === (o = function() {
            return i
        }
        .call(t, n, t, e)) || (e.exports = o),
        e.exports && (e.exports = i)
    }
}]);
