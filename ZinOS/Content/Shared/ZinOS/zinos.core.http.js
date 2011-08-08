/*
* @provides: ZinOS.HTTP
*/

(function () {
    if (!window.ZinOS)
        window.ZinOS = {};

    if (!window.ZinOS.Core)
        window.ZinOS.Core = {};

    if (!window.ZinOS.Core.HTTP)
        window.ZinOS.Core.HTTP = {};

    var http = function () {
        /*
        * @method AsyncHTTPRequest
        * @args { 
        *           url: #String#, 
        *           type: #DOMElement#, ('GET', 'POST', ...)
        *           data: #Object#,
        *           callback: #Function#,
        *           dataType: #String#, ('text', 'json', ...)
        *       }
        * @returns void
        */
        this.AsyncHTTPRequest = function (httpRequestArgs) {
            if (httpRequestArgs.files) {
                asyncFileUploadHTTPRequest(httpRequestArgs);
                return;
            }

            $.ajax({
                url: httpRequestArgs.url,
                type: httpRequestArgs.type,
                dataType: httpRequestArgs.dataType,
                data: httpRequestArgs.data,
                success: function (data) {
                    httpRequestArgs.callback(data);
                }
            });
        };

        var asyncFileUploadHTTPRequest = function (httpRequestArgs) {
            var formData = new FormData();

            for (var i in httpRequestArgs.data)
                formData.append(i, httpRequestArgs.data[i]);

            for (var j in httpRequestArgs.files)
                formData.append(j, httpRequestArgs.files[j]);

            var xhr = new XMLHttpRequest();

            xhr.addEventListener("load", function () {
                var resp = xhr.responseText;
                if (httpRequestArgs.dataType == 'json') {
                    httpRequestArgs.callback(eval('(' + resp + ')'));
                } else {
                    httpRequestArgs.callback(resp);
                }
            }, false);
            
            xhr.open(httpRequestArgs.type, httpRequestArgs.url);
            xhr.send(formData);
        };
    };

    //static class DOM
    window.ZinOS.Core.HTTP = new http();
})();