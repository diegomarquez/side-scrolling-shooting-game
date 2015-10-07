define(["editor-component","path-renderer", "player-getter", "draw"], function(EditorComponent, PathRenderer, PlayerGetter, Draw) {
  var Boss_3_Body_Renderer = PathRenderer.extend({
    init: function() {
		this._super();

		this.width = 200;
		this.height = 200;
		this.offset = 'center';

		this.name = 'Boss_3_Body';
		this.skipCache = true;
		
		this.horizontalCounter = 0;
		this.largeAnchor = 20;

		this.pointOffsetX = 0;
		this.pointOffsetY = 0;

		this.pointsInit = [
			{ x: 0, y: -75 },
			{ x: -75, y: -75 },
			{ x: -75 - (100 - 75)/2, y: -75/2 },
			{ x: -100, y: 0 },
			{ x: -75 - (100 - 75)/2, y: 75/2 },
			{ x: -75, y: 75 },
			{ x: 0, y: 75 },
			{ x: 75, y: 75 },
			{ x: 75 + (100 - 75)/2, y: 75/2 },
			{ x: 100, y: 0 },
			{ x: 75 + (100 - 75)/2, y: -75/2 },
			{ x: 75, y: -75 },
			{ x: 0, y: -75 }
		];

		this.points = [
			{ x: 0, y: -75 },
			{ x: -75, y: -75 },
			{ x: -75 - (100 - 75)/2, y: -75/2 },
			{ x: -100, y: 0 },
			{ x: -75 - (100 - 75)/2, y: 75/2 },
			{ x: -75, y: 75 },
			{ x: 0, y: 75 },
			{ x: 75, y: 75 },
			{ x: 75 + (100 - 75)/2, y: 75/2 },
			{ x: 100, y: 0 },
			{ x: 75 + (100 - 75)/2, y: -75/2 },
			{ x: 75, y: -75 },
			{ x: 0, y: -75 }
		];
    },

    start: function(parent) {
    	this._super(parent);

    	this.offset = 'center';	
    },

    update: function(delta) {

    	if (!PlayerGetter.exists())
    		return;

    	this.largeAnchor = Math.cos(this.horizontalCounter) * 40;
    	this.pointOffsetX = Math.cos(this.horizontalCounter) * (6);
    	this.pointOffsetY = Math.sin(this.horizontalCounter) * (6);

    	this.horizontalCounter += (30 * delta)/15;

    	for (var i = 0; i < this.points.length; i++) {
    		if (i % 2 == 0) {
    			this.points[i].x = this.pointsInit[i].x - this.pointOffsetX;
    			this.points[i].y = this.pointsInit[i].y - this.pointOffsetY;
    		} else {
    			this.points[i].x = this.pointsInit[i].x + this.pointOffsetX;
    			this.points[i].y = this.pointsInit[i].y + this.pointOffsetY;
    		}
    	}
    },

    drawPath: function(context) {
		context.save();

		context.translate(0, 0);

		context.lineJoin = 'round';
		context.lineCap = 'round';

		Draw.quadraticPolygonAuto(context, 0, 0, this.largeAnchor, this.points, null, '#FFFFFF', 3, 1, true, true);
		context.restore();
    }
  });

  return Boss_3_Body_Renderer;
});
