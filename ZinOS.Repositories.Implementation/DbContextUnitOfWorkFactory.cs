using System.Collections.Generic;
using System.Web;
using ZinOS.Repositories.Definitions;

namespace ZinOS.Repositories.Implementation
{
    public class DbContextUnitOfWorkFactory : IUnitOfWorkFactory
    {
        private const string CurrentDbContextUnitOfWorkStack = "DbContextUnitOfWorkStack";

        private Stack<ZinOSDbContext> DbContextUnitOfWorkStack
        {
            get
            {
                var stack = HttpContext.Current.Items[CurrentDbContextUnitOfWorkStack] ?? 
                    (HttpContext.Current.Items[CurrentDbContextUnitOfWorkStack] = new Stack<ZinOSDbContext>());
                return stack as Stack<ZinOSDbContext>;
            }
        }

        public IUnitOfWork Create()
        {
            return Create(false);
        }

        public IUnitOfWork Create(bool ignoreNesting)
        {
            return CreateZinOSDbContext(ignoreNesting);
        }

        internal ZinOSDbContext CreateZinOSDbContext(bool ignoreNesting)
        {
            ZinOSDbContext context;

            if (DbContextUnitOfWorkStack.Count == 0)
            {
                context = new ZinOSDbContext(this);
                DbContextUnitOfWorkStack.Push(context);
            }
            else
            {
                if (ignoreNesting)
                {
                    context = new ZinOSDbContext(this);
                    DbContextUnitOfWorkStack.Push(context);
                }
                else
                {
                    context = DbContextUnitOfWorkStack.Peek();
                    context.IncreaseNestingLevel();
                }
            }

            return context;
        }

        internal ZinOSDbContext CurrentContext
        {
            get { return CreateZinOSDbContext(false); }
        }

        internal void Release(ZinOSDbContext dbContextUnitOfWork)
        {
            if (DbContextUnitOfWorkStack.Peek() == dbContextUnitOfWork)
                DbContextUnitOfWorkStack.Pop();
        }
    }
}
