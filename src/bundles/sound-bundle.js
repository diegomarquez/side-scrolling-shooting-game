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

			this.componentPool.createConfiguration("GeneratorExplosion3", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'EXPLOSION_2',
					parentEvent: 'damage',
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

			this.componentPool.createConfiguration("BossStartExplosion", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'EXPLOSION_5',
					parentEvent: 'destroyed',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("BossEndExplosion", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'EXPLOSION_2',
					parentEvent: 'stop_creation',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("BossSmallExplosion", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'EXPLOSION_7',
					parentEvent: 'spray',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("Boss2Mines", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'BLOOP',
					parentEvent: 'mine-attack',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("Boss2Open", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'OPEN_HATCH',
					parentEvent: 'opening',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("Boss2Close", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'OPEN_HATCH',
					parentEvent: 'closing',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("Boss4Move", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'LARGE_BUG',
					parentEvent: 'move',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("LaserAttack", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'LASER',
					parentEvent: 'laser-attack',
					playMode: 'loop',
					stopParentEvent: 'end-laser-attack'
				});

			this.componentPool.createConfiguration("ShotSound", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'PLAYER_SHOT',
					parentEvent: 'shot',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("PlayerBulletHit", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'HIT',
					parentEvent: 'hit',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("PlayerBulletDeflect", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'DEFLECT',
					parentEvent: 'deflect',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("PlayerDamage", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'PLAYER_DAMAGE',
					parentEvent: 'damage',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("PlayerSmallExplosion", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'EXPLOSION_1',
					parentEvent: 'spray',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("PlayerDestroyed", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'PLAYER_DAMAGE',
					parentEvent: 'destroyed',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("OptionHighlight", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'SELECT',
					parentEvent: 'option',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("OptionSelect", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'OK',
					parentEvent: 'select',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("OptionBack", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'BACK',
					parentEvent: 'back',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("WarningSound", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'WARNING',
					parentEvent: 'warning',
					playMode: 'single'
				});

			this.componentPool.createConfiguration("WinSound", commonBundle.getSoundComponentPoolId())
				.args({
					soundId: 'WIN',
					parentEvent: 'pick-up',
					playMode: 'single'
				});
		}
	});

	return new Sound();
});