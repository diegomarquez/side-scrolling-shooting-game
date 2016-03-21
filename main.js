// side-shmup's main entry point

define(function(require) {
	var gb = require('gb');
	var loaderContainer = require('loader-container');
	var queryString = require('query-string');

	this.game = gb.game;

	this.game.add_extension(require("patch-collider-components"));
	this.game.add_extension(require("patch-game-object-configuration"));
	this.game.add_extension(require("patch-game-object-pool"));

	this.game.add_extension(require("pause"));
	this.game.add_extension(require("resume"));
	this.game.add_extension(require("sound-control"));
	this.game.add_extension(require("timers-control"));
	this.game.add_extension(require("tweens-control"));

	this.stateMachineFactory = require('state-machine');
	this.mainStateMachine = this.stateMachineFactory.createFixedStateMachine(); 

	this.mainStateMachine.add((require('splash-state'))('splash_state'));
	this.mainStateMachine.add((require('game-modes-state'))('game_modes_state'));

	// Execute when there is scene information in the url
	function urlStartUp(scene) {
		this.game.once(this.game.CREATE, this, function() {
			try {
				// Start in the game modes state, in the url loading mode
				this.mainStateMachine.start({ mode: 'url-mode', data: scene }, 1);
			} catch (e) {
				// Should there be any problems, fallback to the regular initialization
				
				// Start in the splash state
				this.mainStateMachine.start();
				// Open the loader
				loaderContainer.open();

				return;
			}
		});

		this.game.on(this.game.UPDATE, this, function (delta) {
			this.mainStateMachine.update(delta);
		});

		this.game.create();
	}

	// Execute when scene infromation could not be found in the url
	function basicStartUp () {
		this.game.on(this.game.CREATE, this, function() {
			// Start in the splash state
			this.mainStateMachine.start();
			// Open the loader
			loaderContainer.open();
		});

		this.game.on(this.game.UPDATE, this, function (delta) {
			this.mainStateMachine.update(delta);
		});

		this.game.create();	
	}

	// Choose a start up routine according to what is found in the query string
	queryString.hasScene(urlStartUp.bind(this), basicStartUp.bind(this));
});
