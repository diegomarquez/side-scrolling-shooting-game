define(['component', 'gb'], function(Component, Gb){

	var PlayerDestroyComponent = Component.extend({
		
		init: function() {
			this._super();
			
			this.dir = null;
		},

		setDirection: function(dir) {
			this.dir = dir;
			this.dir.scale(2, 2);			
		},

		enable: function() {
			this._super();
		},

		update: function(delta) {
			this.parent.rotation += 15;

			this.parent.viewportOffsetX -= this.dir.x * delta * 300;
			this.parent.viewportOffsetY -= this.dir.y * delta * 300;

			if (!this.parent.getViewportVisibility('Main')) {
				Gb.reclaimer.mark(this.parent);
			}
		}
	});

	return PlayerDestroyComponent;
});