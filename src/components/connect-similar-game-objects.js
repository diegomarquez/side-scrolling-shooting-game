define(["component", "gb", "matrix-3x3"], function(Component, Gb, Matrix) {

	var r = {};
	var m = new Matrix();

	var ConnectSimilarGameObjects = Component.extend({
		init: function() {
			this._super();

			this.objectType = '';
			this.childrenToConnect = null;
		},

		start: function(parent) {
			this._super(parent);

			if (!this.objectType)
				throw new Error('Missing objectType attribute');

			this.childrenToConnect = this.parent.findChildren().allWithType(this.objectType);
		},

		debug_draw: function(context, viewport, draw) {
			context.save();

			context.setTransform(1, 0, 0, 1, 0, 0);

			viewport.transformContext(context);

			context.lineWidth = 2;
			context.strokeStyle = 'aquamarine';

			context.beginPath();

			var child = this.childrenToConnect[0];
			r = child.getTransform(r, m);

			context.moveTo(r.x, r.y);

			for (var i = 1; i < this.childrenToConnect.length; i++) {
				child = this.childrenToConnect[i];
				r = child.getTransform(r, m);

				context.lineTo(r.x, r.y);
			}

			context.stroke();

			context.restore();
		}
	});

	return ConnectSimilarGameObjects;
});