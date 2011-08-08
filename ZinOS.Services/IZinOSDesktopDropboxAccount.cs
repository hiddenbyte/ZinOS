using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ZinOS.Services.Definitions
{
    public interface IZinOSDesktopDropboxAccount
    {
        bool GetDropboxToken(int desktopId, out string accessToken, out string tokenSecret);
        bool HasAuthenticatedDropboxAccount(int desktopId);
    }
}
