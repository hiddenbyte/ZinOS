using System.Web.Mvc;

namespace ZinOS.Areas.Desktop
{
    public class DesktopAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Desktop";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "ZinOSApp_Run",
                @"Desktop/ZinOSApp/Run/{id}/Index",
                new { controller = "ZinOSApp", action = "Run" },
                new { id = @"(\d{1})+" });

            context.MapRoute(
                "ZinOSApp_GetAppResource",
                @"Desktop/ZinOSApp/Run/{id}/{*path}",
                new { controller = "ZinOSApp", action = "GetAppResource" },
                new { id = @"(\d{1})+"});


            context.MapRoute(
                "User_desktop_default",
                "Desktop/{desktopId}",
                new { controller = "Main", action = "Index", desktopId = UrlParameter.Optional },
                new { desktopId = @"(\d{1})+" }
            );

            context.MapRoute(
               "ZinOSApp_GetAppResource_Alternative",
               @"Desktop/Resources__/{id}/{*path}",
               new { controller = "ZinOSApp", action = "GetAppResource" },
               new { id = @"(\d{1})+" });

            context.MapRoute(
                "Desktop_default",
                "Desktop/{controller}/{action}/{id}",
                new { controller = "Main", action = "View", id = UrlParameter.Optional }
            );
        }
    }
}
