define(function(require) {	
	var commonBundle = require('common-bundle');

	var basicBullet = require("basic-bullet");
	var basicBulletRenderer = require('basic-bullet-renderer');

	var cannonBullet = require("cannon-bullet");
	var cannonBulletRenderer = require('cannon-bullet-renderer');
	
	var Bullets = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createPool('basic-bullet-renderer', basicBulletRenderer);
			this.componentPool.createPool('cannon-bullet-renderer', cannonBulletRenderer);
			
			this.gameObjectPool.createDynamicPool('Bullet', basicBullet);
			this.gameObjectPool.createDynamicPool('CannonBullet', cannonBullet);
			
			this.componentPool.createConfiguration("BulletCollider", commonBundle.getCircleColliderPoolId())
				.args({id:'basicBulletColliderId', radius:20});

			this.componentPool.createConfiguration("CannonBulletCollider", commonBundle.getCircleColliderPoolId())
				.args({id:'cannonBulletColliderId', radius:10});
			
			this.componentPool.createConfiguration("BulletRender", 'basic-bullet-renderer');
			this.componentPool.createConfiguration("CannonBulletRender", 'cannon-bullet-renderer')
			
			this.gameObjectPool.createConfiguration("PlayerBullet", "Bullet")
				.addComponent("BulletCollider")
				.setRenderer("BulletRender");

			this.gameObjectPool.createConfiguration("CannonBullet", "CannonBullet")
				.addComponent("CannonBulletCollider")
				.setRenderer("CannonBulletRender");
		},
	});

	return new Bullets();
});