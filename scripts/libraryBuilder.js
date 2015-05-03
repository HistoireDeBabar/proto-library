define(["knockout", "knockout-mapping", "folder", "library"],function (ko, map, folder, library) {
    "use strict";

    var buildHeaders = function(data){
		if(data.length >= 0 && data[0].contents !== undefined && data[0].contents.length >= 0){
			var ob = data[0].contents[0];
			return Object.keys(ob);
		}
    };
    var createRoot = function(data){
        var root = new folder.createFolder('root', []);
        for (var i = data.length - 1; i >= 0; i--) {
            var f = data[i];
            if(f.name === 'root'){
                if(f.contents){
                  for(var j = f.contents.length - 1; j >= 0; j--) {
                          if(f.contents[j].type !== 'folder'){
                            f.contents[j].select = ko.observable(false);
                            root.contents.push(map.fromJS(f.contents[j]));
                        }
                    }  
                    return root;
                } 
            }
        }
        throw "root folder could not be found";
    };

    var buildFolders = function buildFolders(data, root){
        for (var i = data.length - 1; i >= 0; i--) {
            var f = data[i];
            f.select = ko.observable(false);
            if(f.name !== 'root'){
               if(f.type !== 'folder'){
                root.contents.push(map.fromJS(f));
                }
                if(f.name && f.contents){   
                var next = new folder.createFolder(f.name);
                root.add(next);
                buildFolders(f.contents, next);
                } 
            }
            
        }
        return root;   
    };

    var build = function(data){
    	var headers = buildHeaders(data);
        //initialise root folder
        var root =  createRoot(data);
    	var folders = buildFolders(data, root);
    	return new library.createLibrary(headers, folders);
    };

    return {
    	build : build
    }


});