namespace Toolkits.Web
{
    /// <summary>
    /// 结果信息
    /// </summary>
    public class ResponseMessage
    {
        public ResponseMessage()
        {
            Code = "200";
            Message = "";
        }

        public ResponseMessage(string code, string message)
        {
            Code = code;
            Message = message;
        }

        /// <summary>
        /// 结果码
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// 详细信息
        /// </summary>
        public string Message { get; set; }
    }
}