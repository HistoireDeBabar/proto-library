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

	function it2(testDesc, mockData, func){
		it(testDesc, function(done){
	    	injector.mock("doesn't seem to matter what goes in here as long as it matches the param in require", mockData);
			injector.require(["doesn't seem to matter what goes in here as long as it matches the param in require"], func(mockData));
			done();
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
				var cont = [{type: 'campaign', name : 'campaign 4', description: 'testing 4', active : false}, {type: 'campaign', name : "campaign 5", description: "testing 5", "active" : true}];
				var folder = new fold.createFolder("test name", cont);
				expect(folder).toBeDefined();
				expect(folder.name()).toBe("test name");
				expect(folder.contents()).toBe(cont);
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
				build : function(){
				}
			};
			//non 'wrapped' version
			it("should call build function (non wrapped version)", function(done){
				injector.mock("libraryBuilder", mockData);
				injector.require(["libraryBuilder"], function(libraryBuilder){
					spyOn(libraryBuilder, "build");
					libraryBuilder.build();
					expect(libraryBuilder.build).toHaveBeenCalled();
					done();
				},
				function(error) {
					done.fail(error);
				});
			});

			//'wrapped' version
			it2("should call build function (wrapped version)", mockData, function(libraryBuilder){
				spyOn(libraryBuilder, "build");
				libraryBuilder.build();
				expect(libraryBuilder.build).toHaveBeenCalled();
			});
		});
	});
});
