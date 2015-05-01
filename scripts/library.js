define(["knockout", "folder"], function (ko, folder) {
     "use strict";
    function Library(headers, root) {
        this.root = ko.observable(root || []);
        this.current = ko.observable(root || []);
        this.headers = ko.observableArray(headers || []);
        this.filterBy = ko.observable("");
        this.search = ko.observable("");
        this.navigation = ko.observableArray([root] || []);
        this.selected = ko.observable();
        this.current().contents.sort(this.sort("name"));
        this.fileEditor = ko.observable(false);
        this.globalSelector = ko.observable(false);
        addSelectCol(this.current().contents());
        this.headers().unshift('select');

    };

    var addSelectCol = function addSelectCol(content){
        for (var i = content.length - 1; i >= 0; i--) {
            content[i].select = ko.observable(false);
            if(content[i].type === 'folder'){
                addSelectCol(content[i].contents);
                console.log(content[i].select());
            }
            console.log(content[i].select());
        };
        return;

    }

    Library.prototype.selectAll = function(){
        var content = this.current().contents();
        this.globalSelector() === true ? this.globalSelector(false) : this.globalSelector(true);
        for (var i = content.length - 1; i >= 0; i--) {
            console.log(content[i]);
            if(content[i].select){
                content[i].select(this.globalSelector());
            }
            else {
                var g = this.globalSelector();
                content[i].select = g;
            }
            
        }; 
    }

    Library.prototype.deselectAll = function(){
        var content = this.current().contents();
        this.globalSelector(false);
        for (var i = content.length - 1; i >= 0; i--) {
            content[i].select(this.globalSelector());
        }; 
    }

    Library.prototype.filter = function() {
        //user filter data-bind?
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
        this.fileEditor() === true ? this.fileEditor(false) : this.fileEditor(true);
        this.sort("name");
    };

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
    this.selected(undefined);
    };

    Library.prototype.selectFunction = function(headername) {
        this.filterBy(headername);
    };

    Library.prototype.add = function() {
    	var f = new folder.createFolder();
        this.current().contents.push(f);
        this.selected(f);
        this.fileEditor(true);
        this.sort("name");
    };

   
    return {
        //instead of passing in the data have load contents do it for us.
        createLibrary :  Library
    }

});