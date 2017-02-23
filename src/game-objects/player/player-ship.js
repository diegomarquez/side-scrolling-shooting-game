define(
	["editor-game-object-container", "keyboard", "gb", "matrix-3x3", "TweenLite", "DirectionalRotationPlugin", "EasePack"],
	function(GameObjectContainer, Keyboard, Gb, Matrix, Tweenlite, DirectionalRotationPlugin, EasePack) {

	var transformResult = {};
	var matrix = new Matrix();

	var bulletArguments = {
		x: 0,
		y: 0,
		angle: 0,
		rotation: 0,
		playerSpeed: 0
	};

	var powerupFeedbackArguments = {
		x: 0,
		y: 0
	}

	var bulletsViewport = [{viewport:'Main', layer:'Front'}];

	var PlayerShip = GameObjectContainer.extend({
		// Contructor
		init: function() {
			this._super();

			this.speed = 200;
			this.hp = 5;
			this.maxBulletAmount = 1;

			this.forwardSpeed = this.speed;
			this.maxForwardSpeed = this.forwardSpeed;
			this.angle = 0;
			this.direction = 'right';

			this.viewportOffsetX = 0;
			this.viewportOffsetY = 0;

			this.block = false;

			this.leftShootingPositions = null;
			this.middleShootingPositions = null;
			this.rightShootingPositions = null;

			this.lowHpComponent = null;
			this.damageComponent = null;
			this.destroyComponent = null;
			this.explodeComponent = null;
		},

		editorStart: function() {

			this.speed = 200;
			this.hp = 5;
			this.maxBulletAmount = 1;

			this.leftShootingPositions = this.findChildren().first(function (child) {
				return child.typeId == "ShootingPosition" && child.name == 'left';
			});

			this.middleShootingPositions = this.findChildren().first(function (child) {
				return child.typeId == "ShootingPosition" && child.name == 'middle';
			});

			this.rightShootingPositions = this.findChildren().first(function (child) {
				return child.typeId == "ShootingPosition" && child.name == 'right';
			});

			Keyboard.onKeyDown(Keyboard.A, this, function() {
				if (this.block) return;
				if (this.destroyComponent.isEnabled()) return;
				if (this.explodeComponent.isEnabled()) return;

				this.execute("shot");

				if (this.maxBulletAmount == 1) {
					this.middleShootingPositions.getTransform(transformResult, matrix);

					bulletArguments.x = transformResult.x;
					bulletArguments.y = transformResult.y;
					bulletArguments.angle = this.angle;
					bulletArguments.rotation = this.rotation - 90;
					bulletArguments.playerSpeed = this.maxForwardSpeed;

					Gb.add(this.bulletsType, 'First', bulletsViewport, bulletArguments);
				}

				if (this.maxBulletAmount == 2) {
					this.leftShootingPositions.getTransform(transformResult, matrix);

					bulletArguments.x = transformResult.x;
					bulletArguments.y = transformResult.y;
					bulletArguments.angle = this.angle;
					bulletArguments.rotation = this.rotation - 90;
					bulletArguments.playerSpeed = this.maxForwardSpeed;

					Gb.add(this.bulletsType, 'First', bulletsViewport, bulletArguments);

					this.rightShootingPositions.getTransform(transformResult, matrix);

					bulletArguments.x = transformResult.x;
					bulletArguments.y = transformResult.y;
					bulletArguments.angle = this.angle;
					bulletArguments.rotation = this.rotation - 90;
					bulletArguments.playerSpeed = this.maxForwardSpeed;

					Gb.add(this.bulletsType, 'First', bulletsViewport, bulletArguments);
				}

				if (this.maxBulletAmount == 3) {
					this.middleShootingPositions.getTransform(transformResult, matrix);

					bulletArguments.x = transformResult.x;
					bulletArguments.y = transformResult.y;
					bulletArguments.angle = this.angle;
					bulletArguments.rotation = this.rotation - 90;
					bulletArguments.playerSpeed = this.maxForwardSpeed;

					Gb.add(this.bulletsType, 'First', bulletsViewport, bulletArguments);

					this.leftShootingPositions.getTransform(transformResult, matrix);

					bulletArguments.x = transformResult.x;
					bulletArguments.y = transformResult.y;
					bulletArguments.angle = this.angle;
					bulletArguments.rotation = this.rotation - 90;
					bulletArguments.playerSpeed = this.maxForwardSpeed;

					Gb.add(this.bulletsType, 'First', bulletsViewport, bulletArguments);

					this.rightShootingPositions.getTransform(transformResult, matrix);

					bulletArguments.x = transformResult.x;
					bulletArguments.y = transformResult.y;
					bulletArguments.angle = this.angle;
					bulletArguments.rotation = this.rotation - 90;
					bulletArguments.playerSpeed = this.maxForwardSpeed;

					Gb.add(this.bulletsType, 'First', bulletsViewport, bulletArguments);
				}

			}, 'player-ship-keyboard');

			this.smallExhausts = this.findChildren().allWithType("SmallExhaust");
			this.mediumExhausts = this.findChildren().allWithType("MediumExhaust");

			this.findChildren().allWithType("Exhaust").forEach(function(exhaust) {
				exhaust.turnOn();
			});

			// Right Scrolling
			Keyboard.onKeyDown(Keyboard.GAME_RIGHT, this, function() {
				if (this.block) return;
				if (this.destroyComponent.isEnabled()) return;
				if (this.explodeComponent.isEnabled()) return;

				if (this.rotation == 90) {
					mediumExhausts.call(this);
				}
			}, 'player-ship-keyboard');

			Keyboard.onKeyUp(Keyboard.GAME_RIGHT, this, function() {
				if (this.block) return;
				if (this.destroyComponent.isEnabled()) return;
				if (this.explodeComponent.isEnabled()) return;

				if (this.rotation == 90) {
					smallExhausts.call(this);
				}
			}, 'player-ship-keyboard');

			// Left Scrolling
			Keyboard.onKeyDown(Keyboard.GAME_LEFT, this, function() {
				if (this.block) return;
				if (this.destroyComponent.isEnabled()) return;
				if (this.explodeComponent.isEnabled()) return;

				if (this.rotation == 270) {
					mediumExhausts.call(this);
				}
			}, 'player-ship-keyboard');

			Keyboard.onKeyUp(Keyboard.GAME_LEFT, this, function() {
				if (this.block) return;
				if (this.destroyComponent.isEnabled()) return;
				if (this.explodeComponent.isEnabled()) return;

				if (this.rotation == 270) {
					smallExhausts.call(this);
				}
			}, 'player-ship-keyboard');

			// Up Scrolling
			Keyboard.onKeyDown(Keyboard.GAME_UP, this, function() {
				if (this.block) return;
				if (this.destroyComponent.isEnabled()) return;
				if (this.explodeComponent.isEnabled()) return;

				if (this.rotation == 0) {
					mediumExhausts.call(this);
				}
			}, 'player-ship-keyboard');

			Keyboard.onKeyUp(Keyboard.GAME_UP, this, function() {
				if (this.block) return;
				if (this.destroyComponent.isEnabled()) return;
				if (this.explodeComponent.isEnabled()) return;

				if (this.rotation == 0) {
					smallExhausts.call(this);
				}
			}, 'player-ship-keyboard');

			// Down Scrolling
			Keyboard.onKeyDown(Keyboard.GAME_DOWN, this, function() {
				if (this.block) return;
				if (this.destroyComponent.isEnabled()) return;
				if (this.explodeComponent.isEnabled()) return;

				if (this.rotation == 180) {
					mediumExhausts.call(this);
				}
			}, 'player-ship-keyboard');

			Keyboard.onKeyUp(Keyboard.GAME_DOWN, this, function() {
				if (this.block) return;
				if (this.destroyComponent.isEnabled()) return;
				if (this.explodeComponent.isEnabled()) return;

				if (this.rotation == 180) {
					smallExhausts.call(this);
				}
			}, 'player-ship-keyboard');

			smallExhausts.call(this);

			this.lowHpComponent = this.findComponents().firstWithType('ShipLowHp');
			this.damageComponent = this.findComponents().firstWithType('ShipDamage');
			this.destroyComponent = this.findComponents().firstWithType('ShipDestroy');
			this.explodeComponent = this.findComponents().firstWithType('ShipExplode');

			this.explodeComponent.once('complete', this, function() {
				if (this.hp <= 0) {
					this.block = true;
					this.execute(this.DESTROYED);
				}
			});

			this.destroyComponent.once('complete', this, function() {
				this.block = true;
				this.execute(this.DESTROYED);
			});
		},

		editorUpdate: function(delta) {
			if (this.block) return;
			if (this.destroyComponent.isEnabled()) return;
			if (this.explodeComponent.isEnabled()) return;

			// Auto scrolling
			this.x += Math.cos(this.angle) * this.forwardSpeed/4 * delta;
			this.y += Math.sin(this.angle) * this.forwardSpeed/4 * delta;

			// Movement independant of the viewport
			if (Keyboard.isKeyDown(Keyboard.GAME_LEFT)) {
				if ((this.viewportOffsetX - this.speed * delta) > 20)
					this.viewportOffsetX -= this.speed * delta;
			}

			if (Keyboard.isKeyDown(Keyboard.GAME_RIGHT)) {
				if ((this.viewportOffsetX + this.speed * delta) < Gb.canvas.width-20)
					this.viewportOffsetX += this.speed * delta;
			}

			if (Keyboard.isKeyDown(Keyboard.GAME_UP)) {
				if ((this.viewportOffsetY - this.speed * delta) > 20)
					this.viewportOffsetY -= this.speed * delta;
			}

			if (Keyboard.isKeyDown(Keyboard.GAME_DOWN)) {
				if ((this.viewportOffsetY + this.speed * delta) < Gb.canvas.height-20)
					this.viewportOffsetY += this.speed * delta;
			}
		},

		onCollide: function(other, response) {

			if (this.explodeComponent.isEnabled()) {
				return;
			}

			if (this.destroyComponent.isEnabled()) {
				if (other.poolId == 'Obstacle' || other.poolId == 'Boss_1' || other.poolId == 'Boss_Cables') {
					this.destroyComponent.disable();
					this.explodeComponent.enable();
				}

				return;
			}

			switch(other.poolId) {
				case 'Obstacle':

					if (!this.damageComponent.isEnabled()) {
						this.damageComponent.enable();
						this.takeDamage(response.overlapV);
					}

					this.viewportOffsetX -= response.overlapV.x;
					this.viewportOffsetY -= response.overlapV.y;

					break;

				case 'CannonBullet':

					if (!this.damageComponent.isEnabled()) {
						this.damageComponent.enable();
						this.takeDamage(response.overlapV);
					}

					break;

				case 'EnemyShip_1_Type':

					if (!this.damageComponent.isEnabled()) {
						this.damageComponent.enable();
						this.takeDamage(response.overlapV);
					}

					break;

				case 'EnemyShip_2_Type':

					if (!this.damageComponent.isEnabled()) {
						this.damageComponent.enable();
						this.takeDamage(response.overlapV);
					}

					break;

				case 'Laser':

					if (!this.damageComponent.isEnabled()) {
						this.damageComponent.enable();
						this.takeDamage(response.overlapV);
					}

					break;

				case 'Missile':

					if (!this.damageComponent.isEnabled()) {
						this.damageComponent.enable();
						this.takeDamage(response.overlapV);
					}

					break;

				case 'Boss_1':

					if (!this.damageComponent.isEnabled()) {
						this.damageComponent.enable();
						this.takeDamage(response.overlapV);
					}

					this.viewportOffsetX -= response.overlapV.x;
					this.viewportOffsetY -= response.overlapV.y;

					break;

				case 'Boss_1_Cables':

					if (!this.damageComponent.isEnabled()) {
						this.damageComponent.enable();
						this.takeDamage(response.overlapV);
					}

					this.viewportOffsetX -= response.overlapV.x;
					this.viewportOffsetY -= response.overlapV.y;

					break;

				case 'Boss_2_Body':

					if (!this.damageComponent.isEnabled()) {
						this.damageComponent.enable();
						this.takeDamage(response.overlapV);
					}

					this.viewportOffsetX -= response.overlapV.x;
					this.viewportOffsetY -= response.overlapV.y;

					break;

				case 'Boss_3_Body':

					if (!this.damageComponent.isEnabled()) {
						this.damageComponent.enable();
						this.takeDamage(response.overlapV);
					}

					this.viewportOffsetX -= response.overlapV.x;
					this.viewportOffsetY -= response.overlapV.y;

					break;

				case 'Boss_4_Body':

					if (!this.damageComponent.isEnabled()) {
						this.damageComponent.enable();
						this.takeDamage(response.overlapV);
					}

					this.viewportOffsetX -= response.overlapV.x;
					this.viewportOffsetY -= response.overlapV.y;

					break;

				case 'MineType':

					if (!this.damageComponent.isEnabled()) {
						this.damageComponent.enable();
						this.takeDamage(response.overlapV);
					}

					break;
			}

		},

		recycle: function() {
			TweenLite.killTweensOf(this);

			Keyboard.levelCleanUp('player-ship-keyboard');

			this.middleShootingPositions = null;
			this.leftShootingPositions = null;
			this.rightShootingPositions = null;

			this._super();
		},

		isBlocked: function() {
			return this.block;
		},

		blockControls: function() {
			smallExhausts.call(this);
			this.block = true;
			this.execute(this.BLOCK);
		},

		unblockControls: function() {
			this.block = false;
			this.execute(this.UNBLOCK);
			smallExhausts.call(this);
		},

		move: function(angle) {

			if (typeof angle != 'undefined' && angle != null) {
				angle = angle % 360;

				if (angle < 0) {
					angle += 360;
				}

				this.angle = angle * (Math.PI/180);

				Tweenlite.to(this, 0.3, { directionalRotation : (angle + 90) + "_short" });
			}

			Tweenlite.to(this, 1, { forwardSpeed : this.maxForwardSpeed });

			this.execute(this.MOVE);
		},

		setMaxForwardSpeed: function(speed) {
			this.maxForwardSpeed = speed;
		},

		stopMovement: function() {
			smallExhausts.call(this);

			this.forwardSpeed = 0;
			this.maxForwardSpeed = 200;

			TweenLite.killTweensOf(this);

			this.execute(this.STOP_MOVEMENT);
		},

		isStopped: function() {
			return this.forwardSpeed === 0;
		},

		getMaxForwardSpeed: function() {
			return this.maxForwardSpeed;
		},

		getDirection: function() {
			return Math.round(this.angle * (180 / Math.PI));
		},

		powerUp: function() {
			if (this.maxBulletAmount < 3) {
				this.maxBulletAmount++;

				powerupFeedbackArguments.x = this.X;
				powerupFeedbackArguments.y = this.Y;

				Gb.create('PowerUp', 'First', bulletsViewport, powerupFeedbackArguments);
			}
		},

		speedUp: function() {
			if (this.speed < 300) {
				this.speed += 50;

				powerupFeedbackArguments.x = this.X;
				powerupFeedbackArguments.y = this.Y;

				Gb.create('SpeedUp', 'First', bulletsViewport, powerupFeedbackArguments);
			}
		},

		healthUp: function() {
			this.lowHpComponent.disable();
			
			if (this.hp < 5) {
				this.hp++;

				powerupFeedbackArguments.x = this.X;
				powerupFeedbackArguments.y = this.Y;

				Gb.create('HpUp', 'First', bulletsViewport, powerupFeedbackArguments);

				this.execute(this.HEALTH_UP, this.hp);
			}
		},

		takeDamage: function(hitDirection) {

			if (this.hp > 0) {
				this.hp--;
				this.execute(this.HEALTH_DOWN, this.hp);
				
				if (this.hp == 1) {
					this.execute(this.DAMAGE);
					
					this.lowHpComponent.enable();
				}
				else if (this.hp == 0) {
					this.execute(this.DAMAGE);

					this.damageComponent.disable();
					this.lowHpComponent.disable();

					this.destroyComponent.enable();
					this.destroyComponent.setDirection(hitDirection);

					noExhaust.call(this);

					this.execute(this.NO_CONTROL);
				} else {

					if (this.hp <= 0)
						return;

					this.execute(this.DAMAGE);

					powerupFeedbackArguments.x = this.X;
					powerupFeedbackArguments.y = this.Y;

					p = null;

					// Loose a power up at random
					if (Math.random() > 0.5) {
						if (this.maxBulletAmount > 1) {
							this.maxBulletAmount--;

							p = Gb.create('PowerDown', 'First', bulletsViewport, powerupFeedbackArguments);
						}
					} else {
						if (this.speed > 200) {
							this.speed -= 50;
							p = Gb.create('SpeedDown', 'First', bulletsViewport, powerupFeedbackArguments);
						}
					}

					if (!p) {
						Gb.create('HpDown', 'First', bulletsViewport, powerupFeedbackArguments);
					}
				}
			}
		}
	});

	var noExhaust = function() {
		this.smallExhausts.forEach(function (exhaust) {
			exhaust.hide();
		});

		this.mediumExhausts.forEach(function (exhaust) {
			exhaust.hide();
		});
	}

	var smallExhausts = function() {
		if (this.block || this.forwardSpeed == 0) return;

		this.smallExhausts.forEach(function (exhaust) {
			exhaust.show();
		});

		this.mediumExhausts.forEach(function (exhaust) {
			exhaust.hide();
		});
	}

	var mediumExhausts = function() {
		if (this.block || this.forwardSpeed == 0) return;

		this.smallExhausts.forEach(function (exhaust) {
			exhaust.hide();
		});

		this.mediumExhausts.forEach(function (exhaust) {
			exhaust.show();
		});
	}

	Object.defineProperty(PlayerShip.prototype, "MOVE", { get: function() { return 'move'; } });
	Object.defineProperty(PlayerShip.prototype, "STOP_MOVEMENT", { get: function() { return 'stop_movement'; } });
	Object.defineProperty(PlayerShip.prototype, "BLOCK", { get: function() { return 'block'; } });
	Object.defineProperty(PlayerShip.prototype, "UNBLOCK", { get: function() { return 'unblock'; } });

	Object.defineProperty(PlayerShip.prototype, "HEALTH_UP", { get: function() { return 'health_up'; } });
	Object.defineProperty(PlayerShip.prototype, "HEALTH_DOWN", { get: function() { return 'health_down'; } });

	Object.defineProperty(PlayerShip.prototype, "DAMAGE", { get: function() { return 'damage'; } });
	Object.defineProperty(PlayerShip.prototype, "DESTROYED", { get: function() { return 'destroyed'; } });
	Object.defineProperty(PlayerShip.prototype, "NO_CONTROL", { get: function() { return 'no_control'; } });

	return PlayerShip;
});
