(function () {
    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var ZinOSAppsView = function () {
        var _runAppEventHandler;
        var promptWindow;

        this.RegisterRunAppEventHandler = function (handler) {
            _runAppEventHandler = handler;
        };

        this.RunZinOSApp = function (app, zinOSApi, context) {
            //create app element
            var appWindow = ZinOS.Core.DOM.CreateElement({
                html: '<div></div>'
            });

            //run app
            caja.whenReady(function () {
                caja.load(
                    appWindow,
                    {
                        rewrite: function (uri) {
                            return uri;
                        }
                    },
                    function (frame) {
                        var api =
                        {
                            ZinOS: caja.tame(zinOSApi),
                            Context: caja.tame(context)
                        };
                        frame.api(api).cajoled('', app.CajoledModule, '')
                            .run(function () {
                                var dialogConfig = {};
                                if (app.UserInterfaceConfiguration.DefaultWidth !== null)
                                    dialogConfig.width = app.UserInterfaceConfiguration.DefaultWidth;
                                if (app.UserInterfaceConfiguration.DefaultHeight !== null)
                                    dialogConfig.height = app.UserInterfaceConfiguration.DefaultHeight;
                                if (app.UserInterfaceConfiguration.Resizable !== null)
                                    dialogConfig.resizable = app.UserInterfaceConfiguration.Resizable;
                                
                                dialogConfig.title = app.Name;

                                $(appWindow).dialog(dialogConfig);
                            });
                    });
            });
        };

        this.OpenFile = function (filePath, apps) {
            var openFileDialog = $('<div class="file-open-window"></div>');
            for (var i in apps) {
                $('<div class="icon" id="app_' + apps[i].Id + '"><img class="image" src="/ZinOSApp/Icon/' + apps[i].Id
                    + ' " alt="icon"/><span class="text">' + apps[i].Name + '</span></div>')
                   .click((function (id) {
                       return function () { openFileDialog.dialog('close'); _runAppEventHandler(id, { inputFile: filePath }); };
                   })(apps[i].Id))
                   .appendTo(openFileDialog);
            }
            openFileDialog.dialog({ title: filePath });
        };

        //Show PromptWindow
        this.PromptWindow = function (caption, oninput) {
            var dom = ZinOS.Core.DOM;
            promptWindow = dom.CreateWindow({
                title: 'ZinOS',
                draggable: false,
                resizable: false,
                modal: true
            });

            //render UI
            promptWindow.addClass('prompt-window');

            var windowHtml = '<div>{0}</div><input type="text" />'.format(caption);
            promptWindow.append(windowHtml);
            $('<span>OK</span>')
                .click(function () {
                    var val = promptWindow.children('input').val();
                    if (!val || val == '')
                        return;
                    oninput(val);
                })
                .appendTo(promptWindow);
        };

        //Close PromptWindow
        this.ClosePromptWindow = function () {
            if (promptWindow) {
                promptWindow.dialog('close').dialog('destroy').remove();
                promptWindow = undefined;
            }
        };
    };

    window.ZinOS.Desktop.ZinOSAppsView = ZinOSAppsView;
})();