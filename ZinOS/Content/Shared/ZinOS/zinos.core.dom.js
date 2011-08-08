/*
* @provides: ZinOS.DOM
*/

(function () {
    if (!window.ZinOS)
        window.ZinOS = {};

    if (!window.ZinOS.Core)
        window.ZinOS.Core = {};

    if (!window.ZinOS.Core.DOM)
        window.ZinOS.Core.DOM = {};

    var DOM = function () {
        /*
        * @method Append
        * @args { 
        *           targetElementId: #String#,
        *           targetDOMElement: #DOMElement#
        *           elementToAppend: #DOMElement#
        *       }
        * @returns DOMElement
        */
        this.Append = function (args) {
            if (args.targetElementId && args.elementToAppend)
                $('#' + args.targetElementId).append(args.elementToAppend);

            if (args.targetDOMElement && args.elementToAppend)
                $(args.targetDOMElement).append(args.elementToAppend);
        };

        /*
        * @method CreateElement
        * @args { html: #String# }
        * @returns DOMElement
        */
        var CreateElement = this.CreateElement = function (args) {
            if (args.html) {
                var jqueryElem = $(args.html);
                return jqueryElem.get(0);
            }
        };

        /*
        * @method CreateElement
        * @args { title: #String#, modal: #Boolean# }
        * @returns jQuery
        */
        this.CreateWindow = function (args) {
            return $('<div></div>').appendTo('body').dialog({ 
                title: args.title,
                modal: args.modal, 
                resizable: args.resizable,
                width: args.width,
                height: args.height 
            });
        };
    }

    //static class DOM
    window.ZinOS.Core.DOM = new DOM();
})();