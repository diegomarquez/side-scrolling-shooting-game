define(function(require) {	
	var commonBundle = require('common-bundle');
	var gb = require('gb');
	var explosionsBundle = require('explosion-generator-bundle');

	var SpiderBundle = require("bundle").extend({
		create: function(args) {			
			
			this.gameObjectPool.createDynamicPool('Spider_Follow_Type', require('follow-spider'));
			// this.gameObjectPool.createDynamicPool('Spider_Shooting_Type', require('shooting-spider'));

			this.componentPool.createPool('AngleMovement', require('movement-angle'));
			this.componentPool.createPool('DestroyExplosions', require('destroy-explosions'));
			this.componentPool.createPool('DestroyOnHpDepleted', require('destroy-on-hp-depleted'));
			this.componentPool.createPool('CheckOutOfBounds', require('check-out-of-bounds'));

			this.componentPool.createConfiguration("Activate_Spider_On_View", commonBundle.getActivateOnViewPoolId());
			
			this.componentPool.createConfiguration("SpiderAngleMovement", "AngleMovement");
			this.componentPool.createConfiguration("SpiderDestroyExplosions", "DestroyExplosions")
				.args({
					effect: explosionsBundle.getMediumExplosionsEffectId()
				});
			this.componentPool.createConfiguration("SpiderDestroyOnHpDepleted", "DestroyOnHpDepleted");
			this.componentPool.createConfiguration("CheckOutOfBounds", "CheckOutOfBounds");

			this.componentPool.createConfiguration("Spider_Renderer", commonBundle.getAnimationBitmapRendererPoolId())
				.args({
					frameWidth: 78,
					frameHeight: 60,
					frameDelay: 0.03,
					frameCount: 5,
					loop: true,
					offset: 'center',
					path: gb.assetMap()["SMALLSPIDER.PNG"]
				});

			this.gameObjectPool.createConfiguration('follow-spider-0', 'Spider_Follow_Type')
				.args({
					hp: 2,
					speed: 200,
				})
				.addComponent('EnemySpiderCircleCollider')
				.addComponent('Activate_Spider_On_View')
				.addComponent('SpiderAngleMovement')
				.addComponent('SpiderDestroyExplosions')
				.addComponent('SpiderDestroyOnHpDepleted')
				.addComponent("CheckOutOfBounds")
				.setRenderer('Spider_Renderer')
				.enemyCategory()
				.weakEnemyTier();

			this.gameObjectPool.createConfiguration('follow-spider-1', 'Spider_Follow_Type')
				.args({
					hp: 3,
					speed: 300,
				})
				.addComponent('EnemySpiderCircleCollider')
				.addComponent('Activate_Spider_On_View')
				.addComponent('SpiderAngleMovement')
				.addComponent('SpiderDestroyExplosions')
				.addComponent('SpiderDestroyOnHpDepleted')
				.addComponent("CheckOutOfBounds")
				.setRenderer('Spider_Renderer')
				.enemyCategory()
				.strongEnemyTier();
				

			// this.gameObjectPool.createConfiguration('shooting-spider-0', 'Spider_Shooting_Type')
			// 	.args({
			// 		hp: 5,
			// 		speed: 200,
			// 		scaleX: 0.8,
			// 		scaleY: 0.8
			// 	})
			// 	.addComponent('EnemySpiderCircleCollider')
			// 	.addComponent('Activate_EnemyShip_On_View')
			// 	.addComponent('EnemyShipAngleMovement')
			// 	.addComponent('EnemyShipFollowWayPoints')
			// 	.addComponent('EnemyShipDestroyExplosions')
			// 	.addComponent('EnemyShipDestroyOnHpDepleted')
			// 	.setRenderer('Spider_Renderer')
			// 	.enemyCategory()
			// 	.weakEnemyTier();
				
		},
	});

	return new SpiderBundle();
});