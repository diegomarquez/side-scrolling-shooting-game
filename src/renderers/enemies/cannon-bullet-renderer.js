define(["path-renderer", "draw"], function(PathRenderer, Draw) {
  var CannonBulletRenderer = PathRenderer.extend({
    init: function() {
      this._super();

      this.width = 20;
      this.height = 20;

      this.name = 'CannonBullet';
      this.offset = 'center';
    },

    drawPath: function(context) {
      context.save();

      context.translate(this.width/2, this.height/2);

      Draw.circle(context, 0, 0, 10, null, '#FFFFFF', 1);
      Draw.circle(context, 3, 3, 5, null, '#FFFFFF', 1);

      context.restore();
    }
  });

  return CannonBulletRenderer;
});
