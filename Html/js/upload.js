var Title, Name, Describe, DocUrl, DocText, PhysicalPath, selectData;

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return null;
}

function GetPaymentView(code1, callback) {
    $.ajax({
        type: 'GET',
        url: basePath + '/api/Category/GetCategoryList?code=' + code1,
        data: '',
        contenType: "application/json",
        dataType: "json",
        success: function (data) {
            callback(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer.closeAll();
            console.log(XMLHttpRequest);
        }
    })
}

function GetLowerMenu(Id) {
    let list = selectData;
    let obj = Object;
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (item.Id == Id) {
            obj = item;
        }
    }
    return obj.LowerMenu;
}

var code = GetQueryString("code");
var categoryId = GetQueryString("CategoryId");

layui.use(['form'], function () {
    var form = layui.form;
    //执行实例

    AjaxSubmit('GET', '', basePath + '/api/Category/GetCategoryList?code=' + code, function (res) {
        let data = res.DataPacket.list;
        selectData = res.DataPacket.list;
        $.each(data, function (index, item) {
            $('#First').append(new Option(item.Name, item.Id));// 下拉菜单里添加元素
        })
        let sdata = GetLowerMenu(data[0].Id);
        $.each(sdata, function (index, item) {
            $('#Second').append(new Option(item.Name, item.Id));// 下拉菜单里添加元素
        })
        form.render();
    });//ajax请求企业对应下树菜单

    form.on('select(First)', function (data) {
        $('#Second').empty();// 下拉菜单里删除旧元素
        let sdata = GetLowerMenu(data.value);
        console.log(sdata);
        $.each(sdata, function (index, item) {
            $('#Second').append(new Option(item.Name, item.Id));// 下拉菜单里添加元素
        })
        form.render();
    });
});

function release(btn) {
    Title = $("#Title").val();
    Describe = $("#Describe").val();
    DocUrl = $("#DocUrl").val();
    DocText = $("#L_content").val();
    CategoryId = $("#Second").val();
    var data = {
        "Code": code,
        "Title": Title,
        "Describe": Describe,
        "DocUrl": DocUrl,
        "DocText": DocText,
        "CategoryId": CategoryId,
        "PhysicalPath": "111"
    };
    console.log(data);
    var url = basePath + '/api/File/AddFile';
    AjaxSubmit('Post', data, url, this.Backpass);
}

function Backpass(res) {
    let state = res.DataPacket.state
    layui.use('layer', function () {
        var layer = layui.layer;
        if (state) {
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.treeObj.treeGetTable(code, categoryId, '');
            parent.layer.close(index);
            parent.layer.msg('添加成功！');
        } else {
            layer.msg('添加失败,请重试或联系管理员！');
        }
    });

}



