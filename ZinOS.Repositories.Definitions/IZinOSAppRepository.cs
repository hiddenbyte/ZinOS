using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ZinOS.Data.Entities;

namespace ZinOS.Repositories.Definitions
{
    public interface IZinOSAppRepository : IRepository<int, ZinOSApp>
    {
        IEnumerable<ZinOSApp> GetAllByOwnerUserId(int userId);

        IEnumerable<ZinOSApp> GetAllAvailable(int desktopId);
    }
}
