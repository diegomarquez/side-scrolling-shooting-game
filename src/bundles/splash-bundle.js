define(function(require) {	
	var commonBundle = require('common-bundle');

	var Splash = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool("ArrowRenderer", require('loop-arrow-renderer'));
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
					text: 'Fly',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 3,
					size: 55
				});

			this.gameObjectPool.createConfiguration("Shoot", commonBundle.getGameObjectPoolId())
				.setRenderer("TextRenderer", {
					name: 'splash-line-2',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					text: 'Shoot',
					font: 'Russo One',
					size: 55
				});

			this.gameObjectPool.createConfiguration("Die", commonBundle.getGameObjectPoolId())
				.setRenderer("TextRenderer", {
					name: 'splash-line-3',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					text: 'Die',
					font: 'Russo One',
					size: 55
				});

			this.gameObjectPool.createConfiguration("Play", commonBundle.getGameObjectContainerPoolId())
				.addChild("MarkerArrow", { rotation: 90,  x: 70, y: 0 })
				.addChild("MarkerArrow", { rotation: 270, x: -70, y: 0 })
				.setRenderer("TextRenderer", {
					name: 'play-button',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					text: 'Play',
					font: 'Russo One',
					padding: 5,
					size: 25,
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("Edit", commonBundle.getGameObjectContainerPoolId())
				.addChild("MarkerArrow", { rotation: 90,  x: 70, y: 0 })
				.addChild("MarkerArrow", { rotation: 270, x: -70, y: 0 })
				.setRenderer("TextRenderer", {
					name: 'edit-button',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					text: 'Edit',
					font: 'Russo One',
					padding: 5,
					size: 25,
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("PlayCustom", commonBundle.getGameObjectContainerPoolId())
				.addChild("MarkerArrow", { rotation: 90,  x: 120, y: 0 })
				.addChild("MarkerArrow", { rotation: 270, x: -120, y: 0 })
				.setRenderer("TextRenderer", {
					name: 'play-custom-button',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					text: 'Play Custom',
					font: 'Russo One',
					padding: 5,
					size: 25,
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("LoopArrow", commonBundle.getGameObjectPoolId())
				.setRenderer("ArrowRenderer");

			this.gameObjectPool.createConfiguration("Title", 'Title');
		},
	});

	return new Splash();
});