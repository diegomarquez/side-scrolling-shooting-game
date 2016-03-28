define(function(require) {	
	
	var commonBundle = require("common-bundle");

	var Sound = require("bundle").extend({
		create: function(args) {			
			
			this.componentPool.createConfiguration("CannonExplosion1", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'EXPLOSION_1',
					parentEvent: 'damage',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("EnemyShipExplosion1", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'EXPLOSION_3',
					parentEvent: 'destroyed',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("EnemyShipExplosion2", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'EXPLOSION_4',
					parentEvent: 'destroyed',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("EnemyShipExplosion3", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'EXPLOSION_5',
					parentEvent: 'destroyed',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("SpiderExplosion1", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'BUG',
					parentEvent: 'destroyed',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("GeneratorExplosion1", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'EXPLOSION_2',
					parentEvent: 'destroyed',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("GeneratorExplosion2", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'EXPLOSION_2',
					parentEvent: 'damaged',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("PowerUp1", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'POWER_UP',
					parentEvent: 'pick-up',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("MissileLaunch1", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'SMALL_LAUNCH',
					parentEvent: 'launch',
					playMode: 'single'
				});	

			this.componentPool.createConfiguration("MissileExplosion1", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'EXPLOSION_6',
					parentEvent: 'destroyed',
					playMode: 'single'
				});	

			
		}
	});

	return new Sound();
});