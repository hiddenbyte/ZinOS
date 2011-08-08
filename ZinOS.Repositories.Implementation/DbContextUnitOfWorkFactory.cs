using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ZinOS.Repositories.Definitions;

namespace ZinOS.Repositories.Implementation
{
    public class DbContextUnitOfWorkFactory : IUnitOfWorkFactory
    {
        [ThreadStatic]
        private static DbContextUnitOfWork _current;

        public IUnitOfWork Create()
        {
            _current = new DbContextUnitOfWork(this);
            return _current;
        }

        internal ZinOSDbContext CurrentContext 
        {
            get
            {
                if (_current == null)
                {
                    return new ZinOSDbContext();
                }
                else 
                {
                    return _current.DbContext;
                }
            }
        }

        internal void Release(DbContextUnitOfWork dbContextUnitOfWork)
        {
            if (_current == dbContextUnitOfWork)
                _current = null;
        }
    }
}
