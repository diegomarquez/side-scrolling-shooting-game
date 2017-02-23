define(function(require) {
	var explosionBundle = require('explosion-bundle');
	
	var ExplosionGeneratorBundle = require("bundle").extend({
		create: function(args) {
			this.componentPool.createPool('child-explosions-generator', require('child-tracking-generator'));
			this.componentPool.createPool('explosions-generator', require('game-object-generator'));

			this.componentPool.createConfiguration(this.getSingleSmallExplosionEffectId(), 'child-explosions-generator')
				.args({
					objectType: explosionBundle.getSmallExplosionsId(),
					sprayDelay: 0.03,
					amountPerSpray: 1,
					maxAmountToSpray: 1,
					startingPositionTransformation: [],
					viewports: [{viewport: "Main", layer: "Effects"}]
				});

			this.componentPool.createConfiguration(this.getMicroExplosionsEffectId(), 'explosions-generator')
				.args({
					objectType: explosionBundle.getMicroExplosionsId(),
					sprayDelay: 0.03,
					amountPerSpray: 1,
					maxAmountToSpray: 10,
					startingPositionTransformation: [
						require('rectangle-generation')(20, 20)
					],
					viewports: [{viewport: "Main", layer: "Effects"}]
				});
			
			this.componentPool.createConfiguration(this.getSmallExplosionsEffectId(), 'child-explosions-generator')
				.args({
					objectType: explosionBundle.getSmallExplosionsId(),
					sprayDelay: 0.1,
					amountPerSpray: 4,
					maxAmountToSpray: 110,
					startingPositionTransformation: [
						require('rectangle-generation')(60, 75)
					],
					viewports: [{viewport: "Main", layer: "Effects"}]
				});

			this.componentPool.createConfiguration(this.getMediumExplosionsEffectId(), 'child-explosions-generator')
				.args({
					objectType: explosionBundle.getMediumExplosionsId(),
					sprayDelay: 0.03,
					amountPerSpray: 1,
					maxAmountToSpray: 13,
					startingPositionTransformation: [
						require('rectangle-generation')(20, 20)
					],
					viewports: [{viewport: "Main", layer: "Effects"}]
				});

			this.componentPool.createConfiguration(this.getLargeExplosionsEffectId(), 'explosions-generator')
				.args({
					objectType: explosionBundle.getLargeExplosionsId(),
					sprayDelay: 0.01,
					amountPerSpray: 5,
					maxAmountToSpray: 5,
					startingPositionTransformation: [
						require('rectangle-generation')(40, 40)
					],
					viewports: [{viewport: "Main", layer: "Effects"}]
				});
			
			this.componentPool.createConfiguration(this.getPlayerDestroyExplosionsEffectId(), 'explosions-generator')
				.args({
					objectType: explosionBundle.getMicroExplosionsId(),
					sprayDelay: 0.03,
					amountPerSpray: 2,
					maxAmountToSpray: 30,
					startingPositionTransformation: [
						require('rectangle-generation')(35, 35)
					],
					viewports: [{viewport: "Main", layer: "Effects"}]
				});
			
			this.componentPool.createConfiguration(this.getPlayerLowHpEffectId(), 'explosions-generator')
				.args({
					objectType: explosionBundle.getMicroExplosionsId(),
					sprayDelay: 0.5,
					amountPerSpray: 2,
					startingPositionTransformation: [
						require('rectangle-generation')(20, 20)
					],
					viewports: [{viewport: "Main", layer: "Effects"}]
				});
		},

		getPlayerDestroyExplosionsEffectId: function() {
			return "PlayerDestroyExplosionsEffectId";
		},
		
		getPlayerLowHpEffectId: function() {
			return "PlayerLowHpEffectEffectId";
		},

		getSingleSmallExplosionEffectId: function() {
			return "SingleSmallExplosionsEffect";
		},

		getMicroExplosionsEffectId: function() {
			return "MicroExplosionsEffect";
		},

		getSmallExplosionsEffectId: function() {
			return "SmallExplosionsEffect";
		},

		getMediumExplosionsEffectId: function() {
			return "MediumExplosionsEffect";
		},

		getLargeExplosionsEffectId: function() {
			return "LargeExplosionsEffect";
		}
	});

	return new ExplosionGeneratorBundle();
});