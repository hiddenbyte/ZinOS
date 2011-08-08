using System.Collections.Generic;

namespace ZinOS.Data.Entities
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Name { get; set; }

        public DropboxUserInformation DropboxUserInformation { get; set; }

        public virtual ICollection<ZinOSApp> OwnedZinOSApps { get; set; }
    }
}
