define(function(require) {	
	var commonBundle = require('common-bundle');

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
			
			this.gameObjectPool.createConfiguration("StartMessageText", commonBundle.getGameObjectPoolId())
				.setRenderer("StartMessageRenderer");

			this.gameObjectPool.createConfiguration("WarningMessageText", commonBundle.getGameObjectPoolId())
				.setRenderer("WarningMessageRenderer");

			this.gameObjectPool.createConfiguration("CompleteMessageText", commonBundle.getGameObjectPoolId())
				.setRenderer("CompleteMessageRenderer");

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
		},
	});

	return new MessagesBundle();
});