define(function() {

	var firstStartInEditorBasicCall = true;
	var firstStartInEditorAdvancedCall = true;

	return {
		skipLoader: function() {
			if (window.location.search) {
				if(
					window.location.search.match(/[?&]?editor=basic/) || 
					window.location.search.match(/[?&]?editor=advanced/)
				) {
					return true;
				}
				
				return window.location.search.match(/[?&]?skipLoader/);
			}

			return false;
		},

		startInEditorBasic: function() {
			if (!firstStartInEditorBasicCall)
				return false;

			firstStartInEditorBasicCall = false;

			if (window.location.search) {
				return window.location.search.match(/[?&]?editor=basic/);
			}

			return false;
		},

		startInEditorAdvanced: function() {
			if (!firstStartInEditorAdvancedCall)
				return false;

			firstStartInEditorAdvancedCall = false;

			if (window.location.search) {
				return window.location.search.match(/[?&]?editor=advanced/);
			}

			return false;
		}
	}
});