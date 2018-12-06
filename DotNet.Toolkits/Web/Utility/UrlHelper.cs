using System;
using System.Web;

namespace Toolkits.Web
{
    public class UrlHelper
    {
        /// <summary>
        /// 加密URL参数
        /// </summary>
        /// <param name="pram">加密前参数</param>
        /// <returns></returns>
        public static string EncodingUrl(string pram)
        {
            string result = Convert.ToBase64String(System.Text.Encoding.Default.GetBytes(pram)).Replace("+", "%2B");
            return result;
        }

        /// <summary>
        /// 解密URL参数
        /// </summary>
        /// <param name="pram">加密后参数</param>
        /// <returns></returns>
        public static string DecodingUrl(string pram)
        {
            string result = System.Text.Encoding.Default.GetString(Convert.FromBase64String(pram.Replace("%2B", "+")));
            return result;
        }

        #region 获得当前绝对路径

        /// <summary>
        /// 获得当前绝对路径
        /// </summary>
        /// <param name="strPath">指定的路径</param>
        /// <returns>绝对路径</returns>
        public static string GetMapPath(string strPath)
        {
            if (strPath.ToLower().StartsWith("http://"))
            {
                return strPath;
            }
            if (HttpContext.Current != null)
            {
                return HttpContext.Current.Server.MapPath(strPath);
            }
            else //非web程序引用
            {
                strPath = strPath.Replace("/", "\\");
                if (strPath.StartsWith("\\"))
                {
                    strPath = strPath.Substring(strPath.IndexOf('\\', 1)).TrimStart('\\');
                }
                return System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, strPath);
            }
        }

        #endregion 获得当前绝对路径
    }
}