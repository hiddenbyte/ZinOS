﻿using ZinOS.Data.Entities;
using System.Collections.Generic;
using System.IO;

namespace ZinOS.Services.Definitions
{
    public interface IZinOSDesktopService
    {
        int GetDesktopIdByUserId(int userId);
        void CreateDesktop(ZinOSDesktop newDesktop);
        bool IsDesktopUser(int destkopId, int desktopUserId);

        #region Desktop's ZinOSApps methods

        IEnumerable<ZinOSApp> GetAvailableApps(int desktopUserId, int desktopId);
        IEnumerable<ZinOSApp> GetInstalledApps(int desktopUserId, int desktopId);
        void InstallApp(int desktopId, int zinOSAppId);
        bool RunApp(int desktopId, int zinOSAppId);

        #endregion

        #region Desktop Dropbox related methods

        string GetLocalFileSystemRootPath(int desktopId);
        bool GetDropboxToken(int desktopId, out string accessToken, out string tokenSecret);

        #endregion

        #region DesktopFileSystem methods
        
        IEnumerable<FileSystemItem> GetDesktopRootDirectories(int desktopId);
        IEnumerable<FileSystemItem> GetDesktopRootDirectoriesByDesktopUserId(int desktopUserId);
        IEnumerable<FileSystemItem> GetChildrenItems(int desktopId, FileSystemItem parentItem);
        IEnumerable<FileSystemItem> GetChildrenItemsByDesktopUserId(int desktopUserId, FileSystemItem fileSystemItem);
        Stream GetFile(int desktopUserId, string filePath);
        bool UpdateFile(int desktopUserId, string filePath, string fileContent);
        bool CreateFile(int desktopUserId, string targetPath, string fileName, Stream fileStream);
        bool CreateDirectory(int desktopUserId, string dirPath);
        bool DeleteFile(int desktopUserId, string filePath);
        
        #endregion
    }
}
