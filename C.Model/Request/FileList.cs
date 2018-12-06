using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C.Model.Request
{
    public class FileList
    {
        public string Code { set; get; }
        public int CategoryId { set; get; }
        public string Search { set; get; }
    }
}