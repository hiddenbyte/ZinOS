using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ZinOS.Repositories.Definitions
{
    public interface IUnitOfWork : IDisposable
    {
        void Init();
        void Commit();
        void Rollback();
    }
}
