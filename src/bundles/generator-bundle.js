define(function(require) {	
	var commonBundle = require('common-bundle');
	var gb = require('gb');
	var explosionsBundle = require('explosion-generator-bundle');
	var particleBundle = require('particle-generator-bundle');
	
	var Generator = require("bundle").extend({
		create: function(args) {			
			
			this.gameObjectPool.createDynamicPool('GeneratorType', require('generator'));
			this.gameObjectPool.createDynamicPool('BossGeneratorType', require('boss-generator'));

			this.componentPool.createPool('DestroyExplosions', require('destroy-explosions'));
			this.componentPool.createPool('DestroyOnHpDepleted', require('destroy-on-hp-depleted'));
			this.componentPool.createPool('DamageExplosions', require('damage-explosions'));
			this.componentPool.createPool('DamageOnHpDepleted', require('damage-on-hp-depleted'));

			this.componentPool.createConfiguration("GeneratorCircleCollider", commonBundle.getPolygonColliderPoolId())
				.args({ 
					id:'generatorColliderId', 
					points: [
						{ x: -32 , y: -15  },
						{ x:  32 , y: -15  },
						{ x:  32 , y: 15 },
						{ x: -32 , y: 15 }
					]
				});

			this.componentPool.createConfiguration("Activate_Generator_On_View", commonBundle.getActivateOnViewPoolId());
			
			// Destroy Components
			// ======================
			this.componentPool.createConfiguration("GeneratorDestroyExplosions", "DestroyExplosions")
				.args({
					effect: explosionsBundle.getMediumExplosionsEffectId()
				});

			this.componentPool.createConfiguration("GeneratorDestroyOnHpDepleted", "DestroyOnHpDepleted");
			// ======================

			// Damage Components
			// ======================
			this.componentPool.createConfiguration("GeneratorDamageExplosions", "DamageExplosions")
				.args({
					instantEffects: [
						explosionsBundle.getMediumExplosionsEffectId()
					],
					lastingEffects: [
						particleBundle.getCannonDamageParticles_1_Id(),
						particleBundle.getCannonDamageParticles_2_Id()
					]
				});

			this.componentPool.createConfiguration("GeneratorDamageOnHpDepleted", "DamageOnHpDepleted");
			// ======================
			

			this.gameObjectPool.createDynamicPool('GeneratorWayPoint', require('generator-way-point'));

			this.componentPool.createPool('AutoHide', require('auto-hide'));
			this.componentPool.createPool('ConnectSimilar', require('connect-similar-game-objects'));

			this.componentPool.createConfiguration("GeneratorWayPointRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["GENERATORWAYPOINT.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("AutoHide", "AutoHide");

			this.componentPool.createConfiguration("ConnectSimilarGeneratorWayPoints", "ConnectSimilar")
				.args({
					objectType: 'GeneratorWayPoint'
				});

			this.gameObjectPool.createConfiguration('GeneratorWayPoint', 'GeneratorWayPoint')
				.args({
					skipDebug: true
				})
				.addComponent('AutoHide')
				.setRenderer('GeneratorWayPointRenderer')
				.childOnly();

			this.componentPool.createConfiguration("GeneratorRenderer", commonBundle.getAnimationsBitmapRendererPoolId())
				.args({
					startingLabel: 'half-open',

					frameWidth: 64,
					frameHeight: 40,
					frameDelay: 0.08,
					frameCount: 9,
					offset: 'center',
					path: gb.assetMap()["GENERATOR.PNG"],

					labels: {
						'opened': {
							loop: false,
							frames: [8]
						},
						'closed': {
							loop: false,
							frames: [0]
						},
						'opening': {
							loop: false,
							frames: [0,1,2,3,4,5,6,7,8]
						},
						'closing': {
							loop: false,
							frames: [8,7,6,5,4,3,2,1,0]
						},
						'half-open': {
							loop: false,
							frames: [4]
						},
						'half-open-close': {
							loop: false,
							frames: [4,3,2,1,0]
						}
					}
				});

			this.componentPool.createConfiguration("BossGeneratorRenderer", commonBundle.getAnimationsBitmapRendererPoolId())
				.args({
					startingLabel: 'half-open',

					frameWidth: 64,
					frameHeight: 40,
					frameDelay: 0.08,
					frameCount: 9,
					offset: 'center',
					path: gb.assetMap()["BOSSGENERATOR.PNG"],

					labels: {
						'opened': {
							loop: false,
							frames: [8]
						},
						'closed': {
							loop: false,
							frames: [0]
						},
						'opening': {
							loop: false,
							frames: [0,1,2,3,4,5,6,7,8]
						},
						'closing': {
							loop: false,
							frames: [8,7,6,5,4,3,2,1,0]
						},
						'half-open': {
							loop: false,
							frames: [4]
						},
						'half-open-close': {
							loop: false,
							frames: [4,3,2,1,0]
						}
					}
				});

			// Generator Configurations

			this.gameObjectPool.createConfiguration('ship-generator-0', 'GeneratorType')
				.args({
					hp: 20,
					amount: 3,
					objectType: 'generator-enemy-ship-0'
				})
				.addComponent('GeneratorCircleCollider')
				.addComponent('Activate_Generator_On_View')
				.addComponent('GeneratorDestroyOnHpDepleted')
				.addComponent('GeneratorDestroyExplosions')
				.addComponent('ConnectSimilarGeneratorWayPoints')
				.addComponent('GeneratorExplosion1')
				.addComponent("AddBulletHitFlash")
				.addChild('GeneratorWayPoint', { y : -20 })
				.addChild('GeneratorWayPoint', { y : -40 })
				.addChild('GeneratorWayPoint', { y : -60 })
				.addChild('GeneratorWayPoint', { y : -80 })
				.addChild('GeneratorWayPoint', { y : -100 })
				.addChild('GeneratorWayPoint', { y : -120 })
				.setRenderer('GeneratorRenderer')
				.enemyCategory()
				.weakEnemyTier();

			this.gameObjectPool.createConfiguration('ship-generator-1', 'GeneratorType')
				.args({
					hp: 30,
					amount: 4,
					objectType: 'generator-enemy-ship-1'
				})
				.addComponent('GeneratorCircleCollider')
				.addComponent('Activate_Generator_On_View')
				.addComponent('GeneratorDestroyOnHpDepleted')
				.addComponent('GeneratorDestroyExplosions')
				.addComponent('ConnectSimilarGeneratorWayPoints')
				.addComponent('GeneratorExplosion1')
				.addComponent("AddBulletHitFlash")
				.addChild('GeneratorWayPoint', { y : -20 })
				.addChild('GeneratorWayPoint', { y : -40 })
				.addChild('GeneratorWayPoint', { y : -60 })
				.addChild('GeneratorWayPoint', { y : -80 })
				.addChild('GeneratorWayPoint', { y : -100 })
				.addChild('GeneratorWayPoint', { y : -120 })
				.setRenderer('GeneratorRenderer')
				.enemyCategory()
				.strongEnemyTier();

			this.gameObjectPool.createConfiguration('boss-ship-generator-0', 'BossGeneratorType')
				.args({
					hp: 10,
					amount: 3,
					objectType: 'generator-enemy-ship-0'
				})
				.addComponent('GeneratorCircleCollider')
				.addComponent('Activate_Generator_On_View')
				.addComponent('GeneratorDamageOnHpDepleted')
				.addComponent('GeneratorDamageExplosions')
				.addComponent('GeneratorDestroyExplosions')
				.addComponent('ConnectSimilarGeneratorWayPoints')
				.addComponent('GeneratorExplosion1')
				.addComponent('GeneratorExplosion2')
				.addComponent("AddBulletHitFlash")
				.addChild('GeneratorWayPoint', { y : -20 })
				.addChild('GeneratorWayPoint', { y : -40 })
				.addChild('GeneratorWayPoint', { y : -60 })
				.addChild('GeneratorWayPoint', { y : -80 })
				.addChild('GeneratorWayPoint', { y : -100 })
				.addChild('GeneratorWayPoint', { y : -120 })
				.setRenderer('BossGeneratorRenderer')
				.enemyCategory()
				.weakBossHelperEnemyTier();

			this.gameObjectPool.createConfiguration('boss-ship-generator-1', 'BossGeneratorType')
				.args({
					hp: 10,
					amount: 4,
					objectType: 'generator-enemy-ship-1'
				})
				.addComponent('GeneratorCircleCollider')
				.addComponent('Activate_Generator_On_View')
				.addComponent('GeneratorDamageOnHpDepleted')
				.addComponent('GeneratorDamageExplosions')
				.addComponent('GeneratorDestroyExplosions')
				.addComponent('ConnectSimilarGeneratorWayPoints')
				.addComponent('GeneratorExplosion1')
				.addComponent('GeneratorExplosion2')
				.addComponent("AddBulletHitFlash")
				.addChild('GeneratorWayPoint', { y : -20 })
				.addChild('GeneratorWayPoint', { y : -40 })
				.addChild('GeneratorWayPoint', { y : -60 })
				.addChild('GeneratorWayPoint', { y : -80 })
				.addChild('GeneratorWayPoint', { y : -100 })
				.addChild('GeneratorWayPoint', { y : -120 })
				.setRenderer('BossGeneratorRenderer')
				.enemyCategory()
				.strongBossHelperEnemyTier();

			this.gameObjectPool.createConfiguration('boss-spider-generator-0', 'BossGeneratorType')
				.args({
					hp: 10,
					amount: 5,
					objectType: 'generator-spider-0'
				})
				.addComponent('GeneratorCircleCollider')
				.addComponent('Activate_Generator_On_View')
				.addComponent('GeneratorDamageOnHpDepleted')
				.addComponent('GeneratorDamageExplosions')
				.addComponent('GeneratorDestroyExplosions')
				.addComponent('ConnectSimilarGeneratorWayPoints')
				.addComponent('GeneratorExplosion1')
				.addComponent('GeneratorExplosion2')
				.addComponent("AddBulletHitFlash")
				.addChild('GeneratorWayPoint', { y : -20 })
				.addChild('GeneratorWayPoint', { y : -40 })
				.addChild('GeneratorWayPoint', { y : -60 })
				.addChild('GeneratorWayPoint', { y : -80 })
				.addChild('GeneratorWayPoint', { y : -100 })
				.addChild('GeneratorWayPoint', { y : -120 })
				.setRenderer('BossGeneratorRenderer')
				.enemyCategory()
				.weakBossHelperEnemyTier();

			this.gameObjectPool.createConfiguration('boss-spider-generator-1', 'BossGeneratorType')
				.args({
					hp: 10,
					amount: 5,
					objectType: 'generator-spider-1'
				})
				.addComponent('GeneratorCircleCollider')
				.addComponent('Activate_Generator_On_View')
				.addComponent('GeneratorDamageOnHpDepleted')
				.addComponent('GeneratorDamageExplosions')
				.addComponent('GeneratorDestroyExplosions')
				.addComponent('ConnectSimilarGeneratorWayPoints')
				.addComponent('GeneratorExplosion1')
				.addComponent('GeneratorExplosion2')
				.addComponent("AddBulletHitFlash")
				.addChild('GeneratorWayPoint', { y : -20 })
				.addChild('GeneratorWayPoint', { y : -40 })
				.addChild('GeneratorWayPoint', { y : -60 })
				.addChild('GeneratorWayPoint', { y : -80 })
				.addChild('GeneratorWayPoint', { y : -100 })
				.addChild('GeneratorWayPoint', { y : -120 })
				.setRenderer('BossGeneratorRenderer')
				.enemyCategory()
				.strongBossHelperEnemyTier();
		},
	});

	return new Generator();
});