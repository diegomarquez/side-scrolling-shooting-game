define(["game-object"], function(GameObject) {
  var EditorGameObject = GameObject.extend({
    init: function() {
      this._super();
    },

    start: function() {
      this._super();
      this.editorStart();
    },

    update: function(delta) {
      this.editorUpdate(delta);  
    },

    editorStart: function() {},

    editorUpdate: function(delta) {}
  });

  return EditorGameObject;
});
