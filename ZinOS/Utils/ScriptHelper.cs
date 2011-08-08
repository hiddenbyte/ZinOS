using System.Web.Mvc;
using System.Text;
using System.Collections;
using System;
using System.Web;
using System.Web.Script.Serialization;

namespace ZinOS.Utils
{
    public static class ScriptHelper
    {
        private static JavaScriptSerializer _jsSerializer;

        static ScriptHelper(){
            _jsSerializer = new JavaScriptSerializer();
        }

        public static IHtmlString BeginClientBag()
        {
            var builder = new TagBuilder("script");
            builder.Attributes.Add("type", "text/javascript");

            return new HtmlString(builder.ToString(TagRenderMode.StartTag));
        }

        public static IHtmlString AddToClientBag(string key, object value)
        {
            string serializedValue = _jsSerializer.Serialize(value);
            return new HtmlString(String.Format("ZinOS.Bag.{0} = {1};", key, HttpUtility.JavaScriptStringEncode(serializedValue, true)));
        }

        public static IHtmlString EndClientBag()
        {
            var builder = new TagBuilder("script");
            return new HtmlString(builder.ToString(TagRenderMode.EndTag));
        }
    }
}