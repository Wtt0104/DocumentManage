layui.define(['jsHelper'], function (exports) {
    var js = layui.jsHelper;
    var $ = js.$;
    var lrModuleButtonList;
    var lrModuleColumnList;
    var lrModule;

    if (typeof ($.jfGrid) == undefined || $.jfGrid == null) {
        layui.link(layui.cache.base + 'lp/jfGrid/bootstrap.min.css');
        layui.link(layui.cache.base + 'lp/jfGrid/jfGrid.css');
        (function (a, j) {
            var b = null;
            var d = ["checkbox_0.png", "checkbox_1.png", "checkbox_2.png"];
            var h = layui.cache.base + "lp/jsGrid/images/";
            var f = function (u, y, w, t, v, z) {
                var q = z.left;
                var p = z.frozenleft;
                var r = 0;
                var n = 0;
                var o = false;
                if (y) {
                    q = y.left;
                    r = y.top + 28;
                    n = y.deep + 1;
                    o = y.frozen
                }
                var s = 0;
                var x = u.length;
                a.each(u, function (A, B) {
                    var C = {
                        data: B,
                        height: 28,
                        width: B.width || 100,
                        top: r,
                        left: q,
                        frozen: o,
                        deep: n,
                        last: true,
                        parent: y
                    };
                    if (!y && B.frozen) {
                        C.frozen = true;
                        C.left = p
                    }
                    w.push(C);
                    if (B.children && B.children.length > 0) {
                        C.last = false;
                        C.width = f(B.children, C, w, t, v, z)
                    } else {
                        z.MaxDeep = z.MaxDeep > C.deep ? z.MaxDeep : C.deep;
                        if (C.frozen) {
                            v.push(C)
                        } else {
                            t.push(C)
                        }
                        if (B.isMerge) {
                            z.mergeCols.push(C)
                        }
                        if (B.statistics) {
                            z.isStatistic = true
                        }
                    }
                    if (!y) {
                        if (C.frozen) {
                            p += C.width;
                            z.frozenleft += C.width
                        } else {
                            q += C.width;
                            z.left += C.width
                        }
                    } else {
                        q += C.width
                    }
                    s += C.width
                });
                return s
            };
            var k = function (n, p, o) {
                n._width = n.width + p;
                if (o) {
                    n.$cell.css({
                        width: n._width
                    })
                }
                if (n.parent) {
                    k(n.parent, p)
                }
            };
            var m = function (n, t, s) {
                var u = n.innerWidth();
                var q = t.running.headWidth + t.running.leftWidth;
                if (t.running.cols.length > 0) {
                    var p = t.running.cols[t.running.cols.length - 1];
                    var o = 0;
                    var r = false;
                    if (u > q) {
                        o = u - q + 1;
                        k(p, o, s);
                        r = true
                    } else {
                        if (p._width != undefined) {
                            o = 1;
                            k(p, o, s);
                            r = true
                        }
                    }
                    if (r) {
                        n.find("#jfgrid_head_col_" + t.id).css({
                            width: (t.running.headWidth + o)
                        });
                        if (s) {
                            n.find("#jfgrid_body_" + t.id + ">.lr-scroll-box").css({
                                width: (t.running.headWidth + t.running.leftWidth + o - 1)
                            });
                            n.find("#jfgrid_right_" + t.id).css({
                                width: (t.running.headWidth + o - 1)
                            });
                            n.find("#jfgrid_right_" + t.id + '>[colname="' + p.data.name + '"]').css({
                                width: p._width
                            })
                        }
                    }
                }
            };
            var e = function (x, r, t, u, s) {
                if (x !== 0) {
                    x = x || ""
                }
                if (r.formatter) {
                    var w = r.formatter(x, t, s, u.$cell);
                    u.text = a("<div>" + (w || "") + "</div>").text();
                    u.$cell.attr("title", u.text);
                    var n = u.$cell.find(".jfgrid-data-cell-expend");
                    u.$cell.html(w);
                    u.$cell.prepend(n);
                    if (r.statistics) {
                        u.statisticsNum = u.statisticsNum || 0;
                        s.running.statisticData[r.name] = s.running.statisticData[r.name] || 0;
                        s.running.statisticData[r.name] += (parseFloat(w || 0) - u.statisticsNum);
                        u.statisticsNum = parseFloat(w || 0);
                        a("#jfgrid_statistic_" + s.id + ' [name="' + r.name + '"]').text(s.running.statisticData[r.name])
                    }
                    n = null
                } else {
                    if (r.formatterAsync) {
                        r.formatterAsync(function (z) {
                            u.text = a("<div>" + (z || "") + "</div>").text();
                            u.$cell.attr("title", u.text);
                            var y = u.$cell.find(".jfgrid-data-cell-expend");
                            u.$cell.html(z);
                            u.$cell.prepend(y);
                            y = null;
                            if (r.statistics) {
                                u.statisticsNum = u.statisticsNum || 0;
                                s.running.statisticData[r.name] = s.running.statisticData[r.name] || 0;
                                s.running.statisticData[r.name] += (parseFloat(z || 0) - u.statisticsNum);
                                u.statisticsNum = parseFloat(z || 0);
                                a("#jfgrid_statistic_" + s.id + ' [name="' + r.name + '"]').text(s.running.statisticData[r.name])
                            }
                        }, x, t, s, u.$cell)
                    } else {
                        if (r.edit) {
                            switch (r.edit.type) {
                                case "input":
                                    break;
                                case "select":
                                    if (r.edit.op.data) {
                                        a.each(r.edit.op.data, function (z, A) {
                                            if (A[r.edit.op.value] == x) {
                                                u.text = A[r.edit.op.text];
                                                u.$cell.attr("title", u.text);
                                                var y = u.$cell.find(".jfgrid-data-cell-expend");
                                                u.$cell.html(u.text);
                                                u.$cell.prepend(y);
                                                y = null;
                                                return false
                                            }
                                        });
                                        return
                                    } else {
                                        if (r.edit.datatype === "dataItem") {
                                            j.clientdata.getAsync("dataItem", {
                                                key: x,
                                                code: r.edit.code,
                                                rowItem: u,
                                                callback: function (z, A) {
                                                    A.rowItem.text = z.text;
                                                    A.rowItem.$cell.attr("title", A.rowItem.text);
                                                    var y = A.rowItem.$cell.find(".jfgrid-data-cell-expend");
                                                    A.rowItem.$cell.html(A.rowItem.text);
                                                    A.rowItem.$cell.prepend(y);
                                                    y = null
                                                }
                                            });
                                            return
                                        } else {
                                            if (r.edit.datatype === "dataSource") {
                                                j.clientdata.getAsync("sourceData", {
                                                    key: x,
                                                    keyId: r.edit.op.value,
                                                    code: r.edit.code,
                                                    rowItem: u,
                                                    callback: function (z, A) {
                                                        A.rowItem.text = z[r.edit.op.text];
                                                        A.rowItem.$cell.attr("title", A.rowItem.text);
                                                        var y = A.rowItem.$cell.find(".jfgrid-data-cell-expend");
                                                        A.rowItem.$cell.html(A.rowItem.text);
                                                        A.rowItem.$cell.prepend(y);
                                                        y = null
                                                    }
                                                });
                                                return
                                            }
                                        }
                                    }
                                    break;
                                case "radio":
                                    if (r.edit.data) {
                                        a.each(r.edit.data, function (z, A) {
                                            if (A.id == x) {
                                                u.text = A.text;
                                                u.$cell.attr("title", u.text);
                                                var y = u.$cell.find(".jfgrid-data-cell-expend");
                                                u.$cell.html(u.text);
                                                u.$cell.prepend(y);
                                                y = null;
                                                return false
                                            }
                                        });
                                        return
                                    } else {
                                        if (r.edit.datatype === "dataItem") {
                                            j.clientdata.getAsync("dataItem", {
                                                key: x,
                                                code: r.edit.code,
                                                rowItem: u,
                                                callback: function (z, A) {
                                                    A.rowItem.text = z.text;
                                                    A.rowItem.$cell.attr("title", A.rowItem.text);
                                                    var y = A.rowItem.$cell.find(".jfgrid-data-cell-expend");
                                                    A.rowItem.$cell.html(A.rowItem.text);
                                                    A.rowItem.$cell.prepend(y);
                                                    y = null
                                                }
                                            });
                                            return
                                        } else {
                                            if (r.edit.datatype === "dataSource") {
                                                j.clientdata.getAsync("sourceData", {
                                                    key: x,
                                                    keyText: r.edit.op.text,
                                                    keyId: r.edit.op.value,
                                                    code: r.edit.code,
                                                    rowItem: u,
                                                    callback: function (z, A) {
                                                        A.rowItem.text = z[A.keyText];
                                                        A.rowItem.$cell.attr("title", A.rowItem.text);
                                                        var y = A.rowItem.$cell.find(".jfgrid-data-cell-expend");
                                                        A.rowItem.$cell.html(A.rowItem.text);
                                                        A.rowItem.$cell.prepend(y);
                                                        y = null
                                                    }
                                                });
                                                return
                                            }
                                        }
                                    }
                                    break;
                                case "checkbox":
                                    if (x != undefined && x != null && x != "") {
                                        if (r.edit.data) {
                                            var p = x.split(",");
                                            var q = {};
                                            a.each(p, function (y, z) {
                                                q[z] = "1"
                                            });
                                            var o = [];
                                            a.each(r.edit.data, function (y, z) {
                                                if (q[z.id] == "1") {
                                                    o.push(z.text)
                                                }
                                            });
                                            u.text = String(o);
                                            u.$cell.attr("title", u.text);
                                            var n = u.$cell.find(".jfgrid-data-cell-expend");
                                            u.$cell.html(u.text);
                                            u.$cell.prepend(n);
                                            n = null;
                                            return
                                        } else {
                                            if (r.edit.datatype === "dataItem") {
                                                j.clientdata.getAllAsync("dataItem", {
                                                    code: r.edit.code,
                                                    rowItem: u,
                                                    value: x,
                                                    callback: function (z, A) {
                                                        var C = A.value.split(",");
                                                        var D = {};
                                                        a.each(C, function (E, F) {
                                                            D[F] = "1"
                                                        });
                                                        var B = [];
                                                        a.each(z, function (E, F) {
                                                            if (D[F.value] == "1") {
                                                                B.push(F.text)
                                                            }
                                                        });
                                                        A.rowItem.text = String(B);
                                                        A.rowItem.$cell.attr("title", A.rowItem.text);
                                                        var y = A.rowItem.$cell.find(".jfgrid-data-cell-expend");
                                                        A.rowItem.$cell.html(A.rowItem.text);
                                                        A.rowItem.$cell.prepend(y);
                                                        y = null
                                                    }
                                                });
                                                return
                                            } else {
                                                if (r.edit.datatype === "dataSource") {
                                                    j.clientdata.getAllAsync("sourceData", {
                                                        value: x,
                                                        keyId: r.edit.op.value,
                                                        keyText: r.edit.op.text,
                                                        code: r.edit.code,
                                                        rowItem: u,
                                                        callback: function (z, A) {
                                                            var C = A.value.split(",");
                                                            var D = {};
                                                            a.each(C, function (E, F) {
                                                                D[F] = "1"
                                                            });
                                                            var B = [];
                                                            a.each(z, function (E, F) {
                                                                if (D[F[A.keyId]] == "1") {
                                                                    B.push(F[A.keyText])
                                                                }
                                                            });
                                                            A.rowItem.text = String(B);
                                                            A.rowItem.$cell.attr("title", A.rowItem.text);
                                                            var y = A.rowItem.$cell.find(".jfgrid-data-cell-expend");
                                                            A.rowItem.$cell.html(A.rowItem.text);
                                                            A.rowItem.$cell.prepend(y);
                                                            y = null
                                                        }
                                                    });
                                                    return
                                                }
                                            }
                                        }
                                    }
                                    break;
                                case "datatime":
                                    if (r.edit.dateformat == "0") {
                                        x = j.formatDate(x, "yyyy-MM-dd");
                                        t[r.name] = x
                                    }
                                    break;
                                case "layer":
                                    var v = u.$cell.attr("rowindex");
                                    var n = u.$cell.find(".jfgrid-data-cell-expend");
                                    u.text = x;
                                    u.$cell.attr("title", u.text);
                                    u.$cell.html((x || "") + '<i class="fa fa-ellipsis-h" value="' + v + '" ></i>');
                                    u.$cell.prepend(n);
                                    u.$cell.find(".fa-ellipsis-h")[0].op = r;
                                    u.$cell.find(".fa-ellipsis-h")[0].row = t;
                                    u.$cell.find(".fa-ellipsis-h").on("click", function () {
                                        var y = a(this);
                                        var A = y[0].op;
                                        var z = y[0].row;
                                        var B = y.attr("value");
                                        A.edit.init && A.edit.init(z, y.parent(), B);
                                        top.lrGirdLayerEdit = A;
                                        top.lrGirdLayerEditCallBack = function (C) {
                                            A.edit.change && A.edit.change(z, B, C);
                                            top.lrGirdLayerEdit = null;
                                            top.lrGirdLayerEditCallBack = null
                                        };
                                        if (r.edit.op) {
                                            j.layerForm({
                                                id: "lrgridlayerform",
                                                title: "选择" + r.label,
                                                url: top.$.rootUrl + "/Utility/JfGirdLayerForm",
                                                height: r.edit.op.height || 400,
                                                width: r.edit.op.width || 600,
                                                callBack: function (C) {
                                                    var D = top[C].acceptClick(function (E) {
                                                        A.edit.change && A.edit.change(z, B, E)
                                                    });
                                                    top.lrGirdLayerEdit = null;
                                                    return D
                                                }
                                            })
                                        }
                                        return false
                                    });
                                    return;
                                    break
                            }
                        }
                        var n = u.$cell.find(".jfgrid-data-cell-expend");
                        u.text = x;
                        u.$cell.attr("title", u.text);
                        u.$cell.html(u.text);
                        u.$cell.prepend(n);
                        if (r.statistics) {
                            u.statisticsNum = u.statisticsNum || 0;
                            s.running.statisticData[r.name] = s.running.statisticData[r.name] || 0;
                            s.running.statisticData[r.name] += (parseFloat(u.text || 0) - u.statisticsNum);
                            u.statisticsNum = parseFloat(u.text || 0);
                            a("#jfgrid_statistic_" + s.id + ' [name="' + r.name + '"]').text(s.running.statisticData[r.name])
                        }
                        n = null
                    }
                }
            };
            var l = function (n, o) {
                n.width = n.width + o;
                n.$cell.css({
                    width: n.width
                });
                if (n.parent) {
                    l(n.parent, o)
                }
            };
            var i = function (n, q, o) {
                switch (o.data.edit.type) {
                    case "input":
                        o.$edit = a('<div class="jfgrid-edit-cell"><input id="jfgrid_edit_' + q.id + "_" + o.data.name + '" /></div>');
                        if (o.frozen) {
                            n.find("#jfgrid_left_" + q.id).append(o.$edit)
                        } else {
                            n.find("#jfgrid_right_" + q.id).append(o.$edit)
                        }
                        o.$edit.on("keypress", function (r) {
                            if (event.keyCode == "13") {
                                g()
                            }
                        });
                        break;
                    case "select":
                        o.$edit = a('<div class="jfgrid-edit-cell"><div id="jfgrid_edit_' + q.id + "_" + o.data.name + '" ></div></div>');
                        if (o.frozen) {
                            n.find("#jfgrid_left_" + q.id).append(o.$edit)
                        } else {
                            n.find("#jfgrid_right_" + q.id).append(o.$edit)
                        }
                        o.data.edit.op = o.data.edit.op || {};
                        o.$edit.find("div").lrselect(o.data.edit.op);
                        o.data.edit.op.value = o.$edit.find("div")[0]._lrselect.dfop.value;
                        o.data.edit.op.text = o.$edit.find("div")[0]._lrselect.dfop.text;
                        if (o.data.edit.datatype == "dataItem") {
                            j.clientdata.getAllAsync("dataItem", {
                                code: o.data.edit.code,
                                callback: function (r) {
                                    var s = [];
                                    a.each(r, function (t, u) {
                                        s.push({
                                            id: u.value,
                                            text: u.text,
                                            title: u.text,
                                            k: t
                                        })
                                    });
                                    o.$edit.find("div").lrselectRefresh({
                                        data: s
                                    })
                                }
                            })
                        } else {
                            if (o.data.edit.datatype == "dataSource") {
                                j.clientdata.getAllAsync("sourceData", {
                                    code: o.data.edit.code,
                                    callback: function (r) {
                                        o.$edit.find("div").lrselectRefresh({
                                            data: r
                                        })
                                    }
                                })
                            }
                        }
                        break;
                    case "radio":
                        o.$edit = a('<div class="jfgrid-edit-cell"><div id="jfgrid_edit_' + q.id + "_" + o.data.name + '" class="radio"  ></div></div>');
                        if (o.frozen) {
                            n.find("#jfgrid_left_" + q.id).append(o.$edit)
                        } else {
                            n.find("#jfgrid_right_" + q.id).append(o.$edit)
                        }
                        if (o.data.edit.datatype == "dataItem") {
                            o.$edit.find("div").lrRadioCheckbox({
                                type: "radio",
                                code: o.data.edit.code
                            })
                        } else {
                            if (o.data.edit.datatype == "dataSource") {
                                o.$edit.find("div").lrRadioCheckbox({
                                    type: "radio",
                                    dataType: "dataSource",
                                    code: o.data.edit.code,
                                    text: o.data.edit.text,
                                    value: o.data.edit.value
                                })
                            } else {
                                a.each(o.data.edit.data || [], function (s, t) {
                                    var r = a('<label><input name="jfgrid_edit_' + q.id + "_" + o.data.name + '" value="' + t.id + '"' + (o.data.edit.dfvalue == t.id ? "checked" : "") + ' type="radio">' + t.text + "</label>");
                                    o.$edit.find("div").append(r)
                                })
                            }
                        }
                        break;
                    case "checkbox":
                        o.$edit = a('<div class="jfgrid-edit-cell"><div id="jfgrid_edit_' + q.id + "_" + o.data.name + '" class="checkbox"  ></div></div>');
                        if (o.frozen) {
                            n.find("#jfgrid_left_" + q.id).append(o.$edit)
                        } else {
                            n.find("#jfgrid_right_" + q.id).append(o.$edit)
                        }
                        if (o.data.edit.datatype == "dataItem") {
                            o.$edit.find("div").lrRadioCheckbox({
                                type: "checkbox",
                                code: o.data.edit.code
                            })
                        } else {
                            if (o.data.edit.datatype == "dataSource") {
                                o.$edit.find("div").lrRadioCheckbox({
                                    type: "checkbox",
                                    dataType: "dataSource",
                                    code: o.data.edit.code,
                                    text: o.data.edit.text,
                                    value: o.data.edit.value
                                })
                            } else {
                                a.each(o.data.edit.data || [], function (s, t) {
                                    var r = a('<label><input name="jfgrid_edit_' + q.id + "_" + o.data.name + '" value="' + t.id + '"' + (o.data.edit.dfvalue == t.id ? "checked" : "") + ' type="checkbox">' + t.text + "</label>");
                                    o.$edit.find("div").append(r)
                                })
                            }
                        }
                        break;
                    case "datatime":
                        var p = o.data.edit.dateformat == "0" ? "yyyy-MM-dd" : "yyyy-MM-dd HH:mm";
                        o.$edit = a('<div class="jfgrid-edit-cell"><input id="jfgrid_edit_' + q.id + "_" + o.data.name + '" onClick="WdatePicker({dateFmt:\'' + p + "',qsEnabled:false,isShowClear:false,isShowOK:false,isShowToday:false,onpicked:function(){$('#jfgrid_edit_" + q.id + "_" + o.data.name + '\').trigger(\'change\');}})"  type="text" class="form-control" /></div>');
                        if (o.frozen) {
                            n.find("#jfgrid_left_" + q.id).append(o.$edit)
                        } else {
                            n.find("#jfgrid_right_" + q.id).append(o.$edit)
                        }
                        o.$edit.on("keypress", function (r) {
                            if (event.keyCode == "13") {
                                g()
                            }
                        });
                        break;
                    case "layer":
                        break
                }
            };
            var g = function () {
                a(".jfgrid-layout .jfgrid-edit-cell ").hide();
                a(".jfgrid-layout .lr-select-option").slideUp(150);
                a(".jfgrid-layout .lr-select").removeClass("lr-select-focus")
            };
            var c = {
                init: function (n, o) {
                    if (o.url == "" || o.url == null || o.url == undefined) {
                        o.isPage = false
                    }
                    n.html("");
                    n.addClass("jfgrid-layout");
                    if (b === null) {
                        b = a('<div style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 9999;cursor: col-resize;display: none;" ></div>');
                        a("body").append(b)
                    }
                    c.layout(n, o);
                    c.bind(n, o);
                    c.head(n, o);
                    c.dataRender(n, o, o.rowdatas);
                    o = null
                },
                layout: function (t, v) {
                    if (v.height != undefined && v.height != null && v.height > 0) {
                        t.css({
                            height: v.height
                        })
                    }
                    var q = a('<div class="jfgrid-head" id="jfgrid_head_' + v.id + '" ></div>');
                    q.append('<div class="jfgrid-border" id="jfgrid_border_' + v.id + '" ></div>');
                    q.append('<div class="jfgrid-head-col" id="jfgrid_head_col_' + v.id + '" ></div>');
                    t.append(q);
                    var o = a('<div class="jfgrid-body" id="jfgrid_body_' + v.id + '" ></div>');
                    o.append('<div class="jfgrid-left" id="jfgrid_left_' + v.id + '" ></div>');
                    o.append('<div class="jfgrid-right" id="jfgrid_right_' + v.id + '" ></div>');
                    t.append(o);
                    var p = a('<div class="jfgrid-footer" id="jfgrid_footer_' + v.id + '" ></div>');
                    t.append(p);
                    t.append('<div class="jfgrid-move-line" id="jfgrid_move_line_' + v.id + '"  ></div>');
                    o.lrscroll(function (w, z) {
                        if (!t.is(":hidden")) {
                            t.find("#jfgrid_left_" + v.id).css("left", w);
                            t.find("#jfgrid_head_col_" + v.id).css("left", v.running.leftWidth - w);
                            if (v.running.isStatistic) {
                                t.find("#jfgrid_statistic_" + v.id + ">.jfgrid-statistic-right").css("left", -w)
                            }
                            g()
                        }
                    });
                    t.find("#jfgrid_body_" + v.id).append('<div class="jfgrid-nodata-img" id="jfgrid_nodata_img_' + v.id + '"  ><img src="' + layui.cache.base + 'lp/jsSelect/images/nodata.jpg"></div>');
                    if (v.isPage) {
                        t.css({
                            "padding-bottom": "35px"
                        });
                        var s = a('<div class="jfgrid-page-bar" id="jfgrid_page_bar_' + v.id + '"><div class="jfgrid-page-bar-info" >无显示数据</div>                <div class="paginations" id="jfgrid_page_bar_nums_' + v.id + '" style="display:none;" >                <ul class="pagination pagination-sm"><li><a href="javascript:void(0);" class="pagebtn">首页</a></li></ul>                <ul class="pagination pagination-sm"><li><a href="javascript:void(0);" class="pagebtn">上一页</a></li></ul>                <ul class="pagination pagination-sm" id="jfgrid_page_bar_num_' + v.id + '" ></ul>                <ul class="pagination pagination-sm"><li><a href="javascript:void(0);" class="pagebtn">下一页</a></li></ul>                <ul class="pagination pagination-sm"><li><a href="javascript:void(0);" class="pagebtn">尾页</a></li></ul>                <ul class="pagination"><li><span></span></li></ul>                <ul class="pagination"><li><input type="text" class="form-control"></li></ul>                <ul class="pagination pagination-sm"><li><a href="javascript:void(0);" class="pagebtn">跳转</a></li></ul>                </div></div>');
                        p.append(s);
                        s.find("#jfgrid_page_bar_num_" + v.id).on("click", c.turnPage);
                        s.find("#jfgrid_page_bar_nums_" + v.id + " .pagebtn").on("click", {
                            op: v
                        }, c.turnPage2);
                        s = null
                    } else {
                        if (v.isEdit) {
                            t.css({
                                "padding-bottom": "29px"
                            });
                            var u = a('<div class="jfgrid-toolbar" id="jfgrid_toolbar_' + v.id + '"></div>');
                            var n = a('<span><i class="fa fa-plus"></i></span>');
                            var r = a('<span><i class="fa fa-minus"></i></span>');
                            n.on("click", function () {
                                var w = {};
                                v.rowdatas.push(w);
                                v.onAddRow && v.onAddRow(w, v.rowdatas);
                                if (v.isTree) {
                                    c.rowRender(t, v, {
                                        data: w,
                                        childRows: []
                                    }, 0, 1)
                                } else {
                                    c.rowRender(t, v, w, 0)
                                }
                                t.find("#jfgrid_nodata_img_" + v.id).hide()
                            });
                            r.on("click", function () {
                                var x = false;
                                var y = true;
                                if (v.isMultiselect) {
                                    var w = [];
                                    a.each(v.running.rowdata, function (z, A) {
                                        if (A.jfcheck.value == 1) {
                                            y = true;
                                            if (v.beforeMinusRow) {
                                                y = v.beforeMinusRow(A.jfgridRowData)
                                            }
                                            if (y) {
                                                v.rowdatas.splice(v.rowdatas.indexOf(A.jfgridRowData), 1);
                                                w.push(A.jfgridRowData);
                                                x = true
                                            }
                                        }
                                    });
                                    if (x) {
                                        v.onMinusRow && v.onMinusRow(w, v.rowdatas)
                                    }
                                } else {
                                    if (v.running.rowSelected != null) {
                                        y = true;
                                        if (v.beforeMinusRow) {
                                            y = v.beforeMinusRow(v.running.rowSelected.jfgridRowData)
                                        }
                                        if (y) {
                                            v.rowdatas.splice((v.running.rowSelected.jfnum.value - 1), 1);
                                            x = true;
                                            v.onMinusRow && v.onMinusRow(v.running.rowSelected, v.rowdatas);
                                            v.running.rowSelected = null
                                        }
                                    }
                                }
                                if (x) {
                                    c.dataRender(t, v, v.rowdatas)
                                }
                                if (v.running.rowdata.length == 0) {
                                    t.find("#jfgrid_nodata_img_" + v.id).show()
                                }
                            });
                            u.append(n);
                            u.append(r);
                            p.append(u);
                            u = null
                        }
                    }
                    q = null;
                    o = null;
                    p = null
                },
                bind: function (n, o) {
                    n.on("click", function (r) {
                        var q = a(this);
                        var t = q[0].dfop;
                        var s = r.target || r.srcElement;
                        var p = a(s);
                        if (!p.hasClass("jfgrid-edit-cell") && p.parents(".jfgrid-edit-cell").length == 0) {
                            g()
                        }
                        if (t.running.isWidhChanging) {
                            dfop.isWidhChanging = false
                        } else {
                            if (p.hasClass("jfgrid-head-cell") || p.parents(".jfgrid-head-cell").length > 0) {
                                if (!p.hasClass("jfgrid-head-cell")) {
                                    p = p.parents(".jfgrid-head-cell")
                                }
                                c.sortCol(q, p, t)
                            } else {
                                if (p.attr("colname") == "jfgrid_subGrid" || p.parent().attr("colname") == "jfgrid_subGrid") {
                                    c.expandSub(q, p, t)
                                } else {
                                    if (p.parent().hasClass("jfgrid-data-cell-expend")) {
                                        c.expandTree(p, t)
                                    } else {
                                        if (p.hasClass("jfgrid-data-cell") || p.parents(".jfgrid-data-cell").length > 0) {
                                            c.clickRow(q, p, t);
                                            r.stopPropagation()
                                        } else {
                                            if (p.attr("id") == ("jfgrid_all_cb_" + t.id)) {
                                                c.checkAllRows(q, p, t)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                    n.on("dblclick", function (r) {
                        var q = a(this);
                        var t = q[0].dfop;
                        var s = r.target || r.srcElement;
                        var p = a(s);
                        if (p.hasClass("jfgrid-data-cell") || p.parents(".jfgrid-data-cell").length > 0) {
                            t.dblclick && t.dblclick(t.running.rowSelected.jfgridRowData)
                        }
                    });
                    n.on("mouseover", function (r) {
                        var q = a(this);
                        q.find(".jfgrid-data-cell-over").removeClass("jfgrid-data-cell-over");
                        var s = r.target || r.srcElement;
                        var p = a(s);
                        if (p.hasClass("jfgrid-data-cell") || p.parents(".jfgrid-data-cell").length > 0) {
                            var t = p.attr("rownum");
                            if (!t) {
                                t = p.parents(".jfgrid-data-cell").attr("rownum")
                            }
                            q.find('[rownum="' + t + '"]').addClass("jfgrid-data-cell-over")
                        }
                    });
                    n.resize(function () {
                        var p = a(this);
                        var q = p[0].dfop;
                        m(p, q, true);
                        var r = p.find("#jfgrid_body_" + q.id).width();
                        p.find(".jfgrid-sub").css({
                            width: r
                        })
                    });
                    n.delegate(".jfgrid-heed-move", "mousedown", {
                        op: o
                    }, function (r) {
                        b.show();
                        var s = r.data.op;
                        s.running.moveing = true;
                        s.running.xMousedown = r.pageX;
                        var p = a("#jfgrid_move_line_" + s.id);
                        var t = parseInt(a(this).parent().attr("path"));
                        var q = s.running.headData[t];
                        s.running.moveCol = q;
                        s.running.moveWidth = q._width || q.width;
                        s.running.moveLineLeft = q.left + s.running.moveWidth + s.running.leftWidth;
                        if (q.frozen) {
                            s.running.moveLineLeft = s.running.moveLineLeft - s.running.frozenleft
                        }
                        p.css({
                            left: s.running.moveLineLeft
                        }).show()
                    });
                    //top.
                    $(document).on("mousemove", {
                        $obj: n
                    }, function (q) {
                        var s = q.data.$obj[0].dfop;
                        var u = q.pageX;
                        if (s.running.moveing) {
                            var p = q.data.$obj.find("#jfgrid_move_line_" + s.id);
                            var t = s.running.moveWidth + (u - s.running.xMousedown);
                            t = (t < 40 ? 40 : t);
                            var r = s.running.moveLineLeft + (t - s.running.moveWidth);
                            p.css({
                                left: r
                            })
                        }
                    }).on("mouseup", {
                        $obj: n
                    }, function (s) {
                        var v = s.data.$obj[0].dfop;
                        if (v.running.moveing) {
                            v.running.moveing = false;
                            var z = s.pageX;
                            if (v.running.moveCol) {
                                var y = v.running.moveWidth + (z - v.running.xMousedown);
                                y = (y < 40 ? 40 : y);
                                var q = y - v.running.moveWidth;
                                if (q != 0) {
                                    l(v.running.moveCol, q);
                                    if (v.running.moveCol.frozen) {
                                        v.running.frozenleft += q;
                                        v.running.leftWidth += q;
                                        s.data.$obj.find("#jfgrid_head_" + v.id).css({
                                            "padding-left": v.running.leftWidth
                                        });
                                        s.data.$obj.find("#jfgrid_border_" + v.id).css({
                                            width: v.running.leftWidth
                                        });
                                        s.data.$obj.find("#jfgrid_head_col_" + v.id).css({
                                            left: v.running.leftWidth
                                        });
                                        s.data.$obj.find("#jfgrid_body_" + v.id + ">.lr-scroll-box").css({
                                            "padding-left": v.running.leftWidth
                                        });
                                        s.data.$obj.find("#jfgrid_left_" + v.id).css({
                                            width: v.running.leftWidth
                                        });
                                        s.data.$obj.find("#jfgrid_left_" + v.id + '>[colname="' + v.running.moveCol.data.name + '"]').css({
                                            width: v.running.moveCol.width
                                        });
                                        if (v.running.isStatistic) {
                                            s.data.$obj.find("#jfgrid_statistic_" + v.id).css({
                                                "padding-left": v.running.leftWidth
                                            });
                                            s.data.$obj.find("#jfgrid_statistic_" + v.id + ">.jfgrid-statistic-left").css({
                                                width: v.running.leftWidth
                                            });
                                            s.data.$obj.find("#jfgrid_statistic_" + v.id + ' [name="' + v.running.moveCol.data.name + '"]').css({
                                                width: v.running.moveCol.width
                                            })
                                        }
                                    } else {
                                        v.running.headWidth += q;
                                        v.running.left += q;
                                        s.data.$obj.find("#jfgrid_head_col_" + v.id).css({
                                            width: v.running.headWidth
                                        });
                                        s.data.$obj.find("#jfgrid_right_" + v.id).css({
                                            width: v.running.headWidth
                                        });
                                        s.data.$obj.find("#jfgrid_right_" + v.id + '>[colname="' + v.running.moveCol.data.name + '"]').css({
                                            width: v.running.moveCol.width
                                        });
                                        if (v.running.isStatistic) {
                                            s.data.$obj.find("#jfgrid_statistic_" + v.id + ">.jfgrid-statistic-right").css({
                                                width: v.running.headWidth
                                            });
                                            s.data.$obj.find("#jfgrid_statistic_" + v.id + ' [name="' + v.running.moveCol.data.name + '"]').css({
                                                width: v.running.moveCol.width
                                            })
                                        }
                                    }
                                    var w = parseInt(v.running.moveCol.$cell.attr("path"));
                                    for (var t = w + 1, u = v.running.headData.length; t < u; t++) {
                                        var r = v.running.headData[t];
                                        if (r.frozen && v.running.moveCol.frozen) {
                                            r.left += q;
                                            r.$cell.css({
                                                left: r.left + v.running.leftWidth - v.running.frozenleft
                                            });
                                            s.data.$obj.find("#jfgrid_left_" + v.id + '>[colname="' + r.data.name + '"]').css({
                                                left: r.left + v.running.leftWidth - v.running.frozenleft
                                            });
                                            if (v.running.isStatistic) {
                                                s.data.$obj.find("#jfgrid_statistic_" + v.id + ' [name="' + r.data.name + '"]').css({
                                                    left: r.left + v.running.leftWidth - v.running.frozenleft
                                                })
                                            }
                                        } else {
                                            if (!r.frozen && !v.running.moveCol.frozen) {
                                                r.left += q;
                                                r.$cell.css({
                                                    left: r.left
                                                });
                                                s.data.$obj.find("#jfgrid_right_" + v.id + '>[colname="' + r.data.name + '"]').css({
                                                    left: r.left
                                                });
                                                if (v.running.isStatistic) {
                                                    s.data.$obj.find("#jfgrid_statistic_" + v.id + ' [name="' + r.data.name + '"]').css({
                                                        left: r.left
                                                    })
                                                }
                                            }
                                        }
                                    }
                                    m(s.data.$obj, v, true)
                                }
                                v.running.moveCol = null
                            }
                            b.hide();
                            var p = s.data.$obj.find("#jfgrid_move_line_" + v.id);
                            p.hide()
                        }
                    })
                },
                head: function (q, v) {
                    v.running.MaxDeep = 0;
                    v.running.headWidth = 0;
                    v.running.headHeight = 0;
                    v.running.leftWidth = 0;
                    v.running.left = 0;
                    v.running.frozenleft = 0;
                    v.running.cols = [];
                    v.running.frozenCols = [];
                    v.running.mergeCols || [];
                    v.running.headData = [];
                    f(v.headData, false, v.running.headData, v.running.cols, v.running.frozenCols, v.running);
                    if (v.running.isStatistic) {
                        v.running.statisticData = {};
                        q.find("#jfgrid_footer_" + v.id).append('<div class="jfgrid-statistic" id="jfgrid_statistic_' + v.id + '"><div class="jfgrid-statistic-left"></div><div class="jfgrid-statistic-right" ></div></div>');
                        if (v.isPage) {
                            q.find("#jfgrid_footer_" + v.id).css({
                                height: 64,
                                "padding-top": "29px"
                            });
                            q.css({
                                "padding-bottom": "64px"
                            })
                        } else {
                            q.find("#jfgrid_footer_" + v.id).css({
                                height: 29
                            });
                            q.css({
                                "padding-bottom": "29px"
                            })
                        }
                        q.find("#jfgrid_toolbar_" + v.id).css({
                            width: "50px"
                        })
                    } else {
                        if (v.isEdit) {
                            q.find("#jfgrid_toolbar_" + v.id).css({
                                width: "100%"
                            })
                        }
                    }
                    v.running.headHeight = v.running.MaxDeep * 28 + 28;
                    v.running.headWidth = v.running.left;
                    var n = q.find("#jfgrid_border_" + v.id);
                    var p = q.find("#jfgrid_head_col_" + v.id);
                    if (v.isShowNum) {
                        n.append('<div class="jfgrid-border-cell jfgrid-border-num"></div>');
                        v.running.leftWidth += 30
                    }
                    if (v.isMultiselect) {
                        var o = a('<div class="jfgrid-border-cell jfgrid-border-cb"><img  id="jfgrid_all_cb_' + v.id + '" src="' + h + d[0] + '" /></div>').css({
                            left: v.running.leftWidth,
                            "line-height": (v.running.headHeight - 1) + "px"
                        });
                        n.append(o);
                        v.running.leftWidth += 30
                    }
                    if (v.isSubGrid) {
                        var s = a('<div class="jfgrid-border-cell jfgrid-border-sub"></div>').css("left", v.running.leftWidth);
                        n.append(s);
                        v.running.leftWidth += 30
                    }
                    v.running.leftWidth += v.running.frozenleft;
                    q.css({
                        "padding-top": v.running.headHeight
                    });
                    q.find("#jfgrid_head_" + v.id).css({
                        "padding-top": v.running.headHeight
                    });
                    n.css({
                        width: v.running.leftWidth,
                        height: v.running.headHeight
                    });
                    p.css({
                        width: v.running.headWidth,
                        height: v.running.headHeight,
                        left: v.running.leftWidth
                    });
                    q.find("#jfgrid_body_" + v.id + ">.lr-scroll-box").css({
                        "padding-left": v.running.leftWidth
                    });
                    q.find("#jfgrid_left_" + v.id).css({
                        width: v.running.leftWidth
                    });
                    m(q, v, false);
                    if (v.running.isStatistic) {
                        q.find("#jfgrid_statistic_" + v.id).css({
                            "padding-left": v.running.leftWidth
                        });
                        q.find("#jfgrid_statistic_" + v.id + ">.jfgrid-statistic-left").css({
                            width: v.running.leftWidth
                        })
                    }
                    var t = 0;
                    var r = null;
                    var u = true;
                    a.each(v.running.headData, function (w, x) {
                        if (x.last) {
                            x.height = x.height + (v.running.MaxDeep - x.deep) * 28
                        }
                        x.data.height = x.height;
                        x.$cell = a('<div class="jfgrid-head-cell" path="' + w + '"  ><span>' + (x.data.label || "") + "</span></div>").css({
                            top: x.top,
                            left: x.left,
                            width: (x._width || x.width),
                            height: x.height,
                            "line-height": (x.height - 1) + "px",
                            "text-align": (x.data.align || "left")
                        });
                        j.language.get((x.data.label || ""), function (y) {
                            x.data.label = y;
                            x.$cell.find("span").text(y)
                        });
                        if (x.last) {
                            x.$cell.append('<div class="jfgrid-heed-sort"><i class="fa fa-caret-up"></i><i class="fa fa-caret-down"></i></div>');
                            x.$cell.append('<div class="jfgrid-heed-move"></div>');
                            if (x.data.edit) {
                                i(q, v, x)
                            }
                            if (!x.frozen) {
                                t += (x._width || x.width)
                            }
                            if (v.running.isStatistic) {
                                if (x.data.statistics && u && r != null) {
                                    r.attr("isText", "1");
                                    r.css({
                                        "text-align": "right"
                                    });
                                    r.text("合计：");
                                    u = false
                                }
                                r = a('<div class="jfGird-statistic-cell"  name="' + x.data.name + '" ></div>').css({
                                    width: (x._width || x.width),
                                    "text-align": (x.data.align || "left"),
                                    left: x.left
                                });
                                if (x.frozen) {
                                    r.css({
                                        left: (x.left + v.running.leftWidth - v.running.frozenleft)
                                    });
                                    q.find("#jfgrid_statistic_" + v.id + ">.jfgrid-statistic-left").append(r)
                                } else {
                                    q.find("#jfgrid_statistic_" + v.id + ">.jfgrid-statistic-right").append(r)
                                }
                            }
                        }
                        if (x.frozen) {
                            x.$cell.css({
                                left: (x.left + v.running.leftWidth - v.running.frozenleft)
                            });
                            n.append(x.$cell)
                        } else {
                            p.append(x.$cell)
                        }
                    });
                    q.find("#jfgrid_right_" + v.id).parent().css({
                        width: v.running.leftWidth + t - 1
                    });
                    q.find("#jfgrid_right_" + v.id).css({
                        width: t - 1
                    });
                    if (v.running.isStatistic) {
                        q.find("#jfgrid_statistic_" + v.id + ">.jfgrid-statistic-right").css({
                            width: t - 1
                        })
                    }
                },
                dataRender: function (q, B, w, t) {
                    t = t || 0;
                    B.running.rowdata = [];
                    B.running.statisticData = {};
                    q.find("#jfgrid_left_" + B.id).find(".jfgrid-data-cell").remove();
                    q.find("#jfgrid_right_" + B.id).find(".jfgrid-data-cell").remove();
                    g();
                    var A = 3;
                    if (B.isTree) {
                        var E = c.listTotree(w, B);
                        if (E.length > 0) {
                            r(E, 1)
                        } else { }
                        function r(F, G) {
                            a.each(F, function (H, I) {
                                c.rowRender(q, B, I, t, G);
                                if (I.childRows.length > 0) {
                                    r(I.childRows, G + 1)
                                }
                            })
                        }
                    } else {
                        a.each(w, function (F, G) {
                            c.rowRender(q, B, G, t);
                            if (B.multiselectfield && G[B.multiselectfield] == 1) {
                                if (A == 0) {
                                    A = 2
                                } else {
                                    if (A == 3) {
                                        A = 1
                                    }
                                }
                            } else {
                                if (B.multiselectfield && G[B.multiselectfield] == 0) {
                                    if (A == 1) {
                                        A = 2
                                    } else {
                                        if (A == 3) {
                                            A = 0
                                        }
                                    }
                                }
                            }
                        });
                        if (B.isPage) {
                            var n = a("#jfgrid_page_bar_" + B.id);
                            var o = n.find("#jfgrid_page_bar_num_" + B.id);
                            var p = n.find("#jfgrid_page_bar_nums_" + B.id);
                            var C = "";
                            var v = "";
                            if (B.rowdatas.length == 0) {
                                C = "无显示数据"
                            } else {
                                var D = B.running.pageparam;
                                var s = (D.page - 1) * D.rows + 1;
                                var x = s + B.rowdatas.length - 1;
                                C = "显示第 " + s + " - " + x + " 条记录  <span>|</span> 检索到 " + D.records + " 条记录";
                                if (D.total > 1) {
                                    var u = D.page - 6;
                                    u = u < 0 ? 0 : u;
                                    var y = u + 10;
                                    if (y > D.total) {
                                        y = D.total
                                    }
                                    if ((y - u) < 10) {
                                        u = y - 10
                                    }
                                    u = u < 0 ? 0 : u;
                                    for (var z = u; z < y; z++) {
                                        v += '<li><a href="javascript:void(0);" class=" pagebtn ' + ((z + 1) == D.page ? "active" : "") + '" >' + (z + 1) + "</a></li>"
                                    }
                                    p.find("span").text("共" + D.total + "页,到");
                                    p.show()
                                } else {
                                    p.hide()
                                }
                            }
                            o.html(v);
                            n.find(".jfgrid-page-bar-info").html(C)
                        }
                    }
                    if (B.isMultiselect) {
                        if (A == 2 || A == 1) {
                            q.find("#jfgrid_all_cb_" + B.id).attr("src", h + d[A])
                        } else {
                            q.find("#jfgrid_all_cb_" + B.id).attr("src", h + d[0])
                        }
                    }
                    if (B.running.rowdata.length > 0) {
                        q.find("#jfgrid_nodata_img_" + B.id).hide()
                    } else {
                        q.find("#jfgrid_nodata_img_" + B.id).show()
                    }
                },
                rowRender: function (q, B, t, y, z) {
                    var A = null;
                    var D = B.running.rowdata;
                    y = y || 0;
                    var o = q.find("#jfgrid_left_" + B.id);
                    var p = q.find("#jfgrid_right_" + B.id);
                    var s = D.length;
                    var x = s * B.rowHeight;
                    var u = 0;
                    var C = {};
                    var n = null;
                    if (B.isTree) {
                        C.jfgridRowData = t.data;
                        C.childRows = t.childRows;
                        C.jfdeep = z;
                        t = t.data;
                        n = a('<div class="jfgrid-data-cell-expend" style="width:' + (z * 16) + 'px;" ></div>');
                        if (C.childRows.length > 0) {
                            n.append('<i class="fa fa-caret-down jfgrid-data-cell-expendi"></i>')
                        }
                        B.rowdatas[s] = t
                    } else {
                        C.jfgridRowData = t
                    }
                    C.jfnum = {
                        top: x,
                        left: u,
                        value: s + 1,
                        text: s + y * (B.isPage ? B.running.pageparam.rows : 1) + 1
                    };
                    if (B.isShowNum) {
                        C.jfnum.$cell = a('<div class="jfgrid-data-cell" rowindex="' + s + '" rownum="' + B.id + "_" + s + '" colname="jfgrid_num"  >' + (s + y * (B.isPage ? B.running.pageparam.rows : 1) + 1) + "</div>");
                        C.jfnum.$cell.css({
                            top: C.jfnum.top,
                            left: C.jfnum.left,
                            "text-align": "center",
                            height: B.rowHeight,
                            "line-height": (B.rowHeight - 1) + "px"
                        });
                        o.append(C.jfnum.$cell);
                        u += 30
                    }
                    if (B.isMultiselect) {
                        var r = B.multiselectfield || "jfcheck";
                        C.jfcheck = {
                            top: x,
                            left: u,
                            value: t[r] || 0,
                            $cell: a('<div class="jfgrid-data-cell" rowindex="' + s + '" rownum="' + B.id + "_" + s + '" colname="jfgrid_check"  ><img src="' + h + d[0] + '" /></div>')
                        };
                        if (C.jfcheck.value + "" == "1") {
                            C.jfcheck.$cell.find("img").attr("src", h + d[1])
                        }
                        C.jfcheck.$cell.css({
                            top: C.jfcheck.top,
                            left: C.jfcheck.left,
                            "text-align": "center",
                            height: B.rowHeight,
                            "line-height": (B.rowHeight - 1) + "px"
                        });
                        o.append(C.jfcheck.$cell);
                        u += 30
                    }
                    if (B.isSubGrid) {
                        C.jfsubGrid = {
                            top: x,
                            left: u,
                            value: false,
                            $cell: a('<div class="jfgrid-data-cell"  rowindex="' + s + '"  rownum="' + B.id + "_" + s + '" colname="jfgrid_subGrid"  ><i class="fa fa-plus" ></i></div>')
                        };
                        C.jfsubGrid.$cell.css({
                            top: C.jfsubGrid.top,
                            left: C.jfsubGrid.left,
                            "text-align": "center",
                            height: B.rowHeight,
                            "line-height": (B.rowHeight - 1) + "px"
                        });
                        o.append(C.jfsubGrid.$cell);
                        u += 30
                    }
                    a.each(B.running.frozenCols, function (E, G) {
                        var H = t[G.data.name];
                        var F = (G.data._width || G.data.width);
                        C[G.data.name] = {
                            top: x,
                            left: u,
                            value: H,
                            $cell: a('<div class="jfgrid-data-cell" rowindex="' + s + '" rownum="' + B.id + "_" + s + '" colname="' + G.data.name + '"  ></div>')
                        };
                        e(H, G.data, t, C[G.data.name], B);
                        C[G.data.name].$cell.css({
                            top: C[G.data.name].top,
                            left: C[G.data.name].left,
                            "text-align": G.data.align,
                            width: F,
                            height: B.rowHeight,
                            "line-height": (B.rowHeight - 1) + "px"
                        });
                        o.append(C[G.data.name].$cell);
                        u += F;
                        if (n != null && E == 0) {
                            C[G.data.name].$cell.prepend(n)
                        }
                        A = C[G.data.name]
                    });
                    u = 0;
                    a.each(B.running.cols, function (E, G) {
                        var H = t[G.data.name];
                        var F = (G._width || G.width);
                        C[G.data.name] = {
                            top: x,
                            left: u,
                            value: H,
                            $cell: a('<div class="jfgrid-data-cell" rowindex="' + s + '" rownum="' + B.id + "_" + s + '" colname="' + G.data.name + '"  ></div>')
                        };
                        e(H, G.data, t, C[G.data.name], B);
                        C[G.data.name].$cell.css({
                            top: C[G.data.name].top,
                            left: C[G.data.name].left,
                            "text-align": G.data.align,
                            width: F,
                            height: B.rowHeight,
                            "line-height": (B.rowHeight - 1) + "px"
                        });
                        p.append(C[G.data.name].$cell);
                        u += F;
                        if (n != null && E == 0 && B.running.frozenCols.length == 0) {
                            C[G.data.name].$cell.prepend(n)
                        }
                        A = C[G.data.name]
                    });
                    D.push(C);
                    p.css({
                        height: x + B.rowHeight - 1
                    });
                    if (B.isAutoHeight) {
                        var w = q.css("padding-top");
                        var v = q.css("padding-bottom");
                        q.css({
                            height: x + B.rowHeight + parseInt(w) + parseInt(v) + 1
                        })
                    }
                    if (B.running.rowSelected && A) {
                        if (B.running.rowSelected.jfgridRowData[B.mainId]) {
                            B.running.rowSelected.jfgridRowData[B.mainId] == C.jfgridRowData[B.mainId] && (A.$cell.trigger("click"))
                        } else {
                            B.running.rowSelected.jfnum.value == C.jfnum.value && (A.$cell.trigger("click"))
                        }
                    }
                },
                updateRow: function (p, o) {
                    var n = {};
                    a.each(o.running.headData, function (r, q) {
                        n[q.data.name] = q.data
                    });
                    a.each(p, function (r, q) {
                        if (r != "jfnum" && r != "jfcheck" && r != "jfsubGrid" && r != "jfgridRowData") {
                            if (q.value != p.jfgridRowData[r]) {
                                q.value = p.jfgridRowData[r] || "";
                                e(q.value, n[r], p.jfgridRowData, q, o)
                            }
                        }
                    })
                },
                reload: function (n, o) {
                    o.rowdatas = [];
                    if (o.isPage) {
                        j.loading(true, "正在获取数据");
                        o.running.pageparam = o.running.pageparam || {
                            rows: 50,
                            page: 1,
                            sidx: "",
                            sord: "",
                            records: 0,
                            total: 0
                        };
                        o.running.pageparam.sidx = o.sidx;
                        o.running.pageparam.sord = o.sord;
                        o.running.pageparam.page = o.running.pageparam.page || 1;
                        o.running.pageparam.records = 0;
                        o.running.pageparam.total = 0;
                        o.param.pagination = JSON.stringify(o.running.pageparam);
                        j.http.httpAsync("GET", o.url, o.param, function (p) {
                            j.loading(false);
                            if (p) {
                                o.rowdatas = p.rows;
                                o.running.pageparam.page = p.page;
                                o.running.pageparam.records = p.records;
                                o.running.pageparam.total = p.total
                            } else {
                                o.rowdatas = [];
                                o.running.pageparam.page = 1;
                                o.running.pageparam.records = 0;
                                o.running.pageparam.total = 0
                            }
                            c.dataRender(n, o, o.rowdatas, (o.running.pageparam.page - 1));
                            o.onRenderComplete && o.onRenderComplete(o.rowdatas)
                        })
                    } else {
                        j.loading(true, "正在获取数据");
                        j.http.httpAsync("GET", o.url, o.param, function (p) {
                            j.loading(false);
                            o.rowdatas = p || [];
                            c.dataRender(n, o, o.rowdatas, 0);
                            o.onRenderComplete && o.onRenderComplete(o.rowdatas)
                        })
                    }
                },
                listTotree: function (o, v) {
                    var x = [];
                    var t = {};
                    var u = {};
                    var w = {};
                    o = o || [];
                    for (var p = 0, s = o.length; p < s; p++) {
                        var r = o[p];
                        u[r[v.mainId]] = 1;
                        t[r[v.parentId]] = t[r[v.parentId]] || [];
                        t[r[v.parentId]].push(r);
                        if (u[r[v.parentId]] == 1) {
                            delete w[r[v.parentId]]
                        } else {
                            w[r[v.parentId]] = 1
                        }
                        if (w[r[v.mainId]] == 1) {
                            delete w[r[v.mainId]]
                        }
                    }
                    for (var q in w) {
                        n(x, q)
                    }
                    function n(y, D) {
                        var C = t[D] || [];
                        for (var A = 0, B = C.length; A < B; A++) {
                            var z = {
                                data: C[A],
                                childRows: []
                            };
                            n(z.childRows, C[A][v.mainId]);
                            y.push(z)
                        }
                    }
                    return x
                },
                expandTree: function (n, t) {
                    var o = 0;
                    var q = false;
                    var w = n.parents(".jfgrid-data-cell").attr("rownum");
                    var u = parseInt(w.replace(t.id + "_", ""));
                    var v = t.running.rowdata[u];
                    if (n.hasClass("fa-caret-down")) {
                        v.lrClosedRows = {};
                        for (var r = u + 1, s = t.running.rowdata.length; r < s; r++) {
                            var p = t.running.rowdata[r];
                            if (p.jfdeep > v.jfdeep && !q) {
                                if (!a('[rownum="' + t.id + "_" + r + '"]').is(":hidden")) {
                                    o += t.rowHeight;
                                    a('[rownum="' + t.id + "_" + r + '"]').hide();
                                    v.lrClosedRows[r] = "1"
                                }
                            } else {
                                q = true;
                                var x = parseInt(a('[rownum="' + t.id + "_" + r + '"]').eq(0).css("top").replace("px", "")) - o;
                                a('[rownum="' + t.id + "_" + r + '"]').css({
                                    top: x
                                })
                            }
                        }
                        n.removeClass("fa-caret-down");
                        n.addClass("fa-caret-right")
                    } else {
                        for (var r = u + 1, s = t.running.rowdata.length; r < s; r++) {
                            var p = t.running.rowdata[r];
                            if (p.jfdeep > v.jfdeep && !q) {
                                if (v.lrClosedRows[r]) {
                                    o += t.rowHeight;
                                    a('[rownum="' + t.id + "_" + r + '"]').show()
                                }
                            } else {
                                q = true;
                                var x = parseInt(a('[rownum="' + t.id + "_" + r + '"]').eq(0).css("top").replace("px", "")) + o;
                                a('[rownum="' + t.id + "_" + r + '"]').css({
                                    top: x
                                })
                            }
                        }
                        n.removeClass("fa-caret-right");
                        n.addClass("fa-caret-down")
                    }
                    a("#jfgrid_left_" + t.id + " .jfgrid-selected,#jfgrid_right_" + t.id + " .jfgrid-selected").removeClass("jfgrid-selected");
                    t.running.rowSelected = null
                },
                sortCol: function (p, n, s) {
                    var t = n.attr("path");
                    var q = s.running.headData[t];
                    if (q.last && !q.data.sort && s.isPage) {
                        var r = true;
                        if (s.running.sorthead) {
                            s.running.sorthead.$cell.find(".jfgrid-heed-sort").hide();
                            if (q == s.running.sorthead) {
                                var o = q.$cell.find(".jfgrid-heed-sort .active");
                                o.removeClass("active");
                                if (o.hasClass("fa-caret-up")) {
                                    q.$cell.find(".jfgrid-heed-sort .fa-caret-down").addClass("active");
                                    r = false
                                } else {
                                    q.$cell.find(".jfgrid-heed-sort .fa-caret-up").addClass("active");
                                    r = true
                                }
                                q.$cell.find(".jfgrid-heed-sort").show()
                            } else {
                                q.$cell.find(".jfgrid-heed-sort .active").removeClass("active");
                                q.$cell.find(".jfgrid-heed-sort .fa-caret-up").addClass("active");
                                q.$cell.find(".jfgrid-heed-sort").show();
                                r = true
                            }
                        } else {
                            q.$cell.find(".jfgrid-heed-sort .active").removeClass("active");
                            q.$cell.find(".jfgrid-heed-sort .fa-caret-up").addClass("active");
                            q.$cell.find(".jfgrid-heed-sort").show();
                            r = true
                        }
                        s.running.sorthead = q;
                        if (s.isPage) {
                            s.sidx = q.data.name;
                            s.sord = r ? "ASC" : "DESC";
                            c.reload(p, s)
                        } else { }
                    }
                    console.log(q)
                },
                clickRow: function (p, o, u) {
                    var n = o;
                    var y = o.attr("rownum");
                    if (!y) {
                        n = o.parents(".jfgrid-data-cell");
                        y = n.attr("rownum")
                    }
                    var w = parseInt(y.replace(u.id + "_", ""));
                    var x = u.running.rowdata[w];
                    var v = x.jfgridRowData;
                    var s = n.attr("colname");
                    var t = false;
                    a.each(u.running.headData, function (I, H) {
                        if (H.data.name == s) {
                            if (H.data.edit && H.data.edit.type != "layer") {
                                t = true;
                                var F = n.css("top");
                                var D = n.css("left");
                                var G = n.css("width");
                                H.$edit.css({
                                    top: F,
                                    left: D,
                                    width: G,
                                    height: u.rowHeight
                                }).show();
                                var z = H.$edit.find("#jfgrid_edit_" + u.id + "_" + H.data.name);
                                z.unbind("change");
                                H.data.edit.init && H.data.edit.init(v, z);
                                switch (H.data.edit.type) {
                                    case "input":
                                        z.unbind("input propertychange");
                                        z.val(v[s] || "");
                                        z.select();
                                        z.on("input propertychange", function (J) {
                                            var K = a(this).val();
                                            v[s] = K;
                                            H.data.edit.change && H.data.edit.change(v, w);
                                            e(K, H.data, v, x[H.data.name], u)
                                        });
                                        break;
                                    case "select":
                                        z.lrselectSet(v[s] || "");
                                        z.on("change", function () {
                                            var J = a(this);
                                            var L = J.lrselectGet();
                                            var K = J.lrselectGetEx();
                                            v[s] = L;
                                            H.data.edit.change && H.data.edit.change(v, w, K);
                                            e(L, H.data, v, x[H.data.name], u)
                                        });
                                        break;
                                    case "radio":
                                        z.find("input").unbind("click");
                                        z.find('input[value="' + (v[s] || "") + '"]').trigger("click");
                                        z.find("input").on("click", function () {
                                            var J = a(this).val();
                                            if (v[s] != J) {
                                                v[s] = J;
                                                H.data.edit.change && H.data.edit.change(v, w);
                                                e(J, H.data, v, x[H.data.name], u)
                                            }
                                        });
                                        if ((v[s] == "" || v[s] == null || v[s] == undefined) && H.data.edit.dfvalue) {
                                            z.find('input[value="' + H.data.edit.dfvalue + '"]').trigger("click")
                                        }
                                        break;
                                    case "checkbox":
                                        z.find("input").unbind("click");
                                        var E = v[s] || "";
                                        var A = {};
                                        var B = v[s] || H.data.edit.dfvalue || "";
                                        v[s] = B;
                                        var C = B.split(",");
                                        a.each(C, function (J, K) {
                                            A[K] = "1"
                                        });
                                        z.find("input").each(function () {
                                            var J = a(this);
                                            var K = J.val();
                                            if (J.is(":checked") && !A[K]) {
                                                J.trigger("click")
                                            } else {
                                                if (!J.is(":checked") && A[K]) {
                                                    J.trigger("click")
                                                }
                                            }
                                            J = null
                                        });
                                        if (E != v[s]) {
                                            H.data.edit.change && H.data.edit.change(v, w);
                                            e(v[s], H.data, v, x[H.data.name], u)
                                        }
                                        z.find("input").on("click", function () {
                                            var J = a(this);
                                            var N = J.val();
                                            var K = v[s].split(",");
                                            var L = {};
                                            var M = [];
                                            a.each(K, function (O, P) {
                                                if (P !== "" && P !== undefined && P !== null) {
                                                    L[P] = O;
                                                    M.push(P)
                                                }
                                            });
                                            if (J.is(":checked")) {
                                                if (L[N] == undefined) {
                                                    M.push(N)
                                                }
                                            } else {
                                                if (L[N] != undefined) {
                                                    M.splice(L[N], 1)
                                                }
                                            }
                                            v[s] = String(M);
                                            H.data.edit.change && H.data.edit.change(v, w);
                                            e(v[s], H.data, v, x[H.data.name], u)
                                        });
                                        break;
                                    case "datatime":
                                        z.unbind("change");
                                        z.val(v[s] || "");
                                        z.select();
                                        z.on("change", function (J) {
                                            var K = a(this).val();
                                            v[s] = K;
                                            H.data.edit.change && H.data.edit.change(v, w);
                                            e(K, H.data, v, x[H.data.name], u)
                                        });
                                        break;
                                    case "layer":
                                        break
                                }
                            }
                            return false
                        }
                    });
                    if (!t) {
                        if (u.isMultiselect) {
                            var q = x.jfcheck.value;
                            if ((q + "") == "1") {
                                x.jfcheck.$cell.find("img").attr("src", h + d[0]);
                                x.jfcheck.value = 0;
                                u.multiselectfield && (v[u.multiselectfield] = 0);
                                u.onSelectRow && u.onSelectRow(v, false);
                                if (!u.running.checkAlling) {
                                    var r = false;
                                    a.each(u.running.rowdata, function (z, A) {
                                        if (A.jfcheck.value + "" == "1") {
                                            r = true;
                                            return false
                                        }
                                    });
                                    if (r) {
                                        p.find("#jfgrid_all_cb_" + u.id).attr("src", h + d[2])
                                    } else {
                                        p.find("#jfgrid_all_cb_" + u.id).attr("src", h + d[0])
                                    }
                                }
                            } else {
                                x.jfcheck.$cell.find("img").attr("src", h + d[1]);
                                x.jfcheck.value = 1;
                                u.multiselectfield && (v[u.multiselectfield] = 1);
                                u.onSelectRow && u.onSelectRow(v, true);
                                if (!u.running.checkAlling) {
                                    var r = false;
                                    a.each(u.running.rowdata, function (z, A) {
                                        if (A.jfcheck.value + "" == "0") {
                                            r = true;
                                            return false
                                        }
                                    });
                                    if (r) {
                                        p.find("#jfgrid_all_cb_" + u.id).attr("src", h + d[2])
                                    } else {
                                        p.find("#jfgrid_all_cb_" + u.id).attr("src", h + d[1])
                                    }
                                }
                            }
                        } else {
                            p.find("#jfgrid_left_" + u.id + " .jfgrid-selected,#jfgrid_right_" + u.id + " .jfgrid-selected").removeClass("jfgrid-selected");
                            p.find('[rownum="' + y + '"]').addClass("jfgrid-selected");
                            u.onSelectRow && u.onSelectRow(v);
                            u.running.rowSelected = x
                        }
                    } else {
                        p.find("#jfgrid_left_" + u.id + " .jfgrid-selected,#jfgrid_right_" + u.id + " .jfgrid-selected").removeClass("jfgrid-selected");
                        u.running.rowSelected = null
                    }
                },
                checkAllRows: function (o, n, r) {
                    var p = n.attr("src").replace(h, "");
                    var q = false;
                    if (p == d[1]) {
                        q = true;
                        n.attr("src", h + d[0])
                    } else {
                        n.attr("src", h + d[1])
                    }
                    r.running.checkAlling = true;
                    a.each(r.running.rowdata, function (s, t) {
                        if (t.jfcheck.value + "" == "0" && !q) {
                            t.jfcheck.$cell.trigger("click")
                        } else {
                            if (t.jfcheck.value + "" == "1" && q) {
                                t.jfcheck.$cell.trigger("click")
                            }
                        }
                    });
                    r.running.checkAlling = false
                },
                expandSub: function (s, p, y) {
                    var o = p;
                    var C = p.attr("rownum");
                    if (!C) {
                        o = p.parents(".jfgrid-data-cell");
                        C = o.attr("rownum")
                    }
                    var A = parseInt(C.replace(y.id + "_", ""));
                    var B = y.running.rowdata[A];
                    var z = B.jfgridRowData;
                    var n = s.find("#jfgrid_body_" + y.id);
                    var q = s.find("#jfgrid_left_" + y.id);
                    var r = s.find("#jfgrid_right_" + y.id);
                    var E = y.id + "_sub_" + A;
                    var u = q.height();
                    if (B.jfsubGrid.value) {
                        B.jfsubGrid.value = false;
                        var t = a("#" + E);
                        t.remove();
                        B.jfsubGrid.$cell.html('<i class="fa fa-plus" ></i>');
                        for (var v = A + 1, x = y.running.rowdata.length; v < x; v++) {
                            var w = y.running.rowdata[v];
                            a.each(w, function (G, H) {
                                if (H.top != undefined) {
                                    H.top = H.top - y.subGridHeight;
                                    H.$cell.css({
                                        top: H.top
                                    })
                                }
                            })
                        }
                        q.css({
                            height: u - y.subGridHeight
                        });
                        r.css({
                            height: u - y.subGridHeight
                        })
                    } else {
                        B.jfsubGrid.value = true;
                        var F = n.width();
                        B.jfsubGrid.$cell.html('<i class="fa fa-minus" ></i>');
                        var D = j.newGuid();
                        var t = a('<div class="jfgrid-sub" id="' + E + '" ><div id="' + D + '" ></div></div>').css({
                            left: 0,
                            top: B.jfsubGrid.top + y.rowHeight,
                            height: y.subGridHeight,
                            width: F
                        });
                        for (var v = A + 1, x = y.running.rowdata.length; v < x; v++) {
                            var w = y.running.rowdata[v];
                            a.each(w, function (G, H) {
                                if (H.top != undefined) {
                                    H.top += y.subGridHeight;
                                    H.$cell.css({
                                        top: H.top
                                    })
                                }
                            })
                        }
                        q.append(t);
                        q.css({
                            height: u + y.subGridHeight
                        });
                        r.css({
                            height: u + y.subGridHeight
                        });
                        y.subGridExpanded && y.subGridExpanded(D, B.jfgridRowData)
                    }
                },
                getCheckRow: function (n, o) {
                    var p = [];
                    a.each(o.running.rowdata, function (q, r) {
                        if (r.jfcheck.value == 1) {
                            p.push(r.jfgridRowData)
                        }
                    });
                    return p
                },
                moveUp: function (n, s, r) {
                    if (r > 0) {
                        var p = true;
                        var o = s.rowdatas[r];
                        if (s.isTree) {
                            p = false;
                            if (s.running.rowdata[r].jfdeep <= s.running.rowdata[r - 1].jfdeep) {
                                for (var q = r - 1; q >= 0; q--) {
                                    if (s.running.rowdata[r].jfdeep == s.running.rowdata[q].jfdeep) {
                                        p = true;
                                        s.rowdatas[r] = s.rowdatas[q];
                                        s.rowdatas[q] = o;
                                        break
                                    }
                                }
                            }
                        } else {
                            s.rowdatas[r] = s.rowdatas[r - 1];
                            s.rowdatas[r - 1] = o
                        }
                        c.dataRender(n, s, s.rowdatas);
                        return true
                    }
                    return false
                },
                moveDown: function (n, t, r) {
                    if (r < t.rowdatas.length - 1) {
                        var p = true;
                        var o = t.rowdatas[r];
                        if (t.isTree) {
                            p = false;
                            for (var q = r + 1, s = t.rowdatas.length; q < s; q++) {
                                if (t.running.rowdata[r].jfdeep > t.running.rowdata[q].jfdeep) {
                                    break
                                }
                                if (t.running.rowdata[r].jfdeep == t.running.rowdata[q].jfdeep) {
                                    p = true;
                                    t.rowdatas[r] = t.rowdatas[q];
                                    t.rowdatas[q] = o;
                                    break
                                }
                            }
                        } else {
                            t.rowdatas[r] = t.rowdatas[r + 1];
                            t.rowdatas[r + 1] = o
                        }
                        c.dataRender(n, t, t.rowdatas);
                        return true
                    }
                    return false
                },
                turnPage: function (q) {
                    var p = a(this);
                    var o = a("#" + p.attr("id").replace("jfgrid_page_bar_num_", ""));
                    var s = o[0].dfop;
                    var r = q.target || q.srcElement;
                    var n = a(r);
                    if (n.hasClass("pagebtn")) {
                        var t = parseInt(n.text());
                        if (t != s.running.pageparam.page) {
                            p.find(".active").removeClass("active");
                            n.addClass("active");
                            s.running.pageparam.page = t;
                            c.reload(o, s)
                        }
                    }
                },
                turnPage2: function (q) {
                    var o = a(this);
                    var t = q.data.op;
                    var s = o.text();
                    var n = a("#jfgrid_page_bar_num_" + t.id);
                    var v = parseInt(n.find(".active").text());
                    var r = false;
                    switch (s) {
                        case "首页":
                            if (v != 1) {
                                t.running.pageparam.page = 1;
                                r = true
                            }
                            break;
                        case "上一页":
                            if (v > 1) {
                                t.running.pageparam.page = v - 1;
                                r = true
                            }
                            break;
                        case "下一页":
                            if (v < t.running.pageparam.total) {
                                t.running.pageparam.page = v + 1;
                                r = true
                            }
                            break;
                        case "尾页":
                            if (v != t.running.pageparam.total) {
                                t.running.pageparam.page = t.running.pageparam.total;
                                r = true
                            }
                            break;
                        case "跳转":
                            var w = o.parents("#jfgrid_page_bar_nums_" + t.id).find("input").val();
                            if (!!w) {
                                var u = parseInt(w);
                                if (String(u) != "NaN") {
                                    if (u < 1) {
                                        u = 1
                                    }
                                    if (u > t.running.pageparam.total) {
                                        u = t.running.pageparam.total
                                    }
                                    t.running.pageparam.page = u;
                                    r = true
                                }
                            }
                            break
                    }
                    if (r) {
                        c.reload(a("#" + t.id), t)
                    }
                },
                print: function (n) {
                    var q = n[0].dfop;
                    var o = a('<table border="1" style=""></table>');
                    var r = [];

                    function p(s, t) {
                        var u = s.length;
                        a.each(s, function (x, y) {
                            r[t] = r[t] || a("<tr></tr>");
                            var v = a("<th>" + y.label + "</th>");
                            if (!!y.children && y.children.length > 0) {
                                var z = p(y.children, t + 1);
                                u = u + z - 1;
                                v.attr("colspan", z)
                            }
                            var w = y.height / 28;
                            v.attr("rowspan", w);
                            v.css("text-align", y.align);
                            r[t].append(v)
                        });
                        return u
                    }
                    p(q.headData, 0);
                    a.each(r, function (s, t) {
                        o.append(t)
                    });
                    a.each(q.rowdatas, function (t, u) {
                        var s = a("<tr></tr>");
                        n.find('[rownum="' + q.id + "_" + t + '"]').each(function () {
                            var v = a(this);
                            var x = v.attr("colname");
                            if (!!x && x != "jfgrid_num" && x != "jfgrid_multiselect" && x != "jfgrid_subGrid") {
                                var w = a("<td>" + v.html() + "</td>");
                                w.css("text-align", v.css("text-align"));
                                s.append(w)
                            }
                        });
                        o.append(s)
                    });
                    q = null;
                    return o
                }
            };
            a.fn.jfGrid = function (s) {
                var n = a(this);
                if (!n[0] || n[0].dfop) {
                    return n
                }
                var q = n.attr("id");
                if (q == null || q == undefined || q == "") {
                    q = "jfgrid" + new Date().getTime();
                    n.attr("id", q)
                }
                var o = {
                    url: "",
                    param: {},
                    rowdatas: [],
                    headData: [],
                    isShowNum: true,
                    isMultiselect: false,
                    multiselectfield: "",
                    isSubGrid: false,
                    subGridExpanded: false,
                    subGridHeight: 300,
                    onSelectRow: false,
                    dblclick: false,
                    onRenderComplete: false,
                    onAddRow: false,
                    onMinusRow: false,
                    beforeMinusRow: false,
                    isPage: false,
                    rows: 100,
                    sidx: "",
                    sord: "ASC",
                    isTree: false,
                    mainId: "id",
                    parentId: "parentId",
                    isEdit: false,
                    isAutoHeight: false,
                    height: 0,
                    rowHeight: 28
                };
                if (!!s) {
                    a.extend(o, s)
                }
                o.id = q;
                n[0].dfop = o;
                o.running = {};
                if (o.isMultiselect) {
                    for (var p = 0; p < 3; p++) {
                        var r = new Image();
                        r.src = h + d[p]
                    }
                }
                c.init(n, o);
                o = null;
                return n
            };
            a.fn.jfGridSet = function (r, p) {
                var n = a(this);
                var q = n[0].dfop;
                // console.log(n,q)
                if (!q) {
                    return null
                }
                switch (r) {
                    case "reload":
                        p = p || q.param || {};
                        q.param = p.param || p;
                        c.reload(n, q);
                        break;
                    case "refresh":
                        break;
                    case "refreshdata":
                        if (p) {
                            q.rowdatas = p.rowdatas || p
                        }
                        c.dataRender(n, q, q.rowdatas);
                        break;
                    case "addRow":
                        q.rowdatas.push(p || {});
                        c.rowRender(n, q, p || {}, 0);
                        n.find("#jfgrid_nodata_img_" + q.id).hide();
                        break;
                    case "removeRow":
                        a.each(q.rowdatas, function (s, t) {
                            if (t[q.mainId] == p) {
                                q.rowdatas.splice(s, 1);
                                return false
                            }
                        });
                        var o = n;
                        setTimeout(function () {
                            c.dataRender(o, o[0].dfop, o[0].dfop.rowdatas, 0);
                            o = null
                        }, 100);
                        break;
                    case "nocheck":
                        if (q.isMultiselect) {
                            a.each(q.running.rowdata, function (s, t) {
                                if (t.jfgridRowData[q.mainId] == p) {
                                    if (t.jfcheck.value == 1) {
                                        t.jfcheck.$cell.trigger("click")
                                    }
                                    return false
                                }
                            })
                        }
                        break;
                    case "updateRow":
                        if (q.running.rowSelected) {
                            c.updateRow(q.running.rowSelected, q)
                        } else {
                            if (q.running.rowdata[p]) {
                                c.updateRow(q.running.rowdata[p], q)
                            }
                        }
                        break;
                    case "moveUp":
                        return c.moveUp(n, q, p);
                        break;
                    case "moveDown":
                        return c.moveDown(n, q, p);
                        break
                }
                q = null;
                n = null
            };
            a.fn.jfGridGet = function (o) {
                var n = a(this);
                var p = n[0].dfop;
                if (!p) {
                    return null
                }
                switch (o) {
                    case "rowdata":
                        if (p.isMultiselect) {
                            return c.getCheckRow(n, p)
                        } else {
                            if (p.running.rowSelected) {
                                return p.running.rowSelected.jfgridRowData
                            } else {
                                return {}
                            }
                        }
                        break;
                    case "rowdatas":
                        return p.rowdatas;
                        break;
                    case "rowdatasByArray":
                        break;
                    case "settingInfo":
                        return p;
                        break;
                    case "headData":
                        break;
                    case "showData":
                        var q = [];
                        a.each(p.running.rowdata, function (r, s) {
                            var t = {};
                            a.each(s, function (u, v) {
                                if (u != "jfgridRowData" && u != "jfnum" && u != "jfcheck" && u != "jfsubGrid") {
                                    t[u] = v.text
                                }
                            });
                            q.push(t)
                        });
                        return q;
                        break
                }
                p = null
            };
            a.fn.jfGridValue = function (p) {
                var n = a(this);
                var q = n[0].dfop;
                if (!q) {
                    return null
                }
                if (q.isMultiselect) {
                    var r = [];
                    var o = c.getCheckRow(n, q);
                    a.each(o, function (s, t) {
                        r.push(t[p])
                    });
                    return String(r)
                } else {
                    if (q.running.rowSelected) {
                        return q.running.rowSelected.jfgridRowData[p]
                    } else {
                        return ""
                    }
                }
            };
            a.fn.jfGridPrint = function () {
                var n = a(this);
                return c.print(n)
            }
        })($, js);
        (function(a, b) {
            a.fn.lrAuthorizeJfGrid = function(d) {
                var c = [];
                a.each(d.headData, function(e, f) {
                    // console.log(lrModuleColumnList[f.name.toLowerCase()])
                    if ( !! lrModuleColumnList[f.name.toLowerCase()]) {
                        c.push(f)
                    }
                });
                d.headData = c;
                a(this).jfGrid(d)
            };
            a(function() {
                function c() {
                    if ( !! lrModuleButtonList) {
                        var d = a('[learun-authorize="yes"]');
                        d.find("[id]").each(function() {
                            var e = a(this);
                            var f = e.attr("id");
                            if (!lrModuleButtonList[f]) {
                                e.remove()
                            }
                        });
                        d.find(".dropdown-menu").each(function() {
                            var e = a(this);
                            if (e.find("li").length == 0) {
                                e.remove()
                            }
                        });
                        d.css({
                            display: "inline-block"
                        })
                    } else {
                        setTimeout(c, 100)
                    }
                }
                c()
            })
        })($, js);
        (function(a, b) {
            a(function() {
                function c() {
                    if ( !! lrModule) {
                        b.http.httpAsync("GET",'GetPageList.json', {
                            moduleId: lrModule.F_ModuleId
                        }, function(f) {
                            if ( !! f && f.length > 0) {
                                var e = a(".lr-layout-tool-right");
                                var d = a('<div class=" btn-group btn-group-sm"></div>');
                                var g = false;
                                a.each(f, function(i, j) {
                                    if ( !! lrModuleButtonList[j.F_ModuleBtnId]) {
                                        g = true;
                                        var h = a('<a id="' + j.F_ModuleBtnId + '" data-value="' + j.F_Id + '"  class="btn btn-default"><i class="fa fa-sign-in"></i>&nbsp;' + j.F_BtnName + "</a>");
                                        h.on("click", function() {
                                            var k = a(this).attr("data-value");
                                            var l = a(this).text();
                                            b.layerForm({
                                                id: "ImportForm",
                                                title: l,
                                                url: top.$.rootUrl + "/LR_SystemModule/ExcelImport/ImportForm?id=" + k,
                                                width: 600,
                                                height: 400,
                                                maxmin: true,
                                                btn: null
                                            })
                                        });
                                        d.append(h)
                                    }
                                });
                                e.append(d)
                            }
                        });
                        b.http.httpAsync("GET", "GetPageList.json", {
                            moduleId: lrModule.F_ModuleId
                        }, function(f) {
                            if ( !! f && f.length > 0) {
                                var e = a(".lr-layout-tool-right");
                                var d = a('<div class=" btn-group btn-group-sm"></div>');
                                var g = false;
                                a.each(f, function(i, j) {
                                    if ( !! lrModuleButtonList[j.F_ModuleBtnId]) {
                                        g = true;
                                        var h = a('<a id="' + j.F_ModuleBtnId + '" class="btn btn-default"><i class="fa fa-sign-out"></i>&nbsp;' + j.F_BtnName + "</a>");
                                        h[0].dfop = j;
                                        h.on("click", function() {
                                            j = h[0].dfop;
                                            b.layerForm({
                                                id: "ExcelExportForm",
                                                title: "导出Excel数据",
                                                url: top.$.rootUrl + "/Utility/ExcelExportForm?gridId=" + j.F_GridId + "&filename=" + encodeURI(encodeURI(j.F_Name)),
                                                width: 500,
                                                height: 380,
                                                callBack: function(k) {
                                                    return top[k].acceptClick()
                                                },
                                                btn: ["导出Excel", "关闭"]
                                            })
                                        });
                                        d.append(h)
                                    }
                                });
                                e.append(d)
                            }
                        })
                    } else {
                        setTimeout(c, 100)
                    }
                }
                c()
            })
        })($, js);
        // //lrformselect & lrGirdSelect
        // (function (a, b) {
        //     a.lrformselect = {
        //         init: function (d) {
        //             var e = d[0]._lrformselect.dfop;
        //             d.addClass("lr-formselect");
        //             d.attr("type", "formselect");
        //             var c = a("<span>" + e.placeholder + '</span><i class="fa ' + e.icon + '"></i><div class="clear-btn" >清空</div>');
        //             d.on("click", a.lrformselect.click);
        //             d.html(c)
        //         },
        //         click: function (h) {
        //             var d = a(this);
        //             var g = d[0]._lrformselect.dfop;
        //             var i = h.target || h.srcElement;
        //             var c = a(i);
        //             if (c.hasClass("clear-btn")) {
        //                 g._itemValue = {
        //                     value: "",
        //                     text: g.placeholder
        //                 };
        //                 d.removeClass("selected");
        //                 d.find("span").text(g._itemValue.text);
        //                 if (!!g.select) {
        //                     g.select(g._itemValue)
        //                 }
        //             } else {
        //                 var j = g._itemValue ? g._itemValue.value : "";
        //                 var f = g.layerUrl;
        //                 if (f.indexOf("?") != -1) {
        //                     f += "&dfopid=" + g.id
        //                 } else {
        //                     f += "?dfopid=" + g.id
        //                 }
        //                 f += "&selectValue=" + j;
        //                 f += "&selectText=" + encodeURI(encodeURI(d.find("span").text()));
        //                 b.layerForm({
        //                     id: g.id,
        //                     title: g.placeholder,
        //                     url: f,
        //                     width: g.layerUrlW,
        //                     height: g.layerUrlH,
        //                     maxmin: true,
        //                     callBack: function (e) {
        //                         return top[e].acceptClick(a.lrformselect.callback)
        //                     }
        //                 })
        //             }
        //         },
        //         callback: function (f, e, g) {
        //             var c = a("#" + e);
        //             var d = c[0]._lrformselect.dfop;
        //             top["lr_selectform_" + e] = {
        //                 _obj: g
        //             };
        //             d._itemValue = d._itemValue || {};
        //             if (d._itemValue.value != f.value) {
        //                 if (!!d.select) {
        //                     d.select(f)
        //                 }
        //                 c.trigger("change")
        //             }
        //             if (f.value == "") {
        //                 f.text = d.placeholder
        //             } else {
        //                 c.addClass("selected")
        //             }
        //             c.find("span").text(f.text);
        //             d._itemValue = f
        //         }
        //     };
        //     a.fn.lrformselect = function (e) {
        //         var d = {
        //             placeholder: "请选择",
        //             icon: "fa-plus",
        //             layerUrl: false,
        //             layerParam: false,
        //             layerUrlW: 600,
        //             layerUrlH: 400,
        //             dataUrl: null,
        //             select: false,
        //         };
        //         a.extend(d, e || {});
        //         var c = a(this);
        //         d.id = c.attr("id");
        //         if (!d.id) {
        //             return false
        //         }
        //         if (!!c[0]._lrformselect) {
        //             return c
        //         }
        //         c[0]._lrformselect = {
        //             dfop: d
        //         };
        //         a.lrformselect.init(c);
        //         return c
        //     };
        //     a.fn.lrformselectRefresh = function (e) {
        //         var c = a(this);
        //         var d = c[0]._lrformselect.dfop;
        //         a.extend(d, e || {});
        //         d._itemValue = null;
        //         c.find("span").text(d.placeholder)
        //     };
        //     a.fn.lrformselectGet = function () {
        //         var c = a(this);
        //         var d = c[0]._lrformselect.dfop;
        //         return d._itemValue ? d._itemValue.value : ""
        //     };
        //     a.fn.lrformselectSet = function (e) {
        //         var c = a(this);
        //         var d = c[0]._lrformselect.dfop;
        //         if (e == "") {
        //             d._itemValue = {
        //                 value: "",
        //                 text: ""
        //             };
        //             c.removeClass("selected");
        //             c.find("span").text(d.placeholder);
        //             return false
        //         }
        //         d._itemValue = {
        //             value: e
        //         };
        //         b.httpAsync("GET", d.dataUrl, {
        //             keyValue: e
        //         }, function (f) {
        //             if (!!f && f != "") {
        //                 d._itemValue.text = f;
        //                 c.addClass("selected");
        //                 c.find("span").text(f)
        //             }
        //         })
        //     };
        //
        //     a.lrGirdSelect = {
        //         init: function (d) {
        //             var e = d[0]._lrGirdSelect.dfop;
        //             d.addClass("lr-formselect");
        //             d.attr("type", "lrGirdSelect");
        //             var c = a("<span>" + e.placeholder + '</span><i class="fa ' + e.icon + '"></i><div class="clear-btn" >清空</div>');
        //             d.on("click", a.lrGirdSelect.click);
        //             d.html(c);
        //             b.httpAsync("GET", e.url, e.param, function (f) {
        //                 e._loaded = true;
        //                 e._data = f || []
        //             });
        //             top.lrGirdSelect = top.lrGirdSelect || {};
        //             top.lrGirdSelect[e.id] = e
        //         },
        //         click: function (g) {
        //             var d = a(this);
        //             var f = d[0]._lrGirdSelect.dfop;
        //             var h = g.target || g.srcElement;
        //             var c = a(h);
        //             if (c.hasClass("clear-btn")) {
        //                 f._itemValue = {
        //                     value: "",
        //                     text: f.placeholder
        //                 };
        //                 d.removeClass("selected");
        //                 d.find("span").text(f._itemValue.text);
        //                 if (!!f.select) {
        //                     f.select(f._itemValue)
        //                 }
        //             } else {
        //                 var i = f._itemValue ? f._itemValue.value : "";
        //                 b.layerForm({
        //                     id: f.id,
        //                     title: f.placeholder,
        //                     url: top.$.rootUrl + "/Utility/GirdSelectIndex?dfopid=" + f.id,
        //                     width: f.width,
        //                     height: f.height,
        //                     maxmin: true,
        //                     callBack: function (e) {
        //                         return top[e].acceptClick(a.lrGirdSelect.callback)
        //                     }
        //                 })
        //             }
        //         },
        //         callback: function (f, e) {
        //             var c = a("#" + e);
        //             var d = c[0]._lrGirdSelect.dfop;
        //             d._itemValue = d._itemValue || {};
        //             if (d._itemValue[d.value] != f[d.value]) {
        //                 if (!!d.select) {
        //                     d.select(f)
        //                 }
        //                 c.trigger("change")
        //             }
        //             if (!f) {
        //                 f.text = d.placeholder
        //             } else {
        //                 c.addClass("selected")
        //             }
        //             c.find("span").text(f[d.text]);
        //             d._itemValue = f
        //         }
        //     };
        //     a.fn.lrGirdSelect = function (e) {
        //         var d = {
        //             placeholder: "请选择",
        //             icon: "fa-plus",
        //             url: "",
        //             selectWord: "",
        //             headData: [],
        //             value: "",
        //             text: "",
        //             width: 600,
        //             height: 400,
        //             select: false,
        //             param: {},
        //             _loaded: false
        //         };
        //         a.extend(d, e || {});
        //         var c = a(this);
        //         d.id = c.attr("id");
        //         if (!d.id) {
        //             return false
        //         }
        //         if (!!c[0]._lrGirdSelect) {
        //             return c
        //         }
        //         c[0]._lrGirdSelect = {
        //             dfop: d
        //         };
        //         a.lrGirdSelect.init(c);
        //         return c
        //     };
        //     a.fn.lrGirdSelectGet = function () {
        //         var c = a(this);
        //         var d = c[0]._lrGirdSelect.dfop;
        //         d._itemValue = d._itemValue || {};
        //         var e = d._itemValue[d.value] || "";
        //         return e
        //     };
        //     a.fn.lrGirdSelectSet = function (f) {
        //         var c = a(this);
        //         var d = c[0]._lrGirdSelect.dfop;
        //
        //         function e(g) {
        //             if (d._loaded) {
        //                 a.each(d._data, function (h, i) {
        //                     if (i[d.value] == g) {
        //                         if (!!d.select) {
        //                             d.select(i)
        //                         }
        //                         c.trigger("change");
        //                         c.addClass("selected");
        //                         c.find("span").text(i[d.text]);
        //                         d._itemValue = i;
        //                         return false
        //                     }
        //                 })
        //             } else {
        //                 setTimeout(function () {
        //                     e(g)
        //                 }, 100)
        //             }
        //         }
        //         e(f)
        //     }
        // })($, js);
    }
    var refreshGirdData;
    var grid = {
        $:$,
        render: function(elem, p) {
            grid.initGrid(elem, p);
            grid.bind(elem)
        },
        bind: function(elem) {
        },
        initGrid: function (elem, p) {
            var d = {
                url: "",
                rows: 100,
                headData: [],
                mainId: "F_RuleId",
                reloadSelected: true,
                isPage: true
            };
            $.extend(d, p);
            var e = $(elem);
            js.http.httpAsync('GET', 'GetAuthorizeButtonColumnList.json','',function (data) {
                lrModuleButtonList = data.btns;
                lrModuleColumnList = data.cols;
                lrModule = data.module;
                e.lrAuthorizeJfGrid(d);
                grid.search({},elem)
            });

        },
        search: function(d,elem) {
            d = d || {};
            // $("#gridtable").jfGridSet("reload", d)
            var e = $(elem);
            e.jfGridSet("reload", d);
        }

    };
    refreshGirdData = function() {
        grid.search()
    };
    exports('jfGrid', grid);

});