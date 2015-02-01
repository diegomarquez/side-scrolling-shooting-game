define(["editor-component", "gb"], function(EditorComponent, Gb) {
	var ActivateOnView = EditorComponent.extend({
		init: function() {
			this._super();
		},

		editorStart: function(parent) {
			this.onView = false;
		},

		editorAdded: function(parent) {
			this.parentStart = this.parent.editorStart;
			this.parentUpdate = this.parent.editorUpdate;

			this.parent.editorStart = function() {};
    	this.parent.editorUpdate = function() {};
		},

		editorUpdate: function(delta) {
			if (!this.onView && this.parent.getViewportVisibility('Main')) {

				this.parent.editorStart = this.parentStart;
    		this.parent.editorUpdate = this.parentUpdate;

    		this.parent.editorStart();

    		this.onView = true;
    	}

    	if (this.onView && !this.parent.getViewportVisibility('Main')) {
    		Gb.reclaimer.claim(this.parent);
    	}
		}
	});

	return ActivateOnView;
});