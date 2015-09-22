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

			this.componentPool.createConfiguration("GeneratorCircleCollider", commonBundle.getCircleColliderPoolId())
				.args({
					id: 'generatorColliderId',
					radius: 20
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

			this.gameObjectPool.createConfiguration('generator-0-short', 'GeneratorType')
				.args({
					hp: 3,
					amount: 3,
					objectType: 'generator-enemy-ship-0-short'
				})
				.addComponent('GeneratorCircleCollider')
				.addComponent('Activate_Generator_On_View')
				.addComponent('GeneratorDestroyOnHpDepleted')
				.addComponent('GeneratorDestroyExplosions')
				.setRenderer('GeneratorRenderer')
				.enemyCategory()
				.weakEnemyTier();

			this.gameObjectPool.createConfiguration('generator-0-long', 'GeneratorType')
				.args({
					hp: 3,
					amount: 3,
					objectType: 'generator-enemy-ship-0-long'
				})
				.addComponent('GeneratorCircleCollider')
				.addComponent('Activate_Generator_On_View')
				.addComponent('GeneratorDestroyOnHpDepleted')
				.addComponent('GeneratorDestroyExplosions')
				.setRenderer('GeneratorRenderer')
				.enemyCategory()
				.weakEnemyTier();

			this.gameObjectPool.createConfiguration('generator-1-short', 'GeneratorType')
				.args({
					hp: 30,
					amount: 4,
					objectType: 'generator-enemy-ship-1-short'
				})
				.addComponent('GeneratorCircleCollider')
				.addComponent('Activate_Generator_On_View')
				.addComponent('GeneratorDestroyOnHpDepleted')
				.addComponent('GeneratorDestroyExplosions')
				.setRenderer('GeneratorRenderer')
				.enemyCategory()
				.strongEnemyTier();

			this.gameObjectPool.createConfiguration('generator-1-long', 'GeneratorType')
				.args({
					hp: 30,
					amount: 4,
					objectType: 'generator-enemy-ship-1-long'
				})
				.addComponent('GeneratorCircleCollider')
				.addComponent('Activate_Generator_On_View')
				.addComponent('GeneratorDestroyOnHpDepleted')
				.addComponent('GeneratorDestroyExplosions')
				.setRenderer('GeneratorRenderer')
				.enemyCategory()
				.strongEnemyTier();

			this.gameObjectPool.createConfiguration('boss-generator-0-short', 'BossGeneratorType')
				.args({
					hp: 10,
					amount: 3,
					objectType: 'generator-enemy-ship-0-short'
				})
				.addComponent('GeneratorCircleCollider')
				.addComponent('Activate_Generator_On_View')
				.addComponent('GeneratorDamageOnHpDepleted')
				.addComponent('GeneratorDamageExplosions')
				.addComponent('GeneratorDestroyExplosions')
				.setRenderer('BossGeneratorRenderer')
				.enemyCategory()
				.weakBossHelperEnemyTier();

			this.gameObjectPool.createConfiguration('boss-generator-0-long', 'BossGeneratorType')
				.args({
					hp: 15,
					amount: 3,
					objectType: 'boss-generator-enemy-ship-0-long'
				})
				.addComponent('GeneratorCircleCollider')
				.addComponent('Activate_Generator_On_View')
				.addComponent('GeneratorDamageOnHpDepleted')
				.addComponent('GeneratorDamageExplosions')
				.addComponent('GeneratorDestroyExplosions')
				.setRenderer('BossGeneratorRenderer')
				.enemyCategory()
				.weakBossHelperEnemyTier();

			this.gameObjectPool.createConfiguration('boss-generator-1-short', 'BossGeneratorType')
				.args({
					hp: 10,
					amount: 4,
					objectType: 'boss-generator-enemy-ship-1-short'
				})
				.addComponent('GeneratorCircleCollider')
				.addComponent('Activate_Generator_On_View')
				.addComponent('GeneratorDamageOnHpDepleted')
				.addComponent('GeneratorDamageExplosions')
				.addComponent('GeneratorDestroyExplosions')
				.setRenderer('BossGeneratorRenderer')
				.enemyCategory()
				.strongBossHelperEnemyTier();

			this.gameObjectPool.createConfiguration('boss-generator-1-long', 'BossGeneratorType')
				.args({
					hp: 15,
					amount: 4,
					objectType: 'boss-generator-enemy-ship-1-long'
				})
				.addComponent('GeneratorCircleCollider')
				.addComponent('Activate_Generator_On_View')
				.addComponent('GeneratorDamageOnHpDepleted')
				.addComponent('GeneratorDamageExplosions')
				.addComponent('GeneratorDestroyExplosions')
				.setRenderer('BossGeneratorRenderer')
				.enemyCategory()
				.strongBossHelperEnemyTier();
		},
	});

	return new Generator();
});