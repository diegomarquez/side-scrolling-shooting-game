define(["editor-game-object-container", "player-getter", "root", "timer-factory", "gb", "tweenlite", "util"], function(GameObject, PlayerGetter, Root, TimerFactory, Gb, TweenLite, Util) {
	var Boss_4_Body = GameObject.extend({
		init: function() {
			this._super();

			this.hp = 0;
			this.speed = 0;

			this.cannons = null;
			this.target = null;
			this.movementAngleComponent = null;
			this.activateOnViewComponent = null;
			this.shootingPatternComponent = null;

			this.angle = 0;
			
			this.otherBosses = null;
		},

		editorStart: function() {
			this.hp = 70;
			this.speed = 170;

			this.movementAngleComponent = this.findComponents().firstWithType('MovementAngle');
			this.movementAngleComponent.disable();

			this.activateOnViewComponent = this.findComponents().firstWithType('Activate_Boss_On_View');

			this.shootingPatternComponent = this.findComponents().firstWithType('Boss4ShootingPattern');
			this.shootingPatternComponent.setOrigin(this.findChildren().firstWithType("FirePosition"));
			
			this.angle = (this.rotation + 90) * (Math.PI/180);

			TimerFactory.get(this, "waitTimer", "waitTimer");
			TimerFactory.get(this, "walkTimer", "walkTimer");
			
			this.waitTimer.configure({ delay: 2000, removeOnComplete: false });
			this.walkTimer.configure({ delay: 2000, removeOnComplete: false });

			this.waitTimer.on('complete', function() {
				
				var distance = this.renderer.rendererHeight()/2;

				if (this.rotation == 0) {
					// top
					TweenLite.to(this, distance/this.speed, { y: '+=' + distance, ease: Linear.easeNone, onCompleteScope: this, onComplete: function() {
						this.renderer.pause();

						this.execute('start-shot-pattern');
					}});
				}

				if (this.rotation == 90) {
					// right
					TweenLite.to(this, distance/this.speed, { x: '-=' + distance, ease: Linear.easeNone, onCompleteScope: this, onComplete: function() {
						this.renderer.pause();
						
						this.execute('start-shot-pattern');
					}});
				}

				if (this.rotation == 180) {
					// down
					TweenLite.to(this, distance/this.speed, { y: '-=' + distance, ease: Linear.easeNone, onCompleteScope: this, onComplete: function() {
						this.renderer.pause();

						this.execute('start-shot-pattern');
					}});
				}

				if (this.rotation == 270) {
					// left
					TweenLite.to(this, distance/this.speed, { x: '+=' + distance, ease: Linear.easeNone, onCompleteScope: this, onComplete: function() {
						this.renderer.pause();
						
						this.execute('start-shot-pattern');
					}});
				}

			});

			this.walkTimer.on('complete', function() {

				var deltaX = this.target.X - this.x;
				var deltaY = this.target.Y - this.y;

				this.angle = Math.atan2(deltaY, deltaX);

				if (this.angle < 0)
					this.angle += 2 * Math.PI;

				this.rotation = (this.angle * (180/Math.PI)) - 90;

				this.movementAngleComponent.enable();
				this.renderer.resume();
			});

			this.on('finish-shot-pattern', this, function() {
				this.walkTimer.start();
			});
			
			this.on('out-of-screen-bounds', this, function() {

				if (!this.target)
					return;

				var playerX = this.target.x;
				var playerY = this.target.y;

				var side = parseInt((Math.random() - 0.000000000001) * 4);

				if (side == 0) {
					// top

					this.x = playerX + Gb.canvas.width/2 + Util.rand_i(-100, 100);
					this.y = playerY - this.renderer.rendererHeight()/2;

					this.rotation = 0;

				} else if (side == 1) {
					// right
					
					this.x = playerX + Gb.canvas.width + this.renderer.rendererHeight()/2;
					this.y = playerY + Gb.canvas.height/2 + Util.rand_i(-100, 100);

					this.rotation = 90;

				} else if (side == 2) {
					// down
					 
					this.x = playerX + Gb.canvas.width/2 + Util.rand_i(-100, 100);
					this.y = playerY + Gb.canvas.height + this.renderer.rendererHeight()/2;

					this.rotation = 180;

				} else if (side == 3) {
					// left

					this.x = playerX - this.renderer.rendererHeight()/2;
					this.y = playerY + Gb.canvas.height/2 + Util.rand_i(-100, 100);

					this.rotation = 270;

				}

				this.angle = (this.rotation + 90) * (Math.PI/180);

				this.movementAngleComponent.disable();

				this.waitTimer.start();
			});

			PlayerGetter.get().once(PlayerGetter.get().STOP, this, this.onPlayerStop);
		},

		deActivate: function() {
			PlayerGetter.get().removeDelegate(PlayerGetter.get().STOP, this, this.onPlayerStop);

			this.target = null;
    	},

		editorUpdate: function(delta) {

		},

		onCollide: function(other) {
			if (this.hp > 0) {
				this.hp--;

				this.execute('damage');
			} else {
				if (this.isActive()) {
					var collider = this.findComponents().firstWithProp('collider');
					collider.disable();

					this.target = null;

					// Stop movement
					this.speed = 0;
					TweenLite.killTweensOf(this);

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
			}	
		},

		recycle: function() {
			if (PlayerGetter.exists()) {
				if (this.otherBosses && this.otherBosses.length == 0) {
					PlayerGetter.get().move();
					PlayerGetter.get().removeDelegate(PlayerGetter.get().STOP, this, this.onPlayerStop);
				}
			}

			this.cannons = null;
			this.otherBosses = null;

			if (this.waitTimer)
				this.waitTimer.remove();

			if (this.walkTimer)
				this.walkTimer.remove();
			
			this._super();
		},

		onPlayerStop: function() {			
			this.target = PlayerGetter.get();
			
			this.movementAngleComponent.enable();
			this.activateOnViewComponent.disable();

			this.renderer.play('walking');

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
	});

	return Boss_4_Body;
});

