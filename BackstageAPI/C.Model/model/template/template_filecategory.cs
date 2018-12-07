using System;
using System.Linq;
using System.Text;

namespace C.Model
{
    ///<summary>
    ///
    ///</summary>
    public partial class template_filecategory
    {
        public template_filecategory()
        {
        }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:False
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:False
        /// </summary>
        public int FileId { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:False
        /// </summary>
        public int CategoryId { get; set; }
    }
}