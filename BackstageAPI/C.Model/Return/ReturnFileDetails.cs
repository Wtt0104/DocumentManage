using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C.Model.Return
{
    public class ReturnFileDetails : ReturnFile
    {
        public ReturnFileDetails()
        {
        }

        public int Submitter { get; set; }

        public int UploadTime { get; set; }

        public string PhysicalPath { get; set; }

        public string DocUrl { get; set; }

        public string DocText { get; set; }
    }
}