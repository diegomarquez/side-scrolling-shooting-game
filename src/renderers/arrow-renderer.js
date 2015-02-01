define(["path-renderer", "path-cache", "draw", "timer-factory"], function(PathRenderer, PathCache, Draw, TimerFactory) {
  var ArrowRenderer = PathRenderer.extend({
    init: function() {
      this._super();

      this.width = 20;
      this.height = 20;
      
      this.name = 'arrow-renderer';
      this.offset = 'center';
    },

    start: function() {
    	this._super();

    	TimerFactory.get(this, 'colorTimer', 'colorTimer');
      this.colorTimer.configure({ delay: 500, repeatCount:-1, removeOnComplete:false});

      this.colorTimer.start();

      this.color1 = "#FF0000";
      this.color2 = null;
      this.color = this.color2;

			this.colorTimer.on('repeate', function(repeatCount) {
				if (repeatCount % 2 == 0) {
					this.color = this.color1;
				} else {
					this.color = this.color2;
				}

				PathCache.cache(this.name, this.width, this.height, function(context) {
					this.drawPath(context);	
				}.bind(this));
			}, false, false);
    },

    drawPath: function(context) {
      context.save();

      Draw.relativePolygon(context, 2, 2, [
      	{ x: 0, y: 0 },
      	{ x: 16, y: 0 },
      	{ x: -8, y: 16 }
      ], this.color, '#FFFFFF', 2, 1, true);

      context.restore();
    },

    recycle: function() {
    	this.colorTimer.remove();
    }
  });

  return ArrowRenderer;
});
