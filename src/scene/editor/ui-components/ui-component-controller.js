define(function(require) {
	var UIComponentController = require('ui-component').extend({
		init: function(html, parent) {
			this._super();

			this.html = html;
			this.parent = parent;
		}
	});

	return UIComponentController;
});
          