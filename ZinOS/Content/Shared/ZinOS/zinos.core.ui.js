/*
 * @depends: ZinOS
 * ZinOS core user interface utilities 
 */

(function (zinos) {
    zinos.UI = new (function () {
        this.ShowDialogBox = function (messsage) {
            var divDialog = $('<div></div>');
            divDialog.html('<div class="ui-state-highlight">' + messsage + '</div>');
            $('body').append(divDialog);
            divDialog.dialog({ modal: true });
        };
    })();
})(ZinOS);