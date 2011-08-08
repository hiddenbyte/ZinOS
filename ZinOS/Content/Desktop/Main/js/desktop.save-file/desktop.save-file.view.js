(function () {
    if (!window.ZinOS)
        window.ZinOS = {};
    if (!window.ZinOS.Desktop)
        window.ZinOS.Desktop = {};

    var SaveFileView = function () {
        //event handlers
        var _folderClickHandler;
        var _backClickHandler;
        var _saveClickHandler;

        //view state
        var _currentPath = '\\';

        //ui
        var _foldersElem;
        var _window;

        this.Close = function () {
            _window.dialog('close');
        };

        this.SaveFile = function (filename, onsave, roots) {
            var window = _window = ZinOS.Core.DOM.CreateWindow({
                title: 'save file',
                modal: true,
                resizable: false,
                width: 400,
                height: 325
            });

            $('<div class="back"><div class="icon"></div><div class="name">back</div></div>')
                .appendTo(window)
                .click(function () { _backClickHandler(_currentPath); });

            _foldersElem = $('<div class="folders"></div>').appendTo(window);

            var fileInfo = $('<div class="file-info"><input type="text" class="filename" value="{0}"></input></div>'.format(filename))
                                .appendTo(window);

            $('<div class="save-btn"><div class="icon"></div>save</div>')
                .click(function () {
                    var filename = fileInfo.children('input').val();
                    _saveClickHandler(_currentPath, filename);
                })
                .appendTo(fileInfo);

            renderFiles(_foldersElem, roots);
        };

        this.ShowFolders = function (folders, currentFolderPath) {
            _currentPath = currentFolderPath
            renderFiles(_foldersElem, folders);
        };

        this.RegisterOpenFolderHandler = function (handler) {
            _folderClickHandler = handler;
        };

        this.RegisterBackHandler = function (handler) {
            _backClickHandler = handler;
        };

        this.RegisterSaveHandler = function (handler) {
            _saveClickHandler = handler;
        };

        var renderFiles = function (foldersElem, files) {
            foldersElem.children().remove();
            for (var i in files) {
                if (files[i].IsDirectory) {
                    $('<div class="folder"><div class="icon"></div><div class="name">{0}</div></div>'.format(files[i].Name))
                        .click((function (i) {
                            return function () {
                                _folderClickHandler(files[i].Path);
                            };
                        })(i))
                        .appendTo(foldersElem);
                }
            }
        };
    };

    window.ZinOS.Desktop.SaveFileView = SaveFileView;
})();