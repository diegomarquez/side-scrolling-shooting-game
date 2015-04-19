define(["util"], function (Util) {
	return function (offsetX, offsetY) {
		return function (object) {
			object['x'] += offsetX;
			object['y'] += offsetY;
		}
	}
});