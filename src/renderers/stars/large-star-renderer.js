define(["path-renderer"], function(PathRenderer) {
	var LargeStarRenderer = PathRenderer.extend({
		init: function() {
			this._super();

			this.width = 20;
			this.height = 20;
			this.name = "LargeStar";
		},

		drawPath: function(context) { 
			context.save();

			context.beginPath();
			context.rect(0, 0, this.width, this.height);
			context.lineWidth = 1;
			context.strokeStyle = "#FF0000";
			context.stroke();
			context.closePath();

			context.restore();
		}
	});

	return LargeStarRenderer;
});


