define(["editor-game-object-container", "timer-factory", "util", "gb"], function(GameObject, TimerFactory, Util, Gb) {

	var selfDecompose = {};

	var Boss_2_Body = GameObject.extend({
		init: function() {
			this._super();

			this.destroyEffect = null;
			this.colliderId = null;

			this.collider = null;

			this.attackCount = 0;

			this.laser1 = null;
			this.laser2 = null;
			this.laser3 = null;

			this.mine1 = null;
			this.mine2 = null;
			this.mine3 = null;
			this.mine4 = null;
			this.mine5 = null;

			this.laserAttacks = null;
			this.mineAttacks = null;

			this.laserAttackIndex = 0;
			this.mineAttackIndex = 0;
		},

		editorStart: function() {
			if (!this.laserAttacks && !this.mineAttacks)
				throw new Error('No attacks set on boss-2');
		},

		editorUpdate: function(delta) {

		},

		deActivate: function() {
			if (this.openTimer)
				this.openTimer.remove();

			if (this.attackTimer)
				this.attackTimer.remove();

			if (this.closeTimer)
				this.closeTimer.remove();

			if (this.laserTimer)
				this.laserTimer.remove();

			this.execute("end-laser-attack");

			if (this.laser1)
				Gb.reclaimer.mark(this.laser1);

			if (this.laser2)
				Gb.reclaimer.mark(this.laser2);

			if (this.laser3)
				Gb.reclaimer.mark(this.laser3);

			this.laser1 = null;
			this.laser2 = null;
			this.laser3 = null;

			this.clearMines();
		},
		
		stop: function(skipEvent) {
			this._super(skipEvent);
			
			if (this.openTimer)
				this.openTimer.pause();
			
			if (this.attackTimer)
				this.openTimer.pause();
			
			if (this.closeTimer)
				this.closeTimer.pause();
			
			if (this.laserTimer)
				this.laserTimer.pause();
		},
		
		run: function(skipEvent) {
			this._super(skipEvent);
			
			if (this.openTimer)
				this.openTimer.resume();
			
			if (this.attackTimer)
				this.openTimer.resume();
			
			if (this.closeTimer)
				this.closeTimer.resume();
			
			if (this.laserTimer)
				this.laserTimer.resume();
		},

		onBossStart: function() {
			this.attackCount = 0;
			this.laserAttackIndex = 0;
			this.mineAttackIndex = 0;

			this.collider = this.findComponents().firstWithProp('collider');

			this.collider.enable();
			this.closingAnimation();

			TimerFactory.get(this, 'openTimer', 'openTimer');
			TimerFactory.get(this, 'attackTimer', 'attackTimer');
			TimerFactory.get(this, 'closeTimer', 'closeTimer');
			TimerFactory.get(this, 'laserTimer', 'laserTimer');

			this.openTimer.configure({ delay: 6000, removeOnComplete:false });
			this.attackTimer.configure({ delay: 3000, removeOnComplete:false });
			this.closeTimer.configure({ delay: 2000, removeOnComplete:false });
			this.laserTimer.configure({ delay: 2000, removeOnComplete:false });

			this.openTimer.start();

			this.openTimer.on(this.openTimer.COMPLETE, function() {
				this.execute("opening");

				this.renderer.play('opening');

				this.addRendererDelegate('complete', function() {
					this.collider.disable();

					this.renderer.play('opened');

					this.attackTimer.start();
				});
			});

			this.attackTimer.on(this.attackTimer.COMPLETE, function() {

				this.attackCount++;

				if (this.attackCount % 3 == 0) {

					// Idle Moment
					this.closeTimer.start();

				} else {

					if (Util.rand_b()) {

						// Try laser attack and fall back to mine attack

						if (!this.laserAttacks) {
							this.doMineAttack();
							return;
						}

						this.doLaserAttack();

					} else {

						// Try mine attack and fall back to laser attack

						if (!this.mineAttacks) {
							this.doLaserAttack();
							return;
						}

						this.doMineAttack();

					}
				}
			});

			this.closeTimer.on(this.closeTimer.COMPLETE, function() {
				this.execute("closing");

				this.renderer.play('closing');
				this.collider.enable();

				this.addRendererDelegate('complete', function() {
					this.renderer.play('closed');

					this.openTimer.start();
				});
			});

			this.laserTimer.on(this.laserTimer.COMPLETE, function() {
				
				this.execute("end-laser-attack");
				
				if (this.laser1)
					Gb.reclaimer.mark(this.laser1);

				if (this.laser2)
					Gb.reclaimer.mark(this.laser2);

				if (this.laser3)
					Gb.reclaimer.mark(this.laser3);

				this.laser1 = null;
				this.laser2 = null;
				this.laser3 = null;

				this.closeTimer.start();
			});
		},

		onBossStop: function() {
			if (!this.renderer)
				return;

			this.collider.enable();

			this.cleanUpRendererDelegates();
			this.deActivate();
			this.closingAnimation();
		},

		closingAnimation: function() {
			if (!this.renderer)
				return;

			this.execute("closing");

			if (this.renderer.isAtLabel('opened')) {
				this.renderer.play('closing');

				this.addRendererDelegate('complete', function() {
					this.renderer.play('closed');
				});
			}
			else if (this.renderer.isAtLabel('opening')) {
				this.renderer.reverse();

				this.addRendererDelegate('complete_back', function() {
					this.renderer.play('closed');
				});
			}
			else if (this.renderer.isAtLabel('closing')) {
				this.addRendererDelegate('complete', function() {
					this.renderer.play('closed');
				});
			}
			else if (this.renderer.isAtLabel('half-open')) {
				this.renderer.play('half-open-close');

				this.addRendererDelegate('complete', function() {
					this.renderer.play('closed');
				});
			}
		},

		onCollide: function(other) {

		},

		recycle: function() {
			this.deActivate();
			this.cleanUpRendererDelegates();

			this._super();
		},

		doLaserAttack: function() {
			this.execute("laser-attack");

			selfDecompose = this.getMatrix().decompose(selfDecompose);

			if (this.laserAttacks[this.laserAttackIndex] == 'x1') {

				this.laser1 = Gb.create('Laser', this.getUpdateGroup(), this.getViewportList(), {
					rotation: selfDecompose.rotation+90,
					x: selfDecompose.x,
					y: selfDecompose.y
				});

			}

			if (this.laserAttacks[this.laserAttackIndex] == 'x2') {

				this.laser1 = Gb.create('Laser', this.getUpdateGroup(), this.getViewportList(), {
					rotation: selfDecompose.rotation+90+35,
					x: selfDecompose.x,
					y: selfDecompose.y
				});

				this.laser2 = Gb.create('Laser', this.getUpdateGroup(), this.getViewportList(), {
					rotation: selfDecompose.rotation+90-35,
					x: selfDecompose.x,
					y: selfDecompose.y
				});
			}

			if (this.laserAttacks[this.laserAttackIndex] == 'x3') {

				this.laser1 = Gb.create('Laser', this.getUpdateGroup(), this.getViewportList(), {
					rotation: selfDecompose.rotation+90+35,
					x: selfDecompose.x,
					y: selfDecompose.y
				});

				this.laser2 = Gb.create('Laser', this.getUpdateGroup(), this.getViewportList(), {
					rotation: selfDecompose.rotation+90,
					x: selfDecompose.x,
					y: selfDecompose.y
				});

				this.laser3 = Gb.create('Laser', this.getUpdateGroup(), this.getViewportList(), {
					rotation: selfDecompose.rotation+90-35,
					x: selfDecompose.x,
					y: selfDecompose.y
				});

			}

			this.laserTimer.start();

			if (this.laserAttackIndex < this.laserAttacks.length-1) {
				this.laserAttackIndex++;
			} else {
				this.laserAttackIndex = 0;
			}
		},

		doMineAttack: function() {
			this.execute("mine-attack");

			selfDecompose = this.getMatrix().decompose(selfDecompose);

			if (this.mineAttacks[this.mineAttackIndex] == 'x3') {

				this.clearMines();

				this.mine1 = Gb.create('boss-mine-long', this.getUpdateGroup(), this.getViewportList(), {
					angle: (selfDecompose.rotation + 90) * (Math.PI/180),
					x: selfDecompose.x,
					y: selfDecompose.y
				});

				this.mine2 = Gb.create('boss-mine-long', this.getUpdateGroup(), this.getViewportList(), {
					angle: (selfDecompose.rotation + 90 + 20) * (Math.PI/180),
					x: selfDecompose.x,
					y: selfDecompose.y
				});

				this.mine3 = Gb.create('boss-mine-long', this.getUpdateGroup(), this.getViewportList(), {
					angle: (selfDecompose.rotation + 90 - 20) * (Math.PI/180),
					x: selfDecompose.x,
					y: selfDecompose.y
				});
			}

			if (this.mineAttacks[this.mineAttackIndex] == 'x5') {

				this.clearMines();

				this.mine1 = Gb.create('boss-mine-long', this.getUpdateGroup(), this.getViewportList(), {
					angle: (selfDecompose.rotation + 90) * (Math.PI/180),
					x: selfDecompose.x,
					y: selfDecompose.y
				});

				this.mine2 = Gb.create('boss-mine-long', this.getUpdateGroup(), this.getViewportList(), {
					angle: (selfDecompose.rotation + 90 + 20) * (Math.PI/180),
					x: selfDecompose.x,
					y: selfDecompose.y
				});

				this.mine3 = Gb.create('boss-mine-long', this.getUpdateGroup(), this.getViewportList(), {
					angle: (selfDecompose.rotation + 90 - 20) * (Math.PI/180),
					x: selfDecompose.x,
					y: selfDecompose.y
				});

				this.mine4 = Gb.create('boss-mine-short', this.getUpdateGroup(), this.getViewportList(), {
					angle: (selfDecompose.rotation + 90 + 10) * (Math.PI/180),
					x: selfDecompose.x,
					y: selfDecompose.y
				});

				this.mine5 = Gb.create('boss-mine-short', this.getUpdateGroup(), this.getViewportList(), {
					angle: (selfDecompose.rotation + 90 - 10) * (Math.PI/180),
					x: selfDecompose.x,
					y: selfDecompose.y
				});
			}

			this.closeTimer.start();

			if (this.mineAttackIndex < this.mineAttacks.length-1) {
				this.mineAttackIndex++;
			} else {
				this.mineAttackIndex = 0;
			}
		},

		onBossDestroy: function() {
			if (this.openTimer)
				this.openTimer.stop();

			if (this.closeTimer)
				this.closeTimer.stop();

			if (this.attackTimer)
				this.attackTimer.stop();

			if (this.laserTimer)
				this.laserTimer.stop();

			if (this.renderer)
				this.renderer.pause();
		},

		clearMines: function() {
			if (this.mine1)
				this.mine1.destroyMine();

			if (this.mine2)
				this.mine2.destroyMine();

			if (this.mine3)
				this.mine3.destroyMine();

			if (this.mine4)
				this.mine4.destroyMine();

			if (this.mine5)
				this.mine5.destroyMine();

			this.mine1 = null;
			this.mine2 = null;
			this.mine3 = null;
			this.mine4 = null;
			this.mine5 = null;
		},

		addRendererDelegate: function(name, handler) {
			this.renderer.once(name, this, handler, "boss-2-renderer-handler");
		},

		cleanUpRendererDelegates: function() {
			if (!this.renderer)
				return;

			this.renderer.levelCleanUp("boss-2-renderer-handler");
		}

	});

	return Boss_2_Body;
});

