using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ZinOS.Repositories.Definitions
{
    public interface IUnitOfWorkFactory
    {
        IUnitOfWork Create();
    }
}
