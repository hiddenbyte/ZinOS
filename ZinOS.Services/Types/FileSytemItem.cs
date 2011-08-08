using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ZinOS.Services.Definitions
{
    public class FileSystemItem
    {
        public string Name
        {
            get;
            set;
        }

        public string Path
        {
            get;
            set;
        }

        public bool IsDirectory
        {
            get;
            set;
        }
    }
}
