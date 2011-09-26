(function () {
    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var removeAppsView = function () {
        var unistallHandler = undefined;
        var currentWindow = undefined;

        this.ShowApps = function (apps) {
            var dom = ZinOS.Core.DOM;

            currentWindow = dom.CreateWindow({
                title: 'Remove App',
                draggable: false,
                resizable: true,
                modal: true,
                width: 250,
                height: 150
            });

            currentWindow.addClass('remove-apps');

            renderApps(currentWindow, apps);
        };

        this.AppUninstalled = function (appId) {
            $("div#remove-app-installed-app-{0}".format(appId)).remove();
        };

        this.SetUninstallAppClickHandler = function (handler) {
            unistallHandler = handler;
        };

        var renderApps = function (windowElem, apps) {
            windowElem.empty();
            for (var i = 0; i < apps.length; i++) {
                var app = $('<div class="installed-app" id="remove-app-installed-app-{1}"><span class="name">{0}</span></div>'.format(apps[i].Name, apps[i].Id));
                var appRemoveOption = $('<span class="remove-option">remove</span></div>');
                appRemoveOption.appendTo(app).click((function (id) {
                    return function () {
                        if (unistallHandler != undefined)
                            unistallHandler(id);
                    };
                })(apps[i].Id));
                windowElem.append(app);
            }
        };
    };

    window.ZinOS.Desktop.RemoveAppsView = removeAppsView;
})();