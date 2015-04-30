define(["knockout", "knockout-mapping", "folder", "library"],function (ko, map, folder, library) {
    "use strict";

    var buildHeaders = function(data){
		if(data.length >= 0 && data[0].contents !== undefined && data[0].contents.length >= 0){
			var ob = data[0].contents[0];
			return Object.keys(ob);
		}
    };

    var buildFolders = function buildFolders(data, root){
        for (var i = data.length - 1; i >= 0; i--) {
            var f = data[i];
            if(f.name && f.contents){   
            var next = new folder.createFolder(f.name);
            root.add(next);
            buildFolders(f, next);
            }
            else {
                if(f.contents){
                    for (var  k = f.contents.length - 1; k >= 0; k--) {
                       root.contents.push(map.fromJS(f.contents[k]));
                       console.log(root.name());
                       console.log(root.contents());
                    }
                }
            }
        }
        return root;   
    };

    var build = function(data){
    	var headers = buildHeaders(data);
        var root =  new folder.createFolder('root', [])
    	var folders = buildFolders(data, root);
        console.log(folders);
        console.log(folders.contents());
    	return new library.createLibrary(headers, folders);
    };

    return {
    	build : build
    }


});