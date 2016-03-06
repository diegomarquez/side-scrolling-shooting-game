define(function(require) {

	var levelCompressor = require('level-compressor');

	var LevelRequester = function() {}

	LevelRequester.prototype.pingRemote = function(remote) {
		var isValid = false;

		var x = new XMLHttpRequest();
	    
		x.onload = function (e) {
			if (x.readyState === 4) {
				if (x.status === 200) {
					isValid = true;
				} else {
					isValid = false;
				}
			}
		};

		x.onerror = function (e) {
			isValid = false;
		};

		try {
			x.open("GET", remote, false);
			x.send();
		} catch (e) {
			return false;			
		}

		return isValid;
	};

	LevelRequester.prototype.get = function(remote, success, failure) {
		var x = new XMLHttpRequest();
	    
		x.onload = function (e) {
			if (x.readyState === 4) {
				if (x.status === 200) {
					success(x.responseText);
				} else {
					failure();
				}
			}
		};

		x.onerror = function (e) {
			failure();
		};

		try {
			x.open("GET", remote, true);
			x.send();
		} catch (e) {
			failure();				
		}
	};

	LevelRequester.prototype.getLevel = function(remote, success, failure) {
		this.get(remote, function (data) {
			success(levelCompressor.decompress(data))
		}, failure);
	};

	LevelRequester.prototype.post = function(levelJson, remote, success, failure) {
		var compressedLevel = levelCompressor.compress(levelJson);

		var x = new XMLHttpRequest();
	    
		x.onload = function (e) {
			if (x.readyState === 4) {
				if (x.status === 200) {
					success(x.responseText);
				} else {
					failure();
				}
			}
		};

		x.onerror = function (e) {
			failure();
		};

		var boundary = "---------" + (parseInt(Math.random() * 100000000)).toString();

		var body  = "--" + boundary + '\r\n' + 
		'Content-Disposition: form-data; name="data"' + '"\r\n\r\n' + 
		compressedLevel + '\r\n' +
		'--' + boundary + '--';

		try {
			x.open("POST", remote, true);
			x.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + boundary);
			x.send(body);
		} catch (e) {
			failure();				
		}
	};

	return new LevelRequester();

});

