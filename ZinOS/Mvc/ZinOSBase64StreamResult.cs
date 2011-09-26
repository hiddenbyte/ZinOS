using System.IO;
using System.Security.Cryptography;
using System.Web.Mvc;

namespace ZinOS.Mvc
{
    public class ZinOSBase64StreamResult : ActionResult
    {
        private readonly Stream _stream;

        public ZinOSBase64StreamResult(Stream stream)
        {
            _stream = stream;
        }

        #region Overrides of ActionResult

        public override void ExecuteResult(ControllerContext context)
        {
            var responsetOutStream = context.HttpContext.Response.OutputStream;
            var base64Transformer = new ToBase64Transform();
            var inputSize = base64Transformer.InputBlockSize;
            var outputSize = base64Transformer.OutputBlockSize;
            var outputBuffer = new byte[outputSize];
            var inputBuffer = new byte[inputSize];

            int eof = _stream.ReadByte(), bytesRead;

            inputBuffer[0] = (byte)eof;
            while ((bytesRead = _stream.Read(inputBuffer, 1, inputBuffer.Length - 1)) != 0)
            {
                if ((eof = _stream.ReadByte()) == -1)
                    break;

                base64Transformer.TransformBlock(inputBuffer, 0, bytesRead + 1, outputBuffer, 0);
                responsetOutStream.Write(outputBuffer, 0, outputBuffer.Length);

                inputBuffer[0] = (byte)eof;
            }

            bytesRead++;
            var finalBlock = base64Transformer.TransformFinalBlock(inputBuffer, 0, bytesRead);
            responsetOutStream.Write(finalBlock, 0, finalBlock.Length);
        }

        #endregion
    }
}