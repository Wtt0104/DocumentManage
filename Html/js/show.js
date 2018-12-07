function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return r[2];
	return null;
}
var id = GetQueryString("id");
var code = GetQueryString("code");
AjaxSubmit('get', '', basePath + '/api/File/GetFileInfo?fileId=' + id + '&code=' + code, data); //ajax获取详细数据

function data(res) {
	obj = res.DataPacket.data
	console.log(obj);
	$("#Title").val(obj.Title);
	$("#Name").val(obj.CategoryName);
	$("#Describe").val(obj.Describe);
	$("#L_content").val(obj.DocText);
	$("#DocUrl").val(obj.DocUrl);
	// $("#Submitter").val(obj.Submitter);
	$("#Submitter").val('管理员');
	$("#UploadTime").val(GetTime(obj.UploadTime));


}

function GetTime(time) {
	var unixTimestamp = new Date(time * 1000);
	var commonTime = unixTimestamp.toLocaleString();
	return commonTime;
}