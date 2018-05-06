define(function(require)
{
	var Twitter = function() {};

	Twitter.prototype.load = function(oncomplete, onerror) {
		oncomplete();
	}

	Twitter.prototype.share = function(dropboxShareLinkUrl, oncomplete, onerror) {
		function popupwindow(url, title, w, h) {
			var y = window.outerHeight / 2 + window.screenY - ( h / 2);
			var x = window.outerWidth / 2 + window.screenX - ( w / 2);
			
			var options = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + y + ', left=' + x;

			return window.open(url, title, options);
		}

		var shareUrl = encodeURIComponent('https://www.treintipollo.com/spacemazefbshare/' + encodeURIComponent(dropboxShareLinkUrl));

		var twitterShareUrl = "https://twitter.com/intent/tweet?url=" + shareUrl;

		var win = popupwindow(twitterShareUrl, "Share on Twitter", 575, 300);

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

	return new Twitter();
});





