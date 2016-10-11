define(function(require)
{
	var gb = require('gb');
	var sceneSaveUI = require('scene-save-ui');

	var Facebook = function() {
		this.initialized = false;
	};

	Facebook.prototype.share = function() {
		var self = this;

		if (gb.getEnvironment() === 'dev') {
			if (!this.initialized) {
				window.fbAsyncInit = function() {
					init("678625568980303");
					share('http://www.treintipollo.com');

					self.initialized = true;
				};

			  	loadFacebookSdk(document, 'script', 'facebook-jssdk');

				return;
			}

			if (this.initialized) {
				share('http://www.treintipollo.com');
			}
			
		} else {
			if (!this.initialized) {
				window.fbAsyncInit = function() {
					init("1910504332510208");

					sceneSaveUI.serializeAndStoreRemoteShare(function(sceneName, scenId, sceneRemoteUrl) {
						share('http://www.treintipollo.com/space-maze/' + sceneRemoteUrl + '/' + scenId);

						self.initialized = true;
					});
				};

			  	loadFacebookSdk(document, 'script', 'facebook-jssdk');

				return;
			}

			if (this.initialized) {
				sceneSaveUI.serializeAndStoreRemoteShare(function(sceneName, scenId, sceneRemoteUrl) {
					share('http://www.treintipollo.com/space-maze/' + sceneRemoteUrl + '/' + scenId);
				});
			}
		}				
	}

	var init = function(appId) {
		FB.init({
			appId: appId,
		   	version : "v2.8"
		});
	}

	var share = function(url) {
		FB.ui({
			method: 'share',
			href: url
		});
	}

	var loadFacebookSdk = function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		
		if (d.getElementById(id)) {
			return;
		}

		js = d.createElement(s);
		js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";

		if (fjs) { 
			fjs.parentNode.insertBefore(js, fjs);
		} else {
			d.body.appendChild(js);
		}
	}

	return new Facebook();
});


http://www.treintipollo.com/scene-store.herokuapp.com/F46ce2b30-900d-11e6-b8de-a7e3489deed5&locale=en_US&mobile_iframe=false&next=