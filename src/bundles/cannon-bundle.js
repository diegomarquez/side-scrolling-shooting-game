define(function(require) {	
	var commonBundle = require('common-bundle');
	var gb = require('gb');

	var particleBundle = require('particle-generator-bundle');
	var explosionBundle = require('explosion-generator-bundle');

	var Bullets = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createConfiguration("ActivateShooterOnView", commonBundle.getActivateOnViewPoolId());

			this.componentPool.createPool('cannon-base-renderer', require('cannon-base-renderer'));
			this.componentPool.createPool('cannon-shooter-renderer', require('cannon-shooter-renderer'));

			this.componentPool.createConfiguration("CannonBaseCollider", commonBundle.getCircleColliderPoolId())
				.args({id:'cannonColliderId', radius:20});

			this.componentPool.createConfiguration("LaserBaseCollider", commonBundle.getCircleColliderPoolId())
				.args({id:'cannonColliderId', radius:20});
			
			this.componentPool.createConfiguration("CannonBaseRenderer", 'cannon-base-renderer');
			this.componentPool.createConfiguration("CannonShooterRenderer", 'cannon-shooter-renderer');
			
			this.componentPool.createConfiguration("LaserBaseRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["LASERBASE.PNG"],
					offset: 'center',
				});

			this.componentPool.createConfiguration("LaserShooterRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["LASERTURRET.PNG"],
					offset: 'center',
				});

			this.gameObjectPool.createDynamicPool('CannonBase', require("cannon-base"));
			this.gameObjectPool.createDynamicPool('BossCannonBase', require("boss-cannon-base"));
			this.gameObjectPool.createDynamicPool('LaserBase', require("laser-base"));

			this.gameObjectPool.createPool('CannonShooter', require("cannon-shooter"));
			this.gameObjectPool.createPool('LaserShooter', require("laser-shooter"));

			this.gameObjectPool.createConfiguration("cannon-shooter", "CannonShooter")
				.args({ 
					rate: 150, 
					bullets: 5,
					burstAmount: 1,
				})
				.addComponent('ActivateShooterOnView')
				.setRenderer("CannonShooterRenderer")
				.childOnly();

			this.gameObjectPool.createConfiguration("boss-cannon-shooter", "CannonShooter")
				.args({ 
					rate: 200, 
					bullets: -1,
					burstAmount: 3,
				})
				.addComponent('ActivateShooterOnView')
				.setRenderer("CannonShooterRenderer")
				.childOnly();

			this.gameObjectPool.createDynamicPool('editor-game-object', require('editor-game-object'))

			this.gameObjectPool.createConfiguration("LaserStartPosition", 'editor-game-object')
				.args({
					y: -28
				})
				.childOnly();

			this.gameObjectPool.createConfiguration("laser-shooter", "LaserShooter")
				.args({
					shootTime: 250,
					burstTime: 250
				})
				.addChild('LaserStartPosition')
				.addComponent('ActivateShooterOnView')
				.setRenderer("LaserShooterRenderer")
				.childOnly();

			this.gameObjectPool.createConfiguration("boss-laser-shooter", "LaserShooter")
				.args({
					shootTime: 250,
					burstTime: 250
				})
				.addChild('LaserStartPosition')
				.addComponent('ActivateShooterOnView')
				.setRenderer("LaserShooterRenderer")
				.childOnly();

			this.gameObjectPool.createConfiguration("cannon-0", "CannonBase")
				.args({
					destroyExplosions: explosionBundle.getMediumExplosionsEffectId()
				})
				.addComponent('CannonBaseCollider')
				.addComponent('ActivateShooterOnView')
				.addChild('cannon-shooter')
				.setRenderer("CannonBaseRenderer");

			this.gameObjectPool.createConfiguration("boss-cannon", "BossCannonBase")
				.args({
					damageExplosions: explosionBundle.getMediumExplosionsEffectId(),
					damageParticles: [
						particleBundle.getCannonDamageParticles_1_Id(),
						particleBundle.getCannonDamageParticles_2_Id()
					] 
				})
				.addComponent('CannonBaseCollider')
				.addComponent('ActivateShooterOnView')
				.addChild('boss-cannon-shooter')
				.setRenderer("CannonBaseRenderer");

			this.gameObjectPool.createConfiguration("laser-cannon", "LaserBase")
				.args({
					destroyExplosions: explosionBundle.getMediumExplosionsEffectId()
				})
				.addComponent('LaserBaseCollider')
				.addComponent('ActivateShooterOnView')
				.addChild('laser-shooter')
				.setRenderer("LaserBaseRenderer");

			this.gameObjectPool.createConfiguration("boss-laser-cannon", "BossCannonBase")
				.args({
					damageExplosions: explosionBundle.getMediumExplosionsEffectId(),
					damageParticles: [
						particleBundle.getCannonDamageParticles_1_Id(),
						particleBundle.getCannonDamageParticles_2_Id()
					] 
				})
				.addComponent('LaserBaseCollider')
				.addComponent('ActivateShooterOnView')
				.addChild('boss-laser-shooter')
				.setRenderer("LaserBaseRenderer");
		},
	});

	return new Bullets();
});