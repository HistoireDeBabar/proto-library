//container for tests
describe("Example", function() {
	describe ("Expect", function() {
		describe("true", function(){
			//test
			it("should equal true", function(){
				expect(true).toEqual(true);
			});
		});
		//container for tests
		describe("Function", function(){
			//tests
			it("should be called", function(){
				var thisIs = {
					awesome: function(){}
				};
				//spy on creates an internal proxy of the this is object
				//and the awesome function within it.
				spyOn(thisIs, "awesome");
				//we can now call the method...
				thisIs.awesome();
				//and can then see whether is has been called (or not)
				expect(thisIs.awesome).toHaveBeenCalled(); 

			});
		});
	});

});



describe("Library", function(){
	//uses mock objects of amd 
	//you can 'injector.mock and require'
	var injector;

	function it2(testDesc, objectDesc, mockData, func){
		it(testDesc, function(done){
	    	injector.mock(objectDesc, mockData);
			injector.require([objectDesc], test);
		});
	};

	beforeEach(function (done){
		require(['squire'], function (squire){
			injector = new squire();
			done();
		});
	});

	afterEach(function(){
		injector.remove();
	});



	describe("Folder", function(){
		it("Should have state", function(done){
			injector.require(['folder'], function(fold) {
				var folder = new fold.createFolder("test name", [{type: 'campaign', name : 'campaign 4', description: 'testing 4', active : false}, {type: 'campaign', name : "campaign 5", description: "testing 5", "active" : true}]);
				expect(folder).toBeDefined();
				expect(folder.name()).toBe("test name");
				expect(folder.contents()).toBe([{type: 'campaign', name : 'campaign 4', description: 'testing 4', active : false}, {type: 'campaign', name : "campaign 5", description: "testing 5", "active" : true}]);
				done();
			}, 
			function(error) {
				done.fail(error);
			});
		});
	});

	describe("Library Builder", function(){
		describe("Build Function calls", function(){
		var mockData =  {
			buildHeaders : function(){},
			createRoute : function(){},
			buildFolders : function(){},
			build : function(){
				buildHeaders();
				createRoute();
				buildFolders();
			}
		};
		it2("should call builder header function", "libraryBuilder", mockData, function(libraryBuilder){
			spyOn(libraryBuilder, "buildHeaders");
			libraryBuilder.build();
			expect(libraryBuilder.buildHeaders).toHaveBeenCalled();
		});

		it2("should call createRoute function", "libraryBuilder", mockData, function(done){
			injectTest(done, mockData, function(libraryBuilder){
			spyOn(libraryBuilder, "createRoute");
			libraryBuilder.build();
			expect(libraryBuilder.createRoute).toHaveBeenCalled();
			});
		});
		it2("should call buildFolders function", "libraryBuilder", mockData, function(done){
			injectTest(done, mockData, function(libraryBuilder){
			spyOn(libraryBuilder, "buildFolders");
			libraryBuilder.build();
			expect(libraryBuilder.buildFolders).toHaveBeenCalled();
			});
		});
		});
	});
});
