define(["editor-game-object-container", "reclaimer"], function(GameObject, Reclaimer) {
  var Explosion = GameObject.extend({
    init: function() {
      this._super();
    },

    start: function() {
    	this._super();

    	this.renderer.once(this.renderer.COMPLETE, this, function() {
    		Reclaimer.mark(this);
    	});
    },
    
    editorStart: function() {
    	this.renderer.play();
    }
  });

  return Explosion;
});
