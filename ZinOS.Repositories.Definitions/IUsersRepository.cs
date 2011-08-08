using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ZinOS.Data.Entities;

namespace ZinOS.Repositories.Definitions
{
    public interface IUsersRepository : IRepository<int, User>
    {
        string GetDropboxTokenSecret(string token);
        User GetByUsername(string username);
    }
}
