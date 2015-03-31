define(["editor-component", "gb"], function(EditorComponent, Gb) {
	var p = {};
	
	var ActivateOnView = EditorComponent.extend({
		init: function() {
			this._super();
		},

		editorStart: function(parent) {
			this.onView = false;

			this.mainViewport = Gb.viewports.get('Main');
		},

		editorAdded: function(parent) {
			this.parentStart = this.parent.editorStart;
			this.parentUpdate = this.parent.editorUpdate;

			if (!this.parent.saveEditorStart) {
				this.parent.saveEditorStart = this.parent.editorStart;
				this.parent.editorStart = function() {}
			}

			if (!this.parent.saveEditorUpdate) {
				this.parent.saveEditorUpdate = this.parent.editorUpdate;
				this.parent.editorUpdate = function() {}
			}
		},

		editorUpdate: function(delta) {
			if (!this.onView && this.parent.getViewportVisibility('Main')) {
				this.parent.editorStart = this.parent.saveEditorStart;
    		this.parent.editorUpdate = this.parent.saveEditorUpdate;

    		if (!this.parent.activatedOnView) {
    			this.parent.editorStart();	
    		}

    		this.parent.activatedOnView = true;
    		this.onView = true;
    	}

    	if (this.onView && !this.parent.getViewportVisibility('Main')) { 
				p = this.parent.matrix.transformPoint(0, 0, p);
    		
    		if (Math.floor(this.mainViewport.x + p.x) <= 0) {
    			Gb.reclaimer.mark(this.parent);   				
    		}    		
    	}
		}
	});

	return ActivateOnView;
});