define(function(require) {
	var commonBundle = require('common-bundle');
	var explosionsBundle = require('explosion-generator-bundle');
	var gb = require('gb')

	var Bullets = require("bundle").extend({
		create: function(args) {
			this.componentPool.createPool('laser-renderer', require('laser-renderer'));
			this.componentPool.createPool('rotate-component', require('rotate'));

			this.gameObjectPool.createDynamicPool('Bullet', require("basic-bullet"));
			this.gameObjectPool.createDynamicPool('CannonBullet', require("cannon-bullet"));
			this.gameObjectPool.createDynamicPool('Laser', require("laser"));
			this.gameObjectPool.createDynamicPool('Missile', require("missile"));

			this.componentPool.createPool('DestroyExplosions', require('destroy-explosions'));
			this.componentPool.createPool('DestroyOnHpDepleted', require('destroy-on-hp-depleted'));

			this.componentPool.createConfiguration("BlobBulletDestroyExplosions", "DestroyExplosions")
				.args({
					effect: explosionsBundle.getSingleSmallExplosionEffectId()
				});

			this.componentPool.createConfiguration("DestroyOnHpDepleted", "DestroyOnHpDepleted");

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

			this.componentPool.createConfiguration("WebBulletCollider", commonBundle.getCircleColliderPoolId())
				.args({
					id:'webBulletColliderId',
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

			this.componentPool.createConfiguration("LaserTwitch", commonBundle.getTwitchPoolId())
				.args({
					amount: 6
				});

			this.componentPool.createConfiguration("PlayerBullet1Renderer", commonBundle.getAnimationBitmapRendererPoolId())
				.args({
					pingPong: true,
					frameWidth: 16,
					frameHeight: 16,
					frameCount: 2,
					frameDelay: 0.05,
					path: gb.assetMap()["PLAYERBULLET1.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("RoundBulletRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["ROUNDBULLET.PNG"],
					offset: 'center',
				});

			this.componentPool.createConfiguration("BlobBulletRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["MINIBLOB.PNG"],
					offset: 'center',
				});

			this.componentPool.createConfiguration("ArrowBulletRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["ARROWBULLET.PNG"],
					offset: 'center',
				});

			this.componentPool.createConfiguration("WebBulletRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["WEBBULLET.PNG"],
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
				.addComponent("PlayerBulletHit")
				.addComponent("PlayerBulletDeflect")
				.setRenderer("PlayerBullet1Renderer");

			this.gameObjectPool.createConfiguration("cannon-bullet-slow", "CannonBullet")
				.args({
					speed: 100
				})
				.addComponent('BlobBulletDestroyExplosions')
				.addComponent("CannonBulletCollider")
				.setRenderer("ArrowBulletRenderer");

			this.gameObjectPool.createConfiguration("cannon-bullet-fast", "CannonBullet")
				.args({
					speed: 220
				})
				.addComponent('BlobBulletDestroyExplosions')
				.addComponent("CannonBulletCollider")
				.setRenderer("ArrowBulletRenderer");


			this.componentPool.createConfiguration("BulletRotate", 'rotate-component')
				.args({
					amount: 5
				});

			this.gameObjectPool.createConfiguration("double-cannon-bullet-slow", "CannonBullet")
				.args({
					speed: 250
				})
				.addComponent('BulletRotate')
				.addComponent('BlobBulletDestroyExplosions')
				.addComponent("CannonBulletCollider")
				.setRenderer("RoundBulletRenderer");

			this.gameObjectPool.createConfiguration("double-cannon-bullet-fast", "CannonBullet")
				.args({
					speed: 270
				})
				.addComponent('BulletRotate')
				.addComponent('BlobBulletDestroyExplosions')
				.addComponent("CannonBulletCollider")
				.setRenderer("RoundBulletRenderer");

			this.gameObjectPool.createConfiguration("Laser", "Laser")
				.addComponent("LaserCollider")
				.addComponent("LaserTwitch")
				.setRenderer("LaserRender");

			this.gameObjectPool.createConfiguration("missile-slow", "Missile")
				.args({
					speed: 100,
					hp: 1
				})
				.addComponent('BlobBulletDestroyExplosions')
				.addComponent('DestroyOnHpDepleted')
				.addComponent("MissileCollider")
				.addComponent('MissileExplosion1')
				.setRenderer("MissileRenderer");

			this.gameObjectPool.createConfiguration("missile-fast", "Missile")
				.args({
					speed: 220,
					hp: 1
				})
				.addComponent('BlobBulletDestroyExplosions')
				.addComponent('DestroyOnHpDepleted')
				.addComponent("MissileCollider")
				.addComponent('MissileExplosion1')
				.setRenderer("MissileRenderer");

			this.gameObjectPool.createConfiguration("blob-bullet-slow", "CannonBullet")
				.args({
					speed: 150
				})
				.addComponent('BulletRotate')
				.addComponent('BlobBulletDestroyExplosions')
				.addComponent("CannonBulletCollider")
				.setRenderer("BlobBulletRenderer");

			this.gameObjectPool.createConfiguration("blob-bullet-fast", "CannonBullet")
				.args({
					speed: 250
				})
				.addComponent('BulletRotate')
				.addComponent('BlobBulletDestroyExplosions')
				.addComponent("CannonBulletCollider")
				.setRenderer("BlobBulletRenderer");

			this.gameObjectPool.createConfiguration("boss-4-bullet", "CannonBullet")
				.args({
					speed: 180
				})
				.addComponent('BulletRotate')
				.addComponent('BlobBulletDestroyExplosions')
				.addComponent("WebBulletCollider")
				.setRenderer("WebBulletRenderer");


		},
	});

	return new Bullets();
});