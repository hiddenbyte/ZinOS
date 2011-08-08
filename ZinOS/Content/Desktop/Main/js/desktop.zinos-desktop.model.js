(function () {
    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var ZinOSDesktopModel = function (desktopId) {
        this.GetInstalledApps = function (callback) {
            ZinOS.AsyncHTTPRequest(
                '/Desktop/Main/GetInstalledApps',
                'GET',
                { desktopId: desktopId },
                function (msg) {
                    if (msg.Type == ZinOS.MessageType.Success) {
                        callback(msg.MessageData);
                    }
                });
        };

        this.GetAvailableApps = function (callback) {
            ZinOS.AsyncHTTPRequest(
                '/Desktop/Main/GetAvailableApps',
                'GET',
                { desktopId: desktopId },
                function (msg) {
                    if (msg.Type == ZinOS.MessageType.Success) {
                        callback(msg.MessageData);
                    }
                });
        };

        this.InstallZinOSApp = function (zinOSAppId, callback) {
            ZinOS.AsyncHTTPRequest(
                '/Desktop/Main/InstallApplication',
                'POST',
                { desktopId: desktopId, applicationId: zinOSAppId },
                function (msg) {
                    if (msg.Type == ZinOS.MessageType.Success) {
                        callback(msg.MessageData);
                    }
                });
        };

        this.RunZinOSApp = function (zinOsAppId, callback) {
            ZinOS.AsyncHTTPRequest('/Desktop/Main/LoadApplication',
                'GET',
                { applicationId: zinOsAppId },
                function (msg) {
                    if (msg.Type == ZinOS.MessageType.Success) {
                        callback(msg.MessageData);
                    }
                });
        };
    };

    window.ZinOS.Desktop.ZinOSDesktopModel = ZinOSDesktopModel;
})();