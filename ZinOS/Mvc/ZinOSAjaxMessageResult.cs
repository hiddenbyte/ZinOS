using System.Web.Mvc;
using ZinOS.ClientModels;

namespace ZinOS.Mvc
{
    public class ZinOSAjaxMessageResult<TData> : JsonResult
    {
        private readonly ZinOsJsonMessage<TData> _data;

        public ZinOSAjaxMessageResult(TData data, MessageType messageType) : base() 
        {
            this.JsonRequestBehavior = System.Web.Mvc.JsonRequestBehavior.AllowGet;
            _data.MessageData = data;
            _data.Type = messageType;
            this.Data = _data;
        }
    }
}