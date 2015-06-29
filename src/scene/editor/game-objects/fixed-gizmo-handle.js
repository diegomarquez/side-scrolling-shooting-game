define(["game-object"], function(GameObject) {
	
	var FixedGizmoHandle = GameObject.extend({		
		init: function() {
			this._super();
		},

		getMatrix: function() {
			var parentMatrix = this.parent.getMatrix();

			this.matrix.initialize(1, 0, 0, 1, parentMatrix.tx + this.x, parentMatrix.ty + this.y);

			return this.matrix;
		}
	});

	return FixedGizmoHandle;
});
