define(["editor-component", "gb"], function(Component, Gb) {
	var DamageFlash = Component.extend({
		init: function() {
			this._super();
		},

		editorStart: function(parent) {
			parent.renderer.tint(255, 0, 0);

			parent.findChildren().recurse().all(function(child) { return child.hasRenderer(); }).forEach(function(child) {
				child.renderer.tint(255, 0, 0);
			});

			setTimeout(function() {
				parent.renderer.disableTint();

				parent.findChildren().recurse().all(function(child) { return child.hasRenderer(); }).forEach(function(child) {
					child.renderer.disableTint();
				});

				parent.removeComponent(this);
			}.bind(this), 20);
		},
	});

	return DamageFlash;
});