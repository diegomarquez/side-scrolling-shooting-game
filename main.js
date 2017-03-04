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

	assetPreloader.addAsset(gb.assetMap()['INTRO.OGG']);
	assetPreloader.addAsset(gb.assetMap()['SELECT.OGG']);
	assetPreloader.addAsset(gb.assetMap()['OK.OGG']);
	assetPreloader.addAsset(gb.assetMap()['BACK.OGG']);
	assetPreloader.addAsset(gb.assetMap()['DEFLECT.OGG']);
	assetPreloader.addAsset(gb.assetMap()['HIT.OGG']);
	assetPreloader.addAsset(gb.assetMap()['PLAYERDAMAGE.OGG']);
	assetPreloader.addAsset(gb.assetMap()['PLAYERBULLET1.PNG']);
	assetPreloader.addAsset(gb.assetMap()['BOSS1PORTRAIT.PNG']);
	assetPreloader.addAsset(gb.assetMap()['BOSS2PORTRAIT.PNG']);
	assetPreloader.addAsset(gb.assetMap()['BOSS3PORTRAIT.PNG']);
	assetPreloader.addAsset(gb.assetMap()['BOSS4PORTRAIT.PNG']);
	assetPreloader.addAsset(gb.assetMap()['LEVELFRAME.PNG']);

	// TODO: Rename this mehtod to createPublicChannels, to better reflect what you are doing when using it
	soundPlayer.createChannels(10);
	// TODO: Rename this method to createPrivateChannels, to better reflect what you are doing when using it
	soundPlayer.assignChannels('INTRO', 1);
	soundPlayer.assignChannels('PLAYER_SHOT', 10);

	// Background music
	soundPlayer.add('INTRO', gb.assetMap()['INTRO.OGG'], true);
	soundPlayer.add('LEVEL_1', gb.assetMap()['LEVEL1.OGG'], true);
	soundPlayer.add('LEVEL_2', gb.assetMap()['LEVEL2.OGG'], true);
	soundPlayer.add('LEVEL_3', gb.assetMap()['LEVEL3.OGG'], true);
	soundPlayer.add('LEVEL_4', gb.assetMap()['LEVEL5.OGG'], true);
	soundPlayer.add('BOSS', gb.assetMap()['COSMICDANCE.OGG'], true);

	// Sound effects
	soundPlayer.add('PLAYER_SHOT', gb.assetMap()['PLAYERSHOT.OGG'], true);
	soundPlayer.add('POWER_UP', gb.assetMap()['POWERUP.OGG'], true);
	soundPlayer.add('EXPLOSION_1', gb.assetMap()['EXPLOSION1.OGG'], true);
	soundPlayer.add('EXPLOSION_2', gb.assetMap()['EXPLOSION2.OGG'], true);
	soundPlayer.add('EXPLOSION_3', gb.assetMap()['EXPLOSION3.OGG'], true);
	soundPlayer.add('EXPLOSION_4', gb.assetMap()['EXPLOSION4.OGG'], true);
	soundPlayer.add('EXPLOSION_5', gb.assetMap()['EXPLOSION5.OGG'], true);
	soundPlayer.add('EXPLOSION_6', gb.assetMap()['EXPLOSION6.OGG'], true);
	soundPlayer.add('EXPLOSION_7', gb.assetMap()['EXPLOSION7.OGG'], true);
	soundPlayer.add('BUG', gb.assetMap()['BUG.OGG'], true);
	soundPlayer.add('LARGE_BUG', gb.assetMap()['LARGEBUG.OGG'], true);
	soundPlayer.add('SMALL_LAUNCH', gb.assetMap()['SMALLLAUNCH.OGG'], true);
	soundPlayer.add('BLOOP', gb.assetMap()['BLOOB.OGG'], true);
	soundPlayer.add('OPEN_HATCH', gb.assetMap()['OPENHATCH.OGG'], true);
	soundPlayer.add('HIT', gb.assetMap()['HIT.OGG'], true);
	soundPlayer.add('DEFLECT', gb.assetMap()['DEFLECT.OGG'], true);
	soundPlayer.add('PLAYER_DAMAGE', gb.assetMap()['PLAYERDAMAGE.OGG'], true);
	soundPlayer.add('SELECT', gb.assetMap()['SELECT.OGG'], true);
	soundPlayer.add('OK', gb.assetMap()['OK.OGG'], true);
	soundPlayer.add('BACK', gb.assetMap()['BACK.OGG'], true);
	soundPlayer.add('WARNING', gb.assetMap()['WARNING.OGG'], true);
	soundPlayer.add('WIN', gb.assetMap()['WIN.OGG'], true);
	soundPlayer.add('LASER', gb.assetMap()['LASER.OGG'], true);

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

	assetPreloader.loadAll();
	soundPlayer.loadAll();

	function start() {
		// Choose a start up routine according to what is found in the query string
		queryString.hasScene(urlStartUp.bind(this), basicStartUp.bind(this));
	}
});
