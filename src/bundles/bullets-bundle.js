define(function(require) {	
	var commonBundle = require('common-bundle');
	var gb = require('gb')
	
	var Bullets = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createPool('basic-bullet-renderer', require('basic-bullet-renderer'));
			
			this.componentPool.createPool('laser-renderer', require('laser-renderer'));
			this.componentPool.createPool('twich-component', require('twitch'));

			this.gameObjectPool.createDynamicPool('Bullet', require("basic-bullet"));
			this.gameObjectPool.createDynamicPool('CannonBullet', require("cannon-bullet"));
			this.gameObjectPool.createDynamicPool('Laser', require("laser"));

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

			this.componentPool.createConfiguration("LaserCollider", commonBundle.getPolygonColliderPoolId())
				.args({
					id:'laserBulletColliderId',
					points: [
						{ x: 0, y: 0 },
						{ x: 800, y: 0 },
						{ x: 800, y: 10 },
						{ x: 0 , y: 10 }
					]
				});

			this.componentPool.createConfiguration("LaserTwitch", 'twich-component')
				.args({
					amount: 6,
				});
			
			this.componentPool.createConfiguration("BulletRender", 'basic-bullet-renderer');
			
			this.componentPool.createConfiguration("RoundBulletRender", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["ROUNDBULLET.PNG"],
					offset: 'center',
				});
			
			this.componentPool.createConfiguration("ArrowBulletRender", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["ARROWBULLET.PNG"],
					offset: 'center',
				});

			this.componentPool.createConfiguration("LaserRender", 'laser-renderer');

			this.gameObjectPool.createConfiguration("player-bullet", "Bullet")
				.addComponent(require('particle-generator-bundle').getPlayerBulletCollisionParticlesId())
				.addComponent("BulletCollider")
				.setRenderer("BulletRender");

			this.gameObjectPool.createConfiguration("cannon-bullet", "CannonBullet")
				.addComponent(require('particle-generator-bundle').getCannonBulletCollisionParticlesId())
				.addComponent("CannonBulletCollider")
				.setRenderer("ArrowBulletRender");

			this.gameObjectPool.createConfiguration("double-cannon-bullet", "CannonBullet")
				.addComponent(require('particle-generator-bundle').getCannonBulletCollisionParticlesId())
				.addComponent("CannonBulletCollider")
				.setRenderer("RoundBulletRender");

			this.gameObjectPool.createConfiguration("Laser", "Laser")
				.addComponent("LaserCollider")
				.addComponent("LaserTwitch")
				.setRenderer("LaserRender");
		},
	});

	return new Bullets();
});