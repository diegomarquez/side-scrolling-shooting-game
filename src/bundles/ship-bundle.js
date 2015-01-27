define(function(require) {	
	var commonBundle = require('common-bundle');

	var playerShip = require("player-ship"); 
	var shipRenderer = require("ship-renderer");

	var ShipBundle = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool('ship-renderer', shipRenderer);
			
			this.gameObjectPool.createDynamicPool('Ship', playerShip);

			this.componentPool.createConfiguration("ShipColliderCircle", commonBundle.getCircleColliderPoolId())
				.args({
					id:'shipColliderId', 
					radius:20
				});

			this.componentPool.createConfiguration("ShipRenderer", 'ship-renderer');
			
			this.gameObjectPool.createConfiguration("PlayerShipCircle", "Ship")
				.args({
					rotation: 90
				})		
				.addComponent('ShipColliderCircle')
				.setRenderer("ShipRenderer");
		},
	});

	return new ShipBundle();
});