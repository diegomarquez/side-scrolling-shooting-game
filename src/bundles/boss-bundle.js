define(function(require) {	
	var commonBundle = require('common-bundle');
	var gb = require('gb');

	var boss1 = require("boss-1");
	var boss1Cables = require("boss-1-cables");
	var boss1Icon = require("boss-1-icon");

	var boss1Renderer = require('boss-1-renderer');
	var boss1CablesRenderer = require('boss-1-cables-renderer');

	var Bullets = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createPool('boss-1-renderer', boss1Renderer);
			this.componentPool.createPool('boss-1-cables-renderer', boss1CablesRenderer);
			
			this.gameObjectPool.createDynamicPool('Boss_1', boss1);
			this.gameObjectPool.createDynamicPool('Boss_1_Cables', boss1Cables);
			this.gameObjectPool.createDynamicPool('Boss_1_Icon', boss1Icon);
			
			this.componentPool.createConfiguration("Boss_1_Collider", commonBundle.getPolygonColliderPoolId())
				.args({ id:'bossColliderId', points: getPolygon(4, 20) });

			this.componentPool.createConfiguration("Boss_1_Cables_Collider", commonBundle.getPolygonColliderPoolId())
				.args({ id:'bossColliderId', points: getPolygon(4, 20) });

			this.componentPool.createConfiguration("Boss_1_Renderer", 'boss-1-renderer');
			this.componentPool.createConfiguration("Boss_1_Cables_Renderer", 'boss-1-cables-renderer');

			this.componentPool.createConfiguration("BiohazardIcon_Renderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BIOHAZARD.PNG"],
					offset: 'center',
					scaleX: 0.3,
					scaleY: 0.3
				});

			this.gameObjectPool.createConfiguration("Biohazard_Icon", "Boss_1_Icon")
				.setRenderer("BiohazardIcon_Renderer")
				.childOnly();

			this.gameObjectPool.createConfiguration("Boss_1_Cables", "Boss_1_Cables")
				.addComponent("Boss_1_Cables_Collider")
				.setRenderer("Boss_1_Cables_Renderer")
				.childOnly();

			this.gameObjectPool.createConfiguration("Boss_1", "Boss_1")
				.addChild("Boss_1_Cables", {rotation: 0})
				.addChild("Boss_1_Cables", {rotation: 0})
				.addChild("Boss_1_Cables", {rotation: 0})
				.addChild("Boss_1_Cables", {rotation: 180})
				.addChild("Boss_1_Cables", {rotation: 180})
				.addChild("Boss_1_Cables", {rotation: 180})
				.addChild("Biohazard_Icon")
				.addComponent("Boss_1_Collider")
				.setRenderer("Boss_1_Renderer");	
		},
	});

	var getPolygon = function(vertexes, radius) {
		var result = [];
		var step = (Math.PI * 2)/vertexes;

		for (var i = 0; i < vertexes; i++) {
			var point = {};

			point.x = Math.sin(step*i) * radius; 
			point.y = Math.cos(step*i) * radius;

			result.push(point);
		}

		return result;
	}

	return new Bullets();
});