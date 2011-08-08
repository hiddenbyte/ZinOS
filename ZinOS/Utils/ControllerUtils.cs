using System.Web.Mvc;
using System.Threading;

namespace ZinOS.Utils 
{
    public static class ControllerUtils 
    {
        private static ZinOSJsonMessage _successJsonResult;
        private static ZinOSJsonMessage _errorJsonResult;

        static ControllerUtils()
        {
            _successJsonResult = new ZinOSJsonMessage()
            {
                MessageCode = 0,
                MessageDescription = "Success"
            };

            _errorJsonResult = new ZinOSJsonMessage()
            {
                MessageCode = 1,
                MessageDescription = "Error"
            };
        }

        public static ZinOSJsonMessage GetSuccessJsonResult()
        {
            return _successJsonResult;
        }

        public static ZinOSJsonMessage GetErrorJsonResult() 
        {
            return _errorJsonResult;
        }
    }

    public class ZinOSJsonMessage
    {
        public int MessageCode { get; set; }
        public string MessageDescription { get; set; }
    }
}