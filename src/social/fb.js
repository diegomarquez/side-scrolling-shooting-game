define(function(require)
{
	var gb = require('gb');
	
	var Facebook = function() {
		this.initialized = false;
	};

	Facebook.prototype.load = function(oncomplete, onerror) {
		var self = this;
		
		if (this.initialized) {
			oncomplete();
		} else {
			window.fbAsyncInit = function() {
				
				FB.init({
					appId: gb.getEnvironment() === 'dev' ? '678625568980303' : '1910504332510208',
					version : 'v2.8'
				});
				
				self.initialized = true;

				oncomplete();
			};

			var js, fjs = document.getElementsByTagName('script')[0];
	
			if (document.getElementById('facebook-jssdk')) {
				return;
			}
	
			js = document.createElement('script');
	
			js.onerror = function() {
				onerror();
			}
	
			js.id = 'facebook-jssdk';
			js.src = '//connect.facebook.net/en_US/sdk.js';
	
			if (fjs) {
				fjs.parentNode.insertBefore(js, fjs);
			} else {
				document.body.appendChild(js);
			}
		}
	}

	Facebook.prototype.share = function(dropboxFileId, oncomplete, onerror) {
		FB.ui({
			method: 'share',
			href: 'https://www.treintipollo.com/spacemazefbshare/' + encodeURIComponent(dropboxFileId)
		},
		function(response) {
			if (response === undefined) {
				onerror("user-closed");
			} else if (response && !response.error_code) {
				oncomplete();
			} else if (response && response.error_code) {
				onerror();
			} else {
				onerror();
			}
		});
	}

	return new Facebook();
});