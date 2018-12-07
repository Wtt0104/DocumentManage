//lrselect
(function (a, b) {
    a(function () {
        a(document).click(function (c) {
            c = c || Window.event;
            var d = c.target || c.srcElement;
            if (d.tagName != "BODY") {
                a(".lr-select-option").slideUp(150);
                a(".lr-select").removeClass("lr-select-focus")
            }
        })
    });
    a.lrselect = {
        htmlToData: function (c) {
            var e = c[0]._lrselect.dfop;
            var d = c.find("ul");
            e.data = [];
            d.find("li").each(function () {
                var f = a(this);
                var g = {
                    id: f.attr("data-value"),
                    text: f.html()
                };
                e.data.push(g)
            });
            d.remove();
            d = null;
            e = null
        },
        calc: function (c, f) {
            var d = 0;
            var i = 0;
            d = a("body").height();
            i = c.offset().top;
            var j = i - 1;
            var e = d - i - 30;
            var h = 2;
            if (f.allowSearch) {
                h += 30
            }
            h += f.data.length * 26;
            if (f.placeholder) {
                h += 25
            }
            if ((f.type === "tree" || f.type === "treemultiple") && f.data.length > 1) {
                h = 200
            }
            var g = {
                type: 0,
                height: 0
            };
            if (e > 130 || e > j || e > h) {
                g.height = e > h ? h : e
            } else {
                g.type = 1;
                g.height = j > h ? h : j
            }
            return g
        },
        initRender: function (h, f) {
            a("#learun_select_option_" + h.id).remove();
            var c = a('<div class="lr-select-option" id="learun_select_option_' + h.id + '"></div>');
            var d = a('<div class="lr-select-option-content"></div>');
            var g = a('<ul id="learun_select_option_content' + h.id + '"></ul>');
            c.hide();
            d.html(g);
            c.prepend(d);
            if (h.allowSearch) {
                var e = a('<div class="lr-select-option-search"><input type="text" placeholder="搜索关键字"><span class="input-query" title="查询"><i class="fa fa-search"></i></span></div>');
                c.append(e);
                c.css("padding-bottom", "25px");
                e.on("click", function () {
                    return false
                });
                e.find("input").on("keypress", function (p) {
                    p = p || window.event;
                    if (p.keyCode === 13) {
                        var m = a(this);
                        var r = m.val();
                        var j = m.parents(".lr-select-option");
                        var o = j[0].dfop;
                        if (o.type === "tree" || o.type === "treemultiple") {
                            var k = m.parent().prev();
                            k.lrtreeSet("search", {
                                keyword: r
                            })
                        } else {
                            if (o.type === "default" || o.type === "multiple") {
                                for (var q = 0, s = o.data.length; q < s; q++) {
                                    var n = o.data[q];
                                    if (!r || n[o.text].indexOf(r) != -1) {
                                        n._lrhide = false
                                    } else {
                                        n._lrhide = true
                                    }
                                }
                                a.lrselect.render(o)
                            }
                        }
                        j = null
                    }
                })
            }
            a("body").append(c);
            c.on("click", a.lrselect.itemClick);
            c[0].dfop = h;
            f.append('<div class="lr-select-placeholder" >==' + h.placeholder + "==</div>");
            f.attr("type", "lrselect").addClass("lr-select");
            if (h.type != "tree") {
                d.lrscroll()
            }
        },
        render: function (c) {
            switch (c.type) {
                case "default":
                    a.lrselect.defaultRender(c);
                    break;
                case "tree":
                case "treemultiple":
                    a.lrselect.treeRender(c);
                    break;
                case "gird":
                    break;
                case "multiple":
                    a.lrselect.multipleRender(c);
                    break;
                default:
                    break
            }
            c.isrender = true
        },
        defaultRender: function (e) {
            var d = a("#learun_select_option_content" + e.id);
            d.html("");
            if (e.placeholder) {
                d.append('<li data-value="-1" class="lr-selectitem-li" >==' + e.placeholder + "==</li>")
            }
            for (var f = 0, h = e.data.length; f < h; f++) {
                var g = e.data[f];
                if (!g._lrhide) {
                    var c = a('<li data-value="' + f + '" class="lr-selectitem-li" >' + g[e.text] + "</li>");
                    d.append(c)
                }
            }
        },
        multipleRender: function (e) {
            var d = a("#learun_select_option_content" + e.id);
            d.html("");
            if (e.placeholder) {
                d.append('<li data-value="-1" class="lr-selectitem-li" >==' + e.placeholder + "==</li>")
            }
            for (var f = 0, h = e.data.length; f < h; f++) {
                var g = e.data[f];
                if (!g._lrhide) {
                    if (!!e.multipleMapValue && e.multipleMapValue[f] != undefined) {
                        var c = a('<li data-value="' + f + '" class="lr-selectitem-li" ><img class="lr-select-node-cb" src="assets/Content/images/learuntree/checkbox_1.png">' + g[e.text] + "</li>");
                        d.append(c)
                    } else {
                        var c = a('<li data-value="' + f + '" class="lr-selectitem-li" ><img class="lr-select-node-cb" src="assets/Content/images/learuntree/checkbox_0.png">' + g[e.text] + "</li>");
                        d.append(c)
                    }
                }
            }
        },
        treeRender: function (e) {
            var c = a("#learun_select_option_" + e.id);
            c.find(".lr-select-option-content").remove();
            var d = a('<div class="lr-select-option-content"></div>');
            c.prepend(d);
            e.data.unshift({
                id: "-1",
                text: "==" + e.placeholder + "==",
                value: "-1",
                icon: "-1",
                parentnodes: "0",
                showcheck: false,
                isexpand: false,
                complete: true,
                hasChildren: false,
                ChildNodes: []
            });
            var f = {
                data: e.data,
                nodeClick: a.lrselect.treeNodeClick
            };
            if (e.type === "treemultiple") {
                f.nodeClick = a.lrselect.treeNodeClick2;
                f.nodeCheck = a.lrselect.treeNodeCheck
            }
            d.lrtree(f)
        },
        bindEvent: function (c) {
            c.unbind("click");
            c.on("click", a.lrselect.click)
        },
        click: function (h) {
            var f = a(this);
            if (f.attr("readonly") == "readonly" || f.attr("disabled") == "disabled") {
                return false
            }
            var g = f[0]._lrselect.dfop;
            if (!g.isload) {
                return false
            }
            if (!g.isrender) {
                a.lrselect.render(g)
            }
            h = h || Window.event;
            var i = h.target || h.srcElement;
            var c = a(i);
            var d = a("#learun_select_option_" + g.id);
            if (d.is(":hidden")) {
                a(".lr-select").removeClass("lr-select-focus");
                a(".lr-select-option").slideUp(150);
                f.addClass("lr-select-focus");
                var n = g.width || f.parent().width();
                var j = f.innerHeight();
                var m = f.offset().top;
                var k = f.offset().left;
                var l = a.lrselect.calc(f, g);
                if (l.type == 0) {
                    d.css({
                        width: n,
                        top: m + j + 2,
                        left: k,
                        height: l.height
                    }).show()
                } else {
                    d.css({
                        width: n,
                        top: m - l.height - 2,
                        left: k,
                        height: l.height
                    }).show()
                }
                d.find(".lr-select-option-search").find("input").select();
                if (g.type != "multiple") {
                    d.find(".selected").removeClass("selected");
                    if (g._index != -1) {
                        d.find('.lr-selectitem-li[data-value="' + g._index + '"]').addClass("selected")
                    }
                }
            } else {
                d.slideUp(150);
                f.removeClass("lr-select-focus")
            }
            g = null;
            h.stopPropagation()
        },
        itemClick: function (k) {
            k = k || Window.event;
            var l = k.target || k.srcElement;
            var d = a(l);
            var g = a(this);
            var j = g[0].dfop;
            var h = a("#" + j.id);
            if (j.type != "multiple") {
                if (d.hasClass("lr-selectitem-li")) {
                    var i = d.attr("data-value");
                    g.find(".selected").removeClass("selected");
                    d.addClass("selected");
                    if (j._index != i) {
                        var f = h.find(".lr-select-placeholder");
                        if (i == -1) {
                            f.css("color", "#999");
                            f.html("==" + j.placeholder + "==")
                        } else {
                            f.css("color", "#000");
                            f.html(j.data[i][j.text])
                        }
                        j._index = i;
                        h.trigger("change");
                        if (j.select) {
                            j.select(j.data[i])
                        }
                    }
                    g.slideUp(150);
                    h.removeClass("lr-select-focus")
                }
            } else {
                if (d.hasClass("lr-selectitem-li") || d.hasClass("lr-select-node-cb")) {
                    var f = h.find(".lr-select-placeholder");
                    var c = d.find(".lr-select-node-cb");
                    var i = d.attr("data-value");
                    if (d.hasClass("lr-select-node-cb")) {
                        c = d;
                        i = d.parent().attr("data-value")
                    }
                    j.multipleMapValue = j.multipleMapValue || {};
                    j.multipleValue = j.multipleValue || [];
                    j.multipleText = j.multipleText || [];
                    if (i == -1) {
                        f.css("color", "#999");
                        f.html("==" + j.placeholder + "==");
                        j.multipleMapValue = {};
                        j.multipleValue = [];
                        j.multipleText = [];
                        g.find('.lr-select-node-cb[src$="checkbox_1.png"]').attr("src", "assets/Content/images/learuntree/checkbox_0.png");
                        g.slideUp(150);
                        h.removeClass("lr-select-focus")
                    } else {
                        var m = true;
                        if (j.multipleMapValue[i] == undefined) {
                            f.css("color", "#000");
                            j.multipleValue.push(j.data[i][j.value]);
                            j.multipleText.push(j.data[i][j.text]);
                            j.multipleMapValue[i] = j.data[i];
                            f.html(String(j.multipleText));
                            c.attr("src", "assets/Content/images/learuntree/checkbox_1.png")
                        } else {
                            j.multipleValue = [];
                            j.multipleText = [];
                            delete j.multipleMapValue[i];
                            a.each(j.multipleMapValue, function (e, n) {
                                j.multipleValue.push(n[j.value]);
                                j.multipleText.push(n[j.text])
                            });
                            if (j.multipleText.length == 0) {
                                f.css("color", "#999");
                                f.html("==" + j.placeholder + "==")
                            } else {
                                f.html(String(j.multipleText))
                            }
                            m = false;
                            c.attr("src", "assets/Content/images/learuntree/checkbox_0.png")
                        }
                        h.trigger("change");
                        if (j.select) {
                            j.select(j.data[i], m, h)
                        }
                    }
                }
            }
            k.stopPropagation()
        },
        treeNodeClick: function (h, d) {
            var e = d.parents(".lr-select-option");
            var g = e[0].dfop;
            e.slideUp(150);
            var f = a("#" + g.id);
            f.removeClass("lr-select-focus");
            g.currtentItem = h;
            var c = f.find(".lr-select-placeholder");
            c.html(g.currtentItem.text);
            if (h.value == "-1") {
                c.css("color", "#999")
            } else {
                c.css("color", "#000")
            }
            f.trigger("change");
            if (g.select) {
                g.select(g.currtentItem)
            }
            e = null;
            f = null
        },
        treeNodeClick2: function (i, d) {
            var g = d.parents(".lr-select-option-content");
            var e = d.parents(".lr-select-option");
            var h = e[0].dfop;
            var f = a("#" + h.id);
            f.removeClass("lr-select-focus");
            h.currtentItems = [];
            if (i.value == "-1") {
                d.parents(".lr-select-option").slideUp(150);
                g.lrtreeSet("allNoCheck");
                var c = f.find(".lr-select-placeholder");
                c.html(i.text);
                c.css("color", "#999");
                f.trigger("change");
                if (h.select) {
                    h.select([])
                }
            }
            g = null;
            e = null;
            f = null
        },
        treeNodeCheck: function (m, d) {
            var g = d.parents(".lr-select-option-content");
            var e = d.parents(".lr-select-option");
            var j = e[0].dfop;
            var f = a("#" + j.id);
            var c = f.find(".lr-select-placeholder");
            f.removeClass("lr-select-focus");
            var h = g.lrtreeSet("getCheckNodesEx");
            j.currtentItems = h;
            var p = "";
            for (var k = 0, n = h.length; k < n; k++) {
                var o = h[k];
                if (p != "") {
                    p += ","
                }
                p += o.text
            }
            if (p == "") {
                c.html("==" + j.placeholder + "==");
                c.css("color", "#999")
            } else {
                c.text(p);
                c.css("color", "#000")
            }
            f.trigger("change");
            if (j.select) {
                j.select(j.currtentItems)
            }
            g = null;
            e = null;
            f = null;
            c = null
        },
        defaultValue: function (d, f) {
            var e = d[0]._lrselect.dfop;
            e.currtentItem = null;
            e._index = -1;
            var c = d.find(".lr-select-placeholder");
            c.css("color", "#999");
            c.html("==" + e.placeholder + "==");
            a("#" + e.id + " .lr-select-option .selected").removeClass("selected");
            e.select && e.select(null, f);
            d.trigger("change")
        }
    };
    a.fn.lrselect = function (e) {
        var d = {
            placeholder: "请选择",
            type: "default",
            value: "id",
            text: "text",
            title: "title",
            width: false,
            allowSearch: false,
            url: false,
            data: false,
            param: null,
            method: "GET",
            select: false,
            isload: false,
            isrender: false
        };
        a.extend(d, e || {});
        var c = a(this);
        if (c.length == 0) {
            return c
        }
        d.id = c.attr("id");
        if (!d.id) {
            return false
        }
        if (c[0]._lrselect) {
            return c
        }
        c[0]._lrselect = {
            dfop: d
        };
        a.lrselect.bindEvent(c);
        if (d.url) {
            b.httpAsync(d.method, d.url, d.param, function (f) {
                c[0]._lrselect.dfop.data = f || [];
                c[0]._lrselect.dfop.backdata = f || [];
                d.isload = true
            })
        } else {
            if (d.data) {
                d.isload = true;
                d.backdata = d.data
            } else {
                a.lrselect.htmlToData(c);
                d.isload = true;
                d.backdata = d.data
            }
        }
        a.lrselect.initRender(d, c);
        return c
    };
    a.fn.lrselectRefresh = function (e) {
        var c = a(this);
        if (c.length == 0) {
            return c
        }
        if (!c[0]._lrselect) {
            return false
        }
        var d = c[0]._lrselect.dfop;
        if (!d) {
            return false
        }
        a.extend(d, e || {});
        d.isload = false;
        d.isrender = false;
        if (d.url) {
            b.httpAsync(d.method, d.url, d.param, function (f) {
                c[0]._lrselect.dfop.data = f || [];
                c[0]._lrselect.dfop.backdata = f || [];
                d.isload = true
            })
        } else {
            if (d.data) {
                d.isload = true;
                d.backdata = d.data
            }
        }
        if (d._setValue != null && d._setValue != undefined) {
            c.lrselectSet(d._setValue)
        } else {
            a.lrselect.defaultValue(c, "refresh")
        }
        return c
    };
    a.fn.lrselectGet = function () {
        var c = a(this);
        if (c.length == 0) {
            return c
        }
        var d = c[0]._lrselect.dfop;
        var g = "";
        switch (d.type) {
            case "default":
                if (d.data[d._index]) {
                    g = d.data[d._index][d.value]
                }
                break;
            case "tree":
                if (d.currtentItem) {
                    g = d.currtentItem[d.value]
                }
                break;
            case "treemultiple":
                if (d.currtentItems) {
                    for (var e = 0, f = d.currtentItems.length; e < f; e++) {
                        if (g != "") {
                            g += ","
                        }
                        g += d.currtentItems[e][d.value]
                    }
                }
                break;
            case "gird":
                break;
            case "multiple":
                d.multipleValue = d.multipleValue || [];
                return String(d.multipleValue);
            default:
                break
        }
        return g
    };
    a.fn.lrselectSet = function (f) {
        var c = a(this);
        if (c.length == 0) {
            return c
        }
        if (!c[0]._lrselect) {
            return c
        }
        f = f + "";
        if (f == "" || f == "undefined" || f == "null") {
            a.lrselect.defaultValue(c);
            return c
        }
        var e = c[0]._lrselect.dfop;
        e._setValue = null;
        if (!e) {
            return c
        }
        a("#" + e.id + " .lr-select-option .selected").removeClass("selected");

        function d(m) {
            if (m.isload == false) {
                setTimeout(function () {
                    d(m)
                }, 100)
            } else {
                if (m.isload == true) {
                    var j;
                    switch (m.type) {
                        case "default":
                            for (var n = 0, o = m.data.length; n < o; n++) {
                                if (m.data[n][m.value] == f) {
                                    m._index = n;
                                    j = m.data[n];
                                    break
                                }
                            }
                            break;
                        case "tree":
                            j = a.lrtree.findItem(m.data, m.value, f);
                            m.currtentItem = j;
                            break;
                        case "treemultiple":
                            a.lrselect.render(m);
                            c.find(".lr-select-option-content").lrtreeSet("setCheck", f.split(","));
                            return false;
                        case "gird":
                            break;
                        case "multiple":
                            m.multipleMapValue = {};
                            m.multipleValue = [];
                            m.multipleText = [];
                            if (m.isrender) {
                                c.find('.lr-select-node-cb[src$="checkbox_1.png"]').attr("src", "assets/Content/images/learuntree/checkbox_0.png")
                            }
                            var k = f.split(",");
                            for (var n = 0, o = m.data.length; n < o; n++) {
                                var h = a.inArray(m.data[n][m.value] + "", k);
                                if (h != -1) {
                                    m.multipleMapValue[n] = m.data[n];
                                    m.multipleValue.push(m.data[n][m.value]);
                                    m.multipleText.push(m.data[n][m.text]);
                                    if (m.isrender) {
                                        c.find('[data-value="' + n + '"] .lr-select-node-cb').attr("src", "assets/Content/images/learuntree/checkbox_1.png")
                                    }
                                    if (m.select) {
                                        m.select(m.data[n], true, c)
                                    }
                                }
                            }
                            if (m.multipleText.length > 0) {
                                j = m.multipleText
                            }
                            break;
                        default:
                            break
                    }
                    if (j) {
                        if (m.type == "multiple") {
                            var g = c.find(".lr-select-placeholder");
                            if (m.multipleText.length > 0) {
                                g.css("color", "#000")
                            } else {
                                g.css("color", "#999")
                            }
                            g.html(String(m.multipleText));
                            c.trigger("change")
                        } else {
                            var g = c.find(".lr-select-placeholder");
                            g.html(j[m.text]);
                            g.css("color", "#000");
                            c.trigger("change");
                            if (m.select) {
                                m.select(j)
                            }
                        }
                    } else {
                        m._setValue = f
                    }
                }
            }
        }
        d(e);
        return c
    };
    a.fn.lrselectGetEx = function () {
        var c = a(this);
        if (c.length == 0) {
            return c
        }
        var d = c[0]._lrselect.dfop;
        var e = null;
        switch (d.type) {
            case "default":
                if (d.data[d._index]) {
                    e = d.data[d._index]
                }
                break;
            case "tree":
                if (d.currtentItem) {
                    e = d.currtentItem
                }
                break;
            case "treemultiple":
                if (d.currtentItems) {
                    e = d.currtentItems
                }
                break;
            case "gird":
                break;
            case "multiple":
                e = d.multipleValue || [];
                break;
            default:
                break
        }
        return e
    }
})(window.jQuery, top.learun);