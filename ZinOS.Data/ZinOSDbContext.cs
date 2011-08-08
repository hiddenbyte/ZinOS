using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Entity;
using ZinOS.Data.Entities;

namespace ZinOS.Data
{
    public class ZinOSDbContext : DbContext
    {
        public ZinOSDbContext()
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<DropboxUserInfomation>().HasKey(dui => dui.User);
            modelBuilder.Entity<DropboxUserInfomation>().HasKey(dui => new { dui.Token,dui.TokenSecret });
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<DropboxUserInfomation> DropboxUserInformations { get; set; }
    }
}
