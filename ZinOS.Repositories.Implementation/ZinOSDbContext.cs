using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Entity;
using ZinOS.Data.Entities;
using System.ComponentModel.DataAnnotations;
using ZinOS.Repositories.Implementation.Configuration;

namespace ZinOS.Repositories.Implementation
{
    public class ZinOSDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<ZinOSApp> ZinOSApps { get; set; }
        public DbSet<ZinOSDesktop> ZinOSDesktop { get; set; }

        public bool AllowSaveChanges
        {
            get;
            set;
        }

        public ZinOSDbContext(bool allowSaveChanges)
        {
            AllowSaveChanges = allowSaveChanges;
        }

        public ZinOSDbContext()
        {
            AllowSaveChanges = true;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            (new UserEntityConfiguration()).Configure(modelBuilder);
            (new ZinOSDesktopEntityConfiguration()).Configure(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }

        public override int SaveChanges()
        {
            if (AllowSaveChanges)
                return base.SaveChanges();
            return 0;
        }

        protected override void Dispose(bool disposing)
        {
            if(AllowSaveChanges)
                base.Dispose(disposing);
        }

        public static void SetInitiliazer() 
        {
            Database.SetInitializer(new ZinOSDbContextInitializer());
        }
    }

    public class ZinOSDbContextInitializer : DropCreateDatabaseIfModelChanges<ZinOSDbContext> 
    {
        protected override void Seed(ZinOSDbContext context)
        {
            base.Seed(context);

            var user = new User
                           {
                               DropboxUserInformation = new DropboxUserInformation(),
                               Username = "mehul",
                               Password = "mehul",
                               Name = "Mehul Ira"
                           };
        
            context.Users.Add(user);

            var desktop = new ZinOSDesktop()
            {
                DesktopUser = user
            };

            context.ZinOSDesktop.Add(desktop);

            context.SaveChanges();
        }
    }
}
