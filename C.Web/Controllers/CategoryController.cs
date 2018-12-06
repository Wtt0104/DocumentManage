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
    public class CategoryController : ApiController
    {
        /// <summary>
        /// 获取分类菜单
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetCategoryList([FromUri]string code)
        {
            var responseData = new ResponseData();
            try
            {
                var success = new Category(code).GetCategoryMenu();
                responseData.DataPacket.Add("list", success);
            }
            catch (Exception error)
            {
                responseData.MessageObj.Code = "400";
                responseData.MessageObj.Message = error.Message;
            }
            return Json(responseData);
        }

        [HttpGet]
        public IHttpActionResult GetCategoryFileList([FromUri]string code)
        {
            var responseData = new ResponseData();
            try
            {
                var success = new Category(code).GetCategory_FileForMenus();
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