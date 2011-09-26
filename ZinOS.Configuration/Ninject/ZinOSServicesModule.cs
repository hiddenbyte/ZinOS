using Ninject.Modules;
using ZinOS.Services.Definitions;
using ZinOS.Services.Definitions.Authentication;
using ZinOS.Services.Definitions.DesktopFileSystem;
using ZinOS.Services.Definitions.GoogleCaja;
using ZinOS.Services.Definitions.Users;
using ZinOS.Services.Implementation;
using ZinOS.Services.Implementation.DesktopFileSystem;
using ZinOS.Services.Implementation.GoogleCajaService;

namespace ZinOS.Configuration.Ninject
{
    public class ZinOSServicesModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IZinOSAppService>()
                .To<ZinOSAppServiceImpl>()
                .InSingletonScope();
            
            Bind<IFileSystemService>()
                .To<FileSystemServiceImpl>();

            Bind<IZinOSDesktopService>()
                .To<ZinOSDesktopServiceImpl>();

            Bind<IDropboxService>()
                .To<DropboxImpl>()
                .InSingletonScope();

            Bind<IUserService>()
                .To<UserServiceImpl>();

            Bind<IDesktopFileSystemProvider>()
                .To<LocalFileSystemProvider>();

            Bind<IDesktopFileSystemProvider>()
                .To<DropboxFileSystemProvider>();

            Bind<IDesktopFileSystem>()
                .To<DesktopFileSystemImpl>();

            Bind<IGoogleCajaService>()
                .To<GoogleCajaServiceImpl>();

            Bind<IAuthenticationService>()
                .To<AuthenticationServiceImpl>();

            Bind<IUserDropboxAccountService>()
                .To<UserDropboxAccountServiceImpl>();

            Bind<IZinOSDesktopDropboxAccount>()
                .To<ZinOSDesktopDropboxAccountImpl>();
        }
    }
}
