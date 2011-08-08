using System;
using System.Web.Mvc;
using ZinOS.Services.Definitions.Authentication;
using ZinOS.Utils;
using ZinOS.ClientModels;
using ZinOS.Mvc;

namespace ZinOS.Controllers
{
    public class HomeController : Controller
    {
        private readonly IAuthenticationService _authenticationService;

        public HomeController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            if (AuthenticationHelper.Authenticated())
                return RedirectToAction("Index", "Dashboard");
            return View();   
        }

        [HttpPost]
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
               //TODO: log this exception
               return new ZinOSAjaxMessageResult<bool>(false, MessageType.Error);
            }

            return new ZinOSAjaxMessageResult<bool>(success, MessageType.Success);
        }

        [HttpPost]
        public JsonResult Logout()
        {
            try
            {
                AuthenticationHelper.DeleteCurrentAuthenticationTicket();
                return new ZinOSAjaxMessageResult<bool>(true, MessageType.Success);
            }
            catch(Exception)
            {
                //TODO: Log this Exception
                return new ZinOSAjaxMessageResult<object>(null, MessageType.Error);
            }
        }
    }
}
