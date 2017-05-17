define(function(require) {
	var levelRequester = require("level-requester");

	var firstStartInEditorBasicCall = true;
	var firstStartInEditorAdvancedCall = true;

	var win = window.top;

	return {
		skipLoader: function() {
			if (win.location.search) {
				if(
					win.location.search.match(/[?&]?editor=basic/) || 
					win.location.search.match(/[?&]?editor=advanced/)
				) {
					return true;
				}
				
				return win.location.search.match(/[?&]?skipLoader/);
			}

			return false;
		},

		startInEditorBasic: function() {
			if (!firstStartInEditorBasicCall)
				return false;

			firstStartInEditorBasicCall = false;

			if (win.location.search) {
				return win.location.search.match(/[?&]?editor=basic/);
			}

			return false;
		},

		startInEditorAdvanced: function() {
			if (!firstStartInEditorAdvancedCall)
				return false;

			firstStartInEditorAdvancedCall = false;

			if (win.location.search) {
				return win.location.search.match(/[?&]?editor=advanced/);
			}

			return false;
		},

		hasScene: function(success, failure) {
			if (!win.location.search) {
				failure();
				return;
			}
			 
			var sceneMatch = win.location.search.match(/[?&]?dbid=(.*?)$/);
			 
			if (!sceneMatch) {
				failure();
				return;
			}
			
			var dbid = sceneMatch[1];
			
			if (!dbid) {
				failure();
				return;
			}
			
			levelRequester.getScene(dbid, success, failure);
		}
	}
});
