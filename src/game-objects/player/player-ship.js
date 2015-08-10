define(["editor-game-object-container", "keyboard", "gb", "matrix-3x3"], function(GameObjectContainer, Keyboard, Gb, Matrix) {
	
	var transformResult = {};
	var matrix = new Matrix();

	var PlayerShip = GameObjectContainer.extend({
		// Contructor
		init: function() {
			this._super();

			this.speed = 200;
			this.forwardSpeed = this.speed;
			this.angle = 0;
			this.direction = 'right';

			this.viewportOffsetX = 0;
			this.viewportOffsetY = 0;

			this.block = false;

			this.bulletsViewport = [{viewport:'Main', layer:'Front'}];
			this.shootingPosition = null;
		},

		editorStart: function() {
			
			this.shootingPosition = this.findChildren().firstWithType("ShootingPosition");

			Keyboard.onKeyDown(Keyboard.A, this, function() {
				if (this.block) return;

				this.shootingPosition.getTransform(transformResult, matrix);

				var bullet = Gb.add('player-bullet', 'First', this.bulletsViewport);
				
				bullet.x = transformResult.x;
				bullet.y = transformResult.y;
				bullet.angle = this.angle;
				bullet.rotation = this.rotation - 90;

			}, 'player-ship-keyboard');

			this.smallExhausts = this.findChildren().allWithType("SmallExhaust");
			this.mediumExhausts = this.findChildren().allWithType("MediumExhaust");      

			this.findChildren().allWithType("Exhaust").forEach(function(exhaust) {
				exhaust.turnOn();
			});

			Keyboard.onKeyDown(Keyboard.GAME_RIGHT, this, function() {
				mediumExhausts.call(this);  
			}, 'player-ship-keyboard');

			Keyboard.onKeyUp(Keyboard.GAME_RIGHT, this, function() {
				smallExhausts.call(this);
			}, 'player-ship-keyboard');

			smallExhausts.call(this);
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

		onCollide: function(other) {
			
		},

		recycle: function() {
			this._super();
			Keyboard.levelCleanUp('player-ship-keyboard');
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

			angle = angle % 360;

			if (angle < 0) {
				angle += 360;
			}

			this.angle = angle * (Math.PI/180) || 0;
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

	return PlayerShip;
});
