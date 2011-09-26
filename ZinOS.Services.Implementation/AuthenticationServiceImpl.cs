using System;
using ZinOS.Data.Entities;
using ZinOS.Services.Definitions.Authentication;
using ZinOS.Services.Definitions.Users;

namespace ZinOS.Services.Implementation
{
    public class AuthenticationServiceImpl : IAuthenticationService
    {
        private readonly IUserService _userService;

        public AuthenticationServiceImpl(IUserService userService)
        {
            _userService = userService;
        }

        public AuthenticationTicket Authenticate(string username, string password)
        {
            User user;
            if ((user = _userService.GetByUsername(username)) != null && user.Password == password)
            {
                return new AuthenticationTicket { 
                    UserId = user.Id.ToString(),
                    AuthenticatedAt = DateTime.Now
                };
            }
            return null;
        }
    }
}
