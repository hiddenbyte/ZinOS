using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ZinOS.Data.Entities;

namespace ZinOS.Repositories.Implementation.Configuration
{
    public class ZinOSDesktopEntityConfiguration : IEntityConfiguration
    {
        public void Configure(System.Data.Entity.DbModelBuilder modelBuilder)
        {
            //Key
            modelBuilder.Entity<ZinOSDesktop>()
                .HasKey(desktop => desktop.Id);

            //Relations
            modelBuilder.Entity<ZinOSDesktop>()
                .HasMany<ZinOSApp>(desktop => desktop.InstalledApps)
                .WithMany();

            modelBuilder.Entity<ZinOSDesktop>()
                .HasRequired<User>(desktop => desktop.DesktopUser)
                .WithOptional();
        }
    }
}
