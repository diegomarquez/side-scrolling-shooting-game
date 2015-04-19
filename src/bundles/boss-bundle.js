define(function(require) {	
	var commonBundle = require('common-bundle');
	var particleBundle = require('particles-bundle');
	var effectsBundle = require('effects-bundle');
	var gb = require('gb');

	var boss1 = require("boss-1");
	var boss1Cables = require("boss-1-cables");
	var boss1Icon = require("boss-1-icon");

	var boss1Renderer = require('boss-1-renderer');
	var boss1CablesRenderer = require('boss-1-cables-renderer');

	var Bullets = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createConfiguration("Activate_Boss_On_View", commonBundle.getActivateOnViewPoolId());

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
			this.componentPool.createConfiguration("Boss_1_Cables_Renderer", 'boss-1-cables-renderer')
				.args({
					segments: 5
				});

			this.componentPool.createConfiguration("Boss_1_Cables_Damage_Renderer", 'boss-1-cables-renderer')
				.args({
					segments: 2
				});

			this.componentPool.createConfiguration("BiohazardIcon_Renderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BIOHAZARD.PNG"],
					offset: 'center',
					scaleX: 0.3,
					scaleY: 0.3
				});

			this.gameObjectPool.createConfiguration("biohazard-icon", "Boss_1_Icon")
				.setRenderer("BiohazardIcon_Renderer")
				.childOnly();

			this.gameObjectPool.createConfiguration("boss-1-cables", "Boss_1_Cables")
				.args({ 
					damageRendererId: "Boss_1_Cables_Damage_Renderer",
					colliderId: "Boss_1_Cables_Collider",
					destroyEffect: effectsBundle.getMediumExplosionsEffectId(),
					destroyParticles: [
						particleBundle.getBossDamageParticles_1_Id(),
						particleBundle.getBossDamageParticles_2_Id(),
						particleBundle.getBossDamageParticles_3_Id()
					]
				})
				.addComponent("Boss_1_Cables_Collider")
				.addComponent("Activate_Boss_On_View")
				.setRenderer("Boss_1_Cables_Renderer")
				.childOnly();

			this.gameObjectPool.createConfiguration("boss-1", "Boss_1")
				.args({
					destroyEffect: effectsBundle.getSmallExplosionsEffectId(),
					colliderId: "Boss_1_Collider"
				})
				.addChild("boss-1-cables", {rotation: 0})
				.addChild("boss-1-cables", {rotation: 0})
				.addChild("boss-1-cables", {rotation: 0})
				.addChild("boss-1-cables", {rotation: 180})
				.addChild("boss-1-cables", {rotation: 180})
				.addChild("boss-1-cables", {rotation: 180})
				.addChild("biohazard-icon")
				.addComponent("Activate_Boss_On_View")
				.addComponent("Boss_1_Collider")
				.setRenderer("Boss_1_Renderer");	
		},
	});

	var getPolygon = function(vertexes, radius) {
		var result = [];
		var step = (Math.PI * 2)/vertexes;

		for (var i = vertexes-1; i >= 0; i--) {
			var point = {};

			point.x = Math.sin(step*i) * radius; 
			point.y = Math.cos(step*i) * radius;

			result.push(point);
		}

		return result;
	}

	return new Bullets();
});