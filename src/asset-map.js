define(function() {
	var Data = function() {};

	var data = {
	"BIOHAZARD.PNG": "assets/images/biohazard.png",
	"SPACEINVADERS_FIRE.WAV": "assets/sound/SpaceInvaders_Fire.wav"
};

	Data.prototype.get = function() {
		return data;
	}

	return new Data();
});