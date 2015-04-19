define(function(require) {	
	var explosionBundle = require('explosion-bundle');
	
	var ExplosionGenerator = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createPool('child-explosions-generator', require('child-tracking-generator'));

			this.componentPool.createConfiguration(this.getSmallExplosionsEffectId(), 'child-explosions-generator')
				.args({
					objectType: explosionBundle.getSmallExplosionsId(),
					sprayDelay: 0.03,
					amountPerSpray: 2,
					maxAmountToSpray: 150,
					startingPositionTransformation: [
						require('rectangle-generation')(60, 75)
					]
				});

			this.componentPool.createConfiguration(this.getMediumExplosionsEffectId(), 'child-explosions-generator')
				.args({
					objectType: explosionBundle.getMediumExplosionsId(),
					sprayDelay: 0.03,
					amountPerSpray: 1,
					maxAmountToSpray: 13,
					startingPositionTransformation: [
						require('rectangle-generation')(20, 20)
					]
				});
		},

		getSmallExplosionsEffectId: function() {
			return "SmallExplosionsEffect";
		},

		getMediumExplosionsEffectId: function() {
			return "MediumExplosionsEffect";
		}
	});

	return new ExplosionGenerator();
});