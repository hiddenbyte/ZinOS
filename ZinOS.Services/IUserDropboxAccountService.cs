using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ZinOS.Services.Definitions
{
    public interface IUserDropboxAccountService
    {
        bool GetDropboxToken(int userId, out string token, out string tokenSecret);
        void SetDropboxRequestToken(int userId, string token, string tokenSecret);
        string GetTokenSecret(string token);
        string GetDropboxAccessToken(int userId);
    }
}
