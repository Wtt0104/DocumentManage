using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C.Model.Return
{
    public class ReturnCMenu : template_category
    {
        public ReturnCMenu(template_category category)
        {
            Id = category.Id;
            Name = category.Name;
            FatherId = category.FatherId;
            Sort = category.Sort;
            SubMenu = null;
        }

        public List<ReturnCMenu> SubMenu { get; set; }
    }
}