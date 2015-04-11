define(["util"], function (Util) {
	return function (halfWidth, halfHeight) {
		return function (object) {
			object['x'] += Util.rand_f(-halfWidth, halfWidth);
			object['y'] += Util.rand_f(-halfHeight, halfHeight);
		}
	}
});