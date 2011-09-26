using System;
using System.IO;
using System.Web.Mvc;
using ZinOS.ClientModels;
using ZinOS.Utils;

namespace ZinOS.Mvc
{
    public abstract class ZinOSController : Controller
    {
        private const string ServerErrorOccurred = "Server Error Occurred";
        private const int ServerErrorStatus = 500;

        protected int CurrentUserId
        {
            get { return AuthenticationHelper.GetCurrentAuthTicketUserId(); }
        }

        protected ZinOSAjaxMessageResult<TData> ZinOSAjaxMessage<TData>(TData data, MessageType type)
        {
            return new ZinOSAjaxMessageResult<TData>(data, type);
        }

        protected ZinOSAjaxMessageResult<TData> ZinOSAjaxMessage<TData>(TData data)
        {
            return ZinOSAjaxMessage(data, MessageType.Success);
        }

        protected ZinOSAjaxMessageResult<string> ZinOSAjaxErrorMessage(string errorMessage)
        {
            HttpContext.Response.StatusCode = ServerErrorStatus;
            HttpContext.Response.StatusDescription = ServerErrorOccurred;
            return ZinOSAjaxMessage(errorMessage, MessageType.Error);
        }

        protected ZinOSAjaxMessageResult<object> ZinOSAjaxErrorMessage()
        {
            HttpContext.Response.StatusCode = ServerErrorStatus;
            HttpContext.Response.StatusDescription = ServerErrorOccurred;
            return ZinOSAjaxMessage<object>(null, MessageType.Success);
        }

        protected ZinOSBase64StreamResult ZinOSBase64Stream(Stream stream)
        {
            return new ZinOSBase64StreamResult(stream);
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            ViewBag.UserIsAuthenticated = AuthenticationHelper.Authenticated();
            base.OnActionExecuting(filterContext);
        }

        protected override void OnAuthorization(AuthorizationContext filterContext)
        {
            var attributes = filterContext.ActionDescriptor.GetCustomAttributes(typeof (IgnoreAuthorization), false);
            if (attributes.Length > 0)
                return;

            if (AuthenticationHelper.Authenticated())
            {
                base.OnAuthorization(filterContext);
                return;
            }

            filterContext.Result = RedirectToAction("NotAuthorized", "Error");
        }
    }

    public class IgnoreAuthorization : Attribute
    {
    }
}