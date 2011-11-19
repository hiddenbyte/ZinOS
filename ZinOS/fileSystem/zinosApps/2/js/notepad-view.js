function View()
{
	this.SetText = function(content)
	{
		var textArea = document.getElementById('notepad_text');
		textArea.readOnly = false;
		textArea.value = content;
	};
	
	this.Loading = function()
	{
		var textArea = document.getElementById('notepad_text');
		textArea.value = 'Loading...';
		textArea.readOnly = true;
	};
	
	this.RegisterOnSaveHandler = function(callback)
	{
		var save = document.getElementById('save');
		save.onclick = function()
		{
			var textArea = document.getElementById('notepad_text');
			callback(textArea.value);
		};
	};
};

function Control(view,model)
{
	this.LoadFile = function(filePath)
	{
		view.Loading();
		model.LoadFile(filePath, function(content){
			view.SetText(content);
		});
	};
	
	view.RegisterOnSaveHandler(function(content){
		model.SaveFile(content, function(save)
		{
			if(save)
			{
				ZinOS.UI.ShowMessageBox('Successfully saved!');
			}
			else
			{
				ZinOS.UI.ShowMessageBox('Error ocurred while saving!');
			}
		});
	});
};

function Model()
{
	var DEFAULT_FILENAME = 'text.txt';
	var _openfilePath;
	
	this.LoadFile = function(filePath, onload)
	{
		_openfilePath = filePath;
		
		var nBytes = 1024 * 1024;
		
		ZinOS.Storage.ReadFile(filePath, function(streamReader)
		{	
			streamReader.readString(function(str){ onload(str); });
		});
	};
	
	this.SaveFile = function(content, onsave)
	{
		if(_openfilePath)
		{
			ZinOS.Storage.WriteToFile(_openfilePath, function(streamWriter) {
				streamWriter.writeString(content);
				streamWriter.flush(function(result){ onsave(result); });
			});
		}
		else
		{
			ZinOS.UI.SaveFileDialog(DEFAULT_FILENAME, function(path, filename)
			{
				_openfilePath = path + '\\' + filename;
				ZinOS.Storage.CreateFile(_openfilePath, function(streamWriter) {
					streamWriter.writeString(content);
					streamWriter.flush(function(newFileName){ 
						if(newFileName != null){
							_openfilePath = path + '\\' + newFileName;
							onsave(newFileName);
						}
					});
				});
			});
		}
	};
};

function _init()
{
	var c = new Control(new View(), new Model());
	if(window.Context && Context.inputFile)
		c.LoadFile(Context.inputFile);
};

window.onload = _init;