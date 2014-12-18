define(function(require) {	
	var commonBundle = require('common-bundle');

	var playerShip = require("player-ship"); 
	var shipRenderer = require("ship-renderer");
	var vector2D = require('vector-2D');

	var ShipBundle = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool('ship-renderer', shipRenderer);
			this.gameObjectPool.createDynamicPool('Ship', playerShip);
			
			this.componentPool.createConfiguration("ShipColliderCircle", commonBundle.getCircleColliderPoolId())
				.args({
					id:'shipColliderId', 
					radius:20
				});
			
			this.componentPool.createConfiguration("ShipColliderPolygon", commonBundle.getPolygonColliderPoolId())
				.args({
					id:'shipColliderId', 
					points: [ new vector2D(-20, -20), new vector2D(20, -20), new vector2D(20, 20), new vector2D(-20, 20) ]
				});

			this.componentPool.createConfiguration("ShipColliderFixedPolygon", commonBundle.getFixedPolygonColliderPoolId())
				.args({
					id:'shipColliderId', 
					points: [ new vector2D(-20, -20), new vector2D(20, -20), new vector2D(20, 20), new vector2D(-20, 20) ]
				});
			
			this.componentPool.createConfiguration("ShipRenderer", 'ship-renderer');
			
			this.gameObjectPool.createConfiguration("PlayerShipCircle", "Ship")
				.args({
					rotation: 45
				})
				.addComponent('ShipColliderCircle')
				.setRenderer("ShipRenderer");
				
			
			this.gameObjectPool.createConfiguration("PlayerShipPolygon", "Ship")
				.args({
					rotation: 45
				})
				.addComponent('ShipColliderPolygon')
				.setRenderer("ShipRenderer");

			this.gameObjectPool.createConfiguration("PlayerShipFixedPolygon", "Ship")
				.args({
					rotation: 45
				})
				.addComponent('ShipColliderFixedPolygon')
				.setRenderer("ShipRenderer");
		},
	});

	return new ShipBundle();
});