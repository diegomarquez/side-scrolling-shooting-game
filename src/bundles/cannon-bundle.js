define(function(require) {	
	var commonBundle = require('common-bundle');

	var Bullets = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool('cannon-base-renderer', require('cannon-base-renderer'));
			this.componentPool.createPool('cannon-shooter-renderer', require('cannon-shooter-renderer'));

			this.componentPool.createConfiguration("CannonBaseCollider", commonBundle.getCircleColliderPoolId())
				.args({id:'cannonColliderId', radius:20});
			
			this.componentPool.createConfiguration("CannonBaseRenderer", 'cannon-base-renderer');
			this.componentPool.createConfiguration("CannonShooterRenderer", 'cannon-shooter-renderer');
			this.componentPool.createConfiguration("ActivateCannonShooterOnView", commonBundle.getActivateOnViewPoolId());
			
			this.gameObjectPool.createDynamicPool('CannonBase', require("cannon-base"));
			this.gameObjectPool.createDynamicPool('BossCannonBase', require("boss-cannon-base"));
			this.gameObjectPool.createPool('CannonShooter', require("cannon-shooter"));

			this.gameObjectPool.createConfiguration("cannon-shooter", "CannonShooter")
				.args({ 
					rate: 150, 
					bullets: 5,
					burstAmount: 1,
				})
				.addComponent('ActivateCannonShooterOnView')
				.setRenderer("CannonShooterRenderer")
				.childOnly();

			this.gameObjectPool.createConfiguration("boss-cannon-shooter", "CannonShooter")
				.args({ 
					rate: 200, 
					bullets: -1,
					burstAmount: 3,
				})
				.addComponent('ActivateCannonShooterOnView')
				.setRenderer("CannonShooterRenderer")
				.childOnly();

			this.gameObjectPool.createConfiguration("cannon-0", "CannonBase")
				.addComponent('CannonBaseCollider')
				.addComponent('ActivateCannonShooterOnView')
				.addChild('cannon-shooter')
				.setRenderer("CannonBaseRenderer");

			this.gameObjectPool.createConfiguration("boss-cannon", "BossCannonBase")
				.addComponent('CannonBaseCollider')
				.addComponent('ActivateCannonShooterOnView')
				.addChild('boss-cannon-shooter')
				.setRenderer("CannonBaseRenderer");
		},
	});

	return new Bullets();
});