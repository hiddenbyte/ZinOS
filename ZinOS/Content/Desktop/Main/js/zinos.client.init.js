ZinOS.DOMReady(function () {
    var myAppsView = new ZinOS.Desktop.MyAppsView();
    var zinOSAppsinstallationView = new ZinOS.Desktop.ZinOSAppInstallationView();
    var zinosDesktopModel = new ZinOS.Desktop.ZinOSDesktopModel(ZinOS.Bag.DesktopId);

    new ZinOS.Desktop.TaskBarController(
        new ZinOS.Desktop.TaskBarView(), //ZinOS.Desktop.TaskBarView
        myAppsView,  //ZinOS.Desktop.MyAppsView
        zinOSAppsinstallationView, //ZinOS.Desktop.ZinOSAppInstallationView
        zinosDesktopModel); //ZinOS.Desktop.ZinOSDesktopModel

    var zinosDesktopController = new ZinOS.Desktop.ZinOSDesktopController(
        zinosDesktopModel,
        new ZinOS.Desktop.ZinOSAppsView(),
        new ZinOS.Desktop.SaveFileController(new ZinOS.Desktop.SaveFileView(), new ZinOS.Desktop.FileSystemModel()),
        new ZinOS.Desktop.UploadFileController()
    );

    new ZinOS.Desktop.MyAppsController(
        myAppsView, //ZinOS.Desktop.MyAppsView
        zinosDesktopController); //ZinOS.Desktop.ZinOSDesktopController

    new ZinOS.Desktop.ZinOSAppInstallationController(
        zinOSAppsinstallationView,
        zinosDesktopModel);
});