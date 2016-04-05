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

	soundPlayer.createChannels(60);

	soundPlayer.loadWithAudioTag('PLAYER_SHOT', gb.assetMap()['PLAYERSHOT.OGG']);
	soundPlayer.loadWithAudioTag('POWER_UP', gb.assetMap()['POWERUP.OGG']);
	soundPlayer.loadWithAudioTag('EXPLOSION_1', gb.assetMap()['EXPLOSION1.OGG']);
	soundPlayer.loadWithAudioTag('EXPLOSION_2', gb.assetMap()['EXPLOSION2.OGG']);
	soundPlayer.loadWithAudioTag('EXPLOSION_3', gb.assetMap()['EXPLOSION3.OGG']);
	soundPlayer.loadWithAudioTag('EXPLOSION_4', gb.assetMap()['EXPLOSION4.OGG']);
	soundPlayer.loadWithAudioTag('EXPLOSION_5', gb.assetMap()['EXPLOSION5.OGG']);
	soundPlayer.loadWithAudioTag('EXPLOSION_6', gb.assetMap()['EXPLOSION6.OGG']);
	soundPlayer.loadWithAudioTag('EXPLOSION_7', gb.assetMap()['EXPLOSION7.OGG']);
	soundPlayer.loadWithAudioTag('BUG', gb.assetMap()['BUG.OGG']);
	soundPlayer.loadWithAudioTag('LARGE_BUG', gb.assetMap()['LARGEBUG.OGG']);
	soundPlayer.loadWithAudioTag('SMALL_LAUNCH', gb.assetMap()['SMALLLAUNCH.OGG']);
	soundPlayer.loadWithAudioTag('BLOOP', gb.assetMap()['BLOOB.OGG']);
	soundPlayer.loadWithAudioTag('OPEN_HATCH', gb.assetMap()['OPENHATCH.OGG']);
	
	soundPlayer.loadWithWebAudio('HIT', gb.assetMap()['HIT.OGG']);
	soundPlayer.loadWithWebAudio('DEFLECT', gb.assetMap()['DEFLECT.OGG']);

	soundPlayer.assignChannels('PLAYER_SHOT', 1);
	soundPlayer.assignChannels('POWER_UP', 3);
	soundPlayer.assignChannels('EXPLOSION_1', 3);
	soundPlayer.assignChannels('EXPLOSION_2', 3);
	soundPlayer.assignChannels('EXPLOSION_3', 3);
	soundPlayer.assignChannels('EXPLOSION_4', 3);
	soundPlayer.assignChannels('EXPLOSION_5', 3);
	soundPlayer.assignChannels('EXPLOSION_6', 3);
	soundPlayer.assignChannels('EXPLOSION_7', 10);
	soundPlayer.assignChannels('BUG', 3);
	soundPlayer.assignChannels('LARGE_BUG', 3);
	soundPlayer.assignChannels('SMALL_LAUNCH', 3);
	soundPlayer.assignChannels('BLOOP', 3);
	soundPlayer.assignChannels('OPEN_HATCH', 3);

	// Choose a start up routine according to what is found in the query string
	queryString.hasScene(urlStartUp.bind(this), basicStartUp.bind(this));
});
