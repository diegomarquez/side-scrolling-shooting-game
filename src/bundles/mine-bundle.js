define(function(require) {	
	var commonBundle = require('common-bundle');
	var gb = require('gb');
	var explosionsBundle = require('explosion-generator-bundle');

	var Mine = require("bundle").extend({
		create: function(args) {			
			
			this.gameObjectPool.createDynamicPool('MineType', require('mine'));

			this.componentPool.createPool('AngleMovement', require('movement-angle'));
			this.componentPool.createPool('WobbleMovement', require('wobble'));
			this.componentPool.createPool('DestroyExplosions', require('destroy-explosions'));

			this.componentPool.createConfiguration("MineCircleCollider", commonBundle.getCircleColliderPoolId())
				.args({
					id: 'mineColliderId', 
					radius: 10
				});

			this.componentPool.createConfiguration("Activate_Mine_On_View", commonBundle.getActivateOnViewPoolId());
			this.componentPool.createConfiguration("MineAngleMovement", "AngleMovement");
			this.componentPool.createConfiguration("MineWobbleMovement", "WobbleMovement");
			this.componentPool.createConfiguration("MineDestroyExplosions", "DestroyExplosions")
				.args({
					effect: explosionsBundle.getMediumExplosionsEffectId()
				});

			this.componentPool.createConfiguration("MineRenderer", commonBundle.getAnimationBitmapRendererPoolId())
				.args({
					frameWidth: 32,
					frameHeight: 32,
					frameDelay: 0.1,
					frameCount: 5,
					pingPong: true,
					path: gb.assetMap()["MINE.PNG"]
				});

			this.gameObjectPool.createConfiguration('mine-0', 'MineType')
				.args({
					hp: 3
				})
				.addComponent('MineCircleCollider')
				.addComponent('MineWobbleMovement')
				.addComponent('Activate_Mine_On_View')
				.addComponent('MineDestroyExplosions')
				.setRenderer('MineRenderer')
				.enemyCategory()
				.weakEnemyTier();

			this.gameObjectPool.createConfiguration('mine-1', 'MineType')
				.args({
					hp: 8
				})
				.addComponent('MineCircleCollider')
				.addComponent('MineWobbleMovement')
				.addComponent('Activate_Mine_On_View')
				.addComponent('MineDestroyExplosions')
				.setRenderer('MineRenderer')
				.enemyCategory()
				.strongEnemyTier();

			this.gameObjectPool.createConfiguration('boss-mine-long', 'MineType')
				.args({
					hp: 8,
					speed: 100,
					moveTime: 2500
				})
				.addComponent('MineCircleCollider')
				.addComponent('MineAngleMovement')
				.addComponent('MineWobbleMovement')
				.addComponent('MineDestroyExplosions')
				.setRenderer('MineRenderer')
				.childOnly();

			this.gameObjectPool.createConfiguration('boss-mine-short', 'MineType')
				.args({
					hp: 8,
					speed: 50,
					moveTime: 2500
				})
				.addComponent('MineCircleCollider')
				.addComponent('MineAngleMovement')
				.addComponent('MineWobbleMovement')
				.addComponent('MineDestroyExplosions')
				.setRenderer('MineRenderer')
				.childOnly();
		},
	});

	return new Mine();
});