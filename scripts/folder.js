define(["knockout"], function (ko) {
     "use strict";
    function Folder(name, contents) {
        this.name = ko.observable(name || []);
        this.contents = ko.observableArray(contents || []);
        this.show = ko.observable(true);
    };

    Folder.prototype.collapse = function(){
    	this.show() == true ? this.show(false) : this.show(true);
    }

    Folder.prototype.add = function(content){
    	this.contents.push(content);
    }

    //probably have add functions etc.

   
    return {
        createFolder :  Folder
    }

});