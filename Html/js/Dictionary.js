var CategoryId = '';
var code = '';
layui.use(['table'], function () {
    tableObj.tableInit();// 初始化表格
    tableObj.changeColor();//
    AjaxSubmit('GET', '', basePath + '/api/Company/GetCompanyList', GenerateTable_fun);//ajax请求树菜单
    $("#upload").click(function () {
        console.log(code);
        if (code == '' || code == undefined || code == null) {
            layer.msg("请先选择项目")
        } else {
            layer.open({
                type: 2
                , offset: 'auto' //具体配置参考：offset参数项
                , closeBtn: 0
                , shadeClose: 1
                , anim: 5
                , area: ['1000px', '750px']
                , content: '../html/AddComponent.html?code=' + code+'&CategoryId='+CategoryId//iframe的ur
                , shade: 0.3 //不显示遮罩
            });
        }
    });
});
//树菜单请求完成回调函数
function GenerateTable_fun(res) {
    var data = res.DataPacket.list;
    console.log(data);
    treeObj.treeInit(data);
    treeObj.treeFunc();
    //    搜索功能
    $("#btn_Search").click(function () {
        if (CategoryId == '') {
            layer.msg('请先左侧选择菜单');
        } else {
            var search = $("#txt_Keyword").val();
            treeObj.treeGetTable(CategoryId, search)
        }
    });

}

var treeObj = {
    openOff: function () {
        if ($(".openOff" + code).parent().hasClass("lr-tree-node-collapsed")) {
            $(".openOff" + code).parent().removeClass("lr-tree-node-collapsed").addClass("lr-tree-node-expanded").next().show();
        } else {
            $(".openOff" + code).parent().removeClass("lr-tree-node-expanded").addClass("lr-tree-node-collapsed").next().hide();
        }
    },
    //树菜单点击事件
    treeFunc: function () {
        //下拉事件
        $(".openOff").click(function (event) {
            event.stopPropagation();
            if ($(this).parent().hasClass("lr-tree-node-collapsed")) {
                $(this).parent().removeClass("lr-tree-node-collapsed").addClass("lr-tree-node-expanded").next().show();
            } else {
                $(this).parent().removeClass("lr-tree-node-expanded").addClass("lr-tree-node-collapsed").next().hide();
            }
        });
        // 点击颜色变化
        $(".lr-tree-node-el").click(function () {
            $(".lr-tree-root").find(".lr-tree-node-el").removeClass("lr-tree-selected");
            // console.log($(".lr-tree-root").find("lr-tree-selected"))
            $(this).addClass("lr-tree-selected");
            $("#titleinfo").html($(this).attr("title"));// 变化标签
            CategoryId = $(this).attr("Id");
            treeObj.treeGetTable(code, CategoryId, '');
        });
        $(".layui-colla-title").click(function () {
            if (code != $(this).attr("id")) {
                $(".layui-colla-item").find("#c" + code).removeClass("lr-tree-block");
                $(".layui-colla-item").find("#last" + code).remove();
                code = $(this).attr("id");
                CategoryId = "";
                console.log(code);
                $(".layui-colla-item").find("#c" + code).addClass("lr-tree-block");
                treeObj.treeLoaddata(code);
            }
        });
    },
    treeInit: function (data) {
        layui.use('element', function () {
            console.log(data);
            // 一级菜单动态加载
            var treeStr = '<div>';
            $.each(data, function (index, items) {
                treeStr += '<div class="layui-colla-item"><h1 id="' + items.Code + '" class="layui-colla-title">' + items.Name + '</h2><div id="c' + items.Code + '" class="layui-colla-content"></div></div>'
            });
            treeStr += '</div>';
            $("#lr_left_tree").append(treeStr);
            treeObj.treeFunc();
        })
    },
    treeLoaddata: function (code) {
        AjaxSubmit('GET', '', basePath + '/api/Category/GetCategoryList?code=' + code, treeObj.treeInit2);//ajax请求企业对应下树菜单
    },
    treeInit2: function (res) {
        data = res.DataPacket.list;
        console.log(data);
        // 一级菜单动态加载
        var treeStr = '<ul id="last' + code + '" class="lr-tree-root">';
        $.each(data, function (index, items) {
            var icon = '';
            if (items.LP_Icon == '' || items.LP_Icon == undefined || items.LP_Icon == null) {
                icon = '<i class="fa fa-folder-open-o"></i>'
            }
            treeStr += '<li class="lr-tree-node"><div id="' + items.Id + '" title="' + items.Name + '" class="lr-tree-node-el lr-tree-node-collapsed">' +
                '<span class="lr-tree-node-indent"></span><img class="lr-tree-ec-icon openOff" src="../image/s.gif">' + icon + '&nbsp;' +
                '<a class="lr-tree-node-anchor" href="javascript:void(0);">' + '<span data-value="" class="lr-tree-node-text">' + items.Name + '</span></a></div>' +
                treeObj.treeInitChild(items.LowerMenu) + '</li>';
        });
        treeStr += '</ul>';
        $("#c" + code).append(treeStr)
        treeObj.treeFunc();
    },
    treeInitChild: function (data) {
        // 二级菜单动态加载
        var treeChildStr = '<ul class="lr-tree-node-ct" style="display: none;">';
        $.each(data, function (index, items) {
            treeChildStr += '<li class="lr-tree-node"><div id="' + items.Id + '" title="' + items.Name + '" class="lr-tree-node-el lr-tree-node-leaf">' +
                '<span class="lr-tree-node-indent"> <img class="lr-tree-icon" src="../image/s.gif"></span><img class="lr-tree-ec-icon" src="../image/s.gif">' +
                '<i class="fa fa-file-o"></i>&nbsp; <a class="lr-tree-node-anchor" href="javascript:void(0);">' +
                '<span data-value="" class="lr-tree-node-text">' + items.Name + '</span></a></div></li>'
        });
        treeChildStr += '</ul>';
        return treeChildStr
    },
    treeGetTable: function (code, id, search) {
        var data = {
            Code: code,
            CategoryId: id,
            Search: search
        };
        AjaxSubmit('GET', data, basePath + '/api/File/GetFileList', tableObj.getTableList);
    }
};

var tableObj = {
    //表格渲染
    tableInit: function (data) {
        layui.use('table', function () {
            var table = layui.table;
            table.render({
                elem: '#gridtable'
                , cols: [[
                    { field: 'Id', title: '序号' },
                    { field: 'Title', title: '标题' },
                    { field: 'CategoryName', title: '分类' },
                    { field: 'ClickNumber', title: '点击量' },
                ]]
                , data: data
            });

            table.on('rowDouble(gridtable)', function (obj) {
                var Id = obj.data.Id;
                tableObj.opendetails(Id);
            });
        });
        tableObj.changeColor()

    },
    //表格选中样式
    changeColor: function () {
        $(".layui-table>tbody>tr").click(function () {
            $(".lay-selected").removeClass("lay-selected");
            $(this).addClass("lay-selected");
        })
    },
    getTableList: function (res) {
        var list = res.DataPacket.list;
        if (list.length == 0 || list.length == undefined || list.length == null) {
            $(".nodataDiv").show();
        } else {
            $(".nodataDiv").hide();
        }
        tableObj.tableInit(res.DataPacket.list)
    },
    opendetails: function (res) {
        console.log(code);
        var id = res;
        layer.open({
            type: 2
            , offset: 'auto' //具体配置参考：offset参数项
            , closeBtn: 0
            , shadeClose: 1
            , anim: 5
            , area: ['1000px', '750px']
            , content: '../html/ShowComponent.html?id=' + id + '&code=' + code//iframe的ur
            , shade: 0.3 //不显示遮罩
        });

    },

};


