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

			// this.laserAttacks = ['x1', 'x2', 'x3'];
			// this.mineAttacks = ['dummyx3', 'dummyx5', 'guidedx2', 'guidedx3'];
			
			this.laserAttacks = null;
			this.mineAttacks = null;

			this.laserAttackIndex = 0;
			this.mineAttackIndex = 0;
		},

		editorStart: function() {

			if (!this.laserAttacks && !this.mineAttacks)
				throw new Error('No attacks set on boss-2');

			this.attackCount = 0;
			this.laserAttackIndex = 0;
			this.mineAttackIndex = 0;

			this.renderer.play('closed');

			TimerFactory.get(this, 'openTimer', 'openTimer');
			TimerFactory.get(this, 'attackTimer', 'attackTimer');
			TimerFactory.get(this, 'closeTimer', 'closeTimer');
			TimerFactory.get(this, 'laserTimer', 'laserTimer');

			this.collider = this.findComponents().firstWithProp('collider');
		},

		editorUpdate: function(delta) {
								
		},

		onBossStart: function() {
			this.openTimer.configure({ delay: 6000, removeOnComplete:false });
			this.attackTimer.configure({ delay: 3000, removeOnComplete:false });
			this.closeTimer.configure({ delay: 2000, removeOnComplete:false });
			this.laserTimer.configure({ delay: 2000, removeOnComplete:false });

			this.openTimer.start();

			this.openTimer.on(this.openTimer.COMPLETE, function() {
				this.renderer.play('opening');

				this.renderer.once('complete', this, function() {

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
				this.renderer.play('closing');
				this.collider.enable();

				this.renderer.once('complete', this, function() {
					
					this.renderer.play('closed');

					this.openTimer.start();
				});
			});

			this.laserTimer.on(this.laserTimer.COMPLETE, function() {
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

		onCollide: function(other) {
			
		},

		recycle: function() {
			if (this.openTimer)
				this.openTimer.remove();

			if (this.closeTimer)
				this.closeTimer.remove();

			if (this.attackTimer)
				this.attackTimer.remove();

			if (this.laserTimer)
				this.laserTimer.remove();

			if (this.laser1)
				Gb.reclaimer.mark(this.laser1);
			
			if (this.laser2)
				Gb.reclaimer.mark(this.laser2);

			if (this.laser3)
				Gb.reclaimer.mark(this.laser3);

			this.laser1 = null;
			this.laser2 = null;
			this.laser3 = null;
		},

		doLaserAttack: function() {
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

			this.closeTimer.start();			

			if (this.mineAttackIndex < this.mineAttacks.length-1) {
				this.mineAttackIndex++;	
			} else {
				this.mineAttackIndex = 0;
			}
		}

	});

	return Boss_2_Body;
});

