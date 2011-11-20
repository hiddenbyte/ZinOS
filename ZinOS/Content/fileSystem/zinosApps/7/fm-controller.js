function Controller(view, model)
{
	function onFileClick(path,name,isDir)
	{
		if(isDir)
			model.GetPathContent(path, loadFiles);
		else
			ZinOS.UI.OpenFile(path);
	};
	
	function onRootClick(path,name)
	{
		model.GetPathContent(path, loadFiles);
	};
	
	function onBackClick()
	{
		model.GetPreviousPathContent(loadFiles);
	};
	
	function onUploadClick()
	{
		model.UploadFileToCurrentPath(function(saved)
		{
			if(saved){
				ZinOS.UI.ShowMessageBox("Successfully uploaded!");
				refreshCurrentPathContent();
			} else {
				ZinOS.UI.ShowMessageBox("Error occurred!");
			}
		});
	};
	
	function onNewDirClick()
	{
		model.CreateNewDir(function(created){
			if(created)
			{
				ZinOS.UI.ShowMessageBox("Successfully created!");
				refreshCurrentPathContent();
			}
			else 
			{
				ZinOS.UI.ShowMessageBox("Error occurred!");
			}
		});
	};
	
	function onFileDeleteClick(path,name,isDir)
	{		
		model.DeleteFile(path, function(deleted){
			if(deleted) {
				view.ShowMessage('File deleted!');
				refreshCurrentPathContent();
			} else {
				view.ShowMessage('Error Occurred!');
			}
		});
	};
	
	//private:
	function refreshCurrentPathContent()
	{
		model.GetCurrentPathContent(loadFiles);
	};
		
	function loadRoots(roots){
		view.AddRoots(roots);
	};
	
	function loadFiles(files){
		view.ShowFiles(files);
	};
	
	//init
	view.SetRootClickHandler(onRootClick);
	view.SetFileClickHandler(onFileClick);
	view.SetBackClickHandler(onBackClick);
	view.SetUploadClickHandler(onUploadClick);
	view.SetNewDirClickHandler(onNewDirClick);
	view.SetDeleteClickHandler(onFileDeleteClick);
	
	//init:load roots
	model.GetRoots(loadRoots);
};

function init(){
	var m = new Model();
	var v = new View();
	var c = new Controller(v,m);
};

$(document).ready(init);

