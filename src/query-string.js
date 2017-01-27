define(function(require) {
	var levelRequester = require("level-requester");

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
		},

		hasScene: function(success, failure) {
			if (!window.location.search) {
				failure();
				return;
			}

			var sceneMatch = window.location.search.match(/[?&]?scene=(.*?)@(.*?)$/);

			if (!sceneMatch) {
				failure();
				return;
			}
			
			throw new Error("Should get the scene directly from the query string")

			// var id = sceneMatch[1];
			// var remote = sceneMatch[2];
			// 
			// if (!id) {
			// 	failure();
			// 	return;
			// }
			// 
			// if (!remote) {
			// 	failure();
			// 	return;
			// }
		}
	}
});
