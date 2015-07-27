define(function() {
	var Data = function() {};

	var data = {
	"BALL.PNG": "assets/images/Ball.png",
	"CHECKEREDFLAG.PNG": "assets/images/CheckeredFlag.png",
	"FLAG.PNG": "assets/images/Flag.png",
	"LASERBASE.PNG": "assets/images/LaserBase.png",
	"LASERTURRET.PNG": "assets/images/LaserTurret.png",
	"WARNING.PNG": "assets/images/Warning.png",
	"BIOHAZARD.PNG": "assets/images/biohazard.png",
	"DOWNARROW.PNG": "assets/images/downArrow.png",
	"LEFTARROW.PNG": "assets/images/leftArrow.png",
	"RIGHTARROW.PNG": "assets/images/rightArrow.png",
	"UPARROW.PNG": "assets/images/upArrow.png",
	"SPACEINVADERS_FIRE.WAV": "assets/sound/SpaceInvaders_Fire.wav"
};

	Data.prototype.get = function() {
		return data;
	}

	return new Data();
});