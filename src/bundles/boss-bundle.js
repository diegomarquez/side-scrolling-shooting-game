define(function(require) {	
	var commonBundle = require('common-bundle');
	var particleBundle = require('particle-generator-bundle');
	var explosionsBundle = require('explosion-generator-bundle');
	var gb = require('gb');

	var boss1 = require("boss-1");
	var boss1Cables = require("boss-1-cables");
	var boss1Icon = require("boss-1-icon");


	var Boss = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createConfiguration("Activate_Boss_On_View", commonBundle.getActivateOnViewPoolId());

			this.gameObjectPool.createDynamicPool('Boss_1', boss1);
			this.gameObjectPool.createDynamicPool('Boss_1_Cables', boss1Cables);
			this.gameObjectPool.createDynamicPool('Boss_1_Icon', boss1Icon);
			
			this.componentPool.createConfiguration("Boss_1_Collider", commonBundle.getPolygonColliderPoolId())
				.args({ id:'bossColliderId', points: getPolygon(4, 20) });

			this.componentPool.createConfiguration("Boss_1_Cables_Collider", commonBundle.getPolygonColliderPoolId())
				.args({ id:'bossColliderId', points: getPolygon(4, 20) });

			this.componentPool.createConfiguration("Boss_1_Renderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSS1BODY.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("Boss_1_Cables_Renderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSS1CABLE.PNG"],
					offset: 'center'
				});

			this.componentPool.createConfiguration("Boss_1_Cables_Damage_Renderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSS1CABLEDAMAGED.PNG"],
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("boss-1-cables", "Boss_1_Cables")
				.args({ 
					damageRendererId: "Boss_1_Cables_Damage_Renderer",
					colliderId: "Boss_1_Cables_Collider",
					destroyEffect: explosionsBundle.getMediumExplosionsEffectId(),
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
					destroyEffect: explosionsBundle.getSmallExplosionsEffectId(),
					colliderId: "Boss_1_Collider"
				})
				.addChild("boss-1-cables", {rotation: 0})
				.addChild("boss-1-cables", {rotation: 0})
				.addChild("boss-1-cables", {rotation: 0})
				.addChild("boss-1-cables", {rotation: 180})
				.addChild("boss-1-cables", {rotation: 180})
				.addChild("boss-1-cables", {rotation: 180})
				.addComponent("Activate_Boss_On_View")
				.addComponent("Boss_1_Collider")
				.setRenderer("Boss_1_Renderer")
				.enemyCategory()
				.bossEnemyTier();	
		},
	});

	var getPolygon = function(vertexes, radius) {
		var result = [];
		var step = (Math.PI * 2) / vertexes;

		for (var i = vertexes-1; i >= 0; i--) {
			var point = {};

			point.x = Math.sin(step*i) * radius; 
			point.y = Math.cos(step*i) * radius;

			result.push(point);
		}

		return result;
	}

	return new Boss();
});