using System.Collections.Generic;
using System.IO;

namespace ZinOS.Services.Definitions.DesktopFileSystem
{
    public interface IDesktopFileSystemProvider
    {
        string ProviderName { get; }
        FileSystemItem GetRoot(int desktopId);
        IEnumerable<FileSystemItem> GetChildrenItems(int desktopId, FileSystemItem parent);
        Stream GetFile(int desktopId, FileSystemItem fileSystemItem);
        bool UpdateFile(int desktopId, string filePath, byte[] fileBytes);
        string CreateFile(int desktopId, string targetPath, string fileName, Stream fileStream);
        string CreateFile(int destkopId, string targetFileNamePath, Stream fileData);
        bool CreateDirectory(int desktopId, string dirPath);
        bool DeleteFile(int desktopId, string filePath);
        bool PrepareFileSystem(int desktopId);
    }
}
