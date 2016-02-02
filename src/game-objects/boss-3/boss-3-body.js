define(["editor-game-object-container", "player-getter", "root", "timer-factory"], function(GameObject, PlayerGetter, Root, TimerFactory) {
	var Boss_3_Body = GameObject.extend({
		init: function() {
			this._super();

			this.hp = 0;
			this.eye = null;
			this.cannons = null;
			this.target = null;
			this.vecX = 0;
			this.vecY = 0;

			this.otherBosses = null;
			this.hasStopListener = false;
		},

		editorStart: function() {
			this.hp = 5;

			if (this.hasStopListener)
				return;

			this.hasStopListener = true;
			PlayerGetter.get().once(PlayerGetter.get().STOP_MOVEMENT, this, this.onPlayerStop);
		},

		deActivate: function() {
			this.hasStopListener = false;
			PlayerGetter.get().removeDelegate(PlayerGetter.get().STOP_MOVEMENT, this, this.onPlayerStop);

			this.target = null;
    	},

		editorUpdate: function(delta) {

		},

		onCollide: function(other) {
			
		},

		recycle: function() {
			if (PlayerGetter.exists()) {
				if (this.otherBosses && this.otherBosses.length == 0) {
					PlayerGetter.get().move();
					PlayerGetter.get().removeDelegate(PlayerGetter.get().STOP_MOVEMENT, this, this.onPlayerStop);
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

			this.hasStopListener = false;
			
			this.eye = this.findChildren().firstWithType("boss-3-eye");
			this.eye.enable();

			this.target = PlayerGetter.get();

			var collider = this.findComponents().firstWithProp('collider');
			collider.enable();

			TimerFactory.get(this, "regenTimer", "regenTimer");
			
			this.regenTimer.configure({ delay: 500, removeOnComplete: false });

			this.regenTimer.on('complete', function() {
				this.eye.regen(40);
			});
	
			this.eye.on('damage', this, function() {
				if (this.hp > 0) {
					this.hp--;

					if (this.hp == 0) {
						if (this.isActive()) {
							var collider = this.findComponents().firstWithProp('collider');
							collider.disable();

							this.target = null;

							this.execute('destroyed', this);

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
					} else {
						this.regenTimer.start();
						this.execute('damage');

						TweenLite.to(this, 0.5, { x: '-=' + this.vecX * 40, y: '-=' + this.vecY * 40, ease: Power2.easeOut });
					}
				}
			}, "eye-damage-handler");

			if (this.cannons === null) {
				this.cannons = Root.findChildren().recurse().all(function(child) {
					return (
						child.poolId == "BossCannonBase" || 
						child.poolId == "BossDoubleCannonBase" ||
						child.poolId == "BossGeneratorType"
					) && child.getViewportVisibility('Main'); 
				});	
			}

			// Signal boss cannos to start
			for (var i=0; i < this.cannons.length; i++) {
				if (this.cannons[i].isActive()) {
					this.cannons[i].onBossStart();	
				}
			}

			if (this.otherBosses === null) {
				this.otherBosses = Root.findChildren().recurse().all(function(child) {
					return (child.typeId == "boss-1" || 
							child.typeId == "boss-2" || 
							child.typeId == "boss-3" || 
							child.typeId == "boss-4") && child.getViewportVisibility('Main'); 
				});

				for (var i=0; i < this.otherBosses.length; i++) {
					this.otherBosses[i].once('destroyed', this, function(boss) {
						if (this.isActive()) {
							this.otherBosses.splice(this.otherBosses.indexOf(boss), 1);	
						}
					});
				}
			}
		},

		stopLogic: function() {
			if (this.cannons === null) {
				return;
			}

			this.eye.disable();
			this.eye.regen();
			this.target = null;

			var collider = this.findComponents().firstWithProp('collider');
			collider.enable();

			for (var i = 0; i < this.cannons.length; i++) {
				this.cannons[i].onBossStop();
			}

			if (this.regenTimer)
				this.regenTimer.remove();

			if (this.eye)
				this.eye.levelCleanUp("eye-damage-handler");

			if (this.hasStopListener)
				return;

			this.hasStopListener = true;
			PlayerGetter.get().once(PlayerGetter.get().STOP_MOVEMENT, this, this.onPlayerStop);
		}
	});

	return Boss_3_Body;
});

