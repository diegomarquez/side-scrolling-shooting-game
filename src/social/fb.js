define(function(require)
{
	var gb = require('gb');
	var sceneSaveUI = require('scene-save-ui');

	var Facebook = function() {
		this.initialized = false;
	};

	Facebook.prototype.share = function(onComplete, onError) {
		var self = this;

		if (gb.getEnvironment() === 'dev') {
			if (!this.initialized) {
				window.fbAsyncInit = function() {
					init("678625568980303");
					share('http://www.treintipollo.com');

					self.initialized = true;
				};

				loadFacebookSdk(document, 'script', 'facebook-jssdk', onError);

				return;
			}

			if (this.initialized) {
				share('http://www.treintipollo.com');
			}

		} else {
			if (!this.initialized) {
				window.fbAsyncInit = function() {
					init("1910504332510208");

					var onSuccess = function(sceneRemoteUrl) {
						share('http://www.treintipollo.com/space-maze/' + encodeURIComponent(sceneRemoteUrl), onComplete);

						self.initialized = true;
					};

					sceneSaveUI.serializeAndStoreRemoteShare(onSuccess, onError);
				};

				loadFacebookSdk(document, 'script', 'facebook-jssdk', onError);

				return;
			}

			if (this.initialized) {
				var onSuccess = function(sceneRemoteUrl) {node 
					share('http://www.treintipollo.com/space-maze/' + encodeURIComponent(sceneRemoteUrl), onComplete);
				};

				sceneSaveUI.serializeAndStoreRemoteShare(onSuccess, onError);
			}
		}
	}

	var init = function(appId) {
		FB.init({
			appId: appId,
			version : "v2.8"
		});
	}

	var share = function(url, oncomplete) {
		FB.ui({
			method: 'share',
			href: url
		},
		function() {
			oncomplete();
		});
	}

	var loadFacebookSdk = function(d, s, id, onerror) {
		var js, fjs = d.getElementsByTagName(s)[0];

		if (d.getElementById(id)) {
			return;
		}

		js = d.createElement(s);

		js.onerror = function() {
			onerror();
		}

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