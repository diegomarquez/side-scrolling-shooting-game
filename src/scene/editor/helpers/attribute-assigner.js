define(function(require) {
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
	
					toChild.Attributes = fromChild.Attributes;

					if (toChild.childs && fromChild.childs) {
						this.assignFrom(fromChild, toChild);
					}
				}	
    	}
		}
  });

  return new AttributeAssigner();
});
