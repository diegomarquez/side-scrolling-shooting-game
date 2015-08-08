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
			this.gameObjectPool.createDynamicPool('Missile', require("missile"));


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

			this.componentPool.createConfiguration("MissileCollider", commonBundle.getCircleColliderPoolId())
				.args({
					id:'missilleColliderId', 
					radius:5,
					getResponse: true
				});

			this.componentPool.createConfiguration("LaserTwitch", 'twich-component')
				.args({
					amount: 6,
				});
			
			this.componentPool.createConfiguration("BulletRenderer", 'basic-bullet-renderer');
			
			this.componentPool.createConfiguration("RoundBulletRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["ROUNDBULLET.PNG"],
					offset: 'center',
				});
			
			this.componentPool.createConfiguration("ArrowBulletRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["ARROWBULLET.PNG"],
					offset: 'center',
				});

			this.componentPool.createConfiguration("MissileRenderer", commonBundle.getAnimationBitmapRendererPoolId())
				.args({
					pingPong: true,
					frameWidth: 24,
					frameHeight: 12,
					frameCount: 5,
					frameDelay: 0.05,
					path: gb.assetMap()["MISSILE.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("LaserRender", 'laser-renderer');

			this.gameObjectPool.createConfiguration("player-bullet", "Bullet")
				.addComponent(require('particle-generator-bundle').getPlayerBulletCollisionParticlesId())
				.addComponent("BulletCollider")
				.setRenderer("BulletRenderer");

			this.gameObjectPool.createConfiguration("cannon-bullet", "CannonBullet")
				.addComponent(require('particle-generator-bundle').getCannonBulletCollisionParticlesId())
				.addComponent("CannonBulletCollider")
				.setRenderer("ArrowBulletRenderer");

			this.gameObjectPool.createConfiguration("double-cannon-bullet", "CannonBullet")
				.addComponent(require('particle-generator-bundle').getCannonBulletCollisionParticlesId())
				.addComponent("CannonBulletCollider")
				.setRenderer("RoundBulletRenderer");

			this.gameObjectPool.createConfiguration("Laser", "Laser")
				.addComponent("LaserCollider")
				.addComponent("LaserTwitch")
				.setRenderer("LaserRender");

			this.gameObjectPool.createConfiguration("missile", "Missile")
				.addComponent(require('particle-generator-bundle').getCannonBulletCollisionParticlesId())
				.addComponent("MissileCollider")
				.setRenderer("MissileRenderer");
		},
	});

	return new Bullets();
});