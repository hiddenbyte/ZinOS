using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ZinOS.Services.Definitions.Types
{
    public class OAuthEndpoints
    {
        public string UserAuthorization { get; set; }
        public string AccessToken { get; set; }
        public string RequestToken { get; set; }
    }
}
