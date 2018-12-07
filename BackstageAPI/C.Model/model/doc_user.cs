using System;
using System.Linq;
using System.Text;

namespace C.Model
{
    ///<summary>
    ///
    ///</summary>
    public partial class doc_user
    {
        public doc_user()
        {
        }

        /// <summary>
        /// Desc:唯一编号
        /// Default:
        /// Nullable:False
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Desc:微信返回用户唯一编号
        /// Default:
        /// Nullable:False
        /// </summary>
        public string Openid { get; set; }

        /// <summary>
        /// Desc:微信返回的会话密钥
        /// Default:
        /// Nullable:True
        /// </summary>
        public string Session_key { get; set; }

        /// <summary>
        /// Desc:随机生成辨识码
        /// Default:
        /// Nullable:True
        /// </summary>
        public string Token { get; set; }
    }
}