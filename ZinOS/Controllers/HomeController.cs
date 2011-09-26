using System;
using System.Web.Mvc;
using ZinOS.Services.Definitions.Authentication;
using ZinOS.Utils;
using ZinOS.ClientModels;
using ZinOS.Mvc;

namespace ZinOS.Controllers
{
    public class HomeController : ZinOSController
    {
        private readonly IAuthenticationService _authenticationService;

        public HomeController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpGet]
        [IgnoreAuthorization]
        public ActionResult Index()
        {
            if (AuthenticationHelper.Authenticated())
                return RedirectToAction("Index", "Dashboard");
            return View();   
        }

        [HttpPost]
        [IgnoreAuthorization]
        public JsonResult Login(string username, string password)
        {
            bool success;

            try
            {
                var ticket = _authenticationService.Authenticate(username, password);

                if (ticket != null)
                {
                    AuthenticationHelper.CreateTicket(ticket);
                    success = true;
                }
                else 
                {
                    success = false;
                }
            }
            catch (Exception)
            {               
                return ZinOSAjaxErrorMessage();
            }

            return ZinOSAjaxMessage(success);
        }

        [HttpPost]
        [IgnoreAuthorization]
        public JsonResult Logout()
        {
            try
            {
                AuthenticationHelper.DeleteCurrentAuthenticationTicket();
                return ZinOSAjaxMessage(true);
            }
            catch(Exception)
            {
                //TODO: Log this Exception
                return ZinOSAjaxErrorMessage();
            }
        }
    }
}
