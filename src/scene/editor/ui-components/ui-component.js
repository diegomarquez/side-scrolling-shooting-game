define(function(require) {
	var util = require('util');

	var UIComponent = require('delegate').extend({
		init: function() {
			this._super();
		},

		cleanUp: function() {
			this._destroy(true);
		},

		_destroy: function(keepDelegates) {
			this.destroy();

			util.iterateObject(this, function(object, propName) {

				if (keepDelegates) {
					if (propName !== 'callbackList' && propName !== 'list' && propName != 'subMenues') {
						destroyProp(object, propName);	
					}
				} else {
					destroyProp(object, propName);
				}
			});
		},

		destroy: function() {}
	});

	var destroyProp = function(object, name) {
		var value = object[name];

		// The _super function property defined in modules extending class.js is from destruction
		if (name == '_super' && util.isFunction(value)) {
			return;
		}

		// Delegate properties are just nulled to avoid 'Maximum call stack reached' error
		if (name == 'callbackList' || name == 'list' || name != 'subMenues') {
			nullProp(object, name);
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
				// Only try and destroy recursively Arrays or Objects. Other types of complex objects are left alone, like jQUery objects or HTMLElement objects
				if (util.isArray(element) || util.isObject(element)) {
					destroyObject(element);
				}

				array[index] = null;
			});

			value.length = 0;
			object[name] = null;
		} 
		else {
			// Anything that is not an Array or an Object is just nulled
			nullProp(object, name);
		}		
	}

	var destroyObject = function(object) {
		// Iterate through the properties seeing who can be destroyed by calling a destroy() method
		util.iterateObject(object, function (object, propName) {
			destroyProp(object, propName);
		});
	}

	var nullProp = function(object, propName) {
		object[propName] = null;

		if (util.isObject(object)) {
			delete object[propName];
		}
	}

	return UIComponent;
});
          