define(function(require) {
	var gb = require('gb');
	
	var PatchGameObjectPool = require('extension').extend({
		init: function() {
			this.goPoolbeforePatch = null;
			this.coPoolbeforePatch = null;
		},

		type: function() {
			return gb.game.CREATE;
		},

		execute: function() { 	
			this.goPoolbeforePatch = gb.goPool.constructor.prototype.getConfigurationTypes;
			this.coPoolbeforePatch = gb.coPool.constructor.prototype.getConfigurationTypes;

			gb.goPool.constructor.prototype.getConfigurationTypes = function(options) {
				options = options || {};

				var r = [];

				for (var k in this.configurations) {
					if (options.filterChilds) {
						if (!this.configurations[k].isChildOnly()) {
							r.push(k);
						} 

						continue;
					}

					if (options.customOnly) {
						if (this.configurations[k].isCustom()) {
							r.push(k);
						} 

						continue;
					}

					r.push(k);
				}

				return r;
			}

			gb.goPool.constructor.prototype.isConfigurationCustom = function(id) {
				return this.configurations[id].isCustom();
			}

			gb.coPool.constructor.prototype.getConfigurationTypes = function(options) {
				options = options || {};

				var r = [];

				for (var k in this.configurations) {
					if (options.filterChilds) {
						if (!this.configurations[k].isChildOnly()) {
							r.push(k);
						} 

						continue;
					}

					if (options.customOnly) {
						if (this.configurations[k].isCustom()) {
							r.push(k);
						} 

						continue;
					}

					r.push(k);
				}

				return r;
			}

			gb.coPool.constructor.prototype.isConfigurationCustom = function(id) {
				return this.configurations[id].isCustom();
			}
		
		},

		destroy: function() {
			gb.goPool.constructor.prototype.getConfigurationTypes = this.goPoolbeforePatch;
			gb.coPool.constructor.prototype.getConfigurationTypes = this.coPoolbeforePatch;

			delete gb.goPool.constructor.prototype.isConfigurationCustom;
			delete gb.coPool.constructor.prototype.isConfigurationCustom;
		}    
	});

	return PatchGameObjectPool;
});
