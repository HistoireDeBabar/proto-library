define([], function () {
     "use strict";


    var getData = function(){
    	return [
			{type: 'folder', name : 'folder1', 'contents': [{type: 'campaign', name : 'campaign 1', description: 'testing 1', active : true}] },
			{type: 'folder', name : 'folder2', 'contents': [{type: 'campaign', name : 'campaign 2', description: 'testing 2', active : true}, {type: 'campaign', name : "campaign 3", description: "testing 3", "active" : false}]},
			{type: 'folder', name : 'root', 'contents': [{type: 'campaign', name : 'campaign 4', description: 'testing 4', active : false}, {type: 'campaign', name : "campaign 5", description: "testing 5", "active" : true}] },
			{type: 'folder', name : 'folder6', 'contents': [{type : 'folder', name: 'folder 7', 'contents' : [{type: 'campaign', name : 'campaign 7', description: 'testing 7', active : true}]}]},
            {type: 'folder', name : 'folder9', 'contents': [{type : 'folder', name: 'folder 10', 'contents' : [{type : 'folder', name: 'folder 11', 'contents' :[{type: 'campaign', name : 'campaign 12', description: 'testing 12', active : true}]}]}]},
		]
    };
   
    return {
        //instead of passing in the data have load contents do it for us.
        getData :  getData
    }

});