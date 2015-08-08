define(function() {
	var Data = function() {};

	var data = {
	"ARROWBULLET.PNG": "assets/images/ArrowBullet.png",
	"BALL.PNG": "assets/images/Ball.png",
	"BURST.PNG": "assets/images/Burst.png",
	"CHECKEREDFLAG.PNG": "assets/images/CheckeredFlag.png",
	"DOUBLECANNON.PNG": "assets/images/DoubleCannon.png",
	"FLAG.PNG": "assets/images/Flag.png",
	"LASERBASE.PNG": "assets/images/LaserBase.png",
	"LASERHIT.PNG": "assets/images/LaserHit.png",
	"LASERTURRET.PNG": "assets/images/LaserTurret.png",
	"MISSILETURRETBASE.PNG": "assets/images/MissileTurret/MissileTurretBase.png",
	"MISSILETURRETHINGE.PNG": "assets/images/MissileTurret/MissileTurretHinge.png",
	"MISSILETURRETSHOOTER.PNG": "assets/images/MissileTurret/MissileTurretShooter.png",
	"ROUNDBULLET.PNG": "assets/images/RoundBullet.png",
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