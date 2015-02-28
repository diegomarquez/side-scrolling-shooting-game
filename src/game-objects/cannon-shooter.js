define(["editor-game-object-container", "gb", "player-getter"], function(GameObject, Gb, PlayerGetter) {
	var targetDecompose = {};
	var targetMatrix = null;

	var selfDecompose = {};
	var selfMatrix = null;

  var Cannon = GameObject.extend({
    init: function() {
      this._super();
    },

    editorStart: function() {
      this.shootTimer = 0;
      this.burtsTimer = 0;

      this.bursting = false;
      this.target = PlayerGetter.get();
      this.currentBurstCount = 0;
      this.bulletCount = this.bullets;

      targetMatrix = this.target.getMatrix(targetMatrix);
    	targetDecompose = targetMatrix.decompose(targetDecompose);

    	selfMatrix = this.getMatrix(selfMatrix);
    	selfDecompose = selfMatrix.decompose(selfDecompose);
    	
    	var deltaX = targetDecompose.x - selfDecompose.x;
    	var deltaY = targetDecompose.y - selfDecompose.y;

      this.rotation = (Math.atan2(deltaY, deltaX) - ((this.parent.rotation) * (Math.PI/180)) ) * (180 / Math.PI);
     	this.rotation = this.rotation % 360;
    },

    editorUpdate: function(delta) {
    	targetMatrix = this.target.getMatrix(targetMatrix);
    	targetDecompose = targetMatrix.decompose(targetDecompose);

    	selfMatrix = this.getMatrix(selfMatrix);
    	selfDecompose = selfMatrix.decompose(selfDecompose);
    	
    	var deltaX = targetDecompose.x - selfDecompose.x;
    	var deltaY = targetDecompose.y - selfDecompose.y;
      
    	if (!this.bursting) {
    		this.rotation = (Math.atan2(deltaY, deltaX) - ((this.parent.rotation) * (Math.PI/180)) ) * (180 / Math.PI);
      	this.rotation = this.rotation % 360;

    		this.shootTimer++;

    		if (this.shootTimer % this.rate == 0) {
    			if (this.bulletCount > 0 || this.bullets == -1) {
	    			this.bursting = true;	
	    			this.burtsTimer = 0;
	    		}	
    		}
    	}	

    	if (this.bursting) {
				this.burtsTimer++;

    		if (this.burtsTimer % 10 == 0) {
    			if (this.currentBurstCount < this.burstAmount) {
	    			Gb.create('cannon-bullet', this.parent.getUpdateGroup(), this.parent.getViewportList(), {
				    	angle: selfMatrix.decompose(selfDecompose).rotation,
				    	x: this.parent.x,
				    	y: this.parent.y
				    });

	    			this.currentBurstCount++;
	    		} else {
	    			this.currentBurstCount = 0;
	    			this.shootTimer = 0;
	    			this.bursting = false;
	    			this.bulletCount--;
	    		}	
    		}
    	}
    }
  });

  return Cannon;
});
