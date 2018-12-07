layui.define(['jsHelper'], function (exports) {
    var js = layui.jsHelper;
    var $ = js.$;
    

    if (typeof ($.lrlayout) == undefined || $.lrlayout == null) {
        layui.link(layui.cache.base + 'lp/jsLayout/jsLayout.css');
        (function (a) {
            a.fn.lrLayout = function (h) {
                var e = {
                    blocks: [{
                        target: ".lr-layout-left",
                        type: "right",
                        size: 203
                    }]
                };
                a.extend(e, h || {});
                var c = a(this);
                
                if (c.length <= 0) {
                    return false
                }
                c.hasClass("lr-layout lr-layout-left-center") || c.addClass("lr-layout lr-layout-left-center");

                if (c.children(".lr-layout-left").length <= 0) {
                    c.html('<div class="lr-layout-left"><div class="lr-layout-wrap"></div></div><div class="lr-layout-center"><div class="lr-layout-wrap"></div></div>');
                }

                c[0]._lrLayout = {
                    dfop: e
                };
                e.id = "lrlayout" + new Date().getTime();
                for (var f = 0, g = e.blocks.length; f < g; f++) {
                    var d = e.blocks[f];
                    c.children(d.target).append('<div class="lr-layout-move lr-layout-move-' + d.type + ' " path="' + f + '"  ></div>')
                }
                c.on("mousedown", function (m) {
                    var n = m.target || m.srcElement;
                    var i = a(n);
                    var j = a(this);
                    var l = j[0]._lrLayout.dfop;
                    if (i.hasClass("lr-layout-move")) {
                        var k = i.attr("path");
                        l._currentBlock = l.blocks[k];
                        l._ismove = true;
                        l._pageX = m.pageX
                    }
                });
                c.mousemove(function (l) {
                    var j = a(this);
                    var k = j[0]._lrLayout.dfop;
                    if (!!k._ismove) {
                        var i = j.children(k._currentBlock.target);
                        i.css("width", k._currentBlock.size + (l.pageX - k._pageX));
                        j.css("padding-left", k._currentBlock.size + (l.pageX - k._pageX))
                    }
                });
                c.on("click", function (k) {
                    var i = a(this);
                    var j = i[0]._lrLayout.dfop;
                    if (!!j._ismove) {
                        j._currentBlock.size += (k.pageX - j._pageX);
                        j._ismove = false
                    }
                })
            }
        })($);
    }
    var layout = {
        render: function (elem,p) {
            var d = {
            };
            $.extend(d, p || {});
            var e = $(elem);
            e.lrLayout(d);
        }
    }

    exports('jsLayout', layout);
    

});