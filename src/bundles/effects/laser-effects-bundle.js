define(function(require) {	

	var commonBundle = require('common-bundle');
	var gb = require('gb');

	var LaserEffects = require("bundle").extend({
		create: function(args) {			
			
			this.componentPool.createPool('burst-twich-component', require('twitch'));

			this.componentPool.createConfiguration("LaserBurstRenderer", commonBundle.getAnimationBitmapRendererPoolId())
				.args({
					loop: true,
					frameWidth: 64,
					frameHeight: 32,
					offset: 'center',
					frameDelay: 0.02,
					frameCount: 6,
					path: gb.assetMap()["BURST.PNG"]
				});

			this.componentPool.createConfiguration("LaserHitRenderer", commonBundle.getAnimationBitmapRendererPoolId())
				.args({
					loop: true,
					frameWidth: 64,
					frameHeight: 64,
					offset: 'center',
					frameDelay: 0.08,
					frameCount: 4,
					path: gb.assetMap()["LASERHIT.PNG"]
				});

			this.componentPool.createConfiguration("BurstTwitch", 'burst-twich-component')
				.args({
					amount: 3,
				});

			this.gameObjectPool.createConfiguration("LaserBurst", commonBundle.getGameObjectPoolId())
				.addComponent("BurstTwitch")
				.setRenderer("LaserBurstRenderer");

			this.gameObjectPool.createConfiguration("LaserHit", commonBundle.getGameObjectPoolId())
				.addComponent("BurstTwitch")
				.setRenderer("LaserHitRenderer");
		}
	});

	return new LaserEffects();
});