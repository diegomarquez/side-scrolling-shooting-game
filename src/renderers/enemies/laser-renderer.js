define(["path-renderer", "draw"], function(PathRenderer, Draw) {
  var LaserRenderer = PathRenderer.extend({
    init: function() {
		this._super();

		this.width = 800;
		this.height = 30;

		this.name = 'Laser';
		this.skipCache = true;
		this.offsetY = -15;

		this.horizontalCounter = 0;
		this.verticalCounter = 0;
		this.largeAnchor = 0;

		this.largeCurvePoints = [
			{ x: null, y: null },
			{ x: null, y: null },
			{ x: null, y: null }
		];
    },

    update: function(delta) {
    	this.largeAnchor = Math.cos(this.horizontalCounter/15) * 40;
    	
    	this.horizontalCounter += ((Math.random() * 100) + 100) * delta;
    	this.verticalCounter += 100 * delta;
    },

    drawPath: function(context) {
		context.save();

		this.largeCurvePoints[0].x = 0;
		this.largeCurvePoints[0].y = 0;
		this.largeCurvePoints[1].x = this.parent.collisionDistance/2 + Math.cos(this.verticalCounter/20) * this.parent.collisionDistance/4;
		this.largeCurvePoints[1].y = 0;
		this.largeCurvePoints[2].x = this.parent.collisionDistance;
		this.largeCurvePoints[2].y = 0;
		
		Draw.quadraticPolygonAuto(context, 0, 0, -this.largeAnchor, this.largeCurvePoints, null, '#FFFFFF', 3, 1, true, false);

		this.largeCurvePoints[0].x = 0;
		this.largeCurvePoints[0].y = 0;
		this.largeCurvePoints[1].x = this.parent.collisionDistance/2 - Math.cos(this.verticalCounter/50) * this.parent.collisionDistance/4;
		this.largeCurvePoints[1].y = 0;
		this.largeCurvePoints[2].x = this.parent.collisionDistance;
		this.largeCurvePoints[2].y = 0;

		Draw.quadraticPolygonAuto(context, 0, 0, this.largeAnchor, this.largeCurvePoints, null, '#FFFFFF', 3, 1, false, false);

		this.largeCurvePoints[0].x = 0;
		this.largeCurvePoints[0].y = 0;
		this.largeCurvePoints[1].x = this.parent.collisionDistance/3 - Math.cos(this.verticalCounter/15) * this.parent.collisionDistance/4;
		this.largeCurvePoints[1].y = 0;
		this.largeCurvePoints[2].x = this.parent.collisionDistance;
		this.largeCurvePoints[2].y = 0;

		Draw.quadraticPolygonAuto(context, 0, 0, -this.largeAnchor, this.largeCurvePoints, null, '#FFFFFF', 3, 1, false, false);

		context.restore();
    }
  });

  return LaserRenderer;
});
