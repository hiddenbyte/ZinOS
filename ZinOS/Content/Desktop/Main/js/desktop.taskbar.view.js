(function () {
    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var taskBarView = function () {
        var selectedMenu = undefined;

        this.SetMyAppsOnClickHandler = function (handler) {
            $('#my-apps-option').click(function () {
                if (ShowMenu('installed-apps')) {
                    handler();
                }
            });
        };

        this.SetSettingsOnClickHandler = function (handler) {
            $('#settings-option').click(function () {
                if (ShowMenu('settings')) {
                    handler();
                }
            });
        };

        this.SetAvailableAppsOnClickHandler = function (handler) {
            $('#available-apps-option').click(function () {
                if (ShowMenu('list-apps')) {
                    handler();
                }
            });
        };

        this.SetExitOnClickHandler = function (handler) {
            $("#exit-option").click(function () {
                handler();
            });
        };

        this.SetRemoveAppsClickHandler = function (handler) {
            $("#remove-apps-option").click(function () {
                handler();
            });
        };

        var ShowMenu = this.ShowMenu = function (menuId) {
            if (selectedMenu == menuId)
                return false;
            hideMenuCurrentlySelectedMenu();
            selectedMenu = menuId;
            $('#' + menuId).html('');
            $('#' + menuId).addClass('task-bar-container-loading');
            $('#' + menuId).slideDown('slow');
            return true;
        };

        var hideMenuCurrentlySelectedMenu = function () {
            if (selectedMenu) {
                $('#' + selectedMenu).hide();
            }
        };
    };

    window.ZinOS.Desktop.TaskBarView = taskBarView;
})();