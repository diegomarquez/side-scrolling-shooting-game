define(function(require) {	
	var Effects = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createPool("round-explosion-renderer", require("round-explosion-renderer"));
			this.componentPool.createPool('child-explosions-generator', require('child-tracking-generator'));

			this.componentPool.createConfiguration(this.getSmallExplosionsEffectId(), 'child-explosions-generator')
				.args({
					objectType: 'SmallExplosion',
					sprayDelay: 0.03,
					amountPerSpray: 2,
					maxAmountToSpray: 150,
					startingPositionTransformation: [
						require('rectangle-generation')(60, 75)
					]
				});

			this.componentPool.createConfiguration(this.getMediumExplosionsEffectId(), 'child-explosions-generator')
				.args({
					objectType: 'MediumExplosion',
					sprayDelay: 0.03,
					amountPerSpray: 1,
					maxAmountToSpray: 13,
					startingPositionTransformation: [
						require('rectangle-generation')(20, 20)
					]
				});

			this.componentPool.createConfiguration("ExplosionRenderer", "round-explosion-renderer")
				.args({
					loop: false
				});

			this.gameObjectPool.createDynamicPool("Explosion", require("explosion"));

			this.gameObjectPool.createConfiguration(this.getSmallExplosionsId(), "Explosion")
				.args({ 
					scaleX: 0.5, 
					scaleY: 0.5
				})
				.setRenderer("ExplosionRenderer");

			this.gameObjectPool.createConfiguration(this.getMediumExplosionsId(), "Explosion")
				.args({ 
					scaleX: 0.9, 
					scaleY: 0.9
				})
				.setRenderer("ExplosionRenderer");
		},

		getSmallExplosionsEffectId: function() {
			return "SmallExplosionsEffect";
		},

		getMediumExplosionsEffectId: function() {
			return "MediumExplosionsEffect";
		},

		getSmallExplosionsId: function() {
			return "SmallExplosion";
		},

		getMediumExplosionsId: function() {
			return "MediumExplosion";
		}
	});

	return new Effects();
});