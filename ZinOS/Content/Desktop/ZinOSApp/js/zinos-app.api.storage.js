(function () {
    var storage = new function () {
        this.ReadFile = function (path, callback) {
            var http = ZinOS.Core.HTTP;
            http.AsyncHTTPRequest({
                url: '/Desktop/DesktopFileSystem/GetFileBinary',
                type: 'GET',
                dataType: 'text',
                data: { filePath: path },
                callback: function (data) {
                    var streamReader = new ZinOS.AppAPI.Storage.StreamReader(data);
                    var tamedStreamReader = {
                        readByte: streamReader.readByte,
                        readBytes: streamReader.readBytes,
                        readString: streamReader.readString
                    };
                    caja.tame(tamedStreamReader);
                    caja.markFunction(tamedStreamReader.readByte);
                    caja.markFunction(tamedStreamReader.readBytes);
                    caja.markFunction(tamedStreamReader.readString);
                    callback(tamedStreamReader);
                }
            });
        };

        var getStreamWriter = function (path, newFile) {
            var streamWriter = new ZinOS.AppAPI.Storage.StreamWriter(path, newFile);
            var tamedStreamWriter = { writeByte: streamWriter.writeByte,
                writeBytes: streamWriter.writeBytes,
                writeString: streamWriter.writeString,
                flush: streamWriter.flush
            };

            caja.tame(tamedStreamWriter);
            for (var i in tamedStreamWriter) {
                if (tamedStreamWriter[i].constructor === Function)
                    caja.markFunction(tamedStreamWriter[i]);
            }

            return tamedStreamWriter;
        };

        this.CreateFile = function (path, callback) {
            callback(getStreamWriter(path,true));
        };

        this.WriteToFile = function (path, callback) {
            callback(getStreamWriter(path, false));
        };

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

        this.UploadFile = function (file, targetPath, onsave) {
            var http = ZinOS.Core.HTTP;

            http.AsyncHTTPRequest({
                url: '/Desktop/DesktopFileSystem/CreateFile',
                type: 'POST',
                dataType: 'json',
                files: { newFile: file.rawFile },
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
                callback: function (message) {
                    if (message.Type == ZinOS.MessageType.Success)
                        ondelete(message.MessageData);
                }
            });
        };

        this.GetPartUrl = function (path) {
            return '/Desktop/DesktopFileSystem/GetFileContent?filePath={0}'.format(path);
        };
    };

    window.ZinOS.AppAPI.Storage = storage;
})();