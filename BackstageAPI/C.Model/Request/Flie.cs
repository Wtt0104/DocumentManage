using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C.Model.Request
{
    public class Flie
    {
        public Flie()
        {
        }

        public string Code { set; get; }

        public int Id { get; set; }

        public string Title { get; set; }

        public string Describe { get; set; }

        public string DocUrl { get; set; }

        public string DocText { get; set; }

        public string PhysicalPath { get; set; }

        public int CategoryId { get; set; }
    }
}