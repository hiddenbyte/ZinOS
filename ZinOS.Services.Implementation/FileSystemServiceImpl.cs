using System.Collections.Generic;
using System.IO;
using System.Linq;
using ZinOS.Common;
using ZinOS.Services.Definitions;

namespace ZinOS.Services.Implementation
{
    public class FileSystemServiceImpl : IFileSystemService
    {
        private const int StreamEnd = -1;
        private readonly Dictionary<FileSystemRoot, string> _rootAbsolutePath;

        public FileSystemServiceImpl()
        {
            _rootAbsolutePath = new Dictionary<FileSystemRoot, string>
            {
                { FileSystemRoot.Main, ApplicationSettings.Setting.ZinOSFileSystemRootPath },
                { FileSystemRoot.Temporary,  @"C:\zinOS\tempPath\"}
            };
        }

        public Stream GetFileStream(FileSystemRoot root, string relFilePath)
        {
            var rootPath = getFileSystemRootAbsolutePath(root);
            var absFilePath = Path.Combine(rootPath, relFilePath);
            return File.OpenRead(absFilePath);
        }

        public void Save(FileSystemRoot root, string path, Stream fileStream)
        {
            string rootPath;

            if (!_rootAbsolutePath.TryGetValue(root, out rootPath)) 
                return;

            var fileToSave = File.Create(Path.Combine(rootPath, path));

            int read;
            while ((read = fileStream.ReadByte()) != StreamEnd)
                fileToSave.WriteByte((byte)read);

            fileToSave.Flush();
            fileToSave.Close();
        }

        public IEnumerable<string> GetChildrenFileNames(FileSystemRoot root, string relativePath)
        {
            string rootPath;
            if (!_rootAbsolutePath.TryGetValue(root, out rootPath))
                return null;

            var absPath = Path.Combine(rootPath, relativePath);

            var fileNames = (from filename in Directory.EnumerateFiles(absPath)
                             select Path.GetFileName(filename));
            return fileNames;
        }

        public string CreateDirectory(FileSystemRoot root, string directoryPath)
        {
            string rootPath;

            if (_rootAbsolutePath.TryGetValue(root, out rootPath))
            {
                string absolutePath = Path.Combine(rootPath, directoryPath);

                Directory.CreateDirectory(absolutePath);

                return absolutePath;
            }

            return null;
        }

        public void CopyAll(FileSystemRoot root, string srcDir, string destDir)
        {
            string rootPath;

            if (_rootAbsolutePath.TryGetValue(root, out rootPath))
            {
                string src = Path.Combine(rootPath, srcDir);
                string dest = Path.Combine(rootPath, destDir);

                copyAll(src, dest);
            }
        }

        public bool SaveStreamToFile(FileSystemRoot root, string relativeFilePath, Stream fileStream, bool newFile)
        {
            string rootPath;
            
            if (_rootAbsolutePath.TryGetValue(root, out rootPath))
            {
                var absolutePath = Path.Combine(rootPath, relativeFilePath);

                using (var localFileStream = new FileStream(absolutePath, FileMode.CreateNew))
                {
                    fileStream.CopyTo(localFileStream);
                    localFileStream.Flush();
                }

                return true;
            }

            return false;
        }

        public bool DeleteFile(FileSystemRoot fileSystemRoot, string filePath)
        {
            var absolutePath = getFileSystemRootAbsolutePath(fileSystemRoot);
            var absoluteFilePath = Path.Combine(absolutePath, filePath);

            if (Directory.Exists(absoluteFilePath))
            {
                Directory.Delete(absoluteFilePath, true);
                return true;
            }

            if (File.Exists(absoluteFilePath))
            {
                File.Delete(absoluteFilePath);
                return true;
            }

            return false;
        }

        public bool CreateDirectoryIfNotExists(FileSystemRoot fileSystemRoot, string desktopLocalFileSystemPath)
        {
            var rootAbsPath = getFileSystemRootAbsolutePath(fileSystemRoot);
            var desktopLocalFileSystemAbsPath = Path.Combine(rootAbsPath, desktopLocalFileSystemPath);

            if (Directory.Exists(desktopLocalFileSystemAbsPath))
            {
                Directory.CreateDirectory(desktopLocalFileSystemPath);
                return true;
            }

            return false;
        }

        public IEnumerable<string> GetChildrenDirectoryNames(FileSystemRoot root, string relativePath)
        {
            string rootPath;
            if (!_rootAbsolutePath.TryGetValue(root, out rootPath))
                return null;

            var absPath = Path.Combine(rootPath, relativePath);

            var dirNames = (from filename in Directory.EnumerateDirectories(absPath)
                             select Path.GetFileName(filename));
            return dirNames;
        }

        private string getFileSystemRootAbsolutePath(FileSystemRoot fileSystemRoot)
        {
            string rootPath;
            return _rootAbsolutePath.TryGetValue(fileSystemRoot, out rootPath) ? rootPath : null;
        }

        #region CopyAll method helpers

        private static void copyAll(string srcDir, string destDir)
        {
            //copy  files
            var srcFiles = Directory.EnumerateFiles(srcDir);
            foreach (string srcFile in srcFiles)
            {
                File.Copy(
                    srcFile,
                    Path.Combine(destDir, Path.GetFileName(srcFile))
                );
            }

            //copy subdirs        
            var srcSubDirs = from subDir in Directory.EnumerateDirectories(srcDir)
                             where !IsSubDirectoryOrEqual(subDir, destDir)
                             select subDir;

            foreach (string srcSubDir in srcSubDirs)
            {
                string destSubdir = Path.Combine(destDir, Path.GetFileName(srcSubDir));
                Directory.CreateDirectory(destSubdir);
                copyAll(srcSubDir, destSubdir);
            }
        }

        private static bool IsSubDirectoryOrEqual(string dir, string subdir)
        {
            var dirInfo = new DirectoryInfo(dir);
            var subdirInfo = new DirectoryInfo(subdir);
            return subdirInfo.FullName.IndexOf(dirInfo.FullName) == 0;
        }
        
        #endregion
    }
}
