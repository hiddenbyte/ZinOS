using System;
using System.Collections.Generic;
using ZinOS.Common;
using ZinOS.Services.Definitions;
using ZinOS.Services.Definitions.DesktopFileSystem;
using ZinOS.Services.Definitions.Types;
using AppLimit.CloudComputing.SharpBox.DropBox;
using AppLimit.CloudComputing.SharpBox;
using System.IO;

namespace ZinOS.Services.Implementation
{
    public class DropboxImpl : IDropboxService
    {
        private static string RequestTokenUrl
        {
            get
            {
                return "https://api.dropbox.com/0/oauth/request_token";
            }
        }

        private static string UserAuthorizationUrl
        {
            get
            {
                return "https://www.dropbox.com/0/oauth/authorize";
            }
        }

        private static string AccessTokenUrl
        {
            get
            {
                return "https://api.dropbox.com/0/oauth/access_token";
            }
        }

        public OAuthEndpoints GetDroboxOAuthEndpoints()
        {
            return new OAuthEndpoints()
            {
                UserAuthorization = UserAuthorizationUrl,
                AccessToken = AccessTokenUrl,
                RequestToken = RequestTokenUrl
            };
        }

        public string GetConsumerKey()
        {
            return ApplicationSettings.Setting.DropboxAPIConsumerKey;
        }

        public string GetConsumerSecret()
        {
            return ApplicationSettings.Setting.DropobxConsumerSecret;
        }

        public string CreateFile(string accessToken, string accessTokenSecret, string filePath, Stream fileStream)
        {
            var cloudStorage = openCloudStorage(accessToken, accessTokenSecret);

            if (cloudStorage == null)
                return null;
            
            var fileSystemEntry = cloudStorage.CreateFile(filePath);
            
            var destFileStream = fileSystemEntry.GetContentStream(FileAccess.Write);

            fileStream.CopyTo(destFileStream);
            
            destFileStream.Flush();
            destFileStream.Close();

            return fileSystemEntry.Name;
        }

        public bool CreateDirectory(string accessToken, string accessTokenSecret, string dirPath)
        {
            var cloudStorage = openCloudStorage(accessToken, accessTokenSecret);

            if (cloudStorage == null)
                return false;

            var newFolder = cloudStorage.CreateFolder(dirPath);

            return newFolder != null;
        }

        public IEnumerable<FileSystemItem> GetRootFileSystemItems(string accessToken, string accessTokenSecret)
        {
            return GetFileSystemItems(accessToken, accessTokenSecret, "/");
        }

        public IEnumerable<FileSystemItem> GetFileSystemItems(string accessToken, string accessTokenSecret, string path)
        {
            var cloudStorage = openCloudStorage(accessToken, accessTokenSecret);

            if (cloudStorage != null)
            {
                var folder = cloudStorage.GetFolder(path);
                return getDirectoryFileSystemItems(folder, path);
            }

            return null;
        }

        public bool DeleteFile(string accessToken, string tokenSecret, string filePath)
        {
            var storage = openCloudStorage(accessToken, tokenSecret);

            return storage != null && storage.DeleteFileSystemEntry(filePath);
        }

        public Stream GetFileStream(string accessToken, string accessTokenSecret, string path) 
        {
            var cloudStorage = openCloudStorage(accessToken, accessTokenSecret);

            if (cloudStorage != null)
            {
                var root = cloudStorage.GetRoot();
                var file = cloudStorage.GetFile(path, root);
                return file.GetContentStream(FileAccess.Read);
            }

            return null;
        }

        public bool UpdateFileStream(string accessToken, string accessTokenSecret, string path, byte[] fileContent)
        {
            var cloudStorage = openCloudStorage(accessToken, accessTokenSecret);

            if (cloudStorage != null)
            {
                var root = cloudStorage.GetRoot();
                var file = cloudStorage.GetFile(path, root);
                var stream = file.GetContentStream(FileAccess.Write);
                stream.Write(fileContent, 0, fileContent.Length);
                stream.Flush();
                stream.Close();
                return true;
            }

            return false;
        }

        #region private methods

        private CloudStorage openCloudStorage(string accessToken, string accessTokenSecret)
        {
            //prepare dropbox credentials
            DropBoxCredentialsToken credentials = new DropBoxCredentialsToken(GetConsumerKey(),
                                                        GetConsumerSecret(),
                                                        accessToken,
                                                        accessTokenSecret);

            //prepare drobpox configuration
            ICloudStorageConfiguration configuration = DropBoxConfiguration.GetStandardConfiguration();

            //create a cloud storage
            CloudStorage storage = new CloudStorage();

            if (storage.Open(configuration, credentials) == null)
                return null;

            return storage;
        }

        private IEnumerable<FileSystemItem> getDirectoryFileSystemItems(ICloudDirectoryEntry directory,string path) 
        {
            List<FileSystemItem> fileEntries = new List<FileSystemItem>();

            foreach (ICloudFileSystemEntry fsentry in directory)
            {
                if (fsentry is ICloudDirectoryEntry)
                    fileEntries.Add(new FileSystemItem() { IsDirectory = true, Name = fsentry.Name, Path = concatPath(path, fsentry.Name) });
                else
                    fileEntries.Add(new FileSystemItem() { IsDirectory = false, Name = fsentry.Name, Path = concatPath(path, fsentry.Name) });
            }

            return fileEntries;
        }

        private string concatPath(string path, string filename) 
        {
            if (path.Length < 2) 
            {
                path = String.Empty;
            }

            return String.Format("{0}/{1}", path, filename);
        }

        #endregion private methods
    }
}
