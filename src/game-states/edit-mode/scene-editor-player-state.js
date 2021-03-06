define(function(require) {
	var stateMachineFactory = require("state-machine");

	var gb = require("gb");
	var viewportFollow = require('viewport-follow');
	var scenePlayer = require('preview-scene-player');
	var localStorageWrapper = require('local-storage');
	var loaderContainer = require('loader-container');

	return function (name) {
		var state = stateMachineFactory.createState(this, name);

		state.addStartAction(function (args) {
			// Clear update groups and viewports before doing anything else
			gb.groups.removeAll();
			gb.viewports.removeAll();

			// Add extensions
			gb.game.add_extension(require("center-canvas"));
		});

		state.addStartAction(function (args) {
			var previewSceneString = localStorageWrapper.getPreviewScene();
			var previewScene = JSON.parse(previewSceneString);

			scenePlayer.once(scenePlayer.ESCAPE, this, function () {
				// Wait for the loader to close before going back to the previous state
				loaderContainer.once(loaderContainer.CLOSE, this, function() {
					// Go back to the overview state
					state.execute(state.PREVIOUS, { nextInitArgs: { scene: previewSceneString, preview: true }, lastCompleteArgs: null });
				});

				loaderContainer.transition();
			});

			// When the scene is completed successfully
			scenePlayer.once(scenePlayer.EXIT, this, function () {
				scenePlayer.enableEscape();
			});

			// When the scene is failed
			scenePlayer.once(scenePlayer.FAILURE, this, function () {
				scenePlayer.enableEscape();
			});

			// Wait for the loader to open before playing the scene
			loaderContainer.once(loaderContainer.OPEN, this, function() {
				scenePlayer.start();
			});

			// Wait for the scene player to complete before opening the loader
			scenePlayer.once(scenePlayer.CREATION_COMPLETE, this, function() {
				loaderContainer.open();
			});

			// Load the scene
			scenePlayer.create(previewScene);
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

