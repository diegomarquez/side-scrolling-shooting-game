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
		return "maze-2";
	}

	return new Data();
});