define(function(require) {	
	var gameObject = require("game-object");
	var pathRenderer = require('path-renderer');
	var circleCollider = require('circle-collider');

	var reclaimer = require('reclaimer');

	var draw = require('draw');

	var Bullets = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool('circle-collider', circleCollider);
			this.componentPool.createPool('path-renderer', pathRenderer);
			
			this.gameObjectPool.createPool('Bullet', gameObject, 20);
			// this.gameObjectPool.createPool('Dummy', gameObject, 1);
			
			// this.componentPool.createConfiguration("ShipCollider", 'circle-collider')
			// 	.args({id:'shipColliderId', radius:20});

			// this.componentPool.createConfiguration("DummyCollider", 'circle-collider')
			// 	.args({id:'dummyColliderId', radius:10});
			
			this.componentPool.createConfiguration("BulletRender", 'path-renderer')
				.args({
					width: 20,
					height: 20,
					name: 'bullet',
					offset: 'center',
					drawPath: function(context) {
						context.translate(this.width/2, this.height/2);
						draw.circle(context, 0, 0, 10, "#FF0000")
					}
				});
			
			this.gameObjectPool.createConfiguration("PlayerBullet", "Bullet")
				.args({
					life: 50,

					update: function() {
						this.x += 5;

						if (this.life < 0) {
							reclaimer.claim(this, this.typeId);
						} else {
							this.life--;
						}
					}
				})
				.setRenderer("BulletRender");

			// this.gameObjectPool.createConfiguration("DummyShip", "Dummy")
			// 	.args({rotation: 90, onCollide:function(other) {

			// 	}})
			// 	.addComponent('DummyCollider')
			// 	.setRenderer("ShipRenderer");
		},
	});

	return new Bullets();
});