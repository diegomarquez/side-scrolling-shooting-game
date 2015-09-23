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

      				// Disable all the components
      				var components = this.parent.findComponents().not().all(function(component) {
						return component.poolId == require('common-bundle').getActivateOnViewPoolId();
					});
					
					if (components) {
						for (var i = 0; i < components.length; i++) {
							components[i].disable();
						}
					}

					if (this.parent.renderer) {
						this.parent.renderer.disable();
					}

      				// This will trigger explosions in another component
      				this.parent.execute('destroyed');
      			}
      		});
		}	
	});

	return DestroyOnHpDepleted;
});