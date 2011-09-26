using System;
using System.Collections.Generic;
using ZinOS.Services.Definitions;
using ZinOS.Data.Entities;
using ZinOS.Repositories.Definitions;
using ZinOS.Common;
using System.Linq;
using System.IO;
using ZinOS.Services.Definitions.DesktopFileSystem;

namespace ZinOS.Services.Implementation
{
    public class ZinOSDesktopServiceImpl : IZinOSDesktopService
    {
        //services
        private readonly IZinOSAppService _zinOSAppService;
        private readonly IZinOSDesktopDropboxAccount _desktopDropboxAccountService;
        private readonly IDesktopFileSystem _desktopFileSystem;
        //repositories
        private readonly IZinOSDesktopRepository _zinOSDesktopRepository;
        //unifOfWorkFactory
        private readonly IUnitOfWorkFactory _unitOfWorkFactory;

        public ZinOSDesktopServiceImpl(IZinOSDesktopDropboxAccount desktopDropboxAccountService,
            IZinOSAppService zinOSAppService,
            IDesktopFileSystem desktopFileSystemService,
            IZinOSDesktopRepository zinOSDesktopRepository,
            IUnitOfWorkFactory unitOfWorkFactory)
        {
            _zinOSAppService = zinOSAppService;
            _desktopDropboxAccountService = desktopDropboxAccountService;
            _desktopFileSystem = desktopFileSystemService;
            _zinOSDesktopRepository = zinOSDesktopRepository;
            _unitOfWorkFactory = unitOfWorkFactory;
        }

        public IEnumerable<ZinOSApp> GetAvailableApps(int desktopUserId, int desktopId)
        {
            if (!IsDesktopUser(desktopId, desktopUserId)) //note: Should this  here ?
                throw new Exception();

            var apps = _zinOSAppService.GetAllAvailable(desktopId);
            
            return apps;
        }

        public IEnumerable<ZinOSApp> GetInstalledApps(int desktopUserId, int desktopId)
        {
            if (!IsDesktopUser(desktopId, desktopUserId)) //note: Should this  here ?
                throw new Exception();

            using (var uow = _unitOfWorkFactory.Create())
            {
                var desktop = _zinOSDesktopRepository.GetByKey(desktopId);
                uow.Commit();

                return desktop.InstalledApps.ToList();
            }
        }

        public void InstallApp(int desktopId, int zinOSAppId)
        {
            using (var unit = _unitOfWorkFactory.Create())
            {
                try
                {
                    var app = _zinOSAppService.GetApp(zinOSAppId);
                    _zinOSDesktopRepository.InstallApp(desktopId, app);

                    unit.Commit();
                }
                catch (Exception)
                {
                    unit.Rollback();
                    throw;
                }
            }
        }

        public void RemoveApp(int desktopId, int zinOSAppId)
        {
            _zinOSDesktopRepository.UninstallApp(desktopId, zinOSAppId);
        }

        public bool RunApp(int desktopId, int zinOSAppId)
        {
            return true;
        }

        public string GetLocalFileSystemRootPath(int desktopId)
        {
            string applicationUsersFileSystemRootPath = ApplicationSettings.Setting.DesktopsLocalFileSystemRootPath;
            return String.Format("{0}{1}", applicationUsersFileSystemRootPath, desktopId);
        }

        public bool GetDropboxToken(int desktopId, out string accessToken, out string tokenSecret)
        {
            return _desktopDropboxAccountService.GetDropboxToken(desktopId, out accessToken, out tokenSecret);
        }

        public IEnumerable<FileSystemItem> GetDesktopRootDirectories(int desktopId) 
        {
            return _desktopFileSystem.GetDesktopRootDirectories(desktopId);
        }

        public IEnumerable<FileSystemItem> GetChildrenItems(int desktopId, FileSystemItem parentItem) 
        {
            return _desktopFileSystem.GetChildrenItems(desktopId, parentItem);
        }

        public int GetDesktopIdByUserId(int userId)
        {
            var desktops = _zinOSDesktopRepository.GetAllByUserId(userId).ToList();
            var count = desktops.Count();

            if (desktops == null || count == 0 || count > 1)
                throw new Exception(
                    "User must have one and only one desktop (numberOfDesktops < 2  &&  numberOfDesktops > 1).");

            return desktops.Single().Id;
        }

        public bool IsDesktopUser(int desktopId, int desktopUserId)
        {
            return GetDesktopIdByUserId(desktopUserId) == desktopId;
        }

        public IEnumerable<FileSystemItem> GetDesktopRootDirectoriesByDesktopUserId(int desktopUserId)
        {
            int desktopId = GetDesktopIdByUserId(desktopUserId);
            return GetDesktopRootDirectories(desktopId);
        }

        public IEnumerable<FileSystemItem> GetChildrenItemsByDesktopUserId(int desktopUserId, FileSystemItem fileSystemItem)
        {
            int desktopId = GetDesktopIdByUserId(desktopUserId);
            return GetChildrenItems(desktopId, fileSystemItem);
        }

        public Stream GetFile(int desktopUserId, string filePath)
        {
            var desktopId = GetDesktopIdByUserId(desktopUserId);
            return _desktopFileSystem.GetFile(desktopId, new FileSystemItem { Path = filePath });
        }

        public bool UpdateFile(int desktopUserId, string targetFileNamePath, string base64String)
        {
            var desktopId = GetDesktopIdByUserId(desktopUserId);
            var fileContent = Convert.FromBase64String(base64String);
            return _desktopFileSystem.UpdateFile(desktopId, targetFileNamePath, fileContent);
        }

        public string CreateFile(int desktopUserId, string targetPath, string fileName, Stream fileStream)
        {
            var desktopId = GetDesktopIdByUserId(desktopUserId);
            return _desktopFileSystem.CreateFile(desktopId, targetPath, fileName, fileStream);
        }

        public string CreateFile(int desktopUserId, string targetFileNamePath, string base64String)
        {
            var destkopId = GetDesktopIdByUserId(desktopUserId);
            var fileData = Convert.FromBase64String(base64String);

            return _desktopFileSystem.CreateFile(destkopId, targetFileNamePath, fileData);
        }

        public bool CreateDirectory(int desktopUserId, string dirPath)
        {
            var desktopId = GetDesktopIdByUserId(desktopUserId);
            return _desktopFileSystem.CreateDirectory(desktopId, dirPath);
        }

        public bool DeleteFile(int desktopUserId, string filePath)
        {
            var desktopId = GetDesktopIdByUserId(desktopUserId);

            return _desktopFileSystem.DeleteFile(desktopId, filePath);
        }

        public void CreateDesktop(ZinOSDesktop newDesktop)
        {
            _zinOSDesktopRepository.Add(newDesktop);  
        }

        public void PrepareFileSystem(ZinOSDesktop desktop)
        {
            _desktopFileSystem.PrepareFileSystem(desktop.Id);
        }
    }
}
