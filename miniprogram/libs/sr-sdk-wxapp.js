! function(t, e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).SRT = e()
}(this, (function() {
  "use strict";
  /*! *****************************************************************************
      Copyright (c) Microsoft Corporation. All rights reserved.
      Licensed under the Apache License, Version 2.0 (the "License"); you may not use
      this file except in compliance with the License. You may obtain a copy of the
      License at http://www.apache.org/licenses/LICENSE-2.0

      THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
      KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
      WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
      MERCHANTABLITY OR NON-INFRINGEMENT.

      See the Apache Version 2.0 License for specific language governing permissions
      and limitations under the License.
      ***************************************************************************** */
  var t = function(e, r) {
    return (t = Object.setPrototypeOf || {
        __proto__: []
      }
      instanceof Array && function(t, e) {
        t.__proto__ = e
      } || function(t, e) {
        for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
      })(e, r)
  };

  function e(e, r) {
    function n() {
      this.constructor = e
    }
    t(e, r), e.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
  }
  var r = function() {
    return (r = Object.assign || function(t) {
      for (var e, r = 1, n = arguments.length; r < n; r++)
        for (var o in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
      return t
    }).apply(this, arguments)
  };

  function n(t, e, r, n) {
    var o, i = arguments.length,
      a = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, r) : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, r, n);
    else
      for (var c = t.length - 1; c >= 0; c--)(o = t[c]) && (a = (i < 3 ? o(a) : i > 3 ? o(e, r, a) : o(e, r)) || a);
    return i > 3 && a && Object.defineProperty(e, r, a), a
  }

  function o() {
    for (var t = 0, e = 0, r = arguments.length; e < r; e++) t += arguments[e].length;
    var n = Array(t),
      o = 0;
    for (e = 0; e < r; e++)
      for (var i = arguments[e], a = 0, c = i.length; a < c; a++, o++) n[o] = i[a];
    return n
  }
  try {
    Object.entries || (Object.entries = function(t) {
      for (var e = Object.keys(t), r = e.length, n = new Array(r); r--;) n[r] = [e[r], t[e[r]]];
      return n
    }), Array.prototype.includes || (Array.prototype.includes = function(t) {
      return !!~this.indexOf(t)
    })
  } catch (t) {
    console.error("polyfill exec failed", t)
  }
  var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    a = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,
    c = function(t) {
      return function(t) {
        for (var e, r, n, o, a = "", c = 0, s = (t = String(t)).length % 3; c < t.length;) {
          if ((r = t.charCodeAt(c++)) > 255 || (n = t.charCodeAt(c++)) > 255 || (o = t.charCodeAt(c++)) > 255) throw new TypeError("Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.");
          a += i.charAt((e = r << 16 | n << 8 | o) >> 18 & 63) + i.charAt(e >> 12 & 63) + i.charAt(e >> 6 & 63) + i.charAt(63 & e)
        }
        return s ? a.slice(0, s - 3) + "===".substring(s) : a
      }(encodeURIComponent(t).replace(/%([0-9A-F]{2})/g, (function(t, e) {
        var r;
        return r = "0x" + e, String.fromCharCode(r)
      })))
    },
    s = function(t) {
      return decodeURIComponent(function(t) {
        if (t = String(t).replace(/[\t\n\f\r ]+/g, ""), !a.test(t)) throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
        t += "==".slice(2 - (3 & t.length));
        for (var e, r, n, o = "", c = 0; c < t.length;) e = i.indexOf(t.charAt(c++)) << 18 | i.indexOf(t.charAt(c++)) << 12 | (r = i.indexOf(t.charAt(c++))) << 6 | (n = i.indexOf(t.charAt(c++))), o += 64 === r ? String.fromCharCode(e >> 16 & 255) : 64 === n ? String.fromCharCode(e >> 16 & 255, e >> 8 & 255) : String.fromCharCode(e >> 16 & 255, e >> 8 & 255, 255 & e);
        return o
      }(t).split("").map((function(t) {
        return "%" + ("00" + t.charCodeAt(0).toString(16)).slice(-2)
      })).join(""))
    },
    u = {
      encode: function(t) {
        return c(t).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
      },
      decode: function(t) {
        var e = (t = t.replace(/\-/g, "+").replace(/_/g, "/")).length % 4;
        return e > 0 && (t += "====".substring(e)), s(t)
      }
    },
    h = Object.prototype.toString,
    p = u,
    f = function(t) {
      return "[object Object]" === h.call(t)
    },
    l = function(t) {
      return "[object Array]" === h.call(t)
    },
    d = function(t, e) {
      var r;
      void 0 === e && (e = 0);
      var n = [];
      return function() {
        for (var o = arguments, i = [], a = 0; a < arguments.length; a++) i[a] = o[a];
        return clearTimeout(r), r = setTimeout((function() {
          var e = t.apply(void 0, i);
          n.forEach((function(t) {
            return t(e)
          })), n = []
        }), e), new Promise((function(t) {
          return n.push(t)
        }))
      }
    },
    g = function() {
      var t = (new Date).getTime();
      return "xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
        var r = (t + 16 * Math.random()) % 16 | 0;
        return t = Math.floor(t / 16), ("x" === e ? r : 7 & r | 8).toString(16)
      }))
    },
    v = function() {
      for (var t = arguments, e = [], r = 0; r < arguments.length; r++) e[r] = t[r];
      return 0 === e.length ? {} : e.length < 2 ? e[0] : e.reduce((function(t, e) {
        if (!f(t) || !f(e)) return console.error("deepMerge arguments only access object"), t;
        var r = t || {};
        return Object.entries(e).forEach((function(e) {
          var n = e[0],
            i = e[1];
          if (void 0 !== i)
            if (t[n])
              if (l(t[n])) {
                if (!l(i)) return void(r[n] = i);
                var a = l(i) ? i : [i];
                r[n] = o(t[n], a)
              } else f(t[n]) ? r[n] = v(t[n], i) : r[n] = i;
          else r[n] = i
        })), r
      }))
    },
    y = function(t) {
      return !!/^[a-zA-Z\$_][a-zA-Z\d_]*$/.test(t)
    },
    x = function(t) {
      function n(e) {
        var r = t.call(this, e.request) || this;
        return r.stack = [], r.initialize = function() {
          return Promise.resolve(!0)
        }, r.add = function(t) {
          r.stack.push(t)
        }, r.getItems = function() {
          return r.stack
        }, r.unshift = function(t) {
          var e;
          return (e = r.stack).unshift.apply(e, t)
        }, r.clean = function() {
          var t = r.stack;
          return r.stack = [], t
        }, r.option = e, r.initialize(), r
      }
      return e(n, t), n.prototype.flush = function(t) {
        var e = this;
        if (void 0 === t && (t = {}), this.stack.length) {
          var n = this.stack.map((function(e) {
            return e.props = r(r({}, e.props), t), e
          }));
          this.stack = [], this.upload({
            events: n
          }).then((function(t) {
            t.success || (e.stack = n)
          })).catch((function() {
            e.stack = n
          }))
        }
      }, n
    }((function(t) {
      this.delay = 100, this.upload = d(t, this.delay)
    })),
    m = function(t, e, r) {
      var n = r.value;
      return r.value = function() {
        var t;
        try {
          t = n.apply(this, arguments)
        } catch (t) {
          try {
            console.error("Calling " + e + " error with", arguments), console.error(t);
            var r = this.getServerUrl();
            this.request({
              type: "sdk api exec error",
              props: {
                sr_sdk_version: this.version,
                system_info: this.getSystemInfo(),
                message: (t || {}).message || t,
                stack: (t || {}).stack
              }
            }, {
              url: r,
              method: "POST"
            })
          } catch (t) {}
        }
        return t
      }, r
    },
    _ = function(t, e, r) {
      var n = r.value;
      return r.value = function() {
        if (this.inited) return n.apply(this, arguments);
        console.error("\u8bf7\u5148\u5b8c\u6210\u521d\u59cb\u5316")
      }, r
    },
    S = {
      SDK: "__SR_SDK_TRACKER__",
      TRACKS: "TRACKS",
      USER_INFO: "USER_INFO"
    },
    w = {
      WAITING: "WAITING",
      REPORTING: "REPORTING",
      PAUSED: "PAUSED"
    },
    k = {
      MISS: "should exec cacheManagerInitialize first"
    },
    C = {};
  try {
    C = JSON.parse('{"mp":{"version":{"max":"1.1.8","min":"1.1.8"},"download":"https://sr-home-1257214331.cos.ap-guangzhou.myqcloud.com/sdk/sdk-weapp/index.js"},"xxx-for-git":{}}')
  } catch (t) {}
  var A = function() {
    function t() {
      var t = this;
      this.versions = C, this.env = "production", this.cachePrefix = S.SDK, this.inited = !1, this.option = {}, this.context = {}, this.reportState = w.WAITING, this.triggerFlush = d((function() {
        t.checkAndUpload()
      }), 1e3), this.eventDataFmatter = function(e) {
        var n = +new Date,
          o = t.getPageInfo();
        if (void 0 !== t._onQueue) {
          var i = t._onQueue(e);
          f(e) ? e = i : console.warn("eventDataFmatter should return Object type")
        }
        return r(r(r({}, o), e), {
          time: n
        })
      }, this.checkRequiredOptionItem = function() {
        return !!t.option.token || (t.option.skipTokenCheck ? (console.warn("token \u672a\u914d\u7f6e\uff0c\u5df2\u8df3\u8fc7\u8be5\u68c0\u67e5"), !0) : (console.error("sdk.init - Option \u5fc5\u8981\u53c2\u6570\u914d\u7f6e\u7f3a\u5931\uff0c\u8bf7\u68c0\u67e5"), !1))
      }, this.checkVersionInfo = function() {
        t.setContext({
          sr_sdk_version: t.version
        });
        var e = "https://sr-home-1257214331.cos.ap-guangzhou.myqcloud.com/sdk/sr-sdk-version-info.json?timesamp=" + Date.now();
        return t.request({}, {
          url: e,
          method: "GET"
        }).then((function(e) {
          var r = (e.data || {})[t.name],
            n = !0;
          if (r) {
            var o = (((t.versions || {})[t.name] || {}).version || {}).max;
            return o && (r.version.min > o ? (console.error("\u5f53\u524dSDK\u7248\u672c\u8fc7\u4f4e, \u8bf7\u5347\u7ea7\uff01"), n = !1) : r.version.max > o && console.warn("\u5f53\u524dSDK\u6709\u66f4\u65b0, \u63a8\u8350\u5347\u7ea7\uff01")), {
              success: n,
              data: r,
              msg: ""
            }
          }
        })).catch((function(t) {
          return void 0 === t && (t = {}), {
            success: !1,
            data: void 0,
            msg: t.errMsg
          }
        }))
      }, this.queueInitialize = function() {
        var e = t.getServerUrl();
        return t.queue = new x({
          request: function(n) {
            var o = n.events.map((function(e) {
              return r(r({}, e), {
                from: "sr-sdk-wxapp",
                tracking_id: t.tracking_id
              })
            }));
            return t.request(o, {
              url: e,
              method: "POST"
            }).catch((function(t) {
              return console.error("APICaller error", t), t
            }))
          }
        }), !0
      }, this.tracking_id = g(), this.checkStaticMethods()
    }
    return t.prototype.init = function(t) {
      if (this.inited) return this;
      if (this.version = ((this.versions[this.name] || {}).version || {}).max, this.option = v(this.defaultOptions, this.option, t), !this.checkRequiredOptionItem()) return this;
      this.cacheManagerInitialize();
      try {
        this.proxyInitialize()
      } catch (t) {
        this.errorHandle(t)
      }
      return this.queueInitialize(), this.contextInitialize(), this.inited = !0, this.checkFallback(), this.option.autoStart && this.startReport(), this.checkVersionInfo(), this
    }, t.prototype.track = function(t, e) {
      var r = this.option.debug;
      JSON.stringify(e || {}).length > 5e3 && console.warn("\u76d1\u6d4b\u5230\u8d85\u8fc75000\u7684\u4e0a\u62a5\u65e5\u5fd7\uff1a" + t);
      var n = this.eventDataFmatter(e);
      return r && console && "function" == typeof console.log && console.log("\u3010Track\u3011 " + t, n), this.queue.add({
        type: t,
        props: n
      }), this.triggerFlush(), this
    }, t.prototype.setContext = function(t) {
      return console.warn("setContext \u4e0d\u5728\u63a8\u8350\u4f7f\u7528\uff0c\u8bf7\u7528\u66f4\u8f7b\u4fbf\u7684 setUser\u3001setChan\u7b49\u65b9\u6cd5\u4ee3\u66ff"), this.context = r(r(r({}, this.context), t), {
        wx_user: r(r({}, this.context.wx_user), t.wx_user || {}),
        chan: r(r({}, this.context.chan), t.chan || {})
      }), this
    }, t.prototype.setUser = function(t) {
      return void 0 === t && (t = {}), this.context = Object.assign({}, this.context, {
        wx_user: r(r({}, this.context.wx_user), t)
      }), this.setCache(S.USER_INFO, this.context.wx_user), this
    }, t.prototype.setChan = function(t) {
      var e = t.chan_id,
        n = (this.context.chan || {}).chan_id;
      return this.context = Object.assign({}, this.context, {
        chan: r(r(r({}, this.context.chan), t), {
          chan_id: e || (n || "")
        })
      }), this
    }, t.prototype.startReport = function() {
      return this.reportState = w.REPORTING, this.triggerFlush(), this
    }, t.prototype.resumeReport = function() {
      var t = this.getCache(S.TRACKS) || [];
      return this.queue.unshift(t), this.reportState === w.PAUSED && (this.reportState = w.REPORTING), this.triggerFlush(), this
    }, t.prototype.pauseReport = function() {
      return this.reportState = w.PAUSED, this.setCache(S.TRACKS, this.queue.clean()), this
    }, t.prototype.flush = function() {
      return this.queue.flush(this.context), this
    }, t.prototype.onQueue = function(t) {
      return this._onQueue = t, this
    }, t.prototype.getInfo = function() {
      var t = {
        option: this.option,
        tracking_id: this.tracking_id,
        context: this.context,
        is_dev: this.isDev()
      };
      return "SR_SDK_INFO=" + p.encode(JSON.stringify(t))
    }, t.prototype.checkStaticMethods = function() {
      if ("development" === this.env) try {
        var t = this.constructor;
        ["create"].forEach((function(e) {
          !t[e] && console.error("static " + e + " should be implement")
        }))
      } catch (t) {
        console.error("checkStaticMethods error", t)
      }
    }, t.prototype.checkFallback = function() {
      var t = this;
      setTimeout((function() {
        t.checkAndUpload(), t.checkFallback()
      }), 1e4)
    }, t.prototype.checkAndUpload = function() {
      this.reportState === w.REPORTING && this.flush()
    }, t.prototype.contextInitialize = function() {
      var t = this.getUser();
      this.context = v(this.context, {
        wx_user: r({
          app_id: this.option.appid
        }, t),
        chan: {}
      })
    }, t.prototype.getUser = function() {
      var t = this.context.wx_user || this.getCache(S.USER_INFO) || {};
      return t.local_id || (t = {
        local_id: g()
      }, this.setCache(S.USER_INFO, t)), t
    }, t.prototype.cacheManagerInitialize = function() {
      var t = this.getCacheManager();
      this.cacheManager = t
    }, t.prototype.getCache = function(t) {
      return this.cacheManager ? (this.cacheManager.get(S.SDK) || {})[t] : (console.error(k.MISS), {})
    }, t.prototype.setCache = function(t, e) {
      var n;
      this.cacheManager || console.error(k.MISS);
      var o = r(r({}, this.cacheManager.get(S.SDK) || {}), ((n = {})[t] = e, n));
      this.cacheManager.set(S.SDK, o)
    }, t.prototype.getServerUrl = function() {
      var t = "";
      return t = "function" == typeof this.option.serverUrl ? this.option.serverUrl.call(this) : this.option.serverUrl || "https://zhls.qq.com/api/report", t += "?token=" + this.option.token
    }, n([m], t.prototype, "init", null), n([m, _], t.prototype, "track", null), n([m, _], t.prototype, "setContext", null), n([m, _], t.prototype, "setUser", null), n([m, _], t.prototype, "setChan", null), n([m, _], t.prototype, "startReport", null), n([m, _], t.prototype, "resumeReport", null), n([m, _], t.prototype, "pauseReport", null), n([m, _], t.prototype, "flush", null), n([m, _], t.prototype, "onQueue", null), n([m, _], t.prototype, "getInfo", null), t
  }();

  function O(t, e, r, n) {
    void 0 === n && (n = !1);
    var i = t[e];
    t[e] = function() {
      for (var t = arguments, e = this, a = [], c = 0; c < arguments.length; c++) a[c] = t[c];
      var s = function() {
        return i && i.apply(e, a)
      };
      return n && (s = function() {
        return Promise.resolve().then((function() {
          return i.apply(e, a)
        }))
      }), r.apply(this, o([s], a))
    }
  }

  function I() {
    var t = getCurrentPages() || "";
    return t[t.length - 1] || ""
  }

  function T() {
    var t = "/";
    try {
      var e = I();
      if (!e) return e;
      var r, n = e.route,
        o = e.options;
      for (var i in r = e.options, t = n + "?", o) {
        if (y(i))
          if (r[i]) t += i + "=" + o[i] + "&"
      }
      t = t.substring(0, t.length - 1)
    } catch (t) {
      console.error("getCurrentPageUrlWithArgs error", t)
    }
    return t
  }

  function R() {
    var t = I();
    try {
      var e = __wxConfig.global.window.navigationBarTitleText;
      return (t ? (__wxConfig.page[t.route + ".html"].window || {}).navigationBarTitleText : "") || e || "\u672a\u77e5"
    } catch (t) {}
    return "\u672a\u77e5"
  }

  function b() {
    return "devtools" === function() {
      try {
        return __wxConfig.platform
      } catch (t) {
        console.error("getEnv failed: ", t)
      }
      return ""
    }()
  }

  function P(t, e, n) {
    try {
      var o = t[0],
        i = void 0 === o ? {} : o;
      if (i) switch (i.type) {
        case "tap":
        case "change":
        case "longpress":
        case "confirm":
          var a = (i.currentTarget || {}).dataset,
            c = void 0 === a ? {} : a,
            s = (this || {}).is;
          e("element", r({
            is: void 0 === s ? "" : s,
            type: i.type,
            id: "#" + n
          }, c))
      }
    } catch (t) {
      console.error("elementEventTrack error", t)
    }
  }
  var U = function() {},
    M = {},
    j = {},
    D = function() {
      return (new Date).getTime()
    };
  var E = function(t, e) {
    return function(r) {
      return function(t, e, r) {
        if (O(t, "onLoad", (function(t, e) {
            t(), this.lauchTime = D()
          })), O(t, "onShow", (function(t) {
            var r = this,
              n = function() {
                r.showTime = D(), e("browse_wxapp_page", {
                  refer_page: j.route,
                  is_newly_open: !M[r.route]
                }), M[r.route] = !0, j = r
              };
            t().then(n).catch(n)
          }), !0), O(t, "onHide", (function(t) {
            t();
            var r = D() - this.showTime;
            e("leave_wxapp_page", {
              view_time: r
            })
          })), O(t, "onUnload", (function(t) {
            t();
            var r = D() - this.lauchTime;
            e("leave_wxapp_page", {
              view_time: r
            })
          })), O(t, "onPullDownRefresh", (function(t) {
            t(), e("page_pull_down_refresh", {})
          })), O(t, "onReachBottom", (function(t) {
            t(), e("page_reach_bottom", {})
          })), "function" == typeof t.onShareAppMessage) {
          var n = t.onShareAppMessage || U;
          t.onShareAppMessage = function(t) {
            void 0 === t && (t = {});
            var r = n.call(this, t) || {},
              o = r.path || T.call(this);
            return e("page_share_app_message", {
              from_type: t.from || "\u672a\u77e5",
              share_path: o,
              share_title: r.title,
              share_image_url: r.imageUrl
            }), r
          }
        }
        return r && Object.entries(t).filter((function(t) {
          var e = t[0];
          t[1];
          return !["onLoad", "onShow", "onReady", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom", "onPageScroll", "onShareAppMessage", "onResize", "onTabItemTap"].includes(e)
        })).forEach((function(r) {
          var n = r[0];
          "function" == typeof r[1] && O(t, n, (function(t) {
            for (var r = arguments, o = [], i = 1; i < arguments.length; i++) o[i - 1] = r[i];
            return P.call(this, o, e, n), t()
          }))
        })), t
      }(r, t, e)
    }
  };
  var q = function(t, e) {
      return function(r) {
        return function(t, e, r) {
          if (t.methods && r)
            for (var n = function(r, n) {
                O(t.methods, r, (function(t) {
                  for (var n = arguments, o = this, i = [], a = 1; a < arguments.length; a++) i[a - 1] = n[a];
                  return setTimeout((function() {
                    P.call(o, i, e, r)
                  }), 0), t()
                }))
              }, o = 0, i = Object.entries(t.methods); o < i.length; o++) {
              var a = i[o],
                c = a[0];
              a[1];
              n(c)
            }
          return t
        }(r, t, e)
      }
    },
    N = {},
    z = function(t) {
      return t
    },
    F = function(t) {
      function n() {
        var e = t.call(this) || this;
        return e.name = "mp", e.component = z, e.page = z, e.proxySetNavigation = function() {
          try {
            var t = wx.setNavigationBarTitle;
            Object.defineProperty(wx, "setNavigationBarTitle", {
              get: function() {
                return function(e) {
                  void 0 === e && (e = {});
                  try {
                    var r = I();
                    __wxConfig.page = __wxConfig.page || {};
                    var n = __wxConfig.page[r.route + ".html"];
                    n && ((n.window || {}).navigationBarTitleText = e.title)
                  } catch (t) {}
                  t.call(this, e)
                }
              }
            })
          } catch (t) {
            console.warn("proxySetNavigation failed", t)
          }
        }, e.request = function(t, r) {
          var n = function(t) {
            return void 0 === t && (t = {}), 0 === t.code
          };
          return "function" == typeof e.option.onUploaded && (n = e.option.onUploaded), new Promise((function(e, o) {
            wx.request({
              url: r.url,
              method: r.method || "POST",
              data: t,
              success: function(t) {
                void 0 === t && (t = {});
                var r = t.data,
                  o = void 0 === r ? {} : r,
                  i = n(o);
                e({
                  success: void 0 === i || i,
                  data: o.data || o,
                  msg: o.errMsg
                })
              },
              fail: function(t) {
                o({
                  success: !1,
                  data: void 0,
                  msg: t.errMsg
                })
              }
            })
          }))
        }, e.defaultOptions = {
          autoStart: !0,
          debug: !1,
          usePlugin: !1,
          proxyPage: !1,
          proxyComponent: !1,
          autoTrack: !1,
          trackApp: !0
        }, e.proxySetNavigation(), e
      }
      return e(n, t), n.prototype.getCacheManager = function() {
        var t = "" + this.env,
          e = function(e) {
            return e + "_" + t
          };
        return {
          get: function(t) {
            var r;
            try {
              r = wx.getStorageSync(e(t))
            } catch (t) {
              return console.error("CacheManager.get error", t), r
            }
            return r
          },
          set: function(t, r) {
            try {
              wx.setStorageSync(e(t), r)
            } catch (t) {
              return console.error("CacheManager.set error", t), !1
            }
            return !0
          }
        }
      }, n.prototype.proxyInitialize = function() {
        var t = this,
          e = Page,
          r = Component,
          n = this.option.autoTrack;
        return this.page = E(this.track.bind(this), n), this.component = q(this.track.bind(this), n), !this.option.usePlugin && this.option.proxyPage && (Page = function(r) {
          e(t.page(r))
        }), !this.option.usePlugin && this.option.proxyComponent && (Component = function(e) {
          return r(t.component(e))
        }), this.trackApp(), !0
      }, n.prototype.trackApp = function() {
        var t = this,
          e = !1;
        wx.onAppShow((function(n) {
          void 0 === n && (n = {});
          var o = n,
            i = o.query,
            a = void 0 === i ? {} : i,
            c = o.path,
            s = function(t) {
              void 0 === t && (t = {});
              var e = {};
              if (t.scene) {
                try {
                  var n = decodeURIComponent(t.scene);
                  (n = n.replace("?", "").trim()).split("&").map((function(t) {
                    if (t) {
                      var r = t.split("="),
                        n = r[0],
                        o = r[1];
                      y(n) && (e[n] = void 0 === o || o)
                    }
                  }))
                } catch (t) {
                  console.error(t)
                }
                t = r(r({}, t), e)
              }
              return t
            }(a || {});
          if (s) {
            var u = "?";
            Object.entries(s).forEach((function(t, e) {
              var r = t[0],
                n = t[1];
              u += (0 === e ? "" : "&") + r + "=" + n
            })), c += u
          }
          t.setChan(r(r({}, s), {
            chan_wxapp_scene: n.scene,
            chan_refer_app_id: (n.referrerInfo || {}).appId
          })), s.chan_id && t.setChan({
            chan_id: s.chan_id
          }), e || (e = !0, t.option.trackApp && t.track("app_launch", {
            page: c
          })), t.option.trackApp && t.track("app_show", {
            page: c
          })
        })), wx.onAppHide((function() {
          t.option.trackApp && t.track("exit_wxapp", {})
        }))
      }, n.prototype.errorHandle = function(t) {
        try {
          var e = this.getServerUrl();
          this.request({
            type: "sdk api exec error",
            props: {
              sr_sdk_version: this.version,
              system_info: this.getSystemInfo(),
              message: t,
              stack: t
            }
          }, {
            url: e,
            method: "POST"
          })
        } catch (t) {
          console.log("errorHandle error", t)
        }
      }, n.prototype.getSystemInfo = function() {
        try {
          return wx.getSystemInfoSync()
        } catch (t) {
          return {}
        }
      }, n.prototype.getPageInfo = function() {
        var t = T(),
          e = I() || {},
          r = R,
          n = (e.data || {}).title || e.title;
        try {
          void 0 === n && t && !N[t] && (N[t] = !0, console.warn("\u9875\u9762[" + t + "]\u6ca1\u6709\u5b9e\u73b0 title \u5c5e\u6027\uff0c\u4f1a\u5bfc\u81f4\u90e8\u5206\u673a\u578b\u4e0b\u6536\u96c6\u4e0d\u5230\u9875\u9762\u6807\u9898!")), "string" == typeof n && (r = function() {
            return n
          }), "function" == typeof n && (r = n)
        } catch (t) {
          console.error("curPage.data.title \u6267\u884c\u9519\u8bef", t)
        }
        return {
          page: t,
          page_title: n || r()
        }
      }, n.prototype.isDev = function() {
        return b()
      }, n.create = function() {
        var t;
        try {
          t = new n
        } catch (e) {
          t = n.prototype, console.error("new sr_sdk failed", e)
        }
        return t
      }, n
    }(A).create();
  try {
    var K = require("./sr-sdk-config");
    F.init(K)
  } catch (t) {}
  return F
}));