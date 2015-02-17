define(function(require) {	
	var commonBundle = require("common-bundle");

	var ControlObjectsBundle = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createConfiguration("ActivateControlOnView", commonBundle.getActivateOnViewPoolId());

			this.gameObjectPool.createDynamicPool("ScrollStopper", require('scroll-stopper'));
			this.gameObjectPool.createDynamicPool("BossWarning", require('boss-warning'));
			
			this.gameObjectPool.createConfiguration("ScrollStopper", 'ScrollStopper')
				.addComponent("ActivateControlOnView");
			this.gameObjectPool.createConfiguration("BossWarning", 'BossWarning')
				.addComponent("ActivateControlOnView");
		},
	});

	return new ControlObjectsBundle();
});