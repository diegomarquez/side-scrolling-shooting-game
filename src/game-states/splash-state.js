define(function(require) {
	var loaderContainer = require('loader-container');
	var canvasContainer = require('canvas-container');
	var stateMachineFactory = require("state-machine");
	var gb = require("gb");

	var soundPlayer = require("sound-player");

	var game = gb.game;

	return function (name) {
		var state = stateMachineFactory.createState(this, name);

		state.addStartAction(function (args) {
			// Play the intro loop if it isn't already playing
			soundPlayer.playLoop("INTRO");

			// Clear update groups and viewports before doing anything else
			gb.groups.removeAll();
			gb.viewports.removeAll();

			// Setup groups and viewports for the splash screen
			gb.groups.add("First");
			gb.groups.add("Second");
			
			var mainViewport = gb.viewports.add("Main", gb.canvas.width, gb.canvas.height, 0, 0);
			mainViewport.addLayer("Front");

			// Setup pools for the splash screen
			require('common-bundle').create();
			require('splash-bundle').create();
			require('sound-bundle').create();

			// Add extensions
			game.add_extension(require("center-canvas"));

			// Remove Extensions
			game.remove_extension(require("activity-display"));
			game.remove_extension(require("logger"));
			game.remove_extension(require("mouse-events"));
			game.remove_extension(require("fit-canvas-in-region"));

			// Wrap the canvas into a div only if the div is not already there
			if (!document.getElementById('main-player-container')) {
				this.mainContainer = document.createElement('div');
				this.mainContainer.id = 'main-player-container';
				document.body.appendChild(this.mainContainer);	   
			}

			canvasContainer.detachCanvas();
			document.getElementById('main-player-container').appendChild(canvasContainer.getCanvasContainer());
				
			if (loaderContainer.isOpen()) {
				// If the loader is already open, do the splash animation
				doSplash();
			} else {
				// If the loader is closed setup the loader events
				loaderContainer.once(loaderContainer.TRANSITION, this, doSplash);
				loaderContainer.once(loaderContainer.OPEN, this, doSplash);     
			}
		});

		state.addCompleteAction(function (args) {
			// Remove loader events 
			loaderContainer.remove(loaderContainer.TRANSITION, this, doSplash);
			loaderContainer.remove(loaderContainer.OPEN, this, doSplash);

			// Clear all instances and destroy pools
			gb.reclaimer.clearAllObjectsFromPools().now();
			gb.reclaimer.clearAllPools().now();

			// If the next state is the scene editor ...
			if (args === 'edit-mode') {
				// Save the canvas for later use
				canvasContainer.detachCanvas();
				// Remove the canvas container from the DOM
				$(this.mainContainer).remove(); 
			}
		});

		var doSplash = function() {
			// Go straight to the basic editor
			if (require('query-string').startInEditorBasic()) {
				require('mode').setBasic();

				loaderContainer.once(loaderContainer.CLOSE, this, function() {
					// Stop playing music when going into the editor
					soundPlayer.stop("INTRO");

					state.execute(state.NEXT, { nextInitArgs:'edit-mode', lastCompleteArgs: 'edit-mode' });
				});

				loaderContainer.transition();
    			
    			return;
			}

			// Go straight to the advanced editor
			if (require('query-string').startInEditorAdvanced()) {
    			require('mode').setAdvanced();

    			loaderContainer.once(loaderContainer.CLOSE, this, function() {
					state.execute(state.NEXT, { nextInitArgs:'edit-mode', lastCompleteArgs: 'edit-mode' });
				});

				loaderContainer.transition();
    			
    			return;
			}

			var splash = gb.create('Title', 'First', [ { viewport: 'Main', layer: 'Front' } ]);

			splash.on(splash.PLAY, this, function() {
				state.execute(state.NEXT, { nextInitArgs:'play-mode', lastCompleteArgs: 'play-mode' });
			});

			splash.on(splash.EDIT, this, function(advanced) {

				if (advanced) {
					require('mode').setAdvanced();	
				} else {
					require('mode').setBasic();
				}

				// Once the loader animation is complete go to the game mode state signaling the edit option was selected
				loaderContainer.once(loaderContainer.CLOSE, this, function() {
					// Stop playing music when going into the editor
					soundPlayer.stop("INTRO");

					state.execute(state.NEXT, { nextInitArgs:'edit-mode', lastCompleteArgs: 'edit-mode' });
				});

				loaderContainer.transition();
			});

			splash.on(splash.CUSTOM, this, function() {
				state.execute(state.NEXT, { nextInitArgs:'custom-mode', lastCompleteArgs: 'custom-mode' });
			}); 
		}

		return state;
	};
});
