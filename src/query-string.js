define(function(require) {
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
			 
			var sceneMatch = win.location.search.match(/[?&]?dbsurl=(.*?)$/);

			if (!sceneMatch) {
				failure();
				return;
			}
			
			var dbsurl = sceneMatch[1];
			
			if (!dbsurl) {
				failure();
				return;
			}

			var xhr = new XMLHttpRequest();

			var complete = false;

			xhr.onreadystatechange = function()
			{
				if (complete)
					return;

				if (xhr.readyState == 4 && xhr.status == 200 && xhr.status != 0) {
					var levelCompressor = require("level-compressor");
					success(levelCompressor.decompress(xhr.responseText))

					complete = true;
				}
				else if (xhr.status != 200 && xhr.status != 0) {
					failure();

					complete = true;
				}
			}

			xhr.open("GET", decodeURIComponent(dbsurl));

			xhr.send();
		}
	}
});
