define(function(require) {
	var gb = require('gb');
	var gameObjectConfiguration = require('game-object-configuration');
	
	var PatchGameObjectConfiguration = require('extension').extend({
		init: function() {
 
		},

		type: function() {
			return gb.game.CREATE;
		},

		execute: function() { 	
			
			Object.defineProperty(gameObjectConfiguration.prototype, "childConfig", { 
				configurable: true,
				enumerable: true,
				writable: true,
				value: false
			});

			gameObjectConfiguration.prototype.childOnly = function() {
				this.childConfig = true;
				return this;
			}

			gameObjectConfiguration.prototype.isChild = function() {
				return this.childConfig;
			}

			Object.defineProperty(gameObjectConfiguration.prototype, "customConfig", { 
				configurable: true,
				enumerable: true,
				writable: true,
				value: false			
			});

			gameObjectConfiguration.prototype.custom = function() {
				this.customConfig = true;
				return this;
			}

			gameObjectConfiguration.prototype.isCustom = function() {
				return this.customConfig;
			}
		},

		destroy: function() {
			delete gameObjectConfiguration.prototype.childConfig;
			delete gameObjectConfiguration.prototype.childOnly;
			delete gameObjectConfiguration.prototype.isChild;

			delete gameObjectConfiguration.prototype.customConfig;
			delete gameObjectConfiguration.prototype.custom;
			delete gameObjectConfiguration.prototype.isCustom;
		}    
	});

	return PatchGameObjectConfiguration;
});
