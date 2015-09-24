define(["editor-component"], function(Component) {
	var FollowTarget = Component.extend({
		init: function() {
			this._super();
		},

		editorStart: function(parent) {
			
		},

		editorUpdate: function(delta) {
			if (!this.parent.target)
				return;

			var deltaX = this.parent.target.X - this.parent.X ;
			var deltaY = this.parent.target.Y - this.parent.Y;

			var angle = Math.atan2(deltaY, deltaX);

			if (angle < 0) {
				angle += 2 * Math.PI;
			}

			this.parent.x += Math.cos(angle) * delta * this.parent.speed; 
      		this.parent.y += Math.sin(angle) * delta * this.parent.speed;
		}
	});

	return FollowTarget;
});