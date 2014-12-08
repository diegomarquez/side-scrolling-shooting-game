define(["game-object", "gb", "vector-2D"], function(GameObject, Gb, Vector2D) {
	
	var parentPos = new Vector2D();
	var handlePos = new Vector2D();

	var GizmoHandle = GameObject.extend({		
		init: function() {
			this._super();
		},

		reset: function() {
			this._super();
		},

		added: function() { 
			var parentCollider = this.parent.findComponents().firstWithProp('collider');

			this.on(this.CLICK, this, function(mouseData) {
                
      });

			this.on(this.MOUSE_DRAG_START, this, function(mouseData) {
        
      });

      this.on(this.MOUSE_DRAG_END, this, function(mouseData) {
        
      });

      this.on(this.MOUSE_DRAG, this, function(mouseData) {
    	  parentPos.x = 0;
				parentPos.y = 0;

				handlePos.x = mouseData.go.x;
				handlePos.y = mouseData.go.y;

      	parentCollider.collider.r = parentPos.distance(handlePos);
      });
		},

		configure: function(args) {
			this._super(args);	
		},

		start: function() {
			this._super();

			this.Dragable = true;
			this.x = 20;
      this.y = 0;
		},

		update: function(delta) {
			this._super(delta);
		},

		destroy: function() {
			this._super();
		}
	});

	return GizmoHandle;
});
