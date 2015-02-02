define(["editor-game-object-container", "keyboard", "gb"], function(GameObjectContainer, Keyboard, Gb) {
  var PlayerShip = GameObjectContainer.extend({
    // Contructor
    init: function() {
      this._super();

      this.speed = 200;

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
      });
    },

    editorUpdate: function(delta) {
    	if (this.block) return;

      // Auto scrolling
      this.x += this.speed/4 * delta;

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

    blockControls: function() {
    	this.block = true;
    },

    unblockControls: function() {
    	this.block = false;
    }
  });

  return PlayerShip;
});
