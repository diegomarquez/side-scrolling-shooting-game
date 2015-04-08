define(["editor-game-object-container", "keyboard", "gb"], function(GameObjectContainer, Keyboard, Gb) {
  var PlayerShip = GameObjectContainer.extend({
    // Contructor
    init: function() {
      this._super();

      this.speed = 200;
      this.forwardSpeed = this.speed;

      this.viewportOffsetX = 0;
      this.viewportOffsetY = 0;

      this.block = true;

      this.bulletsViewport = [{viewport:'Main', layer:'Front'}];
    },

    editorStart: function() {
      Keyboard.onKeyDown(Keyboard.A, this, function() {
      	if (this.block) return;

		    var bullet = Gb.add('player-bullet', 'First', this.bulletsViewport);

		    bullet.x = this.X + 20;
		    bullet.y = this.Y;
      }, 'player-ship-keyboard');

      this.smallExhausts = this.findChildren().allWithType("SmallExhaust");
      this.mediumExhausts = this.findChildren().allWithType("MediumExhaust");      
      this.largeExhausts = this.findChildren().allWithType("LargeExhaust");

      this.findChildren().allWithType("Exhaust").forEach(function(exhaust) {
      	exhaust.turnOn();
      });

      Keyboard.onKeyDown(Keyboard.GAME_LEFT, this, function() {
      	smallExhausts.call(this);
      }, 'player-ship-keyboard');

      Keyboard.onKeyDown(Keyboard.GAME_RIGHT, this, function() {
      	largeExhausts.call(this);
      }, 'player-ship-keyboard');

      Keyboard.onKeyUp(Keyboard.GAME_RIGHT, this, function() {
      	mediumExhausts.call(this);
      }, 'player-ship-keyboard');

      Keyboard.onKeyUp(Keyboard.GAME_LEFT, this, function() {
      	mediumExhausts.call(this);
      }, 'player-ship-keyboard');

      this.largeExhausts.forEach(function(exhaust) {
      	exhaust.hide();
      });

      smallExhausts.call(this);
    },

    editorUpdate: function(delta) {
    	if (this.block) return;

      // Auto scrolling
      this.x += this.forwardSpeed/4 * delta;

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

    blockControls: function() {
    	noExhaust.call(this);
    	this.block = true;
    	this.execute(this.BLOCK);
    },

    unblockControls: function() {
    	this.block = false;
    	this.execute(this.UNBLOCK);
    	mediumExhausts.call(this);
    },

    move: function() {
    	this.forwardSpeed = 200;
    	this.execute(this.MOVE);
    },

    stop: function() {
    	smallExhausts.call(this);
    	this.forwardSpeed = 0;
    	this.execute(this.STOP);
    }
  });

	var noExhaust = function() {
		this.smallExhausts.forEach(function (exhaust) {
    	exhaust.hide();
    });

    this.mediumExhausts.forEach(function (exhaust) {
    	exhaust.hide();
    });

    this.largeExhausts.forEach(function (exhaust) {
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

    this.largeExhausts.forEach(function (exhaust) {
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

    this.largeExhausts.forEach(function (exhaust) {
    	exhaust.hide();
    });
	}

	var largeExhausts = function() {
		if (this.block || this.forwardSpeed == 0) return;

		this.smallExhausts.forEach(function (exhaust) {
    	exhaust.hide();
    });

    this.mediumExhausts.forEach(function (exhaust) {
    	exhaust.hide();
    });

    this.largeExhausts.forEach(function (exhaust) {
    	exhaust.show();
    });
	}

	Object.defineProperty(PlayerShip.prototype, "MOVE", { get: function() { return 'move'; } });
	Object.defineProperty(PlayerShip.prototype, "STOP", { get: function() { return 'stop'; } });
	Object.defineProperty(PlayerShip.prototype, "BLOCK", { get: function() { return 'stop'; } });
	Object.defineProperty(PlayerShip.prototype, "UNBLOCK", { get: function() { return 'stop'; } });

  return PlayerShip;
});
