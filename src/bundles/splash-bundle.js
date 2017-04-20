define(function(require) {
	var gb = require('gb');
	var commonBundle = require('common-bundle');

	var Splash = require("bundle").extend({
		create: function(args) {
			this.componentPool.createPool("MarkerArrowRenderer", require('arrow-renderer'));

			this.gameObjectPool.createDynamicPool("Title", require('splash-title-animation'));

			this.componentPool.createConfiguration("TextRenderer", commonBundle.getTextRendererPoolId());
			this.componentPool.createConfiguration("ArrowRenderer", "ArrowRenderer");
			this.componentPool.createConfiguration("MarkerArrowRenderer", "MarkerArrowRenderer");
			this.componentPool.createConfiguration("MarkerArrowRenderer", commonBundle.getGameObjectPoolId());

			this.componentPool.createConfiguration("SplashImageRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["SPLASH.PNG"],
				});

			this.gameObjectPool.createConfiguration("SplashImage", commonBundle.getGameObjectPoolId())
				.args({
					x: 0,
					y: 0
				})
				.setRenderer("SplashImageRenderer")

			this.gameObjectPool.createConfiguration("MarkerArrow", commonBundle.getGameObjectPoolId())
				.setRenderer("MarkerArrowRenderer")

			this.gameObjectPool.createConfiguration("Controls_1", commonBundle.getGameObjectPoolId())
				.setRenderer("TextRenderer", {
					name: 'splash-controls-1',
					fillColor: "none",
					strokeColor: "#ec751e",
					text: 'Press "← ↑ → ↓" to Move',
					font: 'Russo One',
					offset: 'center',
					size: 25
				});

			this.gameObjectPool.createConfiguration("Controls_2", commonBundle.getGameObjectPoolId())
				.setRenderer("TextRenderer", {
					name: 'splash-controls-2',
					fillColor: "none",
					strokeColor: "#ec751e",
					text: 'Press "A" to Shoot',
					font: 'Russo One',
					offset: 'center',
					size: 25
				});

			this.gameObjectPool.createConfiguration("Play", commonBundle.getGameObjectContainerPoolId())
				.addChild("MarkerArrow", { rotation: 90, x: 200, y: 0 })
				.addChild("MarkerArrow", { rotation: 270, x: -200, y: 0 })
				.setRenderer("TextRenderer", {
					name: 'play-button',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					text: 'Enter the Maze',
					font: 'Russo One',
					padding: 5,
					size: 45,
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("Edit", commonBundle.getGameObjectContainerPoolId())
				.addChild("MarkerArrow", { rotation: 90, x: 200, y: 0 })
				.addChild("MarkerArrow", { rotation: 270, x: -200, y: 0 })
				.setRenderer("TextRenderer", {
					name: 'edit-button',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					text: 'Make a Maze',
					font: 'Russo One',
					padding: 5,
					size: 45,
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("PlayCustom", commonBundle.getGameObjectContainerPoolId())
				.addChild("MarkerArrow", { rotation: 90, x: 200, y: 0 })
				.addChild("MarkerArrow", { rotation: 270, x: -200, y: 0 })
				.setRenderer("TextRenderer", {
					name: 'play-custom-button',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					text: 'Custom Mazes',
					font: 'Russo One',
					padding: 5,
					size: 45,
					offset: 'center'
				});
			
			this.gameObjectPool.createConfiguration("Credits_1", commonBundle.getGameObjectContainerPoolId())
				.setRenderer("TextRenderer", {
					name: 'credits-1',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					text: '  Programming: Diego E. Marquez / Music: Nicole Marie T',
					font: 'Exo',
					padding: 10,
					size: 18,
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("Title", 'Title')
				.addComponent("OptionHighlight")
				.addComponent("OptionSelect")
		},
	});

	return new Splash();
});