define(["path-renderer", "draw"], function(PathRenderer, Draw) {
  var CannonShooterRenderer = PathRenderer.extend({
    init: function() {
      this._super();

      this.padding = 3;
      this.cannonTipHeight = 5;

      this.width = 22;
      this.height = 5;

      this.offsetY = -this.height/2;
      
      this.name = 'CanonShooter';
    },

    drawPath: function(context) {
      context.save();

      Draw.rectangle(context, this.padding, 0, this.width, this.height, null, '#FFFFFF', 1);
      
      Draw.rectangle(context, this.width-this.cannonTipHeight, 0, this.cannonTipHeight, this.height, null, '#FFFFFF', 1);

      context.restore();
    }
  });

  return CannonShooterRenderer;
});
