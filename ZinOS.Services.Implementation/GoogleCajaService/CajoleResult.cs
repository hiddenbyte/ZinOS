using System.Collections.Generic;
using ZinOS.Services.Definitions;
using ZinOS.Services.Definitions.GoogleCaja;

namespace ZinOS.Services.Implementation.GoogleCajaService
{
    public class CajoleResult : ICajoleResult
    { 
        // ReSharper disable InconsistentNaming
        public  string js
        {
            get;
            set;
        }

        public IEnumerable<Message> messages { get; set; }

        // ReSharper restore InconsistentNaming

        public string JavascriptModule
        {
            get { return js; }
        }

        public IEnumerable<ICajoleMessage> CajolingMessages
        {
            get { return messages; }
        }
    }
}