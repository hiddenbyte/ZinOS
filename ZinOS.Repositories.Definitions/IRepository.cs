using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ZinOS.Repositories.Definitions
{
    public interface IRepository<TKey, TEntity>
    {
        void Add(TEntity entity);
        void Remove(TEntity entity);
        void Update(TEntity entity);
        TEntity GetByKey(TKey key);
        IEnumerable<TEntity> GetAll();
    }
}
