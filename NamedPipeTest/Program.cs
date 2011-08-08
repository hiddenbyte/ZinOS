using System.Net.Sockets;
using ProtoBuf;

namespace NamedPipeTest
{
    [ProtoContract]
    internal class GoogleCajaServerRequest
    {
        [ProtoMember(1)]
        public string AppUrl { get; set; }

        [ProtoMember(2)]
        public string RelativeUrl { get; set; }
    }

    public class Program
    {
        static void Main(string[] args)
        {
            var clientSocket = new TcpClient("localhost", 8181);
            var request = new GoogleCajaServerRequest {AppUrl = "appUrl", RelativeUrl = "relUrl"};

            //
            var stream = clientSocket.GetStream();
            if(clientSocket.Connected)
                Serializer.Serialize(stream, request);
            stream.Flush();
            stream.Close();
        }
    }
}
