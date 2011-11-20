using System;
using System.Net;
using System.Web.Script.Serialization;
using ZinOS.Services.Definitions;
using ZinOS.Services.Definitions.GoogleCaja;
using ZinOS.Common;

namespace ZinOS.Services.Implementation.GoogleCajaService
{
    public class GoogleCajaServiceImpl : IGoogleCajaService
    {
        private const string FATAL_ERROR = "FATAL_ERROR";

        private static string GoogleCajaServiceAddress
        {
            get { return ApplicationSettings.Setting.GoogleCajaServiceAdresss; }
        }

        public ICajoleResult Cajole(string url)
        {
            var client = new WebClient();
            client.QueryString["url"] = url; 
            client.QueryString["input-mime-type"] = "text/html";
            client.QueryString["emit-html-in-js"] = "true";

            string cajoleResultJSON;
            try
            {
                cajoleResultJSON = client.DownloadString(GoogleCajaServiceAddress);
            }
            catch(WebException)
            {
               throw new ValidationException("google-caja", "Error occurred while connecting or during request to google caja service.");
            }

            var serializer = new JavaScriptSerializer();
            var cajoleResult = serializer.Deserialize<CajoleResult>(cajoleResultJSON);

            foreach (var message in cajoleResult.CajolingMessages) 
            {
                if (message.Name == FATAL_ERROR) 
                {
                    throw new ValidationException("google-caja", "Error occurred while connecting or during request to google caja service.");
                }
            }

            return cajoleResult;
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
}
