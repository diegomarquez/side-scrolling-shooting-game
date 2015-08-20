define(function(require) {
	var gb = require('gb');
	var gameObjectConfiguration = require('game-object-configuration');
	var componentConfiguration = require('component-configuration');
	
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

			Object.defineProperty(gameObjectConfiguration.prototype, "mouseSupport", { 
				configurable: true,
				enumerable: true,
				writable: true,
				value: true			
			});

			gameObjectConfiguration.prototype.disableMouseSupport = function() {
				this.mouseSupport = false;
				return this;
			}

			gameObjectConfiguration.prototype.hasMouseSupport = function() {
				return this.mouseSupport;
			}

			// Object Categories
			// ============================

			Object.defineProperty(gameObjectConfiguration.prototype, "objectCategory", { 
				configurable: true,
				enumerable: true,
				writable: true,
				value: 'default'			
			});

			gameObjectConfiguration.prototype.obstacleCategory = function() {
				this.objectCategory = 'obstacle';
				return this;
			}

			gameObjectConfiguration.prototype.isObstacle = function() {
				return this.objectCategory == 'obstacle';
			}

			gameObjectConfiguration.prototype.enemyCategory = function() {
				this.objectCategory = 'enemy';
				return this;
			}

			gameObjectConfiguration.prototype.isEnemy = function() {
				return this.objectCategory == 'enemy';
			}

			gameObjectConfiguration.prototype.itemCategory = function() {
				this.objectCategory = 'item';
				return this;
			}

			gameObjectConfiguration.prototype.isItem = function() {
				return this.objectCategory == 'item';
			}

			/**
			 * --------------------------------
			 */
		
			Object.defineProperty(componentConfiguration.prototype, "childConfig", { 
				configurable: true,
				value: false
			});

			componentConfiguration.prototype.isChild = function() {
				return false;
			}

			Object.defineProperty(componentConfiguration.prototype, "customConfig", { 
				configurable: true,
				value: false			
			});

			componentConfiguration.prototype.isCustom = function() {
				return false;
			}
		},

		destroy: function() {
			delete gameObjectConfiguration.prototype.childConfig;
			delete gameObjectConfiguration.prototype.childOnly;
			delete gameObjectConfiguration.prototype.isChild;

			delete gameObjectConfiguration.prototype.customConfig;
			delete gameObjectConfiguration.prototype.custom;
			delete gameObjectConfiguration.prototype.isCustom;

			delete gameObjectConfiguration.prototype.mouseSupport;
			delete gameObjectConfiguration.prototype.disableMouseSupport;
			delete gameObjectConfiguration.prototype.hasMouseSupport;

			delete gameObjectConfiguration.prototype.objectCategory;
			delete gameObjectConfiguration.prototype.obstacleCategory;
			delete gameObjectConfiguration.prototype.isObstacle;
			delete gameObjectConfiguration.prototype.enemyCategory;
			delete gameObjectConfiguration.prototype.isEnemy;
			delete gameObjectConfiguration.prototype.itemCategory;
			delete gameObjectConfiguration.prototype.isItem;

			delete componentConfiguration.prototype.childConfig;
			delete componentConfiguration.prototype.isChild;

			delete componentConfiguration.prototype.customConfig;
			delete componentConfiguration.prototype.isCustom;
		}    
	});

	return PatchGameObjectConfiguration;
});
