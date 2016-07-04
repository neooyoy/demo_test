/*
 * Poshy Tip jQuery plugin v1.0
 * http://vadikom.com/tools/poshy-tip-jquery-plugin-for-stylish-tooltips/
 * Copyright 2010, Vasil Dinkov, http://vadikom.com/
 */

(function (e) {
    var a = [], d = /^url\(["']?([^"'\)]*)["']?\);?$/i, c = /\.png$/i, b = e.browser.msie && e.browser.version == 6;

    function f() {
        e.each(a, function () {
            this.refresh(true)
        })
    }

    e(window).resize(f);
    e.Poshytip = function (h, g) {
        this.$elm = e(h);
        this.opts = e.extend({}, e.fn.poshytip.defaults, g);
        this.$tip = e(['<div class="', this.opts.className, '">', '<div class="tip-inner tip-bg-image"></div>', '<div class="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left"></div>', "</div>"].join(""));
        this.$arrow = this.$tip.find("div.tip-arrow");
        this.$inner = this.$tip.find("div.tip-inner");
        this.disabled = false;
        this.init()
    };
    e.Poshytip.prototype = {
        init: function () {
            a.push(this);
            this.$elm.data("title.poshytip", this.$elm.attr("title")).data("poshytip", this);
            switch (this.opts.showOn) {
                case"hover":
                    this.$elm.bind({
                        "mouseenter.poshytip": e.proxy(this.mouseenter, this),
                        "mouseleave.poshytip": e.proxy(this.mouseleave, this)
                    });
                    if (this.opts.alignTo == "cursor") {
                        this.$elm.bind("mousemove.poshytip", e.proxy(this.mousemove, this))
                    }
                    if (this.opts.allowTipHover) {
                        this.$tip.hover(e.proxy(this.clearTimeouts, this), e.proxy(this.hide, this))
                    }
                    break;
                case"focus":
                    this.$elm.bind({
                        "focus.poshytip": e.proxy(this.show, this),
                        "blur.poshytip": e.proxy(this.hide, this)
                    });
                    break
            }
        }, mouseenter: function (g) {
            if (this.disabled) {
                return true
            }
            this.clearTimeouts();
            this.$elm.attr("title", "");
            this.showTimeout = setTimeout(e.proxy(this.show, this), this.opts.showTimeout)
        }, mouseleave: function () {
            if (this.disabled) {
                return true
            }
            this.clearTimeouts();
            this.$elm.attr("title", this.$elm.data("title.poshytip"));
            this.hideTimeout = setTimeout(e.proxy(this.hide, this), this.opts.hideTimeout)
        }, mousemove: function (g) {
            if (this.disabled) {
                return true
            }
            this.eventX = g.pageX;
            this.eventY = g.pageY;
            if (this.opts.followCursor && this.$tip.data("active")) {
                this.calcPos();
                this.$tip.css({left: this.pos.l, top: this.pos.t});
                if (this.pos.arrow) {
                    this.$arrow[0].className = "tip-arrow tip-arrow-" + this.pos.arrow
                }
            }
        }, show: function () {
            if (this.disabled || this.$tip.data("active")) {
                return
            }
            this.reset();
            this.update();
            this.display()
        }, hide: function () {
            if (this.disabled || !this.$tip.data("active")) {
                return
            }
            this.display(true)
        }, reset: function () {
            this.$tip.queue([]).detach().css("visibility", "hidden").data("active", false);
            this.$inner.find("*").poshytip("hide");
            if (this.opts.fade) {
                this.$tip.css("opacity", this.opacity)
            }
            this.$arrow[0].className = "tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left"
        }, update: function (i) {
            if (this.disabled) {
                return
            }
            var h = i !== undefined;
            if (h) {
                if (!this.$tip.data("active")) {
                    return
                }
            } else {
                i = this.opts.content
            }
            this.$inner.contents().detach();
            var g = this;
            this.$inner.append(typeof i == "function" ? i.call(this.$elm[0], function (j) {
                g.update(j)
            }) : i == "[title]" ? this.$elm.data("title.poshytip") : i);
            this.refresh(h)
        }, refresh: function (h) {
            if (this.disabled) {
                return
            }
            if (h) {
                if (!this.$tip.data("active")) {
                    return
                }
                var k = {left: this.$tip.css("left"), top: this.$tip.css("top")}
            }
            this.$tip.css({left: 0, top: 0}).appendTo(document.body);
            if (this.opacity === undefined) {
                this.opacity = this.$tip.css("opacity")
            }
            var l = this.$tip.css("background-image").match(d), m = this.$arrow.css("background-image").match(d);
            if (l) {
                var i = c.test(l[1]);
                if (b && i) {
                    this.$tip.css("background-image", "none");
                    this.$inner.css({margin: 0, border: 0, padding: 0});
                    l = i = false
                } else {
                    this.$tip.prepend('<table border="0" cellpadding="0" cellspacing="0"><tr><td class="tip-top tip-bg-image" colspan="2"><span></span></td><td class="tip-right tip-bg-image" rowspan="2"><span></span></td></tr><tr><td class="tip-left tip-bg-image" rowspan="2"><span></span></td><td></td></tr><tr><td class="tip-bottom tip-bg-image" colspan="2"><span></span></td></tr></table>').css({
                        border: 0,
                        padding: 0,
                        "background-image": "none",
                        "background-color": "transparent"
                    }).find(".tip-bg-image").css("background-image", 'url("' + l[1] + '")').end().find("td").eq(3).append(this.$inner)
                }
                if (i && !e.support.opacity) {
                    this.opts.fade = false
                }
            }
            if (m && !e.support.opacity) {
                if (b && c.test(m[1])) {
                    m = false;
                    this.$arrow.css("background-image", "none")
                }
                this.opts.fade = false
            }
            var o = this.$tip.find("table");
            if (b) {
                this.$tip[0].style.width = "";
                o.width("auto").find("td").eq(3).width("auto");
                var n = this.$tip.width(), j = parseInt(this.$tip.css("min-width")), g = parseInt(this.$tip.css("max-width"));
                if (!isNaN(j) && n < j) {
                    n = j
                } else {
                    if (!isNaN(g) && n > g) {
                        n = g
                    }
                }
                this.$tip.add(o).width(n).eq(0).find("td").eq(3).width("100%")
            } else {
                if (o[0]) {
                    o.width("auto").find("td").eq(3).width("auto").end().end().width(this.$tip.width()).find("td").eq(3).width("100%")
                }
            }
            this.tipOuterW = this.$tip.outerWidth();
            this.tipOuterH = this.$tip.outerHeight();
            this.calcPos();
            if (m && this.pos.arrow) {
                this.$arrow[0].className = "tip-arrow tip-arrow-" + this.pos.arrow;
                this.$arrow.css("visibility", "inherit")
            }
            if (h) {
                this.$tip.css(k).animate({left: this.pos.l, top: this.pos.t}, 200)
            } else {
                this.$tip.css({left: this.pos.l, top: this.pos.t})
            }
        }, display: function (h) {
            var i = this.$tip.data("active");
            if (i && !h || !i && h) {
                return
            }
            this.$tip.stop();
            if ((this.opts.slide && this.pos.arrow || this.opts.fade) && (h && this.opts.hideAniDuration || !h && this.opts.showAniDuration)) {
                var m = {}, l = {};
                if (this.opts.slide && this.pos.arrow) {
                    var k, g;
                    if (this.pos.arrow == "bottom" || this.pos.arrow == "top") {
                        k = "top";
                        g = "bottom"
                    } else {
                        k = "left";
                        g = "right"
                    }
                    var j = parseInt(this.$tip.css(k));
                    m[k] = j + (h ? 0 : this.opts.slideOffset * (this.pos.arrow == g ? -1 : 1));
                    l[k] = j + (h ? this.opts.slideOffset * (this.pos.arrow == g ? 1 : -1) : 0)
                }
                if (this.opts.fade) {
                    m.opacity = h ? this.$tip.css("opacity") : 0;
                    l.opacity = h ? 0 : this.opacity
                }
                this.$tip.css(m).animate(l, this.opts[h ? "hideAniDuration" : "showAniDuration"])
            }
            h ? this.$tip.queue(e.proxy(this.reset, this)) : this.$tip.css("visibility", "inherit");
            this.$tip.data("active", !i)
        }, disable: function () {
            this.reset();
            this.disabled = true
        }, enable: function () {
            this.disabled = false
        }, destroy: function () {
            this.reset();
            this.$tip.remove();
            this.$elm.unbind("poshytip").removeData("title.poshytip").removeData("poshytip");
            a.splice(e.inArray(this, a), 1)
        }, clearTimeouts: function () {
            if (this.showTimeout) {
                clearTimeout(this.showTimeout);
                this.showTimeout = 0
            }
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = 0
            }
        }, calcPos: function () {
            var n = {l: 0, t: 0, arrow: ""}, h = e(window), k = {
                l: h.scrollLeft(),
                t: h.scrollTop(),
                w: h.width(),
                h: h.height()
            }, p, j, m, i, q, g;
            if (this.opts.alignTo == "cursor") {
                p = j = m = this.eventX;
                i = q = g = this.eventY
            } else {
                var o = this.$elm.offset(), l = {
                    l: o.left,
                    t: o.top,
                    w: this.$elm.outerWidth(),
                    h: this.$elm.outerHeight()
                };
                p = l.l + (this.opts.alignX != "inner-right" ? 0 : l.w);
                j = p + Math.floor(l.w / 2);
                m = p + (this.opts.alignX != "inner-left" ? l.w : 0);
                i = l.t + (this.opts.alignY != "inner-bottom" ? 0 : l.h);
                q = i + Math.floor(l.h / 2);
                g = i + (this.opts.alignY != "inner-top" ? l.h : 0)
            }
            switch (this.opts.alignX) {
                case"right":
                case"inner-left":
                    n.l = m + this.opts.offsetX;
                    if (n.l + this.tipOuterW > k.l + k.w) {
                        n.l = k.l + k.w - this.tipOuterW
                    }
                    if (this.opts.alignX == "right" || this.opts.alignY == "center") {
                        n.arrow = "left"
                    }
                    break;
                case"center":
                    n.l = j - Math.floor(this.tipOuterW / 2);
                    if (n.l + this.tipOuterW > k.l + k.w) {
                        n.l = k.l + k.w - this.tipOuterW
                    } else {
                        if (n.l < k.l) {
                            n.l = k.l
                        }
                    }
                    break;
                default:
                    n.l = p - this.tipOuterW - this.opts.offsetX;
                    if (n.l < k.l) {
                        n.l = k.l
                    }
                    if (this.opts.alignX == "left" || this.opts.alignY == "center") {
                        n.arrow = "right"
                    }
            }
            switch (this.opts.alignY) {
                case"bottom":
                case"inner-top":
                    n.t = g + this.opts.offsetY;
                    if (!n.arrow || this.opts.alignTo == "cursor") {
                        n.arrow = "top"
                    }
                    if (n.t + this.tipOuterH > k.t + k.h) {
                        n.t = i - this.tipOuterH - this.opts.offsetY;
                        if (n.arrow == "top") {
                            n.arrow = "bottom"
                        }
                    }
                    break;
                case"center":
                    n.t = q - Math.floor(this.tipOuterH / 2);
                    if (n.t + this.tipOuterH > k.t + k.h) {
                        n.t = k.t + k.h - this.tipOuterH
                    } else {
                        if (n.t < k.t) {
                            n.t = k.t
                        }
                    }
                    break;
                default:
                    n.t = i - this.tipOuterH - this.opts.offsetY;
                    if (!n.arrow || this.opts.alignTo == "cursor") {
                        n.arrow = "bottom"
                    }
                    if (n.t < k.t) {
                        n.t = g + this.opts.offsetY;
                        if (n.arrow == "bottom") {
                            n.arrow = "top"
                        }
                    }
            }
            this.pos = n
        }
    };
    e.fn.poshytip = function (g) {
        if (typeof g == "string") {
            return this.each(function () {
                var i = e(this).data("poshytip");
                if (i && i[g]) {
                    i[g]()
                }
            })
        }
        var h = e.extend({}, e.fn.poshytip.defaults, g);
        if (!e("#poshytip-css-" + h.className)[0]) {
            e(['<style id="poshytip-css-', h.className, '" type="text/css">', "div.", h.className, "{visibility:hidden;position:absolute;top:0;left:0;}", "div.", h.className, " table, div.", h.className, " td{margin:0;font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;font-variant:inherit;}", "div.", h.className, " td.tip-bg-image span{display:block;font:1px/1px sans-serif;height:", h.bgImageFrameSize, "px;width:", h.bgImageFrameSize, "px;overflow:hidden;}", "div.", h.className, " td.tip-right{background-position:100% 0;}", "div.", h.className, " td.tip-bottom{background-position:100% 100%;}", "div.", h.className, " td.tip-left{background-position:0 100%;}", "div.", h.className, " div.tip-inner{background-position:-", h.bgImageFrameSize, "px -", h.bgImageFrameSize, "px;}", "div.", h.className, " div.tip-arrow{visibility:hidden;position:absolute;overflow:hidden;font:1px/1px sans-serif;}", "</style>"].join("")).appendTo("head")
        }
        return this.each(function () {
            new e.Poshytip(this, h)
        })
    };
    e.fn.poshytip.defaults = {
        content: "[title]",
        className: "tip-yellow",
        bgImageFrameSize: 10,
        showTimeout: 500,
        hideTimeout: 100,
        showOn: "hover",
        alignTo: "cursor",
        alignX: "right",
        alignY: "top",
        offsetX: -22,
        offsetY: 18,
        allowTipHover: true,
        followCursor: false,
        fade: true,
        slide: true,
        slideOffset: 8,
        showAniDuration: 300,
        hideAniDuration: 300
    }
})(jQuery);