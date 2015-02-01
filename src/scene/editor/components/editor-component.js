define(["component"], function(Component) {
  var EditorComponent = Component.extend({
    init: function() {
      this._super();
    },

    start: function(parent) {
      this._super();
      this.editorStart();
    },

    added: function(parent) {
    	this._super(parent);
    	this.editorAdded();
    },

    update: function(delta) {
    	this._super(delta);
    	this.editorUpdate(delta);
    },

    editorStart: function() {
    	
    },

    editorAdded: function() {
    	
    },

    editorUpdate: function(delta) {

    },
  });

  return EditorComponent;
});
