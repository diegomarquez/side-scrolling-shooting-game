define(function(require)
{
	var Facebook = function() {};

	Facebook.prototype.load = function(oncomplete, onerror) {
		oncomplete();
	}

	Facebook.prototype.share = function(dropboxShareLinkUrl, oncomplete, onerror) {
		var width = 575;
		var height = 300;
		var left = (window.innerWidth - width) / 2;
		var top = (window.innerHeight - height) / 2;

		var url = encodeURIComponent('https://www.treintipollo.com/spacemazefbshare/' + encodeURIComponent(dropboxShareLinkUrl));
		var opts = 'status=1' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;

		var win = window.open(
			"https://www.facebook.com/sharer/sharer.php?u="+url,
			"Share on Facebook",
			opts
		);

		if(!win || win.closed || typeof win.closed === 'undefined')
			return onerror();

		var poll = function() {
			try {
				if(!win || win.closed || typeof win.closed === 'undefined')
					return onerror("user-closed");
			} catch (e) {
				return onerror();
			}

			setTimeout(poll, 50);
		};

		poll();
	}

	return new Facebook();
});





