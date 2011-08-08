using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ZinOS.Services.Definitions.Types;
using System.IO;
using ZinOS.Data.Entities;

namespace ZinOS.Services.Definitions
{
    public interface ZinOSAppService
    {
        void Submit(int ownerUserId, Stream zinOSAppZipFileStream);

        IEnumerable<ZinOSApp> GetAllApps();
        
        IEnumerable<ZinOSApp> GetAllAppsByUserId(int userId);

        ZinOSApp GetApp(int zinOSAppId);

        Stream GetAppResource(int zinOSAppId, string resourcePath);

        Stream GetAppIcon(int zinOSAppId);

        IEnumerable<ZinOSApp> GetAllAvailable(int desktopId);
    }
}
