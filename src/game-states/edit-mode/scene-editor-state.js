define(function(require) {
	var stateMachineFactory = require("state-machine");
	var gb = require("gb");
	var loaderContainer = require("loader-container");
	var canvasContainer = require("canvas-container");
	var sceneEditor = require('scene-editor');

	var game = gb.game;

  return function (name) {
    var state = stateMachineFactory.createState(this, name);

    state.addStartAction(function (args) {
    	// Clear update groups and viewports before doing anything else
    	gb.groups.removeAll();
      gb.viewports.removeAll();

      // Remove extensions the editor does not use
      game.remove_extension(require("center-canvas"));

    	// Setup pools for the scene player state
    	require('common-bundle').create();
	    require('cannon-bundle').create();
	    require('obstacle-bundle').create();
	    require('boss-bundle').create();
	    require('control-objects-bundle').create();
	    require('items-bundle').create(); 
    });

    state.addStartAction(function (initialScene) {
    	canvasContainer.detachCanvas();
    	sceneEditor.create(initialScene);

    	// When the scene editor exits
		  sceneEditor.once(sceneEditor.EXIT, this, function() {
		  	// Trigger a loader transition
		    loaderContainer.transition();

		    // When the loader closes
		    loaderContainer.once(loaderContainer.CLOSE, this, function() {
		    	// Do things needed after leaving this state
		    	completeActions();  	
		    	// Signal the state is complete
		    	state.execute(state.BACK); 	 
		    });
		  });

		  // When the preview button is clicked
		  sceneEditor.once(sceneEditor.PREVIEW, this, function() {
		  	// Trigger a loader transition
		    loaderContainer.transition();

		    // When the loader closes
		    loaderContainer.once(loaderContainer.CLOSE, this, function() {
		    	state.execute(state.NEXT, { nextInitArgs: null, lastCompleteArgs: null }); 	 
		    });
		  });
    });

    state.addStartAction(function (args) {
    	// Add editor extensions
    	game.add_extension(require("activity-display"), { hide: true });
    	game.add_extension(require("logger"), { hide: true });
    	game.add_extension(require("mouse-events"));
    	game.add_extension(require("fit-canvas-in-region"));
    });

    state.addCompleteAction(function (args) {
    	// Do things needed after leaving this state
    	completeActions();
    });

    var completeActions = function() {
    	// Remove editor extensions
    	game.remove_extension(require("activity-display"));
    	game.remove_extension(require("logger"));
    	game.remove_extension(require("mouse-events"));
    	game.remove_extension(require("fit-canvas-in-region"));

    	// Clean up the scene editor    	
		  sceneEditor.cleanUp();

    	// Signal that pools and the instances they hold should be cleared
    	gb.reclaimer.clearAllObjectsFromPools().now();
    	gb.reclaimer.clearAllPools().now();
    }

    Object.defineProperty(state, "BACK", { get: function() { return 'back'; } });

    return state;
  };
});   

  