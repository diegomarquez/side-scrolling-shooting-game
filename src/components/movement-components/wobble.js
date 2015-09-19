define(['editor-component'], function(Component){
	
	var WobbleComponent = Component.extend({
		
		init: function() {
			this._super();

			this.counterX = 0;
			this.counterY = 0;
		},

		editorStart: function() {
			this.counterX = Math.random() * 100;
			this.counterY = Math.random() * 100;
		},

		editorUpdate: function(delta) {
			this.parent.x -= Math.cos(this.counterX/60);
			this.parent.y += Math.cos(this.counterY/40);
			
			this.counterX += 100 * delta;
			this.counterY += 100 * delta;
		}
	});

	return WobbleComponent;
});

