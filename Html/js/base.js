var basePath="https://doc.lanpai51.com";//ajax访问路径
// var basePath="http://101.132.125.41";//ajax访问路径


function AjaxSubmit(_type, _data, _url, _method) {//调用ajax
    $.ajax({
        type: _type,
        url: _url,
        data:  _data,
        contenType: "application/json",
        dataType: "json",
        success: function (msg) {
            console.log(msg);
            _method(msg);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer.closeAll();
            console.log(XMLHttpRequest);
        }
    })
}//AJAX

