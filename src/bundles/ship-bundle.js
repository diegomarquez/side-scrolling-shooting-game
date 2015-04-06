define(function(require) {	
	var commonBundle = require('common-bundle');
	var draw = require('draw');

	var ShipBundle = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool('ship-renderer', require("ship-renderer"));

			
			this.gameObjectPool.createDynamicPool('Ship', require("player-ship"));

			this.componentPool.createConfiguration("ShipColliderCircle", commonBundle.getCircleColliderPoolId())
				.args({
					id:'shipColliderId', 
					radius:20
				});

			this.componentPool.createConfiguration("ShipRenderer", 'ship-renderer');

			this.componentPool.createConfiguration("ExhaustRenderer", commonBundle.getAnimationsPathRendererPoolId())
				.args({
					width: 70,
					height: 30,
					name: 'exhaust',
					offset: 'center',
					frameDelay: 0.1,
					framePaths: [
						function(context) {
							draw.rectangle(context, 0, 0, 70, 30, "#FF0000", null, 1);
						},
						function(context) {
							draw.rectangle(context, 0, 0, 70, 30, "#00FF00", null, 1);
						},
						function(context) {
							draw.rectangle(context, 0, 0, 70, 30, "#0000FF", null, 1);
						},
						function(context) {
							draw.rectangle(context, 0, 0, 70, 30, "#FFFFFF", null, 1);
						},
						function(context) {
							draw.rectangle(context, 0, 0, 70, 30, "#00FFFF", null, 1);
						}
					],
					startingLabel: 'threeColors',
					labels: {
						'threeColors': {
							loop: true,	
							frames: [0, 1, 2],
						},
						'twoColors': {
							frames: [3, 4],
						}
					}
				});
			
			this.gameObjectPool.createConfiguration("Exhaust", commonBundle.getGameObjectPoolId())
				.setRenderer("ExhaustRenderer");

			this.gameObjectPool.createConfiguration("player-ship", "Ship")
				.args({
					rotation: 90
				})
				.addChild('Exhaust', { x: -50, y: 0 })		
				.addComponent('ShipColliderCircle')
				.setRenderer("ShipRenderer");
		},
	});

	return new ShipBundle();
});