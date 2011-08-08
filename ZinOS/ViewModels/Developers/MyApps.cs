using System.Collections.Generic;
using ZinOS.Data.Entities;

namespace ZinOS.ViewModels.Developers 
{
    public class MyApps
    {
        public IEnumerable<ZinOSApp> UserApps
        {
            get;
            set;
        }
    }
}