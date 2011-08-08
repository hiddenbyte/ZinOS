using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ZinOS.Repositories.Definitions;
using System.Data;

namespace ZinOS.Repositories.Implementation
{
    public abstract class AbstractDbContextRepository<TKey, TEntity> : IRepository<TKey, TEntity> where TEntity : class
    {
        public readonly DbContextUnitOfWorkFactory _unitOfWorkFactory;

        public AbstractDbContextRepository(DbContextUnitOfWorkFactory unitOfWorkFactory) 
        {
            _unitOfWorkFactory = unitOfWorkFactory;
        }

        protected ZinOSDbContext CurrentContext
        {
            get {
                return _unitOfWorkFactory.CurrentContext;
            }
        }

        public virtual void Add(TEntity entity)
        {
            using (var db = CurrentContext)
            {
                db.Entry<TEntity>(entity).State = EntityState.Added;
                db.SaveChanges();
            }
        }

        public virtual void Remove(TEntity entity)
        {
            using (var db = CurrentContext)
            {
                db.Entry<TEntity>(entity).State = EntityState.Deleted;
                db.SaveChanges();
            }
        }

        public virtual void Update(TEntity entity)
        {
            using (var db = CurrentContext)
            {
                db.Entry<TEntity>(entity).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public virtual TEntity GetByKey(TKey key)
        {
            using (var db = CurrentContext)
            {
                return db.Set<TEntity>().Find(key);
            }
        }

        public virtual IEnumerable<TEntity> GetAll()
        {
            using (var db = CurrentContext)
            {
                return db.Set<TEntity>().ToArray();
            }
        }
    }
}
