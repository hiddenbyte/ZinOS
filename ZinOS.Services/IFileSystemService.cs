using System.Collections.Generic;
using System.IO;

namespace ZinOS.Services.Definitions
{
    public interface IFileSystemService
    {
        /// <summary>
        /// This method is used to save any file on the specified <paramref name="path"/>.
        /// </summary>
        /// <param name="root">Root path</param>
        /// <param name="path">Must be relative to the path returned by the GetRootPath method</param>
        /// <param name="fileStream">a stream representing the file data</param>
        void Save(FileSystemRoot root,string path, Stream fileStream);
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="root"></param>
        /// <param name="relativePath"></param>
        /// <returns></returns>
        IEnumerable<string> GetChildrenFileNames(FileSystemRoot root, string relativePath);
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="root"></param>
        /// <param name="relativePath"></param>
        /// <returns></returns>
        IEnumerable<string> GetChildrenDirectoryNames(FileSystemRoot root, string relativePath);

        /// <summary>
        /// This method allows to create all directories and subdirectories specified by <paramref name="directoryPath"/>
        /// </summary>
        /// <param name="root">Root path</param>
        /// <param name="directoryPath">This path is relative to <paramref name="root"/></param>
        string CreateDirectory(FileSystemRoot root, string directoryPath);

        /// <summary>
        /// Returns a file's Stream
        /// </summary>
        /// <param name="root">Root path</param>
        /// <param name="relFilePath">file path, relative to <paramref name="root"/></param>
        /// <returns>Returns a file's Stream</returns>
        Stream GetFileStream(FileSystemRoot root, string relFilePath);

        /// <summary>
        /// This method copies the content of path <paramref name="srcDir"/> to <paramref name="destDir"/>
        /// </summary>
        /// <param name="fileSystemRoot">Root path</param>
        /// <param name="srcDir">source path, relative to<paramref name="fileSystemRoot"/></param>
        /// <param name="destDir">destination path, relative to<paramref name="fileSystemRoot"/></param>
        void CopyAll(FileSystemRoot fileSystemRoot, string srcDir, string destDir);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="root"></param>
        /// <param name="relativefilePath"></param>
        /// <param name="fileStream"></param>
        /// <param name="newFile"></param>
        /// <returns></returns>
        bool SaveStreamToFile(FileSystemRoot root, string relativefilePath, Stream fileStream, bool newFile);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileSystemRoot"></param>
        /// <param name="filePath"></param>
        /// <returns></returns>
        bool DeleteFile(FileSystemRoot fileSystemRoot, string filePath);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileSystemRoot"></param>
        /// <param name="desktopLocalFileSystemPath"></param>
        /// <returns></returns>
        bool CreateDirectoryIfNotExists(FileSystemRoot fileSystemRoot, string desktopLocalFileSystemPath);
    }

    public enum FileSystemRoot
    {
        Main,
        Temporary
    }
}
