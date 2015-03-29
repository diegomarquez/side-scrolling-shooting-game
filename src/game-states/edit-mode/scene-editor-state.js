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

      // Remove extensions
      game.remove_extension(require("center-canvas"));

    	// Setup pools for the scene player state
    	require('common-bundle').create();
	    require('cannon-bundle').create();
	    require('obstacle-bundle').create();
	    require('boss-bundle').create();
	    require('control-objects-bundle').create();
	    require('items-bundle').create(); 
    });

    state.addStartAction(function (args) {
    	canvasContainer.detachCanvas();
    	
    	sceneEditor.create();

    	// When the scene editor exits
		  sceneEditor.once(sceneEditor.EXIT, this, function() {
		  	// Trigger a loader transition
		    loaderContainer.transition();

		    // When the loader closes
		    loaderContainer.once(loaderContainer.CLOSE, this, function() {
		    	// Do things needed after leaving this state
		    	completeActions();
		    	// Clean up the scene editor view    	
		    	sceneEditor.cleanUp();
		    	// Signal the state is complete
		    	state.execute(state.BACK); 	 
		    });
		  });
    });

    state.addStartAction(function (args) {
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
    	game.remove_extension(require("activity-display"));
    	game.remove_extension(require("logger"));
    	game.remove_extension(require("mouse-events"));
    	game.remove_extension(require("fit-canvas-in-region"));
    }

    Object.defineProperty(state, "BACK", { get: function() { return 'back'; } });

    return state;
  };
});   

  