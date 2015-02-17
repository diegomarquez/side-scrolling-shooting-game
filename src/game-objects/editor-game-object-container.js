define(["game-object-container", "editor-config"], function(GameObjectContainer, EditorConfig) {
  var EditorGameObjectContainer = GameObjectContainer.extend({
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

    add: function(child) {
    	this._super(child);
    	registerChildChanges.call(this, child);
    },

    remove: function(child) {
    	registerChildChanges.call(this, child);
    	this._super(child);
    },

    setRenderer: function(renderer) {
    	this._super(renderer);
    	registerComponentChanges.call(this, renderer);
    },

    removeRenderer: function() {
    	registerComponentChanges.call(this, this.renderer);
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
    },

    setStructuralChanges: function() {
    	this.structuralChanged = true;
    }
  });

  var registerChildChanges = function(child) {
  	if (!child) return;

  	if (this.started && !EditorConfig.isEditorGameObject(child.typeId)) {
  		this.structuralChanged = true;	
  	}
  }

  var registerComponentChanges = function(component) {
  	if (!component) return;

  	if (this.started && !EditorConfig.isEditorComponent(component.typeId)) {
  		this.structuralChanged = true;	
  	}
  }

  return EditorGameObjectContainer;
});
