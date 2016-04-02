define(function(require) {	
	var Common = require("bundle").extend({
		create: function(args) {	
			createComponentPool.call(this, function() { return require('circle-collider') });
			createComponentPool.call(this, function() { return require('polygon-collider') });
			createComponentPool.call(this, function() { return require('fixed-polygon-collider') });

			createComponentPool.call(this, function() { return require('renderer') });
			createComponentPool.call(this, function() { return require('path-renderer') });
			createComponentPool.call(this, function() { return require('bitmap-renderer') });
			createComponentPool.call(this, function() { return require('text-renderer') });
			createComponentPool.call(this, function() { return require('animation-path-renderer') });
			createComponentPool.call(this, function() { return require('animations-path-renderer') });
			createComponentPool.call(this, function() { return require('animation-bitmap-renderer') });
			createComponentPool.call(this, function() { return require('animations-bitmap-renderer') });

			createComponentPool.call(this, function() { return require('sound-component') });
			createComponentPool.call(this, function() { return require('add-component') });

			createComponentPool.call(this, function() { return require('activate-on-view') });
			createComponentPool.call(this, function() { return require('twitch') });

			createGameObjectPool.call(this, function() { return require('game-object') });
			createGameObjectPool.call(this, function() { return require('game-object-container') });			
		}
	});

	var getModuleName = function(module) {
		var moduleName = module.toString().match(/\(['|"](.*?)['|"]\)/)[1];
		return moduleName;
	}

	var createComponentPool = function(module) {
		var name = getModuleName(module);

		this.componentPool.createPool(name, module());
		addIdGetter(name);
	}

	var createGameObjectPool = function(module) {
		var name = getModuleName(module);

		this.gameObjectPool.createDynamicPool(name, module());		
		addIdGetter(name);
	}

	var addIdGetter = function(name) {
		var n = name.split('-').map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); }).join("");
		var method = 'get' + n + 'PoolId';
		Common.prototype[method] = function() { return name; }
	}

	return new Common();
});