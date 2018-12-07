using System;
using System.Linq;
using System.Text;

namespace C.Model
{
    ///<summary>
    ///
    ///</summary>
    public partial class doc_usercompany
    {
        public doc_usercompany()
        {
        }

        /// <summary>
        /// Desc:唯一编号
        /// Default:
        /// Nullable:False
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Desc:用户Id
        /// Default:
        /// Nullable:True
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// Desc:企业Id
        /// Default:
        /// Nullable:True
        /// </summary>
        public int CompanyId { get; set; }
    }
}