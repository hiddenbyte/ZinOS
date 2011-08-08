namespace ZinOS.Services.Definitions.Authentication
{
    public interface IAuthenticationService
    {
        AuthenticationTicket Authenticate(string username, string password);
    }
}
