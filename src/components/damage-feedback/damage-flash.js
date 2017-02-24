define(["editor-component", "gb"], function(Component, Gb) {
	var DamageFlash = Component.extend({
		init: function() {
			this._super();

			this.flashTime = 0;
		},

		editorStart: function(parent) {
			parent.renderer.tint(255, 0, 0);

			parent.findChildren().recurse().all(function(child) { return child.hasRenderer(); }).forEach(function(child) {
				child.renderer.tint(255, 0, 0);
			});

			setTimeout(function() {
				if (!parent)
					return;

				if (!parent.renderer)
					return;

				parent.renderer.disableTint();

				parent.findChildren().recurse().all(function(child) { return child.hasRenderer(); }).forEach(function(child) {
					child.renderer.disableTint();
				});

				parent.removeComponent(this);
			}.bind(this), this.flashTime);
		},
	});

	return DamageFlash;
});