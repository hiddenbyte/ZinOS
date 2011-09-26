using System.Web.Mvc;
using ZinOS.ClientModels;

namespace ZinOS.Mvc
{
    public class ZinOSAjaxMessageResult<TData> : JsonResult
    {
        private readonly ZinOsJsonMessage<TData> _data;

        public ZinOSAjaxMessageResult(TData data, MessageType messageType)
        {
            JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            _data.MessageData = data;
            _data.Type = messageType;
            Data = _data;
        }
    }
}