using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using ZinOS.Services.Definitions.Types;

namespace ZinOS.Services.Definitions
{
    public interface IDropboxService
    {
        /// <summary>
        ///     Permite obter os endpoints necessários para o protocolo OAuth
        /// pedir autorização para aceder à conta do Dropbox do utilizador.
        /// </summary>
        /// <returns>OAuthEndpoints</returns>
        OAuthEndpoints GetDroboxOAuthEndpoints();

        /// <summary>
        ///    'ConsumerKey' fornecida pelo Dropbox, de forma a que ZinOS  
        /// utilize a API do Dropbox.
        /// </summary>
        /// <returns>ZinOS's Dropbox consumer key</returns>
        string GetConsumerKey();

        /// <summary>
        ///    'ConsumerSecret' fornecida pelo Dropbox, de forma a que ZinOS  
        /// utilize a API do Dropbox.
        /// </summary>
        /// <returns>ZinOS's Dropbox consumer secret</returns>
        string GetConsumerSecret();

        Stream GetFileStream(string accessToken, string accessTokenSecret, string path);

        bool UpdateFileStream(string accessToken, string accessTokenSecret, string path, byte[] fileContent);

        bool CreateFile(string accessToken, string accessTokenSecret, string filePath, Stream fileStream);

        bool CreateDirectory(string accessToken, string accessTokenSecret, string dirPath);

        IEnumerable<FileSystemItem> GetRootFileSystemItems(string accessToken, string accessTokenSecret);

        IEnumerable<FileSystemItem> GetFileSystemItems(string accessToken, string accessTokenSecret,string path);

        bool DeleteFile(string accessToken, string tokenSecret, string filePath);
    }
}
