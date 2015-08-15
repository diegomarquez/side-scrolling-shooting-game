define(function(require) {	
	var commonBundle = require('common-bundle');
	var gb = require('gb');

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

			this.componentPool.createConfiguration("ExhaustRenderer", commonBundle.getAnimationBitmapRendererPoolId())
				.args({
					pingPong: true,
					frameWidth: 50,
					frameHeight: 30,
					frameCount: 9,
					frameDelay: 0.02,
					path: gb.assetMap()["PLAYEREXHAUST.PNG"],
					offset: 'center'
				});

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
				.addChild('ShootingPosition', { y: -35 })
				.addChild('SmallExhaust', { x: -21, y: 45, rotation: -58, scaleX: 0.6, scaleY: 0.6 })
				.addChild('SmallExhaust', { x: 0, y: 55, rotation: -90, scaleX: 0.8, scaleY: 0.8 })
				.addChild('SmallExhaust', { x: 21, y: 45, rotation: -122, scaleX: 0.6, scaleY: 0.6 })
				
				.addChild('MediumExhaust', { x: -21, y: 45, rotation: -58, scaleX: 0.7, scaleY: 0.7 })
				.addChild('MediumExhaust', { x: 0, y: 60, rotation: -90, scaleX: 1, scaleY: 1 })
				.addChild('MediumExhaust', { x: 21, y: 45, rotation: -122, scaleX: 0.7, scaleY: 0.7 })		
				.addComponent('ShipColliderCircle')
				.setRenderer("ShipRenderer");
		},
	});

	return new ShipBundle();
});