define(["knockout"], function (ko) {
     "use strict";
    function Library(headers, root) {
        this.root = ko.observable(root || []);
        this.current = ko.observable(root || []);
        this.headers = ko.observableArray(headers || []);
        this.filterBy = ko.observable("");
        this.search = ko.observable("");
        this.navigation = ko.observableArray([root] || []);
        // this.folders.sort(function(left, right){
        // 	return left.name === right.name ? 0 : left.name < right.name ? -1 : 1
        // });
    };

    Library.prototype.filter = function() {
        //user filter data-bind?
    };

    Library.prototype.sort = function(header) {
        //user sort data-bind?
      //   console.log(header);
      //   var folders = this.folders().contents;
      //   for(var i = folders.length - 1; i >= 0; i--){
    		// folders[i].contents.sort(function(left, right){
    		// 	return left[header] === right[header] ? 0 : left[header] < right[header] ? -1 : 1
    		// });
      //   }

    };

    Library.prototype.changeDirectory = function(next){
    	console.log(next);
    	if(next === this.current()) {
    		return;
    	}
    	if(this.navigation.indexOf(next) === -1){
    		this.navigation.push(next);
    	}
    	else{
    		var notFound = true;
    		var path = [];
			for (var i = 0; i <= this.navigation().length - 1; i++) {
				var nav = this.navigation()[i];
				console.log(nav.name());
				console.log(next.name());
				path.push(nav);
				if(nav.name() === next.name()){
					break;
				}
			};

			this.navigation(path);
    	}
    	console.log(this.navigation());
    	this.current(next);
    };

    Library.prototype.selectFunction = function(headername) {
        this.filterBy(headername);
    };

    Library.prototype.collapse = function(folder) {
    	// var folders = this.folders();
    	// for(var i = folders.length - 1; i >= 0; i--) {
    	// 	if(folder === folders[i]){
    	// 		folders[i].collapse();
    	// 	}
    	// }
    };

   
    return {
        //instead of passing in the data have load contents do it for us.
        createLibrary :  Library
    }

});