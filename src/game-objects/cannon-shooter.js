define(["editor-game-object-container", "gb"], function(GameObject, Gb) {
	var targetDecompose = {};
	var targetMatrix = null;

	var selfDecompose = {};
	var selfMatrix = null;

  var Cannon = GameObject.extend({
    init: function() {
      this._super();
    },

    editorStart: function() {
      this.timer = 0;
      this.bullets = 5;
    },

    editorUpdate: function(delta) {
    	targetMatrix = this.parent.target.getMatrix(targetMatrix);
    	targetDecompose = targetMatrix.decompose(targetDecompose);

    	selfMatrix = this.getMatrix(selfMatrix);
    	selfDecompose = selfMatrix.decompose(selfDecompose);
    	
    	var deltaX = targetDecompose.x - selfDecompose.x;
    	var deltaY = targetDecompose.y - selfDecompose.y;
      
      this.rotation = (Math.atan2(deltaY, deltaX) - ((this.parent.rotation) * (Math.PI/180)) ) * (180 / Math.PI);
      this.rotation = this.rotation % 360;

    	if (this.rotation > -30) {
      	this.rotation = -30;
      }

      if (this.rotation < -150) {
      	this.rotation = -150;
      }

      this.timer++;

    	if (this.timer % 200 == 0) {

    		if (this.bullets > 0) {
    			Gb.create('CannonBullet', this.parent.getUpdateGroup(), this.parent.getViewportList(), {
			    	angle: selfMatrix.decompose(selfDecompose).rotation,
			    	x: this.parent.x,
			    	y: this.parent.y
			    });	

			    this.bullets--;
    		}
    	}	
    }
  });

  return Cannon;
});
