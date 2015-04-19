define(["path-renderer"], function(PathRenderer) {
	var MediumStarRenderer = PathRenderer.extend({
		init: function() {
			this._super();

			this.width = 10;
			this.height = 10;
			this.name = "MediumStar";
		},

		drawPath: function(context) { 
			context.save();

			context.beginPath();
			context.rect(0, 0, this.width, this.height);
			context.lineWidth = 1;
			context.strokeStyle = "#00FF00";
			context.stroke();
			context.closePath();

			context.restore();
		}
	});

	return MediumStarRenderer;
});


