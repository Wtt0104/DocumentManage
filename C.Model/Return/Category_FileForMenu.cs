using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C.Model.Return
{
    public class Category_FileForMenu : Model.template_category
    {
        public Category_FileForMenu(Model.template_category category)
        {
            Id = category.Id;
            Name = category.Name;
            FatherId = category.FatherId;
            Sort = category.Sort;
            SubMenu = null;
        }

        public List<FileMenuByCategory> SubMenu { get; set; }

        public class FileMenuByCategory : Model.template_category
        {
            public List<File_IdAndTitle> Files { get; set; }
        }

        public class File_IdAndTitle
        {
            public long FileId { get; set; }
            public string Title { get; set; }
        }
    }
}