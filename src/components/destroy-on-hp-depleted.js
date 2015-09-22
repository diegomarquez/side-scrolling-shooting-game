define(["editor-component"], function(Component) {
	var DestroyOnHpDepleted = Component.extend({
		init: function() {
			this._super();
		},

		editorStart: function(parent) {
			if (!this.parent.hp)
				throw new Error("Parent has no hp, it's either 0 or missing");

      		this.parent.on('collide', this, function() {
      			if (this.parent.hp > 0) {
      				this.parent.hp--;
      			} else {
      				// Disable the collider on the parent
      				this.parent.findComponents().firstWithProp('collider').disable();
      				// This will trigger explosions in another component
      				this.parent.execute('destroyed');
      			}
      		});
		}	
	});

	return DestroyOnHpDepleted;
});