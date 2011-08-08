using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ZinOS.Data.Entities;

namespace ZinOS.Repositories.Definitions
{
    public interface IZinOSDesktopRepository : IRepository<int, ZinOSDesktop>
    {
        IEnumerable<ZinOSDesktop> GetAllByUserId(int userId);
    }
}
