using C.BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Toolkits.Web;

namespace BackstageAPI.Controllers
{
    public class ClassifyController : ApiController
    {
        /// <summary>
        /// 获取菜单
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetEntityList()
        {
            var responseData = new ResponseData();
            try
            {
                var success = new C_classify().GetClassifyMenu();
                responseData.DataPacket.Add("list", success);
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