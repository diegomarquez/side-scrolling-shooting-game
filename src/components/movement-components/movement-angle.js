define(["component", "timer-factory"], function(Component, TimerFactory) {
	var MovementAngle = Component.extend({
		init: function() {
			this._super();
		},

		start: function(parent) {
			if (this.parent.spread) {
				this.parent.angle += this.parent.spread;
			}

			if (this.parent.moveTime) {
				TimerFactory.get(this, 'moveTimer', 'moveTimer');

				this.moveTimer.on('complete', function() {
					this.disable();
				}, true);

				this.moveTimer.configure({ delay: this.parent.moveTime });
				this.moveTimer.start();			
			}
		},

		update: function(delta) {
			this.parent.x += Math.cos(this.parent.angle) * delta * this.parent.speed; 
      		this.parent.y += Math.sin(this.parent.angle) * delta * this.parent.speed;
		},

		recycle: function() {
			if (this.moveTimer)
				this.moveTimer.remove();
		}
	});

	return MovementAngle;
});