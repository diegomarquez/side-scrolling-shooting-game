define(function(require) {	
	var commonBundle = require('common-bundle');
	var gb = require('gb');
	var explosionsBundle = require('explosion-generator-bundle');

	var EnemyShip = require("bundle").extend({
		create: function(args) {			
			
			this.gameObjectPool.createDynamicPool('EnemyShip_1_Type', require('enemy-ship-1'));

			this.componentPool.createPool('AngleMovement', require('movement-angle'));
			this.componentPool.createPool('DestroyExplosions', require('destroy-explosions'));
			this.componentPool.createPool('DestroyOnHpDepleted', require('destroy-on-hp-depleted'));

			this.componentPool.createConfiguration("EnemyShipCircleCollider", commonBundle.getCircleColliderPoolId())
				.args({
					id: 'enemyShipColliderId', 
					radius: 10
				});

			this.componentPool.createConfiguration("Activate_EnemyShip_On_View", commonBundle.getActivateOnViewPoolId());
			
			this.componentPool.createConfiguration("EnemyShipAngleMovement", "AngleMovement");
			this.componentPool.createConfiguration("EnemyShipDestroyExplosions", "DestroyExplosions")
				.args({
					effect: explosionsBundle.getMediumExplosionsEffectId()
				});
			this.componentPool.createConfiguration("EnemyShipDestroyOnHpDepleted", "DestroyOnHpDepleted");
			
			this.componentPool.createConfiguration("EnemyShipRenderer", commonBundle.getAnimationBitmapRendererPoolId())
				.args({
					frameWidth: 40,
					frameHeight: 32,
					frameDelay: 0.05,
					frameCount: 5,
					pingPong: true,
					offset: 'center',
					path: gb.assetMap()["ENEMYSHIP1.PNG"]
				});

			this.gameObjectPool.createConfiguration('generator-enemy-ship-0-short', 'EnemyShip_1_Type')
				.args({
					hp: 3,
					moveTime: 1000,
					speed: 120
				})
				.addComponent('EnemyShipCircleCollider')
				.addComponent('Activate_EnemyShip_On_View')
				.addComponent('EnemyShipAngleMovement')
				.addComponent('EnemyShipDestroyExplosions')
				.addComponent('EnemyShipDestroyOnHpDepleted')
				.setRenderer('EnemyShipRenderer')
				.childOnly()

			this.gameObjectPool.createConfiguration('generator-enemy-ship-0-long', 'EnemyShip_1_Type')
				.args({
					hp: 3,
					moveTime: 1200,
					speed: 120
				})
				.addComponent('EnemyShipCircleCollider')
				.addComponent('Activate_EnemyShip_On_View')
				.addComponent('EnemyShipAngleMovement')
				.addComponent('EnemyShipDestroyExplosions')
				.addComponent('EnemyShipDestroyOnHpDepleted')
				.setRenderer('EnemyShipRenderer')
				.childOnly()

			this.gameObjectPool.createConfiguration('generator-enemy-ship-1-short', 'EnemyShip_1_Type')
				.args({
					hp: 5,
					moveTime: 700,
					speed: 140
				})
				.addComponent('EnemyShipCircleCollider')
				.addComponent('Activate_EnemyShip_On_View')
				.addComponent('EnemyShipAngleMovement')
				.addComponent('EnemyShipDestroyExplosions')
				.addComponent('EnemyShipDestroyOnHpDepleted')
				.setRenderer('EnemyShipRenderer')
				.childOnly()

			this.gameObjectPool.createConfiguration('generator-enemy-ship-1-long', 'EnemyShip_1_Type')
				.args({
					hp: 5,
					moveTime: 900,
					speed: 140
				})
				.addComponent('EnemyShipCircleCollider')
				.addComponent('Activate_EnemyShip_On_View')
				.addComponent('EnemyShipAngleMovement')
				.addComponent('EnemyShipDestroyExplosions')
				.addComponent('EnemyShipDestroyOnHpDepleted')
				.setRenderer('EnemyShipRenderer')
				.childOnly()

		},
	});

	return new EnemyShip();
});