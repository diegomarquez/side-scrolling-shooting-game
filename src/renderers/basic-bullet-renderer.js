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

			context.strokeStyle = '#FF0000';
			context.lineWidth = 1;
			
			context.beginPath();
			context.arc(0, 0, 10, -Math.PI/2, Math.PI/2, false);	
			
			var startX = 0;
			var startY = -10;
			var zigzagSpacing = 2.5;
			
			context.moveTo(startX, startY);

			for (var n = 0; n < 8; n++) {
				var x = null;
				var y = startY + ((n + 1) * zigzagSpacing);

				if (n % 2 == 0) {
					x = startX + 7.5;
				} else {
					x = startX;
				}

				context.lineTo(x, y);
			}

			context.stroke();
			
			context.restore();
		}
	});

	return BasicBulletRenderer;
});