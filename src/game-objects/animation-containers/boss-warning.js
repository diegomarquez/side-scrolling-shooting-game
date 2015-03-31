define(["editor-game-object-container", "gb"], function(GameObject, Gb) {
  var BossWarning = GameObject.extend({
    init: function() {
      this._super();
    },

    editorStart: function() {
      Gb.create('WarningMessage', 'First', [{viewport: 'Main', layer: 'Front'}], {
      	onComplete: function() { Gb.reclaimer.mark(this); }.bind(this)
      });
    },

    editorUpdate: function(delta) {
      
    }
  });

  return BossWarning;
});

