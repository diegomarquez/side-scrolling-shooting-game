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
					if (options.objectCategory) {
						if (options.objectCategory == 'obstacle') {
							if (this.configurations[k].isObstacle()) {
								r.push(k);
							} 

							continue;
						}

						if (options.objectCategory == 'enemy') {
							if (this.configurations[k].isEnemy()) {

								if (options.enemyTier) {
									if (options.enemyTier == 'weak') {
										if (this.configurations[k].isWeakEnemyTier()) {
											r.push(k);
										} 

										continue;
									}

									if (options.enemyTier == 'strong') {
										if (this.configurations[k].isStrongEnemyTier()) {
											r.push(k);
										} 

										continue;
									}

									if (options.enemyTier == 'boss') {
										if (this.configurations[k].isBossEnemyTier()) {
											r.push(k);
										} 

										continue;
									}

									if (options.enemyTier == 'weak-boss-helper') {
										if (this.configurations[k].isWeakBossHelperEnemyTier()) {
											r.push(k);
										}

										continue;
									}

									if (options.enemyTier == 'strong-boss-helper') {
										if (this.configurations[k].isStrongBossHelperEnemyTier()) {
											r.push(k);
										} 

										continue;
									}
								}


								r.push(k);
							} 

							continue;
						}

						if (options.objectCategory == 'item') {
							if (this.configurations[k].isItem()) {
								r.push(k);
							} 

							continue;
						}
					}



					if (options.filterChilds) {
						if (!this.configurations[k].isChild()) {
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
						if (!this.configurations[k].isChild()) {
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
