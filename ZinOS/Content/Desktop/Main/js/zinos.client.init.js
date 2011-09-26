ZinOS.DOMReady(function () {

    //Create Models, Views and Controllers
    
    var removeAppsView = new ZinOS.Desktop.RemoveAppsView();
    var myAppsView = new ZinOS.Desktop.MyAppsView();
    var zinOSAppsinstallationView = new ZinOS.Desktop.ZinOSAppInstallationView();

    var zinosDesktopModel = new ZinOS.Desktop.ZinOSDesktopModel(ZinOS.Bag.DesktopId);

    var taskBarController = new ZinOS.Desktop.TaskBarController(
        new ZinOS.Desktop.TaskBarView(),
        myAppsView,
        zinOSAppsinstallationView,
        removeAppsView,
        zinosDesktopModel);

    var zinosDesktopController = new ZinOS.Desktop.ZinOSDesktopController(
        zinosDesktopModel,
        new ZinOS.Desktop.ZinOSAppsView(),
        new ZinOS.Desktop.SaveFileController(new ZinOS.Desktop.SaveFileView(), new ZinOS.Desktop.FileSystemModel()),
        new ZinOS.Desktop.UploadFileController(new ZinOS.Desktop.UploadFileView())
    );

    var myAppsController = new ZinOS.Desktop.MyAppsController(
        myAppsView,
        zinosDesktopController);

    var appsInstallionController = new ZinOS.Desktop.ZinOSAppInstallationController(
        zinOSAppsinstallationView,
        zinosDesktopModel);

    var removeAppsCintroler = new ZinOS.Desktop.RemoveAppsController(removeAppsView, zinosDesktopModel);

    //Set ZinOSDesktopController instance for ZinOS App API
    ZinOS.AppAPI.setCurrentDesktopController(zinosDesktopController);
    
    //Ajax Async Server Error Handler
    ZinOS.Core.HTTP.ServerErrorHandler = function (error, errorThrown) {
        var dom = ZinOS.Core.DOM;
        var errorWindow = dom.CreateWindow({
            title: 'Error',
            draggable: false,
            resizable: false,
            modal: true,
            width: 250,
            height: 150
        });
        errorWindow.text(errorThrown);
    };
});