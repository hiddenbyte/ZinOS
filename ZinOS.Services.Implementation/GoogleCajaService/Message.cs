using ZinOS.Services.Definitions;
using ZinOS.Services.Definitions.GoogleCaja;

namespace ZinOS.Services.Implementation.GoogleCajaService
{
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