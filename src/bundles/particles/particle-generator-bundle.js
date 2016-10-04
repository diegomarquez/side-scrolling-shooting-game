define(function(require) {	
	var commonBundle = require('common-bundle');
	var particleBundle = require('particle-bundle');

	var ParticleGenertor = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createPool('particle-generator', require('game-object-generator'));
			this.componentPool.createPool('child-particle-generator', require('child-generator'));
			this.componentPool.createPool('particle-collision-generator', require('on-collision-game-object-generator'));

			this.componentPool.createConfiguration(this.getCannonBulletCollisionParticlesId(), 'particle-collision-generator')
				.args({
					objectType: particleBundle.getStraightParticle_2_Id(),
					amountPerSpray: 40,
					excludeFromCollision: 'player-ship',
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

			this.componentPool.createConfiguration(this.getBoss_1_DestroyParticlesGenerator_1_Id(), 'particle-generator')
				.args({
					objectType: particleBundle.getBoss_1_DestroyParticle_1_Id(),
					amountPerSpray: 4,
					maxAmountToSpray: 4,
					sprayDelay: 0.1,
					startingPositionTransformation: [
						require('circle-generation')(30)
					]
				});

			this.componentPool.createConfiguration(this.getBoss_1_DestroyParticlesGenerator_2_Id(), 'particle-generator')
				.args({
					objectType: particleBundle.getBoss_1_DestroyParticle_2_Id(),
					amountPerSpray: 2,
					maxAmountToSpray: 2,
					sprayDelay: 0.1,
					startingPositionTransformation: [
						require('circle-generation')(30)
					]
				});

			this.componentPool.createConfiguration(this.getBoss_1_DestroyParticlesGenerator_3_Id(), 'particle-generator')
				.args({
					objectType: particleBundle.getBoss_1_DestroyParticle_3_Id(),
					amountPerSpray: 1,
					maxAmountToSpray: 1,
					sprayDelay: 0.1,
					startingPositionTransformation: [
						require('circle-generation')(30)
					]
				});

			this.componentPool.createConfiguration(this.getBoss_2_DestroyParticlesGenerator_1_Id(), 'particle-generator')
				.args({
					objectType: particleBundle.getBoss_2_DestroyParticle_1_Id(),
					amountPerSpray: 4,
					maxAmountToSpray: 4,
					sprayDelay: 0.1,
					startingPositionTransformation: [
						require('circle-generation')(30)
					]
				});

			this.componentPool.createConfiguration(this.getBoss_2_DestroyParticlesGenerator_2_Id(), 'particle-generator')
				.args({
					objectType: particleBundle.getBoss_2_DestroyParticle_2_Id(),
					amountPerSpray: 1,
					maxAmountToSpray: 1,
					sprayDelay: 0.1,
					startingPositionTransformation: [
						require('circle-generation')(30)
					]
				});

			this.componentPool.createConfiguration(this.getBoss_3_DestroyParticlesGenerator_1_Id(), 'particle-generator')
				.args({
					objectType: particleBundle.getBoss_3_DestroyParticle_1_Id(),
					amountPerSpray: 4,
					maxAmountToSpray: 4,
					sprayDelay: 0.1,
					startingPositionTransformation: [
						require('circle-generation')(30)
					]
				});

			this.componentPool.createConfiguration(this.getBoss_3_DestroyParticlesGenerator_2_Id(), 'particle-generator')
				.args({
					objectType: particleBundle.getBoss_3_DestroyParticle_2_Id(),
					amountPerSpray: 2,
					maxAmountToSpray: 2,
					sprayDelay: 0.1,
					startingPositionTransformation: [
						require('circle-generation')(30)
					]
				});

			this.componentPool.createConfiguration(this.getBoss_4_DestroyParticlesGenerator_1_Id(), 'particle-generator')
				.args({
					objectType: [
						particleBundle.getBoss_4_DestroyParticle_1_Id(),
						particleBundle.getBoss_4_DestroyParticle_2_Id(),
						particleBundle.getBoss_4_DestroyParticle_3_Id(),
						particleBundle.getBoss_4_DestroyParticle_4_Id()
					],
					amountPerSpray: 8,
					maxAmountToSpray: 8,
					sprayDelay: 0.1,
					startingPositionTransformation: [
						require('circle-generation')(30)
					]
				});
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
		},

		getBoss_1_DestroyParticlesGenerator_1_Id: function() {
			return 'Boss_1_Destroy_Particle_1_Generator';
		},

		getBoss_1_DestroyParticlesGenerator_2_Id: function() {
			return 'Boss_1_Destroy_Particle_2_Generator';
		},

		getBoss_2_DestroyParticlesGenerator_1_Id: function() {
			return 'Boss_2_Destroy_Particle_1_Generator';
		},

		getBoss_2_DestroyParticlesGenerator_2_Id: function() {
			return 'Boss_2_Destroy_Particle_2_Generator';
		},

		getBoss_1_DestroyParticlesGenerator_3_Id: function() {
			return 'Boss_1_Destroy_Particle_3_Generator';
		},

		getBoss_3_DestroyParticlesGenerator_1_Id: function() {
			return 'Boss_3_Destroy_Particle_1_Generator';	
		},

		getBoss_3_DestroyParticlesGenerator_2_Id: function() {
			return 'Boss_3_Destroy_Particle_2_Generator';	
		},

		getBoss_4_DestroyParticlesGenerator_1_Id: function() {
			return 'Boss_4_Destroy_Particle_1_Generator';	
		}
	});

	return new ParticleGenertor();
});