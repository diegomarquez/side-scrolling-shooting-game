define(function(require) {	
	var commonBundle = require('common-bundle');

	var StartMessageBundle = require("bundle").extend({
		create: function(args) {	
			this.gameObjectPool.createDynamicPool("StartMessage", require('start-message-animation'));

			this.componentPool.createConfiguration("StartMessageRenderer", commonBundle.getTextRendererPoolId())
				.args({
					name: 'start-message',
					text: 'Get Ready',
					fillColor: "#FF0000",
					strokeColor: "#FFFFFF",
					font: 'Russo One',
					padding: 3,
					lineWidth: 2,
					size: 55,
					offset: 'center'
				});
			
			this.gameObjectPool.createConfiguration("StartMessageText", commonBundle.getGameObjectPoolId())
				.setRenderer("StartMessageRenderer");

			this.gameObjectPool.createConfiguration("StartMessage", 'StartMessage');
		},
	});

	return new StartMessageBundle();
});