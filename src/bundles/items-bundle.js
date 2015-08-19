define(function(require) {	
	var commonBundle = require("common-bundle");
	var gb = require("gb");

	var ItemsBundle = require("bundle").extend({
		create: function(args) {	
			this.gameObjectPool.createDynamicPool("LevelItem", require("level-item"));
			this.gameObjectPool.createDynamicPool("PowerUpItem", require("power-up-item"));

			this.componentPool.createConfiguration("LevelItemCircle", commonBundle.getCircleColliderPoolId())
				.args({
					id:'levelItemColliderId', 
					radius:20
				});

			this.componentPool.createConfiguration("LevelItem_Renderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BALL.PNG"],
					offset: 'center',
				});

			this.componentPool.createConfiguration("PowerUp_Renderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["POWERUP.PNG"],
					offset: 'center',
				});

			this.componentPool.createConfiguration("SpeedUp_Renderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["SPEEDUP.PNG"],
					offset: 'center',
				});

			this.componentPool.createConfiguration("HealthUp_Renderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["HEALTHUP.PNG"],
					offset: 'center',
				});

			this.gameObjectPool.createConfiguration("level-item", "LevelItem")
				.addComponent("LevelItemCircle")
				.setRenderer("LevelItem_Renderer")

			this.gameObjectPool.createConfiguration("power-up-item", "PowerUpItem")
				.args({
					powerUpType: 'power-up'
				})
				.addComponent("LevelItemCircle")
				.setRenderer("PowerUp_Renderer")

			this.gameObjectPool.createConfiguration("speed-up-item", "PowerUpItem")
				.args({
					powerUpType: 'speed-up'
				})
				.addComponent("LevelItemCircle")
				.setRenderer("SpeedUp_Renderer")

			this.gameObjectPool.createConfiguration("health-up-item", "PowerUpItem")
				.args({
					powerUpType: 'health-up'
				})
				.addComponent("LevelItemCircle")
				.setRenderer("HealthUp_Renderer")
		},
	});

	return new ItemsBundle();
});