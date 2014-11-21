define(["editor-game-object", "keyboard", "gb"], function(GameObject, Keyboard, Gb) {
  var PlayerShip = GameObject.extend({
    // Contructor
    init: function() {
      this._super();

      this.speed = 200;

      this.viewportOffsetX = 0;
      this.viewportOffsetY = 0;
    },

    editorStart: function() {
      Keyboard.onKeyDown(Keyboard.A, this, function() {
        var bullet = Gb.add('PlayerBullet', 'First', 'MainMiniFront');

        bullet.x = this.X + 20;
        bullet.y = this.Y;
      });
    },

    editorUpdate: function(delta) {
      // Auto scrolling
      // this.x += 0.5;

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

    }

  });

  return PlayerShip;
});
