define(["editor-component", "gb"], function(Component, Gb) {
	var AutoHide = Component.extend({
		init: function() {
			this._super();
		},

		editorStart: function(parent) {
			this.parent.hide();
		}
	});

	return AutoHide;
});