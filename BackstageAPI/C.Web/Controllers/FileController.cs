using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using C.Model.Request;
using Toolkits.Web;

namespace BackstageAPI.Controllers
{
    public class FileController : ApiController
    {
        /// <summary>
        /// 上传文档
        /// </summary>
        /// <param name="entityModel"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult AddFile([FromBody]Flie flie)
        {
            var responseData = new ResponseData();
            try
            {
                var success = new C.BLL.File(flie.Code).AddFile(flie);
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
        public IHttpActionResult GetFileList([FromUri]FileList fileList)
        {
            var responseData = new ResponseData();
            try
            {
                var success = new C.BLL.File(fileList.Code).GetFileList(fileList.CategoryId, fileList.Search, fileList.Code);
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
        public IHttpActionResult GetFileInfo([FromUri]long fileId, string code)
        {
            var responseData = new ResponseData();
            try
            {
                var success = new C.BLL.File(code).GetFileInfo2(fileId);
                responseData.DataPacket.Add("data", success);
            }
            catch (Exception error)
            {
                responseData.MessageObj.Code = "400";
                responseData.MessageObj.Message = error.Message;
            }
            return Json(responseData);
        }

        public class TimeFileForPugin
        {
            /// <summary>
            /// 页码
            /// </summary>
            public int PageIndex { get; set; }

            /// <summary>
            /// 每页数量
            /// </summary>
            public int PageCount { get; set; }

            /// <summary>
            /// 搜索条件
            /// </summary>
            public string Search { set; get; }

            /// <summary>
            /// 企业编码
            /// </summary>
            public string Code { set; get; }
        }

        /// <summary>
        /// 分页获取时间排序的组件列表
        /// </summary>
        /// <param name="cAssemblyId"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetTimeFileList([FromUri]TimeFileForPugin fileList)
        {
            var responseData = new ResponseData();
            try
            {
                var success = new C.BLL.File(fileList.Code).GetFileList2(fileList.PageIndex, fileList.PageCount, fileList.Search, fileList.Code);
                var list = success.Item1
                    .Select(o => new
                    {
                        o.Id,
                        o.Title,
                        o.UploadTime
                    }).ToList();
                int count = success.Item2;
                responseData.DataPacket.Add("list", list);
                responseData.DataPacket.Add("count", count);
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