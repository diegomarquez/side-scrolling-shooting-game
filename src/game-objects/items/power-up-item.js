define(["editor-game-object-container", "reclaimer"], function(GameObject, Reclaimer) {
  var PowerUpItem = GameObject.extend({
    init: function() {
      this._super();

      this.powerUpType = '';
      this.counter = 0;
      this.startY = 0;
    },

    editorStart: function() {
      this.counter = 0;
      this.startY = this.y;
    },

    editorUpdate: function(delta) {
    	this.y = this.startY + Math.cos(this.counter/20) * 10;
    	this.counter += 100 * delta;
    },

    onCollide: function(other) {
    	switch (this.powerUpType) {
    		case 'power-up':
    			other.powerUp();
    			break;
    		case 'speed-up':
    			other.speedUp();
    			break;
    		case 'health-up':
    			other.healthUp();
    			break;
    	}

    	Reclaimer.mark(this);
    }
  });

  return PowerUpItem;
});

