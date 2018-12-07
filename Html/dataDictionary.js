var fkId='';
layui.use(['table'], function(){
    tableObj.tableInit();// 初始化表格
    var data={
        code:code,
        state:1
    }
    AjaxSubmit('get', data, basePath+'/api/GenerateTable?token='+token,GenerateTable_fun);//ajax请求树菜单

//     AjaxSubmit('get',data,basePath+'api/AppEntity?token='+token,get_fun)
});
function get_fun(res) {
    
}
//树菜单请求完成回调函数
function GenerateTable_fun (res){
    var data =res.DataPacket.list;
    treeObj.treeInit(data);
    treeObj.treeFunc();
    //    搜索功能
    $("#btn_Search").click(function () {
        if (fkId == '') {
            layer.msg('请先左侧选择菜单');
        }else {
            var search=$("#txt_Keyword").val();
            treeObj.treeGetTable(fkId,search)
        }
    })
}
var treeObj ={
    //树菜单点击事件
    treeFunc: function () {
        // 下拉事件
        $(".openOff").click(function(event){
            event.stopPropagation();
            if($(this).parent().hasClass("lr-tree-node-collapsed")){
                $(this).parent().removeClass("lr-tree-node-collapsed").addClass("lr-tree-node-expanded").next().show();
            }else{
                $(this).parent().removeClass("lr-tree-node-expanded").addClass("lr-tree-node-collapsed").next().hide();
            }
        });
        // 点击颜色变化
        $(".lr-tree-node-el").click(function(){
            $(".lr-tree-root").find(".lr-tree-node-el").removeClass("lr-tree-selected");
            // console.log($(".lr-tree-root").find("lr-tree-selected"))
            $(this).addClass("lr-tree-selected");
            $("#titleinfo").html($(this).attr("title"));// 变化标签
            fkId=$(this).attr("id");
            treeObj.treeGetTable(fkId,'');// 点击菜单调用该菜单下的表格数据
        })
    },
    treeInit: function (data) {
        // 一级菜单动态加载
        var treeStr='<ul class="lr-tree-root">';
        $.each(data, function (index,items) {
            var icon='';
            if(items.LP_Icon==''||items.LP_Icon==undefined||items.LP_Icon==null){
                icon='<i class="fa fa-folder-open"></i>'
            }
            treeStr+='<li class="lr-tree-node"><div id="'+items.LP_Id+'" title="'+items.LP_Name+'" class="lr-tree-node-el lr-tree-node-collapsed">'+
                '<span class="lr-tree-node-indent"></span><img class="lr-tree-ec-icon openOff" src="../image/s.gif">'+icon+'&nbsp;' +
                '<a class="lr-tree-node-anchor" href="javascript:void(0);">'+'<span data-value="" class="lr-tree-node-text">'+items.LP_Name+'</span></a></div>'+
                treeObj.treeInitChild(items.LP_Tables)+'</li>';
        });
        treeStr+='</ul>';
        $("#lr_left_tree").append(treeStr)
    },
    treeInitChild: function (data) {
        // 二级菜单动态加载
        var treeChildStr='<ul class="lr-tree-node-ct" style="display: none;">';
        $.each(data, function (index,items) {
            treeChildStr+='<li class="lr-tree-node"><div id="'+items.LP_ID+'" title="'+items.LP_Name+'" class="lr-tree-node-el lr-tree-node-leaf">'+
                '<span class="lr-tree-node-indent"> <img class="lr-tree-icon" src="../image/s.gif"></span><img class="lr-tree-ec-icon" src="../image/s.gif">'+
                '<i class="fa fa-file-o"></i>&nbsp; <a class="lr-tree-node-anchor" href="javascript:void(0);">'+
                '<span data-value="" class="lr-tree-node-text">'+items.LP_Name+'</span></a></div></li>'
        });
        treeChildStr+='</ul>';
        return treeChildStr
    },
    treeGetTable: function (id,search) {
        var data={
            code:code,
            fkId:id,
            search:search
        };
        AjaxSubmit('GET', data, basePath+'/api/GenerateTable?token='+token,tableObj.getTableList);
    }
};

var tableObj={
    //表格渲染
    tableInit:function (data) {
        layui.use('table', function(){
            var table = layui.table;
            table.render({
                elem: '#gridtable'
                ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                ,cols: [[ //标题栏
                    {field: 'LP_ID', title: 'LP_ID', width: 50}
                    ,{field: 'LP_Name', title: 'LP_Name', width: 120}
                    ,{field: 'LP_Caption', title: 'LP_Caption', minWidth: 150}
                    ,{field: 'LP_DefValue', title: 'LP_DefValue', minWidth: 160}
                    ,{field: 'LP_FKeyID', title: 'LP_FKeyID'}
                    ,{field: 'LP_NotNull', title: 'LP_NotNull', templet: '#NotNullTpl'}
                    ,{field: 'LP_RawType', title: 'LP_DataType'}
                    ,{field: 'LP_FkID', title: 'LP_FkID'}
                    ,{field: 'LP_OrderNo', title: 'LP_OrderNo'}
                ]]
                ,data: data
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
        var list=res.DataPacket.list;
        if(list.length==0||list.length==undefined||list.length==null){
            $(".nodataDiv").show();
        }else{
            $(".nodataDiv").hide();
        }
        tableObj.tableInit(res.DataPacket.list)
    }
};


