using C.BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Toolkits.Web;

namespace C.Web.Controllers
{
    public class UserController : ApiController
    {
        /// <summary>
        /// 扫码登陆
        /// </summary>
        /// <param name="wxcode"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetUserInfo(string wxcode)
        {
            var responseData = new ResponseData();
            try
            {
                var obj = new RequestAPI().WXApi(wxcode);
                var success = new User().IsExistingUser(obj);
                responseData.DataPacket.Add("list", success.Item1);
                responseData.DataPacket.Add("token", success.Item2);
            }
            catch (Exception error)
            {
                responseData.MessageObj.Code = "400";
                responseData.MessageObj.Message = error.Message;
            }
            return Json(responseData);
        }

        /// <summary>
        /// 绑定企业
        /// </summary>
        /// <param name="token"></param>
        /// <param name="companyId"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult BindCompanyByCode(string wxcode, int companyId)
        {
            var responseData = new ResponseData();
            try
            {
                var obj = new RequestAPI().WXApi(wxcode);
                var success = new User().IsUserCompany(obj.openId, companyId);
                responseData.DataPacket.Add("list", success);
            }
            catch (Exception error)
            {
                responseData.MessageObj.Code = "400";
                responseData.MessageObj.Message = error.Message;
            }
            return Json(responseData);
        }

        /// <summary>
        /// 绑定企业
        /// </summary>
        /// <param name="token"></param>
        /// <param name="companyId"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult BindCompanyByToken(string token, int companyId)
        {
            var responseData = new ResponseData();
            try
            {
                var success = new User().BindCompanyByToken(token, companyId);
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