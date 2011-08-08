(function () {
    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var ZinOSAppInstallationController = function (zinOsAppInstallationAppView, zinOsDesktopModel) {
        //Install ZsinOS App
        zinOsAppInstallationAppView.SetAppInstallHandler(function (zinOSAppId) {
            zinOsDesktopModel.InstallZinOSApp(zinOSAppId, function (result) {
            });
        });
    };

    window.ZinOS.Desktop.ZinOSAppInstallationController = ZinOSAppInstallationController;
})();