define(["knockout", "folder"], function (ko, folder) {
        "use strict";
    function Library(headers, root) {
        this.root = ko.observable(root || []);
        this.current = ko.observable(root || []);
        this.headers = ko.observableArray(headers || []);
        this.filterBy = ko.observable("");
        this.search = ko.observable("");
        this.navigation = ko.observableArray([root] || []);
        this.selected = ko.observable(undefined);
        this.current().contents.sort(this.sort("name"));
        this.fileEditor = ko.observable(false);
        this.globalSelector = ko.observable(false);
        this.headers().unshift('select');
        this.searchArray = ko.observableArray([]);
        this._buildSearch(this.root());
        this.multiSelect = ko.observableArray([]);
        this.folderList = ko.observableArray(undefined);
        this.showMoveEditor = ko.observable(false);
    };

    Library.prototype._buildMoveOptions = function(){
        this.folderList([]);
        var allContents = this.current().contents;
        for (var i = allContents().length - 1; i >= 0; i--) {
            var content = allContents()[i];
            if(content.type === 'folder' && content.select() === false && this.selected() !== content){
                this.folderList.push(content);
            }
        };
        for(var j = this.navigation().length - 1; j >= 0; j--){
            var navContents = this.navigation()[j];
            if(this.folderList.indexOf(navContents) === -1 && navContents !== this.current()){
                this.folderList.push(navContents);
            }
        }
    };

    Library.prototype._getMultiForFunction = function(){
        var allSelected = this.multiSelect();
        if(allSelected.length === 0){
            if(this.selected() !== undefined && allSelected.indexOf(this.selected()) === -1){
            allSelected.push(this.selected());
            }
        }
        
        return allSelected;
    }

    Library.prototype.moveSelectedToFile = function(data){
       var allSelected = this._getMultiForFunction();

        for (var i = allSelected.length - 1; i >= 0; i--) {
            var file = allSelected[i];
            if(file !== data){
                data.contents.push(file);
            }
        };

        this._clearMultiSelect();

    }

    Library.prototype._removeInnerFilesFromFolder = function _removeInnerFilesFromFolder(folder){
    	var folders = folder.contents();
    	for (var i = folders.length - 1; i >= 0; i--) {
    		var file = folders[i];
    		if(file.type === 'folder'){
    			this._removeInnerFilesFromFolder(file);
    		}
    		else {
    			this.searchArray.remove(file);
    		}
    	};
    	return;
    };

    Library.prototype.deleteAll = function(){
       var allSelected = this._getMultiForFunction();
       for (var i = allSelected.length - 1; i >= 0; i--) {
       	var file = allSelected[i];
       	if(file.type === 'folder'){
       		this._removeInnerFilesFromFolder(file);
       	}
       	else {
       		this.searchArray.remove(file);
       	}
       };

        this._clearMultiSelect();
    }

    Library.prototype._clearMultiSelect = function(){
        this.current().contents.removeAll(this.multiSelect());
        this.selected(undefined);
        this.folderList([]);
        this.multiSelect([]);
        this.showMoveEditor(false);
    }

    Library.prototype.showFoldersOption = function(){
        this._buildMoveOptions();
        this.showMoveEditor(true);
    };

    Library.prototype.hideMoveEditor = function(){
        this.showMoveEditor(false);
        this.folderList([]);
    };

    Library.prototype._buildSearch = function _buildSearch(folder){
        var allContents = folder.contents;
        for (var i = allContents().length - 1; i >= 0; i--) {
            var content = allContents()[i];
            if(content.type !== 'folder'){
                this.searchArray().push(content);
            }
            else {
                this._buildSearch(content);
            }
        };
        return;
    };

    Library.prototype.selectAll = function(){
        var content = this.current().contents();
        this.globalSelector() === true ? this.globalSelector(false) : this.globalSelector(true);
        for (var i = content.length - 1; i >= 0; i--) {
            content[i].select(this.globalSelector());
            this.multiSelect.push(content[i]);
            
        }; 
    }

    Library.prototype.toggleFromMultiSelect = function(data){
        this.multiSelect.indexOf(data) === -1 ? this.multiSelect.push(data) : this.multiSelect.remove(data);
        return true;
    }

    Library.prototype.deselectAll = function(){
        var content = this.current().contents();
        this.globalSelector(false);
        for (var i = content.length - 1; i >= 0; i--) {
            content[i].select(this.globalSelector());
            if(content[i] !== this.selected()){
                this.multiSelect.remove(content[i]);
            }
            
        };
    };

    Library.prototype.filter = function() {
        var all = this.searchArray();
        var filters = ko.observableArray();
        for(var i = all.length - 1; i >= 0; i--){
            var item = all[i];
            if(item.type !== 'folder'){
                var headers = this.headers();
                for (var j = headers.length - 1; j >= 0; j--) {
                    var property = headers[j];
                    var field = item[property]();
                    if(typeof field === "string"){
                      if(field.toLowerCase().indexOf(this.search().toLowerCase()) > -1) {
                            filters.push(item);
                            break;
                        }  
                    }
                
            };
            }
        }
        var searchResults = new folder.createFolder("search results", filters());
        this.current(searchResults);
    };


    Library.prototype.sort = function(header) {
            this.current().contents.sort(function(left, right){
            var f = new folder.createFolder();
            if(left.type === 'folder' && right.type === 'folder'){
                var i = left.name === right.name ? 0 : left.name < right.name ? -1 : 1
                return i;
            }
            else if (left.type === 'folder' || right.type === 'folder'){
                return Object.getPrototypeOf(left) === Object.getPrototypeOf(f) ? -1 : 1
            }
            else {
                return left[header] === right[header] ? 0 : left[header] < right[header] ? -1 : 1
            }
        });

    };

    Library.prototype.showEditor = function(){
        this.fileEditor(true);
    };

    Library.prototype.hideEditor = function(){
        this.fileEditor(false);
        this.selected(undefined);
        this.sort("name");
    }


    Library.prototype.clicked = function(data){
        this.selected(data);
    };

    Library.prototype.doubleClicked = function(data){
        if(data.type === 'folder'){
            this.changeDirectory(data);
        }
        

    };

    Library.prototype.clickToEdit = function(data){
        if(this.selected() === data){
            this.fileEditor(true);
        }
        else {
            this.fileEditor(false);
        }
        this.selected(data);

    };


    Library.prototype.changeDirectory = function(next){
        this.deselectAll();
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
                path.push(nav);
                if(nav.name() === next.name()){
                    break;
                }
            };

            this.navigation(path);
        }
    this.current(next);
    this.sort("name");
    this.selected(undefined);
    this.deselectAll();
    };

    Library.prototype.selectFunction = function(headername) {
        this.filterBy(headername);
    };

    Library.prototype.add = function() {
    	var f = new folder.createFolder();
        this.selected(f);
        this.fileEditor(true);
        this.current().contents.push(f);
        this.sort("name");
    };

   
    return {
        //instead of passing in the data have load contents do it for us.
        createLibrary :  Library
    }

});