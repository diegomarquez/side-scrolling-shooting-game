define(function(require)
{
	var clientId = '03e66s4e6ka9n6i';
	var authUri = 'https://www.dropbox.com/oauth2/authorize';
	var checkTokenUri = 'https://api.dropboxapi.com/2/users/get_current_account';
	var redirectUri = require('gb').getEnvironment() === 'dev' ? 'http://localhost:5000' : 'https://www.treintipollo.com';

	var moreEntries = false;
	var cursor = "";

	var Dropbox = function() {

	};

	Dropbox.prototype.auth = function(onSuccess, onError) {
		var token = require('local-storage').getDropboxToken();
		
		if (token) {
			checkToken(checkTokenUri, onSuccess, function() {
				getToken(clientId, redirectUri, authUri, onSuccess, onError);
			})
		} else {
			getToken(clientId, redirectUri, authUri, onSuccess, onError);
		}
	}
	
	Dropbox.prototype.upload = function(folder, name, content, onSuccess, onError) {
		this.auth(function() {
			var token = require('local-storage').getDropboxToken();
			
			request({
				'url': 'https://api.dropboxapi.com/2/files/create_folder',
				'headers': {
					"Authorization": "Bearer " + token,
					"Content-Type": 'application/json'
				},
				'method': "POST",
				'data': extraSafeJSONEncode({
					'path': '/' + folder,
					'autorename': false
				})
			}, function(response) {
				request({
					'url': 'https://content.dropboxapi.com/2/files/upload',
					'headers': {
						"Authorization": "Bearer " + token,
						"Content-Type": 'application/octet-stream',
						"Dropbox-API-Arg": extraSafeJSONEncode({
							"autorename": true,
							"path": "/" + folder + "/" + name + ".bin"
						})
					},
					'method': "POST",
					'data': new Blob([content])
				}, function(response) {
					onSuccess(response);
				}, function(response) {
					console.log(response);
					
					onError();
				});
			}, function(response) {
				var error = JSON.parse(response.response)["error_summary"];
				
				if (error.match("path/conflict/folder/")) {
					request({
						'url': 'https://content.dropboxapi.com/2/files/upload',
						'headers': {
							"Authorization": "Bearer " + token,
							"Content-Type": 'application/octet-stream',
							"Dropbox-API-Arg": extraSafeJSONEncode({
								"autorename": true,
								"path": "/" + folder + "/" + name + ".bin"
							})
						},
						'method': "POST",
						'data': new Blob([content])
					}, function(response) {
						onSuccess(response);
					}, function(response) {
						console.log(response);
						onError();
					});
				} else {
					console.log(response);
					onError();
				}
			});
		}, onError);
	}
	
	Dropbox.prototype.getLink = function(path, onSuccess, onError) {
		this.auth(function() {
			var token = require('local-storage').getDropboxToken();
			
			request({
				'url': 'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',
				'headers': {
					"Authorization": "Bearer " + token,
					"Content-Type": "application/json",
				},
				'method': "POST",
				"data": extraSafeJSONEncode({
					"path": "/" + path
				})
			}, function(response) {
				onSuccess(response);
			}, function(response) {
				var error = JSON.parse(response.response)["error_summary"];
				
				if (error.match("shared_link_already_exists")) {
					request({
						'url': 'https://api.dropboxapi.com/2/sharing/list_shared_links',
						'headers': {
							"Authorization": "Bearer " + token,
							"Content-Type": "application/json",
						},
						'method': "POST",
						"data": extraSafeJSONEncode({
							"path": "/" + path
						})
					}, function(response) {
						onSuccess(JSON.parse(response)["links"][0]);
					}, function(response) {
						console.log(response);
						
						onError();
					});
				}
				else {
					onError();
				}
			});
		}, onError);
	}
	
	Dropbox.prototype.download = function(id, onSuccess, onError) {
		this.auth(function() {
			var token = require('local-storage').getDropboxToken();
			
			request({
				'url': 'https://content.dropboxapi.com/2/files/download',
				'headers': {
					"Authorization": "Bearer " + token,
					"Dropbox-API-Arg": extraSafeJSONEncode({
						"path": id
					})
				},
				'method': "POST"
			}, function(response) {
				onSuccess(response);
			}, function(response) {
				console.log(response);
				
				onError();
			});
		}, onError);
	}
	
	Dropbox.prototype.delete = function(id, onSuccess, onError) {
		this.auth(function() {
			var token = require('local-storage').getDropboxToken();
			
			request({
				'url': 'https://api.dropboxapi.com/2/files/delete',
				'headers': {
					"Authorization": "Bearer " + token,
					"Content-Type": "application/json"
				},
				'method': "POST",
				'data': extraSafeJSONEncode({
					"path": id
				})
			}, function(response) {
				onSuccess(response);
			}, function(response) {
				console.log(response);
				
				onError();
			});
		}, onError);
	}
	
	Dropbox.prototype.list = function(onSuccess, onError) {
		this.auth(function() {
			var token = require('local-storage').getDropboxToken();
			
			request({
				'url': 'https://api.dropboxapi.com/2/files/list_folder',
				'headers': {
					"Authorization": "Bearer " + token,
					"Content-Type": 'application/json',
				},
				'method': "POST",
				'data': extraSafeJSONEncode({
					"path": "/scenes"
				})
			}, function(response) {
				moreEntries = response["has_more"];
				cursor = response["cursor"];
				
				onSuccess(response);
			}, function(response) {
				moreEntries = false;
				cursor = "";
				
				var error = JSON.parse(response.response)["error_summary"];
				
				if (error.match("path/not_found/")) {
					onSuccess(JSON.stringify({"entries": []}));
				} else {
					console.log(response);
					
					onError();
				}
			});
		}, onError);
	}
	
	Dropbox.prototype.listMore = function(onSuccess, onError) {
		if (!moreEntries) {
			onSuccess();
			return;
		}
		
		this.auth(function() {
			var token = require('local-storage').getDropboxToken();
			
			request({
				'url': 'https://api.dropboxapi.com/2/files/list_folder/continue',
				'headers': {
					"Authorization": "Bearer " + token,
					"Content-Type": 'application/json',
				},
				'method': "POST",
				'data': extraSafeJSONEncode({
					"cursor": cursor
				})
			}, function(response) {
				moreEntries = response["has_more"];
				cursor = response["cursor"];
				
				onSuccess(response);
			}, function(response) {
				moreEntries = false;
				cursor = "";
				
				var error = JSON.parse(response.response)["error_summary"];
				
				if (error.match("path/not_found/")) {
					onSuccess(JSON.stringify({"entries": []}));
				} else {
					console.log(response);
					
					onError();
				}
			});
		}, onError);
	}

	return new Dropbox();
});

function getToken(clientId, redirectUri, authUri, onSuccess, onError) {
	var width = 480;
	var height = 640;
	
	var winX = window.screenX + (window.outerWidth / 2) - (width / 2);
	var winY = window.screenY + (window.outerHeight / 2) - (height / 2);
	
	var windowFeatures = `width=${width},height=${height},left=${winX},top=${winY},menubar=no,toolbar=no,location=no,personalbar=no,status=no,dependent=yes,dialog=yes,resizable=yes,scrollbars=no`;
	var windowName = 'Dropbox Auth';
	
	var CHILD = window.open(authUri + '?' + urlEncode({
		'response_type': 'token',
		'client_id': clientId,
		'redirect_uri': redirectUri
	}), windowName, windowFeatures);
	
	if (!CHILD)
		onError();
	
	var POLL = function() {
		var QS;
		var TOKEN;
		var URL;
		
		try {
			URL = CHILD.location.href;
			
			if (!URL)
			{
				onError();
				
				return;
			}
			
			if (URL.indexOf(redirectUri) === 0) {
				QS = URL.slice(redirectUri.length).replace('#', '').replace('?', ''); // removes the querystring and anchor separator
				TOKEN = urlDecode(QS);
				
				require('local-storage').setDropboxToken(TOKEN['access_token']);
				
				onSuccess();
				
				CHILD.close();
			}
		} catch (e) {
			
		}
		
		if (!TOKEN)
			setTimeout(POLL, 50);
	};
	
	POLL();
}

function checkToken(checkTokenUri, onSuccess, onError) {
	var token = require('local-storage').getDropboxToken();
	
	request({
		'url': checkTokenUri,
		'method': 'POST',
		'headers': {
			'Authorization': 'Bearer ' + token
		}
	}, onSuccess, onError);
}

function urlEncode(obj) {
	var props = [];
	
	for (let i in obj) {
		obj[i] && props.push(i + '=' + encodeURIComponent(obj[i]));
	}
	
	return props.join('&');
}

function urlDecode(str) {
	var parts = str.split('&');
	var obj = {};
	
	for (let part of parts) {
		part = part.split('=');
		part[0] = part[0].replace(/\W/g, '');
		
		obj[part[0]] = decodeURIComponent(part[1]);
	}
	
	return obj;
}

function request(arg, onSuccess, onError) {
	arg = typeof arg === 'string' ? { 'url': arg } : arg;
	
	var req = new XMLHttpRequest();
	var method = arg.method || 'GET';
	var timeout = arg.timeout || 0; // default of 0 means no timeout
	var query = arg.arguments ? '?' + urlEncode(arg.arguments) : '';
		
	if (~arg.url.indexOf('?') && query.length > 0) {
		arg.url += '&' + query.slice(1);
	} else {
		arg.url += query;
	}
	
	req.open(method, arg.url);
	
	req.timeout = timeout;
	
	if (arg.credentials)
		req.withCredentials = true;
	
	if (arg.blob)
		req.responseType = 'blob';
	
	if (arg.headers) {
		for (let i in arg.headers) {
			arg.headers.hasOwnProperty(i) && req.setRequestHeader(i, arg.headers[i]);
		}
	}
	
	if (arg.onprogress)
	{
		req.onprogress = function(e) {
			if (e.lengthComputable) {
				arg.onprogress(e.loaded / e.total);
			}
		}
	}
	
	req.onload = function() {
		if (req.status < 400 && req.status >= 200) {
			onSuccess(req.response);
		} else {
			onError({
				'response': req.response,
				'code': req.status,
				'status': req.statusText
			});
		}
	};
	
	req.ontimeout = req.onerror = req.onabort = function() {
		onError({
			'response': req.response,
			'code': req.status,
			'status': req.statusText
		});
	};
	
	if (arg.data) {
		switch (arg.encode) {
			case 'json':
				req.send(JSON.stringify(arg.data));
				break;
			case 'url':
				req.send(urlEncode(arg.data));
				break;
			default:
				req.send(arg.data);
				break;
		}
	} else {
		req.send();
	}
}

function extraSafeJSONEncode(obj)
{
	return JSON.stringify(obj)
		.replace(/[\u007f-\uffff]/g, c => '\\u' + ('000' + c.charCodeAt(0).toString(16)).slice(-4));
}