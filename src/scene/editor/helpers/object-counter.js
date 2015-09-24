define(function(require) {

	var createdObjects = 0;
	var maxAmount = 300;

	var ObjectCounter = function() {};

	ObjectCounter.prototype.canCreate = function() {
		return createdObjects >= maxAmount;
	}

	ObjectCounter.prototype.count = function(go) {
		if (createdObjects < maxAmount) {
			createdObjects++;

			go.once(go.RECYCLE, this, function() {
				createdObjects--;
			});
		}
	};

	ObjectCounter.prototype.showErrorFeedback = function() {
		require('gb').game.get_extension(require('logger')).error('Maximun object limit of ' + maxAmount + ' reached.');
		require('gb').game.get_extension(require('logger')).show();

		setTimeout(require('gb').game.get_extension(require('logger')).hide, 3000);
	}

	ObjectCounter.prototype.toString = function() {
		return createdObjects + ' / ' + maxAmount;
	};

	return new ObjectCounter();

});