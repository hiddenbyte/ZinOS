namespace ZinOS.Services.Definitions.Users
{
    public interface IUserDropboxAccountService
    {
        bool GetDropboxToken(int userId, out string token, out string tokenSecret);
        void SetDropboxRequestToken(int userId, string token, string tokenSecret);
    }
}
