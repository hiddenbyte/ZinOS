(function () {
    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var ZinOSAppInstallationController = function (zinOsAppInstallationAppView, zinOsDesktopModel) {
        //Install ZsinOS App
        zinOsAppInstallationAppView.SetAppInstallHandler(function (zinOSAppId) {
            zinOsDesktopModel.InstallZinOSApp(zinOSAppId, function (result) {
                if (result) {
                    zinOsAppInstallationAppView.InstalledSuccesFully(zinOSAppId);
                } else {
                    zinOsAppInstallationAppView.CantInstall(zinOSAppId);
                }
            });
        });
    };

    window.ZinOS.Desktop.ZinOSAppInstallationController = ZinOSAppInstallationController;
})();