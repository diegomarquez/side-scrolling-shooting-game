define(['level-compressor'], function(LevelCompressor) {

	var Data = function() {};

	var data = "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";
	var decompresed = null;

	Data.prototype.get = function() {
		if (!decompresed) {
			decompresed = LevelCompressor.decompress(data);

			data = null;
		}

		return decompresed;
	}

	Data.prototype.name = function() {
		return "stage-4";
	}

	return new Data();
});