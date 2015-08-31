define(["editor-game-object-container", "keyboard", "gb", "matrix-3x3"], function(GameObjectContainer, Keyboard, Gb, Matrix) {
	
	var transformResult = {};
	var matrix = new Matrix();

	var bulletArguments = {
		x: 0,
		y: 0,
		angle: 0,
		rotation: 0
	};

	var bulletsViewport = [{viewport:'Main', layer:'Front'}];

	var PlayerShip = GameObjectContainer.extend({
		// Contructor
		init: function() {
			this._super();

			this.speed = 200;
			this.hp = 5;
			this.maxBulletAmount = 1;

			this.forwardSpeed = this.speed;
			this.angle = 0;
			this.direction = 'right';

			this.viewportOffsetX = 0;
			this.viewportOffsetY = 0;

			this.block = false;

			this.leftShootingPositions = null;
			this.middleShootingPositions = null;
			this.rightShootingPositions = null;

			this.damageComponent = null;
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

				if (this.maxBulletAmount == 1) {
					this.middleShootingPositions.getTransform(transformResult, matrix);

					bulletArguments.x = transformResult.x;
					bulletArguments.y = transformResult.y;
					bulletArguments.angle = this.angle;
					bulletArguments.rotation = this.rotation - 90;

					Gb.add('player-bullet', 'First', bulletsViewport, bulletArguments);
				}

				if (this.maxBulletAmount == 2) {
					this.leftShootingPositions.getTransform(transformResult, matrix);

					bulletArguments.x = transformResult.x;
					bulletArguments.y = transformResult.y;
					bulletArguments.angle = this.angle;
					bulletArguments.rotation = this.rotation - 90;

					Gb.add('player-bullet', 'First', bulletsViewport, bulletArguments);

					this.rightShootingPositions.getTransform(transformResult, matrix);

					bulletArguments.x = transformResult.x;
					bulletArguments.y = transformResult.y;
					bulletArguments.angle = this.angle;
					bulletArguments.rotation = this.rotation - 90;

					Gb.add('player-bullet', 'First', bulletsViewport, bulletArguments);
				}

				if (this.maxBulletAmount == 3) {
					this.middleShootingPositions.getTransform(transformResult, matrix);

					bulletArguments.x = transformResult.x;
					bulletArguments.y = transformResult.y;
					bulletArguments.angle = this.angle;
					bulletArguments.rotation = this.rotation - 90;

					Gb.add('player-bullet', 'First', bulletsViewport, bulletArguments);

					this.leftShootingPositions.getTransform(transformResult, matrix);

					bulletArguments.x = transformResult.x;
					bulletArguments.y = transformResult.y;
					bulletArguments.angle = this.angle;
					bulletArguments.rotation = this.rotation - 90;

					Gb.add('player-bullet', 'First', bulletsViewport, bulletArguments);

					this.rightShootingPositions.getTransform(transformResult, matrix);

					bulletArguments.x = transformResult.x;
					bulletArguments.y = transformResult.y;
					bulletArguments.angle = this.angle;
					bulletArguments.rotation = this.rotation - 90;

					Gb.add('player-bullet', 'First', bulletsViewport, bulletArguments);
				}

			}, 'player-ship-keyboard');

			this.smallExhausts = this.findChildren().allWithType("SmallExhaust");
			this.mediumExhausts = this.findChildren().allWithType("MediumExhaust");      

			this.findChildren().allWithType("Exhaust").forEach(function(exhaust) {
				exhaust.turnOn();
			});

			// Right Scrolling
			Keyboard.onKeyDown(Keyboard.GAME_RIGHT, this, function() {
				if (this.rotation == 90) {
					mediumExhausts.call(this);	
				}				  
			}, 'player-ship-keyboard');

			Keyboard.onKeyUp(Keyboard.GAME_RIGHT, this, function() {
				if (this.rotation == 90) {
					smallExhausts.call(this);
				}
			}, 'player-ship-keyboard');

			// Left Scrolling
			Keyboard.onKeyDown(Keyboard.GAME_LEFT, this, function() {
				if (this.rotation == 270) {
					mediumExhausts.call(this);
				}  
			}, 'player-ship-keyboard');

			Keyboard.onKeyUp(Keyboard.GAME_LEFT, this, function() {
				if (this.rotation == 270) {
					smallExhausts.call(this);
				}
			}, 'player-ship-keyboard');

			// Up Scrolling
			Keyboard.onKeyDown(Keyboard.GAME_UP, this, function() {
				if (this.rotation == 0) {
					mediumExhausts.call(this); 
				} 
			}, 'player-ship-keyboard');

			Keyboard.onKeyUp(Keyboard.GAME_UP, this, function() {
				if (this.rotation == 0) {
					smallExhausts.call(this);
				}
			}, 'player-ship-keyboard');

			// Down Scrolling
			Keyboard.onKeyDown(Keyboard.GAME_DOWN, this, function() {
				if (this.rotation == 180) {
					mediumExhausts.call(this);  
				}
			}, 'player-ship-keyboard');

			Keyboard.onKeyUp(Keyboard.GAME_DOWN, this, function() {
				if (this.rotation == 180) {
					smallExhausts.call(this);
				}
			}, 'player-ship-keyboard');

			smallExhausts.call(this);

			this.damageComponent = this.findComponents().firstWithType('ShipDamage');
			this.damageComponent.disable();
		},

		editorUpdate: function(delta) {
			if (this.block) return;

			// Auto scrolling
			this.x += Math.cos(this.angle) * this.forwardSpeed/4 * delta;
			this.y += Math.sin(this.angle) * this.forwardSpeed/4 * delta;

			// Movement independant of the viewport
			if (Keyboard.isKeyDown(Keyboard.GAME_LEFT)) {
				this.viewportOffsetX -= this.speed * delta;
			}

			if (Keyboard.isKeyDown(Keyboard.GAME_RIGHT)) {
				this.viewportOffsetX += this.speed * delta;
			}

			if (Keyboard.isKeyDown(Keyboard.GAME_UP)) {
				this.viewportOffsetY -= this.speed * delta;
			}

			if (Keyboard.isKeyDown(Keyboard.GAME_DOWN)) {
				this.viewportOffsetY += this.speed * delta;
			}
		},

		onCollide: function(other, response) {
			switch(other.poolId) {
				case 'Obstacle':
					
					this.viewportOffsetX -= response.overlapV.x;
					this.viewportOffsetY -= response.overlapV.y;

					break;
				
				case 'CannonBullet':

					if (!this.damageComponent.isEnabled()) {
						this.damageComponent.enable();
						this.takeDamage();
					}
						

					break;
				
				case 'Laser':
					
					break;
				
				case 'Missile':
					
					if (!this.damageComponent.isEnabled()) {
						this.damageComponent.enable();
						this.takeDamage();
					}

					break;
				
				case 'Boss_1':
					
					this.viewportOffsetX -= response.overlapV.x;
					this.viewportOffsetY -= response.overlapV.y;

					break;
				
				case 'Boss_1_Cables':
						
					this.viewportOffsetX -= response.overlapV.x;
					this.viewportOffsetY -= response.overlapV.y;

					break;
			}

		},

		recycle: function() {
			this._super();
			Keyboard.levelCleanUp('player-ship-keyboard');

			this.middleShootingPositions = null;
			this.leftShootingPositions = null;
			this.rightShootingPositions = null;
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

			if (typeof angle == 'undefined') {
				angle = (this.rotation-90) * (Math.PI/180);		
			}
			else {
				angle = angle % 360;

				if (angle < 0) {
					angle += 360;
				}
			}

			this.angle = angle * (Math.PI/180);
			this.rotation = (angle + 90);
						
			this.forwardSpeed = 200;
			this.execute(this.MOVE);
		},

		stop: function() {
			smallExhausts.call(this);
			this.forwardSpeed = 0;
			this.execute(this.STOP);
		},

		getDirection: function() {
			return Math.round(this.angle * (180 / Math.PI));
		},

		powerUp: function() {
			if (this.maxBulletAmount < 3) {
				this.maxBulletAmount++;
			}
		},

		speedUp: function() {
			if (this.speed < 300) {
				this.speed += 50;
			}
		},

		healthUp: function() {
			if (this.hp < 4) {
				this.hp++;

				this.execute(this.HEALTH_UP, this.hp);
			}
		},

		takeDamage: function() {
			if (this.hp > 0) {
				this.hp--;

				this.execute(this.HEALTH_DOWN, this.hp);
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
	Object.defineProperty(PlayerShip.prototype, "STOP", { get: function() { return 'stop'; } });
	Object.defineProperty(PlayerShip.prototype, "BLOCK", { get: function() { return 'stop'; } });
	Object.defineProperty(PlayerShip.prototype, "UNBLOCK", { get: function() { return 'stop'; } });
	
	Object.defineProperty(PlayerShip.prototype, "HEALTH_UP", { get: function() { return 'health_up'; } });
	Object.defineProperty(PlayerShip.prototype, "HEALTH_DOWN", { get: function() { return 'health_down'; } });

	return PlayerShip;
});
