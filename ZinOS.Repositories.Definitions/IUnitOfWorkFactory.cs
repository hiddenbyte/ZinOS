namespace ZinOS.Repositories.Definitions
{
    public interface IUnitOfWorkFactory
    {
        IUnitOfWork Create();
        IUnitOfWork Create(bool ignoreNesting);
    }
}
