using System;
using System.Web;
using System.Web.Mvc;
using ZinOS.Services.Definitions;
using ZinOS.Mvc;

namespace ZinOS.Areas.Desktop.Controllers
{
    public class DesktopFileSystemController : ZinOSController
    {
        private readonly IZinOSDesktopService _zinOsDesktopService;

        public DesktopFileSystemController(IZinOSDesktopService zinOsDesktopService) 
        {
            _zinOsDesktopService = zinOsDesktopService;
        }

        [HttpGet]
        public ActionResult GetRoots()
        {
            try
            {
                var data = _zinOsDesktopService.GetDesktopRootDirectoriesByDesktopUserId(CurrentUserId);
                return ZinOSAjaxMessage(data);
            }
            catch (Exception)
            {
                //TODO: log this exception 
                return ZinOSAjaxErrorMessage();
            }
        }

        [HttpGet]
        public ActionResult GetChildren(string parentPath) 
        {
            try
            {
                var data = _zinOsDesktopService.GetChildrenItemsByDesktopUserId(CurrentUserId, new FileSystemItem
                {
                    Path = parentPath
                });

                return ZinOSAjaxMessage(data);
            }
            catch (Exception)
            {
                //TODO: log this exception 
                return ZinOSAjaxErrorMessage();
            }
        }

        [HttpGet]
        public ActionResult GetFileContent(string filePath)
        {  
            var stream = _zinOsDesktopService.GetFile(CurrentUserId, filePath);
            return File(stream, "binary/octet-stream");
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult SaveFile(string filePath, string content) 
        {
            try
            {
                var saved = _zinOsDesktopService.UpdateFile(CurrentUserId, filePath, content);
                return ZinOSAjaxMessage(saved);
            }
            catch (Exception)
            {
                //TODO: log this exception                
                return ZinOSAjaxErrorMessage();
            }
        }
        
        [HttpPost]
        public ActionResult UploadFile(string targetPath, HttpPostedFileBase uploadedFile)
        {
            try
            {
                var saved = _zinOsDesktopService.CreateFile(CurrentUserId, targetPath, uploadedFile.FileName,
                                                            uploadedFile.InputStream);
                return ZinOSAjaxMessage(saved);
            }
            catch (Exception)
            {
                //TODO: log this exception
                return ZinOSAjaxErrorMessage();
            }
        }

        [HttpPost]
        public ActionResult CreateDirectory(string dirPath)
        {
            try
            {
                var desktopUserId = CurrentUserId;           
                var result = _zinOsDesktopService.CreateDirectory(desktopUserId, dirPath);
                return ZinOSAjaxMessage(result);
            }
            catch(Exception)
            {
                //TODO: log this execption
                return ZinOSAjaxErrorMessage();
            }
        }

        [HttpPost]
        public ActionResult DeleteFile(string filePath)
        {
            try
            {
                var desktopUserId = CurrentUserId;
                var result = _zinOsDesktopService.DeleteFile(desktopUserId, filePath);
                return ZinOSAjaxMessage(result);
            }
            catch (Exception)
            {
                //TODO: log this execption
                return ZinOSAjaxErrorMessage();
            }
        }
    }
}
