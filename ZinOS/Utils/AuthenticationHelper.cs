using System;
using System.Web;
using System.Web.Security;
using ZinOS.Services.Definitions.Authentication;

namespace ZinOS.Utils
{
    public static class AuthenticationHelper
    {
        private const string AuthenticationCookieName = ".ASPXAUTH";

        public static void CreateTicket(AuthenticationTicket authTicket)
        {
            FormsAuthentication.SetAuthCookie(authTicket.UserId, false);
        }

        public static int GetCurrentAuthTicketUserId()
        {
            var authTicketCookie = HttpContext.Current.Request.Cookies[AuthenticationCookieName];

            if (authTicketCookie == null)
                throw new Exception("Auth cookie does not exist");

            var ticket = FormsAuthentication.Decrypt(authTicketCookie.Value);
            return Int32.Parse(ticket.Name);
        }

        public static bool Authenticated()
        {
            var authTicketCookie = HttpContext.Current.Request.Cookies[AuthenticationCookieName];

            if (authTicketCookie == null)
                return false;

            var ticket = FormsAuthentication.Decrypt(authTicketCookie.Value);

            return !ticket.Expired;
        }

        public static void DeleteCurrentAuthenticationTicket()
        {
            FormsAuthentication.SignOut();
        }
    }
}
