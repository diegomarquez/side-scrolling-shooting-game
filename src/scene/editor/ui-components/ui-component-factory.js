define(function(require){
	var ComponentFactory = function() {}

	ComponentFactory.prototype.getController = function() {
		if (arguments.length == 1) {
			return new (require('ui-component-controller'))(arguments[0]);
		} 

		if (arguments.length == 2) {
			return new (require('ui-component-controller').extend(arguments[0]))(arguments[1]);
		}

		throw new Error('ui-component-factory.js: Wrong number of arguments');
	}

	return new ComponentFactory();
});