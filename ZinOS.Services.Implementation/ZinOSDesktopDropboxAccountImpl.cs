using ZinOS.Repositories.Definitions;
using ZinOS.Services.Definitions;
using ZinOS.Services.Definitions.Users;

namespace ZinOS.Services.Implementation
{
    public class ZinOSDesktopDropboxAccountImpl : IZinOSDesktopDropboxAccount
    {
        private readonly IUserDropboxAccountService _userDropboxAccountService;
        private readonly IZinOSDesktopRepository _zinOSDesktopRespository;
        private readonly IUnitOfWorkFactory _unitOfWorkFactory;

        public ZinOSDesktopDropboxAccountImpl(IUserDropboxAccountService userDropboxAccountService, 
            IZinOSDesktopRepository zinOSDesktopRespository, IUnitOfWorkFactory unitOfWorkFactory)
        {
            _userDropboxAccountService = userDropboxAccountService;
            _zinOSDesktopRespository = zinOSDesktopRespository;
            _unitOfWorkFactory = unitOfWorkFactory;
        }

        #region IZinOSDesktopDropboxAccount members

        public bool GetDropboxToken(int desktopId, out string accessToken, out string tokenSecret)
        {
            using (var unitOfWork = _unitOfWorkFactory.Create())
            {
                var desktop = _zinOSDesktopRespository.GetByKey(desktopId);

                return _userDropboxAccountService.GetDropboxToken(desktop.DesktopUser.Id, out accessToken, out tokenSecret);
            }
        }

        public bool HasAuthenticatedDropboxAccount(int desktopId)
        {
            string dummyToken, dummySecret;
            return GetDropboxToken(desktopId, out dummyToken, out dummySecret);
        }

        #endregion
    }
}
