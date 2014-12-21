define(function(require) {	
	var commonBundle = require('common-bundle');

	var playerShip = require("player-ship"); 
	var playerShipOption = require("player-ship-option");
	var shipRenderer = require("ship-renderer");
	var shipOptionRenderer = require("ship-option-renderer");

	var ShipBundle = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool('ship-renderer', shipRenderer);
			this.componentPool.createPool('ship-option-renderer', shipOptionRenderer);
			
			this.gameObjectPool.createDynamicPool('Ship', playerShip);
			this.gameObjectPool.createDynamicPool('ShipOption', playerShipOption);

			this.componentPool.createConfiguration("ShipColliderCircle", commonBundle.getCircleColliderPoolId())
				.args({
					id:'shipColliderId', 
					radius:20
				});

			this.componentPool.createConfiguration("OptionColliderCircle", commonBundle.getCircleColliderPoolId())
				.args({
					id:'optionColliderId', 
					radius:10
				});
			
			this.componentPool.createConfiguration("ShipColliderPolygon", commonBundle.getPolygonColliderPoolId())
				.args({
					id:'shipColliderId', 
					points: [ {x:-20, y:-20}, {x:20, y:-20}, {x:20, y:20}, {x:-20, y:20} ]
				});

			this.componentPool.createConfiguration("ShipColliderFixedPolygon", commonBundle.getFixedPolygonColliderPoolId())
				.args({
					id:'shipColliderId', 
					points: [ {x:-20, y:-20}, {x:20, y:-20}, {x:20, y:20}, {x:-20, y:20} ]
				});
			
			this.componentPool.createConfiguration("ShipRenderer", 'ship-renderer');
			this.componentPool.createConfiguration("ShipOptionRenderer", 'ship-option-renderer');
			
			this.gameObjectPool.createConfiguration("PlayerShipOption", "ShipOption")
				.addComponent("OptionColliderCircle")
				.setRenderer("ShipOptionRenderer");

			this.gameObjectPool.createConfiguration("PlayerShipCircle", "Ship")
				.args({
					rotation: 45
				})
				.addChild('PlayerShipOption', {x: -50, y:-50})
				.addChild('PlayerShipOption', {x: 50, y:-50})
				.addChild('PlayerShipOption', {x: 50, y:50})
				.addChild('PlayerShipOption', {x: -50, y:50})
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