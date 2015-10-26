define(["editor-game-object-container", "player-getter", "root", "gb"], function(GameObject, PlayerGetter, Root, Gb) {
	var Boss_1 = GameObject.extend({
		init: function() {
			this._super();

			this.health = 40;
			this.cableCount = null;
			this.destroyEffect = null;
			this.colliderId = null;
			this.cannons = null;

			this.onPlayerStop = function() {
				var cables = this.findChildren().allWithType("boss-1-cables");

				this.cableCount = cables.length;

				// Signal boss weak spots to start
				for (var i = 0; i < this.cableCount; i++) {
					cables[i].onBossStart();
					cables[i].on(cables[i].DAMAGE, this, this.onDamage);
				}

				// Get all the nearby Boss helpers
				this.cannons = Root.findChildren().recurse().all(function(child) {
					return (child.poolId == "BossCannonBase" ||  child.poolId == "BossDoubleCannonBase" || child.poolId == "BossGeneratorType") && child.getViewportVisibility('Main'); 
				});

				// Signal boss cannos to start
				for (var i = 0; i < this.cannons.length; i++) {
					this.cannons[i].onBossStart();
				}

				// Get other bosses
				this.otherBosses = null;

				this.otherBosses = Root.findChildren().recurse().all(function(child) {
					return (child.typeId == "boss-1" || child.typeId == "boss-2" || child.typeId == "boss-3" || child.typeId == "boss-4") && child.getViewportVisibility('Main');
				});

				// If there are other bosses present, set up a delegate to get informed when they are destroyed
				if (this.otherBosses) {		
					for (var i=0; i < this.otherBosses.length; i++) {
						this.otherBosses[i].once('destroyed', this, function(boss) {
							if (this.isActive()) {
								this.otherBosses.splice(this.otherBosses.indexOf(boss), 1);	
							}
						});
					}	
				}
			}

			this.otherBosses = null;
		},

		editorStart: function() {
			this.health = 40;
			
			PlayerGetter.get().once(PlayerGetter.get().STOP, this, this.onPlayerStop);
		},

		editorUpdate: function(delta) {
								
		},

		deActivate: function() {
			PlayerGetter.get().removeDelegate(PlayerGetter.get().STOP, this, this.onPlayerStop);
    	},

		onDamage: function (cable) {
			this.cableCount--;
		},

		onCollide: function(other) {
			if (this.cableCount !== null && this.cableCount <= 0) {
				if (this.health > 0) {
					this.health--;  
				} 
				else {
					var explosionsGenerator = Gb.addComponentTo(this, this.destroyEffect);

					// Remove collision component
					this.removeComponent(this.findComponents().firstWithType(this.colliderId));  

					// When the last explosion is done with it's animation, check if this is the last boss standing
					explosionsGenerator.once(explosionsGenerator.STOP_AND_ALL_RECYCLED, this, function() {
						
						// Recycle the boss
						Gb.reclaimer.mark(this);

						// Check if all bosses have been destroyed to resume scrolling
						if (this.otherBosses && this.otherBosses.length == 0) {
							PlayerGetter.get().move();
							PlayerGetter.get().removeDelegate(PlayerGetter.get().STOP, this, this.onPlayerStop);
						}

					});

					// Signal other bosses
					this.execute('destroyed', this);

					// Check if all bosses have been destroyed
					if (this.otherBosses && this.otherBosses.length == 0) {
						// Signal all cannons that all bosses has been destroyed
						if (this.cannons) {
							for (var i=0; i < this.cannons.length; i++) {
								this.cannons[i].onBossDestroy();
							}

							this.cannons.length = 0;
						}
					}
				}
			}
		},

		recycle: function() {
			this.cannons = null;
			this.otherBosses = null;
			
			this._super();
		}
	});

	return Boss_1;
});

