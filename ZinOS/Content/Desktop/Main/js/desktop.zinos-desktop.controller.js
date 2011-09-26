(function () {
    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var zinOSDesktopController = function (zinOSDesktopModel,
                                            zinOSDesktopView,
                                            saveFileController,
                                            uploadFileControler) {
        var thisController = this;
        var zinOSAppAPI = undefined;

        var init = function () {
            caja.initialize({ cajaServer: '/Content/Shared/js/google-caja/' });

            //create 
            var zinOS = ZinOS.AppAPI;

            //tamed zinos api
            var tamedZinOS =
            {
                Storage: {
                    GetRootDirectories: zinOS.Storage.GetRootDirectories,
                    GetPathContent: zinOS.Storage.GetPathContent,
                    UploadFile: zinOS.Storage.UploadFile,
                    CreateDir: zinOS.Storage.CreateDir,
                    DeleteFile: zinOS.Storage.DeleteFile,
                    ReadFile:  zinOS.Storage.ReadFile,
                    CreateFile: zinOS.Storage.CreateFile,
                    WriteToFile: zinOS.Storage.WriteToFile
                },

                UI: {
                    OpenFile: zinOS.UI.OpenFile,
                    ShowMessageBox: zinOS.UI.ShowMessageBox,
                    SaveFileDialog: zinOS.UI.SaveFileDialog,
                    UploadFileDialog: zinOS.UI.UploadFileDialog,
                    Prompt: zinOS.UI.Prompt
                }
            };

            caja.whenReady(function () {
                caja.markFunction(tamedZinOS.Storage.GetRootDirectories);
                caja.markFunction(tamedZinOS.Storage.GetPathContent);
                caja.markFunction(tamedZinOS.Storage.UploadFile);
                caja.markFunction(tamedZinOS.Storage.CreateDir);
                caja.markFunction(tamedZinOS.UI.Prompt);
                caja.markFunction(tamedZinOS.UI.OpenFile);
                caja.markFunction(tamedZinOS.UI.ShowMessageBox);
                caja.markFunction(tamedZinOS.UI.SaveFileDialog);
                caja.markFunction(tamedZinOS.UI.UploadFileDialog);
                caja.markFunction(tamedZinOS.Storage.DeleteFile);
                caja.markFunction(tamedZinOS.Storage.ReadFile);
                caja.markFunction(tamedZinOS.Storage.CreateFile);
                caja.markFunction(tamedZinOS.Storage.WriteToFile);
            });

            zinOSAppAPI = tamedZinOS;
        };

        this.Prompt = function (caption, oninput) {
            zinOSDesktopView.PromptWindow(caption, function (inputText) {
                zinOSDesktopView.ClosePromptWindow();
                oninput(inputText);
            });
        };

        //UploadFile
        this.UploadFile = function (targetPath, onfileselect) {
            uploadFileControler.UploadFile(targetPath, onfileselect);
        };

        //ShowMessageBox
        this.ShowMessageBox = function (message, title) {
            var messageBox = ZinOS.Core.DOM.CreateWindow({
                modal: true,
                resizable: false,
                draggable: false,
                title: title
            });
            messageBox.text(message);
        };

        //OpenFile
        this.OpenFile = function (filePath) {
            zinOSDesktopModel.GetInstalledApps(function (apps) {
                zinOSDesktopView.OpenFile(filePath, apps);
            });
        };

        //SaveFile
        this.SaveFile = function (filename, onsave) {
            saveFileController.SaveFile(filename, onsave);
        };

        //RunApp
        this.RunZinOSApp = function (zinOSAppId) {
            zinOSDesktopModel.RunZinOSApp(zinOSAppId, function (app) {
                zinOSDesktopView.RunZinOSApp(app, zinOSAppAPI);
            });
        };

        //Register Run App Event
        zinOSDesktopView.RegisterRunAppEventHandler(function (zinOSAppId, context) {
            zinOSDesktopModel.RunZinOSApp(zinOSAppId, function (app) {
                zinOSDesktopView.RunZinOSApp(app, zinOSAppAPI, context);
            });
        });

        init();
    };

    window.ZinOS.Desktop.ZinOSDesktopController = zinOSDesktopController;
})();