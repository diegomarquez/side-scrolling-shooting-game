define(function(require) {
	var editorConfig = require('editor-config');

  var AttributeAssigner = require('class').extend({
    init: function() {
    	
    },

    assignFrom: function(from, to) {
			// Assing the attributes from a game object to another one
    	if (to.Attributes && from.Attributes) {
    		to.Attributes = from.Attributes;	
    	}

    	// Assign the attributes of each component from a game object to another one
    	if (from.components && to.components) {
    		for (var i = 0; i < from.components.length; i++) {
				var fromComponent = from.components[i];
				var toComponent = to.components[i];

				// Both components must exists
				if (!fromComponent || !toComponent) continue;

				// Skip Editor Components
				if (editorConfig.isEditorComponent(fromComponent.typeId) || editorConfig.isEditorComponent(toComponent.typeId)) continue;

				if (fromComponent.Attributes && toComponent.Attributes) {
					toComponent.Attributes = fromComponent.Attributes;
				}
			}
    	}

    	// Assign attributes to children recursively
    	if (from.childs && to.childs) {
    		for (var i = 0; i < from.childs.length; i++) {
					var fromChild = from.childs[i];
					var toChild = to.childs[i];
				
					// Both children must exist
					if (!fromChild || !toChild) continue;
		
					// Skip Editor Game Objects
					if (editorConfig.isEditorGameObject(fromChild.typeId) || editorConfig.isEditorGameObject(toChild.typeId)) continue;

					toChild.Attributes = fromChild.Attributes;

					toChild.x = fromChild.x;
					toChild.y = fromChild.y;
					toChild.rotation = fromChild.rotation;
					toChild.scaleX = fromChild.scaleX;
					toChild.scaleY = fromChild.scaleY;

					if (toChild.childs && fromChild.childs) {
						this.assignFrom(fromChild, toChild);
					}
				}	
    		}
		}
  });

  return new AttributeAssigner();
});
