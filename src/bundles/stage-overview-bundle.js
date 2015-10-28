define(function(require) {	
	var commonBundle = require('common-bundle');
	var gb = require('gb');

	var StageOverview = require("bundle").extend({
		create: function(args) {

			this.gameObjectPool.createDynamicPool("StageFrame", require('stage-frame'));

			this.componentPool.createConfiguration("StageFrameRenderer", commonBundle.getAnimationsBitmapRendererPoolId())
				.args({
					startingLabel: 'unselected',

					frameWidth: 200,
					frameHeight: 200,
					frameDelay: 1,
					frameCount: 2,
					offset: 'center',
					path: gb.assetMap()["LEVELFRAME.PNG"],

					labels: {
						'selected': {
							frames: [0]
						},
						'unselected': {
							frames: [1]
						}
					}
				});


			this.componentPool.createPool("MarkerArrowRenderer", require('arrow-renderer'));			
			this.gameObjectPool.createDynamicPool("StageOverview", require('stage-overview-animation'));

			this.componentPool.createConfiguration("TextRenderer", commonBundle.getTextRendererPoolId());
			this.componentPool.createConfiguration("MarkerArrowRenderer", "MarkerArrowRenderer");
			
			this.gameObjectPool.createConfiguration("StageFrame", "StageFrame")
				.setRenderer("StageFrameRenderer")

			this.gameObjectPool.createConfiguration("MarkerArrow", commonBundle.getGameObjectPoolId())
				.setRenderer("MarkerArrowRenderer")

			this.gameObjectPool.createConfiguration("StageOverviewTitle", commonBundle.getGameObjectPoolId())
				.setRenderer("TextRenderer", {
					name: 'stage-overview-title',
					text: 'Choose a Maze',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 3,
					size: 80,
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("Back", commonBundle.getGameObjectContainerPoolId())
				.addChild("MarkerArrow", { rotation: 90,  x: 100, y: 0 })
				.addChild("MarkerArrow", { rotation: 270, x: -100, y: 0 })
				.setRenderer("TextRenderer", {
					name: 'back-button',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					text: 'Back',
					font: 'Russo One',
					padding: 3,
					size: 55,
					offset: 'center'
				});

			// this.gameObjectPool.createConfiguration("Start", commonBundle.getGameObjectContainerPoolId())
			// 	.addChild("MarkerArrow", { rotation: 90,  x: 100, y: 0 })
			// 	.addChild("MarkerArrow", { rotation: 270, x: -100, y: 0 })
			// 	.setRenderer("TextRenderer", {
			// 		name: 'start-button',
			// 		fillColor: "none",
			// 		strokeColor: "#FFFFFF",
			// 		text: 'Start',
			// 		font: 'Russo One',
			// 		padding: 3,
			// 		size: 55,
			// 		offset: 'center'
			// 	});

			this.gameObjectPool.createConfiguration("StageOverview", 'StageOverview');
		}
	});

	return new StageOverview();
});