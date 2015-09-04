define(["game-object", "gb", "timelinelite"], function(GameObject, Gb, TimelineLite) {
  var SideMessage = GameObject.extend({
    init: function() {
      this._super();
    },

    start: function() {
    	var viewports = [{viewport: 'Messages', layer: 'Front'}];

    	this.sideMessage = Gb.create(this.textGameObject, 'Second', viewports, { x: -300, y: Gb.canvas.height/2 });

    	this.tl = new TimelineLite({ 
    		onComplete: function() {
    			Gb.reclaimer.claim(this);
    			
    			if (this.onComplete) {
						this.onComplete();	
					}
    		}.bind(this)
    	});

		this.tl.to(this.sideMessage, 1, { x: Gb.canvas.width/2, ease: Back.easeOut });
		this.tl.to(this.sideMessage, 1, { x: Gb.canvas.width + 300, ease: Back.easeIn }, "+=2");

		this.tl.play();
    }, 

    recycle: function() {
    	this._super();

    	Gb.reclaimer.claim(this.sideMessage);

    	this.tl.kill();

    	this.sideMessage = null;
    	this.tl = null;
    }
  });

  return SideMessage;
});

