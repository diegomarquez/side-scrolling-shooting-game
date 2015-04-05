define(function(require) {	
	var commonBundle = require('common-bundle');
	var draw = require('draw');
	var util = require('util');

	var Particles = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createPool('particle-generator', require('particle-generator'));
			this.componentPool.createPool('particle-collision-generator', require('particle-collision-generator'));
			this.componentPool.createPool('straight-line-movement-angle', require('straight-line-movement-angle'));
			this.componentPool.createPool('straight-line-movement-vector', require('straight-line-movement-vector'));
			this.componentPool.createPool('claim-on-life-depleted', require('claim-on-life-depleted'));

			this.componentPool.createConfiguration(this.getStraightParticleGeneratorId(), 'particle-generator')
				.args({
					particleType: 'StraightParticle_1',
					particleDelay: 0.02,
					particleAmount: 5,
					offsetX: -20,
					offsetY: 0,
					lineVertex1: { x: 0, y: -10 },
					lineVertex2: { x: 0, y: 10 },
					startingPositionTransformation: [
						require('line-generation')
					]
				})

			this.componentPool.createConfiguration(this.getCollisionParticleGenerator_1Id(), 'particle-collision-generator')
				.args({
					particleType: 'StraightParticle_2',
					particleAmount: 40,
					radius: 10,
					startingPositionTransformation: [
						require('circle-generation')
					]
				})

			this.componentPool.createConfiguration(this.getCollisionParticleGenerator_2Id(), 'particle-collision-generator')
				.args({
					particleType: 'StraightParticle_3',
					particleAmount: 10,
					radius: 5,
					startingPositionTransformation: [
						require('circle-generation')
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

			this.componentPool.createConfiguration("StraightMovementAngle", 'straight-line-movement-angle');
			this.componentPool.createConfiguration("StraightMovementVectorReverse", 'straight-line-movement-vector')
				.args({
					direction: -1
				});
			this.componentPool.createConfiguration("ClaimOnLifeDepleted", 'claim-on-life-depleted');
			
			this.gameObjectPool.createConfiguration("StraightParticle_1", commonBundle.getGameObjectPoolId())
				.args({ 
					speed: 15,
					life: {
						_get: function() {
							return util.rand_f(0.3, 0.8);
						}	
					}
				})
				.addComponent("StraightMovementAngle")
				.addComponent("ClaimOnLifeDepleted")
				.setRenderer("WhiteSquareParticle");

			this.gameObjectPool.createConfiguration("StraightParticle_2", commonBundle.getGameObjectPoolId())
				.args({ 
					speed: {
						_get: function() {
							return util.rand_i(10, 250);
						} 
					},
					spread: {
						_get: function() {
							return util.rand_i(-20, 20);
						}	
					}, 
					life: {
						_get: function() {
							return util.rand_f(10, 70);
						}	
					}
				})
				.addComponent("StraightMovementVectorReverse")
				.addComponent("ClaimOnLifeDepleted")
				.setRenderer("RedSquareParticle");

			this.gameObjectPool.createConfiguration("StraightParticle_3", commonBundle.getGameObjectPoolId())
				.args({ 
					speed: {
						_get: function() {
							return util.rand_i(150, 200);
						} 
					},
					spread: {
						_get: function() {
							return util.rand_i(-45, 45);
						}	
					}, 
					life: {
						_get: function() {
							return util.rand_f(30, 60);
						}	
					}
				})
				.addComponent("StraightMovementVectorReverse")
				.addComponent("ClaimOnLifeDepleted")
				.setRenderer("WhiteSquareParticle");
		},

		getStraightParticleGeneratorId: function() {
			return 'StraightParticleGenerator';
		},

		getCollisionParticleGenerator_1Id: function() {
			return 'CollisionParticleGenerator1';
		},

		getCollisionParticleGenerator_2Id: function() {
			return 'CollisionParticleGenerator2';
		}
	});

	return new Particles();
});