using System.Web.Mvc;

namespace ZinOS.Controllers
{
    public class ErrorController : Controller
    {
        //
        // GET: /Error/NotFound
        [HttpGet]
        public ActionResult NotFound()
        {
            return View("404");
        }

        [HttpGet]
        public ActionResult NotAuthorized()
        {
            return View();
        }
    }
}
