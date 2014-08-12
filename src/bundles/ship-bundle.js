define(function(require) {	
	var playerShip = require("player-ship"); 
	var shipRenderer = require("ship-renderer");
	var circleCollider = require('circle-collider');

	var ShipBundle = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool('circle-collider', circleCollider);
			this.componentPool.createPool('ship-renderer', shipRenderer);
			
			this.gameObjectPool.createPool('Ship', playerShip, 1);
			
			this.componentPool.createConfiguration("ShipCollider", 'circle-collider')
				.args({id:'shipColliderId', radius:20});
			
			this.componentPool.createConfiguration("ShipRenderer", 'ship-renderer');
			
			this.gameObjectPool.createConfiguration("PlayerShip", "Ship")
				.args({rotation: 90})
				.addComponent('ShipCollider')
				.setRenderer("ShipRenderer");
		},
	});

	return new ShipBundle();
});