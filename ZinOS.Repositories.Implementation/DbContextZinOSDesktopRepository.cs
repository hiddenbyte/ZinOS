using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ZinOS.Repositories.Definitions;
using ZinOS.Data.Entities;
using System.Data;

namespace ZinOS.Repositories.Implementation
{
    public class DbContextZinOSDesktopRepository : AbstractDbContextRepository<int,ZinOSDesktop>, IZinOSDesktopRepository
    {
        public DbContextZinOSDesktopRepository(DbContextUnitOfWorkFactory unitOfWorkFactory)
            : base(unitOfWorkFactory)
        {
        }

        public IEnumerable<ZinOSDesktop> GetAllByUserId(int userId)
        {
            using (var context = CurrentContext)
            {
                var query = (from desktop in context.ZinOSDesktop
                             where desktop.DesktopUser.Id == userId
                             select desktop);
                return query.ToList();
            }
        }

        public void InstallApp(int desktopId, ZinOSApp app)
        {
             using (var context = CurrentContext)
             {
                 var desktop = context.ZinOSDesktop.Find(desktopId);
                 desktop.InstalledApps.Add(app);
                 context.Entry(desktop).State = EntityState.Modified;
                 context.SaveChanges();
             }
        }

        public void UninstallApp(int desktopId, int appId)
        {
            using (var context = CurrentContext)
            {
                var desktop = context.ZinOSDesktop.Find(desktopId);
                var app = desktop.InstalledApps.SingleOrDefault((innerApp) => innerApp.Id == appId);
                desktop.InstalledApps.Remove(app);
                context.Entry(desktop).State = EntityState.Modified;
                context.SaveChanges();
            }
        }
    }
}
