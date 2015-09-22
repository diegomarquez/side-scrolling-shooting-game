define(["editor-component", "gb"], function(Component, Gb) {
	var DamageExplosions = Component.extend({
		init: function() {
			this._super();

			this.instantEffects = null;
			this.lastingEffects = null;

			this.instantEffectGenerators = null;
			this.lastingEffectGenerators = null;
		},

		editorStart: function(parent) {

			if (!this.instantEffects)
				throw new Error("Missing instantEffect attribute");

			if (!this.lastingEffects)
				throw new Error("Missing lastingEffect attribute");

			this.parent.on('damaged', this, function() {
				this.instantEffectGenerators = Gb.addComponentsTo(this.parent, this.instantEffects);
      			this.lastingEffectGenerators = Gb.addComponentsTo(this.parent, this.lastingEffects);
			});

			this.parent.on('repaired', this, function() {
				this.parent.removeComponents(this.instantEffectGenerators);
				this.parent.removeComponents(this.lastingEffectGenerators);
			});
		}
	});

	return DamageExplosions;
});