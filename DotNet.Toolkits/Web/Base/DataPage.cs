namespace Toolkits.Web
{
    /// <summary>
    /// 分页信息
    /// </summary>
    public class DataPage
    {
        public int IsLastPage
        {
            get
            {
                if (RecordCount > PageIndex * PageSize)
                    return 0;
                else
                    return 1;
            }
        }

        /// <summary>
        /// 页索引号，最小值 1
        /// </summary>
        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public int RecordCount { get; set; }
    }
}