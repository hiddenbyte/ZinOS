using System.Web.Mvc;
using ZinOS.Services.Definitions;
using System.IO;
using ZinOS.Utils;

namespace ZinOS.Areas.Desktop.Controllers
{
    public class ZinOSAppController : Controller
    {
        private readonly ZinOSAppService _zinOSAppService;

        public ZinOSAppController(ZinOSAppService zinOSAppService)
        {
            _zinOSAppService = zinOSAppService;
        }

        [HttpGet]
        public FileResult GetAppResource(int id, string path)
        {
            var stream = _zinOSAppService.GetAppResource(id, path);
            var content = "binary/octet-stream";
            
            if(stream != null)
            {
                content = StreamUtils.GetMimeFromFile(stream, path);
            }

            return stream == null
                       ? new FileStreamResult(Stream.Null, content)
                       : new FileStreamResult(stream, content);
        }

        [HttpGet]
        public ActionResult Icon(int id)
        {
            var icon = _zinOSAppService.GetAppIcon(id);
            if (icon == Stream.Null)
                return new RedirectResult(Url.Content("~/Content/Shared/images/defaultAppIcon.png"));
            return new FileStreamResult(icon, "binary/octet-stream");
        }

        [HttpGet]
        public JavaScriptResult CajaModule(int id)
        {
            var app = _zinOSAppService.GetApp(id);
            return new JavaScriptResult {Script = app.CajoledModule};
        }
    }
}
