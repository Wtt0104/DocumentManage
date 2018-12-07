//lrtree
(function (a, b) {
    a.lrtree = {
        getItem: function (f, d) {
            var c = f.split(".");
            var g = d.data;
            for (var e = 0; e < c.length; e++) {
                if (e == 0) {
                    g = g[c[e]]
                } else {
                    g = g.ChildNodes[c[e]]
                }
            }
            return g
        },
        render: function (d) {
            var g = d[0]._lrtree.dfop;
            var e = a('<ul class="lr-tree-root" ></ul>');
            var f = g.data.length;
            for (var h = 0; h < f; h++) {
                var c = a.lrtree.renderNode(g.data[h], 0, h, g);
                e.append(c)
            }
            d.append(e);
            d.lrscroll();
            g = null
        },
        renderNode: function (v, p, w, q) {
            if (v.shide) {
                return ""
            }
            v._deep = p;
            v._path = w;
            var u = v.id.replace(/[^\w]/gi, "_");
            var x = v.title || v.text;
            var g = a('<li class="lr-tree-node"></li>');
            var h = a('<div id="' + q.id + "_" + u + '" tpath="' + w + '" title="' + x + '"  dataId="' + q.id + '"  class="lr-tree-node-el" ></div>');
            if (v.hasChildren) {
                var o = (v.isexpand || q.isAllExpand) ? "lr-tree-node-expanded" : "lr-tree-node-collapsed";
                h.addClass(o)
            } else {
                h.addClass("lr-tree-node-leaf")
            }
            var i = a('<span class="lr-tree-node-indent"></span>');
            if (p == 1) {
                i.append('<img class="lr-tree-icon" src="' + q.cbiconpath + 's.gif"/>')
            } else {
                if (p > 1) {
                    i.append('<img class="lr-tree-icon" src="' + q.cbiconpath + 's.gif"/>');
                    for (var r = 1; r < p; r++) {
                        i.append('<img class="lr-tree-icon" src="' + q.cbiconpath + 's.gif"/>')
                    }
                }
            }
            h.append(i);
            var f = a('<img class="lr-tree-ec-icon" src="' + q.cbiconpath + 's.gif"/>');
            h.append(f);
            if (v.showcheck) {
                if (v.checkstate == null || v.checkstate == undefined) {
                    v.checkstate = 0
                }
                var d = a('<img  id="' + q.id + "_" + u + '_cb" + class="lr-tree-node-cb" src="' + q.cbiconpath + q.icons[v.checkstate] + '" />');
                h.append(d)
            }
            if (v.icon != -1) {
                if (!!v.icon) {
                    h.append('<i class="' + v.icon + '"></i>&nbsp;')
                } else {
                    if (v.hasChildren) {
                        if (v.isexpand || q.isAllExpand) {
                            h.append('<i class="fa fa-folder-open" style="width:15px">&nbsp;</i>')
                        } else {
                            h.append('<i class="fa fa-folder" style="width:15px">&nbsp;</i>')
                        }
                    } else {
                        h.append('<i class="fa fa-file-o"></i>&nbsp;')
                    }
                }
            }
            var n = '<a class="lr-tree-node-anchor" href="javascript:void(0);">';
            n += '<span data-value="' + v.id + '" class="lr-tree-node-text" >' + v.text + "</span>";
            n += "</a>";
            h.append(n);
            h.on("click", a.lrtree.nodeClick);
            if (!v.complete) {
                h.append('<div class="lr-tree-loading"><img class="lr-tree-ec-icon" src="' + q.cbiconpath + 'loading.gif"/></div>')
            }
            g.append(h);
            if (v.hasChildren) {
                var m = a('<ul  class="lr-tree-node-ct" >');
                if (!v.isexpand && !q.isAllExpand) {
                    m.css("display", "none")
                }
                if (v.ChildNodes) {
                    var t = v.ChildNodes.length;
                    for (var s = 0; s < t; s++) {
                        v.ChildNodes[s].parent = v;
                        var e = a.lrtree.renderNode(v.ChildNodes[s], p + 1, w + "." + s, q);
                        m.append(e)
                    }
                    g.append(m)
                }
            }
            v.render = true;
            q = null;
            return g
        },
        renderNodeAsync: function (d, i, f) {
            var e = a('<ul  class="lr-tree-node-ct" >');
            if (!i.isexpand && !f.isAllExpand) {
                e.css("display", "none")
            }
            if (i.ChildNodes) {
                var h = i.ChildNodes.length;
                for (var g = 0; g < h; g++) {
                    i.ChildNodes[g].parent = i;
                    var c = a.lrtree.renderNode(i.ChildNodes[g], i._deep + 1, i._path + "." + g, f);
                    e.append(c)
                }
                d.parent().append(e)
            }
            return e
        },
        renderToo: function (d) {
            var g = d[0]._lrtree.dfop;
            var e = d.find(".lr-tree-root");
            e.html("");
            var f = g.data.length;
            for (var h = 0; h < f; h++) {
                var c = a.lrtree.renderNode(g.data[h], 0, h, g);
                e.append(c)
            }
            g = null
        },
        nodeClick: function (i) {
            var j = i.target || i.srcElement;
            var f = a(this);
            var d = a("#" + f.attr("dataId"));
            var h = d[0]._lrtree.dfop;
            if (j.tagName == "IMG") {
                var c = a(j);
                var g = f.next(".lr-tree-node-ct");
                if (c.hasClass("lr-tree-ec-icon")) {
                    if (f.hasClass("lr-tree-node-expanded")) {
                        g.slideUp(200, function () {
                            f.removeClass("lr-tree-node-expanded");
                            f.addClass("lr-tree-node-collapsed")
                        })
                    } else {
                        if (f.hasClass("lr-tree-node-collapsed")) {
                            var l = f.attr("tpath");
                            var k = a.lrtree.getItem(l, h);
                            if (!k.complete) {
                                if (!k._loading) {
                                    k._loading = true;
                                    f.find(".lr-tree-loading").show();
                                    b.http.httpAsync("GET", h.url, {
                                        parentId: k.id
                                    }, function (e) {
                                        if (!!e) {
                                            k.ChildNodes = e;
                                            g = a.lrtree.renderNodeAsync(f, k, h);
                                            g.slideDown(200, function () {
                                                f.removeClass("lr-tree-node-collapsed");
                                                f.addClass("lr-tree-node-expanded")
                                            });
                                            k.complete = true;
                                            f.find(".lr-tree-loading").hide()
                                        }
                                        k._loading = false
                                    })
                                }
                            } else {
                                g.slideDown(200, function () {
                                    f.removeClass("lr-tree-node-collapsed");
                                    f.addClass("lr-tree-node-expanded")
                                })
                            }
                        }
                    }
                } else {
                    if (c.hasClass("lr-tree-node-cb")) {
                        var l = f.attr("tpath");
                        var k = a.lrtree.getItem(l, h);
                        if (k.checkstate == 1) {
                            k.checkstate = 0
                        } else {
                            k.checkstate = 1
                        }
                        c.attr("src", h.cbiconpath + h.icons[k.checkstate]);
                        a.lrtree.checkChild(a.lrtree.check, k, k.checkstate, h);
                        a.lrtree.checkParent(a.lrtree.check, k, k.checkstate, h);
                        if (!!h.nodeCheck) {
                            h.nodeCheck(k, f)
                        }
                    }
                }
            } else {
                var l = f.attr("tpath");
                var k = a.lrtree.getItem(l, h);
                h.currentItem = k;
                a("#" + h.id).find(".lr-tree-selected").removeClass("lr-tree-selected");
                f.addClass("lr-tree-selected");
                if (!!h.nodeClick) {
                    h.nodeClick(k, f)
                }
            }
            return false
        },
        check: function (h, n, o, e) {
            var m = h.checkstate;
            if (o == 1) {
                h.checkstate = n
            } else {
                var d = h.ChildNodes;
                var j = d.length;
                var c = true;
                for (var g = 0; g < j; g++) {
                    d[g].checkstate = d[g].checkstate || 0;
                    if ((n == 1 && d[g].checkstate != 1) || n == 0 && d[g].checkstate != 0) {
                        c = false;
                        break
                    }
                }
                if (c) {
                    h.checkstate = n
                } else {
                    h.checkstate = 2
                }
            }
            if (h.render && m != h.checkstate) {
                var k = h.id.replace(/[^\w]/gi, "_");
                var f = a("#" + e.id + "_" + k + "_cb");
                if (f.length == 1) {
                    f.attr("src", e.cbiconpath + e.icons[h.checkstate])
                }
            }
        },
        checkParent: function (d, e, h, c) {
            var f = e.parent;
            while (f) {
                var g = d(f, h, 0, c);
                if (g === false) {
                    break
                }
                f = f.parent
            }
        },
        checkChild: function (e, h, j, d) {
            if (e(h, j, 1, d) != false) {
                if (h.ChildNodes != null && h.ChildNodes.length > 0) {
                    var c = h.ChildNodes;
                    for (var f = 0, g = c.length; f < g; f++) {
                        a.lrtree.checkChild(e, c[f], j, d)
                    }
                }
            }
        },
        search: function (d, c) {
            var e = false;
            a.each(c, function (g, h) {
                var f = false;
                if (!b.validator.isNotNull(d).code || h.text.indexOf(d) != -1) {
                    f = true
                }
                if (h.hasChildren) {
                    if (a.lrtree.search(d, h.ChildNodes)) {
                        f = true
                    }
                }
                if (f) {
                    e = true;
                    h.isexpand = true;
                    h.shide = false
                } else {
                    h.shide = true
                }
            });
            return e
        },
        findItem: function (e, f, g) {
            var d = null;
            c(e, f, g);

            function c(h, j, k) {
                for (var m = 0, n = h.length; m < n; m++) {
                    if (h[m][f] == g) {
                        d = h[m];
                        return true
                    }
                    if (h[m].hasChildren && h[m].ChildNodes.length > 0) {
                        if (c(h[m].ChildNodes, j, k)) {
                            return true
                        }
                    }
                }
                return false
            }
            return d
        },
        listTotree: function (e, m, g, o, p, d) {
            var n = [];
            var k = {};
            for (var f = 0, j = e.length; f < j; f++) {
                var h = e[f];
                k[h[m]] = k[h[m]] || [];
                k[h[m]].push(h)
            }
            c(n, "0");

            function c(i, v) {
                var u = k[v] || [];
                for (var s = 0, t = u.length; s < t; s++) {
                    var q = u[s];
                    var r = {
                        id: q[g],
                        text: q[o],
                        value: q[p],
                        showcheck: d,
                        checkstate: false,
                        hasChildren: false,
                        isexpand: false,
                        complete: true,
                        ChildNodes: []
                    };
                    if (c(r.ChildNodes, q[g])) {
                        r.hasChildren = true;
                        r.isexpand = true
                    }
                    i.push(r)
                }
                return i.length > 0
            }
            return n
        },
        treeTotree: function (f, g, i, j, d, e) {
            var h = [];
            c(h, f);

            function c(q, n) {
                for (var o = 0, p = n.length; o < p; o++) {
                    var k = n[o];
                    var m = {
                        id: k[g],
                        text: k[i],
                        value: k[j],
                        showcheck: d,
                        checkstate: false,
                        hasChildren: false,
                        isexpand: true,
                        complete: true,
                        ChildNodes: []
                    };
                    if (k[e].length > 0) {
                        m.hasChildren = true;
                        c(m.ChildNodes, k[e])
                    }
                    q.push(m)
                }
            }
            return h
        },
        addNode: function (e, i, g, h) {
            var f = e[0]._lrtree.dfop;
            if (!!g) {
                f.data.splice(h, 0, i);
                var c = a.lrtree.renderNode(i, 0, h, f);
                if (e.find(".lr-tree-root>li").length == 0) {
                    e.find(".lr-tree-root>li").append(c)
                } else {
                    e.find(".lr-tree-root>li").eq(h).before(c)
                }
            } else {
                var d = e.find("#" + f.id + "_" + g);
                var j = d.attr("tpath");
                var c = a.lrtree.renderNode(i, 0, j + "." + h, f);
                if (d.next().children().length == 0) {
                    d.next().children().append(c)
                } else {
                    d.next().children().eq(h).before(c)
                }
            }
        },
        setValue: function (c) {
            var d = c[0]._lrtree.dfop;
            if (d.data.length == 0) {
                setTimeout(function () {
                    a.lrtree.setValue(c)
                }, 100)
            } else {
                c.find('span[data-value="' + d._value + '"]').trigger("click")
            }
        }
    };
    a.fn.lrtree = function (g) {
        var d = {
            icons: ["checkbox_0.png", "checkbox_1.png", "checkbox_2.png"],
            method: "GET",
            url: false,
            param: null,
            data: [],
            isAllExpand: false,
            cbiconpath: layui.cache.base + "lp/jsTree/images/",
            nodeClick: false,
            nodeCheck: false
        };
        a.extend(d, g);
        var c = a(this);
        d.id = c.attr("id");
        if (d.id == null || d.id == "") {
            d.id = "learuntree" + new Date().getTime();
            c.attr("id", d.id)
        }
        c.html("");
        c.addClass("lr-tree");
        c[0]._lrtree = {
            dfop: d
        };
        c[0]._lrtree.dfop.backupData = d.data;
        if (d.url) {
            b.http.httpAsync(d.method, d.url, d.param, function (h) {
                c[0]._lrtree.dfop.data = h || [];
                c[0]._lrtree.dfop.backupData = c[0]._lrtree.dfop.data;
                a.lrtree.render(c)
            })
        } else {
            a.lrtree.render(c)
        }
        if (d.showcheck) {
            for (var e = 0; e < 3; e++) {
                var f = new Image();
                f.src = d.cbiconpath + d.icons[e]
            }
        }
        d = null;
        return c
    };
    a.fn.lrtreeSet = function (i, j) {
        var c = a(this);
        var e = c[0]._lrtree.dfop;
        var f = function (p, m, n) {
            for (var o = 0, q = p.length; o < q; o++) {
                if (c.find("#" + e.id + "_" + p[o].id.replace(/-/g, "_")).parent().css("display") != "none") {
                    (p[o].showcheck == true && (p[o].checkstate == 1 || p[o].checkstate == 2)) && m.push(n(p[o]));
                    if (!p[o].showcheck || (p[o].showcheck == true && (p[o].checkstate == 1 || p[o].checkstate == 2))) {
                        if (p[o].ChildNodes != null && p[o].ChildNodes.length > 0) {
                            f(p[o].ChildNodes, m, n)
                        }
                    }
                }
            }
        };
        var g = function (p, m, n) {
            for (var o = 0, q = p.length; o < q; o++) {
                (p[o].showcheck == true && (p[o].checkstate == 1 || p[o].checkstate == 2) && !p[o].hasChildren) && m.push(n(p[o]));
                if (!p[o].showcheck || (p[o].showcheck == true && (p[o].checkstate == 1 || p[o].checkstate == 2))) {
                    if (p[o].ChildNodes != null && p[o].ChildNodes.length > 0) {
                        g(p[o].ChildNodes, m, n)
                    }
                }
            }
        };
        var l = function (p, m, n) {
            for (var o = 0, q = p.length; o < q; o++) {
                if (p[o].showcheck) {
                    p[o].checkstate = 0
                }
                if (p[o].ChildNodes != null && p[o].ChildNodes.length > 0) {
                    l(p[o].ChildNodes)
                }
            }
        };
        switch (i) {
            case "allNoCheck":
                c.find(".lr-tree-node-cb").attr("src", e.cbiconpath + "checkbox_0.png");
                l(e.data);
                break;
            case "allCheck":
                c.find('.lr-tree-node-cb[src$="checkbox_0.png"]').trigger("click");
                break;
            case "setCheck":
                var h = j;
                a.each(h, function (n, o) {
                    var m = c.find("#" + e.id + "_" + o.replace(/-/g, "_"));
                    if (m.next().length == 0) {
                        m.find(".lr-tree-node-cb").trigger("click")
                    }
                });
                break;
            case "setValue":
                e._value = j;
                a.lrtree.setValue(c);
                break;
            case "currentItem":
                return e.currentItem;
                break;
            case "getCheckNodesEx":
                var d = [];
                g(e.data, d, function (m) {
                    return m
                });
                return d;
                break;
            case "getCheckNodes":
                var d = [];
                f(e.data, d, function (m) {
                    return m
                });
                return d;
                break;
            case "getCheckNodeIds":
                var d = [];
                f(e.data, d, function (m) {
                    return m.id
                });
                return d;
                break;
            case "getCheckNodeIdsByPath":
                var d = [];
                var k;
                f(e.data, d, function (m) {
                    return m.id
                });
                return d;
                break;
            case "search":
                a.lrtree.search(j.keyword, e.data);
                if (b.validator.isNotNull(j.keyword).code) {
                    e._isSearch = true
                } else {
                    if (e._isSearch) {
                        e._isSearch = false
                    }
                }
                a.lrtree.renderToo(c);
                break;
            case "refresh":
                a.extend(e, j || {});
                if (!!e.url) {
                    b.http.httpAsync(e.method, e.url, e.param, function (m) {
                        c[0]._lrtree.dfop.data = m || [];
                        c[0]._lrtree.dfop.backupData = c[0]._lrtree.dfop.data;
                        a.lrtree.renderToo(c);
                        e._isSearch = false
                    })
                } else {
                    c[0]._lrtree.dfop.backupData = c[0]._lrtree.dfop.data;
                    a.lrtree.renderToo(c);
                    e._isSearch = false
                }
                break;
            case "addNode":
                break;
            case "updateNode":
                break
        }
    }
})(window.jQuery, top.learun);