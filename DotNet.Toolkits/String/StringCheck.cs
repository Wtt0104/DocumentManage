using System;
using System.Text.RegularExpressions;

namespace Toolkits.StringExt
{
    /// <summary>
    ///StringUtility 的摘要说明
    /// </summary>
    public class StringCheck
    {
        /// <summary>
        /// 对字符串进行HTML安全转码，处理：\n,\r,',空格,<,>
        /// </summary>
        /// <param name="source"></param>
        /// <returns></returns>
        public static string ReplaceEnCodeHtml(string source)
        {
            source = source.Replace(" ", "&nbsp;");
            source = source.Replace("\r", "");
            source = source.Replace("'", "’");
            source = source.Replace("%", "％");
            source = source.Replace("<", "＜");
            source = source.Replace(">", "＞");
            //source = source.Replace("\n", "<br />");

            return source;
        }

        /// <summary>
        /// 针对HTML转码扩展进行解码，处理:&lt,&gt,br,&nbsp
        /// </summary>
        /// <param name="source"></param>
        /// <returns></returns>
        public static string ReplaceDeCodeHtml(string source)
        {
            //source = source.Replace("<br />", "\n");
            source = source.Replace("＜", "<");
            source = source.Replace("＞", ">");
            source = source.Replace("％", "%");
            source = source.Replace("’", "'");

            source = source.Replace("&nbsp;", " ");
            return source;
        }

        /// <summary>
        /// 返回 年月日时分秒+6位随机整数 的唯一值
        /// </summary>
        /// <returns></returns>
        public static string Get5BitGuid()
        {
            DateTime dt = DateTime.Now;
            string ret = "";
            ret = dt.ToString("yyyyMMddHHmmss");
            System.Random rd = new Random();
            ret += rd.Next(10000, 99999).ToString();
            return ret;
        }

        /// <summary>
        /// 时间刻度转16进制+5位随机数转16进制
        /// </summary>
        /// <returns></returns>
        public static string GetGuidString()
        {
            string a = Convert.ToString(DateTime.Now.Ticks, 16);
            Random rd = new Random();
            string b = Convert.ToString(rd.Next(10000, 99999), 16);
            return a + b;
        }

        /// <summary>
        /// 判断字符串是否为数据
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static bool IsNumeric(string str)
        {
            if (str == null || str.Length == 0)
                return false;
            System.Text.ASCIIEncoding ascii = new System.Text.ASCIIEncoding();
            byte[] bytestr = ascii.GetBytes(str);
            foreach (byte c in bytestr)
            {
                if (c < 48 || c > 57)
                {
                    return false;
                }
            }
            return true;
        }

        #region 检测是否有Sql危险字符

        /// <summary>
        /// 检测是否有Sql危险字符
        /// </summary>
        /// <param name="str">要判断字符串</param>
        /// <returns>判断结果</returns>
        public static bool IsSafeSqlString(string str)
        {
            return !Regex.IsMatch(str, @"[-|;|,|\/|\(|\)|\[|\]|\}|\{|%|@|\*|!|\']");
        }

        /// <summary>
        /// 检查危险字符
        /// </summary>
        /// <param name="Input"></param>
        /// <returns></returns>
        public static string Filter(string sInput)
        {
            if (sInput == null || sInput == "")
                return null;
            string sInput1 = sInput.ToLower();
            string output = sInput;
            string pattern = @"*|and|exec|insert|select|delete|update|count|master|truncate|declare|char(|mid(|chr(|'";
            if (Regex.Match(sInput1, Regex.Escape(pattern), RegexOptions.Compiled | RegexOptions.IgnoreCase).Success)
            {
                throw new Exception("字符串中含有非法字符!");
            }
            else
            {
                output = output.Replace("'", "''");
            }
            return output;
        }

        /// <summary>
        /// 检查过滤设定的危险字符
        /// </summary>
        /// <param name="InText">要过滤的字符串 </param>
        /// <returns>如果参数存在不安全字符，则返回true </returns>
        public static bool SqlFilter(string word, string InText)
        {
            if (InText == null)
                return false;
            foreach (string i in word.Split('|'))
            {
                if ((InText.ToLower().IndexOf(i + " ") > -1) || (InText.ToLower().IndexOf(" " + i) > -1))
                {
                    return true;
                }
            }
            return false;
        }

        #endregion 检测是否有Sql危险字符
    }
}