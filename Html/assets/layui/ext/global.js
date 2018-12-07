layui.config({
    base: '../assets/layui/ext/' //你存放新模块的目录，注意，不是layui的模块目录
}).extend({ //设定模块别名

    jsUtility: "lr/jsUtility/jsUtility",//相对于上述 base 目录的子目录
    lrtree: 'lr/lrtree/lrtree',
    lrscroll: 'lr/lrscroll/lrscroll',
    lrselect: 'lr/lrselect/lrselect',
    lrselect: 'lr/jfgrid/jfgrid',

    jsHelper: "lp/jsHelper/jsHelper",
    jsLayout: "lp/jsLayout/jsLayout",
    jsTree: "lp/jsTree/jsTree",
    jsSelect: "lp/jsSelect/jsSelect",
    jsTab: "lp/jsTab/jsTab",
    jfGrid: "lp/jfGrid/jfGrid"
    });
