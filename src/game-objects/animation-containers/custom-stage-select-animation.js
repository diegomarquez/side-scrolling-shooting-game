define(["game-object", "gb", "timelinelite", "keyboard", "local-storage"], function(GameObject, Gb, TimelineLite, Keyboard, LocalStorage) {
  var StageOverview = GameObject.extend({
    init: function() {
      this._super();
    },

    start: function() {
    	var viewports = [{viewport: 'Main', layer: 'Front'}];

    	this.customStages = Gb.create('CustomStages', 'First', viewports, { x: -300, y: 30 });
    	this.menu = Gb.create('CustomStagesMenu', 'First', viewports, { x: -400, y: 55 });
    	this.backOption = Gb.create('Back', 'First', viewports, { x: Gb.canvas.width/2 - 100, y: 600 });
    	this.startOption = Gb.create('Start', 'First', viewports, { x: Gb.canvas.width/2 + 100, y: 600 });
    	
    	this.markers = this.menu.findChildren().allWithType('CurrentStageMarker');
    	this.stageNames = this.menu.findChildren().all(function (c) { return c.typeId.search('StageName') != -1 });

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
    			if (this.backOption.selected) {
						this.execute(this.BACK_EXIT);
						return;
					}

					if (this.startOption.selected) {
						this.execute(this.START_EXIT, this.scenes[this.stageIndex]);
						return;
					}
    		}.bind(this) 
    	});

			this.tl.to(this.customStages, 0.5, { x: Gb.canvas.width/2 });
			this.tl.to(this.menu, 0.5, { x: 25 });
			this.tl.staggerTo([this.backOption, this.startOption], 0.5, { y: 265 }, 0);

			this.tl.play();

			this.onRightPress();
			
			this.currentIndex = 0;
			this.stageIndex = 0;
			this.scenes = LocalStorage.getAllScenes();
			this.sceneCount = this.scenes.length - 1;

			hideMarkers.call(this);		
			showMarker.call(this, this.currentIndex);	
			updateStageNames.call(this, this.currentIndex, this.stageIndex, true);
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

    onUpPress: function() {
    	if (this.stageIndex > 0) {
    		this.stageIndex--;
    	}

    	if (this.currentIndex > 0) {
    		this.currentIndex--;
    	} 
    	else if (this.currentIndex == 0) {
    		updateStageNames.call(this, this.currentIndex, this.stageIndex);	
    	}

    	hideMarkers.call(this);
    	showMarker.call(this, this.currentIndex);
    	
    },

    onDownPress: function() {
    	if (this.stageIndex < this.sceneCount) {
    		this.stageIndex++;
    	}

    	if (this.currentIndex < this.markers.length - 1) {
    		this.currentIndex++;
    	} 
    	else if (this.currentIndex == this.markers.length-1) {
    		updateStageNames.call(this, this.currentIndex, this.stageIndex);	
    	}

    	hideMarkers.call(this);
    	showMarker.call(this, this.currentIndex);
    	
    },

    onOptionSelected: function() {
    	if (this.backOption.selected) {
    		this.reverse();
				this.execute(this.BACK_SELECTED);
				return;
			}

			if (this.startOption.selected && this.stageNames[this.currentIndex].validLevel) {
				this.reverse();
				this.execute(this.START_SELECTED, this.scenes[this.stageIndex]);	
				return;
			}
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
    	this.customStages = null;
    	this.backOption = null;
    	this.startOption = null;
    }
  });

	var showMarker = function(currentMarkerIndex) {
		this.markers[currentMarkerIndex].show();
	}	

	var hideMarkers = function() {
		for (var i = 0; i < this.markers.length; i++) {
			this.markers[i].hide();
		}
	}

	var updateStageNames = function(currentMarkerIndex, currentStageIndex, first) {
		if (this.scenes.length < this.markers.length && !first) {
			return;
		}

		var startIndex = currentStageIndex % (this.markers.length - 1);

		for (var i = 0; i < this.markers.length; i++) {
			if (this.scenes[startIndex + i]) {
				this.stageNames[i].renderer.Text = this.scenes[startIndex + i];	
				this.stageNames[i].validLevel = true;
			} else {
				this.stageNames[i].renderer.Text = '---';
				this.stageNames[i].validLevel = false;
			}
		}	
	}

	Object.defineProperty(StageOverview.prototype, "ENTER", { get: function() { return 'enter'; } });
	Object.defineProperty(StageOverview.prototype, "BACK_SELECTED", { get: function() { return 'back_selected'; } });
	Object.defineProperty(StageOverview.prototype, "START_SELECTED", { get: function() { return 'start_selected'; } });
	Object.defineProperty(StageOverview.prototype, "BACK_EXIT", { get: function() { return 'back_exit'; } });
	Object.defineProperty(StageOverview.prototype, "START_EXIT", { get: function() { return 'start_exit'; } });

  return StageOverview;
});
