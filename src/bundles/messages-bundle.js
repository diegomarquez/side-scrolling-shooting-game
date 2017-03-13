define(function(require) {	
	var commonBundle = require('common-bundle');
	var gb = require('gb');

	var MessagesBundle = require("bundle").extend({
		create: function(args) {
			this.gameObjectPool.createDynamicPool("SideMessageAnimation", require('side-message-animation'));

			this.componentPool.createConfiguration("StartMessageRenderer", commonBundle.getTextRendererPoolId())
				.args({
					name: 'start-message',
					text: 'Get Ready',
					fillColor: "#ec751e",
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 3,
					lineWidth: 2,
					size: 55,
					offset: 'center'
				});

			this.componentPool.createConfiguration("WarningMessageRenderer", commonBundle.getTextRendererPoolId())
				.args({
					name: 'warning-message',
					text: 'Warning',
					fillColor: "#ec751e",
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 3,
					lineWidth: 2,
					size: 55,
					offset: 'center'
				});

			this.componentPool.createConfiguration("CompleteMessageRenderer", commonBundle.getTextRendererPoolId())
				.args({
					name: 'complete-message',
					text: 'Complete!',
					fillColor: "#ec751e",
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 3,
					lineWidth: 2,
					size: 55,
					offset: 'center'
				});

			this.componentPool.createConfiguration("FailureMessageRenderer", commonBundle.getTextRendererPoolId())
				.args({
					name: 'failure-message',
					text: 'Failure!',
					fillColor: "#ec751e",
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 3,
					lineWidth: 2,
					size: 55,
					offset: 'center'
				});

			this.componentPool.createConfiguration("BGM_1_Message", commonBundle.getTextRendererPoolId())
				.args({
					name: 'bgm-1-message',
					text: '♪♫ Maze 1 - Nicole Marie T',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 3,
					lineWidth: 1,
					size: 30,
					offset: 'center'
				});

			this.componentPool.createConfiguration("BGM_2_Message", commonBundle.getTextRendererPoolId())
				.args({
					name: 'bgm-2-message',
					text: '♪♫ Maze 2 - Nicole Marie T',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 3,
					lineWidth: 1,
					size: 30,
					offset: 'center'
				});

			this.componentPool.createConfiguration("BGM_3_Message", commonBundle.getTextRendererPoolId())
				.args({
					name: 'bgm-3-message',
					text: '♪♫ Maze 3 - Nicole Marie T',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 3,
					lineWidth: 1,
					size: 30,
					offset: 'center'
				});

			this.componentPool.createConfiguration("BGM_4_Message", commonBundle.getTextRendererPoolId())
				.args({
					name: 'bgm-4-message',
					text: '♪♫ Maze 4 - Nicole Marie T',
					fillColor: "none",
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 3,
					lineWidth: 1,
					size: 30,
					offset: 'center'
				});
			
			this.gameObjectPool.createConfiguration("StartMessageText", commonBundle.getGameObjectPoolId())
				.setRenderer("StartMessageRenderer");

			this.gameObjectPool.createConfiguration("WarningMessageText", commonBundle.getGameObjectPoolId())
				.setRenderer("WarningMessageRenderer");

			this.gameObjectPool.createConfiguration("CompleteMessageText", commonBundle.getGameObjectPoolId())
				.setRenderer("CompleteMessageRenderer");

			this.gameObjectPool.createConfiguration("FailureMessageText", commonBundle.getGameObjectPoolId())
				.setRenderer("FailureMessageRenderer");

			this.gameObjectPool.createConfiguration("BGM1MessageText", commonBundle.getGameObjectPoolId())
				.setRenderer("BGM_1_Message");

			this.gameObjectPool.createConfiguration("BGM2MessageText", commonBundle.getGameObjectPoolId())
				.setRenderer("BGM_2_Message");

			this.gameObjectPool.createConfiguration("BGM3MessageText", commonBundle.getGameObjectPoolId())
				.setRenderer("BGM_3_Message");

			this.gameObjectPool.createConfiguration("BGM4MessageText", commonBundle.getGameObjectPoolId())
				.setRenderer("BGM_4_Message");

			this.gameObjectPool.createConfiguration("StartMessage", 'SideMessageAnimation')
				.args({
					textGameObject: "StartMessageText"
				});

			this.gameObjectPool.createConfiguration("WarningMessage", 'SideMessageAnimation')
				.args({
					textGameObject: "WarningMessageText"
				});

			this.gameObjectPool.createConfiguration("CompleteMessage", 'SideMessageAnimation')
				.args({
					textGameObject: "CompleteMessageText"
				});

			this.gameObjectPool.createConfiguration("FailureMessage", 'SideMessageAnimation')
				.args({
					textGameObject: "FailureMessageText"
				});

			this.gameObjectPool.createConfiguration("BGM1Message", 'SideMessageAnimation')
				.args({
					startX: gb.canvas.width + 300,
					startY: gb.canvas.height - 35,
					endX: gb.canvas.width - 240,
					time: 6,
					textGameObject: "BGM1MessageText",
				});

			this.gameObjectPool.createConfiguration("BGM2Message", 'SideMessageAnimation')
				.args({
					startX: gb.canvas.width + 300,
					startY: gb.canvas.height - 35,
					endX: gb.canvas.width - 240,
					time: 6,
					textGameObject: "BGM2MessageText",
				});

			this.gameObjectPool.createConfiguration("BGM3Message", 'SideMessageAnimation')
				.args({
					startX: gb.canvas.width + 300,
					startY: gb.canvas.height - 35,
					endX: gb.canvas.width - 240,
					time: 6,
					textGameObject: "BGM3MessageText",
				});

			this.gameObjectPool.createConfiguration("BGM4Message", 'SideMessageAnimation')
				.args({
					startX: gb.canvas.width + 300,
					startY: gb.canvas.height - 35,
					endX: gb.canvas.width - 240,
					time: 6,
					textGameObject: "BGM4MessageText",
				});
		},
	});

	return new MessagesBundle();
});