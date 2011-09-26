using System;
using System.Web;
using System.Web.Mvc;
using ZinOS.Services.Definitions;
using ZinOS.Mvc;
using ZinOS.Services.Definitions.DesktopFileSystem;

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

            const string contentType = "binary/octet-stream";

            return File(stream, contentType);
        }

        [HttpGet]
        public ActionResult GetFileBinary(string filePath)
        {
            var stream = _zinOsDesktopService.GetFile(CurrentUserId, filePath);
            return ZinOSBase64Stream(stream);
        }

        [HttpPost]
        [ActionName("UpdateFileUsingBase64String")]
        public ActionResult UpdateFile(string targetFileNamePath, string base64String)
        {
            try
            {
                var saved = _zinOsDesktopService.UpdateFile(CurrentUserId, targetFileNamePath, base64String);
                return ZinOSAjaxMessage(saved);
            }
            catch (Exception)
            {
                //TODO: log this exception                
                return ZinOSAjaxErrorMessage();
            }
        }

        [HttpPost]
        public ActionResult CreateFile(string targetPath, HttpPostedFileBase newFile)
        {
            try
            {
                var saved = _zinOsDesktopService.CreateFile(CurrentUserId, targetPath, newFile.FileName,
                                                            newFile.InputStream);
                return ZinOSAjaxMessage(saved);
            }
            catch (Exception)
            {
                //TODO: log this exception
                return ZinOSAjaxErrorMessage();
            }
        }

        [HttpPost]
        [ActionName("CreateFileUsingBase64String")]
        public ActionResult CreateFile(string targetFileNamePath, string base64String)
        {
            try
            {
                var result = _zinOsDesktopService.CreateFile(CurrentUserId, targetFileNamePath, base64String);
                return ZinOSAjaxMessage(result);
            }
            catch(Exception)
            {
                //TODO: log this exception
                return ZinOSAjaxErrorMessage();
            }
        }

        [HttpPost]
        public ActionResult UpdateFile(string filePath, HttpPostedFileBase fileStream)
        {
            return null;
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
