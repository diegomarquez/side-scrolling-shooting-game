define(["editor-game-object-container", "player-getter", "root"], function(GameObject, PlayerGetter, Root) {
	var Boss_2_Core = GameObject.extend({
		init: function() {
			this._super();

			this.hp = 40;

			this.body = null;
			this.cannons = null;

			this.otherBosses = null;
		},

		start: function() {
			this._super();
		},

		editorStart: function() {
			this.hp = 40;

			if (this.hasStopListener)
				return;

			this.hasStopListener = true;
			PlayerGetter.get().once(PlayerGetter.get().STOP_MOVEMENT, this, this.onPlayerStop);
		},

		deActivate: function() {
			this.hasStopListener = false;
			PlayerGetter.get().removeDelegate(PlayerGetter.get().STOP_MOVEMENT, this, this.onPlayerStop);
    	},

		editorUpdate: function(delta) {

		},

		onCollide: function(other) {
			if (this.hasStopListener)
				return;

			if (this.hp > 0) {
				this.hp--;

				if (this.hp == 0) {
					if (this.isActive()) {
						var collider = this.findComponents().firstWithProp('collider');
						collider.disable();

						this.execute('destroyed', this);

						if (this.otherBosses && this.otherBosses.length == 0) {
							this.execute('last-boss-destroyed', this);
							
							// Signal all cannons that the boss has been destroyed
							if (this.cannons) {
								for (var i=0; i < this.cannons.length; i++) {
									if (this.cannons[i].getViewportVisibility('Main')) {
										this.cannons[i].onBossDestroy();   
									}
								}

								this.cannons.length = 0;
							}
						}

						if (this.body.isActive()) {
							this.body.onBossDestroy();
						}
					}	
				}
			}
		},

		recycle: function() {
			if (PlayerGetter.exists()) {
				if (this.otherBosses && this.otherBosses.length == 0) {
					
					this.execute('all-bosses-destroyed', this);

					this.hasStopListener = false;

					PlayerGetter.get().move();
					PlayerGetter.get().removeDelegate(PlayerGetter.get().STOP_MOVEMENT, this, this.onPlayerStop);
				}
			}

			this.body = null;
			this.cannons = null;
			this.otherBosses = null;
			
			this._super();
		},

		stopLogic: function() {
			this.execute('boss-stop', this);

			if (this.cannons === null || this.body === null)
				return;

			this.body.onBossStop();

			// Signal boss cannos to stop
			for (var i = 0; i < this.cannons.length; i++) {
				this.cannons[i].onBossStop();
			}

			if (this.hasStopListener)
				return;

			this.hasStopListener = true;
			PlayerGetter.get().once(PlayerGetter.get().STOP_MOVEMENT, this, this.onPlayerStop);
		},

		onPlayerStop: function() {
			this.hasStopListener = false;

			if (this.body === null) {
				this.body = this.findChildren().firstWithType("boss-body");		
			}

			if (this.cannons === null) {
				this.cannons = Root.findChildren().recurse().all(function(child) {
					return (
						child.poolId == "BossCannonBase" || 
						child.poolId == "BossDoubleCannonBase" ||
						child.poolId == "BossGeneratorType"
					) && child.getViewportVisibility('Main'); 
				});	
			}
			
			// Start the body
			this.body.onBossStart();

			// Signal boss cannos to start
			for (var i=0; i < this.cannons.length; i++) {
				this.cannons[i].onBossStart();
			}

			if (this.otherBosses === null) {
				this.otherBosses = null;

				this.otherBosses = Root.findChildren().recurse().all(function(child)
				{
					return (child.typeId == "boss-1" || child.typeId == "boss-2" || child.typeId == "boss-3" || child.typeId == "boss-4") && child.getViewportVisibility('Main');
				});

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
	});

	return Boss_2_Core;
});

