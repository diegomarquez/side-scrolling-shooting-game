define(["game-object"], function(GameObject) {
  var EditorGameObject = GameObject.extend({
    init: function() {
      this._super();
    },

    reset: function() {
    	this._super();

    	this.started = false;
    	this.structuralChanged = false;
    },

    start: function() {
      this._super();
      this.editorStart();
      
      this.started = true;
    },

    setRenderer: function(renderer) {
    	this._super(renderer);
    	registerComponentChanges.call(this, renderer);
    },

    removeRenderer: function() {
    	registerChildChanges.call(this, this.renderer);
    	this._super();
    },

		addComponent: function(component) {
			this._super(component);
			registerComponentChanges.call(this, component);
		},

		removeComponent: function(component) {
			registerComponentChanges.call(this, component);
			this._super(component);
		},

    update: function(delta) {
    	this._super(delta);
      this.editorUpdate(delta);  
    },

    editorStart: function() {
    	
    },

    editorUpdate: function(delta) {

    },

    hasStructuralChanges: function() {
    	return this.structuralChanged;
    }
  });

  var registerComponentChanges = function(component) {
  	if (this.started && !EditorConfig.isEditorComponent(component.typeId)) {
  		this.structuralChanged = true;	
  	}
  }

  return EditorGameObject;
});
