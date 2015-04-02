define(function(require) {
	var stateMachineFactory = require("state-machine");
	
	var gb = require("gb");
	var viewportFollow = require('viewport-follow');
	var scenePlayer = require('scene-player');
	var levelStorage = require('level-storage');
	var loaderContainer = require('loader-container');

  return function (name) {
    var state = stateMachineFactory.createState(this, name);

    state.addStartAction(function (args) {
    	// Clear update groups and viewports before doing anything else
    	gb.groups.removeAll();
      gb.viewports.removeAll();
    });

		state.addStartAction(function () {
			var level = levelStorage.getLowestIncompleteLevel();

			// When the scene is completed successfully
			scenePlayer.once(scenePlayer.EXIT, this, function () {
				// Save to local storage
				levelStorage.completeLevel(level);
				// Go back to the overview state
				state.execute(state.PREVIOUS, { nextInitArgs: null, lastCompleteArgs: null });
			});

			// Wait for the loader to complete a transition before playing the scene
			loaderContainer.once(loaderContainer.TRANSITION, this, function() {
				scenePlayer.start();	
			});

			// Load the scene
			scenePlayer.create(level);
		});

		state.addUpdateAction(function (delta) {
			viewportFollow.update(delta);
		});

    state.addCompleteAction(function (args) {
      // Signal that pools and the instances they hold should be cleared
    	gb.reclaimer.clearAllObjectsFromPools().now();
    	gb.reclaimer.clearAllPools().now();

	  	// Clean up the scene player    	
		  scenePlayer.cleanUp();
    });

    return state;
  };
});   

  