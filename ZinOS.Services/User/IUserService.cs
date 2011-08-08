using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ZinOS.Data.Entities;

namespace ZinOS.Services.Definitions
{
    public interface IUserService
    {
        /// <summary>
        /// Guarda o 'request token' e o respectivo 'secret' do utilizador com o <paramref name="userId"/>.
        /// </summary>
        /// <param name="userId">Id do utilizador</param>
        /// <param name="token">Request token do utilizador</param>
        /// <param name="tokenSecret">Token secret do utilizador</param>
        void SetDropboxRequestToken(int userId, string token, string tokenSecret);

        bool GetDropboxToken(int userId, out string token, out string tokenSecret);

        User GetByUsername(string username);

        User GetUserById(int userId);

        void CreateUser(User newUser);
    }
}
