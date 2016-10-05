define(function(require) {	
	var Explosion = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createPool("round-explosion-renderer", require("round-explosion-renderer"));
			
			this.componentPool.createConfiguration("ExplosionRenderer", "round-explosion-renderer")
				.args({
					loop: false
				});

			this.gameObjectPool.createDynamicPool("Explosion", require("explosion"));

			this.gameObjectPool.createConfiguration(this.getMicroExplosionsId(), "Explosion")
				.args({ 
					scaleX: 0.35, 
					scaleY: 0.35
				})
				.setRenderer("ExplosionRenderer");

			this.gameObjectPool.createConfiguration(this.getSmallExplosionsId(), "Explosion")
				.args({ 
					scaleX: 0.25, 
					scaleY: 0.25
				})
				.setRenderer("ExplosionRenderer");

			this.gameObjectPool.createConfiguration(this.getMediumExplosionsId(), "Explosion")
				.args({ 
					scaleX: 0.45, 
					scaleY: 0.45
				})
				.setRenderer("ExplosionRenderer");

			this.gameObjectPool.createConfiguration(this.getLargeExplosionsId(), "Explosion")
				.args({ 
					scaleX: 1, 
					scaleY: 1
				})
				.setRenderer("ExplosionRenderer");
		},

		getMicroExplosionsId: function() {
			return "MicroExplosion";
		},

		getSmallExplosionsId: function() {
			return "SmallExplosion";
		},

		getMediumExplosionsId: function() {
			return "MediumExplosion";
		},

		getLargeExplosionsId: function() {
			return "LargeExplosion";
		}
	});

	return new Explosion();
});