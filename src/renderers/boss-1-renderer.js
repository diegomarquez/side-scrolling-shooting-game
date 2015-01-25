define(["path-renderer", "draw"], function(PathRenderer, Draw) {
  var Boss1Renderer = PathRenderer.extend({
    init: function() {
      this._super();
    },

    start: function() {
			this.width = 120;
			this.height = 150;

			this.padding = 5;
			this.corner = 10;
			this.centerSlant = 10;
			this.centerSpace = 7;

			this.name = 'Boss1Renderer';
			this.offset = 'center';

			this._super();
		},

    drawPath: function(context) {
      context.save();

			context.translate(this.padding, 0);

			Draw.relativePolygon(context, 0, 0, [
				{ x:this.corner, y:this.padding },
				{ x: this.width - (this.corner*2) - (this.padding*2), y:0 },
				{ x: this.corner, y:this.corner },
				{ x: 0, y: this.height - (this.corner*2) - (this.padding*2) },
				{ x: -this.corner , y: this.corner },
				{ x: -this.width + (this.corner*2) + (this.padding*2) , y: 0 },
				{ x: -this.corner, y: -this.corner },
				{ x: 0, y: -this.height + (this.corner*2) + (this.padding*2) },
			], null, '#FFFFFF', 1, 1);

			Draw.relativePolygon(context, 0, 0, [
				{ x:0, y:this.height/2 - this.centerSpace },
				{ x:this.width/2 - this.centerSlant, y:0 },
				{ x:this.centerSlant, y:-this.centerSlant },
				{ x:(this.width/2) - this.centerSlant, y:0 }
			], null, '#FFFFFF', 1, 1, false);

			Draw.relativePolygon(context, 0, 0, [
				{ x:0, y:this.height/2 + this.centerSpace },
				{ x:this.width/2 - this.centerSlant, y:0 },
				{ x:this.centerSlant, y:-this.centerSlant },
				{ x:(this.width/2) - this.centerSlant, y:0 }
			], null, '#FFFFFF', 1, 1, false);

			Draw.relativePolygon(context, 0, 0, [
				{ x:0, y:this.corner + this.padding },
				{ x:this.width/2, y:0 },
			], null, '#FFFFFF', 1, 1, false);

			Draw.relativePolygon(context, 0, 0, [
				{ x:this.width/5, y: (this.corner) + (this.padding*2) },
				{ x:this.width/2, y:0 },
			], null, '#FFFFFF', 1, 1, false);	

			Draw.relativePolygon(context, 0, 0, [
				{ x:this.width - this.corner, y:this.height - this.corner - this.padding },
				{ x:-this.width/2, y:0 },
			], null, '#FFFFFF', 1, 1, false);

			Draw.relativePolygon(context, 0, 0, [
				{ x:this.width - this.corner - this.width/5, y:this.height - this.corner - this.padding*2 },
				{ x:-this.width/2, y:0 },
			], null, '#FFFFFF', 1, 1, false);

      context.restore();
    }
  });

  return Boss1Renderer;
});
