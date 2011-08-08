var ZinOS = new (function () {
    this.MessageType = {
        Success: 0,
        Error: -1,
        Unauthorized: -2
    };

    //makes an async http request
    this.AsyncHTTPRequest = function (url, type, data, callback) {
        $.ajax({
            url: url,
            type: type,
            dataType: 'json',
            data: data,
            success: function (data) {
                callback(data);
            }
        });
    };

    //redirect to 'url' page
    this.RedirectToPage = function (url) {
        window.location = url;
    };

    this.BindEvent = function (event, elementId, fnEventHander) {
        $('#' + elementId).bind(event, fnEventHander);
    };

    this.DOMReady = function (fnDOMReadyEventHandler) {
        $(document).ready(fnDOMReadyEventHandler);
    };

    this.Bag = {};
});

//Extend String
(function () {
    String.prototype.format = function(){
        var formatted = this;
        for (var i = 0; i < arguments.length; i++) {
            var regexp = new RegExp('\\{' + (i) + '\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    };
})();