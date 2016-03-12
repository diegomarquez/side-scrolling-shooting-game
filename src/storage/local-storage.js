define(function(require) {
	var previewScene = null;
	var backupScene = null;

	var compresor = require('level-compressor');

	var LocalStorage = require('delegate').extend({
		init: function () {
			try {
				localStorage.setItem('testEntry', 'testValue');
				localStorage.removeItem('testEntry');

				this.available = true;
			} catch(e) {
				this.execute(this.LOCAL_STORAGE_NOT_AVAILABLE);

				this.available = false;
			}
		},

		setScene: function (key, value) {
			var data = compresor.compress(value);

			return setItem.call(this, 'scene_' + key, data);
		},

		getScene: function (key) {
			var data = getItem.call(this, 'scene_' + key.replace(/^scene_/, ''));

			return compresor.decompress(data);
		},

		setPreviewScene: function(preview) {
			previewScene = preview;
		},

		getPreviewScene: function() {
			return previewScene;
		},

		setBackUpScene: function(backUp) {
			backUpScene = backUp;
		},

		getBackUpScene: function() {
			return backUpScene;
		},

		removeScene: function (key) {
			removeItem.call(this, 'scene_' + key.replace(/^scene_/, ''));
		},

		getAllScenes: function() {
			available.call(this);

			return Object.keys(localStorage).filter(function(key) {
				return key.search(/^scene_/) != -1;
			}).map(function(key) {
				return key.replace(/^scene_/, '');
			});
		},

		getScenesCount: function() {
			available.call(this);
			return this.getAllScenes().length;
		},

		clearScenes: function () {
			available.call(this);

			var levels = this.getAllScenes();

			for (var i = 0; i < levels.length; i++) {
				this.removeScene.call(this, levels[i]);
			};
		},

		clear: function () {
			available.call(this);
			localStorage.clear();
		},

		completeLevel: function(key) {
			setItem.call(this, key + '-complete-flag', true);
		},

		resetCompletedLevels: function() {
			available.call(this);

			return Object.keys(localStorage).filter(function(key) {
				return key.search(/-complete-flag$/) != -1;
			}).forEach(function(key, index, array) {
				array[index] = false;
			});
		},

		isLevelComplete: function(key) {
			return getItem.call(this, key + '-complete-flag') === 'true';
		},

		setRemoteId: function(name, id, remote) {
			var data = name + "@@" + id;

			setItem.call(this, data + "@@remote-id", remote);
		},

		getRemoteIdRemote: function(name, id) {
			available.call(this);

			var id = Object.keys(localStorage).filter(function(key) {
				var regex = new RegExp(name + "@@" + id + "@@remote-id");

				return key.search(regex) != -1;
			});

			return 'http://' + getItem.call(this, id[0]);
		},

		getRemoteIdNames: function() {
			available.call(this);

			return Object.keys(localStorage).filter(function(key) {
				return key.search(/@@remote-id/) != -1;
			}).map(function(key) {
				var match = key.match(/(.+)@@(.+)@@remote-id/);

				return match[1] + " => " + match[2];
			});
		},

		removeRemoteId: function(name, id) {
			var data = name + "@@" + id;

			removeItem.call(this, data + "@@remote-id");
		},

		removeAllRemoteIds: function() {
			var self = this;

			return Object.keys(localStorage).filter(function(key) {
				return key.search(/@@remote-id/) != -1;
			}).forEach(function(key) {
				removeItem.call(self, key);		
			});
		}
	});

	var available = function() {
		if (!this.available) {
			throw new Error('Local Storage Not Available');
		}
	}

	var setItem = function (key, value) {
		available.call(this);

		try {
			localStorage.setItem(key, value);

			return true;
		} catch (e) {
			this.execute(this.STORAGE_LIMIT_REACHED, {
				key: key,
				value: value
			});

			return false;
		}
	}

	var removeItem = function (key) {
		available.call(this);

		localStorage.removeItem(key);
	}

	var getItem = function (key) {
		available.call(this);

		return localStorage.getItem(key);
	}

	Object.defineProperty(LocalStorage.prototype, "LOCAL_STORAGE_NOT_AVAILABLE", { get: function() { return 'local_storage_not_available'; } });
	Object.defineProperty(LocalStorage.prototype, "LOCAL_STORAGE_LIMIT_REACHED", { get: function() { return 'local_storage_limit_reached'; } });

	return new LocalStorage();
});