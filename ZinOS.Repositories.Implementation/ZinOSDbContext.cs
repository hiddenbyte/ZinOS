using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using ZinOS.Data.Entities;
using ZinOS.Repositories.Definitions;
using ZinOS.Repositories.Implementation.Configuration;

namespace ZinOS.Repositories.Implementation
{
    public class ZinOSDbContext : DbContext, IUnitOfWork
    {
        private int _nestingLevel;
        private readonly DbContextUnitOfWorkFactory _dbContextFactory;
        
        public DbSet<User> Users { get; set; }
        public DbSet<ZinOSApp> ZinOSApps { get; set; }
        public DbSet<ZinOSDesktop> ZinOSDesktop { get; set; }

        public ZinOSDbContext(DbContextUnitOfWorkFactory unitOfWorkFactory)
        
        {
            _nestingLevel = 0;
            _dbContextFactory = unitOfWorkFactory;
        }

        #region DbContext members

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            (new UserEntityConfiguration()).Configure(modelBuilder);
            (new ZinOSDesktopEntityConfiguration()).Configure(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }

        public override int SaveChanges()
        {
            try
            {
                return _nestingLevel > 0 ? 0 : base.SaveChanges();
            }
            catch(DbUpdateException e)
            {
                check_uc_Username_Constraint(e);
                throw;
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (_nestingLevel == 0)
            {
                base.Dispose(disposing);
                _dbContextFactory.Release(this);
            }
            DecreaseNestingLevel();
        }

        #endregion

        internal void IncreaseNestingLevel()
        {
            _nestingLevel += 1;
        }

        internal void DecreaseNestingLevel()
        {
            _nestingLevel -= 1;
        }

        #region Implementation of IUnitOfWork

        public void Commit()
        {
            SaveChanges();
        }

        public void Rollback()
        {
        }

        #endregion

        public static void SetInitiliazer()
        {
            Database.SetInitializer(new ZinOSDbContextInitializer());
        }
    
        private void check_uc_Username_Constraint(DbUpdateException e)
        {
            var updateException = e.InnerException as UpdateException;
            if(updateException != null)
            {
                var sqlException = updateException.InnerException as SqlException;
                if (sqlException != null && sqlException.Message.Contains("uc_Username"))
                    throw new RepositoryException(typeof (User), "Username", "This username already exists.");
            }
        }
    }

    public class ZinOSDbContextInitializer : DropCreateDatabaseIfModelChanges<ZinOSDbContext>
    {
        protected override void Seed(ZinOSDbContext context)
        {
            base.Seed(context);

            context.Database.ExecuteSqlCommand("ALTER TABLE Users ADD CONSTRAINT uc_Username UNIQUE(Username)");

            context.SaveChanges();
        }
    }
}
