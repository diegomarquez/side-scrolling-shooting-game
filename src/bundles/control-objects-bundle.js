define(function(require) {	
	var ControlObjectsBundle = require("bundle").extend({
		create: function(args) {	
			this.gameObjectPool.createDynamicPool("ScrollStopper", require('scroll-stopper'));
			this.gameObjectPool.createConfiguration("ScrollStopper", 'ScrollStopper');

			this.gameObjectPool.createDynamicPool("BossWarning", require('boss-warning'));
			this.gameObjectPool.createConfiguration("BossWarning", 'BossWarning');
		},
	});

	return new ControlObjectsBundle();
});