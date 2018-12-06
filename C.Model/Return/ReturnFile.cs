using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C.Model.Return
{
    public class ReturnFile
    {
        public long Id { set; get; }
        public string Title { set; get; }
        public int ClickNumber { set; get; }
        public string CategoryName { set; get; }
        public string Describe { set; get; }
    }
}