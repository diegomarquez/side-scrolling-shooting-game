define(["editor-game-object-container", "player-getter", "root", "gb"], function(GameObject, PlayerGetter, Root, Gb) {
	var Boss_1 = GameObject.extend({
		init: function() {
			this._super();

			this.health = 40;
			this.cableCount = -1;
			this.initCableCount = -1;
			this.hasStopListener = false;

			this.destroyEffect = null;
			this.colliderId = null;
			this.cannons = null;
			this.cables = null;

			this.onPlayerStop = function() {

				this.hasStopListener = false;

				// Set up cables				
				if (this.cables === null) {
					this.cables = this.findChildren().allWithType("boss-1-cables");

					this.cableCount = this.cables.length;
					this.initCableCount = this.cables.length;

					// Signal boss weak spots to start
					for (var i = 0; i < this.cables.length; i++) {
						this.cables[i].onBossStart();
						this.cables[i].on(this.cables[i].DAMAGE, this, this.onDamage);
					}	
				} else {
					// Signal boss weak spots to start
					for (var i = 0; i < this.cables.length; i++) {
						if (this.cables[i].isActive()) {
							this.cables[i].onBossStart();
						}
					}
				}

				if (this.cannons === null) {
					// Get all the nearby Boss helpers
					this.cannons = Root.findChildren().recurse().all(function(child) {
						return (child.poolId == "BossCannonBase" ||  child.poolId == "BossDoubleCannonBase" || child.poolId == "BossGeneratorType") && child.getViewportVisibility('Main'); 
					});	
				}
				
				// Signal boss cannons to start
				for (var i = 0; i < this.cannons.length; i++) {
					if (this.cannons[i].isActive()) {
						this.cannons[i].onBossStart();
					}
				}

				// Other bosses already detected, do nothing else
				if (this.otherBosses === null)
				{
					// Get other bosses
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
			}

			this.otherBosses = null;
		},

		editorStart: function() {
			this.health = 40;
			
			if (this.hasStopListener)
				return;

			this.hasStopListener = true;
			PlayerGetter.get().once(PlayerGetter.get().STOP_MOVEMENT, this, this.onPlayerStop);
		},

		editorUpdate: function(delta) {
								
		},

		deActivate: function() {
			this.hasStopListener = false;
			PlayerGetter.get().removeDelegate(PlayerGetter.get().STOP_MOVEMENT, this, this.onPlayerStop);
    	},

		onDamage: function (cable) {
			this.cableCount--;
		},

		onCollide: function(other) {

			if (!this.hasStopListener)
				return;

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
							PlayerGetter.get().removeDelegate(PlayerGetter.get().STOP_MOVEMENT, this, this.onPlayerStop);
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

		stopLogic: function() {
			if (this.cables === null || this.cannons === null)
				return;

			// Signal boss weak spots to stop
			for (var i = 0; i < this.cables.length; i++) {
				this.cables[i].onBossStop();
			}

			// Signal boss cannos to stop
			for (var i = 0; i < this.cannons.length; i++) {
				this.cannons[i].onBossStop();
			}

			if (this.hasStopListener)
				return;

			this.hasStopListener = true;
			PlayerGetter.get().once(PlayerGetter.get().STOP_MOVEMENT, this, this.onPlayerStop);
		},

		recycle: function() {
			this.cannons = null;
			this.otherBosses = null;
			this.cables = null;
			
			this._super();
		}
	});

	return Boss_1;
});

