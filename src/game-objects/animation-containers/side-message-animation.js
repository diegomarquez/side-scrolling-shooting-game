define(["game-object", "gb", "TimelineLite", "TweenLite", "EasePack"], function(GameObject, Gb, TimelineLite) {
  var SideMessage = GameObject.extend({
    init: function() {
      this._super();

      this.startX = null;
      this.startY = null;

      this.endX = null;

      this.time = 2;
    },

    start: function() {
    	var viewports = [{viewport: 'Messages', layer: 'Front'}];

        if (this.startX !== null) {
            this.sideMessage = Gb.create(this.textGameObject, 'Second', viewports, { x: this.startX, y: this.startY });
        } else {
            this.sideMessage = Gb.create(this.textGameObject, 'Second', viewports, { x: -300, y: Gb.canvas.height/2 });
        }

    	this.tl = new TimelineLite({
    		onComplete: function() {
    			Gb.reclaimer.claim(this);
    			
    			if (this.onComplete) {
					this.onComplete();
				}
    		}.bind(this)
    	});

        if (this.startX !== null && this.startY != null && this.endX !== null) {
            this.tl.to(this.sideMessage, 1, { x: this.endX, ease: Back.easeOut });
            this.tl.to(this.sideMessage, 1, { x: this.startX, ease: Back.easeIn }, "+=" + this.time);
        } else {
            this.tl.to(this.sideMessage, 1, { x: Gb.canvas.width/2, ease: Back.easeOut });
            this.tl.to(this.sideMessage, 1, { x: Gb.canvas.width + 300, ease: Back.easeIn }, "+=" + this.time);
        }

		this.tl.play();
    }, 

    recycle: function() {
    	this._super();

    	Gb.reclaimer.claim(this.sideMessage);

    	this.tl.kill();

    	this.sideMessage = null;
    	this.tl = null;

        this.startX = null;
        this.startY = null;

        this.endX = null;

        this.time = 2;
    }
  });

  return SideMessage;
});

