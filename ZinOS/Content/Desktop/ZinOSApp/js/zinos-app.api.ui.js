(function() {
    var ui = new function() {
        this.ShowMessageBox = function(message, title) {
            ZinOS.AppAPI.getCurrentDesktopController()
                .ShowMessageBox(message, title ? title : 'ZinOS');
        };

        this.Prompt = function(caption, oninput) {
            ZinOS.AppAPI.getCurrentDesktopController()
                .Prompt(caption, oninput);
        };

        this.OpenFile = function(filePath) {
            ZinOS.AppAPI.getCurrentDesktopController()
                .OpenFile(filePath);
        };

        this.SaveFileDialog = function(filename, onsave) {
            ZinOS.AppAPI.getCurrentDesktopController()
                .SaveFile(filename, onsave);
        };

        this.UploadFileDialog = function(path, onfileselect) {
            ZinOS.AppAPI.getCurrentDesktopController()
                .UploadFile(path, function(selectedFile) {
                    var file = {
                        name: selectedFile.name, //File.name
                        lastModifiedDate: selectedFile.lastModifiedDate, //File.lastModifiedDate
                        size: selectedFile.size, //Blob.size
                        type: selectedFile.type, //Blob.size
                        rawFile: selectedFile //File
                    };
                    onfileselect(file);
                });
        };
    };

    window.ZinOS.AppAPI.UI = ui;
})();