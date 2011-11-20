function Model()
{
	var rootPath = '\\';
	var previousPath;
	var currentPath;
	
	function GetRoots(callback)
	{
		previousPath = undefined;
		currentPath = rootPath;
		ZinOS.Storage.GetRootDirectories(callback);
	};
	
	function GetPathContent(path, callback)
	{
		currentPath = path;
		savePreviousPath(path);
		ZinOS.Storage.GetPathContent(path, callback);
	};
	
	function GetPreviousPathContent(callback)
	{
		if(previousPath != undefined  && previousPath != rootPath)
			GetPathContent(previousPath, callback);
	};
	
	function GetCurrentPathContent(callback)
	{
		var currPath = GetCurrentPath();
		if(currPath == rootPath)
			return;
		GetPathContent(currPath, callback);
	};
	
	function savePreviousPath(path)
	{
		var lastSeparator = path.lastIndexOf('\\');
		previousPath = lastSeparator != 0 ? path.substring(0, lastSeparator) : '\\';
	};
	
	function GetCurrentPath()
	{
		return currentPath;
	};
	
	function UploadFileToCurrentPath(callback)
	{
		var currentPath = GetCurrentPath();
		
		if(currentPath == rootPath)
		{
			ZinOS.UI.ShowMessageBox("Cant't upload a file here");
			return;
		};
		
		ZinOS.UI.UploadFileDialog(currentPath, function(file)
		{
			ZinOS.Storage.UploadFile(file,currentPath,function(saved)
			{
				callback(saved);
			});
		});
	};
	
	function CreateNewDir(callback)
	{
		var currentPath = GetCurrentPath();
		
		if(currentPath == rootPath)
		{
			ZinOS.UI.ShowMessageBox("Cant't create a dir here");
			return;
		};
		
		ZinOS.UI.Prompt('new dir name ?', function(dirName){
			ZinOS.Storage.CreateDir(currentPath + '\\' + dirName, function(result){
				callback(result);
			});
		});
	};
	
	function DeleteFile(filePath,ondelete)
	{
		ZinOS.Storage.DeleteFile(filePath,function(deleted){
			ondelete(deleted);
		});
	};
	
	//expose
	this.GetRoots = GetRoots;
	this.GetPathContent = GetPathContent;
	this.GetPreviousPathContent = GetPreviousPathContent;
	this.GetCurrentPath = GetCurrentPath;
	this.UploadFileToCurrentPath = UploadFileToCurrentPath;
	this.CreateNewDir = CreateNewDir;
	this.DeleteFile = DeleteFile;
	this.GetCurrentPathContent = GetCurrentPathContent;
};