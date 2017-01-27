define(function(require) {
	var previewScene = null;
	var backupScene = null;
	var urlScene = null;

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
		
		setDropboxToken: function(token) {
			setItem.call(this, 'dropbox_token', token);
		},
		
		getDropboxToken: function(key) {
			return getItem.call(this, 'dropbox_token');
		},

		setScene: function (key, value) {
			var data = compresor.compress(value);

			return setItem.call(this, 'scene_' + key, data);
		},

		getScene: function (key) {
			var data = getItem.call(this, 'scene_' + key.replace(/^scene_/, ''));

			return compresor.decompress(data);
		},

		setPreviewScene: function(scene) {
			previewScene = scene;
		},

		getPreviewScene: function() {
			return previewScene;
		},

		setBackUpScene: function(scene) {
			backUpScene = scene;
		},

		getBackUpScene: function() {
			return backUpScene;
		},

		setUrlScene: function(scene) {
			urlScene = scene;
		},

		getUrlScene: function() {
			return urlScene;
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

			Object.keys(localStorage).filter(function(key) {
				return key.search(/-complete-flag$/) != -1;
			}.bind(this)).forEach(function(key, index, array) {
				setItem.call(this, key, false);
			}.bind(this));
		},

		isLevelComplete: function(key) {
			return getItem.call(this, key + '-complete-flag') === 'true';
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
			
			// TODO: Este event tiene que ser contemplado cuando guardas escenas al local storage
			this.execute(this.LOCAL_STORAGE_LIMIT_REACHED, {
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