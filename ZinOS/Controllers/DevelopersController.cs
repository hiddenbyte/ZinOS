using System.Web;
using System.Web.Mvc;
using ZinOS.Services.Definitions;
using ZinOS.Mvc;

namespace ZinOS.Controllers
{
    public class DevelopersController : ZinOSController
    {
        private readonly IZinOSAppService _zinOsAppService;

        public DevelopersController(IZinOSAppService zinOSAppService)
        {
            _zinOsAppService = zinOSAppService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            return RedirectToAction("MyApps");
        }

        //
        // GET: /Developers/MyApps
        [HttpGet]
        public ActionResult MyApps()
        {
            var apps = _zinOsAppService.GetAllAppsByUserId(CurrentUserId);

            ViewData.Model = new ViewModels.Developers.MyApps {
                UserApps = apps
            };

            return View();
        }

        //
        // GET: /Developers/SubmitApp
        [HttpGet]
        public ActionResult SubmitApp()
        {
            return View();
        }

        // POST: /Developers/SubmitApp
        [HttpPost]
        public ActionResult SubmitApp(HttpPostedFileBase zinOSAppZipFile)
        {
            try
            {
                _zinOsAppService.Submit(CurrentUserId, zinOSAppZipFile.InputStream);
            }
            catch (ValidationException validation)
            {
                foreach (var error in validation.Errors)
                    ModelState.AddModelError(error.ErrorKey, error.ErrorMessage);
            }

            if (ModelState.IsValid)
                return RedirectToAction("AppSubmited");

            return View();
        }

        //
        // GET: /Developers/AppSubmited
        [HttpGet]
        public ActionResult AppSubmited() 
        {
            return View();
        }

        //
        // GET: /Developers/UpdateApp
        [HttpGet]
        public ActionResult UpdateApp(int appId)
        {
            var app = _zinOsAppService.GetApp(appId);
            ViewData.Model = app;
            return View();
        }


        // POST: /Developers/UpdateApp
        [HttpPost]
        public ActionResult UpdateApp(int zinOSAppId, HttpPostedFileBase zinOSAppZipFile)
        {
            try
            {
                _zinOsAppService.Update(CurrentUserId, zinOSAppId, zinOSAppZipFile.InputStream);
            }
            catch (ValidationException validationException)
            {
                foreach (var error in validationException.Errors)
                    ModelState.AddModelError(error.ErrorKey, error.ErrorMessage);
            }

            return ModelState.IsValid ? RedirectToAction("AppSubmited") as ActionResult : View();
        }
    }
}
