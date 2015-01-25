define(["path-renderer", "draw"], function(PathRenderer, Draw) {
  var CannonRenderer = PathRenderer.extend({
    init: function() {
      this._super();

      this.width = 42;
      this.height = 25;
      
      this.name = 'Canon';
      this.offset = 'center';
    },

    drawPath: function(context) {
      context.save();

      Draw.rectangle(context, 1, this.height - 11, 40, 10, null, '#FFFFFF', 1);

      context.strokeStyle = '#FFFFFF';
      context.lineWidth = 1;

      context.beginPath();
      context.arc(40/2 + 1, this.height - 5, 18, Math.PI + Math.PI*0.1, 0 - Math.PI*0.1, false);
      context.stroke();

      context.restore();
    }
  });

  return CannonRenderer;
});
