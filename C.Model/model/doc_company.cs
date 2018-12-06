using System;
using System.Linq;
using System.Text;

namespace C.Model
{
    ///<summary>
    ///
    ///</summary>
    public partial class doc_company
    {
        public doc_company()
        {
        }

        /// <summary>
        /// Desc:唯一编号
        /// Default:
        /// Nullable:False
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Desc:企业名称
        /// Default:
        /// Nullable:True
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Desc:随机生成企业标识码
        /// Default:
        /// Nullable:True
        /// </summary>
        public string Code { get; set; }
    }
}