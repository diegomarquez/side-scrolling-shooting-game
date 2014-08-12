define(["path-renderer"], function(PathRenderer) {
	var MicroStarRenderer = PathRenderer.extend({
		init: function() {
			this._super();

			this.width = 1;
			this.height = 1;
			this.name = "MicroStar";
		},

		drawPath: function(context) { 
			context.save();

			context.beginPath();
			context.rect(0, 0, this.width, this.height);
			context.lineWidth = 1;
			context.strokeStyle = "#FFFFFF";
			context.stroke();
			context.closePath();

			context.restore();
		}
	});

	return MicroStarRenderer;
});


