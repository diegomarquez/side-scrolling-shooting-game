define(function(require) {	
	var commonBundle = require('common-bundle');
	var gb = require('gb');
	var explosionsBundle = require('explosion-generator-bundle');

	var EnemyShip = require("bundle").extend({
		create: function(args) {			
			
			this.gameObjectPool.createDynamicPool('EnemyShip_1_Type', require('enemy-ship-1'));
			this.gameObjectPool.createDynamicPool('EnemyShip_2_Type', require('enemy-ship-2'));

			this.componentPool.createPool('AngleMovement', require('movement-angle'));
			this.componentPool.createPool('FollowWayPoints', require('follow-way-points'));
			this.componentPool.createPool('DestroyExplosions', require('destroy-explosions'));
			this.componentPool.createPool('DestroyOnHpDepleted', require('destroy-on-hp-depleted'));

			this.componentPool.createConfiguration("EnemyShipCircleCollider", commonBundle.getCircleColliderPoolId())
				.args({
					id: 'enemyShipColliderId', 
					radius: 10
				});

			this.componentPool.createConfiguration("Activate_EnemyShip_On_View", commonBundle.getActivateOnViewPoolId());
			
			this.componentPool.createConfiguration("EnemyShipAngleMovement", "AngleMovement");
			this.componentPool.createConfiguration("EnemyShipFollowWayPoints", "FollowWayPoints");
			this.componentPool.createConfiguration("EnemyShipDestroyExplosions", "DestroyExplosions")
				.args({
					effect: explosionsBundle.getMediumExplosionsEffectId()
				});
			this.componentPool.createConfiguration("EnemyShipDestroyOnHpDepleted", "DestroyOnHpDepleted");

			this.componentPool.createConfiguration("EnemyShip_1_Renderer", commonBundle.getAnimationBitmapRendererPoolId())
				.args({
					frameWidth: 40,
					frameHeight: 32,
					frameDelay: 0.03,
					frameCount: 5,
					pingPong: true,
					offset: 'center',
					path: gb.assetMap()["ENEMYSHIP1.PNG"]
				});

			this.componentPool.createConfiguration("EnemyShip_2_Renderer", commonBundle.getAnimationBitmapRendererPoolId())
				.args({
					frameWidth: 60,
					frameHeight: 32,
					frameDelay: 0.03,
					frameCount: 6,
					pingPong: true,
					offset: 'center',
					path: gb.assetMap()["ENEMYSHIP2.PNG"]
				});

			this.gameObjectPool.createConfiguration('generator-enemy-ship-0', 'EnemyShip_1_Type')
				.args({
					hp: 3,
					speed: 120
				})
				.addComponent('EnemyShipCircleCollider')
				.addComponent('Activate_EnemyShip_On_View')
				.addComponent('EnemyShipAngleMovement')
				.addComponent('EnemyShipFollowWayPoints')
				.addComponent('EnemyShipDestroyExplosions')
				.addComponent('EnemyShipDestroyOnHpDepleted')
				.setRenderer('EnemyShip_1_Renderer')
				.childOnly();

			this.gameObjectPool.createConfiguration('generator-enemy-ship-1', 'EnemyShip_1_Type')
				.args({
					hp: 5,
					speed: 140
				})
				.addComponent('EnemyShipCircleCollider')
				.addComponent('Activate_EnemyShip_On_View')
				.addComponent('EnemyShipAngleMovement')
				.addComponent('EnemyShipFollowWayPoints')
				.addComponent('EnemyShipDestroyExplosions')
				.addComponent('EnemyShipDestroyOnHpDepleted')
				.setRenderer('EnemyShip_1_Renderer')
				.childOnly();

			this.gameObjectPool.createConfiguration('straight-line-ship-0', 'EnemyShip_2_Type')
				.args({
					hp: 3,
					speed: 120
				})
				.addComponent('EnemyShipCircleCollider')
				.addComponent('Activate_EnemyShip_On_View')
				.addComponent('EnemyShipAngleMovement')
				.addComponent('EnemyShipFollowWayPoints')
				.addComponent('EnemyShipDestroyExplosions')
				.addComponent('EnemyShipDestroyOnHpDepleted')
				.setRenderer('EnemyShip_2_Renderer')
				.enemyCategory()
				.weakEnemyTier();

			this.gameObjectPool.createConfiguration('straight-line-ship-1', 'EnemyShip_2_Type')
				.args({
					hp: 5,
					speed: 150
				})
				.addComponent('EnemyShipCircleCollider')
				.addComponent('Activate_EnemyShip_On_View')
				.addComponent('EnemyShipAngleMovement')
				.addComponent('EnemyShipFollowWayPoints')
				.addComponent('EnemyShipDestroyExplosions')
				.addComponent('EnemyShipDestroyOnHpDepleted')
				.setRenderer('EnemyShip_2_Renderer')
				.enemyCategory()
				.strongEnemyTier();
		},
	});

	return new EnemyShip();
});