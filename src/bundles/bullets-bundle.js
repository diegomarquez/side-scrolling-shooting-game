define(function(require) {	
	var commonBundle = require('common-bundle');

	var basicBullet = require("basic-bullet");
	var basicBulletRenderer = require('basic-bullet-renderer');

	var cannonBullet = require("cannon-bullet");
	var cannonBulletRenderer = require('cannon-bullet-renderer');

	var particleBundle = require('particle-generator-bundle');
	
	var Bullets = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createPool('basic-bullet-renderer', basicBulletRenderer);
			this.componentPool.createPool('cannon-bullet-renderer', cannonBulletRenderer);
			
			this.gameObjectPool.createDynamicPool('Bullet', basicBullet);
			this.gameObjectPool.createDynamicPool('CannonBullet', cannonBullet);
			
			this.componentPool.createConfiguration("BulletCollider", commonBundle.getCircleColliderPoolId())
				.args({ 
					id:'basicBulletColliderId', 
					radius:10, 
					getResponse: true
				});

			this.componentPool.createConfiguration("CannonBulletCollider", commonBundle.getCircleColliderPoolId())
				.args({
					id:'cannonBulletColliderId', 
					radius:10,
					getResponse: true
				});
			
			this.componentPool.createConfiguration("BulletRender", 'basic-bullet-renderer');
			this.componentPool.createConfiguration("CannonBulletRender", 'cannon-bullet-renderer');

			this.gameObjectPool.createConfiguration("player-bullet", "Bullet")
				.addComponent(particleBundle.getPlayerBulletCollisionParticlesId())
				.addComponent("BulletCollider")
				.setRenderer("BulletRender");

			this.gameObjectPool.createConfiguration("cannon-bullet", "CannonBullet")
				.addComponent(particleBundle.getCannonBulletCollisionParticlesId())
				.addComponent("CannonBulletCollider")
				.setRenderer("CannonBulletRender");
		},
	});

	return new Bullets();
});