(function () {
    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var MyAppsController = function (myAppsView, zinOSAppsController) {
        myAppsView.SetAppIconOnClickHandler(function (zinOSAppId) {
            zinOSAppsController.RunZinOSApp(zinOSAppId);
        });
    };

    window.ZinOS.Desktop.MyAppsController = MyAppsController;
})();