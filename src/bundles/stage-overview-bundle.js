define(function(require) {	
	var commonBundle = require('common-bundle');

	var StageOverview = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool("MarkerArrowRenderer", require('arrow-renderer'));
			this.componentPool.createPool("StageMarkerArrowRenderer", require('stage-arrow-renderer'));
			this.componentPool.createPool('ShipRenderer', require('ship-renderer'));

			this.gameObjectPool.createDynamicPool("StageOverview", require('stage-overview-animation'));

			this.componentPool.createConfiguration("TextRenderer", commonBundle.getTextRendererPoolId());
			this.componentPool.createConfiguration("ArrowRenderer", "ArrowRenderer");
			this.componentPool.createConfiguration("MarkerArrowRenderer", "MarkerArrowRenderer");
			this.componentPool.createConfiguration("StageMarkerArrowRenderer", "StageMarkerArrowRenderer");
			this.componentPool.createConfiguration("ShipRenderer", "ShipRenderer");

			this.gameObjectPool.createConfiguration("PlayerMarker", commonBundle.getGameObjectPoolId())
				.args({ rotation: 90 }) 
				.setRenderer("ShipRenderer")

			this.gameObjectPool.createConfiguration("MarkerArrow", commonBundle.getGameObjectPoolId())
				.setRenderer("MarkerArrowRenderer")

			this.gameObjectPool.createConfiguration("StageMarkerArrow", commonBundle.getGameObjectPoolId())
				.setRenderer("StageMarkerArrowRenderer")

			this.gameObjectPool.createConfiguration("StageMarker1", commonBundle.getGameObjectPoolId())
				.setRenderer("TextRenderer", {
					name: 'stage-marker-1',
					text: 'St .1',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 5,
					size: 35,
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("StageMarker2", commonBundle.getGameObjectPoolId())
				.setRenderer("TextRenderer", {
					name: 'stage-marker-2',
					text: 'St .2',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 5,
					size: 35,
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("StageMarker3", commonBundle.getGameObjectPoolId())
				.setRenderer("TextRenderer", {
					name: 'stage-marker-3',
					text: 'St .3',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 5,
					size: 35,
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("StageProgress", commonBundle.getGameObjectContainerPoolId())
				.addChild("StageMarker1", { x: -25, y: 0 })
				.addChild("StageMarkerArrow", { x: 40, y: 0 })
				.addChild("StageMarker2", { x: 110, y: 0 })
				.addChild("StageMarkerArrow", { x: 180, y: 0 })
				.addChild("StageMarker3", { x: 250, y: 0 })

			this.gameObjectPool.createConfiguration("Stages", commonBundle.getGameObjectPoolId())
				.setRenderer("TextRenderer", {
					name: 'stage-overview-title',
					text: 'Stages',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 3,
					size: 55,
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("Back", commonBundle.getGameObjectContainerPoolId())
				.addChild("MarkerArrow", { rotation: 90,  x: 70, y: 0 })
				.addChild("MarkerArrow", { rotation: 270, x: -70, y: 0 })
				.setRenderer("TextRenderer", {
					name: 'back-button',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					text: 'Back',
					font: 'Russo One',
					padding: 3,
					size: 45,
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("Start", commonBundle.getGameObjectContainerPoolId())
				.addChild("MarkerArrow", { rotation: 90,  x: 70, y: 0 })
				.addChild("MarkerArrow", { rotation: 270, x: -70, y: 0 })
				.setRenderer("TextRenderer", {
					name: 'start-button',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					text: 'Start',
					font: 'Russo One',
					padding: 3,
					size: 45,
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("StageOverview", 'StageOverview');
		}
	});

	return new StageOverview();
});