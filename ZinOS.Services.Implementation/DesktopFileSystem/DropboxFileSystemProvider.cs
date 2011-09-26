using System;
using System.Collections.Generic;
using ZinOS.Services.Definitions;
using System.IO;
using ZinOS.Services.Definitions.DesktopFileSystem;

namespace ZinOS.Services.Implementation.DesktopFileSystem
{
    public class DropboxFileSystemProvider : IDesktopFileSystemProvider
    {
        private const string DropboxProviderName = "dropbox";

        private readonly FileSystemItem _rootFileSystemItem;
        private readonly IDropboxService _dropboxService;
        private readonly IZinOSDesktopDropboxAccount _zinOSDesktopDropboxAccount;

        public DropboxFileSystemProvider(IDropboxService dropbox,IZinOSDesktopDropboxAccount zinOSDesktopDropboxAccount) 
        {
            _dropboxService = dropbox;
            _zinOSDesktopDropboxAccount = zinOSDesktopDropboxAccount;

            _rootFileSystemItem = new FileSystemItem { 
                IsDirectory = true,
                Path =  String.Format(@"\{0}", DropboxProviderName),
                Name = DropboxProviderName
            };
        }

        public string ProviderName
        {
            get { return DropboxProviderName; }
        }

        public FileSystemItem GetRoot(int desktopId)
        {
            return _zinOSDesktopDropboxAccount.HasAuthenticatedDropboxAccount(desktopId) ? _rootFileSystemItem : null;
        }

        public IEnumerable<FileSystemItem> GetChildrenItems(int desktopId, FileSystemItem parent)
        {
            string accessToken, tokenSecret;
            GetDesktopDropboxToken(desktopId, out accessToken, out tokenSecret);

            FormatToDropboxPath(parent);

            var fileSystemItems = _dropboxService.GetFileSystemItems(accessToken, tokenSecret, parent.Path);

            // ReSharper disable PossibleMultipleEnumeration
            FormatToZinOSPath(fileSystemItems);
            // ReSharper restore PossibleMultipleEnumeration

            // ReSharper disable PossibleMultipleEnumeration
            return fileSystemItems;
            // ReSharper restore PossibleMultipleEnumeration
        }

        public Stream GetFile(int desktopId, FileSystemItem fileSystemItem)
        {
            string accessToken, tokenSecret;
            GetDesktopDropboxToken(desktopId, out accessToken, out tokenSecret);

            FormatToDropboxPath(fileSystemItem);

            return _dropboxService.GetFileStream(accessToken, tokenSecret, fileSystemItem.Path);
        }

        public bool UpdateFile(int desktopId, string filePath, byte[] fileBytes)
        {
            string accessToken;
            string tokenSecret;

            if (!GetDesktopDropboxToken(desktopId, out accessToken, out tokenSecret))
                return false;

            var dropboxFormatPath = FormatToDropboxPath(filePath);

            return _dropboxService.UpdateFileStream(accessToken, tokenSecret, dropboxFormatPath, fileBytes);
        }

        public string CreateFile(int desktopId, string targetPath, string fileName, Stream fileStream)
        {
            string accessToken;
            string tokenSecret;

            if (!GetDesktopDropboxToken(desktopId, out accessToken, out tokenSecret))
                return null;

            var dropboxFormatTargetPath = String.Format("{0}/{1}", FormatToDropboxPath(targetPath), fileName);

            return _dropboxService.CreateFile(accessToken, tokenSecret, dropboxFormatTargetPath, fileStream);
        }

        public bool CreateDirectory(int desktopId, string dirPath)
        {
            string accessToken;
            string tokenSecret;

            if (!GetDesktopDropboxToken(desktopId, out accessToken, out tokenSecret))
                return false;

            var dropboxFormatDirPath = FormatToDropboxPath(dirPath);

            return _dropboxService.CreateDirectory(accessToken, tokenSecret, dropboxFormatDirPath);
        }

        public bool DeleteFile(int desktopId, string filePath)
        {
            string accessToken;
            string tokenSecret;

            if (!GetDesktopDropboxToken(desktopId, out accessToken, out tokenSecret))
                return false;

            var dropboxFormatFilePath = FormatToDropboxPath(filePath);

            return _dropboxService.DeleteFile(accessToken, tokenSecret, dropboxFormatFilePath);
        }

        public bool PrepareFileSystem(int desktopId)
        {
            return true;
        }

        public string CreateFile(int desktopId, string targetFileNamePath, Stream fileData)
        {
            string accessToken;
            string tokenSecret;

            if (!GetDesktopDropboxToken(desktopId, out accessToken, out tokenSecret))
                return null;

            var dropboxFormatFilePath = FormatToDropboxPath(targetFileNamePath);

            return _dropboxService.CreateFile(accessToken, tokenSecret, dropboxFormatFilePath, fileData);
        }

        private void FormatToZinOSPath(IEnumerable<FileSystemItem> items)
        {
            foreach (var item in items)
            {
                item.Path = item.Path.Replace('/', '\\');
                item.Path = String.Concat(_rootFileSystemItem.Path, item.Path);
            }
        }

        private void FormatToDropboxPath(FileSystemItem item)
        {
            item.Path = FormatToDropboxPath(item.Path);
        }

        private string FormatToDropboxPath(string path)
        {
            const string dropboxDirSepartor = "/";

            if (path == _rootFileSystemItem.Path)
                path = dropboxDirSepartor;

            path = path.Replace(_rootFileSystemItem.Path, String.Empty);
            path = path.Replace('\\', '/');

            return path;
        }

        private bool GetDesktopDropboxToken(int desktopId, out string accessToken, out string tokenSecret)
        {
            return _zinOSDesktopDropboxAccount.GetDropboxToken(desktopId, out accessToken, out tokenSecret);
        }
    }
}
