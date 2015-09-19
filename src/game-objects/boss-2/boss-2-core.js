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

			PlayerGetter.get().once(PlayerGetter.get().STOP, this, this.onPlayerStop);
		},

		deActivate: function() {
			PlayerGetter.get().removeDelegate(PlayerGetter.get().STOP, this, this.onPlayerStop);
    	},

		editorUpdate: function(delta) {

		},

		onCollide: function(other) {
			if (this.hp > 0) {
				this.hp--;
			} else {
				if (this.isActive()) {
					var collider = this.findComponents().firstWithProp('collider');
					collider.disable();

					this.execute('destroyed');

					if (this.otherBosses && this.otherBosses.length == 0) {
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
		},

		recycle: function() {
			if (PlayerGetter.exists()) {
				if (this.otherBosses && this.otherBosses.length == 0) {
					PlayerGetter.get().move();
					PlayerGetter.get().removeDelegate(PlayerGetter.get().STOP, this, this.onPlayerStop);
				}
			}

			this.body = null;
			this.cannons = null;
			this.otherBosses = null;
			
			this._super();
		},

		onPlayerStop: function() {
			this.body = this.findChildren().firstWithType("boss-body");

			// Start the body
			this.body.onBossStart();
			
			this.cannons = Root.findChildren().recurse().all(function(child) {
				return (child.poolId == "BossCannonBase" || child.poolId == "BossDoubleCannonBase") && child.getViewportVisibility('Main'); 
			});

			// Signal boss cannos to start
			for (var i=0; i < this.cannons.length; i++) {
				this.cannons[i].onBossStart();
			}

			this.otherBosses = null;

			this.otherBosses = Root.findChildren().recurse().all(function(child) {
				return (child.typeId == "boss-1" || child.typeId == "boss-2") && child.getViewportVisibility('Main'); 
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
	});

	return Boss_2_Core;
});

