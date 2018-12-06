using System;

namespace Toolkits.DateTimeExt
{
    public class Time
    {
        #region 时间戳管理

        /// <summary>
        /// 日期转换成unix时间戳
        /// </summary>
        /// <returns></returns>
        public static int GetTimestamp()
        {
            DateTime dateTime = DateTime.Now;
            var start = new DateTime(1970, 1, 1, 0, 0, 0, dateTime.Kind);
            return Convert.ToInt32((dateTime - start.AddHours(8)).TotalSeconds);
        }

        /// <summary>
        /// 日期转换成unix时间戳
        /// </summary>
        /// <returns></returns>
        public static int GetTimestamp(DateTime dateTime)
        {
            var start = new DateTime(1970, 1, 1, 0, 0, 0, dateTime.Kind);
            return Convert.ToInt32((dateTime - start.AddHours(8)).TotalSeconds);
        }

        /// <summary>
        /// unix时间戳转换成日期
        /// </summary>
        /// <param name="timestamp">时间戳(秒)</param>
        /// <returns></returns>
        public static DateTime UnixTimestampToDateTime(long timestamp)
        {
            DateTime target = DateTime.Now;
            var start = new DateTime(1970, 1, 1, 8, 0, 0, target.Kind);
            return start.AddSeconds(timestamp);
        }

        #endregion 时间戳管理
    }
}