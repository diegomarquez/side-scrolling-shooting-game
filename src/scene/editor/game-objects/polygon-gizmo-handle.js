define(function (require) {
	var PolygonGizmoHandle = require("gizmo-handle").extend({
		init: function() {
			this._super();

			this.pointIndex = null;
		},

		added: function() {
			this._super();
		 
			var parentCollider = this.parent.findComponents().firstWithProp('collider');

			this.x = parentCollider.Points[this.pointIndex].x;
			this.y = parentCollider.Points[this.pointIndex].y;
		
			var startX, startY;

			this.on(this.MOUSE_DRAG_START, this, function(mouseData) {
				startX = parentCollider.Points[this.pointIndex].x;
				startY = parentCollider.Points[this.pointIndex].y;
			});

			this.on(this.MOUSE_DRAG, this, function(mouseData) {
				parentCollider.Points[this.pointIndex].x = mouseData.go.X;
				parentCollider.Points[this.pointIndex].y = mouseData.go.Y;
			});

			this.on(this.MOUSE_DRAG_END, this, function(mouseData) {
				var polik = require("polik");

				var convertedPoints = polik.convertCoordinates(parentCollider.Points);

				if (!polik.IsConvex(convertedPoints) || !polik.IsSimple(convertedPoints)) {
					parentCollider.Points[this.pointIndex].x = startX;
					parentCollider.Points[this.pointIndex].y = startY;

					this.x = startX;
					this.y = startY;

					var logger = require("gb").game.get_extension(require('logger'));

					logger.error("Collider polygon is not valid");
					logger.show();
					setTimeout(logger.hide, 3000);
				}
			});

			parentCollider.on(parentCollider.CHANGE_POINTS, this, function(points) {
				this.x = points[this.pointIndex].x;
				this.y = points[this.pointIndex].y;
			});
		},

		start: function() {
			this._super();

			this.Dragable = true;
		}
	});

	return PolygonGizmoHandle;
});
