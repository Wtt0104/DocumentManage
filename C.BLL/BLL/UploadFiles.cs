using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace C.BLL
{
    public class UploadFiles
    {
        /// <summary>
        /// 二进制流写入文件
        /// </summary>
        /// <param name="filepath">文件路径</param>
        /// <param name="filecontent">文件内容</param>
        /// <param name="FileName">文件名</param>
        /// <param name="Errmsg">错误消息</param>
        /// <returns></returns>
        public bool WriteFile(string filepath, byte[] filecontent, string FileName, out string Errmsg)
        {
            DirectoryInfo di = new DirectoryInfo(filepath);
            if (!di.Exists)
            {
                di.Create();
            }
            FileStream fstream = null;
            try
            {
                fstream = System.IO.File.Create(filepath + "\\" + FileName, filecontent.Length);

                fstream.Write(filecontent, 0, filecontent.Length);   //二进制转换成文件
            }
            catch (Exception ex)
            {
                Errmsg = ex.Message;
                //抛出异常信息
                return false;
            }
            finally
            {
                if (fstream != null)
                    fstream.Close();
            }
            Errmsg = "";
            return true;
        }
    }
}