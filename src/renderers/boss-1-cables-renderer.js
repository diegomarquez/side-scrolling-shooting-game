define(["path-renderer", "path-cache", "draw", "util"], function(PathRenderer, PathCache, Draw, Util) {
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

			this.name = 'Boss1CablesRenderer' + Util.rand_i(0, 7);
			this.offset = 'center';

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

		Draw.realtiveQuadraticPolygonAuto(context, xPos - this.cableThickness/2, this.cableStartHeight - this.baseHeight, this.cableRadius, [
			{ x: 0, y: 0 },
			{ x: left, y: top },
			{ x: right, y: top },
			{ x: left, y: top }
		], null, "#FFFFFF", 1, 1, side, false);

		Draw.realtiveQuadraticPolygonAuto(context, xPos + this.cableThickness/2, this.cableStartHeight - this.baseHeight, this.cableRadius, [
			{ x: 0, y: 0},
			{ x: left, y: top },
			{ x: right, y: top },
			{ x: left, y: top }
		], null, "#FFFFFF", 1, 1, side, false);
	}

  return Boss1CablesRenderer;
});
