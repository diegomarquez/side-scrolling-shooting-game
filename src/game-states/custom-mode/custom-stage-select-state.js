define(function(require) {
	var stateMachineFactory = require("state-machine");
	var gb = require("gb");
	var loaderContainer = require('loader-container');

  return function (name) {
    var state = stateMachineFactory.createState(this, name);

    state.addStartAction(function (args) {
    	// Clear update groups and viewports before doing anything else
    	gb.groups.removeAll();
      gb.viewports.removeAll();

    	// Setup groups and viewports for the splash screen
    	gb.groups.add("First");
    	var mainViewport = gb.viewports.add("Main", gb.canvas.width, gb.canvas.height, 0, 0);
    	mainViewport.addLayer("Front");

    	// Setup pools for the stage overview screen
    	require('common-bundle').create();
	    require('custom-stage-select-bundle').create();

	    // Create the stage overview game object
	    var customStageSelect = gb.create('CustomStageSelect', 'First', [ { viewport: 'Main', layer: 'Front' } ]);

	    // If the 'back' option is selected, go to the previous state
	    customStageSelect.on(customStageSelect.BACK_EXIT, this, function() {
	    	state.execute(state.BACK);
	    }); 

	    // If the 'start' option is selected, go to the scene player state
	    customStageSelect.on(customStageSelect.START_SELECTED, this, function (selectedStage) {
	    	loaderContainer.once(loaderContainer.CLOSE, this, function () {
	    		state.execute(state.NEXT, { nextInitArgs: selectedStage, lastCompleteArgs: null });
	    	});

	    	loaderContainer.transition();
  		});
    });

    state.addCompleteAction(function (args) {
      // Signal that pools and the instances they hold should be cleared
    	gb.reclaimer.clearAllObjectsFromPools().now();
    	gb.reclaimer.clearAllPools().now();
    }); 

    Object.defineProperty(state, "BACK", { get: function() { return 'back'; } });

    return state;
  };
});   

  