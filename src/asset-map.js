define(function() {
	var Data = function() {};

	var data = {
	"FLAG.PNG": "assets/images/Flag.png",
	"WARNING.PNG": "assets/images/Warning.png",
	"BIOHAZARD.PNG": "assets/images/biohazard.png",
	"SPACEINVADERS_FIRE.WAV": "assets/sound/SpaceInvaders_Fire.wav"
};

	Data.prototype.get = function() {
		return data;
	}

	return new Data();
});