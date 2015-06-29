define(["game-object"], function(GameObject) {
	
	var GizmoHandle = GameObject.extend({		
		init: function() {
			this._super();
			this.needsDraggingAdjustment = true;
		},

		getMatrix: function() {
			this.matrix.initialize(1, 0, 0, 1, this.matrix.tx, this.matrix.ty);

			return this.matrix;
		}
	});

	return GizmoHandle;
});
