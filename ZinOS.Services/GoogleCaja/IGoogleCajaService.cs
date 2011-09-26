using System;

namespace ZinOS.Services.Definitions.GoogleCaja
{
    public interface IGoogleCajaService
    {
        ICajoleResult Cajole(string url);

        IAsyncResult BeginCajole(string appUrl);

        ICajoleResult EndCajole(IAsyncResult asyncResult);
    }
}
