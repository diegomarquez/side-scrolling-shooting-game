define(["editor-game-object-container"], function(GameObject) {
	var targetDecompose = {};
	var targetMatrix = null;

	var selfDecompose = {};
	var selfMatrix = null;

  var Cannon = GameObject.extend({
    init: function() {
      this._super();
    },

    editorStart: function() {
      
    },

    editorUpdate: function(delta) {
    	targetMatrix = this.parent.target.getMatrix(targetMatrix)
    	targetDecompose = targetMatrix.decompose(targetDecompose);

    	selfMatrix = this.getMatrix(selfMatrix)
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
    }
  });

  return Cannon;
});
