define(function(require) {
	var UIComponentController = require('ui-component').extend({
		init: function(html) {
			this._super();

			this.html = html;
		}
	});

	return UIComponentController;
});
          