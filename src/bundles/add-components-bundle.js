define(function(require) {	
	
	var commonBundle = require("common-bundle");

	var AddComponentsBundle = require("bundle").extend({
		create: function(args) {			
			
			this.componentPool.createConfiguration("BossTwitch", commonBundle.getTwitchPoolId());

			this.componentPool.createConfiguration("AddBossTwitchOnDestroy", commonBundle.getAddComponentPoolId())
				.args({
					componentId: 'BossTwitch',
					parentEvent: 'destroyed',
					executeOnce: true,
					componentArgs: {
						amount: 5
					}
				});

			this.componentPool.createConfiguration("BulletHitFlash", commonBundle.getDamageFlashPoolId());

			this.componentPool.createConfiguration("AddBulletHitFlash", commonBundle.getAddComponentPoolId())
				.args({
					componentId: 'BulletHitFlash',
					parentEvent: 'hit',
					executeOnce: false,
					componentArgs: {
						flashTime: 20
					}
				});

			this.componentPool.createConfiguration("AddPlayerHitFlash", commonBundle.getAddComponentPoolId())
				.args({
					componentId: 'BulletHitFlash',
					parentEvent: 'damage',
					executeOnce: false,
					componentArgs: {
						flashTime: 200
					}
				});
		}
	});

	return new AddComponentsBundle();
});