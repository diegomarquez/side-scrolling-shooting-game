define(["path-renderer", "path-cache", "draw", "timer-factory"], function(PathRenderer, PathCache, Draw, TimerFactory) {
	var LoopArrow = PathRenderer.extend({
		init: function() {
			this._super();

			this.paddingTop = 12;
			this.paddingLeft = 5;

			this.width = 102;
			this.height = 204;
			this.name = "loop-arrow";

			this.arrowWidth = (this.width - (this.paddingLeft*2)) * (3/4);
			this.arrowHeadWidth = (this.width - (this.paddingLeft*2)) * (1/4);
			this.innerHeight = (this.height - (this.paddingTop*2) - (this.arrowHeadWidth/2) - (this.arrowHeadWidth) );

			this.squaresToDraw = 0;
		},

		start: function() {
			this._super();

			TimerFactory.get(this, 'lineTimer', 'lineTimer');
      		this.lineTimer.configure({ delay: 200, repeatCount:-1, removeOnComplete:false});

      		this.lineTimer.start();

			this.lineTimer.on('repeate', function(repeatCount) {
				if (!this.squares) return;

				this.squaresToDraw = repeatCount % this.squares.length

				PathCache.cache(this.name, this.width, this.height, function(context) {
					this.drawPath(context);	
				}.bind(this));
			}, false, false);
		},

		drawPath: function(context) { 
			context.save();

			Draw.relativePolygon(context, 0, 0, [
				{ x: this.paddingLeft, y: this.paddingTop },
				{ x: this.arrowWidth, y: 0 },
				{ x: 0, y: -this.arrowHeadWidth/2 },
				{ x: this.arrowHeadWidth, y: this.arrowHeadWidth },
				{ x: -this.arrowHeadWidth, y: this.arrowHeadWidth },
				{ x: 0, y: -this.arrowHeadWidth/2 },
				{ x: - this.arrowWidth + this.arrowHeadWidth, y: 0 },
				{ x: 0, y: this.innerHeight },
				{ x: this.arrowWidth, y: 0 },
				{ x: 0, y: this.arrowHeadWidth },
				{ x: - this.arrowWidth - this.arrowHeadWidth, y: 0 }
			], null, "#FFFFFF", 2, 1, true);

			if (this.squares) {
				for (var i = 0; i < this.squaresToDraw; i++) {
					this.squares[i]();
				}
			} else {
				this.squares = [];

				for (var i=5-1; i >= 0; i--) {
					this.squares.push(function (i, left, top) {
						return function () {
							Draw.rectangle(context, left + 4 + (16*i) + i, top + 2 + (16*10) + 10, 16, 16, "#FFFFFF", null, 1, true);
						}
					}(i, this.paddingLeft, this.paddingTop));	
				}

				for (var i=11-1; i >= 0; i--) {
					this.squares.push(function (i, left, top) {
						return function () {
							Draw.rectangle(context, left + 4, top + 2 + (16*i) + i, 16, 16, "#FFFFFF", null, 1, true);	
						}
					}(i, this.paddingLeft, this.paddingTop));	
				}

				for (var i=0; i < 5; i++) {
					this.squares.push(function (i, left, top) {
						return function () {
							Draw.rectangle(context, left + 4 + (16*i) + i, top + 2 + (16*0) + 0, 16, 16, "#FFFFFF", null, 1, true);		
						}
					}(i, this.paddingLeft, this.paddingTop));
				}
			}

			context.restore();
		},

		recycle: function() {
			this.lineTimer.remove();
		}
	});

	return LoopArrow;
});


