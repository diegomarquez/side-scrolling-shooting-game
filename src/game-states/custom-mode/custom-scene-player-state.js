define(function(require) {
	var stateMachineFactory = require("state-machine");
	
	var gb = require("gb");
	var viewportFollow = require('viewport-follow');
	var scenePlayer = require('game-scene-player');
	var localStorageWrapper = require('local-storage');
	var loaderContainer = require('loader-container');
	var util = require('util');

  	return function (name) {
    	var state = stateMachineFactory.createState(this, name);

	    state.addStartAction(function (args) {
	    	// Clear update groups and viewports before doing anything else
	    	gb.groups.removeAll();
	      	gb.viewports.removeAll();
	    });

		state.addStartAction(function (scene) {
			scenePlayer.once(scenePlayer.ESCAPE, this, function () {
				loaderContainer.once(loaderContainer.CLOSE, this, function() {
					state.execute(state.PREVIOUS, { nextInitArgs: null, lastCompleteArgs: null });	
				});

				loaderContainer.transition();
			});

			// When the scene is completed successfully
			scenePlayer.once(scenePlayer.EXIT, this, function () {	
				loaderContainer.once(loaderContainer.CLOSE, this, function() {
					state.execute(state.PREVIOUS, { nextInitArgs: null, lastCompleteArgs: null });	
				});

				loaderContainer.transition();
			});

			// When the scene is failed
			scenePlayer.once(scenePlayer.FAILURE, this, function () {
				loaderContainer.once(loaderContainer.CLOSE, this, function() {
					state.execute(state.PREVIOUS, { nextInitArgs: null, lastCompleteArgs: null });	
				});

				loaderContainer.transition();
			});

			// Wait for the loader to complete a transition before playing the scene
			loaderContainer.once(loaderContainer.TRANSITION, this, function() {
				scenePlayer.start();	
			});

			// Load the scene from a string or from an object
			if (util.isString(scene)) {
				scenePlayer.create(JSON.parse(localStorageWrapper.getScene(scene)));
			} else {
				scenePlayer.create(scene);
			}
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

			// Clean up loader events
			loaderContainer.hardCleanUp();
	    });

    	return state;
  	};
});   

  