(function () {
    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var myAppsController = function (myAppsView, zinOSAppsController) {
        myAppsView.SetAppIconOnClickHandler(function (zinOSAppId) {
            zinOSAppsController.RunZinOSApp(zinOSAppId);
        });
    };

    window.ZinOS.Desktop.MyAppsController = myAppsController;
})();