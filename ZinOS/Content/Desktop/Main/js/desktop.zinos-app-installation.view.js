(function () {

    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var ZinOSAppInstallationView = function () {
        var _onAppInstallHandler = undefined; //@private _onAppInstallHandler Action<string>

        /*
        * public Show:
        * @apps ZinOSApp[]
        * @returns void
        */
        this.Show = function (apps) {
            $('#list-apps').removeClass('task-bar-container-loading');

            for (var i = 0; i < apps.length; i++) {
                $('#list-apps').append('<div class="app" id="app_' + apps[i].Id + '"><img class="image" src="/ZinOSApp/Icon/' + apps[i].Id
                    + ' " alt="icon"/><div class="actions"><div class="app-name">' + apps[i].Name +
                    '</div><div class="app-description">' + apps[i].Description +
                    '</div><a href="#install" class="app-install" id="app-install_' + apps[i].Id + '">install</a></div></div>');
            }

            $("div#list-apps > div.app > div.actions > a.app-install").click(onAppInstallHandler);
        };

        this.InstalledSuccesFully = function (appId) {
            $('#list-apps').find('#app-install_' + appId).
                text('installed')
                .unbind('click', onAppInstallHandler)
                .addClass('app-installed');
        };

        this.CantInstall = function (appId) {
            $('#list-apps').find('#app-install_' + appId).
                text('error ocurred')
                .unbind('click', onAppInstallHandler)
                .addClass('app-error-installing');
        };

        /*
        * public SetAppInstallHandler:
        * @eventHanlder Action<int>
        * @returns void
        */
        this.SetAppInstallHandler = function (eventHanlder) {
            _onAppInstallHandler = eventHanlder;
        };

        /*
        * private onAppInstallHandler:
        * @returns void
        */
        var onAppInstallHandler = function () {
            if (_onAppInstallHandler) {
                _onAppInstallHandler(extractDataFromElementId(this));
            }
        };

        /*
        * private extractDataFromElementId:
        * @element DOMElement
        * @returns String
        */
        var extractDataFromElementId = function (element) {
            return element.id.split('_')[1]
        };
    };

    window.ZinOS.Desktop.ZinOSAppInstallationView = ZinOSAppInstallationView;
})();