define(["game-object", "gb", "timelinelite", "keyboard", "local-storage"], function(GameObject, Gb, TimelineLite, Keyboard, LocalStorage) {
  var Title = GameObject.extend({
    init: function() {
      this._super();
    },

    start: function() {
    	var viewports = [{viewport: 'Main', layer: 'Front'}];

    	this.options = [];

    	this.fly = Gb.create('Fly', 'First', viewports, { x: -300, y: 20 });
    	this.shoot = Gb.create('Shoot', 'First', viewports, { x: -300, y: 70 });
    	this.die = Gb.create('Die', 'First', viewports, { x: -300, y: 120 });
    	this.loop = Gb.create('LoopArrow', 'First', viewports, { x: -300, y: 38 });

    	this.addOption('play', 'Play', viewports, { x: Gb.canvas.width/2, y: 600 });
    	this.addOption('edit', 'Edit', viewports, { x: Gb.canvas.width/2, y: 600 });

    	this.play = Gb.create('Play', 'First', viewports, { x: Gb.canvas.width/2, y: 600 });
    	this.edit = Gb.create('Edit', 'First', viewports, { x: Gb.canvas.width/2, y: 630 });
    	
    	if (LocalStorage.getScenesCount() > 0) {
    		this.addOption('custom', 'PlayCustom', viewports, { x: Gb.canvas.width/2, y: 660 });			
    	}

    	this.tl = new TimelineLite({
    		onComplete: function() {
    			Keyboard.onKeyDown(Keyboard.GAME_UP, this, this.onUpPress);
				Keyboard.onKeyDown(Keyboard.GAME_DOWN, this, this.onDownPress);
				Keyboard.onKeyDown(Keyboard.GAME_BUTTON_1, this, this.onOptionSelected);

				this.execute(this.ENTER);
    		}.bind(this),

    		onReverseComplete: function() {
    			if (this.play.selected) {
	    			this.execute(this.PLAY);
				} 
				else if (this.custom.selected) {
					this.execute(this.CUSTOM);
				}
    		}.bind(this) 
    	});

		this.tl.to(this.fly, 0.5, { x: Gb.canvas.width/2});
		this.tl.to(this.shoot, 0.5, { x: Gb.canvas.width/2});
		this.tl.to(this.die, 0.5, { x: Gb.canvas.width/2});
		this.tl.to(this.loop, 0.5, { x: Gb.canvas.width/2 - 50 });

		this.tl.staggerTo([this.play, this.custom, this.edit], 0.5, { y: '-=380' }, 0);

		this.tl.play();

		this.currentOption = 0;
		highLightOption.call(this, this.currentOption);
    }, 

    addOption: function(varName, objectName, viewports, args) {
    	this[varName] = Gb.create(objectName, 'First', viewports, args);

    	this.options.push(varName);
    },

    reverse: function() {
    	Keyboard.removeKeyDown(Keyboard.GAME_UP, this, this.onLeftPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_DOWN, this, this.onRightPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_BUTTON_1, this, this.onOptionSelected);

    	this.tl.reverse();
    },

    onUpPress: function() {
    	if (this.currentOption > 0) {
    		this.currentOption--;
    	}

    	highLightOption.call(this, this.currentOption);
    },

    onDownPress: function() {
    	if (this.currentOption < this.options.length - 1) {
    		this.currentOption++;
    	}

    	highLightOption.call(this, this.currentOption);
    },

    onOptionSelected: function() {
    	if (this.play.selected) {
			this.reverse();
		}

		if (this.edit.selected) {
			if (Keyboard.isKeyDown(Keyboard.CTRL) && Keyboard.isKeyDown(Keyboard.ALT)) {
				this.execute(this.EDIT, true);
			} else {
				this.execute(this.EDIT, false);	
			}
		}

		if (this.custom.selected) {
			this.reverse();
		}
    },

    recycle: function() {
    	this._super();

    	Keyboard.removeKeyDown(Keyboard.GAME_UP, this, this.onUpPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_DOWN, this, this.onDownPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_BUTTON_1, this, this.onOptionSelected);

    	this.tl.kill();

    	this.tl = null;
    	this.fly = null;
    	this.shoot = null;
    	this.die = null;
    	this.loop = null;
    	this.play = null;
    	this.edit = null;
    	this.custom = null;
    }
  });

	var highLightOption = function(optionIndex) {
		hideAllHighLight.call(this);

		var option = this[this.options[optionIndex]];

	  	var children = option.findChildren().allWithType("MarkerArrow");

	  	option.selected = true;

		for (var i = 0; i < children.length; i++) {
			children[i].show();
		}
  	}

	var hideAllHighLight = function() {
  		for (var i = 0; i < this.options.length; i++) {
	  		var option = this[this.options[i]];

	  		option.selected = false;

	  		var children = option.findChildren().allWithType("MarkerArrow");

	  		for (var j = 0; j < children.length; j++) {
				children[j].hide();
			}
  		}
  	}

	Object.defineProperty(Title.prototype, "ENTER", { get: function() { return 'enter'; } });
	Object.defineProperty(Title.prototype, "PLAY", { get: function() { return 'play'; } });
	Object.defineProperty(Title.prototype, "CUSTOM", { get: function() { return 'custom'; } });
	Object.defineProperty(Title.prototype, "EDIT", { get: function() { return 'edit'; } });

	return Title;
});

