(function () {
    var streamReader = function (base64String) {
        var base64IndexTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        var base64StringPointer = 0;
        var decodedBytesRead = 0;
        var decodedBytes = [];


        var endOfStream = function () {
            if (base64StringPointer == base64String.length)
                return true;
            return false;
        };

        var loadEncodedBlock = function () {
            var currentEncodedBlock = [];
            currentEncodedBlock[0] = base64IndexTable.indexOf(base64String.charAt(base64StringPointer++));
            currentEncodedBlock[1] = base64IndexTable.indexOf(base64String.charAt(base64StringPointer++));
            currentEncodedBlock[2] = base64IndexTable.indexOf(base64String.charAt(base64StringPointer++));
            currentEncodedBlock[3] = base64IndexTable.indexOf(base64String.charAt(base64StringPointer++));

            return currentEncodedBlock;
        };

        var decodeBlock = function (currentEncodedBlock) {
            var b1 = (currentEncodedBlock[0] << 2) | (currentEncodedBlock[1] >> 4);
            var b2 = ((currentEncodedBlock[1] & 15) << 4) | (currentEncodedBlock[2] >> 2);
            var b3 = ((currentEncodedBlock[2] & 3) << 6) | currentEncodedBlock[3];

            if (currentEncodedBlock[3] != 64)
                decodedBytes.push(b3);
            if (currentEncodedBlock[2] != 64)
                decodedBytes.push(b2);
            decodedBytes.push(b1);
        };

        var popDecodedByte = function () {
            decodedBytesRead++;
            return decodedBytes.pop();
        };

        var readByte = function () {
            if (decodedBytes.length == 0) {
                if (endOfStream())
                    return -1;
                decodeBlock(loadEncodedBlock());
            }
            return popDecodedByte();
        };

        var readBytes = function (callback, count) {
            window.setTimeout(function () {
                var bytesToReturn = new Array();
                var bytesRead = 0;
                var b;
                while (bytesRead <= count) {
                    b = readByte();
                    bytesRead++;

                    if (b == -1)
                        break;
                    bytesToReturn.push(b);
                }
                callback(bytesToReturn);
            }, 0);
        };

        var readString = function (callback) {
            var bufferSize = 1024 * 1024; //1 MB
            var content = [];

            var i = 0;
            var asyncreadBytes = function (bytes) {
                var id = i++;
                
                if (bytes.length == 0) {
                    var charCodes = content.join('');
                    callback(charCodes);
                    return;
                }

                for (var j in bytes)
                    content.push(String.fromCharCode(bytes[j]));
                
                readBytes(asyncreadBytes, bufferSize);
            };

            readBytes(asyncreadBytes, bufferSize);
        };

        this.readByte = readByte;
        this.readBytes = readBytes;
        this.readString = readString;
    };

    window.ZinOS.AppAPI.Storage.StreamReader = streamReader;
})();