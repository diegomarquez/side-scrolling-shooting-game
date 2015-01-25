define(function(require) {	
	var commonBundle = require('common-bundle');
	var gb = require('gb');

	var boss1 = require("boss-1");
	var boss1Cables = require("boss-1-cables");
	
	var boss1Renderer = require('boss-1-renderer');
	var boss1CablesRenderer = require('boss-1-cables-renderer');

	var Bullets = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createPool('boss-1-renderer', boss1Renderer);
			this.componentPool.createPool('boss-1-cables-renderer', boss1CablesRenderer);
			
			this.gameObjectPool.createDynamicPool('Boss_1', boss1);
			this.gameObjectPool.createDynamicPool('Boss_1_Cables', boss1Cables);
			
			this.componentPool.createConfiguration("Boss_1_Collider", commonBundle.getPolygonColliderPoolId())
				.args({ id:'bossColliderId', points: getPolygon(6, 20) });

			this.componentPool.createConfiguration("Boss_1_Cables_Collider", commonBundle.getPolygonColliderPoolId())
				.args({ id:'bossColliderId', points: getPolygon(6, 20) });

			this.componentPool.createConfiguration("Boss_1_Renderer", 'boss-1-renderer');
			this.componentPool.createConfiguration("Boss_1_Cables_Renderer", 'boss-1-cables-renderer');
			
			this.componentPool.createConfiguration("BiohazardIcon_Renderer3", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BIOHAZARD.PNG"],
					offset: 'center',
					scaleX: 1,
					scaleY: 1
				});

			this.componentPool.createConfiguration("BiohazardIcon_Renderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BIOHAZARD.PNG"],
					offset: 'center',
					scaleX: 0.4,
					scaleY: 0.4
				});

			this.componentPool.createConfiguration("BiohazardIcon_Renderer2", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BIOHAZARD.PNG"],
					offset: 'center',
					scaleX: 0.5,
					scaleY: 0.5
				});

			this.gameObjectPool.createConfiguration("Biohazard_Icon", commonBundle.getGameObjectPoolId())
				.args( { rotation: 45 }) 
				.setRenderer("BiohazardIcon_Renderer");

			this.gameObjectPool.createConfiguration("Biohazard_Icon2", commonBundle.getGameObjectPoolId())
				.args( { rotation: 45 })
				.setRenderer("BiohazardIcon_Renderer2");

			this.gameObjectPool.createConfiguration("Biohazard_Icon3", commonBundle.getGameObjectPoolId())
				.args( { rotation: 45 })
				.setRenderer("BiohazardIcon_Renderer3");

			this.gameObjectPool.createConfiguration("Boss_1_Cables", "Boss_1_Cables")
				.addComponent("Boss_1_Cables_Collider")
				.setRenderer("Boss_1_Cables_Renderer");

			this.gameObjectPool.createConfiguration("Boss_1", "Boss_1")
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