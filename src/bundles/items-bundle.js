define(function(require) {	
	var commonBundle = require("common-bundle");
	var gb = require("gb");

	var ItemsBundle = require("bundle").extend({
		create: function(args) {	
			this.gameObjectPool.createDynamicPool("LevelItem", require("level-item"))

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

			this.gameObjectPool.createConfiguration("level-item", "LevelItem")
				.addComponent("LevelItemCircle")
				.setRenderer("LevelItem_Renderer")
		},
	});

	return new ItemsBundle();
});