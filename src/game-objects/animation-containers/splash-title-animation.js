define(["game-object", "gb", "TimelineLite", "keyboard", "local-storage", "TweenLite", "EasePack"], function(GameObject, Gb, TimelineLite, Keyboard, LocalStorage) {
  
  var heightOffset = -60;
  var heightOffse4 = -20;
  var heightOffset2 = -5;
  var heightOffset3 = -20;
  
  var Title = GameObject.extend({
    init: function() {
      this._super();
    },

    start: function() {
    	var viewports = [{viewport: 'Main', layer: 'Front'}];

    	this.options = [];

        this.splashImage = Gb.create('SplashImage', 'First', viewports, { x: 0, y: -300 });

    	this.controls_1 = Gb.create('Controls_1', 'First', viewports, { x: -1000, y: 350 + heightOffse4 });
    	this.controls_2 = Gb.create('Controls_2', 'First', viewports, { x: -1000, y: 390 + heightOffse4 });

    	this.addOption('play', 'Play', viewports, { x: Gb.canvas.width/2, y: Gb.canvas.height + 60 + heightOffset2 });
    	this.addOption('edit', 'Edit', viewports, { x: Gb.canvas.width/2, y: Gb.canvas.height + 110 + heightOffset2 });
    	this.addOption('custom', 'PlayCustom', viewports, { x: Gb.canvas.width/2, y: Gb.canvas.height + 160 + heightOffset2});

        this.credits_1 = Gb.create('Credits_1', 'First', viewports, { x: Gb.canvas.width / 2, y: Gb.canvas.height + 200 + heightOffset3});

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

        this.tl.to(this.splashImage, 0.5, { y: 0 }, 'title');
		this.tl.to(this.controls_1, 0.5, { x: Gb.canvas.width/2 }, 'controls');
		this.tl.to(this.controls_2, 0.5, { x: Gb.canvas.width/2 }, 'controls');
	    this.tl.to(this.play, 0.3, { y: '-=230' }, 'options');
	    this.tl.to(this.edit, 0.3, { y: '-=230' }, 'options');
	    this.tl.to(this.custom, 0.3, { y: '-=230' }, 'options');
        this.tl.to(this.credits_1, 0.5, { y: '-=200' }, 'credits');
        
		this.tl.play();

		this.currentOption = 0;
		highLightOption.call(this, this.currentOption);

		this._super();
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

    		this.execute("option");
    	}

    	highLightOption.call(this, this.currentOption);
    },

    onDownPress: function() {
    	if (this.currentOption < this.options.length - 1) {
    		this.currentOption++;

    		this.execute("option");
    	}

    	highLightOption.call(this, this.currentOption);
    },

    onOptionSelected: function() {
    	if (this.play.selected) {
			this.reverse();
		}

		if (this.edit.selected) {
			if (Keyboard.isKeyDown(Keyboard.P) && Keyboard.isKeyDown(Keyboard.O) && Keyboard.isKeyDown(Keyboard.I)) {
				this.execute(this.EDIT, true);
			} else {
				this.execute(this.EDIT, false);
			}
		}

		if (this.custom) {
			if (this.custom.selected) {
				this.reverse();
			}
		}

		this.execute("select");
    },

    recycle: function() {
    	this._super();

    	Keyboard.removeKeyDown(Keyboard.GAME_UP, this, this.onUpPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_DOWN, this, this.onDownPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_BUTTON_1, this, this.onOptionSelected);

    	this.tl.kill();

    	this.tl = null;
        this.splashImage = null;
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

