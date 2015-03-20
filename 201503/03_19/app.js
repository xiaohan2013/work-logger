$(function() {
    var a, b, c, d, e;
    return a = $("body"), d = $(".modal-back"), b = $(".modal-card"), c = $(".modal-back, .cancel-handler, .close-handler"), $(".modal-handler").on("click", function(c) {
        return c.preventDefault(), a.addClass("open-modal"), $(".confirm-handler").html(teambitionI18n.confirm), b.delay(100).fadeIn(250), d.fadeIn(350)
    }), c.on("click", function() {
        return e()
    }), a.on("keydown", function(a) {
        return 27 === a.keyCode ? e() : void 0
    }), e = function() {
        return b.animate({opacity: 0,top: "-=200"}, 150, function() {
            return b.attr({style: "display:none"})
        }), d.delay(100).fadeOut(350, function() {
            return a.removeClass("open-modal")
        })
    }
}), $(function() {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o;
    return $.createEventCapturing = function() {
        var a;
        return a = $.event.special, function(b) {
            return document.addEventListener ? ("string" == typeof b && (b = [b]), $.each(b, function(b, c) {
                var d;
                return d = function(a) {
                    return a = $.event.fix(a), $.event.dispatch.call(this, a)
                }, a[c] = a[c] || {}, a[c].setup || a[c].teardown ? void 0 : $.extend(a[c], {setup: function() {
                        this.addEventListener(c, d, !0)
                    },teardown: function() {
                        this.removeEventListener(c, d, !0)
                    }})
            })) : void 0
        }
    }(), $.createEventCapturing(["play", "loadedmetadata", "pause", "ended"]), l = function(a) {
        var b, c, d, e;
        for (null == a && (a = 36), d = Math.floor(4294967296 * Math.random()), b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = "", c = 26; a > 0; )
            c -= 6, a -= 6, e += b[63 & d >>> c] ? b[63 & d >>> c] : "t";
        return e
    }, j = function(a) {
        return '<div class="modal modal-video fade" id="' + a.name + '" tabindex="-1">\n  <div class="modal-dialog modal-lg default-margin">\n    <div class="modal-content">\n    <div class="modal-header">\n      <a class="modal-close pull-right icon icon-remove" data-dismiss="modal"></a>\n    </div>\n      <div class="modal-body">\n        <div class="video-loading">\n          <img src="https://dn-st.b0.upaiyun.com/site/v0.4.x/images/index/model-video-bg.gif?' + (new Date).getTime() + '" class="img-responsive">\n        </div>\n        <div class="embed-responsive embed-responsive-16by9">\n          <video class="embed-responsive-item" controls="controls">\n            <source src="' + a.url + '" type="video/mp4">\n          </video>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>'
    }, a = $(window), b = $('.page-index, body[class*="page-support"]'), c = $(".watch-handler", b), f = {delayMin: 3500}, k = {tbOfficial: {initDelay: 300},actionCase: {initDelay: 1400},videoList: {isInit: !0,endClose: !1}}, c.on("click", function(a) {
        var b, c, d, e;
        return a.preventDefault(), b = $(a.currentTarget), d = b.data("name"), e = b.data("url") || b.data("video"), c = b.data("endClose") || !0, m(d, e, c)
    }), b.on("show.bs.modal", ".modal-video", function(a) {
        var b, c, d;
        return b = $(a.target), c = $("video", b).get(0), d = b.attr("id"), o(c, d)
    }), b.on("hidden.bs.modal", ".modal-video", function(a) {
        var b;
        return b = $(a.target), g(b)
    }), a.on("resize.modal", function() {
        var a;
        return a = $(".modal-video"), n(a)
    }), b.on("play loadedmetadata pause ended", function(a) {
        var b, c, e, f;
        switch (c = $(a.target), b = c.closest(".modal-video"), f = b.attr("id"), e = a.type) {
            case "play":
                return i(b, f, e);
            case "loadedmetadata":
                return i(b, f, e);
            case "pause":
                return d(b, f, e);
            case "ended":
                return d(b, f, e)
        }
    }), e = function() {
        return c.each(function(a, b) {
            var c, d;
            return c = $(b), c.data("name") ? void 0 : (d = l(), c.attr("data-name", d), k[d] = {})
        })
    }, m = function(a, c, d) {
        var e, f, g;
        return g = k[a], null != g.isInit ? e = $("[id='" + a + "']") : (e = $(j({name: a,url: c})), f = $("video", e).get(0), g.url = c, g.endClose = d, $(".modal-video", b).filter("[id='" + a + "']:not(.is-init)").remove(), e.appendTo(b), f.load()), e.css({display: "block"}), n(e), e.modal("show")
    }, o = function(a, b) {
        var c;
        return c = k[b], c.timeLoad = (new Date).getTime(), a.play()
    }, g = function(a) {
        return $("video", a).get(0).pause()
    }, n = function(b) {
        var c, d, e, f;
        return e = 630, f = 768, c = $(".modal-dialog", b), a.width() > f && a.height() > e ? (d = (a.height() - c.outerHeight()) / 2, c.css({marginTop: "" + d + "px",marginBottom: 0})) : c.removeAttr("style")
    }, i = function(a, b, c) {
        var d, e, g, h;
        return d = $("video", a).get(0), g = k[b], null == g.isInit && "loadedmetadata" === c && (d.pause(), g.timeStart = (new Date).getTime(), e = null != g.playedTime ? g.playedTime - g.timeStart : g.timeStart - g.timeLoad, h = e > f.delayMin ? 0 : f.delayMin - e, setTimeout(function() {
            return d.play(), a.hasClass("in") ? setTimeout(function() {
                return g.isInit = !0, a.addClass("is-init is-playing"), a.on("transitionend webkitTransitionEnd", ".video-loading", function() {
                    return $(this).remove()
                })
            }, g.initDelay || 0) : (d.pause(), a.remove())
        }, h)), "play" === c && (g.playedTime = (new Date).getTime()), null != g.isInit ? a.addClass("is-playing") : void 0
    }, d = function(a, b, c) {
        return a.removeClass("is-playing"), "ended" === c && k[b].endClose ? (a.modal("hide"), k[b].isInit = !1) : void 0
    }, window.modalVideo = {modals: k}, (h = function() {
        return e()
    })()
}), $(function() {
    return $(".setlocale").on("click", function(a) {
        var b, c;
        return a.preventDefault(), c = $(this).data("locale"), b = {path: "/",domain: "." + location.hostname.split(".").slice(1).join(".")}, $.cookie("lang", c, b), location.href = $(".tbsite-article").length ? this.href + "?p=setlocale&" + location.search.match(/_id=([^&]*)/)[0] : this.href + "?p=setlocale"
    })
}), $(function() {
    var a, b, c, d;
    return d = $(".tbsite-article"), a = {appid: "",title: document.title,desc: $('meta[name="description"]').attr("content"),image: $(".navbar-brand").data("circle"),link: location.href,callback: function() {
        }}, d.length ? (b = d.find(".modal-wechat .qrcode"), b.qrcode({text: b.data("src"),width: 250,height: 250}), c = $.extend({}, a, {title: d.find(".title").text(),desc: b.data("desc"),image: d.find(".topbanner").data("bg"),link: b.data("src")})) : c = a, $(document).on("WeixinJSBridgeReady", function() {
        return WeixinJSBridge.on("menu:share:appmessage", function() {
            return WeixinJSBridge.invoke("sendAppMessage", {appid: c.appid,title: c.title,desc: c.desc,img_url: c.image,link: c.link}, c.callback)
        }), WeixinJSBridge.on("menu:share:timeline", function() {
            return WeixinJSBridge.invoke("shareTimeline", {title: c.title,desc: c.desc,img_url: c.image,link: c.link}, c.callback)
        })
    })
}), $(function() {
    var a, b;
    return a = $(".csr-form #submit"), b = !1, $(".csr-form .type").on("click", function() {
        return $(".type").removeClass("active"), $(this).addClass("active")
    }), a.on("click", function(c) {
        var d;
        return c.preventDefault(), d = {email: $("#teambition-account").val(),type: $(".active").data("type"),name: $("#organization-name").val(),description: $("#organization-description").val(),contact: $("#organization-contact-info").val()}, b === !1 ? $.post("/philanthropy", d, function() {
            return a.html(teambitionI18n.applySuccess + ' <img src="https://dn-st.b0.upaiyun.com/site/v0.4.x/images/csr/heart@2x.png">'), b = !0
        }).fail(function() {
            return a.html(teambitionI18n.pleaseRetry + ' <img src="https://dn-st.b0.upaiyun.com/site/v0.4.x/images/csr/heart@2x.png">')
        }) : a.html(teambitionI18n.submitted + ' <img src="https://dn-st.b0.upaiyun.com/site/v0.4.x/images/csr/heart@2x.png">').addClass("disabled")
    }), $(".csr-form input, .csr-form textarea").on("keydown", function() {
        return a.html(teambitionI18n.applyNow + ' <img src="https://dn-st.b0.upaiyun.com/site/v0.4.x/images/csr/heart@2x.png">')
    })
}), $(function() {
    var a, b, c;
    return b = $(".deploy-form"), a = b.find(".confirm-handler"), c = !1, a.on("click", function(b) {
        var d;
        return b.preventDefault(), d = {type: "deployment",companyName: $("#company-name").val(),contactName: $("#contact-name").val(),contact: $("#contact-phone").val()}, c === !1 ? $.post("/philanthropy", d, function() {
            return a.html(teambitionI18n.applySuccess), c = !0
        }).fail(function() {
            return a.html(teambitionI18n.pleaseRetry)
        }) : a.html(teambitionI18n.submitted).addClass("disabled")
    }), b.find(".form-input").on("keydown", function() {
        return a.html(teambitionI18n.confirm)
    })
}), $(function() {
    var a, b, c, d, e, f;
    return d = $("#incubator-name-sh").html(), c = $("#incubator-name-bj").html(), e = $("#incubator-name-sz").html(), b = $("#incubator-name"), a = $(".incubator-form #submit-handler"), f = !1, b.html(d), $("#organization-city").change(function() {
        return b.empty(), b.html(0 === this.selectedIndex ? d : 1 === this.selectedIndex ? c : e)
    }), a.on("click", function(b) {
        var c;
        return b.preventDefault(), c = {type: "incubator",email: $("#teambition-account").val(),name: $("#organization-name").val(),city: $("#organization-city").val(),incubatorName: $("#incubator-name").val(),description: $("#organization-desc").val(),contactName: $("#organization-contact-name").val(),contact: $("#organization-contact-info").val()}, f === !1 ? $.post("/philanthropy", c, function() {
            return a.html(teambitionI18n.applySuccess), f = !0
        }).fail(function() {
            return a.html(teambitionI18n.pleaseRetry)
        }) : a.html(teambitionI18n.submitted).addClass("disabled")
    }), $(".incubator-form .form-input").on("keydown", function() {
        return $("#submit-handler").html(teambitionI18n.applyNow)
    })
}), $(function() {
    var a, b, c, d;
    return c = $(".research-form"), b = c.find(".input-group"), a = c.find(".confirm-handler"), d = !1, c.find(".subtype").on("click", function() {
        return $(".subtype").removeClass("active"), $(this).addClass("active")
    }), c.find("#share-experience").on("click", function() {
        return $("#content").attr("placeholder", "输入您要分享的内容")
    }), c.find("#need-help").on("click", function() {
        return $("#content").attr("placeholder", "输入您遇到的问题")
    }), a.on("click", function(b) {
        var c;
        return b.preventDefault(), c = {type: "research",subtype: $(".subtype.active").data("subtype"),industry: $("#industry").val(),companyName: $("#company-name").val(),name: $("#name").val(),jobTitle: $("#job-title").val(),contact: $("#contact").val(),useTime: $("#use-time").val(),users: $("#users").val(),content: $("#content").val()}, d === !1 ? $.post("/philanthropy", c, function() {
            return a.html(teambitionI18n.applySuccess), d = !0
        }).fail(function() {
            return a.html(teambitionI18n.pleaseRetry)
        }) : a.html(teambitionI18n.submitted).addClass("disabled")
    }), c.find(".form-control").click(function() {
        return d === !1 ? a.html(teambitionI18n.confirm) : void 0
    }).on("keyup", function() {
        return $.trim(this.value).length ? $(this).parents().addClass("has-value") : $(this).parents().removeClass("has-value")
    })
}), $(function() {
    var a;
    return a = {animation: !0,triggrt: "hover"}, $(".devtooltip").tooltip(a), $("body").scrollspy({target: ".api-sidebar"}), $(".api-sidebar").affix({offset: {top: $(".site-header").outerHeight() + $(".jumbotron").outerHeight(!0)}}), $("body").on("click", ".back-to-top", function(a) {
        return a.preventDefault(), $("body").animate({scrollTop: 0}, 300)
    })
}), $(function() {
}), $(function() {
    var a, b, c, d, e, f, g, h, i, j, k;
    return c = $(window), a = $(".members-list"), b = a.find(".member"), j = {imageSize: 190,lookStraight: 30}, d = function(a, b, c, d) {
        var e, f, g, h, i;
        return h = a - c, i = b - d, e = Math.sqrt(h * h + i * i), e < j.lookStraight ? g = 12 : (f = Math.PI / 6, g = Math.round(Math.atan2(h, i) / f), g -= 3, g = (12 - g) % 12), g
    }, k = function(a, c) {
        var e, f;
        return f = j.imageSize, e = j.imageSize, $.each(b, function(b, g) {
            var h, i, j, k, l;
            return g = $(g), h = g.offset(), i = h.left + f / 2, j = h.top + e / 2, l = 1, k = -e * d(a, c, i, j) - l, g.css("background-position", "0px " + k + "px")
        })
    }, g = function(a) {
        return k(a.pageX, a.pageY)
    }, f = function(a) {
        var b, c, d, e, f, g, h, i, j;
        if (window.hasOwnProperty("ontouchstart") || navigator.msMaxTouchPoints > 0) {
            if (e = !1, b = 3, c = c > -b && b > c ? 0 : Math.floor(a.originalEvent.beta), d = d > -b && b > d ? 0 : Math.floor(a.originalEvent.gamma), j = {x: document.body.clientWidth / 2,y: screen.height / 2}, void 0 === f && (f = {beta: c,gamma: d}), void 0 !== window.orientation) {
                switch (window.orientation) {
                    case 0:
                    case 90:
                        i = c, c = -d, d = i;
                        break;
                    case 180:
                        d = -d, c = -c;
                        break;
                    case -90:
                        i = c, c = d, d = -i
                }
                e = !0
            }
            if (0 !== c && c !== f.beta && (j.y += c, j.y > document.body.clientHeight ? j.y = document.body.clientHeight : j.y < 0 && (j.y = 0), e = !0), e)
                return $(window).unbind("mousemove"), g = j.x, h = j.y, k(g, h)
        }
    }, i = function(a) {
        var b, c;
        return b = a.height(), c = a.offset().top, k(a.offset().left + b / 2, c + b / 2)
    }, e = function(a) {
        var b;
        return b = $($(this).hasClass("member") ? this : "#" + $(this).data("target")), b.hasClass("back") ? (b.removeClass("back"), b.hasClass("supporter") || b.find(".full-name").addClass("transparent")) : (b.siblings(".member").removeClass("back"), b.hasClass("supporter") || (b.siblings(".member:not('.supporter')").find(".full-name").addClass("transparent"), b.find(".full-name").removeClass("transparent")), b.addClass("back")), b.hasClass("back") ? ($(window).unbind("mousemove"), $(window).unbind("deviceorientation"), i(b)) : ($(window).mousemove(g), $(window).on("deviceorientation", f), g(a))
    }, h = function() {
        return c.on("mousemove", g), c.on("deviceorientation", f), b.click(e)
    }, a.length ? h() : void 0
}), $(function() {
    return $(".page-new").on("click", ".feature-title", function() {
        return $(this).parent(".feature").toggleClass("open")
    })
}), $(function() {
    var a;
    return a = document.location.toString(), a.match("#") ? $(".partner-tab a[href=#" + a.split("#")[1] + "]").tab("show") : void 0
}), $(function() {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y;
    return x = function() {
        return '<div class="modal-backdrop nav-backdrop fade"></div>'
    }, y = function() {
        return '<ul class="title-nav">\n  {{#titles}}\n    <li><a href="#{{id}}" data-id="{{id}}">{{title}}</a></li>\n  {{/titles}}\n</ul>'
    }, w = function(a, b, c) {
        var d, e;
        return null == c && (c = 0), e = $(window).height(), b ? (d = a.offset().top - c, d < i.scrollTop() && (d -= 49)) : d = a.offset().top + a.outerHeight() + c - e, $("html, body").animate({scrollTop: d}, 300)
    }, s = function(a) {
        var b, c;
        return a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"), b = new RegExp("[\\?&]" + a + "=([^&#]*)"), c = b.exec(location.search), null === c ? "" : decodeURIComponent(c[1].replace(/\+/g, " "))
    }, v = function(a, b) {
        var c, d;
        return a.stopPropagation(), c = $(a.currentTarget), d = c.scrollTop(), b > 0 && 2 > d ? !1 : 0 > b && c[0].scrollHeight - c.innerHeight() - d < 2 ? !1 : void 0
    }, u = function(a, b) {
        var c, d, e;
        return d = "<span class='highlight'>" + b + "</span>", e = new RegExp(b + "(?!([^<]+)?>)", "igm"), c = a.html().replace(e, d), a.html(c), $(".highlight", a).each(function(a, b) {
            return setTimeout(function() {
                return $(b).addClass("on")
            }, 100 * a)
        })
    }, i = $('body[class*="page-support"]'), k = $("body.page-support"), l = $("body.page-support-search"), j = $("body.page-support-article"), n = $(".search-wrapper", i), h = $(".support-list", i), o = $(".question-nav", i), d = $(".question-content", i), m = $(".search-input", n), m.keyup(function() {
        var a;
        return a = $(this).val(), "" !== a ? $(".search-handler").addClass("active") : $(".search-handler").removeClass("active")
    }).focus(function() {
        return $(".search-icon").addClass("active")
    }).blur(function() {
        var a;
        return a = $(this).val(), "" === a ? $(".search-icon").removeClass("active") : void 0
    }), h.on("click", ".item-title", function(a) {
        var b, c;
        return a.preventDefault(), c = $(a.target), b = c.closest(".list-group-item"), $(".item-content", b).slideToggle(218, function() {
        }), b.siblings().children(".item-content").slideUp(218)
    }), c = $(x()), g = $(".detail-wrapper"), i.on("click", ".toggle-switch, .nav-backdrop", function() {
        return o.toggleClass("is-open"), o.hasClass("is-open") ? (g.after(c), setTimeout(function() {
            return c.addClass("in")
        }, 0)) : (c.removeClass("in"), setTimeout(function() {
            return c.remove()
        }, 218))
    }), o.on("mousewheel", ".list-wrap", function(a, b) {
        return $(window).width() < 768 ? v(a, b) : void 0
    }).on("click", ".title-nav a", function() {
        var a, b;
        return b = $(this).data("id"), a = d.find("h4[data-id='" + b + "']"), w(a, !0, 16), c.trigger("click")
    }), q = $(".video-list-handler"), p = $(".video-list"), e = $("video", p), f = e.get(0), b = $(".album-list", p), a = $(".album-item", b), q.on("click", function(b) {
        return b.preventDefault(), Essage.show({message: $(this).data("i18n"),status: "error"}, 4e3), a.hasClass("is-current") ? void 0 : f.pause()
    }), a.on("click", function() {
        var b, c;
        return b = $(this), c = b.data("url"), p.addClass("is-list-init"), e.children("source").attr("src", c), f.load(), f.play(), a.filter(".is-current").addClass("has-watched"), b.addClass("is-current").siblings().removeClass("is-current")
    }), i.on("ended", function() {
        return a.filter(".is-current").removeClass("is-current"), p.removeClass("is-list-init")
    }), r = function() {
        var a, b, c, e;
        return a = $(".is-current:not(.nav-title)", o), b = $("section h4:first-child", d), e = {}, e.titles = [], b.each(function(a) {
            var b, c;
            return b = "section" + (a + 1), c = $(this).html(), $(this).attr("data-id", b), e.titles.push({title: c,id: b})
        }), c = Mustache.render(y(), e), $(c).appendTo(a), location.hash ? setTimeout(function() {
            var a;
            return a = b.filter($("[data-id='" + location.hash.slice(1) + "']")), w(a, !0, 16)
        }, 500) : void 0
    }, t = function() {
        var a, b;
        return r(), $('[data-toggle="tooltip"]').tooltip(), l.length ? (a = $(".support-list", l), b = s("q"), u(a, b)) : void 0
    }, i.length ? t() : void 0
}), $(function() {
    var a, b, c;
    return a = $(".page-info-member"), $(".next", a).on("click", function() {
        var a, b;
        return a = $(".act"), b = a.next(), b.length || (b = a.siblings("li:first")), a.fadeOut(600, function() {
            return $(".workerlist li").removeClass("act"), b.fadeIn(600).addClass("act")
        })
    }), $(".prev", a).on("click", function() {
        var a, b;
        return a = $(".act"), b = a.prev(), b.length || (b = a.siblings("li:last")), a.fadeOut(600, function() {
            return $(".workerlist li").removeClass("act"), b.fadeIn(600).addClass("act")
        })
    }), b = function(a) {
        var b, c;
        return c = new RegExp("(^|&)" + a + "=([^&]*)(&|$)", "i"), b = window.location.search.substr(1).match(c), b ? unescape(b[2]) : void 0
    }, c = b("index"), c >= 0 ? $(".workerlist li").removeClass("act").eq(c).addClass("act") : void 0
}), $(function() {
    return $(".page-tour .slide img").lazyload({effect: "fadeIn",placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"})
}), $(function() {
    var a, b, c, d;
    return b = $(".tbsite-article"), b.length ? (c = b.find(".topbanner"), a = b.find(".loadingbar"), navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) || $(window).scroll(function() {
        var a, b;
        return a = $(window).scrollTop(), b = 1 * (c.height() - a) / c.height(), c.css("opacity", b)
    }), d = new Image, d.src = c.data("bg"), d.onload = function() {
        return c.css("background-image", "url(" + d.src + ")"), a.fadeOut(500, function() {
            return this.remove()
        })
    }) : void 0
}), $(function() {
    var a;
    return navigator.userAgent.match(/micromessenger/i) ? void 0 : (a = $("body.tbsite-article").length ? $(".tbsite-article .topbanner").height() || 200 : 300, $(".site-header").headroom({offset: a,tolerance: 5,classes: {initial: "animated",pinned: "slideDown",unpinned: "slideUp"}}))
}), $(function() {
    var a;
    return a = $.ias({container: ".list-wrap .content",item: ".list-item:not(.category)",pagination: ".pagination",next: ".next a",delay: 1e3,negativeMargin: 100}), a.extension(new IASSpinnerExtension({html: '<div class="loading-indicator text-center"> <span class="loader-dot"></span> <span class="loader-dot"></span> <span class="loader-dot"></span> </div>'})), a.extension(new IASTriggerExtension({offset: 3}))
}), ~function(a, b) {
    var c, d;
    return d = {is: function(a, b) {
            return Object.prototype.toString.call(a).slice(8, -1) === b
        },copy: function(a, b) {
            var c, d;
            for (c in b)
                b.hasOwnProperty(c) && (d = b[c], a[c] = this.is(d, "Object") ? this.copy({}, d) : this.is(d, "Array") ? this.copy([], d) : d);
            return a
        }}, c = function() {
        var c;
        return c = this, this.defaults = {status: "normal"}, this.el = b.createElement("div"), this.el.className = "essage", this.close = '<span class="close">&times;</span>', this.error = '<span class="icon icon-circle-error"></span>', this.warning = '<span class="icon icon-circle-warning"></span>', this.success = '<span class="icon icon-circle-check"></span>', this.info = '<span class="icon icon-circle-info"></span>', this.el.onclick = function(b) {
            var d;
            return b = b || a.event, d = b.target || b.srcElement, "close" === d.className ? c.hide() : void 0
        }, b.body.appendChild(this.el), this
    }, c.prototype._width = function() {
        return this.el.offsetWidth || this.el.clientWidth
    }, c.prototype._class = function(a, b) {
        var c, d, e;
        return d = this.el, d.classList ? d.classList[b ? "remove" : "add"](a) : (c = d.className, e = new RegExp("\\b" + a + "\\b", "g"), d.className = b ? c.replace(e, "") : c.match(e) ? c : c + " " + a), d
    }, c.prototype.set = function(a) {
        return a = "string" == typeof a ? {message: a} : a, this.config = d.copy({}, this.defaults), this.config = d.copy(this.config, a), this.el.className = "essage", this._class("essage-" + this.config.status), this
    }, c.prototype.show = function(a, b) {
        var c, d, e;
        return null == b && (b = 2e3), c = this.el, e = this.set(a), c.innerHTML = this.close + this[this.config.status] + " " + this.config.message, d = -this._width() / 2, this.el.style.marginLeft = d + "px", this._class("is-active"), this.delayHide && clearTimeout(this.delayHide), this.delayHide = setTimeout(function() {
            return e.hide()
        }, b), this.el.addEventListener("webkitTransitionEnd", this.delayHide, !1), this.el.addEventListener("transitionend", this.delayHide, !1), this
    }, c.prototype.hide = function() {
        return this._class("is-active", !0), this
    }, a.Essage = new c
}(window, document);
