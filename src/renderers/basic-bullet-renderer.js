define(["path-renderer", "draw"], function(PathRenderer, Draw) {
  var BasicBulletRenderer = PathRenderer.extend({
    init: function() {
      this._super();

      this.size = 10;

      this.width = this.size*3;
      this.height = this.size*3;
      this.name = 'BasicBullet';
      this.offset = 'center';
    },

    drawPath: function(context) {
      context.save();

      context.translate(this.width/2, this.height/2);

      context.strokeStyle = '#FF0000';
      context.lineWidth = 1;

      context.beginPath();

      context.moveTo(-this.size, -this.size);
      context.lineTo(0, -this.size);
      context.arc(0, 0, this.size, -Math.PI/2, Math.PI/2, false);
      context.lineTo(-this.size, this.size);

      var startX = -this.size;
      var startY = -this.size;
      var spacing = this.size/4;

      context.moveTo(startX, startY);

      for (var n = 0; n < 8; n++) {
        var x = null;
        var y = startY + ((n + 1) * spacing);

        if (n % 2 == 0) {
          x = startX + (this.size*3/4);
        } else {
          x = startX;
        }

        context.lineTo(x, y);
      }

      context.stroke();

      context.restore();
    }
  });

  return BasicBulletRenderer;
});
