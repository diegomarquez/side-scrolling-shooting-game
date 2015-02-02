define(["game-object", "gb", "timelinelite", "keyboard"], function(GameObject, Gb, TimelineLite, Keyboard) {
  var Title = GameObject.extend({
    init: function() {
      this._super();
    },

    start: function() {
    	var viewports = [{viewport: 'Main', layer: 'Front'}];

    	this.fly = Gb.create('Fly', 'First', viewports, { x: -300, y: 20 });
    	this.shoot = Gb.create('Shoot', 'First', viewports, { x: -300, y: 70 });
    	this.die = Gb.create('Die', 'First', viewports, { x: -300, y: 120 });
    	this.loop = Gb.create('LoopArrow', 'First', viewports, { x: -300, y: 38 });

    	this.play = Gb.create('Play', 'First', viewports, { x: Gb.canvas.width/2 - 100, y: 600 });
    	this.edit = Gb.create('Edit', 'First', viewports, { x: Gb.canvas.width/2 + 100, y: 600 });

    	this.tl = new TimelineLite({
    		onComplete: function() {
    			Keyboard.onKeyDown(Keyboard.GAME_LEFT, this, this.onLeftPress);
					Keyboard.onKeyDown(Keyboard.GAME_RIGHT, this, this.onRightPress);
					Keyboard.onKeyDown(Keyboard.GAME_BUTTON_1, this, this.onOptionSelected);

					if (this.onComplete) {
						this.onComplete();	
					}
    		}.bind(this) 
    	});

			this.tl.to(this.fly, 0.5, { x: Gb.canvas.width/2});
			this.tl.to(this.shoot, 0.5, { x: Gb.canvas.width/2});
			this.tl.to(this.die, 0.5, { x: Gb.canvas.width/2});
			this.tl.to(this.loop, 0.5, { x: Gb.canvas.width/2 - 50 });

			this.tl.to(this.play, 0.5, { y: 250 });
			this.tl.to(this.edit, 0.5, { y: 250 });

			this.tl.play();

			this.onLeftPress();			
    }, 

    onLeftPress: function() {
    	var children = this.play.findChildren().allWithType("MarkerArrow");

    	this.play.selected = true;
    	this.edit.selected = false;

			for (var i = 0; i < children.length; i++) {
				children[i].show();
			}

			var children = this.edit.findChildren().allWithType("MarkerArrow");

			for (var i = 0; i < children.length; i++) {
				children[i].hide();
			}
    },

    onRightPress: function() {
    	var children = this.play.findChildren().allWithType("MarkerArrow");

    	this.play.selected = false;
    	this.edit.selected = true;

			for (var i = 0; i < children.length; i++) {
				children[i].hide();
			}

			var children = this.edit.findChildren().allWithType("MarkerArrow");

			for (var i = 0; i < children.length; i++) {
				children[i].show();
			}
    },

    onOptionSelected: function() {
    	if (this.play.selected) {
				this.onPlay();
			}

			if (this.edit.selected) {
				this.onEdit();
			}
    },

    recycle: function() {
    	this._super();

    	Keyboard.removeKeyDown(Keyboard.GAME_LEFT, this, this.onLeftPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_RIGHT, this, this.onRightPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_BUTTON_1, this, this.onOptionSelected);

    	Gb.reclaimer.claim(this.fly);
    	Gb.reclaimer.claim(this.shoot);
    	Gb.reclaimer.claim(this.die);
    	Gb.reclaimer.claim(this.loop);
    	Gb.reclaimer.claim(this.play);
    	Gb.reclaimer.claim(this.edit);

    	this.tl.kill();

    	this.tl = null;
    	this.fly = null;
    	this.shoot = null;
    	this.die = null;
    	this.loop = null;
    	this.play = null;
    	this.edit = null;
    }
  });

  return Title;
});

