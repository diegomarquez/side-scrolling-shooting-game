define(["path-renderer"], function(PathRenderer) {
	var SmallStarRenderer = PathRenderer.extend({
		init: function() {
			this._super();

			this.width = 5;
			this.height = 5;
			this.name = "SmallStar";
		},

		drawPath: function(context) { 
			context.save();

			context.beginPath();
			context.rect(0, 0, this.width, this.height);
			context.lineWidth = 1;
			context.strokeStyle = "#FFFF00";
			context.stroke();
			context.closePath();

			context.restore();
		}
	});

	return SmallStarRenderer;
});


