define(function(require) {	
	var commonBundle = require('common-bundle');
	var particleBundle = require('particle-bundle');

	var ParticleGenertor = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createPool('particle-generator', require('game-object-generator'));
			this.componentPool.createPool('child-particle-generator', require('child-generator'));
			this.componentPool.createPool('particle-collision-generator', require('on-collision-game-object-generator'));

			this.componentPool.createConfiguration(this.getPlayerBulletTrailingParticlesId(), 'particle-generator')
				.args({
					objectType: particleBundle.getStraightParticle_1_Id(),
					sprayDelay: 0.02,
					amountPerSpray: 5,
					startingPositionTransformation: [
						require('offset-generation')(-20, 0),
						require('line-generation')({ x: 0, y: -10 }, { x: 0, y: 10 })
					]
				});

			this.componentPool.createConfiguration(this.getCannonBulletCollisionParticlesId(), 'particle-collision-generator')
				.args({
					objectType: particleBundle.getStraightParticle_2_Id(),
					amountPerSpray: 40,
					startingPositionTransformation: [
						require('circle-generation')(10)
					]
				});

			this.componentPool.createConfiguration(this.getPlayerBulletCollisionParticlesId(), 'particle-collision-generator')
				.args({
					objectType: particleBundle.getStraightParticle_3_Id(),
					amountPerSpray: 10,
					startingPositionTransformation: [
						require('circle-generation')(5)
					]
				});

			this.componentPool.createConfiguration(this.getBossDamageParticles_1_Id(), 'child-particle-generator')
				.args({
					objectType: particleBundle.getArchingParticle_1_Id(),
					amountPerSpray: 10,
					sprayDelay: 4,
					startingPositionTransformation: [
						require('offset-generation')(-7, -7),
						require('rectangle-generation')(5, 5)
					]
				}); 

			this.componentPool.createConfiguration(this.getBossDamageParticles_2_Id(), 'child-particle-generator')
				.args({
					objectType: particleBundle.getArchingParticle_1_Id(),
					amountPerSpray: 10,
					sprayDelay: 3,
					startingPositionTransformation: [
						require('offset-generation')(-7, 7),
						require('rectangle-generation')(5, 5)
					]
				}); 

			this.componentPool.createConfiguration(this.getBossDamageParticles_3_Id(), 'child-particle-generator')
				.args({
					objectType: particleBundle.getArchingParticle_2_Id(),
					amountPerSpray: 10,
					sprayDelay: 5,
					startingPositionTransformation: [
						require('offset-generation')(10, 5),
						require('rectangle-generation')(5, 5)
					]
				});

			this.componentPool.createConfiguration(this.getCannonDamageParticles_1_Id(), 'child-particle-generator')
				.args({
					objectType: particleBundle.getCosineParticle_1_Id(),
					amountPerSpray: 1,
					sprayDelay: 0.2,
					startingPositionTransformation: [
						require('offset-generation')(0, -10),
						require('rectangle-generation')(20, 10)
					]
				})

			this.componentPool.createConfiguration(this.getCannonDamageParticles_2_Id(), 'child-particle-generator')
				.args({
					objectType: particleBundle.getCosineParticle_2_Id(),
					amountPerSpray: 1,
					sprayDelay: 0.4,
					startingPositionTransformation: [
						require('offset-generation')(0, 0),
						require('rectangle-generation')(20, 10)
					]
				}) 
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

	return new ParticleGenertor();
});