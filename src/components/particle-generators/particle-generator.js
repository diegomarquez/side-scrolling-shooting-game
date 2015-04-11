define(["editor-component", "gb"], function(EditorComponent, Gb) {
	var ParticleGenerator = EditorComponent.extend({
		init: function() {
			this._super();

			this.offsetX = 0;
			this.offsetY = 0;
			this.addAsChildren = false;
		},

		reset: function() {
			this._super();

			this.offsetX = 0;
			this.offsetY = 0
			this.addAsChildren = false;
		},

		editorStart: function(parent) {
			this.totalTime = 0;
			this.viewports = this.parent.getViewportList();
			this.updateGroup = this.parent.getUpdateGroup();
		},

		editorUpdate: function(delta) {
			this.totalTime += delta;

			if (this.totalTime >= this.particleDelay) {
				createParticles.call(this);
				this.totalTime = 0;
			}
		},

		spray: function() {
			createParticles.call(this);
		}
	});

	var createParticles = function() {
		if (!this.isEnabled()) return;

		for (var i=0; i < this.particleAmount; i++) {
			startingPostion.call(this);

			if (this.addAsChildren) {
				Gb.addChildTo(this.parent, this.particleType, null, ParticleGenerator.args, 'create');	
			} else {
				Gb.create(this.particleType, this.updateGroup, this.viewports, ParticleGenerator.args);	
			}
		}
	} 

	var startingPostion = function() {
		if (this.addAsChildren) {
			ParticleGenerator.args['x'] = 0;
			ParticleGenerator.args['y'] = 0;
		} else {
			ParticleGenerator.args['x'] = this.parent.X;
			ParticleGenerator.args['y'] = this.parent.Y;
		}

		if (this.startingPositionTransformation) {
			for (var i = 0; i < this.startingPositionTransformation.length; i++) {
				this.startingPositionTransformation[i].call(this, ParticleGenerator.args);
			}	
		}
	}

	ParticleGenerator.args = {};

	return ParticleGenerator;
});