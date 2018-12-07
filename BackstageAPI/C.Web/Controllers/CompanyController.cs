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
    public class CompanyController : ApiController
    {
        /// <summary>
        /// 获取企业菜单
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetCompanyList()
        {
            var responseData = new ResponseData();
            try
            {
                var success = new Company().GetCompanyList();
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
        /// 获取企业信息
        /// </summary>
        /// <param name="companyId">企业ID</param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetCompanyInfo([FromUri]int companyId)
        {
            var responseData = new ResponseData();
            try
            {
                var success = new Company().GetCompanyInfo(companyId);
                responseData.DataPacket.Add("data", success);
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