using System;
using System.Linq;
using System.Text;

namespace C.Model
{
    ///<summary>
    ///
    ///</summary>
    public partial class doc_datatype
    {
        public doc_datatype()
        {
        }

        /// <summary>
        /// Desc:唯一编号
        /// Default:
        /// Nullable:False
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Desc:名称
        /// Default:
        /// Nullable:False
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Desc:字段名
        /// Default:
        /// Nullable:False
        /// </summary>
        public string RawType { get; set; }

        /// <summary>
        /// Desc:长度
        /// Default:
        /// Nullable:False
        /// </summary>
        public int Length { get; set; }
    }
}