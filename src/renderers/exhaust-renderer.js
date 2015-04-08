define(["animations-path-renderer", "draw"], function(AnimationsPathRenderer, Draw) {
  var ExhaustRenderer = AnimationsPathRenderer.extend({
    init: function() {
      this._super();

      this.width = 50;
      this.height = 30;
      this.frameDelay = 0.1;
      this.startingLabel = 'exhaust-animation',
      this.name = 'exhaust-renderer';
      this.offset = 'center';

      this.framePaths = [
				function(context) {
					context.save();

		      Draw.relativePolygon(context, 45, 10, [
		      	{ x: 0, y: 0 },
		      	{ x: 0, y: -10 },
		      	{ x: -5, y: 10 },
		      	{ x: -5, y: -10 },
		      	{ x: 2.5, y: 10 },
		      	{ x: -50, y: 0 }
		      ], null, '#FFFFFF', 1, 1, false);

		      Draw.relativePolygon(context, 45, 20, [
		      	{ x: 0, y: 0 },
		      	{ x: 0, y: 10 },
		      	{ x: -5, y: -10 },
		      	{ x: -5, y: 10 },
		      	{ x: 2.5, y: -10 },
		      	{ x: -50, y: 0 }
		      ], null, '#FFFFFF', 1, 1, false);

		      context.restore();
				},
				function(context) {
					context.save();

		      Draw.relativePolygon(context, 45, 10, [
		      	{ x: 0, y: 0 },
		      	{ x: -5, y: -10 },
		      	{ x: 0, y: 10 },
		      	{ x: -15, y: -5 },
		      	{ x: 10, y: 5 },
		      	{ x: -50, y: 0 }
		      ], null, '#FFFFFF', 1, 1, false);

		      Draw.relativePolygon(context, 45, 20, [
		      	{ x: 0, y: 0 },
		      	{ x: -5, y: 10 },
		      	{ x: 0, y: -10 },
		      	{ x: -15, y: 5 },
		      	{ x: 10, y: -5 },
		      	{ x: -50, y: 0 }
		      ], null, '#FFFFFF', 1, 1, false);

		      context.restore();
				},
				function(context) {
					context.save();

		      Draw.relativePolygon(context, 45, 10, [
		      	{ x: 0, y: 0 },
		      	{ x: -2.5, y: -10 },
		      	{ x: -2.5, y: 10 },
		      	{ x: -10, y: -10 },
		      	{ x: 2.5, y: 10 },
		      	{ x: -50, y: 0 }
		      ], null, '#FFFFFF', 1, 1, false);

		      Draw.relativePolygon(context, 45, 20, [
		      	{ x: 0, y: 0 },
		      	{ x: -2.5, y: 10 },
		      	{ x: -2.5, y: -10 },
		      	{ x: -10, y: 10 },
		      	{ x: 2.5, y: -10 },
		      	{ x: -50, y: 0 }
		      ], null, '#FFFFFF', 1, 1, false);

		      context.restore();
				}
			],

			this.labels = {
				'exhaust-animation': {
					loop: true,	
					frames: [0, 2, 1]
				}
			}
    },

    
  });

  return ExhaustRenderer;
});
