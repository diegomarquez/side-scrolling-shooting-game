define(function(require) {	
	var commonBundle = require('common-bundle');
	var particleBundle = require('particle-generator-bundle');
	var explosionsBundle = require('explosion-generator-bundle');
	var gb = require('gb');

	var Boss = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createConfiguration("Activate_Boss_On_View", commonBundle.getActivateOnViewPoolId());

			// Boss 1
			// =================================
			// =================================

			this.gameObjectPool.createDynamicPool('Boss_1', require("boss-1"));
			this.gameObjectPool.createDynamicPool('Boss_1_Cables', require("boss-1-cables"));
			this.gameObjectPool.createDynamicPool('Boss_1_Icon', require("boss-1-icon"));
			
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

			// Boss 2
			// =================================
			// =================================
			
			this.gameObjectPool.createDynamicPool('Boss_2_Core', require("boss-2-core"));
			this.gameObjectPool.createDynamicPool('Boss_2_Body', require("boss-2-body"));

			this.componentPool.createConfiguration("Boss_2_Core_Collider", commonBundle.getPolygonColliderPoolId())
				.args({ id:'bossColliderId', points: getPolygon(4, 20) });

			this.componentPool.createConfiguration("Boss_2_Body_Collider", commonBundle.getPolygonColliderPoolId())
				.args({ id:'bossColliderId', points: getPolygon(8, 50) });

			this.componentPool.createConfiguration("Boss_2_Body_Renderer", commonBundle.getAnimationsBitmapRendererPoolId())
				.args({
					startingLabel: 'half-open',

					frameWidth: 112,
					frameHeight: 60,
					frameDelay: 0.08,
					frameCount: 11,
					offset: 'center',
					path: gb.assetMap()["BOSS2BODY.PNG"],

					labels: {
						'opened': {
							loop: false,
							frames: [10]
						},
						'closed': {
							loop: false,
							frames: [0]
						},
						'opening': {
							loop: false,
							frames: [0,1,2,3,4,5,6,7,8,9,10]
						},
						'closing': {
							loop: false,
							frames: [10,9,8,7,6,5,4,3,2,1,0]
						},
						'half-open': {
							loop: false,
							frames: [5]
						}
					}
				});

			this.componentPool.createConfiguration("Boss_2_Core_Renderer", commonBundle.getBitmapRendererPoolId())
				.args({
					path: gb.assetMap()["BOSS2CORE.PNG"],
					offset: 'center'
				});

			this.gameObjectPool.createConfiguration("boss-body", "Boss_2_Body")
				.args({
					destroyEffect: explosionsBundle.getSmallExplosionsEffectId(),
					colliderId: "Boss_2_Body_Collider",
					laserAttacks: ['x1', 'x2', 'x3'],
					mineAttacks: ['x3', 'x5']
				})
				.addComponent("Activate_Boss_On_View")
				.addComponent("Boss_2_Body_Collider")
				.setRenderer("Boss_2_Body_Renderer")
				.enemyCategory()
				.disableMouseSupport()
				.childOnly();

			this.componentPool.createPool('DestroyExplosions', require('destroy-explosions'));

			this.componentPool.createConfiguration("BossDestroyExplosions", "DestroyExplosions")
				.args({
					effect: explosionsBundle.getSmallExplosionsEffectId()
				});

			this.gameObjectPool.createConfiguration("boss-2", "Boss_2_Core")
				.args({
					destroyEffect: explosionsBundle.getSmallExplosionsEffectId(),
					colliderId: "Boss_2_Core_Collider"
				})
				.addComponent("Activate_Boss_On_View")
				.addComponent("Boss_2_Core_Collider")
				.addComponent("BossDestroyExplosions")
				.addChild('boss-body')
				.setRenderer("Boss_2_Core_Renderer")
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