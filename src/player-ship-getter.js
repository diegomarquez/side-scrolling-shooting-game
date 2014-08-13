define(function(require) {

  var gb = require('gb');

  var PlayerShipGetter = require("class").extend({
    init: function() {
      this.playerShip = null;
    },

    get: function() {
      if (!this.playerShip) {
        this.playerShip = gb.add('PlayerShip', 'First', 'MainMiniFront');

        this.playerShip.once(this.playerShip.RECYCLE, this, function() {
          this.playerShip = null;
        });
      }

      return this.playerShip;
    }
  });

  return new PlayerShipGetter();
});
