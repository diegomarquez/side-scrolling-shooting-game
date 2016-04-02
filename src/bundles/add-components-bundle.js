define(function(require) {	
	
	var commonBundle = require("common-bundle");

	var AddComponentsBundle = require("bundle").extend({
		create: function(args) {			
			
			this.componentPool.createConfiguration("BossTwitch", commonBundle.getTwitchPoolId());

			this.componentPool.createConfiguration("AddBossTwitchOnDestroy", commonBundle.getAddComponentPoolId())
				.args({
					componentId: 'BossTwitch',
					parentEvent: 'destroyed',
					executeOnce: true,
					componentArgs: {
						amount: 5
					}
				});
		}
	});

	return new AddComponentsBundle();
});