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
      Keyboard.onKeyDown(Keyboard.A, this, fire);
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
    	Keyboard.removeKeyDown(Keyboard.A, this, fire);
    },

    blockControls: function() {
    	this.block = true;
    	this.execute(this.BLOCK);
    },

    unblockControls: function() {
    	this.block = false;
    	this.execute(this.UNBLOCK);
    },

    move: function() {
    	this.forwardSpeed = 200;
    	this.execute(this.MOVE);
    },

    stop: function() {
    	this.forwardSpeed = 0;
    	this.execute(this.STOP);
    }
  });

	var fire = function() {
		if (this.block) return;

    var bullet = Gb.add('player-bullet', 'First', this.bulletsViewport);

    bullet.x = this.X + 20;
    bullet.y = this.Y;
	}

	Object.defineProperty(PlayerShip.prototype, "MOVE", { get: function() { return 'move'; } });
	Object.defineProperty(PlayerShip.prototype, "STOP", { get: function() { return 'stop'; } });
	Object.defineProperty(PlayerShip.prototype, "BLOCK", { get: function() { return 'stop'; } });
	Object.defineProperty(PlayerShip.prototype, "UNBLOCK", { get: function() { return 'stop'; } });

  return PlayerShip;
});
