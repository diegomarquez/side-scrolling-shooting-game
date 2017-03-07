define(function(require) {
	var commonBundle = require("common-bundle");
	var gb = require("gb");

	var ItemsBundle = require("bundle").extend({
		create: function(args) {
			this.gameObjectPool.createDynamicPool("LevelItem", require("level-item"));
			this.gameObjectPool.createDynamicPool("AllBossDefeatLevelItem", require("defeat-all-bosses-level-item"));
			this.gameObjectPool.createDynamicPool("PowerUpItem", require("power-up-item"));

			this.componentPool.createConfiguration("LevelItemCircle", commonBundle.getCircleColliderPoolId())
				.args({
					id:'levelItemColliderId',
					radius:20
				});

			this.componentPool.createConfiguration("LevelItem_Renderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["STAR.PNG"],
					offset: 'center',
				});

			this.componentPool.createConfiguration("LevelItem_2_Renderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["MOON.PNG"],
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
				.addComponent("LevelItemStopCurrentBGM")
				.addComponent("WinSound")
				.setRenderer("LevelItem_Renderer")
				.itemCategory();

			this.gameObjectPool.createConfiguration("defeat-all-bosses-level-item", "AllBossDefeatLevelItem")
				.addComponent("LevelItemCircle")
				.addComponent("LevelItemStopCurrentBGM")
				.addComponent("WinSound")
				.setRenderer("LevelItem_2_Renderer")
				.itemCategory();

			this.gameObjectPool.createConfiguration("power-up-item", "PowerUpItem")
				.args({
					powerUpType: 'power-up'
				})
				.addComponent("LevelItemCircle")
				.addComponent("PowerUp1")
				.setRenderer("PowerUp_Renderer")
				.itemCategory();

			this.gameObjectPool.createConfiguration("speed-up-item", "PowerUpItem")
				.args({
					powerUpType: 'speed-up'
				})
				.addComponent("LevelItemCircle")
				.addComponent("PowerUp1")
				.setRenderer("SpeedUp_Renderer")
				.itemCategory();

			this.gameObjectPool.createConfiguration("health-up-item", "PowerUpItem")
				.args({
					powerUpType: 'health-up'
				})
				.addComponent("LevelItemCircle")
				.addComponent("PowerUp1")
				.setRenderer("HealthUp_Renderer")
				.itemCategory();
		},
	});

	return new ItemsBundle();
});