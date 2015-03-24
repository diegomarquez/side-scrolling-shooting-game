define(["path-renderer", "path-cache", "draw", "util"], function(PathRenderer, PathCache, Draw, Util) {
  
	var rendererCount = 0;

  var Boss1CablesRenderer = PathRenderer.extend({
    init: function() {
      this._super();
    },

    start: function() {
			this.width = 40;
			this.height = 100;

			this.padding = 10;
			this.baseHeight = 10;
			this.basePosition = this.height - this.baseHeight - this.padding;
			this.baseWidth = this.width - this.padding*2;
			
			this.cableCount = this.baseWidth / 5;
			this.cableStartHeight = this.height - this.baseHeight;
			this.cableRadius = 10;
			this.cableStep = this.baseWidth / this.cableCount;
			this.cableThickness = 3;

			this.cableRange = { 
				min: this.baseWidth/10, 
				max: this.baseWidth - ((this.baseWidth/10)*2) 
			}

			this.name = this.typeId + rendererCount;
			this.offset = 'center';

			rendererCount++;

			this._super();
		},

    drawPath: function(context) {
      context.save();

			context.translate(this.padding, 0);

			Draw.rectangle(context, 0, this.basePosition, this.baseWidth, this.baseHeight, null, '#FFFFFF', 1, 1);

			for (var i = 0; i < this.cableCount; i++) {
				drawCable.call(this, context, Util.rand_i(this.cableRange.min, this.cableRange.max/2), false);	
			}

			for (var i = 0; i < this.cableCount; i++) {
				drawCable.call(this, context, Util.rand_i(this.cableRange.max/2, this.cableRange.max), true);	
			}

      context.restore();
    },

    recycle: function() {
			PathCache.clear(this.name);
		}
  });

	var drawCable = function(context, xPos, side) {		
		var left = Util.rand_i(-10, -5);
		var right = Util.rand_i(5, 10);
		var top = Util.rand_i(-20, -15);

		var segments = [];

		segments.push({ x: 0, y: 0 });

		for (var i = 0; i < this.segments; i++) {
			if (i % 2 == 0) {
				segments.push({ x: left, y: top });
			} else {
				segments.push({ x: right, y: top });
			}
		}

		Draw.realtiveQuadraticPolygonAuto(context, xPos - this.cableThickness/2, this.cableStartHeight - this.baseHeight, this.cableRadius, segments, null, "#FFFFFF", 1, 1, side, false);
		Draw.realtiveQuadraticPolygonAuto(context, xPos + this.cableThickness/2, this.cableStartHeight - this.baseHeight, this.cableRadius, segments, null, "#FFFFFF", 1, 1, side, false);
	}

  return Boss1CablesRenderer;
});
