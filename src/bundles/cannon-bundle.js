define(function(require) {	
	var commonBundle = require('common-bundle');

	var cannon = require("cannon");
	var cannonRenderer = require('cannon-renderer');
	

	var Bullets = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool('cannon-renderer', cannonRenderer);
			
			this.componentPool.createConfiguration("CannonCollider", commonBundle.getCircleColliderPoolId())
				.args({id:'cannonColliderId', radius:20});
			
			this.componentPool.createConfiguration("CannonRender", 'cannon-renderer')
			
			this.gameObjectPool.createDynamicPool('Cannon', cannon);

			this.gameObjectPool.createConfiguration("Cannon_0", "Cannon")
				.args( { rotation: 0 })
				.addComponent('CannonCollider')
				.setRenderer("CannonRender");

			this.gameObjectPool.createConfiguration("Cannon_90", "Cannon")
				.args( { rotation: 90 })
				.addComponent('CannonCollider')
				.setRenderer("CannonRender");

			this.gameObjectPool.createConfiguration("Cannon_180", "Cannon")
				.args( { rotation: 180 })
				.addComponent('CannonCollider')
				.setRenderer("CannonRender");

			this.gameObjectPool.createConfiguration("Cannon_270", "Cannon")
				.args( { rotation: 270 })
				.addComponent('CannonCollider')
				.setRenderer("CannonRender");
		},
	});

	return new Bullets();
});