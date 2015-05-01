define(["knockout", "jquery"],function (ko, $) {
    "use strict";

    ko.bindingHandlers.singleClick = {
	    	init: function(element, valueAccessor) {
	        var handler = valueAccessor(),
	            delay = 10,
	            clickTimeout = false;

	        $(element).click(function() {
	            if(clickTimeout !== false) {
	                clearTimeout(clickTimeout);
	                clickTimeout = false;
	            } else {        
	                clickTimeout = setTimeout(function() {
	                    clickTimeout = false;
	                    handler();
	                }, delay);
	            }
	        });
    	}
	}

});