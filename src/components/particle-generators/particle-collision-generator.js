define(["particle-generator"], function(ParticleGenerator) {
	var ParticleCollisionGenerator = ParticleGenerator.extend({
		init: function() {
			this._super();
		},

		editorStart: function(parent) {
			this._super();

			parent.once(parent.COLLIDE, this, function (other, response) {
				ParticleGenerator.args['vector'] = response.overlapV;
				this.createParticles();
			});
		},

		editorUpdate: function(delta) {
			
		}
	});

	return ParticleCollisionGenerator;
});