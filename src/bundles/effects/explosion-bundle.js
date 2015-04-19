define(function(require) {	
	var Explosion = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createPool("round-explosion-renderer", require("round-explosion-renderer"));
			
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

		getSmallExplosionsId: function() {
			return "SmallExplosion";
		},

		getMediumExplosionsId: function() {
			return "MediumExplosion";
		}
	});

	return new Explosion();
});