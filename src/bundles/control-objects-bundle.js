define(function(require) {	
	var commonBundle = require("common-bundle");

	var ControlObjectsBundle = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createConfiguration("ActivateControlOnView", commonBundle.getActivateOnViewPoolId());

			this.gameObjectPool.createDynamicPool("ScrollStopper", require('scroll-stopper'));
			this.gameObjectPool.createDynamicPool("BossWarning", require('boss-warning'));
			this.gameObjectPool.createDynamicPool("DirectionSetter", require('direction-setter'));
			this.gameObjectPool.createDynamicPool("StartPosition", require('start-position'));
			
			this.gameObjectPool.createConfiguration("ScrollStopper", "ScrollStopper")
				.addComponent("ActivateControlOnView");
			this.gameObjectPool.createConfiguration("BossWarning", "BossWarning")
				.addComponent("ActivateControlOnView");

			this.gameObjectPool.createConfiguration("DirectionRight", "DirectionSetter")
				.args({
					direction: 'right'
				})
				.addComponent("ActivateControlOnView");
			
			this.gameObjectPool.createConfiguration("DirectionUp", "DirectionSetter")
				.args({
					direction: 'up'
				})
				.addComponent("ActivateControlOnView");
			
			this.gameObjectPool.createConfiguration("DirectionLeft", "DirectionSetter")
				.args({
					direction: 'left'
				})
				.addComponent("ActivateControlOnView");
			
			this.gameObjectPool.createConfiguration("DirectionDown", "DirectionSetter")
				.args({
					direction: 'down'
				})
				.addComponent("ActivateControlOnView");

			this.gameObjectPool.createConfiguration("StartPosition", "StartPosition")
				.addComponent("ActivateControlOnView");
		}
	});

	return new ControlObjectsBundle();
});