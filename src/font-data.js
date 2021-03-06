define(function() {

	var Data = function() {};

	var data = {
	// Refer to [Web font loader](https://github.com/typekit/webfontloader) for details on how it should look like.
	// This assumes you will be using [Google Fonts](https://www.google.com/fonts), but there are other options
	"data": {
		"custom": {
			"families": ["Exo", "CGFLocustResistance", "Russo One"]
		},
	},

	// Set a version of [Web font loader](https://github.com/typekit/webfontloader) to download from 
	// [Google](https://developers.google.com/speed/libraries/devguide#webfont)
	// A value of '1' links to the latest 1.x version
	"version": "1",

	// Set this to false if you don't want to load any external fonts with the [Web font loader](https://github.com/typekit/webfontloader)
	// Leave this as false if you are not using any fonts, otherwise the loading fails.
	"loadFonts": true
}

;

	Data.prototype.get = function() {
		return data;
	}

	return new Data();
});