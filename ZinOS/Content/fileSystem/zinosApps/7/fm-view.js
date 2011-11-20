function View()
{
	/* =========================
		View fields 
	========================== */
	var fileClickHandler;
	var deleteClickHandler;
	var backClickHandler;
	var rootClickHandler;

	/* =========================
		View internal types
	========================== */
	//root click event handler
	function RootClickEventHandler(path,name)
	{
		function eventMethod()
		{
			rootClickHandler(path,name);
		};
		
		this.Handler = eventMethod;
	};
	
	/* =========================
		View public methods
	========================== */
	function SetFileClickHandler(handler)
	{
		fileClickHandler = handler;
	};
	
	function SetDeleteClickHandler(handler)
	{
		deleteClickHandler = handler;
	};
	
	function SetBackClickHandler(handler)
	{
		backClickHandler = handler;
		$("#back-button").click(backClickHandler);
	};
	
	function SetUploadClickHandler(handler)
	{
		$("#upload-button").click(handler);
	};
	
	function SetNewDirClickHandler(handler)
	{
		$("#newdir-button").click(handler);
	};
	
	function SetRootClickHandler(handler)
	{
		rootClickHandler = handler;
	};
	
	function AddRoots(roots)
	{
		var rootsPlaceHolder = $('#roots');
		rootsPlaceHolder.html('');
		for(var i=0; i < roots.length; ++i)
		{
			var rootUI = $(createRootUI(roots[i]));
			var evtHandler = new RootClickEventHandler(roots[i].Path,roots[i].Name);	
			rootUI.click(evtHandler.Handler);
			rootsPlaceHolder.append(rootUI);
		}
	};
	
	function ShowFiles(files)
	{
		var filesPlaceHolder = $('#file-explorer');
		filesPlaceHolder.empty();
		
		for(var i=0; i < files.length; ++i)
		{
			var ui = createFileUI(
						files[i],
						fileClickHandler,
						deleteClickHandler
					);
					
			filesPlaceHolder.append(ui);
		}
	};
	
	function ShowMessage(message)
	{
		ZinOS.UI.ShowMessageBox(message);
	};
	
	/* =========================
		View private methods
	========================== */
	function createRootUI(root)
	{
		var html =	'<div class="root">' +
						'<span class="drive-icon"></span>' +
						'<span class="root-name">' + root.Name + '</span>' +
					'</div>';
		return html;
	};
	
	function createFileUI(file,onfileNameClick,onDeleteFile)
	{	
		var fileUI = $('<div class="file"><div class="file-name">' +
				(file.IsDirectory?'<span class="dir-icon"></span>':'<span class="file-icon"></span>') +
				'<span class="name">' +  file.Name + 
				'</span></div><div class="file-actions"><span class="file-action file-del-icon"></span></div></div>');
		
		var fileUIchildren = fileUI.children();
		
		fileUIchildren.filter('div.file-name').click(function(){
			onfileNameClick(file.Path,file.Name,file.IsDirectory);
		});
		
		fileUIchildren.filter('div.file-actions').children('span.file-del-icon').click(function() {
			onDeleteFile(file.Path,file.Name,file.IsDirectory);
		});
		
		return fileUI;
	};
	
	/* =========================
		expose methods
	========================== */
	this.AddRoots = AddRoots;
	this.ShowFiles = ShowFiles;
	this.SetFileClickHandler = SetFileClickHandler;
	this.SetBackClickHandler = SetBackClickHandler;
	this.SetRootClickHandler = SetRootClickHandler;
	this.SetUploadClickHandler = SetUploadClickHandler;
	this.SetNewDirClickHandler = SetNewDirClickHandler;
	this.SetDeleteClickHandler = SetDeleteClickHandler;
	this.ShowMessage = ShowMessage;
};