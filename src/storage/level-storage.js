define(function(require) {
	var localStorageWrapper = require('local-storage');

	var levels = [
		require('stage-1'),
		require('stage-2'),
		require('stage-3'),
		require('stage-4')
	]

	var LevelStorage = require('delegate').extend({
		init: function() {
			this._super();
		},

		getLevelNames: function() {
			return levels.map(function(level) {
		    	return level.name().toUpperCase();
		    });
		},

		getLevel: function(index) {
			return JSON.parse(JSON.stringify(levels[index].get()));
		},

		getLevelFromName: function(name) {
			for (var i = 0; i < levels.length; i++) {
				var level = levels[i];

				if (level.name() === name.toLowerCase()) {
					return this.getLevel(i);
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

		isLevelIndexComplete: function(index) {
			return this.isLevelComplete(this.getLevel(index));
		},

		getLowestIncompleteLevel: function() {
			// Get the first level that is not complete
			for (var i = 0; i < levels.length; i++) {
				var name = levels[i].name();

				if (!localStorageWrapper.isLevelComplete(name)) {		
					return levels[i].get(); 
				}
			}

			// If all levels are complete return the last
			return levels[levels.length - 1].get();
		},

		getLowestIncompleteLevelIndex: function() {
			// Get the first level that is not complete
			for (var i = 0; i < levels.length; i++) {
				var name = levels[i].name();

				if (!localStorageWrapper.isLevelComplete(name)) {		
					return i; 
				}
			}

			// If all levels are complete return the index for the last
			return levels.length - 1;
		}
	});

	return new LevelStorage();
})