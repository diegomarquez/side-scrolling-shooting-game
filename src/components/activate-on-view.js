define(["component", "gb"], function(Component, Gb) {
	var ActivateOnView = Component.extend({
		init: function() {
			this._super();
		},

		start: function() {
			this.onView = false;
		},

		added: function() {
			this.parentStart = this.parent.editorStart;
			this.parentUpdate = this.parent.editorUpdate;

			this.parent.editorStart = function() {};
    	this.parent.editorUpdate = function() {};
		},

		update: function(delta) {
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