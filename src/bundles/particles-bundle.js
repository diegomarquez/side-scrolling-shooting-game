define(function(require) {	
	var commonBundle = require('common-bundle');
	var draw = require('draw');
	var util = require('util');

	var Particles = require("bundle").extend({
		create: function(args) {			
			this.componentPool.createPool('particle-generator', require('particle-generator'));
			this.componentPool.createPool('straight-line-movement', require('straight-line-movement'));
			this.componentPool.createPool('claim-on-life-depleted', require('claim-on-life-depleted'));

			this.componentPool.createConfiguration(this.getStraightParticleGeneratorId(), 'particle-generator')
				.args({
					particleType: 'StraightParticle',
					particleDelay: 0.02,
					particleAmount: 3,
					offsetX: -20,
					offsetY: 0
				}) 

			this.componentPool.createConfiguration("SquareParticle", commonBundle.getPathRendererPoolId())
				.args({
					name: 'square-particle',
					width: 2,
					height: 2,
					offset: 'center',
					drawPath: function(context) {
						draw.rectangle(context, 0, 0, this.width, this.height, null, '#FFFFFF', 1)
					}
				});
			this.componentPool.createConfiguration("StraightMovement", 'straight-line-movement');
			this.componentPool.createConfiguration("ClaimOnLifeDepleted", 'claim-on-life-depleted');
			
			this.gameObjectPool.createConfiguration("StraightParticle", commonBundle.getGameObjectPoolId())
				.args({ 
					speed: 50,
					life: 5,
					angle: function () {
						return util.rand_f(0, Math.PI*2)
					}
				})
				.addComponent("StraightMovement")
				.addComponent("ClaimOnLifeDepleted")
				.setRenderer("SquareParticle");
		},

		getStraightParticleGeneratorId: function() {
			return 'StraightParticleGenerator';
		}
	});

	return new Particles();
});