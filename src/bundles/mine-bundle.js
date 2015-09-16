define(function(require) {	
	var commonBundle = require('common-bundle');
	var gb = require('gb');

	var Mine = require("bundle").extend({
		create: function(args) {			
			
			this.gameObjectPool.createDynamicPool('MineType', require('mine'));

			this.componentPool.createConfiguration("MineCircleCollider", commonBundle.getCircleColliderPoolId())
				.args({
					id: 'mineColliderId', 
					radius: 10
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
				.addComponent('MineCircleCollider')
				.setRenderer('MineRenderer')
				.enemyCategory()
				.weakEnemyTier();
		},
	});

	return new Mine();
});