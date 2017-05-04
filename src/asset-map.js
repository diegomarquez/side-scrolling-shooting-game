define(function() {

	var Data = function() {};

	var data = {
	"AUDIO-SAMPLE.MP3": "game-builder/assets/audio-sample.mp3?b=test",
	"AUDIO-SAMPLE.OGG": "game-builder/assets/audio-sample.ogg?b=test",
	"ANIMATEDARROW.PNG": "assets/images/AnimatedArrow.png?b=test",
	"ARROWBULLET.PNG": "assets/images/ArrowBullet.png?b=test",
	"BALL.PNG": "assets/images/Ball.png?b=test",
	"BLOB.PNG": "assets/images/Blob.png?b=test",
	"BOSS1BODY.PNG": "assets/images/Boss1/Boss1Body.png?b=test",
	"BOSS1CABLE.PNG": "assets/images/Boss1/Boss1Cable.png?b=test",
	"BOSS1CABLEDAMAGED.PNG": "assets/images/Boss1/Boss1CableDamaged.png?b=test",
	"BOSS1CHUNK1.PNG": "assets/images/Boss1/Boss1Chunk1.png?b=test",
	"BOSS1CHUNK2.PNG": "assets/images/Boss1/Boss1Chunk2.png?b=test",
	"BOSS2BODY.PNG": "assets/images/Boss2/Boss2Body.png?b=test",
	"BOSS2CHUNK1.PNG": "assets/images/Boss2/Boss2Chunk1.png?b=test",
	"BOSS2CHUNK2.PNG": "assets/images/Boss2/Boss2Chunk2.png?b=test",
	"BOSS2CORE.PNG": "assets/images/Boss2/Boss2Core.png?b=test",
	"BOSS3INNEREYE.PNG": "assets/images/Boss3/Boss3InnerEye.png?b=test",
	"BOSS3OUTEREYE.PNG": "assets/images/Boss3/Boss3OuterEye.png?b=test",
	"GENERATORWAYPOINT.PNG": "assets/images/Boss3/GeneratorWayPoint.png?b=test",
	"BOSS4BODY.PNG": "assets/images/Boss4/Boss4Body.png?b=test",
	"BOSS4CHUNK1.PNG": "assets/images/Boss4/Boss4Chunk1.png?b=test",
	"BOSS4CHUNK2.PNG": "assets/images/Boss4/Boss4Chunk2.png?b=test",
	"BOSS4CHUNK3.PNG": "assets/images/Boss4/Boss4Chunk3.png?b=test",
	"BOSS4CHUNK4.PNG": "assets/images/Boss4/Boss4Chunk4.png?b=test",
	"BOSSCANNONBASE.PNG": "assets/images/BossCannon/BossCannonBase.png?b=test",
	"BOSSCANNONSHOOTER.PNG": "assets/images/BossCannon/BossCannonShooter.png?b=test",
	"BOSSGENERATOR.PNG": "assets/images/BossGenerator.png?b=test",
	"BOSSLASERTURRET.PNG": "assets/images/BossLaserTurret.png?b=test",
	"BOSS1PORTRAIT.PNG": "assets/images/BossPortraits/Boss1Portrait.png?b=test",
	"BOSS2PORTRAIT.PNG": "assets/images/BossPortraits/Boss2Portrait.png?b=test",
	"BOSS3PORTRAIT.PNG": "assets/images/BossPortraits/Boss3Portrait.png?b=test",
	"BOSS4PORTRAIT.PNG": "assets/images/BossPortraits/Boss4Portrait.png?b=test",
	"BURST.PNG": "assets/images/Burst.png?b=test",
	"CANNONBASE.PNG": "assets/images/Cannon/CannonBase.png?b=test",
	"CANNONSHOOTER.PNG": "assets/images/Cannon/CannonShooter.png?b=test",
	"CHECKEREDFLAG.PNG": "assets/images/CheckeredFlag.png?b=test",
	"CHECKEREDFLAGDOWN.PNG": "assets/images/CheckeredFlagDown.png?b=test",
	"CHECKEREDFLAGLEFT.PNG": "assets/images/CheckeredFlagLeft.png?b=test",
	"CHECKEREDFLAGRIGHT.PNG": "assets/images/CheckeredFlagRight.png?b=test",
	"CHECKEREDFLAGUP.PNG": "assets/images/CheckeredFlagUp.png?b=test",
	"DOUBLECANNON.PNG": "assets/images/DoubleCannon.png?b=test",
	"ENEMYSHIP1.PNG": "assets/images/EnemyShip1.png?b=test",
	"ENEMYSHIP2.PNG": "assets/images/EnemyShip2.png?b=test",
	"FASTDOWNARROW.PNG": "assets/images/FastDownArrow.png?b=test",
	"FASTLEFTARROW.PNG": "assets/images/FastLeftArrow.png?b=test",
	"FASTRIGHTARROW.PNG": "assets/images/FastRightArrow.png?b=test",
	"FASTUPARROW.PNG": "assets/images/FastUpArrow.png?b=test",
	"FLAG.PNG": "assets/images/Flag.png?b=test",
	"GENERATOR.PNG": "assets/images/Generator.png?b=test",
	"HPMETER.PNG": "assets/images/HPMeter.png?b=test",
	"HEALTHUP.PNG": "assets/images/HealthUp.png?b=test",
	"LASERBASE.PNG": "assets/images/LaserBase.png?b=test",
	"LASERHIT.PNG": "assets/images/LaserHit.png?b=test",
	"LASERTURRET.PNG": "assets/images/LaserTurret.png?b=test",
	"LEVELCOMPLETEICON.PNG": "assets/images/LevelCompleteIcon.png?b=test",
	"LEVELFRAME.PNG": "assets/images/LevelFrame.png?b=test",
	"MINE.PNG": "assets/images/Mine.png?b=test",
	"MINIBLOB.PNG": "assets/images/MiniBlob.png?b=test",
	"BOSSMISSILETURRETSHOOTER.PNG": "assets/images/MissileTurret/BossMissileTurretShooter.png?b=test",
	"MISSILE.PNG": "assets/images/MissileTurret/Missile.png?b=test",
	"MISSILETURRETBASE.PNG": "assets/images/MissileTurret/MissileTurretBase.png?b=test",
	"MISSILETURRETHINGE.PNG": "assets/images/MissileTurret/MissileTurretHinge.png?b=test",
	"MISSILETURRETSHOOTER.PNG": "assets/images/MissileTurret/MissileTurretShooter.png?b=test",
	"MOON.PNG": "assets/images/Moon.png?b=test",
	"PLAYERBULLET1.PNG": "assets/images/PlayerBullet1.png?b=test",
	"PLAYEREXHAUST.PNG": "assets/images/PlayerExhaust.png?b=test",
	"POWERUP.PNG": "assets/images/PowerUp.png?b=test",
	"ROUNDBULLET.PNG": "assets/images/RoundBullet.png?b=test",
	"SMALLSPIDER.PNG": "assets/images/SmallSpider.png?b=test",
	"SOUND.PNG": "assets/images/Sound.png?b=test",
	"SPEEDUP.PNG": "assets/images/SpeedUp.png?b=test",
	"SPLASH.PNG": "assets/images/Splash.png?b=test",
	"SPLASHFB.PNG": "assets/images/SplashFb.png?b=test",
	"STAR.PNG": "assets/images/Star.png?b=test",
	"STOP.PNG": "assets/images/Stop.png?b=test",
	"WARNING.PNG": "assets/images/Warning.png?b=test",
	"BIOHAZARD.PNG": "assets/images/biohazard.png?b=test",
	"DOWNARROW.PNG": "assets/images/downArrow.png?b=test",
	"DOWNLEFTARROW.PNG": "assets/images/downLeftArrow.png?b=test",
	"DOWNRIGHTARROW.PNG": "assets/images/downRightArrow.png?b=test",
	"LEFTARROW.PNG": "assets/images/leftArrow.png?b=test",
	"RIGHTARROW.PNG": "assets/images/rightArrow.png?b=test",
	"UPARROW.PNG": "assets/images/upArrow.png?b=test",
	"UPLEFTARROW.PNG": "assets/images/upLeftArrow.png?b=test",
	"UPRIGHTARROW.PNG": "assets/images/upRightArrow.png?b=test",
	"WEBBULLET.PNG": "assets/images/webBullet.png?b=test",
	"BACK.MP3": "assets/sound/back.mp3?b=test",
	"BACK.OGG": "assets/sound/back.ogg?b=test",
	"BLOOB.MP3": "assets/sound/bloob.mp3?b=test",
	"BLOOB.OGG": "assets/sound/bloob.ogg?b=test",
	"BUG.MP3": "assets/sound/bug.mp3?b=test",
	"BUG.OGG": "assets/sound/bug.ogg?b=test",
	"COSMICDANCE.MP3": "assets/sound/cosmicDance.mp3?b=test",
	"COSMICDANCE.OGG": "assets/sound/cosmicDance.ogg?b=test",
	"DEFLECT.MP3": "assets/sound/deflect.mp3?b=test",
	"DEFLECT.OGG": "assets/sound/deflect.ogg?b=test",
	"EXPLOSION1.MP3": "assets/sound/explosion1.mp3?b=test",
	"EXPLOSION1.OGG": "assets/sound/explosion1.ogg?b=test",
	"EXPLOSION2.MP3": "assets/sound/explosion2.mp3?b=test",
	"EXPLOSION2.OGG": "assets/sound/explosion2.ogg?b=test",
	"EXPLOSION3.MP3": "assets/sound/explosion3.mp3?b=test",
	"EXPLOSION3.OGG": "assets/sound/explosion3.ogg?b=test",
	"EXPLOSION4.MP3": "assets/sound/explosion4.mp3?b=test",
	"EXPLOSION4.OGG": "assets/sound/explosion4.ogg?b=test",
	"EXPLOSION5.MP3": "assets/sound/explosion5.mp3?b=test",
	"EXPLOSION5.OGG": "assets/sound/explosion5.ogg?b=test",
	"EXPLOSION6.MP3": "assets/sound/explosion6.mp3?b=test",
	"EXPLOSION6.OGG": "assets/sound/explosion6.ogg?b=test",
	"EXPLOSION7.MP3": "assets/sound/explosion7.mp3?b=test",
	"EXPLOSION7.OGG": "assets/sound/explosion7.ogg?b=test",
	"FAIL.MP3": "assets/sound/fail.mp3?b=test",
	"FAIL.OGG": "assets/sound/fail.ogg?b=test",
	"HIT.MP3": "assets/sound/hit.mp3?b=test",
	"HIT.OGG": "assets/sound/hit.ogg?b=test",
	"INTRO.MP3": "assets/sound/intro.mp3?b=test",
	"INTRO.OGG": "assets/sound/intro.ogg?b=test",
	"LARGEBUG.MP3": "assets/sound/largeBug.mp3?b=test",
	"LARGEBUG.OGG": "assets/sound/largeBug.ogg?b=test",
	"LASER.MP3": "assets/sound/laser.mp3?b=test",
	"LASER.OGG": "assets/sound/laser.ogg?b=test",
	"LEVEL1.MP3": "assets/sound/level1.mp3?b=test",
	"LEVEL1.OGG": "assets/sound/level1.ogg?b=test",
	"LEVEL2.MP3": "assets/sound/level2.mp3?b=test",
	"LEVEL2.OGG": "assets/sound/level2.ogg?b=test",
	"LEVEL3.MP3": "assets/sound/level3.mp3?b=test",
	"LEVEL3.OGG": "assets/sound/level3.ogg?b=test",
	"LEVEL5.MP3": "assets/sound/level5.mp3?b=test",
	"LEVEL5.OGG": "assets/sound/level5.ogg?b=test",
	"OK.MP3": "assets/sound/ok.mp3?b=test",
	"OK.OGG": "assets/sound/ok.ogg?b=test",
	"OPENHATCH.MP3": "assets/sound/openHatch.mp3?b=test",
	"OPENHATCH.OGG": "assets/sound/openHatch.ogg?b=test",
	"PLAYERDAMAGE.MP3": "assets/sound/playerDamage.mp3?b=test",
	"PLAYERDAMAGE.OGG": "assets/sound/playerDamage.ogg?b=test",
	"PLAYERSHOT.MP3": "assets/sound/playerShot.mp3?b=test",
	"PLAYERSHOT.OGG": "assets/sound/playerShot.ogg?b=test",
	"POWERUP.MP3": "assets/sound/powerUp.mp3?b=test",
	"POWERUP.OGG": "assets/sound/powerUp.ogg?b=test",
	"SELECT.MP3": "assets/sound/select.mp3?b=test",
	"SELECT.OGG": "assets/sound/select.ogg?b=test",
	"SMALLLAUNCH.MP3": "assets/sound/smallLaunch.mp3?b=test",
	"SMALLLAUNCH.OGG": "assets/sound/smallLaunch.ogg?b=test",
	"WARNING.MP3": "assets/sound/warning.mp3?b=test",
	"WARNING.OGG": "assets/sound/warning.ogg?b=test",
	"WIN.MP3": "assets/sound/win.mp3?b=test",
	"WIN.OGG": "assets/sound/win.ogg?b=test"
};

	Data.prototype.get = function() {
		return data;
	}

	return new Data();
});