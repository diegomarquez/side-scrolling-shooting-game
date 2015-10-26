define(["editor-component", "gb"], function(Component, Gb) {
	var CheckOutOfBOunds = Component.extend({
		init: function() {
			this._super();

			this.outOfBounds = false;
		},

		editorStart: function(parent) {
			this.outOfBounds = false;	
		},

		editorUpdate: function(parent) {
			if (!this.outOfBounds && !this.parent.getViewportVisibility('Main')) {
    			this.parent.execute('out-of-screen-bounds');
    			this.outOfBounds = true;
    		} else if (this.outOfBounds && this.parent.getViewportVisibility('Main')) {
    			this.parent.execute('in-screen-bounds');
    			this.outOfBounds = false;
    		}
		}
	});

	return CheckOutOfBOunds;
});