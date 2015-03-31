define(["path-renderer", "draw"], function(PathRenderer, Draw) {
  var StageArrowRenderer = PathRenderer.extend({
    init: function() {
      this._super();

      this.width = 70;
      this.height = 30;
      
      this.name = 'stage-arrow-renderer';
      this.offset = 'center';
    },

    drawPath: function(context) {
      context.save();

      Draw.relativePolygon(context, 10, 10, [
      	{ x: 0, y: 0 },
      	{ x: 30, y: 0 },
      	{ x: 0, y: -10 },
      	{ x: 20, y: 15 },
      	{ x: -20, y: 15 },
      	{ x: 0, y: -10 },
      	{ x: -30, y: 0 }
      ], this.color, '#FFFFFF', 2, 1, true);

      context.restore();
    }
  });

  return StageArrowRenderer;
});
