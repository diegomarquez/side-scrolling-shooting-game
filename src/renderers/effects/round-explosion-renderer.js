define(["animation-path-renderer", "draw"], function (AnimationPathRenderer, Draw) {
	var RoundExplosion = AnimationPathRenderer.extend({
		init: function() {
			this._super();

			this.width = 50;
			this.height = 50;
			this.name = "round-explosion-renderer";
			this.offset = 'center';
			this.frameDelay = 0.02;

      this.framePaths = [];

      var totalFrames = 11;
     	var radius = this.width/2;

      for (var i = 0; i <= totalFrames; i++) {
				this.framePaths.push(explosionFrame(radius, radius/totalFrames * i, "#FF0000", "#FFFF00"));     	
      }
		}
	});

	var explosionFrame = function(radius, innerRadius, color1, color2) {
		return function(context) {
			var gradient = context.createRadialGradient((radius*2/3), 0, radius/5, 0, 0, radius);
	
			gradient.addColorStop(0.01, color1);
			gradient.addColorStop(0.99, color2);
			
			context.beginPath();

			context.fillStyle = gradient;

			context.translate(radius, radius);
			context.arc(0, 0, radius, 0, Math.PI*2, true);
			context.arc(radius-innerRadius, 0, innerRadius, 0, Math.PI*2, false);
			
			context.fill();

			context.closePath();
		}
	}

	return RoundExplosion;
});