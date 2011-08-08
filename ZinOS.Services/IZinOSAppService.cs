using System.Collections.Generic;
using System.IO;
using ZinOS.Data.Entities;

namespace ZinOS.Services.Definitions
{
    public interface IZinOSAppService
    {
        void Submit(int ownerUserId, Stream zinOSAppZipFileStream);

        void Update(int ownerUserId, int zinOsAppId, Stream zinOSAppZipFileStream);

        IEnumerable<ZinOSApp> GetAllApps();
        
        IEnumerable<ZinOSApp> GetAllAppsByUserId(int userId);

        ZinOSApp GetApp(int zinOSAppId);

        Stream GetAppResource(int zinOSAppId, string resourcePath);

        Stream GetAppIcon(int zinOSAppId);

        IEnumerable<ZinOSApp> GetAllAvailable(int desktopId);
    }
}
