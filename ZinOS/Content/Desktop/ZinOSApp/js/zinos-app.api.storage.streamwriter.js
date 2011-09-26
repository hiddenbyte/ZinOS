(function () {
    var streamWriter = function (filePath, newFile) {
        var base64IndexTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var base64String = [];
        var currentBlock = []; //.length = 3

        var writeByte = function (b) {
            currentBlock.push(b);
            if (currentBlock.length == 3) {
                decodeCurrentBlock();
            }
        };

        var writeBytes = function (bytes) {
            for (var i in bytes)
                writeByte(bytes[i]);
        };

        var writeString = function (str) {
            str = prepareString(str);
            var len = str.length;
            for (var i = 0; i < len; ++i)
                writeByte(str.charCodeAt(i) & 0xFF);
        };

        var flush = function (callback) {
            var http = ZinOS.Core.HTTP;
            if (currentBlock.length != 0)
                decodeCurrentBlock();

            var b64Str = getBase64String();

            http.AsyncHTTPRequest({
                url: newFile ? '/Desktop/DesktopFileSystem/CreateFileUsingBase64String' : '/Desktop/DesktopFileSystem/UpdateFileUsingBase64String',
                type: 'POST',
                dataType: 'json',
                data: { targetFileNamePath: filePath, base64String: b64Str },
                callback: function (data) {
                    callback(data.MessageData);
                }
            });
        };


        var getBase64String = function () {
            return base64String.join('');
        };

        var prepareString = function (str) {
            return str;
        };

        var decodeCurrentBlock = function () {
            var encByte1 = currentBlock[0] >> 2;
            var encByte2 = ((currentBlock[0] & 3) << 4) | (currentBlock[1] >> 4);
            var encByte3, encByte4;

            if (currentBlock.length > 1) {
                encByte3 = ((currentBlock[1] & 15) << 2) | (currentBlock[2] >> 6);
                encByte4 = currentBlock.length == 3 ? currentBlock[2] & 63 : 64;
            } else {
                encByte3 = 64;
                encByte4 = 64;
            }

            base64String.push(base64IndexTable.charAt(encByte1));
            base64String.push(base64IndexTable.charAt(encByte2));
            base64String.push(base64IndexTable.charAt(encByte3));
            base64String.push(base64IndexTable.charAt(encByte4));

            clearCurrentBlock();
        };

        var clearCurrentBlock = function () {
            var i = currentBlock.length;
            while (i > 0) {
                --i;
                currentBlock.pop();
            }
        };

        this.writeByte = writeByte;
        this.writeBytes = writeBytes;
        this.writeString = writeString;
        this.flush = flush;
    };

    window.ZinOS.AppAPI.Storage.StreamWriter = streamWriter;
})();