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
	    require('stage-overview-bundle').create();

	    // Create the stage overview game object
	    var stageOverview = gb.create('StageOverview', 'First', [ { viewport: 'Main', layer: 'Front' } ]);

	    // If the 'back' option is selected, go to the previous state
	    stageOverview.on(stageOverview.BACK_EXIT, this, function() {
	    	state.execute(state.BACK);
	    }); 

	    // If the 'start' option is selected, go to the scene player state
	    stageOverview.on(stageOverview.START_SELECTED, this, function() {
	    	loaderContainer.transition();
  		});

  		loaderContainer.once(loaderContainer.CLOSE, this, nextState);
    });

    state.addCompleteAction(function (args) {
    	// Remove loader events
    	loaderContainer.remove(loaderContainer.CLOSE, this, nextState);

      // Signal that pools and the instances they hold should be cleared
    	gb.reclaimer.clearAllObjectsFromPools().now();
    	gb.reclaimer.clearAllPools().now();
    });

    var nextState = function() {
    	state.execute(state.NEXT, { nextInitArgs: null, lastCompleteArgs: null });
    }

    Object.defineProperty(state, "BACK", { get: function() { return 'back'; } });

    return state;
  };
});   

  