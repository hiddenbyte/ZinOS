using System;
using System.Web.Mvc;
using ZinOS.Desktop.ViewModels.Main;
using ZinOS.Mvc;
using ZinOS.Services.Definitions;

namespace ZinOS.Areas.Desktop.Controllers
{
    public class MainController : ZinOSController
    {
        private readonly IZinOSDesktopService _zinOSDesktopService;
        private readonly ZinOSAppService _zinOSAppService;

        public MainController(IZinOSDesktopService zinOSDesktopService, ZinOSAppService zinOSAppService) 
        {
            _zinOSDesktopService = zinOSDesktopService;
            _zinOSAppService = zinOSAppService;
        }

        //
        // GET: /Desktop/Main/Index/{id}
        [HttpGet]
        public ActionResult Index(int desktopId)
        {
            if (!_zinOSDesktopService.IsDesktopUser(desktopId, CurrentUserId))
                throw new Exception("User can not view this desktop");

            ViewData.Model = new Index
            {
                DesktopId = desktopId
            };

            return View();
        }

        //
        // GET: /Desktop/Main/GetAvailableApps
        [HttpGet]
        public ActionResult GetAvailableApps(int desktopId) 
        {
            try
            {
                var availableApps = _zinOSDesktopService.GetAvailableApps(CurrentUserId, desktopId);
                
                foreach (var app in availableApps)
                {
                    app.Owner = null;
                    app.CajoledModule = null;
                }

                return ZinOSAjaxMessage(availableApps);
            }
            catch (Exception)
            {
                return ZinOSAjaxErrorMessage();
            }
        }

        //
        // GET: /Desktop/Main/GetInstalledApps
        [HttpGet]
        public ActionResult GetInstalledApps(int desktopId)
        {
            try
            {
                var installedApps = _zinOSDesktopService.GetInstalledApps(CurrentUserId, desktopId);
                
                foreach (var app in installedApps)
                {
                    app.Owner = null;
                    app.CajoledModule = null;
                }

                return ZinOSAjaxMessage(installedApps);
            }
            catch (Exception)
            {
                return ZinOSAjaxErrorMessage();
            }
        }

        //
        // GET: /Desktop/Main/LoadApplication
        [HttpGet]
        public ActionResult LoadApplication(int applicationId)
        {
            try
            {
                var app = _zinOSAppService.GetApp(applicationId);
                app.Owner = null;

                return ZinOSAjaxMessage(app);
            }
            catch (Exception)
            {
                return ZinOSAjaxErrorMessage();
            }
        }

        //
        // POST: /Desktop/Main/InstallApplication
        [HttpPost]
        public ActionResult InstallApplication(int applicationId, int desktopId)
        {
            try
            {
                _zinOSDesktopService.InstallApp(desktopId, applicationId);
                return ZinOSAjaxMessage(true);
            }
            catch (Exception) 
            {
                return ZinOSAjaxErrorMessage();
            }
        }
    }
}
