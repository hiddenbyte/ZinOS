using ZinOS.Repositories.Definitions;
using ZinOS.Services.Definitions.Users;

namespace ZinOS.Services.Implementation
{
    public class UserDropboxAccountServiceImpl : IUserDropboxAccountService
    {
        private readonly IUsersRepository _userRepository;
    
        public UserDropboxAccountServiceImpl(IUsersRepository userRepository) 
        {
            _userRepository = userRepository;
        }

        public bool GetDropboxToken(int userId, out string token, out string tokenSecret)
        {
            var user = _userRepository.GetByKey(userId);

            token = user.DropboxUserInformation.Token;
            tokenSecret = user.DropboxUserInformation.TokenSecret;

            return user.DropboxUserInformation.HasValue;
        }

        public void SetDropboxRequestToken(int userId, string token, string tokenSecret)
        {
            var user = _userRepository.GetByKey(userId);

            user.DropboxUserInformation.Token = token;
            user.DropboxUserInformation.TokenSecret = tokenSecret;

            _userRepository.Update(user);
        }
    }
}
