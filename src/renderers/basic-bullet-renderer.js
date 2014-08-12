define(["path-renderer", "draw"], function(PathRenderer, Draw) {
	var BasicBulletRenderer = PathRenderer.extend({
		init: function() {
			this._super();
		
			this.width = 20;
			this.height = 20;
			this.name = 'BasicBullet';
			this.offset = 'center';
		},

		drawPath: function(context) { 
			context.save();
			
			context.translate(this.width/2, this.height/2);
			Draw.circle(context, 0, 0, 10, "#FF0000");
			
			context.restore();
		}
	});

	return BasicBulletRenderer;
});

