define(["game-object", "gb", "timelinelite", "keyboard", "level-storage"], function(GameObject, Gb, TimelineLite, Keyboard, LevelStorage) {
  var StageOverview = GameObject.extend({
    init: function() {
      this._super();
    },

    start: function() {
    	var viewports = [{viewport: 'Main', layer: 'Front'}];

    	this.gridX = 0;
    	this.gridY = 0;

    	this.stages = Gb.create('StageOverviewTitle', 'First', viewports, { x: Gb.canvas.width/2, y: -200 });
    	
    	this.topLeft = Gb.create('Stage1Frame', 'First', viewports, { x: -500, y: Gb.canvas.height/2-110 });
    	this.topRight = Gb.create('Stage2Frame', 'First', viewports, { x: Gb.canvas.width+500, y: Gb.canvas.height/2-110 });
    	this.bottomLeft = Gb.create('Stage3Frame', 'First', viewports, { x: -500, y: Gb.canvas.height/2+110 });
    	this.bottomRight = Gb.create('Stage4Frame', 'First', viewports, { x: Gb.canvas.width+500, y: Gb.canvas.height/2+110 });
    	
    	this.topLeft.select();

    	this.backOption = Gb.create('Back', 'First', viewports, { x: Gb.canvas.width/2, y: Gb.canvas.height*2 });
    	
    	this.tl = new TimelineLite({
    		onComplete: function() {
    			Keyboard.onKeyDown(Keyboard.GAME_LEFT, this, this.onLeftPress);
				Keyboard.onKeyDown(Keyboard.GAME_RIGHT, this, this.onRightPress);
				Keyboard.onKeyDown(Keyboard.GAME_UP, this, this.onUpPress);
				Keyboard.onKeyDown(Keyboard.GAME_DOWN, this, this.onDownPress);
				
				Keyboard.onKeyDown(Keyboard.GAME_BUTTON_1, this, this.onOptionSelected);

				this.execute(this.ENTER);
    		}.bind(this),

    		onReverseComplete: function() {
    			this.executeExitDelegate();
    		}.bind(this) 
    	});

			this.tl.to(this.stages, 0.5, { y: 50 }, 'title');
    		this.tl.to(this.topLeft, 0.5, { x: Gb.canvas.width/2-110 }, 'stages');
    		this.tl.to(this.bottomLeft, 0.5, { x: Gb.canvas.width/2-110 }, 'stages');
    		this.tl.to(this.topRight, 0.5, { x: Gb.canvas.width/2+110 }, 'stages');
    		this.tl.to(this.bottomRight, 0.5, { x: Gb.canvas.width/2+110 }, 'stages');
			this.tl.to(this.backOption, 0.5, { y: Gb.canvas.height - 40 }, 'title');

			this.tl.play();

			this.onLeftPress();			
    }, 

    reverse: function() {
    	Keyboard.removeKeyDown(Keyboard.GAME_LEFT, this, this.onLeftPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_RIGHT, this, this.onRightPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_UP, this, this.onUpPress);
		Keyboard.removeKeyDown(Keyboard.GAME_DOWN, this, this.onDownPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_BUTTON_1, this, this.onOptionSelected);

    	this.tl.reverse();
    },

    onLeftPress: function() {
    	this.hideAllOptions();
		
		if (this.gridX > 0)
			this.gridX--;

		this.showSelection();
    },

    onRightPress: function() {
    	this.hideAllOptions();

    	if (this.gridX < 1)
    		this.gridX++;

    	this.showSelection();
    },

    onUpPress: function() {
    	this.hideAllOptions();

    	if (this.gridY > 0)
    		this.gridY--;

    	this.showSelection();
    },

    onDownPress: function() {
    	this.hideAllOptions();

    	if (this.gridY < 2)
    		this.gridY++;

    	this.showSelection();
    },

    hideAllOptions: function() {
    	var children = this.backOption.findChildren().allWithType("MarkerArrow");

		for (var i = 0; i < children.length; i++) {
			children[i].hide();
		}
		
		this.topLeft.unselect();
    	this.bottomLeft.unselect();
    	this.topRight.unselect();
    	this.bottomRight.unselect();
    },

    showSelection: function() {
    	if (this.gridX == 0 && this.gridY == 0) {
  			this.topLeft.select();
  		} else if (this.gridX == 0 && this.gridY == 1) {
  			this.bottomLeft.select();
  		} else if (this.gridX == 1 && this.gridY == 0) {
  			this.topRight.select();
  		} else if (this.gridX == 1 && this.gridY == 1) {
  			this.bottomRight.select();
  		} else {
  			var children = this.backOption.findChildren().allWithType("MarkerArrow");

  			for (var i = 0; i < children.length; i++) {
				children[i].show();
			}
  		}
    },

    executeExitDelegate: function() {
    	if (this.gridX == 0 && this.gridY == 0) {

  		} else if (this.gridX == 0 && this.gridY == 1) {

  		} else if (this.gridX == 1 && this.gridY == 0) {

  		} else if (this.gridX == 1 && this.gridY == 1) {

  		} else {
  			this.execute(this.BACK_EXIT);
  		}
    },

    executeStartSelectedDelegate: function() {
    	if (this.gridX == 0 && this.gridY == 0) {
  			this.execute(this.START_SELECTED, 0);
  		} else if (this.gridX == 0 && this.gridY == 1) {
  			this.execute(this.START_SELECTED, 2);
  		} else if (this.gridX == 1 && this.gridY == 0) {
  			this.execute(this.START_SELECTED, 1);
  		} else if (this.gridX == 1 && this.gridY == 1) {
  			this.execute(this.START_SELECTED, 3);
  		} else {

  		}
    },

    onOptionSelected: function() {
    	this.reverse();

    	this.executeStartSelectedDelegate();
    },

    recycle: function() {
    	this._super();

    	Keyboard.removeKeyDown(Keyboard.GAME_LEFT, this, this.onLeftPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_RIGHT, this, this.onRightPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_UP, this, this.onUpPress);
		Keyboard.removeKeyDown(Keyboard.GAME_DOWN, this, this.onDownPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_BUTTON_1, this, this.onOptionSelected);

    	this.tl.kill();

    	this.tl = null;
    	this.stages = null;
    	this.backOption = null;
    	this.topLeft = null;
    	this.bottomLeft = null;
    	this.topRight = null;
    	this.bottomRight = null;
    }
  });

	Object.defineProperty(StageOverview.prototype, "ENTER", { get: function() { return 'enter'; } });
	Object.defineProperty(StageOverview.prototype, "BACK_EXIT", { get: function() { return 'back_exit'; } });
	Object.defineProperty(StageOverview.prototype, "START_SELECTED", { get: function() { return 'start_exit'; } });

  return StageOverview;
});

