// side-shmup's main entry point

define(function(require) {
	var gb = require('gb');
	var loaderContainer = require('loader-container');
	var queryString = require('query-string');
	var soundPlayer = require('sound-player');

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

	soundPlayer.createChannels(1);

	soundPlayer.add('INTRO', gb.assetMap()['INTRO.OGG']);
	soundPlayer.add('LEVEL_1', gb.assetMap()['LEVEL1.OGG']);

	soundPlayer.loadWithWebAudio('PLAYER_SHOT', gb.assetMap()['PLAYERSHOT.OGG']);
	soundPlayer.loadWithWebAudio('POWER_UP', gb.assetMap()['POWERUP.OGG']);
	soundPlayer.loadWithWebAudio('EXPLOSION_1', gb.assetMap()['EXPLOSION1.OGG']);
	soundPlayer.loadWithWebAudio('EXPLOSION_2', gb.assetMap()['EXPLOSION2.OGG']);
	soundPlayer.loadWithWebAudio('EXPLOSION_3', gb.assetMap()['EXPLOSION3.OGG']);
	soundPlayer.loadWithWebAudio('EXPLOSION_4', gb.assetMap()['EXPLOSION4.OGG']);
	soundPlayer.loadWithWebAudio('EXPLOSION_5', gb.assetMap()['EXPLOSION5.OGG']);
	soundPlayer.loadWithWebAudio('EXPLOSION_6', gb.assetMap()['EXPLOSION6.OGG']);
	soundPlayer.loadWithWebAudio('EXPLOSION_7', gb.assetMap()['EXPLOSION7.OGG']);
	soundPlayer.loadWithWebAudio('BUG', gb.assetMap()['BUG.OGG']);
	soundPlayer.loadWithWebAudio('LARGE_BUG', gb.assetMap()['LARGEBUG.OGG']);
	soundPlayer.loadWithWebAudio('SMALL_LAUNCH', gb.assetMap()['SMALLLAUNCH.OGG']);
	soundPlayer.loadWithWebAudio('BLOOP', gb.assetMap()['BLOOB.OGG']);
	soundPlayer.loadWithWebAudio('OPEN_HATCH', gb.assetMap()['OPENHATCH.OGG']);
	soundPlayer.loadWithWebAudio('HIT', gb.assetMap()['HIT.OGG']);
	soundPlayer.loadWithWebAudio('DEFLECT', gb.assetMap()['DEFLECT.OGG']);
	soundPlayer.loadWithWebAudio('PLAYER_DAMAGE', gb.assetMap()['PLAYERDAMAGE.OGG']);
	soundPlayer.loadWithWebAudio('SELECT', gb.assetMap()['SELECT.OGG']);
	soundPlayer.loadWithWebAudio('OK', gb.assetMap()['OK.OGG']);
	soundPlayer.loadWithWebAudio('BACK', gb.assetMap()['BACK.OGG']);

	soundPlayer.loadAll();

	// Wait for the main background music to be ready
	soundPlayer.once(soundPlayer.ON_LOAD_ALL_COMPLETE, this, function() {
		// Choose a start up routine according to what is found in the query string
		queryString.hasScene(urlStartUp.bind(this), basicStartUp.bind(this));
	});
});
