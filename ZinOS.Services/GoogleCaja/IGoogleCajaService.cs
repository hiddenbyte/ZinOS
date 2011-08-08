using System;
using System.Collections.Generic;
using System.IO;

namespace ZinOS.Services.Definitions
{
    public interface IGoogleCajaService
    {
        ICajoleResult Cajole(string url);

        IAsyncResult BeginCajole(string appUrl);

        ICajoleResult EndCajole(IAsyncResult asyncResult);
    }

    public interface ICajoleResult
    {
        string JavascriptModule { get; }
        IEnumerable<ICajoleMessage> CajolingMessages { get; }
    }

    public interface ICajoleMessage
    {
        int Level { get; }
        string Name { get; }
        string Type { get; }
        string Content { get; }
    }
}
