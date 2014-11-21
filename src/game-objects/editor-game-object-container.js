define(["game-object-container"], function(GameObjectContainer) {
  var EditorGameObjectContainer = GameObjectContainer.extend({
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

  return EditorGameObjectContainer;
});
