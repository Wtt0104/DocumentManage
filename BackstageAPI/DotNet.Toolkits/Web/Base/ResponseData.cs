using System;
using System.Collections.Generic;

namespace Toolkits.Web
{
    public class ResponseData
    {
        /// <summary>
        /// 返回数据
        /// </summary>
        public ResponseData()
        {
            MessageObj = new ResponseMessage();
            DataPacket = new Dictionary<string, object>();
            PageInfo = new DataPage();
        }

        /// <summary>
        /// 数据包
        /// </summary>
        public Dictionary<string, object> DataPacket { get; set; }

        public DataPage PageInfo { get; set; }

        public ResponseMessage MessageObj { get; set; }

        /// <summary>
        /// 报错时返回数据结果
        /// </summary>
        /// <param name="ex"></param>
        public void NewException(Exception ex)
        {
            MessageObj.Code = "300";
            if (ex.Data["code"].ToString() == "301")
                MessageObj.Code = "301";

            MessageObj.Message = ex.Message;
            //NetFramework.Helper.LogHelper.LogSave(ex, ex.Message);
        }

        /// <summary>
        /// 添加分页信息
        /// </summary>
        /// <param name="ex"></param>
        public void AddPageInfo(int recordCount, int pageIndex, int pageSize)
        {
            PageInfo.RecordCount = recordCount;
            PageInfo.PageIndex = pageIndex;
            PageInfo.PageSize = pageSize;
        }
    }
}