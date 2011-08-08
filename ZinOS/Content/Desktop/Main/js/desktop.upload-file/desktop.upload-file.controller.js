(function () {
    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var uploadFileController = function () {
        this.UploadFile = function (targetPath, onfileselect) {
            var uploadFileView = new ZinOS.Desktop.UploadFileView();
            uploadFileView.UploadFile(targetPath, function (file) {
                uploadFileView.Close();
                onfileselect(file);
            });
        };
    };

    window.ZinOS.Desktop.UploadFileController = uploadFileController;
})();