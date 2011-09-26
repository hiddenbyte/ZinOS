using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Schema;
using ZinOS.Services.Definitions;
using Ionic.Zip;
using System.Xml;
using ZinOS.Repositories.Definitions;
using ZinOS.Data.Entities;
using ZinOS.Common;
using ZinOS.Services.Definitions.GoogleCaja;

namespace ZinOS.Services.Implementation
{
    public class ZinOSAppServiceImpl : IZinOSAppService
    {
        //depends on these services:
        private readonly IFileSystemService _fileSystemService;
        private readonly IGoogleCajaService _googleCajaService;
      
        //depends on these repositories:
        private readonly IZinOSAppRepository _zinOSAppRepository;
        private readonly IUsersRepository _usersRepository;
 
        private readonly IUnitOfWorkFactory _unitOfWorkFactory;

        public ZinOSAppServiceImpl(IFileSystemService fileSystemService,
            IGoogleCajaService googleCajaService,
            IZinOSAppRepository zinOSAppRepository,
            IUnitOfWorkFactory unitOfWorkFactory, 
            IUsersRepository usersRepository)
        {
            _fileSystemService = fileSystemService;
            _googleCajaService = googleCajaService;
            _zinOSAppRepository = zinOSAppRepository;
            _usersRepository = usersRepository;
            _unitOfWorkFactory = unitOfWorkFactory;
        }

        #region Constants / Settings (Private static properties)

        private static string MetadataFilename
        {
            get
            {
                return "manifest.xml";
            }
        }

        private static string IndexHtmlFilename
        {
            get
            {
                return "index.html";
            }
        }

        private static string ManifestXmlSchemaPath
        {
            get
            {
                return ApplicationSettings.Setting.ZinOSAppManifestXmlSchemaPath;
            }
        }

        private static string ZinOSHostName
        {
            get { return ApplicationSettings.Setting.ZinOSHostName; }
        }

        #endregion

        #region ZinOSAppService members

        public IEnumerable<ZinOSApp> GetAllApps()
        {
            return _zinOSAppRepository.GetAll();
        }

        public void Update(int ownerUserId, int zinOsAppId, Stream zinOSAppZipFileStream)
        {
            if (!Exists(zinOsAppId))
                throw new ValidationException("zinOsAppId", "This ZinOS app id does not exist.");

            // read zinOSAppZipFileStream
            var zinOSAppZipFile = ReadZipFile(zinOSAppZipFileStream);

            // read manifest file
            var updatedApp = ReadZipFileManifest(zinOSAppZipFile);

            //update app
            updatedApp.Id = zinOsAppId;

            updatedApp.CajoledModule = Cajole(zinOSAppZipFile, zinOsAppId);

            _zinOSAppRepository.Update(updatedApp);
        }

        public void Submit(int ownerUserId, Stream zinOSAppZipFileStream)
        {
            // read zinOSAppZipFileStream
            var zinOSAppZipFile = ReadZipFile(zinOSAppZipFileStream);
            
            //read manifest
            var app = ReadZipFileManifest(zinOSAppZipFile);

            //create app (to obtain app id) 
            using (var uow = _unitOfWorkFactory.Create(true))
            {
                try
                {
                    app.Owner = _usersRepository.GetByKey(ownerUserId);
                    _zinOSAppRepository.Add(app);
                    uow.Commit();
                }
                catch(Exception)
                {
                    uow.Rollback();
                    throw;
                }
            }

            //cajoling
            try
            {
                app.CajoledModule = Cajole(zinOSAppZipFile, app.Id);
                _zinOSAppRepository.Update(app);
            }
            catch (Exception)
            {
                _zinOSAppRepository.Remove(app);
                zinOSAppZipFile.Dispose();
                throw;
            }
            zinOSAppZipFile.Dispose();
        }

        public ZinOSApp GetApp(int zinOSAppId)
        {
            return _zinOSAppRepository.GetByKey(zinOSAppId);
        }

        public Stream GetAppIcon(int id)
        {
            var app = _zinOSAppRepository.GetByKey(id);
            return app == null|| app.UserInterfaceConfiguration.Icon == null ? Stream.Null : GetAppResource(id, app.UserInterfaceConfiguration.Icon);
        }

        public IEnumerable<ZinOSApp> GetAllAvailable(int desktopId)
        {
            using (var uow = _unitOfWorkFactory.Create())
            {
                var apps =  _zinOSAppRepository.GetAllAvailable(desktopId).ToList();
                uow.Commit();
                return apps;
            }
        }

        public Stream GetAppResource(int zinOSAppId, string resourcePath)
        {
            var zinOSAppResourcesRoot = ApplicationSettings.Setting.ZinOSAppResourcesRootPath;
            var resourcePathRelativized = String.Format("{0}\\{1}\\{2}", zinOSAppResourcesRoot, zinOSAppId, resourcePath);
            return _fileSystemService.GetFileStream(FileSystemRoot.Main, resourcePathRelativized);
        }

        public IEnumerable<ZinOSApp> GetAllAppsByUserId(int userId)
        {
            return _zinOSAppRepository.GetAllByOwnerUserId(userId);
        }

        #endregion 

        #region Private instance methods

        private bool Exists(int appId)
        {
            return _zinOSAppRepository.Exists(appId);
        }

        private ZinOSApp ReadZipFileManifest(ZipFile zinOSZipFile)
        {
            //get manifest
            var metadataZipEntry = zinOSZipFile[MetadataFilename];

            //extract manifest file
            var manifestFileStream = new MemoryStream();
            metadataZipEntry.Extract(manifestFileStream);
            manifestFileStream.Position = 0;

            var app = CreateZinOSAppFromAppManifest(manifestFileStream);

            ThrowValidationExceptionIfIconNotFound(zinOSZipFile, app.UserInterfaceConfiguration.Icon);

            return app;
        }

        private ZinOSApp CreateZinOSAppFromAppManifest(Stream xmlMetadataStream)
        {
            XmlDocument metadataDocument;
            (metadataDocument = new XmlDocument()).Load(xmlMetadataStream);

            //Load XSD for validation!
            var manifestXsdStream
                = _fileSystemService.GetFileStream(FileSystemRoot.Main, ManifestXmlSchemaPath);

            var manifestSchema
                = XmlSchema.Read(manifestXsdStream, (sender, args) => { });

            metadataDocument.Schemas.Add(manifestSchema);

            //validate!
            var errors = new List<ValidationError>();
            metadataDocument.Validate((sender, args) =>
            {
                if (args.Severity == XmlSeverityType.Error)
                    errors.Add(new ValidationError(MetadataFilename, String.Format("{0} - {1}", MetadataFilename, args.Message)));
            });

            if (errors.Count > 0) //Has validation erros ?
                throw new ValidationException(errors);

            var app = new ZinOSApp();

            var zinosApp = metadataDocument.GetElementsByTagName("zinosApp")[0];

            // ReSharper disable PossibleNullReferenceException
            app.Name = zinosApp.SelectSingleNode("name").InnerText;
            app.Description = zinosApp.SelectSingleNode("description").InnerText;
            app.Version = Int32.Parse(zinosApp.SelectSingleNode("version").InnerText);
            // ReSharper restore PossibleNullReferenceException

            var zinOSAppUIConfig = new ZinOSAppUserInterfaceConfiguration();
            var ui = zinosApp.SelectSingleNode("ui");
            if (ui != null)
            {
                string innerText;

                if (GetInnerText(ui, "icon", out innerText))
                    zinOSAppUIConfig.Icon = innerText;

                var window = ui.SelectSingleNode("window");

                if (window != null)
                {
                    if (GetInnerText(window, "defaultWidth", out innerText))
                        zinOSAppUIConfig.DefaultWidth = Int32.Parse(innerText);

                    if (GetInnerText(window, "defaultHeight", out innerText))
                        zinOSAppUIConfig.DefaultHeight = Int32.Parse(innerText);

                    if (GetInnerText(window, "resizable", out innerText))
                        zinOSAppUIConfig.Resizable = Boolean.Parse(innerText);
                }
            }

            app.UserInterfaceConfiguration = zinOSAppUIConfig;

            return app;
        }

        private string Cajole(ZipFile zinOSZipFile, int zinOSappId)
        {
            string zinOsAppResourcesRoot = ApplicationSettings.Setting.ZinOSAppResourcesRootPath;
            var zinOsAppResourcesPath = String.Format(@"{0}\{1}", zinOsAppResourcesRoot, zinOSappId);
            var zinOsAppResourcesAbsolutePath = _fileSystemService.CreateDirectory(FileSystemRoot.Main,
                                                                                   zinOsAppResourcesPath);

            zinOSZipFile.ExtractAll(zinOsAppResourcesAbsolutePath, ExtractExistingFileAction.OverwriteSilently);

            var appUrl = GenerateUnCajoledAppUrl(zinOSappId);

            var result = _googleCajaService.Cajole(appUrl);

            return result.JavascriptModule;
        } 
        
        #endregion

        #region Private static methods

        private static string GenerateUnCajoledAppUrl(int appId)
        {
            return String.Format(@"http://{0}/Desktop/Resources__/{1}/index.html", ZinOSHostName, appId);
        }

        private static void ThrowValidationExceptionIfNotValid(ZipFile file)
        {
            var errors = new List<ValidationError>();

            if (file[MetadataFilename] == null)
                errors.Add(new ValidationError("ZinOSApp",
                                               string.Format("App does not contain an {0} file on the zip file root.",
                                                             MetadataFilename)));
            if (file[IndexHtmlFilename] == null)
                errors.Add(new ValidationError("ZinOSApp",
                                               string.Format("App does not contain an {0} file on the zip file root.",
                                                             IndexHtmlFilename)));

            if (errors.Count > 0)
                throw new ValidationException(errors);
        }

        private static void ThrowValidationExceptionIfIconNotFound(ZipFile file, string iconPath)
        {
            if (file == null)
                return;

            if (iconPath == null)
                return;

            if (file[iconPath] == null)
                throw new ValidationException("manifest.xml", string.Format("{1} - The specified app icon ({0}) does not exist.", iconPath, MetadataFilename));
        }

        private static ZipFile ReadZipFile(Stream zipFileStream)
        {
            try
            {
                var zinOSAppZipFile = ZipFile.Read(zipFileStream);
                ThrowValidationExceptionIfNotValid(zinOSAppZipFile);
                return zinOSAppZipFile;
            }
            catch (ZipException)
            {
                throw new ValidationException("zipFile", "Can not read the uploaded zinOS app file.");
            }
        }

        private static bool GetInnerText(XmlNode parent, string xpath, out string innerText)
        {
            var node = parent.SelectSingleNode(xpath);

            if (node != null)
            {
                innerText = node.InnerText;
                return true;
            }

            innerText = null;
            return false;
        }

        #endregion
    }
}
