using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Script.Serialization;
using ZinOS.Services.Definitions;

namespace ZinOS.Services.Implementation
{
    public class GoogleCajaServiceImpl : IGoogleCajaService
    {
        public ICajoleResult Cajole(string url)
        {
            var client = new WebClient();
            var serializer = new JavaScriptSerializer();

            client.QueryString["url"] = url;
            client.QueryString["input-mime-type"] = "text/html";
            client.QueryString["emit-html-in-js"] = "true";

            var cajoled = client.DownloadString("http://localhost:8887");

            return serializer.Deserialize<CajoleResult>(cajoled);
        }

        public IAsyncResult BeginCajole(string appUrl)
        {
            throw new NotImplementedException();
        }

        public ICajoleResult EndCajole(IAsyncResult asyncResult)
        {
            throw new NotImplementedException();
        }
    }

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

    public class Message : ICajoleMessage
    {
        // ReSharper disable InconsistentNaming
        public int Level { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string message { get; set; }
        // ReSharper restore InconsistentNaming

        /*public int Level
        {
            get { return level; }
        }

        public string Name
        {
            get { return name; }
        }

        public string Type
        {
            get { return type; }
        }*/

        public string Content
        {
            get { return message; }
        }
    }
}
