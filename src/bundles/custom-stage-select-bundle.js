define(function(require) {	
	var commonBundle = require('common-bundle');

	var CustomStageSelect = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool("MarkerArrowRenderer", require('arrow-renderer'));
			this.componentPool.createPool("CustomStagesMenuRenderer", require('custom-stages-menu-renderer'));
			this.componentPool.createPool('ShipRenderer', require('ship-renderer'));

			this.gameObjectPool.createDynamicPool("CustomStageSelect", require('custom-stage-select-animation'));
			this.componentPool.createConfiguration("TextRenderer", commonBundle.getTextRendererPoolId());
			this.componentPool.createConfiguration("StageNameRenderer", commonBundle.getTextRendererPoolId())
				.args({
					fillColor: "none",
					text: '',
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 3,
					size: 20
				});

			this.componentPool.createConfiguration("MarkerArrowRenderer", "MarkerArrowRenderer");
			this.componentPool.createConfiguration("ShipRenderer", "ShipRenderer");
			this.componentPool.createConfiguration("CustomStagesMenuRenderer", "CustomStagesMenuRenderer");

			this.gameObjectPool.createConfiguration("CurrentStageMarker", commonBundle.getGameObjectPoolId())
				.args({ rotation: 90 }) 
				.setRenderer("ShipRenderer")

			this.gameObjectPool.createConfiguration("StageName1", commonBundle.getGameObjectPoolId())
				.setRenderer("StageNameRenderer", { name: 'stage-name-1' });
			this.gameObjectPool.createConfiguration("StageName2", commonBundle.getGameObjectPoolId())
				.setRenderer("StageNameRenderer", { name: 'stage-name-2' });
			this.gameObjectPool.createConfiguration("StageName3", commonBundle.getGameObjectPoolId())
				.setRenderer("StageNameRenderer", { name: 'stage-name-3' });
			this.gameObjectPool.createConfiguration("StageName4", commonBundle.getGameObjectPoolId())
				.setRenderer("StageNameRenderer", { name: 'stage-name-4' });

			this.gameObjectPool.createConfiguration("CustomStagesMenu", commonBundle.getGameObjectContainerPoolId())
				.addChild("CurrentStageMarker", { x: 50/2, y: (45*1) - 22.5 })
				.addChild("CurrentStageMarker", { x: 50/2, y: (45*2) - 22.5 })
				.addChild("CurrentStageMarker", { x: 50/2, y: (45*3) - 22.5 })
				.addChild("CurrentStageMarker", { x: 50/2, y: (45*4) - 22.5 })
				.addChild("StageName1", { x: 60, y: (45*1) - (45*2)/3 - 3 })
				.addChild("StageName2", { x: 60, y: (45*2) - (45*2)/3 - 3 })
				.addChild("StageName3", { x: 60, y: (45*3) - (45*2)/3 - 3 })
				.addChild("StageName4", { x: 60, y: (45*4) - (45*2)/3 - 3 })
				.setRenderer("CustomStagesMenuRenderer")

			this.gameObjectPool.createConfiguration("MarkerArrow", commonBundle.getGameObjectPoolId())
				.setRenderer("MarkerArrowRenderer")

			this.gameObjectPool.createConfiguration("CustomStages", commonBundle.getGameObjectPoolId())
				.setRenderer("TextRenderer", {
					name: 'custom-stages-title',
					text: 'Custom Stages',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 3,
					size: 40,
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("Back", commonBundle.getGameObjectContainerPoolId())
				.addChild("MarkerArrow", { rotation: 90,  x: 80, y: 0 })
				.addChild("MarkerArrow", { rotation: 270, x: -80, y: 0 })
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
				.addChild("MarkerArrow", { rotation: 90,  x: 80, y: 0 })
				.addChild("MarkerArrow", { rotation: 270, x: -80, y: 0 })
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

			this.gameObjectPool.createConfiguration("CustomStageSelect", 'CustomStageSelect');
		}
	});

	return new CustomStageSelect();
});