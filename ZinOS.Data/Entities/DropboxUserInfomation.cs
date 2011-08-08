using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ZinOS.Data.Entities
{
    public class DropboxUserInfomation
    {
        public User User { get; set; }
        public string Token { get; set; }
        public string TokenSecret { get; set; }
    }
}
