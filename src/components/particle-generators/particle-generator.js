define(["editor-component", "gb"], function(EditorComponent, Gb) {
	var ParticleGenerator = EditorComponent.extend({
		init: function() {
			this._super();
		},

		reset: function() {
			this._super();

			this.offsetX = 0;
			this.offsetY = 0;
		},

		editorStart: function(parent) {
			this.totalTime = 0;
			this.viewports = this.parent.getViewportList();
			this.updateGroup = this.parent.getUpdateGroup();
		},

		editorUpdate: function(delta) {
			this.totalTime += delta;

			if (this.totalTime >= this.particleDelay) {
				this.createParticles(this);
				this.totalTime = 0;
			}
		},

		createParticles: function(args) {
			for (var i=0; i < this.particleAmount; i++) {
				this.startingPostion();
				Gb.create(this.particleType, this.updateGroup, this.viewports, ParticleGenerator.args);
			}
		},

		startingPostion: function() {
			ParticleGenerator.args['x'] = this.parent.X + this.offsetX;
			ParticleGenerator.args['y'] = this.parent.Y + this.offsetY;

			if (this.startingPositionTransformation) {
				for (var i = 0; i < this.startingPositionTransformation.length; i++) {
					this.startingPositionTransformation[i].call(this, ParticleGenerator.args);
				}	
			}
		}
	});

	ParticleGenerator.args = {};

	return ParticleGenerator;
});