define(["component", "gb"], function(Component, Gb) {
	var ClaimOnDelegate = Component.extend({
		init: function() {
			this._super();
		},

		start: function(parent) {
      		this._super(parent);

      		if (!this.delegateName)
				throw new Error('Missing delegateName property');

      		this.parent.on(this.delegateName, this, function() {
      			Gb.reclaimer.mark(this.parent);
      		});
		}
	});

	return ClaimOnDelegate;
});