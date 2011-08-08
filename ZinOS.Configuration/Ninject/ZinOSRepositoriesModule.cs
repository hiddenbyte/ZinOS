using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ninject.Modules;
using ZinOS.Repositories.Definitions;
using ZinOS.Repositories.Implementation;

namespace ZinOS.Configuration.Ninject
{
    public class ZinOSRepositoriesModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IUsersRepository>().To<DbContextUsersRepository>();

            Bind<IZinOSAppRepository>().To<DbContextZinOSAppRepository>();

            Bind<IZinOSDesktopRepository>().To<DbContextZinOSDesktopRepository>();

            Bind<IUnitOfWorkFactory>().To<DbContextUnitOfWorkFactory>().InSingletonScope();

            ZinOSDbContext.SetInitiliazer();
       }
    }
}
