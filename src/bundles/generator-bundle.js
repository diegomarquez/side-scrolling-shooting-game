define(function(require) {	
	var commonBundle = require('common-bundle');
	var gb = require('gb');
	var explosionsBundle = require('explosion-generator-bundle');
	
	var Generator = require("bundle").extend({
		create: function(args) {			
			
			this.gameObjectPool.createDynamicPool('GeneratorType', require('generator'));

			this.componentPool.createPool('DestroyExplosions', require('destroy-explosions'));
			this.componentPool.createPool('DestroyOnHpDepleted', require('destroy-on-hp-depleted'));

			this.componentPool.createConfiguration("GeneratorCircleCollider", commonBundle.getCircleColliderPoolId())
				.args({
					id: 'generatorColliderId', 
					radius: 20
				});

			this.componentPool.createConfiguration("Activate_Generator_On_View", commonBundle.getActivateOnViewPoolId());
			
			this.componentPool.createConfiguration("GeneratorDestroyExplosions", "DestroyExplosions")
				.args({
					effect: explosionsBundle.getMediumExplosionsEffectId()
				});

			this.componentPool.createConfiguration("GeneratorDestroyOnHpDepleted", "DestroyOnHpDepleted");

			this.componentPool.createConfiguration("GeneratorRenderer", commonBundle.getAnimationsBitmapRendererPoolId())
				.args({
					startingLabel: 'half-open',

					frameWidth: 64,
					frameHeight: 32,
					frameDelay: 0.08,
					frameCount: 8,
					offset: 'center',
					path: gb.assetMap()["GENERATOR.PNG"],

					labels: {
						'opened': {
							loop: false,
							frames: [7]
						},
						'closed': {
							loop: false,
							frames: [0]
						},
						'opening': {
							loop: false,
							frames: [0,1,2,3,4,5,6,7]
						},
						'closing': {
							loop: false,
							frames: [7,6,5,4,3,2,1,0]
						},
						'half-open': {
							loop: false,
							frames: [4]
						}
					}
				});

			// Generator Configurations

			this.gameObjectPool.createConfiguration('generator-0', 'GeneratorType')
				.args({
					hp: 3,
					amount: 3,
					objectType: 'generator-enemy-ship-0'
				})
				.addComponent('GeneratorCircleCollider')
				.addComponent('Activate_Generator_On_View')
				.addComponent('GeneratorDestroyOnHpDepleted')
				.addComponent('GeneratorDestroyExplosions')
				.setRenderer('GeneratorRenderer')
				.enemyCategory()
				.weakEnemyTier();
		},
	});

	return new Generator();
});