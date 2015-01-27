define(function(require) {	
	var commonBundle = require('common-bundle');

	var cannonBase = require("cannon-base");
	var cannonShooter = require("cannon-shooter");
	var cannonBaseRenderer = require('cannon-base-renderer');
	var cannonShooterRenderer = require('cannon-shooter-renderer');
	
	var Bullets = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool('cannon-base-renderer', cannonBaseRenderer);
			this.componentPool.createPool('cannon-shooter-renderer', cannonShooterRenderer);
			
			this.componentPool.createConfiguration("CannonBaseCollider", commonBundle.getCircleColliderPoolId())
				.args({id:'cannonColliderId', radius:20});
			
			this.componentPool.createConfiguration("CannonBaseRenderer", 'cannon-base-renderer');
			this.componentPool.createConfiguration("CannonShooterRenderer", 'cannon-shooter-renderer');
			this.componentPool.createConfiguration("ActivateCannonShooterOnView", commonBundle.getActivateOnViewPoolId());
			
			this.gameObjectPool.createDynamicPool('CannonBase', cannonBase);
			this.gameObjectPool.createPool('CannonShooter', cannonShooter);

			this.gameObjectPool.createConfiguration("CannonShooter", "CannonShooter")
				.setRenderer("CannonShooterRenderer");

			this.gameObjectPool.createConfiguration("Cannon_0", "CannonBase")
				.args( { rotation: 0 })
				.addComponent('CannonBaseCollider')
				.addComponent('ActivateCannonShooterOnView')
				.addChild('CannonShooter')
				.setRenderer("CannonBaseRenderer");

			this.gameObjectPool.createConfiguration("Cannon_90", "CannonBase")
				.args( { rotation: 90 })
				.addComponent('CannonBaseCollider')
				.addComponent('ActivateCannonShooterOnView')
				.addChild('CannonShooter')
				.setRenderer("CannonBaseRenderer");

			this.gameObjectPool.createConfiguration("Cannon_180", "CannonBase")
				.args( { rotation: 180 })
				.addComponent('CannonBaseCollider')
				.addComponent('ActivateCannonShooterOnView')
				.addChild('CannonShooter')
				.setRenderer("CannonBaseRenderer");

			this.gameObjectPool.createConfiguration("Cannon_270", "CannonBase")
				.args( { rotation: 270 })
				.addComponent('CannonBaseCollider')
				.addComponent('ActivateCannonShooterOnView')
				.addChild('CannonShooter')
				.setRenderer("CannonBaseRenderer");
		},
	});

	return new Bullets();
});