define(function(require)
{
	var gb = require('gb');
	var sceneSaveUI = require('scene-save-ui');

	require('facebook');

	var Facebook = function() {
		this.initialized = false;
	};

	Facebook.prototype.share = function() {
		if (gb.getEnvironment() === 'dev') {
			if (!this.initialized) {
				FB.init({
					appId: "678625568980303",
				   	version : "v2.8"
				});
			}

			FB.ui({
				method: 'share',
				href: 'http://www.treintipollo.com',
			});

			this.initialized = true;
		} else {
			if (!this.initialized) {
				FB.init({
					appId: "1910504332510208",
				   	version : "v2.8"
				});
			}

			sceneSaveUI.serializeAndStoreRemoteShare(function(sceneName, scenId, sceneRemoteUrl) {
				FB.ui({
					method: 'share',
					href: 'http://www.treintipollo.com/' + sceneRemoteUrl + '/' + scenId,
				});
			});

			this.initialized = true;
		}				
	}

	return new Facebook();
});