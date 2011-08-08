using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Entity;

namespace ZinOS.Repositories.Implementation.Configuration
{
    public interface IEntityConfiguration
    {
        void Configure(DbModelBuilder modelBuilder);
    }
}
