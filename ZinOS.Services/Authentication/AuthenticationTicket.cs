using System;

namespace ZinOS.Services.Definitions.Authentication
{
    public class AuthenticationTicket
    {
        public string UserId { get; set; }
        public DateTime AuthenticatedAt { get; set; }
    }
}
