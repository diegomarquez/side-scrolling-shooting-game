define(["editor-component","path-renderer", "player-getter", "draw"], function(EditorComponent, PathRenderer, PlayerGetter, Draw) {
  var Boss_3_Body_Renderer = PathRenderer.extend({
    init: function() {
		this._super();

		this.offset = 'center';
		this.skipCache = true;
		
		this.pointOffsetX = 0;
		this.pointOffsetY = 0;
		this.horizontalCounter = 0;
	
		this.name = 'Boss_3_Body';
		this.width = 200;
		this.height = 200;
		this.largeAnchor = 20;
		this.largeAnchorMultiplier = 40;
		this.pointOffsetMultiplier = 6;
		this.horizontalCounterMultiplier = 20;
		this.offset1 = 75;
		this.offset2 = 100;
		this.lineWidth = 3;

		this.pointsInit = null;
		this.points = null;
    },

    start: function(parent) {
    	this._super(parent);

    	if (typeof this.args.name !== 'string')
    		throw new Error('missing name');
    	
    	if (typeof this.args.width !== 'number')
    		throw new Error('missing width');
    	
    	if (typeof this.args.height !== 'number')
    		throw new Error('missing height');

    	if (typeof this.args.largeAnchor !== 'number')
    		throw new Error('missing largeAnchor');

    	if (typeof this.args.largeAnchorMultiplier !== 'number')
    		throw new Error('missing largeAnchorMultiplier');

    	if (typeof this.args.pointOffsetMultiplier !== 'number')
    		throw new Error('missing pointOffsetMultiplier');

    	if (typeof this.args.horizontalCounterMultiplier !== 'number')
    		throw new Error('missing horizontalCounterMultiplier');

    	if (typeof this.args.offset1 !== 'number')
    		throw new Error('missing offset1');

    	if (typeof this.args.offset2 !== 'number')
    		throw new Error('missing offset2');

    	if (typeof this.args.lineWidth !== 'number')
    		throw new Error('missing lineWidth');

    	this.halfHorizontalCounterMultiplier = ((this.horizontalCounterMultiplier + Math.random() * 10) / 2);
    	this.offset = 'center';

    	this.pointsInit = [
			{ x: 0, y: -this.offset1 },
			{ x: -this.offset1, y: -this.offset1 },
			{ x: -this.offset1 - (this.offset2 - this.offset1)/2, y: -this.offset1/2 },
			{ x: -this.offset2, y: 0 },
			{ x: -this.offset1 - (this.offset2 - this.offset1)/2, y: this.offset1/2 },
			{ x: -this.offset1, y: this.offset1 },
			{ x: 0, y: this.offset1 },
			{ x: this.offset1, y: this.offset1 },
			{ x: this.offset1 + (this.offset2 - this.offset1)/2, y: this.offset1/2 },
			{ x: this.offset2, y: 0 },
			{ x: this.offset1 + (this.offset2 - this.offset1)/2, y: -this.offset1/2 },
			{ x: this.offset1, y: -this.offset1 }
		];

		this.points = [
			{ x: 0, y: -this.offset1 },
			{ x: -this.offset1, y: -this.offset1 },
			{ x: -this.offset1 - (this.offset2 - this.offset1)/2, y: -this.offset1/2 },
			{ x: -this.offset2, y: 0 },
			{ x: -this.offset1 - (this.offset2 - this.offset1)/2, y: this.offset1/2 },
			{ x: -this.offset1, y: this.offset1 },
			{ x: 0, y: this.offset1 },
			{ x: this.offset1, y: this.offset1 },
			{ x: this.offset1 + (this.offset2 - this.offset1)/2, y: this.offset1/2 },
			{ x: this.offset2, y: 0 },
			{ x: this.offset1 + (this.offset2 - this.offset1)/2, y: -this.offset1/2 },
			{ x: this.offset1, y: -this.offset1 }
		];
    },

    update: function(delta) {

    	if (!PlayerGetter.exists())
    		return;

    	this.largeAnchor = Math.cos(this.horizontalCounter) * this.largeAnchorMultiplier;
    	this.pointOffsetX = Math.cos(this.horizontalCounter) * this.pointOffsetMultiplier;
    	this.pointOffsetY = Math.sin(this.horizontalCounter) * this.pointOffsetMultiplier;

    	this.horizontalCounter += (this.horizontalCounterMultiplier * delta) / this.halfHorizontalCounterMultiplier;

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
		context.rotate(this.horizontalCounter / 10);

		Draw.quadraticPolygonAutoSmooth(context, 0, 0, this.largeAnchor, this.points, null, '#FFFFFF', this.lineWidth, 1, true, false);
		context.restore();
    }
  });

  return Boss_3_Body_Renderer;
});
