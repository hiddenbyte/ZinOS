using System.Collections.Generic;
using System.IO;

namespace ZinOS.Services.Definitions.DesktopFileSystem
{
    public interface IDesktopFileSystem
    {
        IEnumerable<FileSystemItem> GetDesktopRootDirectories(int desktopId);

        IEnumerable<FileSystemItem> GetChildrenItems(int desktopId, FileSystemItem parentfileSystemItem);

        Stream GetFile(int desktopId, FileSystemItem fileSystemItem);

        bool UpdateFile(int desktopId, string filePath, byte[] fileContent);

        string CreateFile(int destkopId, string targetFileNamePath, byte[] fileData);

        string CreateFile(int desktopId, string targetPath, string fileName, Stream fileStream);

        bool CreateDirectory(int desktopId, string dirPath);

        bool DeleteFile(int desktopId, string filePath);

        bool PrepareFileSystem(int desktopId);
    }
}
