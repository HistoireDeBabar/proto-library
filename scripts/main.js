require(["knockout", "libraryBuilder", "emrLibraryService"], function(ko, libraryBuilder, service) {
	"use strict";
    var viewModel = {
	    library: libraryBuilder.build(service.getData() || [])
	}

	ko.applyBindings(viewModel);

});