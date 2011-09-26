using System.Collections.Generic;

namespace ZinOS.Services.Definitions.GoogleCaja
{
    public interface ICajoleResult
    {
        string JavascriptModule { get; }
        IEnumerable<ICajoleMessage> CajolingMessages { get; }
    }
}