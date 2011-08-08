using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ZinOS.Data.Entities;
using ZinOS.Repositories.Definitions;
using System.Data;

namespace ZinOS.Repositories.Implementation
{
    public class DbContextUsersRepository : AbstractDbContextRepository<int,User>, IUsersRepository
    {
        public DbContextUsersRepository(DbContextUnitOfWorkFactory unitOfWorkFactory)
            : base(unitOfWorkFactory)
        {
        }

        #region IUsersRepository

        public string GetDropboxTokenSecret(string token)
        {
            using (var database = CurrentContext)
            {
                return (from user in database.Users
                        where user.DropboxUserInformation.Token == token
                        select user.DropboxUserInformation.TokenSecret).SingleOrDefault();
            }
        }

        public User GetByUsername(string username)
        {
            using (var context = CurrentContext)
            {
                User user = (from u in context.Users
                             where u.Username.ToLower() == username.ToLower()
                             select u).SingleOrDefault();
                return user;
            }
        }

        #endregion

       /* private void checkComplexTypes(User user)
        {
            if (user.DropboxUserInformation == null)
                user.DropboxUserInformation = NullDropboxUserInformation;
        }*/
    }
}
