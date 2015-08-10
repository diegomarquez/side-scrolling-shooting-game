define(function(require) {	
	var commonBundle = require('common-bundle');

	var ShipBundle = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool('ship-renderer', require("ship-renderer"));
			this.componentPool.createPool('exhaust-renderer', require("exhaust-renderer"));

			this.gameObjectPool.createDynamicPool('Ship', require("player-ship"));
			this.gameObjectPool.createDynamicPool('Exhaust', require("exhaust"));

			this.componentPool.createConfiguration("ShipColliderCircle", commonBundle.getCircleColliderPoolId())
				.args({
					id:'shipColliderId', 
					radius:20
				});

			this.componentPool.createConfiguration("ShipRenderer", 'ship-renderer');
			this.componentPool.createConfiguration("ExhaustRenderer", 'exhaust-renderer');
			
			this.gameObjectPool.createConfiguration("ShootingPosition", commonBundle.getGameObjectPoolId());

			this.gameObjectPool.createConfiguration("SmallExhaust", "Exhaust")
				.setRenderer("ExhaustRenderer");

			this.gameObjectPool.createConfiguration("MediumExhaust", "Exhaust")
				.setRenderer("ExhaustRenderer");

			this.gameObjectPool.createConfiguration("player-ship", "Ship")
				.args({
					rotation: 90
				})
				.addChild('ShootingPosition', { y: -20 })
				.addChild('SmallExhaust', { x: -11, y: 21, rotation: -45, scaleX: 0.2, scaleY: 0.4 })
				.addChild('SmallExhaust', { x: 0, y: 30, rotation: -90, scaleX: 0.4, scaleY: 0.4 })
				.addChild('SmallExhaust', { x: 10, y: 20, rotation: -135, scaleX: 0.2, scaleY: 0.4 })
				.addChild('MediumExhaust', { x: -11, y: 23, rotation: -45, scaleX: 0.5, scaleY: 0.5 })
				.addChild('MediumExhaust', { x: 0, y: 35, rotation: -90, scaleX: 0.8, scaleY: 0.8 })
				.addChild('MediumExhaust', { x: 15, y: 24, rotation: -135, scaleX: 0.5, scaleY: 0.5 })		
				.addComponent('ShipColliderCircle')
				.setRenderer("ShipRenderer");
		},
	});

	return new ShipBundle();
});