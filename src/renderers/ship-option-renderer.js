define(["path-renderer", "draw", "vector-2D"], function(PathRenderer, Draw, Vector) {
	var ShipOptionRenderer = PathRenderer.extend({
		init: function() {
			this._super();
	
			this.width = 30;
			this.height = 30;
			this.name = "ship-option-renderer";
			this.offset = "center";

			this.size = 30;
			this.color = "#FFFFFF";
	
			this.innerCircle = this.size*0.3;
			this.middleCircle = this.size*0.4;
			this.outerCircle = this.size*0.5;
			this.detailSize = this.size*0.025;
		},

		drawPath: function(context) {
			context.strokeStyle = this.color;

			context.beginPath();

			context.translate(this.width/2, this.height/2);
			
			Draw.circle(context, 0, 0, this.innerCircle, null, this.color, 1);
			Draw.circle(context, 0, 0, this.outerCircle, null, this.color, 1);

			var angleStep = 360/8;
			for(var i = 0; i < 8; i++) {
				Draw.circle(context, Math.cos((angleStep*i)*(Math.PI/180)) * this.middleCircle, 
										  Math.sin((angleStep*i)*(Math.PI/180)) * this.middleCircle, 
										  this.detailSize, this.color, null, 1);
			}

			context.closePath();
		}
	});

	return ShipOptionRenderer;
});


