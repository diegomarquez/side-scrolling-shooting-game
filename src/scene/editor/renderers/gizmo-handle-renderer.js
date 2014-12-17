define(["path-renderer", "draw"], function(PathRenderer, Draw) {
	var GizmoHandleRenderer = PathRenderer.extend({
		init: function() {
			this._super();
		},

		start: function() {
			this.width = 10; 
			this.height = 10;
			this.name = 'gizmo-handle-renderer';
			this.offset = 'center';

			this._super();
		},
		
		drawPath: function(context, viewport) {
			Draw.circle(context, 5, 5, 5, '#ff0000');
		}
	});

	return GizmoHandleRenderer;
});


