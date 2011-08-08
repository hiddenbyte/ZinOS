using System.Collections.Generic;

namespace ZinOS.Data.Entities
{
    public class ZinOSDesktop
    {
        public int Id { get; set; }
        public virtual User DesktopUser { get; set; }
        public virtual ICollection<ZinOSApp> InstalledApps { get; set; }
    }
}
