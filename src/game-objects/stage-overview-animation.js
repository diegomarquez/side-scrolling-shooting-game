define(["game-object", "gb", "timelinelite", "keyboard"], function(GameObject, Gb, TimelineLite, Keyboard) {
  var StageOverview = GameObject.extend({
    init: function() {
      this._super();
    },

    start: function() {
    	var viewports = [{viewport: 'Main', layer: 'Front'}];

    	this.stages = Gb.create('Stages', 'First', viewports, { x: -300, y: 20 });

    	this.backOption = Gb.create('Back', 'First', viewports, { x: Gb.canvas.width/2 - 100, y: 600 });
    	this.startOption = Gb.create('Start', 'First', viewports, { x: Gb.canvas.width/2 + 100, y: 600 });

    	this.tl = new TimelineLite({
    		onComplete: function() {
    			Keyboard.onKeyDown(Keyboard.GAME_LEFT, this, this.onLeftPress);
					Keyboard.onKeyDown(Keyboard.GAME_RIGHT, this, this.onRightPress);
					Keyboard.onKeyDown(Keyboard.GAME_BUTTON_1, this, this.onOptionSelected);

					this.execute(this.ENTER);
    		}.bind(this),

    		onReverseComplete: function() {
    			if (this.backOption.selected) {
						this.execute(this.BACK);
						return;
					}

					if (this.startOption.selected) {
						this.execute(this.START);
						return;
					}
    		}.bind(this) 
    	});

			this.tl.to(this.stages, 0.5, { x: Gb.canvas.width/2});

			this.tl.to(this.backOption, 0.5, { y: 250 });
			this.tl.to(this.startOption, 0.5, { y: 250 });

			this.tl.play();

			this.onLeftPress();			
    }, 

    reverse: function() {
    	Keyboard.removeKeyDown(Keyboard.GAME_LEFT, this, this.onLeftPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_RIGHT, this, this.onRightPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_BUTTON_1, this, this.onOptionSelected);

    	this.tl.reverse();
    },

    onLeftPress: function() {
    	var children = this.backOption.findChildren().allWithType("MarkerArrow");

    	this.backOption.selected = true;
    	this.startOption.selected = false;

			for (var i = 0; i < children.length; i++) {
				children[i].show();
			}

			var children = this.startOption.findChildren().allWithType("MarkerArrow");

			for (var i = 0; i < children.length; i++) {
				children[i].hide();
			}
    },

    onRightPress: function() {
    	var children = this.backOption.findChildren().allWithType("MarkerArrow");

    	this.backOption.selected = false;
    	this.startOption.selected = true;

			for (var i = 0; i < children.length; i++) {
				children[i].hide();
			}

			var children = this.startOption.findChildren().allWithType("MarkerArrow");

			for (var i = 0; i < children.length; i++) {
				children[i].show();
			}
    },

    onOptionSelected: function() {
    	this.reverse();
    },

    recycle: function() {
    	this._super();

    	Keyboard.removeKeyDown(Keyboard.GAME_LEFT, this, this.onLeftPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_RIGHT, this, this.onRightPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_BUTTON_1, this, this.onOptionSelected);

    	this.tl.kill();

    	this.tl = null;
    	this.backOption = null;
    	this.startOption = null;
    }
  });

	Object.defineProperty(StageOverview.prototype, "ENTER", { get: function() { return 'enter'; } });
	Object.defineProperty(StageOverview.prototype, "BACK", { get: function() { return 'play'; } });
	Object.defineProperty(StageOverview.prototype, "START", { get: function() { return 'edit'; } });

  return StageOverview;
});

