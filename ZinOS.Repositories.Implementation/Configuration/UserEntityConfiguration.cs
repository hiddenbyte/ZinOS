using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ZinOS.Data.Entities;
using System.Data.Entity;

namespace ZinOS.Repositories.Implementation.Configuration
{
    public class UserEntityConfiguration : IEntityConfiguration
    {
        public void Configure(DbModelBuilder modelBuilder)
        {
            //define entity's key
            modelBuilder.Entity<User>()
                .HasKey(user => user.Id)
                .Property(user => user.Id);

            //define entity's  relationships
            modelBuilder.Entity<User>()
                .HasMany(u => u.OwnedZinOSApps)
                .WithRequired(app => app.Owner);

            modelBuilder.Entity<User>().Property(user => user.Username).HasMaxLength(15);

            modelBuilder.ComplexType<DropboxUserInformation>();
        }
    }
}
