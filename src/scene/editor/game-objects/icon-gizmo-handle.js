define(function (require) {
	
	var r = {};
	var m = new (require("matrix-3x3"))();
	
	var contextMenu = new (require('control-object-context-menu'))().create();

	var IconGizmoHandle = require("game-object").extend({		
		init: function() {
			this._super();
		},

		added: function() { 
			this._super();

			this.on(this.MOUSE_DRAG_END, this, function(mouseData) {
				r = this.getTransform(r, m);

				this.parent.x = r.x;
				this.parent.y = r.y;

				this.x = 0;
				this.y = 0;
			});

			this.on(this.CONTEXT_MENU, this, function(mouseData) {
     			contextMenu.show(mouseData);
    		});
		},

		start: function() {
			this._super();

			this.Dragable = true;
		}
	});

	return IconGizmoHandle;
});
