layui.define('jquery', function (exports) {
    var $ = jQuery = layui.$;
    layui.link(layui.cache.base + 'lp/jsTab/jsTab.css');
    var tab = {
        $:$,
        render: function () {
            $(".lrlg").on("click", function() {
                var h = $(this);
                var g = h.parent();
                g.find(".active").removeClass("active");
                h.addClass("active");
                return $(this).attr("data-value")
            })
        },
        GetTab: function (elem) {
            console.log(151)
        }
    };
    exports('jsTab', tab);
});