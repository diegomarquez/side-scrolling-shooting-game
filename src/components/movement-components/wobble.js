define(['editor-component'], function(Component){
	
	var WobbleComponent = Component.extend({
		
		init: function() {
			this._super();

			this.counterX = 0;
			this.counterY = 0;

			this.speedX = 0;
			this.speedY = 0;
			
			this.amplitudeX = 0;
			this.amplitudeY = 0;
		},

		editorStart: function() {
			this.speedX = this.speedX || 1.5;
			this.speedY = this.speedY || 1.3;
			
			this.amplitudeX = this.amplitudeX || 1;
			this.amplitudeY = this.amplitudeY || 1;

			this.counterX = Math.random() * this.speedX;
			this.counterY = Math.random() * this.speedY;
		},

		editorUpdate: function(delta) {
			this.parent.x -= Math.cos(this.counterX) * this.amplitudeX;
			this.parent.y += Math.cos(this.counterY) * this.amplitudeY;
			
			this.counterX += this.speedX * delta;
			this.counterY += this.speedY * delta;
		},

		recycle: function() {
			this.speedX = 0;
			this.speedY = 0;

			this.amplitudeX = 0;
			this.amplitudeY = 0;

			this._super();
		}
	});

	return WobbleComponent;
});

