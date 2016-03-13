// side-shmup's main entry point

define(function(require){
	var gb = require('gb');
	var loaderContainer = require('loader-container');
	var queryString = require('query-string');

	var game = gb.game;

	game.add_extension(require("patch-collider-components"));
	game.add_extension(require("patch-game-object-configuration"));
	game.add_extension(require("patch-game-object-pool"));

	game.add_extension(require("pause"));
	game.add_extension(require("resume"));
	game.add_extension(require("sound-control"));
	game.add_extension(require("timers-control"));
	game.add_extension(require("tweens-control"));

	var stateMachineFactory = require('state-machine');
	var mainStateMachine = stateMachineFactory.createFixedStateMachine(); 

	mainStateMachine.add((require('splash-state'))('splash_state'));
	mainStateMachine.add((require('game-modes-state'))('game_modes_state'));

	// Execute when there is scene information in the url
	function urlStartUp(scene) {
		game.once(game.CREATE, this, function() {
			try {
				// Start in the game modes state, in the url loading mode
				mainStateMachine.start({ mode: 'url-mode', data: scene }, 1);
			} catch (e) {
				// Should there be any problems, fallback to the regular initialization
				
				// Start in the splash state
				mainStateMachine.start();
				// Open the loader
				loaderContainer.open();

				return;
			}
		});

		game.on(game.UPDATE, this, function (delta) {
			mainStateMachine.update(delta);
		});

		game.create();
	}

	// Execute when scene infromation could not be found in the url
	function basicStartUp () {
		game.on(game.CREATE, this, function() {
			// Start in the splash state
			mainStateMachine.start();
			// Open the loader
			loaderContainer.open();
		});

		game.on(game.UPDATE, this, function (delta) {
			mainStateMachine.update(delta);
		});

		game.create();	
	}

	// Choose a start up routine according to what is found in the query string
	queryString.hasScene(urlStartUp, basicStartUp);
});
