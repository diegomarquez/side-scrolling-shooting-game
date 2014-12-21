define(["path-renderer", "path-cache", "draw", "vector-2D"], function(PathRenderer, PathCache, Draw, Vector) {
	var ShipRenderer = PathRenderer.extend({
		init: function() {
			this._super();

			this.size = 30;
			this.color = "#FFFFFF";
	
			this.exhaustOffset    = this.size*0.3;
			this.exhaustRadius    = this.size*0.8;
			this.engineSize       = this.size*0.7
			this.innerWindow      = this.size*0.3;
			this.outerWindow      = this.size*0.5;
			this.middleWindow     = this.size*0.4;
			this.middleDetailSize = this.size*0.025;

			var x1 = Math.cos(270*(Math.PI/180)) * this.size;
			var y1 = Math.sin(270*(Math.PI/180)) * this.size;

			var x2 = Math.cos(30*(Math.PI/180)) * this.size;
			var y2 = Math.sin(30*(Math.PI/180)) * this.size;

			var x3 = Math.cos(150*(Math.PI/180)) * this.size;
			var y3 = Math.sin(150*(Math.PI/180)) * this.size;

			var ax1 = Math.cos(330*(Math.PI/180)) * this.size;
			var ay1 = Math.sin(330*(Math.PI/180)) * this.size;

			var ax2 = Math.cos(90*(Math.PI/180)) * this.size;
			var ay2 = Math.sin(90*(Math.PI/180)) * this.size;

			var ax3 = Math.cos(210*(Math.PI/180)) * this.size;
			var ay3 = Math.sin(210*(Math.PI/180)) * this.size;


			this.points = [new Vector(x1,y1),
						   new Vector(ax1,ay1),
						   new Vector(x2,y2),
						   new Vector(ax2,ay2),
						   new Vector(x3,y3),
						   new Vector(ax3,ay3)];
			
			this.width = 60;
			this.height = 70;
			this.name = "ship-renderer";
			this.offset = "center";
		},

		drawPath: function(context) {
			context.strokeStyle = this.color;

			context.beginPath();

			context.translate(this.width/2, this.height/2);

			context.moveTo(0, this.exhaustOffset);
			context.arc(0, this.exhaustOffset, this.exhaustRadius, 55*(Math.PI/180), 65*(Math.PI/180));
			context.closePath();

			context.moveTo(0, this.exhaustOffset);
			context.arc(0, this.exhaustOffset, this.exhaustRadius, 85*(Math.PI/180), 95*(Math.PI/180));
			context.closePath();

			context.moveTo(0, this.exhaustOffset);
			context.arc(0, this.exhaustOffset, this.exhaustRadius, 115*(Math.PI/180), 125*(Math.PI/180));
			context.closePath();

			context.stroke();

			Draw.circle(context, 0, this.exhaustOffset, this.engineSize, "#000000", this.color, 1);
			Draw.quadraticPolygon(context, 0, 0, this.points, "#000000", this.color, 1);
			Draw.circle(context, 0, 0, this.innerWindow, null, this.color, 1);
			Draw.circle(context, 0, 0, this.outerWindow, null, this.color, 1);

			var angleStep = 360/8;
			for(var i = 0; i < 8; i++) {
				Draw.circle(context, Math.cos((angleStep*i)*(Math.PI/180)) * this.middleWindow, 
										  Math.sin((angleStep*i)*(Math.PI/180)) * this.middleWindow, 
										  this.middleDetailSize, this.color, null, 1);
			}

		}
	});

	return ShipRenderer;
});


