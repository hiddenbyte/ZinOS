(function () {
    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var uploadFileController = function (uploadFileView) {
        this.UploadFile = function (targetPath, onfileselect) {
            uploadFileView.UploadFile(targetPath, function (file) {
                uploadFileView.Close();
                onfileselect(file);
            });
        };
    };

    window.ZinOS.Desktop.UploadFileController = uploadFileController;
})();