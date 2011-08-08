using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ZinOS.ClientModels
{
    public struct ZinOsJsonMessage<T>
    {
        public MessageType Type
        {
            get;
            set;
        }

        public T MessageData
        {
            get;
            set;
        }
    }

    public enum MessageType
    {
        Success = 0,
        Error = -1,
        Unauthorized = -2
    }
}
