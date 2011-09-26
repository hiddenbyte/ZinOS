using System;
using System.Collections.Generic;
using System.Linq;
using ZinOS.Common;
using ZinOS.Data.Entities;
using ZinOS.Repositories.Definitions;
using ZinOS.Services.Definitions;
using ZinOS.Services.Definitions.Users;

namespace ZinOS.Services.Implementation
{
    public class UserServiceImpl : IUserService
    {
        private static readonly DropboxUserInformation EmptyDropboxInformation = new DropboxUserInformation();

        private readonly IUsersRepository _userRepository;
        private readonly IZinOSDesktopService _zinOSDesktopService;

        private readonly IUnitOfWorkFactory _unitOfWorkFactory;

        public UserServiceImpl(IUsersRepository userRepository, IZinOSDesktopService zinOSDesktopService, IUnitOfWorkFactory unitOfWorkFactory)
        {
            _userRepository = userRepository;
            _zinOSDesktopService = zinOSDesktopService;
            _unitOfWorkFactory = unitOfWorkFactory;
        }

        public string GetLocalFileSystemRootPath(int userId)
        {
            string applicationUsersFileSystemRootPath = ApplicationSettings.Setting.UsersFileSystemRootPath;
            return String.Format("{0}{1}", applicationUsersFileSystemRootPath, userId);
        }

        public void SetDropboxRequestToken(int userId, string token, string tokenSecret)
        {
            User user = _userRepository.GetByKey(userId);

            user.DropboxUserInformation.Token = token;
            user.DropboxUserInformation.TokenSecret = tokenSecret;

            _userRepository.Update(user);
        }

        public bool GetDropboxToken(int userId, out string token, out string tokenSecret)
        {
            User user = _userRepository.GetByKey(userId);

            token = user.DropboxUserInformation.Token;
            tokenSecret = user.DropboxUserInformation.TokenSecret;

            return !user.DropboxUserInformation.IsEmpty();
        }

        public User GetByUsername(string username)
        {
            return _userRepository.GetByUsername(username);
        }

        public User GetUserById(int userId)
        {
            User user = _userRepository.GetByKey(userId);

            if (user == null)
                throw new Exception();

            return user;
        }

        public void CreateUser(User newUser)
        {
            var errors = GetErrors(newUser);

            if (errors.Count() > 0)
                throw new ValidationException(errors);


            ZinOSDesktop newDesktop = null;
            using (var uow = _unitOfWorkFactory.Create())
            {
                try
                {
                    newUser.DropboxUserInformation = EmptyDropboxInformation;

                    _userRepository.Add(newUser);

                    newDesktop = new ZinOSDesktop
                                         {
                                             DesktopUser = newUser
                                         };

                    _zinOSDesktopService.CreateDesktop(newDesktop);

                    uow.Commit();
                }
                catch (Exception e)
                {
                    uow.Rollback();
                    HandleRepositoryException(e);
                    throw;
                }
            }
            _zinOSDesktopService.PrepareFileSystem(newDesktop);
        }

        public void ChangeUserPassword(int userId,string newPassword)
        {
            var user = _userRepository.GetByKey(userId);
            if(user == null)
                throw new ValidationException("userId", "User not found");
            
            user.Password = newPassword;

            _userRepository.Update(user);
        }

        private static void HandleRepositoryException(Exception e)
        {
            var repositoryException = e as RepositoryException;

            if (repositoryException == null)
                return;

            var validationErrors = new List<ValidationError>();
            foreach (var error in repositoryException.Errors)
                validationErrors.Add(new ValidationError(error.EntityAttributeName, error.Message));

            if (validationErrors.Count > 0)
                throw new ValidationException(validationErrors);
        }

        private static IEnumerable<ValidationError> GetErrors(User user)
        {
            const int usernameMaxLength = 15;

            var errors = new List<ValidationError>();

            if (String.IsNullOrEmpty(user.Name) || String.IsNullOrWhiteSpace(user.Name))
                errors.Add(new ValidationError("Name", "Name can not be blank"));

            if (String.IsNullOrEmpty(user.Username) || String.IsNullOrWhiteSpace(user.Username))
                errors.Add(new ValidationError("Username", "Username can not be blank"));

            if (!String.IsNullOrEmpty(user.Username) && user.Username.Length > usernameMaxLength)
                errors.Add(new ValidationError("Username", 
                    String.Format("Username must not exceed {0} characters",usernameMaxLength)));

            if (String.IsNullOrEmpty(user.Password) || String.IsNullOrWhiteSpace(user.Password))
                errors.Add(new ValidationError("Password", "Password can not be blank"));

            return errors;
        }
    }

    internal static class DropboxUserInformationExtensions
    {
        public static bool IsEmpty(this DropboxUserInformation dropboxUserInformation) 
        {
            return dropboxUserInformation.Token == null || dropboxUserInformation.TokenSecret == null;
        }
    }
}
