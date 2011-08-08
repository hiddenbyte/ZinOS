(function () {
    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var fileSystemModel = function () {
        var GetRootDirectories = this.GetRootDirectories = function (onGetRootDirectories) {
            ZinOS.AsyncHTTPRequest('/Desktop/DesktopFileSystem/GetRoots', 'GET', {}, function (msg) { onGetRootDirectories(msg.MessageData); });
        };

        this.GetPathContent = function (path, onGetPathContent) {
            if (path == '\\') {
                GetRootDirectories(onGetPathContent);
                return;
            }
            ZinOS.AsyncHTTPRequest('/Desktop/DesktopFileSystem/GetChildren', 'GET', { parentPath: path }, function (msg) { onGetPathContent(msg.MessageData); });
        };
    };

    window.ZinOS.Desktop.FileSystemModel = fileSystemModel;
})();