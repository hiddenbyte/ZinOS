(function () {
    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var taskBarController = function (taskBarView, myAppsView, zinOSInstallationView, removeAppsView, zinOsDesktopModel) {
        //ShowMyApps
        taskBarView.SetMyAppsOnClickHandler(function () {
            zinOsDesktopModel.GetInstalledApps(function (apps) {
                myAppsView.ShowApps(apps);
            });
        });

        //ShowSettings
        taskBarView.SetSettingsOnClickHandler(function () {
            taskBarView.ShowSettings();
        });

        //ShowAvailableApps
        taskBarView.SetAvailableAppsOnClickHandler(function () {
            zinOsDesktopModel.GetAvailableApps(function (apps) {
                zinOSInstallationView.Show(apps);
            });
        });

        //Exit or LeaveDestkop
        taskBarView.SetExitOnClickHandler(function () {
            window.location = '/Dashboard';
        });

        //RemoveApps
        taskBarView.SetRemoveAppsClickHandler(function () {
            zinOsDesktopModel.GetInstalledApps(function (apps) {
                removeAppsView.ShowApps(apps);
            });
        });
    };

    window.ZinOS.Desktop.TaskBarController = taskBarController;
})();