define([], function () {
     "use strict";


    var getData = function(){
    	return [
			{name : 'folder1', 'contents': [{name : 'campaign 1', description: 'testing 1', active : true}] },
			{name : 'folder2', 'contents': [{name : 'campaign 2', description: 'testing 2', active : true}, {name : "campaign 3", description: "testing 3", "active" : false}]},
			{'contents': [{name : 'campaign 4', description: 'testing 4', active : false}, {name : "campaign 5", description: "testing 5", "active" : true}] },
			{name : 'folder6', 'contents': [{name: 'folder 7', 'contents' : [{name : 'campaign 7', description: 'testing 7', active : true}]}]},
		]
    };
   
    return {
        //instead of passing in the data have load contents do it for us.
        getData :  getData
    }

});