using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ZinOS.Repositories.Definitions;

namespace ZinOS.Repositories.Implementation
{
    public class DbContextUnitOfWork : IUnitOfWork
    {
        private ZinOSDbContext _dbContext;
        private DbContextUnitOfWorkFactory _createdByFactory;

        public DbContextUnitOfWork(DbContextUnitOfWorkFactory factory)
        {
            _createdByFactory = factory;
            _dbContext = new ZinOSDbContext(false);
        }

        public ZinOSDbContext DbContext
        {
            get { return _dbContext; }
        }

        //obsolete - method is mantained to not break existing code
        public void Init()
        {
            //_dbContext = new ZinOSDbContext(false);
        }

        public void Commit()
        {
            _dbContext.AllowSaveChanges = true;
            _dbContext.SaveChanges();
        }

        public void Rollback()
        {
        }

        public void Dispose()
        {
            _dbContext.Dispose();
            _dbContext = null;
            _createdByFactory.Release(this);
        }
    }
}
