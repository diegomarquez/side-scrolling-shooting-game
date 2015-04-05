define(["component"], function(Component) {
  var EditorComponent = Component.extend({
    init: function() {
      this._super();
    },

    start: function (parent) {
      this._super();
      this.editorStart(parent);
    },

    added: function (parent) {
    	this._super(parent);
    	this.editorAdded(parent);
    },

    update: function (delta) {
    	this._super(delta);
    	this.editorUpdate(delta);
    },

    editorStart: function (parent) {
    	
    },

    editorAdded: function (parent) {
    	
    },

    editorUpdate: function (delta) {

    },
  });

  return EditorComponent;
});
