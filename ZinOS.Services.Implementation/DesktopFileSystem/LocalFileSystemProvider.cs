using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using ZinOS.Services.Definitions;
using ZinOS.Common;
using ZinOS.Services.Definitions.DesktopFileSystem;

namespace ZinOS.Services.Implementation.DesktopFileSystem
{
    public class LocalFileSystemProvider : IDesktopFileSystemProvider
    {
        private const string Local = "local";

        private readonly IFileSystemService _localFileSystemService;

        public LocalFileSystemProvider(IFileSystemService localFileSystemService)
        {
            _localFileSystemService = localFileSystemService;
        }

        #region DesktopFileSystemProvider members

        public string ProviderName
        {
            get { return Local; }
        }

        public FileSystemItem GetRoot(int desktopId)
        {
            string desktopLocalFileSystemPath = String.Format("{0}{1}", ApplicationSettings.Setting.DesktopsLocalFileSystemRootRelativePath, desktopId);

            _localFileSystemService.CreateDirectoryIfNotExists(FileSystemRoot.Main, desktopLocalFileSystemPath);

            return new FileSystemItem
                       {
                           IsDirectory = true,
                           Name = Local,
                           Path = String.Format(@"\{0}", Local)
                       };
        }

        public IEnumerable<FileSystemItem> GetChildrenItems(int desktopId, FileSystemItem parent)
        {
            var absolutePath = GetLocalFileSystemRelativePath(desktopId, parent.Path);

            var fileNames = _localFileSystemService.GetChildrenFileNames(FileSystemRoot.Main, absolutePath);
            var dirNames = _localFileSystemService.GetChildrenDirectoryNames(FileSystemRoot.Main, absolutePath);

            var childrens = from filename in fileNames
                            select new FileSystemItem
                                       {
                                           Path = String.Format(@"{0}\{1}", parent.Path, filename),
                                           Name = filename,
                                           IsDirectory = false
                                       };
            return childrens.Concat(from dirName in dirNames
                                    select new FileSystemItem
                                               {
                                                   Path = String.Format(@"{0}\{1}", parent.Path, dirName),
                                                   Name = dirName,
                                                   IsDirectory = true
                                               });
        }

        public Stream GetFile(int desktopId, FileSystemItem fileSystemItem)
        {
            var filePath = GetLocalFileSystemRelativePath(desktopId, fileSystemItem.Path);
            return _localFileSystemService.GetFileStream(FileSystemRoot.Main, filePath);
        }

        public bool UpdateFile(int desktopId, string filePath, byte[] fileBytes)
        {
            var desktopFilePath = GetLocalFileSystemRelativePath(desktopId, filePath);
            var memoryStream = new MemoryStream(fileBytes);
            _localFileSystemService.Save(FileSystemRoot.Main, desktopFilePath, memoryStream);
            return true;
        }

        public bool CreateFile(int desktopId, string targetPath, string fileName, Stream fileStream)
        {
            var fileRelative = String.Format("{0}\\{1}", targetPath, fileName);
            var fullDesktopPath = GetLocalFileSystemRelativePath(desktopId, fileRelative);

            return _localFileSystemService.SaveStreamToFile(FileSystemRoot.Main, fullDesktopPath, fileStream, true);
        }

        public bool CreateDirectory(int desktopId, string dirPath)
        {
            dirPath = GetLocalFileSystemRelativePath(desktopId, dirPath);
            return _localFileSystemService.CreateDirectory(FileSystemRoot.Main, dirPath) != null;
        }

        public bool DeleteFile(int desktopId, string filePath)
        {
            filePath = GetLocalFileSystemRelativePath(desktopId, filePath);
            return _localFileSystemService.DeleteFile(FileSystemRoot.Main, filePath);
        }

        #endregion

        private static string GetLocalFileSystemRelativePath(int desktopId, string relativePath)
        {
            var desktopsLocalFileSystemRoot = ApplicationSettings.Setting.DesktopsLocalFileSystemRootRelativePath;
            return String.Format("{0}\\{1}{2}", desktopsLocalFileSystemRoot, desktopId, relativePath.Remove(0, 6));
        }
    }
}
