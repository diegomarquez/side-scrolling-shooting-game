define(function(require) {
	var gb = require('gb');
	
	var PatchGameObjectPool = require('extension').extend({
		init: function() {
			this.beforePatch = null;
		},

		type: function() {
			return gb.game.CREATE;
		},

		execute: function() { 	
			this.beforePatch = gb.goPool.constructor.prototype.getConfigurationTypes;

			gb.goPool.constructor.prototype.getConfigurationTypes = function(options) {
				options = options || {};

				var r = []

				for (var k in this.configurations) {
					if (options.filterChilds) {
						if (!this.configurations[k].isChildOnly()) {
							r.push(k);
							continue;
						} 
					}

					if (options.customOnly) {
						if (this.configurations[k].isCustom()) {
							r.push(k);
							continue;
						} 
					}

					r.push(k);
				}

				return r;
			}

			gb.goPool.constructor.prototype.isConfigurationCustom = function(id) {
				return this.configurations[id].isCustom();
			}
		
		},

		destroy: function() {
			gb.goPool.constructor.prototype.getConfigurationTypes = this.beforePatch;

			delete gb.goPool.constructor.prototype.isConfigurationCustom;
		}    
	});

	return PatchGameObjectPool;
});
