define(function(require) {	
	var commonBundle = require('common-bundle');

	var StageOverview = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool("MarkerArrowRenderer", require('arrow-renderer'));

			this.gameObjectPool.createDynamicPool("StageOverview", require('stage-overview-animation'));

			this.componentPool.createConfiguration("TextRenderer", commonBundle.getTextRendererPoolId());
			this.componentPool.createConfiguration("ArrowRenderer", "ArrowRenderer");
			this.componentPool.createConfiguration("MarkerArrowRenderer", "MarkerArrowRenderer");

			this.gameObjectPool.createConfiguration("MarkerArrow", commonBundle.getGameObjectPoolId())
				.setRenderer("MarkerArrowRenderer")

			this.gameObjectPool.createConfiguration("Stages", commonBundle.getGameObjectPoolId())
				.setRenderer("TextRenderer", {
					name: 'stage-overview-title',
					text: 'Stages',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 3,
					size: 55
				});

			this.gameObjectPool.createConfiguration("Back", commonBundle.getGameObjectContainerPoolId())
				.addChild("MarkerArrow", { rotation: 0,   x: 0, y: -30 })
				.addChild("MarkerArrow", { rotation: 90,  x: 70, y: 0 })
				.addChild("MarkerArrow", { rotation: 180, x: 0, y: 30 })
				.addChild("MarkerArrow", { rotation: 270, x: -70, y: 0 })
				.setRenderer("TextRenderer", {
					name: 'back-button',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					text: 'Back',
					font: 'Russo One',
					size: 45,
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("Start", commonBundle.getGameObjectContainerPoolId())
				.addChild("MarkerArrow", { rotation: 0,   x: 0, y: -30 })
				.addChild("MarkerArrow", { rotation: 90,  x: 70, y: 0 })
				.addChild("MarkerArrow", { rotation: 180, x: 0, y: 30 })
				.addChild("MarkerArrow", { rotation: 270, x: -70, y: 0 })
				.setRenderer("TextRenderer", {
					name: 'start-button',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					text: 'Start',
					font: 'Russo One',
					size: 45,
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("StageOverview", 'StageOverview');
		}
	});

	return new StageOverview();
});