using System;
using System.Linq;
using System.Text;

namespace C.Model
{
    ///<summary>
    ///
    ///</summary>
    public partial class doc_template_field
    {
        public doc_template_field()
        {
        }

        /// <summary>
        /// Desc:唯一编号
        /// Default:
        /// Nullable:False
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Desc:表Id
        /// Default:
        /// Nullable:True
        /// </summary>
        public int? TableId { get; set; }

        /// <summary>
        /// Desc:字段名
        /// Default:
        /// Nullable:True
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Desc:字段标题
        /// Default:
        /// Nullable:True
        /// </summary>
        public string Caption { get; set; }

        /// <summary>
        /// Desc:数据类型
        /// Default:
        /// Nullable:True
        /// </summary>
        public int DataType { get; set; }
    }
}