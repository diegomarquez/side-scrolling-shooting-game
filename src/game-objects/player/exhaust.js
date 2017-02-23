define(["editor-game-object-container"], function(GameObjectContainer) {
  var Exhaust = GameObjectContainer.extend({
    init: function() {
      this._super();
      
      this.lowHpComponent = null;
    },

    turnOn: function() {
    	this.renderer.play();
        
        var player = this.parent;

        this.lowHpComponent = this.findComponents().firstWithType('LowHpColorBlink');

        player.on(player.HEALTH_DOWN, this, function(playerHp) {
            if (playerHp === 1)
                this.lowHpComponent.enable();
        });

        player.on(player.HEALTH_UP, this, function(playerHp) {
            this.lowHpComponent.disable();
        });
    }
    
  });

  return Exhaust;
});
