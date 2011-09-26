(function () {
    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var removeAppsController = function (removeAppsView, desktopModel) {
        removeAppsView.SetUninstallAppClickHandler(function (appId) {
            desktopModel.UnistallZinOSApp(appId, function (done) {
                if (done) {
                    removeAppsView.AppUninstalled(appId);
                }
            });
        });
    };

    window.ZinOS.Desktop.RemoveAppsController = removeAppsController;
})();