define(['pako'], function(pako) {

	var Compresor = function() {}

	Compresor.prototype.compress = function (unCompressedData) {
		if (!unCompressedData)
			return null;

		var data = pako.deflate(unCompressedData, { to: "string" });

		return window.btoa(data);
	};

	Compresor.prototype.decompress = function (compressedData) {
		if (!compressedData)
			return null;

		var data = window.atob(compressedData);

		return pako.inflate(data, { to: 'string' });
	};

	return new Compresor();
});