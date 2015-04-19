define(function(require) {	
	var Effects = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createPool("round-explosion-renderer", require("round-explosion-renderer"));
			this.componentPool.createPool('child-explosions-generator', require('child-tracking-generator'));

			this.componentPool.createConfiguration(this.getExplosionsEffectId(), 'child-explosions-generator')
				.args({
					objectType: 'Explosion',
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

			this.gameObjectPool.createConfiguration(this.getExplosionsId(), "Explosion")
				.args({ 
					scaleX: 0.9, 
					scaleY: 0.9
				})
				.setRenderer("ExplosionRenderer");
		},

		getExplosionsEffectId: function() {
			return "ExplosionsEffect";
		},

		getExplosionsId: function() {
			return "Explosion";
		}
	});

	return new Effects();
});