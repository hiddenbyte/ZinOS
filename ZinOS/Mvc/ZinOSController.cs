using System;
using System.Web.Mvc;
using ZinOS.ClientModels;
using ZinOS.Utils;

namespace ZinOS.Mvc
{
    public abstract class ZinOSController : Controller
    {
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
            return ZinOSAjaxMessage<TData>(data, MessageType.Success);
        }

        protected ZinOSAjaxMessageResult<string> ZinOSAjaxErrorMessage(string errorMessage)
        {
            return ZinOSAjaxMessage<string>(errorMessage, MessageType.Error);
        }

        protected ZinOSAjaxMessageResult<object> ZinOSAjaxErrorMessage()
        {
            return ZinOSAjaxMessage<object>(null, MessageType.Success);
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

            filterContext.Result = new RedirectResult("/");
        }
    }

    public class IgnoreAuthorization : Attribute
    {
    }
}