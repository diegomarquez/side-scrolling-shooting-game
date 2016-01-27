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

			this.componentPool.createConfiguration("StageCompleteIconRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["LEVELCOMPLETEICON.PNG"],
					offset: 'center',
				});

			this.componentPool.createConfiguration("Boss1PortraitRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSS1PORTRAIT.PNG"],
					offset: 'center',
				});

			this.componentPool.createConfiguration("Boss2PortraitRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSS2PORTRAIT.PNG"],
					offset: 'center',
				});

			this.componentPool.createConfiguration("Boss3PortraitRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSS3PORTRAIT.PNG"],
					offset: 'center',
				});

			this.componentPool.createConfiguration("Boss4PortraitRenderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSS4PORTRAIT.PNG"],
					offset: 'center',
				});

			this.gameObjectPool.createConfiguration("StageCompleteIcon", commonBundle.getGameObjectPoolId())
				.args({
					x: 70,
					y: 70
				})
				.setRenderer("StageCompleteIconRenderer");

			this.gameObjectPool.createConfiguration("Boss1Portrait", commonBundle.getGameObjectPoolId())
				.setRenderer("Boss1PortraitRenderer");
			this.gameObjectPool.createConfiguration("Boss2Portrait", commonBundle.getGameObjectPoolId())
				.setRenderer("Boss2PortraitRenderer");
			this.gameObjectPool.createConfiguration("Boss3Portrait", commonBundle.getGameObjectPoolId())
				.setRenderer("Boss3PortraitRenderer");
			this.gameObjectPool.createConfiguration("Boss4Portrait", commonBundle.getGameObjectPoolId())
				.setRenderer("Boss4PortraitRenderer");

			this.componentPool.createPool("MarkerArrowRenderer", require('arrow-renderer'));			
			this.gameObjectPool.createDynamicPool("StageOverview", require('stage-overview-animation'));

			this.componentPool.createConfiguration("TextRenderer", commonBundle.getTextRendererPoolId());
			this.componentPool.createConfiguration("MarkerArrowRenderer", "MarkerArrowRenderer");
			
			this.gameObjectPool.createConfiguration("Stage1Frame", "StageFrame")
				.addChild('Boss1Portrait')
				.addChild("StageCompleteIcon")
				.setRenderer("StageFrameRenderer")

			this.gameObjectPool.createConfiguration("Stage2Frame", "StageFrame")
				.addChild('Boss2Portrait')
				.addChild("StageCompleteIcon")
				.setRenderer("StageFrameRenderer")

			this.gameObjectPool.createConfiguration("Stage3Frame", "StageFrame")
				.addChild('Boss3Portrait')
				.addChild("StageCompleteIcon")
				.setRenderer("StageFrameRenderer")

			this.gameObjectPool.createConfiguration("Stage4Frame", "StageFrame")
				.addChild('Boss4Portrait')
				.addChild("StageCompleteIcon")
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

			this.gameObjectPool.createConfiguration("StageOverview", 'StageOverview');
		}
	});

	return new StageOverview();
});