define(function(require) {	
	var commonBundle = require('common-bundle');
	var draw = require('draw');
	var util = require('util');

	var Particles = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createPool('particle-generator', require('particle-generator'));
			this.componentPool.createPool('particle-collision-generator', require('particle-collision-generator'));
			this.componentPool.createPool('movement-angle', require('movement-angle'));
			this.componentPool.createPool('angle-modifier', require('angle-modifier'));
			this.componentPool.createPool('cosine-angle-modifier', require('cosine-angle-modifier'));
			this.componentPool.createPool('straight-line-movement-angle', require('straight-line-movement-angle'));
			this.componentPool.createPool('straight-line-movement-vector', require('straight-line-movement-vector'));
			this.componentPool.createPool('claim-on-life-depleted', require('claim-on-life-depleted'));

			this.componentPool.createConfiguration(this.getPlayerBulletTrailingParticlesId(), 'particle-generator')
				.args({
					particleType: 'StraightParticle_1',
					particleDelay: 0.02,
					particleAmount: 5,
					startingPositionTransformation: [
						require('offset-generation')(-20, 0),
						require('line-generation')({ x: 0, y: -10 }, { x: 0, y: 10 })
					]
				})

			this.componentPool.createConfiguration(this.getCannonBulletCollisionParticlesId(), 'particle-collision-generator')
				.args({
					particleType: 'StraightParticle_2',
					particleAmount: 40,
					startingPositionTransformation: [
						require('circle-generation')(10)
					]
				})

			this.componentPool.createConfiguration(this.getPlayerBulletCollisionParticlesId(), 'particle-collision-generator')
				.args({
					particleType: 'StraightParticle_3',
					particleAmount: 10,
					startingPositionTransformation: [
						require('circle-generation')(5)
					]
				})

			this.componentPool.createConfiguration(this.getBossDamageParticles_1_Id(), 'particle-generator')
				.args({
					particleType: 'ArchingParticle_1',
					particleAmount: 10,
					particleDelay: 4,
					addAsChildren: true,
					startingPositionTransformation: [
						require('offset-generation')(-7, -7),
						require('rectangle-generation')(5, 5)
					]
				}) 

			this.componentPool.createConfiguration(this.getBossDamageParticles_2_Id(), 'particle-generator')
				.args({
					particleType: 'ArchingParticle_1',
					particleAmount: 10,
					particleDelay: 3,
					addAsChildren: true,
					startingPositionTransformation: [
						require('offset-generation')(-7, 7),
						require('rectangle-generation')(5, 5)
					]
				}) 

			this.componentPool.createConfiguration(this.getBossDamageParticles_3_Id(), 'particle-generator')
				.args({
					particleType: 'ArchingParticle_2',
					particleAmount: 10,
					particleDelay: 5,
					addAsChildren: true,
					startingPositionTransformation: [
						require('offset-generation')(10, 5),
						require('rectangle-generation')(5, 5)
					]
				})

			this.componentPool.createConfiguration(this.getCannonDamageParticles_1_Id(), 'particle-generator')
				.args({
					particleType: 'CosineParticle_1',
					particleAmount: 1,
					particleDelay: 0.2,
					addAsChildren: true,
					startingPositionTransformation: [
						require('offset-generation')(0, -10),
						require('rectangle-generation')(20, 10)
					]
				})

			this.componentPool.createConfiguration(this.getCannonDamageParticles_2_Id(), 'particle-generator')
				.args({
					particleType: 'CosineParticle_2',
					particleAmount: 1,
					particleDelay: 0.4,
					addAsChildren: true,
					startingPositionTransformation: [
						require('offset-generation')(0, 0),
						require('rectangle-generation')(20, 10)
					]
				}) 

			this.componentPool.createConfiguration("WhiteSquareParticle", commonBundle.getPathRendererPoolId())
				.args({
					name: 'white-square-particle',
					width: 2,
					height: 2,
					offset: 'center',
					drawPath: function(context) {
						draw.rectangle(context, 0, 0, this.width, this.height, null, '#FFFFFF', 1)
					}
				});

			this.componentPool.createConfiguration("SmokeSquareParticle_1", commonBundle.getPathRendererPoolId())
				.args({
					name: 'smoke-square-particle-1',
					width: 3,
					height: 3,
					offset: 'center',
					drawPath: function(context) {
						draw.rectangle(context, 0, 0, this.width, this.height, null, '#333333', 1)
					}
				});

			this.componentPool.createConfiguration("SmokeSquareParticle_2", commonBundle.getPathRendererPoolId())
				.args({
					name: 'smoke-square-particle-2',
					width: 5,
					height: 5,
					offset: 'center',
					drawPath: function(context) {
						draw.rectangle(context, 0, 0, this.width, this.height, null, '#777777', 1)
					}
				});

			this.componentPool.createConfiguration("RedSquareParticle", commonBundle.getPathRendererPoolId())
				.args({
					name: 'red-square-particle',
					width: 2,
					height: 2,
					offset: 'center',
					drawPath: function(context) {
						draw.rectangle(context, 0, 0, this.width, this.height, null, '#FF0000', 1)
					}
				});

			this.componentPool.createConfiguration("YellowSquareParticle", commonBundle.getPathRendererPoolId())
				.args({
					name: 'yellow-square-particle',
					width: 4,
					height: 4,
					offset: 'center',
					drawPath: function(context) {
						draw.rectangle(context, 0, 0, this.width, this.height, null, '#FFFF00', 1)
					}
				});

			this.componentPool.createConfiguration("MovementAngle", 'movement-angle');
			this.componentPool.createConfiguration("AngleModifier", 'angle-modifier');
			this.componentPool.createConfiguration("CosineAngleModifier", 'cosine-angle-modifier');
			this.componentPool.createConfiguration("StraightMovementAngle", 'straight-line-movement-angle');
			this.componentPool.createConfiguration("StraightMovementVectorReverse", 'straight-line-movement-vector')
				.args({
					direction: -1
				});
			this.componentPool.createConfiguration("ClaimOnLifeDepleted", 'claim-on-life-depleted');
			
			this.gameObjectPool.createDynamicPool('particle', require('particle'))			

			this.gameObjectPool.createConfiguration("StraightParticle_1", 'particle')
				.args({ 
					speedRange: { min: 15, max: 15 },
					angleRange: { min: 180, max: 180 },
					lifeRange: { min: 0.3, max: 0.8 }
				})
				.addComponent("StraightMovementAngle")
				.addComponent("ClaimOnLifeDepleted")
				.setRenderer("WhiteSquareParticle");

			this.gameObjectPool.createConfiguration("StraightParticle_2", 'particle')
				.args({ 
					speedRange: { min: 10, max: 250 },
					spreadRange: { min: -20, max: 20 },
					lifeRange: { min: 30, max: 60 }
				})
				.addComponent("StraightMovementVectorReverse")
				.addComponent("ClaimOnLifeDepleted")
				.setRenderer("RedSquareParticle");

			this.gameObjectPool.createConfiguration("StraightParticle_3", 'particle')
				.args({ 
					speedRange: { min: 150, max: 200 },
					spreadRange: { min: -45, max: 45 },
					lifeRange: { min: 20, max: 50 }
				})
				.addComponent("StraightMovementVectorReverse")
				.addComponent("ClaimOnLifeDepleted")
				.setRenderer("WhiteSquareParticle");

			this.gameObjectPool.createConfiguration("ArchingParticle_1", 'particle')
				.args({ 
					angleRange: { min: -135, max: -135 },
					speedRange: { min: 150, max:250 },
					spreadRange: { min: -10, max: 10 },
					lifeRange: { min: 40, max: 50 }
				})
				.addComponent("AngleModifier", {
					step: -5 * (Math.PI/180)
				})
				.addComponent("MovementAngle")
				.addComponent("ClaimOnLifeDepleted")
				.setRenderer("YellowSquareParticle");

			this.gameObjectPool.createConfiguration("ArchingParticle_2", 'particle')
				.args({ 
					angleRange: { min: -45, max: -45 },
					speedRange: { min: 150, max:250 },
					spreadRange: { min: 10, max: 10 },
					lifeRange: { min: 40, max: 50 }
				})
				.addComponent("AngleModifier", {
					step: 5 * (Math.PI/180)
				})
				.addComponent("MovementAngle")
				.addComponent("ClaimOnLifeDepleted")
				.setRenderer("YellowSquareParticle");

			this.gameObjectPool.createConfiguration("CosineParticle_1", 'particle')
				.args({ 
					angleRange: { min: -90, max: -90 },
					speedRange: { min: 50, max:70 },
					spreadRange: { min: 0, max: 0 },
					lifeRange: { min: 50, max: 70 }
				})
				.addComponent("CosineAngleModifier", {
					period: 5,
					amplitude: 0.5,
					angleOffset: 90
				})
				.addComponent("MovementAngle")
				.addComponent("ClaimOnLifeDepleted")
				.setRenderer("SmokeSquareParticle_1");

				this.gameObjectPool.createConfiguration("CosineParticle_2", 'particle')
				.args({ 
					angleRange: { min: -90, max: -90 },
					speedRange: { min: 50, max:70 },
					spreadRange: { min: 0, max: 0 },
					lifeRange: { min: 50, max: 70 }
				})
				.addComponent("CosineAngleModifier", {
					period: 3,
					amplitude: 1,
					angleOffset: 90
				})
				.addComponent("MovementAngle")
				.addComponent("ClaimOnLifeDepleted")
				.setRenderer("SmokeSquareParticle_2");
		},

		getPlayerBulletTrailingParticlesId: function() {
			return 'TrailingParticleGenerator';
		},

		getCannonBulletCollisionParticlesId: function() {
			return 'CannonBulletCollisionParticleGenerator';
		},

		getPlayerBulletCollisionParticlesId: function() {
			return 'PlayerBulletCollisionParticleGenerator2';
		},

		getBossDamageParticles_1_Id: function() {
			return 'BossDamageParticleGenerator1';
		},

		getBossDamageParticles_2_Id: function() {
			return 'BossDamageParticleGenerator2';
		},

		getBossDamageParticles_3_Id: function() {
			return 'BossDamageParticleGenerator3';
		},

		getCannonDamageParticles_1_Id: function() {
			return 'CannonDamageParticleGenerator1';
		},

		getCannonDamageParticles_2_Id: function() {
			return 'CannonDamageParticleGenerator2';
		}
	});

	return new Particles();
});