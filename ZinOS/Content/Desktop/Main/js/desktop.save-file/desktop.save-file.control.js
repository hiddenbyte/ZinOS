(function () {
    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var saveFileController = function (saveFileView, fileSystemModel) {
        this.SaveFile = function (filename, onsave) {
            //On Folder Click
            saveFileView.RegisterOpenFolderHandler(function (folderPath) {
                fileSystemModel.GetPathContent(folderPath, function (content) {
                    saveFileView.ShowFolders(content, folderPath);
                });
            });

            //On Back Click
            saveFileView.RegisterBackHandler(function (currentPath) {
                if (currentPath == '\\')
                    return;
                var lastSeparator = currentPath.lastIndexOf('\\');
                var previousPath = lastSeparator != 0 ? currentPath.substring(0, lastSeparator) : '\\';
                fileSystemModel.GetPathContent(previousPath, function (content) {
                    saveFileView.ShowFolders(content, previousPath);
                });
            });

            //On Save Click
            saveFileView.RegisterSaveHandler(function (path, filename) {
                onsave(path, filename);
                saveFileView.Close();
            });

            //View
            fileSystemModel.GetRootDirectories(function (roots) {
                saveFileView.SaveFile(filename, onsave, roots);
            });
        };
    };

    window.ZinOS.Desktop.SaveFileController = saveFileController;
})();