define(["editor-game-object-container"], function(GameObjectContainer) {
  var Exhaust = GameObjectContainer.extend({
    init: function() {
      this._super();
    },

    turnOn: function() {
    	this.renderer.play();
    },
    
  });

  return Exhaust;
});
