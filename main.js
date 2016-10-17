// side-shmup's main entry point

define(function(require) {
	var gb = require('gb');
	var loaderContainer = require('loader-container');
	var queryString = require('query-string');
	var soundPlayer = require('sound-player');
	var assetPreloader = require('asset-preloader');

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

	assetPreloader.addGraphicAsset(gb.assetMap()['PLAYERBULLET1.PNG']);

	soundPlayer.createChannels(10);

	soundPlayer.assignChannels('INTRO', 1);

	soundPlayer.add('INTRO', gb.assetMap()['INTRO.OGG'], false);
	
	soundPlayer.add('LEVEL_1', gb.assetMap()['LEVEL1.OGG']);
	soundPlayer.add('LEVEL_2', gb.assetMap()['LEVEL2.OGG']);
	soundPlayer.add('LEVEL_3', gb.assetMap()['LEVEL3.OGG']);
	soundPlayer.add('LEVEL_4', gb.assetMap()['LEVEL5.OGG']);
	soundPlayer.add('BOSS', gb.assetMap()['COSMICDANCE.OGG']);

	soundPlayer.add('PLAYER_SHOT', gb.assetMap()['PLAYERSHOT.OGG']);
	soundPlayer.add('POWER_UP', gb.assetMap()['POWERUP.OGG']);
	soundPlayer.add('EXPLOSION_1', gb.assetMap()['EXPLOSION1.OGG']);
	soundPlayer.add('EXPLOSION_2', gb.assetMap()['EXPLOSION2.OGG']);
	soundPlayer.add('EXPLOSION_3', gb.assetMap()['EXPLOSION3.OGG']);
	soundPlayer.add('EXPLOSION_4', gb.assetMap()['EXPLOSION4.OGG']);
	soundPlayer.add('EXPLOSION_5', gb.assetMap()['EXPLOSION5.OGG']);
	soundPlayer.add('EXPLOSION_6', gb.assetMap()['EXPLOSION6.OGG']);
	soundPlayer.add('EXPLOSION_7', gb.assetMap()['EXPLOSION7.OGG']);
	soundPlayer.add('BUG', gb.assetMap()['BUG.OGG']);
	soundPlayer.add('LARGE_BUG', gb.assetMap()['LARGEBUG.OGG']);
	soundPlayer.add('SMALL_LAUNCH', gb.assetMap()['SMALLLAUNCH.OGG']);
	soundPlayer.add('BLOOP', gb.assetMap()['BLOOB.OGG']);
	soundPlayer.add('OPEN_HATCH', gb.assetMap()['OPENHATCH.OGG']);
	soundPlayer.add('HIT', gb.assetMap()['HIT.OGG']);
	soundPlayer.add('DEFLECT', gb.assetMap()['DEFLECT.OGG']);
	soundPlayer.add('PLAYER_DAMAGE', gb.assetMap()['PLAYERDAMAGE.OGG']);
	soundPlayer.add('SELECT', gb.assetMap()['SELECT.OGG']);
	soundPlayer.add('OK', gb.assetMap()['OK.OGG']);
	soundPlayer.add('BACK', gb.assetMap()['BACK.OGG']);
	soundPlayer.add('WARNING', gb.assetMap()['WARNING.OGG']);
	soundPlayer.add('WIN', gb.assetMap()['WIN.OGG']);

	assetPreloader.loadAll();
	soundPlayer.loadAll();

	var complete = 0;

	// Wait for assets to be ready
	assetPreloader.once(assetPreloader.ON_LOAD_ALL_COMPLETE, this, function() {
		complete++;

		if (complete === 2) {
			start.call(this);
		}
	});

	// Wait for the main background music to be ready
	soundPlayer.once(soundPlayer.ON_LOAD_ALL_COMPLETE, this, function() {
		complete++;

		if (complete === 2) {
			start.call(this);
		}
	});


	function start() {
		// Choose a start up routine according to what is found in the query string
		queryString.hasScene(urlStartUp.bind(this), basicStartUp.bind(this));
	}
});
