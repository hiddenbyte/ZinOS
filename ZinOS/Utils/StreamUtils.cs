using System;
using System.IO;
using System.Runtime.InteropServices;

namespace ZinOS.Utils
{
    public static class StreamUtils
    {
        [DllImport("urlmon.dll", CharSet = CharSet.Unicode, ExactSpelling = true, SetLastError = false)]
        static extern int FindMimeFromData(IntPtr pBC,
            [MarshalAs(UnmanagedType.LPWStr)] string pwzUrl,
            [MarshalAs(UnmanagedType.LPArray, ArraySubType = UnmanagedType.I1, SizeParamIndex = 3)] byte[] pBuffer,
            int cbSize,
            [MarshalAs(UnmanagedType.LPWStr)] string pwzMimeProposed,
            int dwMimeFlags, out IntPtr ppwzMimeOut, int dwReserved);

        public static string GetMimeFromFile(Stream fileStream, string fileName)
        {
            IntPtr mimeout;

            var maxContent = (int) fileStream.Length;
            if (maxContent > 4096) maxContent = 4096;

            var buf = new byte[maxContent];

            fileStream.Read(buf, 0, maxContent);

            fileStream.Seek(0, SeekOrigin.Begin); //restore stream

            var result = FindMimeFromData(IntPtr.Zero, fileName, buf, maxContent, null, 0, out mimeout, 0);

            if (result != 0)
            {
                Marshal.FreeCoTaskMem(mimeout);
                return "";
            }

            var mime = Marshal.PtrToStringUni(mimeout);
            Marshal.FreeCoTaskMem(mimeout);

            return mime != null ? mime.ToLower() : "";
        }
    }
}