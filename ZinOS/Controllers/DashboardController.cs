using System.Web.Mvc;
using ZinOS.Mvc;
using ZinOS.Services.Definitions;

namespace ZinOS.Controllers
{
    [HandleError]
    public class DashboardController : ZinOSController
    {
        private readonly IZinOSDesktopService _zinOsService;

        public DashboardController(IZinOSDesktopService zinOsService)
        {
            _zinOsService = zinOsService;
        }

        //
        // GET: /Dashboard/
        public ActionResult Index()
        {
            ViewBag.DesktopId = _zinOsService.GetDesktopIdByUserId(CurrentUserId);
            
            return View();
        }
    }
}
