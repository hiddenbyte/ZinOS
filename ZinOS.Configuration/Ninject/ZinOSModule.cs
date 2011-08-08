using Ninject.Modules;
using ZinOS.Services.Definitions;
using ZinOS.Services.Definitions.Authentication;
using ZinOS.Services.Definitions.DesktopFileSystem;
using ZinOS.Services.Implementation;
using ZinOS.Services.Implementation.DesktopFileSystem;

namespace ZinOS.Configuration.Ninject
{
    public class ZinOSModule : NinjectModule
    {
        public override void Load()
        {
            Bind<ZinOSAppService>()
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
        }
    }
}
