define(function(require) {
  var vector2D = require('vector-2D');
  var util = require('util'); 

  var AttributeComparer = require('class').extend({
    init: function() {
    	
    },

    getChanges: function(object) {
			var changes = {};

			// To be editted an object must implement this getter, 
			// which should return an object with all of it's editable properties
			// If this getter is not here, it is assumed the object is not editable to begin with
			if (!object.Attributes) return null;

			// Loop through the properties that can change
			for (var k in object.Attributes) {
				var attribute = object.Attributes[k];
				var objectProperty = object.args[k];

				var attributeIsObject = util.isObject(attribute);
				var propertyIsObject = util.isObject(objectProperty);
				var attributeIsArray = util.isArray(attribute);
				var propertyIsArray = util.isArray(objectProperty);
				var attributeIsFunction = util.isFunction(attribute);
				var propertyIsFunction = util.isFunction(objectProperty);

				// If any of the values is a function, skip it
				if (attributeIsFunction || propertyIsFunction) {
					continue;
				}

				// If the attribute to check is any sort of collection...
				if ((attributeIsObject && propertyIsObject) || (attributeIsArray && propertyIsArray) ) {
					// Check if the collections are equal value by value
					if (!areCollectionsEqual(attribute, objectProperty)) {
						// If they are not store the attribute
						changes[k] = attribute;
					}
				}

				// Properties that are not Objects or Arrays are compared by value, if there is a difference they stored in the result object
				if (!attributeIsObject && !attributeIsArray && !propertyIsObject && !propertyIsArray) {				
					if (!areEqual(attribute, objectProperty)) {
						changes[k] = attribute;
					}	
				}		
			}

			// Return something only if there were some changes
			if (Object.keys(changes).length > 0) {
				return changes;
			}
		}
  });

	var areCollectionsEqual = function(first, second) {
		if (Object.keys(first).length != Object.keys(second).length) {
			return false;
		}

		for (var k in first) {
			if (!areEqual(first[k], second[k])) {
				return false;
			}
		}

		return true;
	}

	var areEqual = function(first, second) {
		// Test special comparisons first
		// Vector 2D
		if (vector2D.isVector(first) && vector2D.isVector(second)) {
			return first.equal(second);		
		}

		// Default case, objects are just compared by value
		return first == second;
	}

  return new AttributeComparer();
});
