define(function(require) {
	var localStorageWrapper = require('local-storage');

	var levels = [
		require('level-1'),
		require('level-2'),
		require('level-3')
	]

	var LevelStorage = require('delegate').extend({
		init: function() {
			this._super();
		},

		getLevelNames: function() {
			return levels.map(function(level) {
		    	return level.get()['name'].toUpperCase();
		    });
		},

		getLevel: function(index) {
			return levels[index].get();
		},

		getLevelFromName: function(name) {
			for (var i = 0; i < levels.length; i++) {
				var level = levels[i].get();

				if (level['name'] === name.toLowerCase()) {
					return level;
				}
			}
		},

		completeLevel: function(level) {
			localStorageWrapper.completeLevel(level['name']);
		},

		reset: function(level) {
			localStorageWrapper.resetCompletedLevels(level['name']);
		},

		isLevelComplete: function(level) {
			return localStorageWrapper.isLevelComplete(level['name']);
		},

		getLowestIncompleteLevel: function() {
			// Get the first level that is not complete
			for (var i = 0; i < levels.length; i++) {
				var level = levels[i].get();

				if (!localStorageWrapper.isLevelComplete(level['name'])) {		
					return level; 
				}
			}

			// If all levels are complete return the last
			return levels[levels.length - 1].get();
		},

		getLowestIncompleteLevelIndex: function() {
			// Get the first level that is not complete
			for (var i = 0; i < levels.length; i++) {
				var level = levels[i].get();

				if (!localStorageWrapper.isLevelComplete(level['name'])) {		
					return i; 
				}
			}

			// If all levels are complete return the index for the last
			return levels.length - 1;
		}
	});

	return new LevelStorage();
})