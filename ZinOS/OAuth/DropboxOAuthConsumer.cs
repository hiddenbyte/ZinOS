using DotNetOpenAuth.OAuth;
using ZinOS.Services.Definitions;
using DotNetOpenAuth.Messaging;
using DotNetOpenAuth.OAuth.ChannelElements;
using ZinOS.Services.Definitions.Users;

namespace ZinOS.OAuth 
{
    public class DropboxOAuthConsumer
    {
        public DropboxOAuthConsumer(int userId, IDropboxService dropboxService, IUserService userService)
        {
            var dropboxEnpoints = dropboxService.GetDroboxOAuthEndpoints();

            ServiceProviderDescription = new ServiceProviderDescription
            {
                RequestTokenEndpoint = new MessageReceivingEndpoint(dropboxEnpoints.RequestToken,
                                                HttpDeliveryMethods.AuthorizationHeaderRequest | HttpDeliveryMethods.PostRequest),
                UserAuthorizationEndpoint = new MessageReceivingEndpoint(dropboxEnpoints.UserAuthorization,
                                                HttpDeliveryMethods.AuthorizationHeaderRequest | HttpDeliveryMethods.GetRequest),
                AccessTokenEndpoint = new MessageReceivingEndpoint(dropboxEnpoints.AccessToken,
                                                HttpDeliveryMethods.AuthorizationHeaderRequest | HttpDeliveryMethods.PostRequest),
                TamperProtectionElements = new ITamperProtectionChannelBindingElement[] { new HmacSha1SigningBindingElement() },

                ProtocolVersion = ProtocolVersion.V10
            };

            WebConsumer = new WebConsumer(ServiceProviderDescription, new DropboxConsumerTokenManager(userId, dropboxService, userService));
        }

        private ServiceProviderDescription ServiceProviderDescription
        {
            get;
            set;
        }

        private WebConsumer WebConsumer 
        { 
            get; 
            set; 
        }

        public void RequestToken()
        {
            WebConsumer.Channel.Send(WebConsumer.PrepareRequestUserAuthorization());
        }

        public bool IsAuthorized() 
        {
            var accessTokenResponse = WebConsumer.ProcessUserAuthorization();

            return accessTokenResponse != null;
        }

        private class DropboxConsumerTokenManager : IConsumerTokenManager
        {
            private readonly IUserService _userService;
            private readonly int _userId;

            public DropboxConsumerTokenManager(int userId,IDropboxService dropboxService, IUserService userService)
            {
                _userService = userService;
                _userId = userId;

                ConsumerKey = dropboxService.GetConsumerKey();
                ConsumerSecret = dropboxService.GetConsumerSecret();
            }

            public string ConsumerKey
            {
                get;
                private set;
            }

            public string ConsumerSecret
            {
                get;
                private set;
            }

            public void ExpireRequestTokenAndStoreNewAccessToken(string consumerKey, string requestToken, string accessToken, string accessTokenSecret)
            {
                _userService.SetDropboxRequestToken(_userId, accessToken, accessTokenSecret);
            }

            public string GetTokenSecret(string token)
            {
                string dummyTokem;
                string secret;
                _userService.GetDropboxToken(_userId, out dummyTokem, out secret);
                return secret;
            }

            public TokenType GetTokenType(string token)
            {
                throw new System.NotImplementedException();
            }

            public void StoreNewRequestToken(DotNetOpenAuth.OAuth.Messages.UnauthorizedTokenRequest request, DotNetOpenAuth.OAuth.Messages.ITokenSecretContainingMessage response)
            {
                _userService.SetDropboxRequestToken(_userId, response.Token, response.TokenSecret);
            }
        }
    }
}