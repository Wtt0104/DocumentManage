using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace C.BLL
{
    public class RequestAPI
    {
        public Model.doc_wxapi WXApi(string wxcode)
        {
            string appid = "wx9d9e57d076680efc";
            string secret = "9f8d490bfa250b4acc5d733f90db0f2e";
            string serviceAddress = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + wxcode + "&grant_type=authorization_code";
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(serviceAddress);
            request.Method = "GET";
            request.ContentType = "text/html;charset=UTF-8";
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream myResponseStream = response.GetResponseStream();
            StreamReader myStreamReader = new StreamReader(myResponseStream, Encoding.UTF8);
            string retString = myStreamReader.ReadToEnd();
            myStreamReader.Close();
            myResponseStream.Close();
            Model.doc_wxapi obj = JsonConvert.DeserializeObject<Model.doc_wxapi>(retString);
            return obj;
        }
    }
}