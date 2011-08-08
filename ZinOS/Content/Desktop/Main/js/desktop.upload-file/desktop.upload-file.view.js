(function () {
    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var uploadFileView = function () {
        var uploadWindow;

        this.UploadFile = function (targetPath, onfileselect) {
            var dom = ZinOS.Core.DOM;

            //create window...
            uploadWindow = dom.CreateWindow({
                    title: 'Upload file',
                    draggable: false,
                    resizable: false,
                    modal: true,
                    width: 250,
                    height: 150
                });

            //render user interface...
            uploadWindow.addClass('upload-file');

            //file selection control
            var fileControl = $('<input type="file" />')
                .appendTo(uploadWindow);

            //upload button control
            $('<a href="#upload-file">upload</a>')
                .appendTo(uploadWindow)
                .click(function () {
                    var fileControlDOM = fileControl.get(0);
                    var fileToUpload = fileControlDOM.files[0];
                    if (fileToUpload) {
                        onfileselect(fileToUpload);
                    }
                });
        };

        this.Close = function () {
            uploadWindow.dialog('close');
            uploadWindow.dialog('destroy');
        };
    };

    window.ZinOS.Desktop.UploadFileView = uploadFileView;
})();