define(["game-object", "gb", "timelinelite", "keyboard", "level-storage"], function(GameObject, Gb, TimelineLite, Keyboard, LevelStorage) {
  var StageOverview = GameObject.extend({
    init: function() {
      this._super();
    },

    start: function() {
    	var viewports = [{viewport: 'Main', layer: 'Front'}];

    	this.stages = Gb.create('Stages', 'First', viewports, { x: -300, y: 50 });
    	this.stageProgress = Gb.create('StageProgress', 'First', viewports, { x: -300, y: 170 });
    	this.backOption = Gb.create('Back', 'First', viewports, { x: Gb.canvas.width/2 - 100, y: 600 });
    	this.startOption = Gb.create('Start', 'First', viewports, { x: Gb.canvas.width/2 + 100, y: 600 });
    	
    	var markerIndex = LevelStorage.getLowestIncompleteLevelIndex() + 1;
    	var marker = this.stageProgress.findChildren().firstWithType('StageMarker' + markerIndex);
    	this.playerShipMarker = Gb.create('PlayerMarker', 'First', viewports, { x: marker.X, y: marker.Y - 50 });
    	this.stageProgress.add(this.playerShipMarker);
    	
    	this.tl = new TimelineLite({
    		onComplete: function() {
    			Keyboard.onKeyDown(Keyboard.GAME_LEFT, this, this.onLeftPress);
					Keyboard.onKeyDown(Keyboard.GAME_RIGHT, this, this.onRightPress);
					Keyboard.onKeyDown(Keyboard.GAME_BUTTON_1, this, this.onOptionSelected);

					this.execute(this.ENTER);
    		}.bind(this),

    		onReverseComplete: function() {
    			if (this.backOption.selected) {
						this.execute(this.BACK_EXIT);
						return;
					}

					if (this.startOption.selected) {
						this.execute(this.START_EXIT);
						return;
					}
    		}.bind(this) 
    	});

			this.tl.to(this.stages, 0.5, { x: Gb.canvas.width/2});
			this.tl.to(this.stageProgress, 0.5, { x: Gb.canvas.width/2 - 115 });
			this.tl.staggerTo([this.backOption, this.startOption], 0.5, { y: 250 }, 0);

			this.tl.play();

			this.onRightPress();			
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

    	if (this.backOption.selected) {
				this.execute(this.BACK_SELECTED);
				return;
			}

			if (this.startOption.selected) {
				this.execute(this.START_SELECTED);
				return;
			}
    },

    recycle: function() {
    	this._super();

    	Keyboard.removeKeyDown(Keyboard.GAME_LEFT, this, this.onLeftPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_RIGHT, this, this.onRightPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_BUTTON_1, this, this.onOptionSelected);

    	this.tl.kill();

    	this.tl = null;
    	this.stages = null;
    	this.backOption = null;
    	this.startOption = null;
    	this.stageProgress = null;
    	this.playerShipMarker = null;
    }
  });

	Object.defineProperty(StageOverview.prototype, "ENTER", { get: function() { return 'enter'; } });
	Object.defineProperty(StageOverview.prototype, "BACK_SELECTED", { get: function() { return 'back_selected'; } });
	Object.defineProperty(StageOverview.prototype, "START_SELECTED", { get: function() { return 'start_selected'; } });
	Object.defineProperty(StageOverview.prototype, "BACK_EXIT", { get: function() { return 'back_exit'; } });
	Object.defineProperty(StageOverview.prototype, "START_EXIT", { get: function() { return 'start_exit'; } });

  return StageOverview;
});

