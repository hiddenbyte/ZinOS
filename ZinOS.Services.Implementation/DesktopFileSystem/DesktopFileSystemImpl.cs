using System;
using System.Collections.Generic;
using ZinOS.Services.Definitions;
using System.Collections.Concurrent;
using System.IO;
using ZinOS.Services.Definitions.DesktopFileSystem;

namespace ZinOS.Services.Implementation.DesktopFileSystem
{
    public class DesktopFileSystemImpl : IDesktopFileSystem
    {
        private const char DirectoryPathSeparator = '\\';

        private readonly ConcurrentDictionary<string, IDesktopFileSystemProvider> _fileSystemProviders;

        public DesktopFileSystemImpl(IEnumerable<IDesktopFileSystemProvider> fileSystemProviders)
        {
            _fileSystemProviders = new ConcurrentDictionary<string, IDesktopFileSystemProvider>();

            foreach (var fileSystemProvider in fileSystemProviders)
                _fileSystemProviders[fileSystemProvider.ProviderName] = fileSystemProvider;
        }

        #region DesktopFileSystem members

        public IEnumerable<FileSystemItem> GetDesktopRootDirectories(int desktopId)
        {
            var roots = new List<FileSystemItem>();

            var providers = _fileSystemProviders.Values;
            
            foreach (var provider in providers) 
            {
                FileSystemItem root = provider.GetRoot(desktopId);

                if (root != null)
                    roots.Add(root);
            }

            return roots;
        }

        public IEnumerable<FileSystemItem> GetChildrenItems(int desktopId, FileSystemItem parentfileSystemItem)
        {
            if (validatePath(parentfileSystemItem.Path))
            {
                string providerName = getProviderName(parentfileSystemItem.Path);

                var provider = _fileSystemProviders[providerName];

                if (provider == null) //Invalid path 'fileSystemItem.Path'
                    return null; //TODO: throw exception

                return provider.GetChildrenItems(desktopId, parentfileSystemItem);
            }

            //Invalid path 'fileSystemItem.Path'
            return null; //TODO: throw exception
        }

        public Stream GetFile(int desktopId, FileSystemItem fileSystemItem)
        {
            if (!validatePath(fileSystemItem.Path))
                return null;

            var providerName = getProviderName(fileSystemItem.Path);
            var provider = _fileSystemProviders[providerName];

            return provider == null ? null : provider.GetFile(desktopId, fileSystemItem);
        }

        public bool UpdateFile(int desktopId, string filePath, byte[] fileContent)
        {
            IDesktopFileSystemProvider provider;
            return GetPathProvider(filePath, out provider) && provider.UpdateFile(desktopId, filePath, fileContent);
        }

        public bool UpdateFile(int desktopId, string filePath, string fileContent)
        {
            IDesktopFileSystemProvider provider;
            if (GetPathProvider(filePath, out provider))
            {
                var fileBytes = Array.ConvertAll(fileContent.ToCharArray(), Convert.ToByte);
                return provider.UpdateFile(desktopId, filePath, fileBytes);
            }
            return false;
        }

        public bool CreateFile(int desktopId, string targetPath, string fileName, Stream fileStream)
        {
            IDesktopFileSystemProvider provider;   
            return GetPathProvider(targetPath, out provider) && provider.CreateFile(desktopId, targetPath, fileName, fileStream);
        }

        public bool CreateDirectory(int desktopId, string dirPath)
        {
            IDesktopFileSystemProvider provider;
            return GetPathProvider(dirPath, out provider) && provider.CreateDirectory(desktopId, dirPath);
        }

        public bool DeleteFile(int desktopId, string filePath)
        {
            IDesktopFileSystemProvider provider;
            return GetPathProvider(filePath, out provider) && provider.DeleteFile(desktopId, filePath);
        }

        #endregion

        private bool validatePath(string path) 
        {
            return path != null;
        }

        private string getProviderName(string path)
        {
            var splittedPath = path.Split(new[] {DirectoryPathSeparator});
            return splittedPath[1];
        }

        private bool GetPathProvider(string filePath, out IDesktopFileSystemProvider provider) 
        {
            if (!validatePath(filePath))
            {
                provider = null;
                return false;
            }

            var providerName = getProviderName(filePath);
            provider = _fileSystemProviders[providerName];
            return provider != null;
        }
    }
}
