using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ZinOS.Repositories.Implementation;
using ZinOS.Data.Entities;
using System.IO;
using ZinOS.Services.Implementation;
using System.Xml;

namespace ZinOS.TestConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            //GoogleCajaServiceImpl googleCajaService = new GoogleCajaServiceImpl();

            //Stream s =  googleCajaService.Cajole("file:/D%3a%5cdevelopment%5cgoogle-caja%5cant-lib%5cindex.html");

            Stream zinOSApp = File.Open(@"c:\lol.zip", FileMode.Open);

           // (new ZinOSAppServiceImpl(new FileSystemServiceImpl(), new GoogleCajaServiceImpl(),new DbContextZinOSAppRepository())).Submit(zinOSApp);

            /*XmlDocument metadataXmlDoc = new XmlDocument();
            
            var root = metadataXmlDoc.CreateElement("zinos");
            var app = metadataXmlDoc.CreateElement("app");
            root.AppendChild(app);
            var name = metadataXmlDoc.CreateElement("name");
            name.InnerText = "test app";
            app.AppendChild(name);

            metadataXmlDoc.AppendChild(root);
            
            XmlWriter a = XmlWriter.Create(Console.Out);
            metadataXmlDoc.Save(a);*/
           // metadataXmlDoc.WriteContentTo(a);
        }
    }
}
