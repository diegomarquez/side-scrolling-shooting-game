define(["editor-game-object-container", "gb"], function(GameObject, Gb) {
  var BossWarning = GameObject.extend({
    init: function() {
      this._super();
    },

    editorStart: function() {
      Gb.create('WarningMessage', 'First', [{viewport: 'Main', layer: 'Front'}]);
    },

    editorUpdate: function(delta) {
      
    }
  });

  return BossWarning;
});

