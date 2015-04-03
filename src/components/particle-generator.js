define(["editor-component", "gb"], function(EditorComponent, Gb) {
	var p = { x: 0, y: 0 };

	var ParticleGenerator = EditorComponent.extend({
		init: function() {
			this._super();
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
		}
	});

	var createParticles = function() {
		for (var i=0; i < this.particleAmount; i++) {

			p.x = this.parent.X + this.offsetX;
			p.y = this.parent.Y + this.offsetY;

			Gb.create(this.particleType, this.updateGroup, this.viewports, p);
		}
	}

	return ParticleGenerator;
});