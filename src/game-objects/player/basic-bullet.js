define(["editor-game-object-container", "reclaimer"], function(GameObject, Reclaimer) {

	var damageableObjects = [
		"BlobType",
		"Boss_1_Cables",
		"Boss_2_Core",
		"Boss3OuterEye",
		"Boss_4_Body",
		"CannonBase",
		"BossCannonBase",
		"LaserShooter",
		"LaserBase",
		"DoubleCannonBase",
		"BossDoubleCannonBase",
		"MissileShooter",
		"MissileTurretBase",
		"EnemyShip_1_Type",
		"EnemyShip_2_Type",
		"GeneratorType",
		"BossGeneratorType",
		"MineType",
		"Spider_Follow_Type",
		"Spider_Shooting_Type"
	]

	var BasicBullet = GameObject.extend({
		init: function() {
			this._super();

			this.speed = 800;
			this.life = 100;
			this.angle = 0;
			this.playerSpeed = 0;
		},

		editorStart: function() {
			this.life = 200;
			this.renderer.play();

			this.angle = (this.rotation) * (Math.PI/180)
		},

		editorUpdate: function(delta) {

			this.x += Math.cos(this.angle) * delta * (this.speed + this.playerSpeed/4);
			this.y += Math.sin(this.angle) * delta * (this.speed + this.playerSpeed/4);

			if (this.life < 0) {
				Reclaimer.mark(this);
			} else {
				this.life--;
			}
		},

		onCollide: function(other) {

			if (damageableObjects.indexOf(other.poolId) !== -1) {
				this.execute("hit");
				other.execute("hit");
	
				Reclaimer.mark(this);
				
				return;
			}

			if (other.poolId === "Boss_2_Body") {
				this.execute("deflect");
				
				// TODO: Replace with delfect movement
				Reclaimer.mark(this);

				return;
			}

			if (other.poolId === "Boss_1") {
				if (other.canBeDamaged()) {
					this.execute("hit");
					other.execute("hit");

					Reclaimer.mark(this);
				} else {
					this.execute("deflect");
					
					// TODO: Replace with delfect movement
					Reclaimer.mark(this);	
				}

				return;
			}

			Reclaimer.mark(this);
		}
	});

	return BasicBullet;
});