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
    }
}
