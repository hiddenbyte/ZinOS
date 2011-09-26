using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ZinOS.Data.Entities;

namespace ZinOS.Repositories.Definitions
{
    public interface IUsersRepository : IRepository<int, User>
    {
        User GetByUsername(string username);
    }
}
