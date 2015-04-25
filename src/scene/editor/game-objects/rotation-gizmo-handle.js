define(function (require) {
	
	var selfMatrix = null;
	var parentMatrix = null;
	var selfTransform = {};
	var parentTransform = {};

	var RotationGizmoHandle = require("game-object").extend({		
		init: function() {
			this._super();
		},

		added: function() { 
			this._super();

			this.x = 50;
			this.y = 0;

      this.on(this.MOUSE_DRAG, this, function(mouseData) {
  			selfMatrix = this.getMatrix(selfMatrix);
				parentMatrix = this.parent.getMatrix(parentMatrix);

				selfTransform = selfMatrix.decompose(selfTransform);
				parentTransform = parentMatrix.decompose(parentTransform);
		
				this.parent.rotation = Math.atan2(selfTransform.y - parentTransform.y, selfTransform.x - parentTransform.x) * (180 / Math.PI);   	
      });	
		},

		start: function() {
			this._super();

			this.Dragable = true;
		},
	});

	return RotationGizmoHandle;
});
