define(function (require) {
	var mode = 'basic';

	return {
		setAdvanced: function() {
			mode = 'advanced';
		},

		setBasic: function() {
			mode = 'basic';	
		},

		isAdvanced: function() {
			return mode == 'advanced';
		},

		isBasic: function() {
			return mode == 'basic';
		}
	}
});