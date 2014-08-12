define(function(require) {	
	var basicBullet = require("basic-bullet");
	var basicBulletRenderer = require('basic-bullet-renderer');
	var circleCollider = require('circle-collider');

	var reclaimer = require('reclaimer');

	var draw = require('draw');

	var Bullets = require("bundle").extend({
		create: function(args) {	
			this.componentPool.createPool('circle-collider', circleCollider);
			this.componentPool.createPool('basic-bullet-renderer', basicBulletRenderer);
			
			this.gameObjectPool.createPool('Bullet', basicBullet, 20);
			
			// this.componentPool.createConfiguration("BulletCollider", 'circle-collider')
			// 	.args({id:'shipColliderId', radius:20});
			
			this.componentPool.createConfiguration("BulletRender", 'basic-bullet-renderer')
			
			this.gameObjectPool.createConfiguration("PlayerBullet", "Bullet")
				.setRenderer("BulletRender");
		},
	});

	return new Bullets();
});