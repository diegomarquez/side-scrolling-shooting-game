define(function(require) {

	var levelCompressor = require('level-compressor');

	var LevelRequester = function() {}
	
	LevelRequester.prototype.list = function(success, failure) {
		require('db').list(function(results) {
			success(JSON.parse(results)["entries"]);
		}, failure);
	};
	
	LevelRequester.prototype.listMore = function(success, failure) {
		require('db').listMore(function(results) {
			if (results) {
				success(JSON.parse(results)["entries"]);
			} else {
				success(false);
			}
		}, failure);
	};

	LevelRequester.prototype.getScene = function(id, success, failure) {
		require('db').download(id, function(data) {
			success(levelCompressor.decompress(data));
		}, failure);
	};
	
	LevelRequester.prototype.deleteScene = function(id, success, failure) {
		require('db').delete(id, success, failure);
	};
	
	LevelRequester.prototype.deleteAllScenes = function(success, failure) {
		require('db').delete("/scenes", success, failure);
	};
	
	LevelRequester.prototype.post = function(levelJson, success, failure) {
		var compressedLevel = levelCompressor.compress(levelJson);
		var levelJsonObject = JSON.parse(levelJson);
		
		require('db').upload("scenes", levelJsonObject["name"], compressedLevel, success, failure);
	};
	
	LevelRequester.prototype.postToFacebook = function(levelJson, success, failure) {
		var compressedLevel = levelCompressor.compress(levelJson);
		var levelJsonObject = JSON.parse(levelJson);
		
		var db = require('db');
		var sceneName = levelJsonObject["name"];
		
		db.upload("facebook shares", sceneName, compressedLevel,
		function(response) {
			db.getLink("facebook shares/" + JSON.parse(response)["name"], function(response) {
				if (typeof response === "string") {
					success(JSON.parse(response)["id"]);
				} else {
					success(response["id"]);
				}
			}, failure);
		}, failure);
	};

	return new LevelRequester();

});

