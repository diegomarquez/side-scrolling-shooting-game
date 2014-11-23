define(function(require) {
	var util = require('util');

	var UIComponent = require('delegate').extend({
		init: function() {
			this._super();
		},

		_destroy: function() {
			this.destroy();

			util.iterateObject(this, function(object, propName) {
				destroyProp(object, propName);
			});
		}

		destroy: function() {}
	});

	var destroyProp = function(object, name) {
		var value = object[name];

		// The _super function property defined in modules extending class.js is omitted completely
		if (name == '_super' && util.isFunction(value)) {
			return;
		}

		// If the property has a destroy method...
		if (value._destroy && util.isFunction(value._destroy)) {
			// Call it
			value._destroy();
		}

		// Skip jQuery objects
		if (util.isObject(value) && !(value instanceof jQuery)) {
			// When the property in the current scope is an Object, try and destroy it recursively. 
			util.iterateObject(value, function (object, propName) {
				destroyProp(object, propName);
			});

			object[name] = null;
			delete object[name];
		}
		else if (util.isArray(value)) {
			// When the property in the current scope is an Array, try and destroy it recursively
			util.iterateArray(value, function (array, element, index) {
				destroyObject(element);
				array[index] = null;
			});

			value.length = 0;
			object[name] = null;
		} else {
			// Anything that is not an Array or an Object is just nulled
			object[name] = null;

			// If the parent object is an Object, use the delete operator
			if (util.isObject(object)) {
				delete object[name];
			} 
		}		
	}

	var destroyObject = function(object) {
		// Iterate through the properties seeing who can be destroyed by calling a destroy() method
		util.iterateObject(object, function (object, propName) {
			destroyProp(object, propName);
		});
	}

	return UIComponent;
});
          