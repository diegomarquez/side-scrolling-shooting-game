define(function(require) {	
	var commonBundle = require('common-bundle');
	var gb = require('gb');

	var particleBundle = require('particle-generator-bundle');
	var explosionBundle = require('explosion-generator-bundle');

	var CannonBundle = require("bundle").extend({
		create: function(args) {	
			// Misc
			// =======================
			
			this.componentPool.createConfiguration("ActivateShooterOnView", commonBundle.getActivateOnViewPoolId());
			this.gameObjectPool.createDynamicPool('editor-game-object', require('editor-game-object'));
			this.gameObjectPool.createConfiguration("FirePosition", 'editor-game-object').childOnly();

			// Cannon
			// =======================
			
			this.componentPool.createConfiguration("CannonBaseRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["CANNONBASE.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("CannonShooterRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["CANNONSHOOTER.PNG"],
					offsetX: -5.5,
					offsetY: -4.5,
				});

			this.componentPool.createConfiguration("BossCannonBaseRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSSCANNONBASE.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("BossCannonShooterRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSSCANNONSHOOTER.PNG"],
					offsetX: -10,
					offsetY: -10,
				});

			this.gameObjectPool.createDynamicPool('CannonBase', require("cannon-base"));
			this.gameObjectPool.createDynamicPool('BossCannonBase', require("boss-cannon-base"));
			this.gameObjectPool.createPool('CannonShooter', require("cannon-shooter"));

			this.componentPool.createConfiguration("CannonBaseCollider", commonBundle.getCircleColliderPoolId())
				.args({ 
					id:'cannonColliderId', 
					radius:20 
				});

			this.gameObjectPool.createConfiguration("cannon-shooter-0", "CannonShooter")
				.args({ 
					rate: 150, 
					bullets: 5,
					burstAmount: 1,
					x: 0,
					y: -2,
					bulletType: 'cannon-bullet-slow',
					skipDebug: true
				})
				.addComponent('ActivateShooterOnView')
				.addChild('FirePosition', { x: 29 , y: 1 })
				.setRenderer("CannonShooterRenderer")
				.disableMouseSupport()
				.childOnly();

			this.gameObjectPool.createConfiguration("cannon-shooter-1", "CannonShooter")
				.args({ 
					rate: 120, 
					bullets: 8,
					burstAmount: 1,
					x: 0,
					y: -2,
					bulletType: 'cannon-bullet-fast',
					skipDebug: true
				})
				.addComponent('ActivateShooterOnView')
				.addChild('FirePosition', { x: 29 , y: 1 })
				.setRenderer("CannonShooterRenderer")
				.disableMouseSupport()
				.childOnly();

			this.gameObjectPool.createConfiguration("boss-cannon-shooter-0", "CannonShooter")
				.args({
					rate: 200,
					bullets: -1,
					burstAmount: 4,
					y: -15,
					bulletType: 'cannon-bullet-slow',
					skipDebug: true
				})
				.addComponent('ActivateShooterOnView')
				.addChild('FirePosition', { x: 57 , y: 1 })
				.setRenderer("BossCannonShooterRenderer")
				.disableMouseSupport()
				.childOnly();

			this.gameObjectPool.createConfiguration("boss-cannon-shooter-1", "CannonShooter")
				.args({
					rate: 180,
					bullets: -1,
					burstAmount: 3,
					y: -15,
					bulletType: 'cannon-bullet-fast',
					skipDebug: true
				})
				.addComponent('ActivateShooterOnView')
				.addChild('FirePosition', { x: 57 , y: 1 })
				.setRenderer("BossCannonShooterRenderer")
				.disableMouseSupport()
				.childOnly();

			this.gameObjectPool.createConfiguration("cannon-0", "CannonBase")
				.args({
					destroyExplosions: explosionBundle.getMediumExplosionsEffectId(),
					hp: 5
				})
				.addComponent('CannonBaseCollider')
				.addComponent('ActivateShooterOnView')
				.addComponent('CannonExplosion1')
				.addComponent("AddBulletHitFlash")
				.addChild('cannon-shooter-0')
				.setRenderer("CannonBaseRenderer")
				.enemyCategory()
				.weakEnemyTier();

			this.gameObjectPool.createConfiguration("cannon-1", "CannonBase")
				.args({
					destroyExplosions: explosionBundle.getMediumExplosionsEffectId(),
					hp: 8
				})
				.addComponent('CannonBaseCollider')
				.addComponent('ActivateShooterOnView')
				.addComponent('CannonExplosion1')
				.addComponent("AddBulletHitFlash")
				.addChild('cannon-shooter-1')
				.setRenderer("CannonBaseRenderer")
				.enemyCategory()
				.strongEnemyTier();

			this.gameObjectPool.createConfiguration("boss-cannon-0", "BossCannonBase")
				.args({
					damageExplosions: explosionBundle.getMediumExplosionsEffectId(),
					damageParticles: [
						particleBundle.getCannonDamageParticles_1_Id(),
						particleBundle.getCannonDamageParticles_2_Id()
					],
					hp: 15
				})
				.addComponent('CannonBaseCollider')
				.addComponent('ActivateShooterOnView')
				.addComponent('CannonExplosion1')
				.addComponent("AddBulletHitFlash")
				.addChild('boss-cannon-shooter-0')
				.setRenderer("BossCannonBaseRenderer")
				.enemyCategory()
				.weakBossHelperEnemyTier();

			this.gameObjectPool.createConfiguration("boss-cannon-1", "BossCannonBase")
				.args({
					damageExplosions: explosionBundle.getMediumExplosionsEffectId(),
					damageParticles: [
						particleBundle.getCannonDamageParticles_1_Id(),
						particleBundle.getCannonDamageParticles_2_Id()
					],
					hp: 22
				})
				.addComponent('CannonBaseCollider')
				.addComponent('ActivateShooterOnView')
				.addComponent('CannonExplosion1')
				.addComponent("AddBulletHitFlash")
				.addChild('boss-cannon-shooter-1')
				.setRenderer("BossCannonBaseRenderer")
				.enemyCategory()
				.strongBossHelperEnemyTier();

			// =============================
			// =============================

			// Laser
			// =======================

			this.gameObjectPool.createPool('LaserShooter', require("laser-shooter"));
			this.gameObjectPool.createDynamicPool('LaserBase', require("laser-base"));

			this.componentPool.createConfiguration("LaserBaseRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["LASERBASE.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("LaserShooterRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["LASERTURRET.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("BossLaserShooterRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSSLASERTURRET.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("LaserBaseCollider", commonBundle.getCircleColliderPoolId())
				.args({ 
					id:'cannonColliderId', 
					radius:25
				});

			this.gameObjectPool.createConfiguration("laser-shooter-0", "LaserShooter")
				.args({
					shootTime: 300,
					burstTime: 50
				})
				.addChild('FirePosition', { x: 0, y: -28 })
				.addComponent('ActivateShooterOnView')
				.addComponent('LaserAttack')
				.setRenderer("LaserShooterRenderer")
				.childOnly();

			this.gameObjectPool.createConfiguration("laser-shooter-1", "LaserShooter")
				.args({
					shootTime: 200,
					burstTime: 200
				})
				.addChild('FirePosition', { x: 0, y: -28 })
				.addComponent('ActivateShooterOnView')
				.addComponent('LaserAttack')
				.setRenderer("LaserShooterRenderer")
				.childOnly();

			this.gameObjectPool.createConfiguration("boss-laser-shooter-0", "LaserShooter")
				.args({
					shootTime: 250,
					burstTime: 250
				})
				.addChild('FirePosition', { x: 0, y: -28 })
				.addComponent('ActivateShooterOnView')
				.addComponent('LaserAttack')
				.setRenderer("BossLaserShooterRenderer")
				.childOnly();

			this.gameObjectPool.createConfiguration("boss-laser-shooter-1", "LaserShooter")
				.args({
					shootTime: 250,
					burstTime: 400
				})
				.addChild('FirePosition', { x: 0, y: -28 })
				.addComponent('ActivateShooterOnView')
				.addComponent('LaserAttack')
				.setRenderer("BossLaserShooterRenderer")
				.childOnly();

			this.gameObjectPool.createConfiguration("laser-cannon-0", "LaserBase")
				.args({
					destroyExplosions: explosionBundle.getMediumExplosionsEffectId(),
					hp: 8
				})
				.addComponent('LaserBaseCollider')
				.addComponent('ActivateShooterOnView')
				.addComponent('CannonExplosion1')
				.addComponent("AddBulletHitFlash")
				.addChild('laser-shooter-0')
				.setRenderer("LaserBaseRenderer")
				.enemyCategory()
				.weakEnemyTier();

			this.gameObjectPool.createConfiguration("laser-cannon-1", "LaserBase")
				.args({
					destroyExplosions: explosionBundle.getMediumExplosionsEffectId(),
					hp: 10
				})
				.addComponent('LaserBaseCollider')
				.addComponent('ActivateShooterOnView')
				.addComponent('CannonExplosion1')
				.addComponent("AddBulletHitFlash")
				.addChild('laser-shooter-1')
				.setRenderer("LaserBaseRenderer")
				.enemyCategory()
				.strongEnemyTier();

			this.gameObjectPool.createConfiguration("boss-laser-cannon-0", "BossCannonBase")
				.args({
					damageExplosions: explosionBundle.getMediumExplosionsEffectId(),
					damageParticles: [
						particleBundle.getCannonDamageParticles_1_Id(),
						particleBundle.getCannonDamageParticles_2_Id()
					],
					hp: 15
				})
				.addComponent('LaserBaseCollider')
				.addComponent('ActivateShooterOnView')
				.addComponent('CannonExplosion1')
				.addComponent("AddBulletHitFlash")
				.addChild('boss-laser-shooter-0')
				.setRenderer("LaserBaseRenderer")
				.enemyCategory()
				.weakBossHelperEnemyTier();

			this.gameObjectPool.createConfiguration("boss-laser-cannon-1", "BossCannonBase")
				.args({
					damageExplosions: explosionBundle.getMediumExplosionsEffectId(),
					damageParticles: [
						particleBundle.getCannonDamageParticles_1_Id(),
						particleBundle.getCannonDamageParticles_2_Id()
					],
					hp: 22
				})
				.addComponent('LaserBaseCollider')
				.addComponent('ActivateShooterOnView')
				.addComponent('CannonExplosion1')
				.addComponent("AddBulletHitFlash")
				.addChild('boss-laser-shooter-1')
				.setRenderer("LaserBaseRenderer")
				.enemyCategory()
				.strongBossHelperEnemyTier();

			// =============================
			// =============================

			// Double Cannon
			// =======================

			this.gameObjectPool.createDynamicPool('DoubleCannonBase', require("double-cannon-base"));
			this.gameObjectPool.createDynamicPool('BossDoubleCannonBase', require("boss-double-cannon-base"));

			this.componentPool.createConfiguration("DoubleBaseCollider", commonBundle.getPolygonColliderPoolId())
				.args({ 
					id:'cannonColliderId', 
					points: [
						{ x: -32 , y: 5  },
						{ x:  32 , y: 5  },
						{ x:  32 , y: 30 },
						{ x: -32 , y: 30 }
					]
				});
			
			this.componentPool.createConfiguration("DoubleCannonBaseRenderer", commonBundle.getAnimationBitmapRendererPoolId())
				.args({
					pingPong: true,
					frameWidth: 64,
					frameHeight: 64,
					frameDelay: 0.2,
					path: gb.assetMap()["DOUBLECANNON.PNG"],
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("double-cannon-0", "DoubleCannonBase")
				.args({
					destroyExplosions: explosionBundle.getMediumExplosionsEffectId(),
					completeAnimationsBeforeFire: 2,
					bulletType: "double-cannon-bullet-slow",
					hp: 20
				})
				.addComponent('DoubleBaseCollider')
				.addComponent('ActivateShooterOnView')
				.addComponent('CannonExplosion1')
				.addComponent("AddBulletHitFlash")
				.addChild('FirePosition', { x: -27, y: 6, angle: -41 })
				.addChild('FirePosition', { x: 27, y: 6, angle: 41 })
				.setRenderer("DoubleCannonBaseRenderer")
				.enemyCategory()
				.weakEnemyTier();

			this.gameObjectPool.createConfiguration("double-cannon-1", "DoubleCannonBase")
				.args({
					destroyExplosions: explosionBundle.getMediumExplosionsEffectId(),
					completeAnimationsBeforeFire: 2,
					bulletType: "double-cannon-bullet-fast",
					hp: 25
				})
				.addComponent('DoubleBaseCollider')
				.addComponent('ActivateShooterOnView')
				.addComponent('CannonExplosion1')
				.addComponent("AddBulletHitFlash")
				.addChild('FirePosition', { x: -27, y: 6, angle: -41 })
				.addChild('FirePosition', { x: 27, y: 6, angle: 41 })
				.setRenderer("DoubleCannonBaseRenderer")
				.enemyCategory()
				.strongEnemyTier();

			this.gameObjectPool.createConfiguration("boss-double-cannon-0", "BossDoubleCannonBase")
				.args({
					damageExplosions: explosionBundle.getMediumExplosionsEffectId(),
					damageParticles: [
						particleBundle.getCannonDamageParticles_1_Id(),
						particleBundle.getCannonDamageParticles_2_Id()
					],
					completeAnimationsBeforeFire: 1,
					bulletType: "double-cannon-bullet-slow",
					hp: 50
				})
				.addComponent('DoubleBaseCollider')
				.addComponent('ActivateShooterOnView')
				.addComponent('CannonExplosion1')
				.addComponent("AddBulletHitFlash")
				.addChild('FirePosition', { x: -27, y: 6, angle: -41 })
				.addChild('FirePosition', { x: 27, y: 6, angle: 41 })
				.setRenderer("DoubleCannonBaseRenderer")
				.enemyCategory()
				.weakBossHelperEnemyTier();

			this.gameObjectPool.createConfiguration("boss-double-cannon-1", "BossDoubleCannonBase")
				.args({
					damageExplosions: explosionBundle.getMediumExplosionsEffectId(),
					damageParticles: [
						particleBundle.getCannonDamageParticles_1_Id(),
						particleBundle.getCannonDamageParticles_2_Id()
					],
					completeAnimationsBeforeFire: 1,
					bulletType: "double-cannon-bullet-fast",
					hp: 70
				})
				.addComponent('DoubleBaseCollider')
				.addComponent('ActivateShooterOnView')
				.addComponent('CannonExplosion1')
				.addComponent("AddBulletHitFlash")
				.addChild('FirePosition', { x: -27, y: 6, angle: -41 })
				.addChild('FirePosition', { x: 27, y: 6, angle: 41 })
				.setRenderer("DoubleCannonBaseRenderer")
				.enemyCategory()
				.strongBossHelperEnemyTier();

			// =============================
			// =============================
			
			// Missile Turret
			// =======================

			this.gameObjectPool.createPool('MissileShooter', require("missile-turret-shooter"));
			this.gameObjectPool.createDynamicPool('MissileTurretBase', require("missile-turret-base"));

			this.componentPool.createConfiguration("MissileTurretCollider", commonBundle.getCircleColliderPoolId())
				.args({
					id:'cannonColliderId',
					radius:23
				});

			this.componentPool.createConfiguration("MissileTurretBaseRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["MISSILETURRETBASE.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("MissileTurretHingeRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["MISSILETURRETHINGE.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("MissileTurretShooterRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["MISSILETURRETSHOOTER.PNG"],
					offsetX: -32,
					offsetY: -40
				});

			this.componentPool.createConfiguration("BossMissileTurretShooterRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSSMISSILETURRETSHOOTER.PNG"],
					offsetX: -32,
					offsetY: -40
				});

			this.gameObjectPool.createConfiguration("missile-turret-shooter-0", "MissileShooter")
				.args({
					rate: 100,
					missiles: 6,
					burstAmount: 3,
					rotation: 45,
					missileType: 'missile-slow',
					skipDebug: true
				})
				.addComponent('ActivateShooterOnView')
				.addComponent('MissileLaunch1')
				.addChild("FirePosition", { y: -5 })
				.addChild("FirePosition", { y: 0 })
				.addChild("FirePosition", { y: 5 })
				.setRenderer("MissileTurretShooterRenderer")
				.disableMouseSupport()
				.childOnly();

			this.gameObjectPool.createConfiguration("missile-turret-shooter-1", "MissileShooter")
				.args({
					rate: 70,
					missiles: 12,
					burstAmount: 3,
					rotation: 45,
					missileType: 'missile-fast',
					skipDebug: true
				})
				.addComponent('ActivateShooterOnView')
				.addComponent('MissileLaunch1')
				.addChild("FirePosition", { y: -5 })
				.addChild("FirePosition", { y: 0 })
				.addChild("FirePosition", { y: 5 })
				.setRenderer("MissileTurretShooterRenderer")
				.disableMouseSupport()
				.childOnly();

			this.gameObjectPool.createConfiguration("boss-missile-turret-shooter-0", "MissileShooter")
				.args({
					rate: 150,
					missiles: 500,
					burstAmount: 4,
					rotation: 45,
					missileType: 'missile-slow',
					skipDebug: true
				})
				.addComponent('ActivateShooterOnView')
				.addComponent('MissileLaunch1')
				.addChild("FirePosition", { y: -5 })
				.addChild("FirePosition", { y: 0 })
				.addChild("FirePosition", { y: 5 })
				.setRenderer("BossMissileTurretShooterRenderer")
				.disableMouseSupport()
				.childOnly();

			this.gameObjectPool.createConfiguration("boss-missile-turret-shooter-1", "MissileShooter")
				.args({
					rate: 170,
					missiles: 500,
					burstAmount: 5,
					rotation: 45,
					missileType: 'missile-fast',
					skipDebug: true
				})
				.addComponent('ActivateShooterOnView')
				.addComponent('MissileLaunch1')
				.addChild("FirePosition", { y: -5 })
				.addChild("FirePosition", { y: 0 })
				.addChild("FirePosition", { y: 5 })
				.setRenderer("BossMissileTurretShooterRenderer")
				.disableMouseSupport()
				.childOnly();

			this.gameObjectPool.createConfiguration("missile-turret-hinge", "editor-game-object")
				.args({
					skipDebug: true
				})
				.setRenderer("MissileTurretHingeRenderer")
				.disableMouseSupport()
				.childOnly();

			this.gameObjectPool.createConfiguration("missile-turret-0", "MissileTurretBase")
				.args({
					destroyExplosions: explosionBundle.getMediumExplosionsEffectId(),
					hp: 7
				})
				.addComponent('MissileTurretCollider')
				.addComponent('ActivateShooterOnView')
				.addComponent('CannonExplosion1')
				.addComponent("AddBulletHitFlash")
				.addChild('missile-turret-shooter-0', { y: 7 })
				.addChild('missile-turret-hinge')
				.setRenderer("MissileTurretBaseRenderer")
				.enemyCategory()
				.weakEnemyTier();

			this.gameObjectPool.createConfiguration("missile-turret-1", "MissileTurretBase")
				.args({
					destroyExplosions: explosionBundle.getMediumExplosionsEffectId(),
					hp: 15
				})
				.addComponent('MissileTurretCollider')
				.addComponent('ActivateShooterOnView')
				.addComponent('CannonExplosion1')
				.addComponent("AddBulletHitFlash")
				.addChild('missile-turret-shooter-1', { y: 7 })
				.addChild('missile-turret-hinge')
				.setRenderer("MissileTurretBaseRenderer")
				.enemyCategory()
				.strongEnemyTier();

			this.gameObjectPool.createConfiguration("boss-missile-turret-0", "BossCannonBase")
				.args({
					damageExplosions: explosionBundle.getMediumExplosionsEffectId(),
					damageParticles: [
						particleBundle.getCannonDamageParticles_1_Id(),
						particleBundle.getCannonDamageParticles_2_Id()
					],
					hp: 20
				})
				.addComponent('MissileTurretCollider')
				.addComponent('ActivateShooterOnView')
				.addComponent('CannonExplosion1')
				.addComponent("AddBulletHitFlash")
				.addChild('boss-missile-turret-shooter-0', { y: 7 })
				.addChild('missile-turret-hinge')
				.setRenderer("MissileTurretBaseRenderer")
				.enemyCategory()
				.weakBossHelperEnemyTier();

			this.gameObjectPool.createConfiguration("boss-missile-turret-1", "BossCannonBase")
				.args({
					damageExplosions: explosionBundle.getMediumExplosionsEffectId(),
					damageParticles: [
						particleBundle.getCannonDamageParticles_1_Id(),
						particleBundle.getCannonDamageParticles_2_Id()
					],
					hp: 25
				})
				.addComponent('MissileTurretCollider')
				.addComponent('ActivateShooterOnView')
				.addComponent('CannonExplosion1')
				.addComponent("AddBulletHitFlash")
				.addChild('boss-missile-turret-shooter-1', { y: 7 })
				.addChild('missile-turret-hinge')
				.setRenderer("MissileTurretBaseRenderer")
				.enemyCategory()
				.strongBossHelperEnemyTier();

			// =============================
			// =============================
		}
	});

	return new CannonBundle();
});