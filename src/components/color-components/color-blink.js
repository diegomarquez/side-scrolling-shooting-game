define(['component', 'gb'], function(Component, Gb, TimerFactory){

	var ColorBlinkComponent = Component.extend({
		init: function() {
			this._super();

			this.r = 0;
			this.g = 0;
			this.b = 0;
			
			this.interval = 0;
			
			this.frameCounter = 0;
			this.isTinting = true;
		},

		enable: function() {
			this._super();

			this.frameCounter = 0;
			this.isTinting = true;
			
			this.parent.renderer.tint(this.r, this.g, this.b);
		},
		
		update: function(delta) {
			this.frameCounter++;
			
			if (this.frameCounter % this.interval === 0) {
				if (this.isTinting) {
					this.isTinting = false;
					this.parent.renderer.disableTint();
				}
				else
				{
					this.isTinting = true;
					this.parent.renderer.tint(255, 0, 0);
				}
			}
		},
		
		disable: function() {
			this._super();
			
			this.isTinting = false;
			this.parent.renderer.disableTint();
		}
	});

	return ColorBlinkComponent;
});