(function () {
    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var MyAppsView = function () {
        var MY_APPS_ID = '#installed-apps'; 
        var _onAppIconClickCallback = undefined; //event handler

        this.ShowApps = function (apps) {
            $(MY_APPS_ID).removeClass('task-bar-container-loading');
            for (var i = 0; i < apps.length; i++) {
                $(MY_APPS_ID)
                    .append('<div class="icon" id="app_' + apps[i].Id + '"><img class="image" src="/ZinOSApp/Icon/' + apps[i].Id
                    + ' " alt="icon"/><span class="text">' + apps[i].Name + '</span></div>');
            }
            setAppOnClickHandler();
        };

        this.SetAppIconOnClickHandler = function (eventHandler) {
            _onAppIconClickCallback = eventHandler;
            setAppOnClickHandler();
        };

        var setAppOnClickHandler = function () {
            $("div#installed-apps > div.icon").click(onAppIconClick);
        };

        var onAppIconClick = function () {
            if (_onAppIconClickCallback) {
                _onAppIconClickCallback(this.id.split('_')[1]);
            }
        };
    };

    window.ZinOS.Desktop.MyAppsView = MyAppsView;
})();