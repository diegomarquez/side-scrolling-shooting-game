define(["editor-game-object-container", "player-getter", "root", "timer-factory"], function(GameObject, PlayerGetter, Root, TimerFactory) {
	var Boss_3_Body = GameObject.extend({
		init: function() {
			this._super();

			this.hp = 0;
			this.eye = null;
			this.cannons = null;

			this.otherBosses = null;
		},

		editorStart: function() {
			this.hp = 5;

			PlayerGetter.get().once(PlayerGetter.get().STOP, this, this.onPlayerStop);

			TimerFactory.get(this, "regenTimer", "regenTimer");
			this.regenTimer.configure({ delay: 500, removeOnComplete: false });

			this.regenTimer.on('complete', function() {
				this.eye.regen(40);
			});
		},

		deActivate: function() {
			PlayerGetter.get().removeDelegate(PlayerGetter.get().STOP, this, this.onPlayerStop);
    	},

		editorUpdate: function(delta) {

		},

		onCollide: function(other) {
			
		},

		recycle: function() {
			if (PlayerGetter.exists()) {
				if (this.otherBosses && this.otherBosses.length == 0) {
					PlayerGetter.get().move();
					PlayerGetter.get().removeDelegate(PlayerGetter.get().STOP, this, this.onPlayerStop);
				}
			}

			if (this.regenTimer)
				this.regenTimer.remove();

			this.eye = null;
			this.cannons = null;
			this.otherBosses = null;
			
			this._super();
		},

		onPlayerStop: function() {
			this.eye = this.findChildren().firstWithType("boss-3-eye");
			
			this.eye.on('damage', this, function() {
				if (this.hp > 0) {
					this.hp--;

					this.regenTimer.start();
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
					}
				}
			});

			this.cannons = Root.findChildren().recurse().all(function(child) {
				return (
					child.poolId == "BossCannonBase" || 
					child.poolId == "BossDoubleCannonBase" ||
					child.poolId == "BossGeneratorType"
				) && child.getViewportVisibility('Main'); 
			});

			// Signal boss cannos to start
			for (var i=0; i < this.cannons.length; i++) {
				this.cannons[i].onBossStart();
			}

			this.otherBosses = null;

			this.otherBosses = Root.findChildren().recurse().all(function(child)
			{
				return (child.typeId == "boss-1" || child.typeId == "boss-2" || child.typeId == "boss-3") && child.getViewportVisibility('Main'); 
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

	return Boss_3_Body;
});

