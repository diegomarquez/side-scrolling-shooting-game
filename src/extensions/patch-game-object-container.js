define(function(require) {
	var gb = require('gb');
	var draw = require('draw');
	var gameObjectContainer = require('game-object-container');
	var gameObject = require('game-object');

	var oldDrawMethod = null;

	var PatchGameObjectContainers = require('extension').extend({
		init: function() {
 
		},

		type: function() {
			return gb.game.CREATE;
		},

		execute: function() { 

			oldDrawMethod = gameObjectContainer.prototype.draw;

			var goPrototypeDraw = gameObject.prototype.draw;

			gameObjectContainer.prototype.draw = function(context, viewport) {
				// Draw only if inside the viewport and is allowed to be drawn
				if (this.canDraw && viewport.isGameObjectInside(this, context)) {
					goPrototypeDraw.call(this, context, viewport);	
				}

				if(gb.debug && !this.skipDebug) {
					// Store current context
					context.save();
					// Reset transformation
					context.setTransform(1, 0, 0, 1, 0, 0);			
					// Apply transformations for the current [viewport](@@viewport@@)
					viewport.transformContext(context);

					if (this.components) {
						// Draw whatever the [components](@@component@@) want to draw in debug mode
						for(var i=0; i<this.components.length; i++) {
							this.components[i].debug_draw(context, viewport, draw, gb);
						}
					}
					// Restore original context
					context.restore();
				}

				if(!this.childs) return;
							
				var child = null;

				for(var i=0; i<this.childs.length; i++){
					child = this.childs[i];

					if (child.isContainer()) {
						// If the child is a container game object... 
						// Call draw method, it will figure out if it actually needs to be drawn, and do the same for it's children
						child.draw(context, viewport);
					} else {
						// If the child is a regular game object...
						// Try to skip drawing as soon as possible
					
						// Draw only if inside the viewport and is allowed to be drawn
						if (child.canDraw && viewport.isGameObjectInside(child, context)) {

							// If there are options for this child, apply them
							if (this.childrenOptions && this.childrenOptions[child.uid]) {
								if(this.childrenOptions[child.uid].draw) {
									child.draw(context, viewport);
								}
							} else {
								// If there are no options, just draw the child
								child.draw(context, viewport);	
							}
						}											
					}
				}
			}
		},

		destroy: function() {
			gameObjectContainer.prototype.draw = oldDrawMethod;
		}    
	});

	return PatchGameObjectContainers;
});
