define(['component', 'gb'], function(Component, Gb){

	var PlayerDestroyComponent = Component.extend({
		
		init: function() {
			this._super();
			
			this.dirX;
			this.dirY;
		},

		setDirection: function(dir) {
			dir.scale(2, 2);
			
			this.dirX = dir.x;
			this.dirY = dir.y;
		},

		enable: function() {
			this._super();
		},

		update: function(delta) {
			this.parent.rotation += 15;

			this.parent.viewportOffsetX -= this.dirX * delta * 300;
			this.parent.viewportOffsetY -= this.dirY * delta * 300;

			if (!this.parent.getViewportVisibility('Main')) {
				Gb.reclaimer.mark(this.parent);
				
				this.execute('complete');
			}
		}
	});

	return PlayerDestroyComponent;
});