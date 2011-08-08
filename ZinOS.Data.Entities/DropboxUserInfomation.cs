namespace ZinOS.Data.Entities
{
    public class DropboxUserInformation
    {
        public int? TokenType { get; set; }
        public string Token { get; set; }
        public string TokenSecret { get; set; }

        public bool HasValue
        {
            get
            {
                return (TokenType.HasValue || Token != null || TokenSecret != null);
            }
        }
    }
}
