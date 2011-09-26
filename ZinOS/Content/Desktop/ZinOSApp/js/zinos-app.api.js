(function () {
    if (!window.ZinOS)
        window.ZinOS = {};

    var zinOSAppAPI = new function () {
        var desktopController;

        var setCurrentDesktopController = function (desktopcontroller) {
            desktopController = desktopcontroller;
        };

        var getCurrentDesktopController = function () {
            return desktopController;
        };

        this.setCurrentDesktopController = setCurrentDesktopController;
        this.getCurrentDesktopController = getCurrentDesktopController;
    };

    window.ZinOS.AppAPI = zinOSAppAPI;
})();


/*
var ZinOSApp = function (windowObj, zinOSdesktopController) {
    
    this.UI = new function () {
        this.ShowMessageBox = function (message, title) {
            zinOSdesktopController.ShowMessageBox(message, title ? title : 'ZinOS');
        };

        this.Prompt = function (caption, oninput) {
            zinOSdesktopController.Prompt(caption, oninput);
        };

        this.OpenFile = function (filePath) {
            zinOSdesktopController.OpenFile(filePath);
        };

        this.SaveFileDialog = function (filename, onsave) {
            zinOSdesktopController.SaveFile(filename, onsave);
        };

        this.UploadFileDialog = function (path, onfileselect) {
            zinOSdesktopController.UploadFile(path, function (selectedFile) {
                var file = {
                    name: selectedFile.name, //File.name
                    lastModifiedDate: selectedFile.lastModifiedDate, //File.lastModifiedDate
                    size: selectedFile.size, //Blob.size
                    type: selectedFile.type, //Blob.size
                    rawFile: selectedFile //File
                };
                onfileselect(file);
            });
        };
    };

    this.Storage = new function () {
        var getRootDirectories = this.GetRootDirectories = function (onGetRootDirectories) {
            ZinOS.AsyncHTTPRequest('/Desktop/DesktopFileSystem/GetRoots', 'GET', {}, function (msg) { onGetRootDirectories(msg.MessageData); });
        };

        this.GetPathContent = function (path, onGetPathContent) {
            if (path == '\\') {
                getRootDirectories(onGetPathContent);
                return;
            }
            ZinOS.AsyncHTTPRequest('/Desktop/DesktopFileSystem/GetChildren', 'GET', { parentPath: path }, function (msg) { onGetPathContent(msg.MessageData); });
        };

        this.GetFileContent = function (path, onGet) {
            var http = ZinOS.Core.HTTP;
            http.AsyncHTTPRequest({
                url: '/Desktop/DesktopFileSystem/GetFileContent',
                type: 'GET',
                dataType: 'text',
                data: { filePath: path },
                callback: function (data) {
                    onGet(data);
                }
            });
        };

        this.SaveFile = function (filePath, content, onsave) {
            var http = ZinOS.Core.HTTP;
            http.AsyncHTTPRequest({
                url: '/Desktop/DesktopFileSystem/SaveFile',
                type: 'POST',
                dataType: 'json',
                data: { filePath: filePath, content: content },
                callback: function (message) {
                    if (message.Type == ZinOS.MessageType.Success)
                        onsave(message.MessageData);
                }
            });
        };

        this.UploadFile = function (file, targetPath, onsave) {
            var http = ZinOS.Core.HTTP;

            http.AsyncHTTPRequest({
                url: '/Desktop/DesktopFileSystem/UploadFile',
                type: 'POST',
                dataType: 'json',
                files: { uploadedFile: file.rawFile },
                data: { targetPath: targetPath },
                callback: function (message) {
                    if (message.Type == ZinOS.MessageType.Success)
                        onsave(message.MessageData);
                }
            });
        };

        this.CreateDir = function (newDirPath, oncreate) {
            var http = ZinOS.Core.HTTP;

            http.AsyncHTTPRequest({
                url: '/Desktop/DesktopFileSystem/CreateDirectory',
                type: 'POST',
                dataType: 'json',
                data: { dirPath: newDirPath },
                callback: function (message) {
                    if (message.Type == ZinOS.MessageType.Success)
                        oncreate(message.MessageData);
                }
            });
        };

        this.DeleteFile = function (filePath, ondelete) {
            var http = ZinOS.Core.HTTP;
            http.AsyncHTTPRequest({
                    url: '/Desktop/DesktopFileSystem/DeleteFile',
                    type: 'POST',
                    dataType: 'json',
                    data: { filePath: filePath },
                    callback: function(message) {
                        if (message.Type == ZinOS.MessageType.Success)
                            ondelete(message.MessageData);
                    }
            });
        };

        this.GetPartUrl = function (path) {
            return '/Desktop/DesktopFileSystem/GetFileContent?filePath={0}'.format(path);
        };
    };

    this.Utils = new function () {
        this.StringFormat = function () {
            var formatted = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                var regexp = new RegExp('\\{' + (i - 1) + '\\}', 'gi');
                formatted = formatted.replace(regexp, arguments[i]);
            }
            return formatted;
        };
    };
};*/