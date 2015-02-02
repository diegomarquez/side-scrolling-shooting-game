define(["game-object", "gb", "timelinelite"], function(GameObject, Gb, TimelineLite) {
  var StartMessage = GameObject.extend({
    init: function() {
      this._super();
    },

    start: function() {
    	var viewports = [{viewport: 'Main', layer: 'Front'}];

    	this.startMessage = Gb.create('StartMessageText', 'First', viewports, { x: -300, y: Gb.canvas.height/2 });
    	
    	this.tl = new TimelineLite({ 
    		onComplete: function() {
    			Gb.reclaimer.claim(this);
    			
    			if (this.onComplete) {
						this.onComplete();	
					}
    		}.bind(this)
    	});

			this.tl.to(this.startMessage, 1, { x: Gb.canvas.width/2, ease: Back.easeOut });
			this.tl.to(this.startMessage, 1, { x: Gb.canvas.width + 300, ease: Back.easeIn }, "+=2");

			this.tl.play();
    }, 

    recycle: function() {
    	this._super();

    	Gb.reclaimer.claim(this.startMessage);

    	this.tl.kill();

    	this.startMessage = null;
    	this.tl = null;
    }
  });

  return StartMessage;
});

