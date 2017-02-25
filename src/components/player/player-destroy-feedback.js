define(['component', 'gb'], function(Component, Gb){

	var PlayerDestroyComponent = Component.extend({
		
		init: function() {
			this._super();
			
			this.dirX;
			this.dirY;
		},

		setDirection: function(dir) {
			if (!dir)
				return;

			dir.normalize();
			
			this.dirX = dir.x;
			this.dirY = dir.y;
		},

		enable: function() {
			this._super();

			this.dirX = -999;
			this.dirY = -999;
		},

		update: function(delta) {
			if (this.dirX === -999 & this.dirY === -999) {
				Gb.reclaimer.mark(this.parent);
				
				this.execute('complete');
			} else {
				this.parent.rotation += 15;

				this.parent.viewportOffsetX -= this.dirX * delta * 150;
				this.parent.viewportOffsetY -= this.dirY * delta * 150;

				if (!this.parent.getViewportVisibility('Main')) {
					Gb.reclaimer.mark(this.parent);
					
					this.execute('complete');
				}
			}
		}
	});

	return PlayerDestroyComponent;
});