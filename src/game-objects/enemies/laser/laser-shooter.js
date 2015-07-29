define(["editor-game-object-container", "gb"], function(GameObject, Gb) {
	
	var selfDecompose = {};
	var selfMatrix = null;

	var startPositionDecompose = {};
	var startPositionMatrix = null; 

	var LaserShooter = GameObject.extend({
		init: function() {
			this._super();
		},

		editorStart: function() {

			// this.damaged = false;
			// this.shootTimer = 0;
			
			selfMatrix = this.getMatrix(selfMatrix);
			selfDecompose = selfMatrix.decompose(selfDecompose);
			
			// this.parent.on(this.parent.DAMAGE, this, function() {
			// 	this.damaged = true;
			// 	this.shootTimer = 0;
			// });

			// this.parent.on(this.parent.REPAIR, this, function() {
			// 	this.damaged = false;
			// });
			// 

			var laserStartPosition = this.findChildren().firstWithType("LaserStartPosition");

			startPositionMatrix = laserStartPosition.getMatrix(startPositionMatrix);
			startPositionDecompose = startPositionMatrix.decompose(startPositionDecompose);

			Gb.create('laser', this.parent.getUpdateGroup(), this.parent.getViewportList(), {
				rotation: selfDecompose.rotation-90,
				x: startPositionDecompose.x,
				y: startPositionDecompose.y
			});

			var laserBurst = Gb.create('LaserBurst', this.parent.getUpdateGroup(), this.parent.getViewportList(), {
				rotation: selfDecompose.rotation,
				x: startPositionDecompose.x,
				y: startPositionDecompose.y
			});

			laserBurst.renderer.play();
		},

		editorUpdate: function(delta) {
			if (this.damaged) return;

			// if (!this.bursting) {
			// 	// Prevent update until the cannon has been started
			// 	if (!this.parent.started) return;
			// }
		
			// Gb.create('laser', this.parent.getUpdateGroup(), this.parent.getViewportList(), {
			// 	rotation: selfMatrix.decompose(selfDecompose).rotation,
			// 	x: this.parent.x,
			// 	y: this.parent.y
			// });
		}
	});

	return LaserShooter;
});
