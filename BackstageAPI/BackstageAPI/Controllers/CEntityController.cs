using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using C.Model.Request;
using Toolkits.Web;
using C.BLL;

namespace BackstageAPI.Controllers
{
    public class CEntityController : ApiController
    {
        /// <summary>
        /// 上传组件
        /// </summary>
        /// <param name="entityModel"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult AddEntity([FromBody]CEntity entityModel)
        {
            var responseData = new ResponseData();
            try
            {
                var success = new C_entity().AddEntity(entityModel);
                responseData.DataPacket.Add("state", success);
            }
            catch (Exception error)
            {
                responseData.MessageObj.Code = "400";
                responseData.MessageObj.Message = error.Message;
            }
            return Json(responseData);
        }

        /// <summary>
        /// 获取组件列表
        /// </summary>
        /// <param name="cAssemblyId"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetEntityList(int cAssemblyId)
        {
            var responseData = new ResponseData();
            try
            {
                var success = new C_entity().GetEntityList(cAssemblyId);
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
        /// 获取单个组件信息
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetEntityInfo(int entityId)
        {
            var responseData = new ResponseData();
            try
            {
                var success = new C_entity().GetEntityInfo(entityId);
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