define(function(require) {
	var stateMachineFactory = require("state-machine");
	
	var gb = require("gb");
	var viewportFollow = require('viewport-follow');
	var scenePlayer = require('game-scene-player');
	var localStorageWrapper = require('local-storage');
	var loaderContainer = require('loader-container');

	return function (name) {
		var state = stateMachineFactory.createState(this, name);

		state.addStartAction(function (levelIndex) {
			// Clear update groups and viewports before doing anything else
			gb.groups.removeAll();
			gb.viewports.removeAll();
		});

		state.addStartAction(function (sceneJsonString) {
			
			// Add extensions
			gb.game.add_extension(require("center-canvas"));

			scenePlayer.once(scenePlayer.ESCAPE, this, function () {
				loaderContainer.once(loaderContainer.CLOSE, this, function() {
					state.execute(state.BACK);	
				});

				loaderContainer.transition();
			});

			scenePlayer.once(scenePlayer.EXIT, this, function () {
				loaderContainer.once(loaderContainer.CLOSE, this, function() {
					state.execute(state.BACK);	
				});

				loaderContainer.transition();
			});

			scenePlayer.once(scenePlayer.FAILURE, this, function () {
				loaderContainer.once(loaderContainer.CLOSE, this, function() {
					state.execute(state.BACK);	
				});

				loaderContainer.transition();
			});

			// Wait for the loader to complete a transition before playing the scene
			loaderContainer.once(loaderContainer.OPEN, this, function() {
				scenePlayer.start();
			});

			// Load the scene
			scenePlayer.create(JSON.parse(sceneJsonString));
			
			// Store the url scene in the local storage to be able to load it from other parts of the application
			localStorageWrapper.setUrlScene(sceneJsonString);

			// Everything is setup, open the loader
			loaderContainer.open();
		});

		state.addUpdateAction(function (delta) {
			viewportFollow.update(delta);
		});

		state.addCompleteAction(function (args) {
			gb.game.remove_extension(require("center-canvas"));

			// Signal that pools and the instances they hold should be cleared
			gb.reclaimer.clearAllObjectsFromPools().now();
			gb.reclaimer.clearAllPools().now();

			// Clean up the scene player      
			scenePlayer.cleanUp();

			// Clean up loader events
			loaderContainer.hardCleanUp();
		});

		Object.defineProperty(state, "BACK", { get: function() { return 'back'; } });

		return state;
	};
});   

	