define(function(require) {	
	var commonBundle = require('common-bundle');

	var Splash = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool("MarkerArrowRenderer", require('arrow-renderer'));

			this.gameObjectPool.createDynamicPool("Title", require('splash-title-animation'));

			this.componentPool.createConfiguration("TextRenderer", commonBundle.getTextRendererPoolId());
			this.componentPool.createConfiguration("ArrowRenderer", "ArrowRenderer");
			this.componentPool.createConfiguration("MarkerArrowRenderer", "MarkerArrowRenderer");

			this.gameObjectPool.createConfiguration("MarkerArrow", commonBundle.getGameObjectPoolId())
				.setRenderer("MarkerArrowRenderer")

			this.gameObjectPool.createConfiguration("Fly", commonBundle.getGameObjectPoolId())
				.setRenderer("TextRenderer", {
					name: 'splash-line-1',
					text: 'Enter the ...',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 3,
					size: 30
				});

			this.gameObjectPool.createConfiguration("Shoot", commonBundle.getGameObjectPoolId())
				.setRenderer("TextRenderer", {
					name: 'splash-line-2',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					text: 'Space Maze',
					font: 'Russo One',
					offset: 'center',
					size: 120
				});

			this.gameObjectPool.createConfiguration("Play", commonBundle.getGameObjectContainerPoolId())
				.addChild("MarkerArrow", { rotation: 90,  x: 200, y: 0 })
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
				.addChild("MarkerArrow", { rotation: 90,  x: 200, y: 0 })
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
				.addChild("MarkerArrow", { rotation: 90,  x: 200, y: 0 })
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

			this.gameObjectPool.createConfiguration("Title", 'Title');
		},
	});

	return new Splash();
});