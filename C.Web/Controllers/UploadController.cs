using C.BLL;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Toolkits.Web;

namespace C.Web.Controllers
{
    public class UploadController : ApiController
    {
        [HttpPost]
        public IHttpActionResult UploadPhoto()
        {
            var responseData = new ResponseData();
            try
            {
                HttpRequest request = HttpContext.Current.Request;
                HttpFileCollection FileCollect = request.Files;
                string photoPath = "";
                if (FileCollect.Count > 0)  //如果有传入数据
                {
                    foreach (string str in FileCollect)  //多文件根据key获取文件数据
                    {
                        HttpPostedFile FileSave = FileCollect[str];  //获取文件数据
                        string imgName = DateTime.Now.ToString("yyyyMMddhhmm");
                        string imgPath = "~/File/" + imgName + "_" + FileSave.FileName; //获取文件名称
                        string AbsolutePath = HttpContext.Current.Server.MapPath(imgPath);
                        FileSave.SaveAs(AbsolutePath);//将上传的东西保存
                        photoPath = imgPath;
                    }
                }
                var success = photoPath;
                responseData.DataPacket.Add("result", success);
            }
            catch (Exception error)
            {
                responseData.MessageObj.Code = "400";
                responseData.MessageObj.Message = error.Message;
            }
            return Json(responseData);
        }
    }
}