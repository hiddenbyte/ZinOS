using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ZinOS.Repositories.Definitions;
using ZinOS.Data.Entities;
using System.Data;

namespace ZinOS.Repositories.Implementation
{
    public class DbContextZinOSAppRepository : AbstractDbContextRepository<int, ZinOSApp>, IZinOSAppRepository
    {
        public DbContextZinOSAppRepository(DbContextUnitOfWorkFactory unitOfWorkFactory)
            : base(unitOfWorkFactory) { }

        public IEnumerable<ZinOSApp> GetAllByOwnerUserId(int userId)
        {
            var context = CurrentContext;

            using (context)
            {
                return (from app in context.ZinOSApps
                        where app.Owner.Id == userId
                        select app).ToArray();
            }
        }

        public IEnumerable<ZinOSApp> GetAllAvailable(int desktopId)
        {
            var context = CurrentContext;

            using(context)
            {
                return (from app in context.ZinOSApps
                        let desktop =
                            (from innerdesktop in context.ZinOSDesktop
                             where innerdesktop.Id == desktopId
                             select innerdesktop).FirstOrDefault()
                        where desktop != null && !desktop.InstalledApps.Contains(app)
                        select app);
            }
        }
    }
}
