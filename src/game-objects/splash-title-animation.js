define(["game-object", "gb", "timelinelite", "keyboard"], function(GameObject, Gb, TimelineLite, Keyboard) {
  var Title = GameObject.extend({
    init: function() {
      this._super();
    },

    start: function() {
    	var viewports = [{viewport: 'Main', layer: 'Front'}];

    	var fly = Gb.create('Fly', 'First', viewports, { x: -300, y: 20 });
    	var shoot = Gb.create('Shoot', 'First', viewports, { x: -300, y: 70 });
    	var die = Gb.create('Die', 'First', viewports, { x: -300, y: 120 });
    	var loop = Gb.create('LoopArrow', 'First', viewports, { x: -300, y: 38 });

    	var play = Gb.create('Play', 'First', viewports, { x: Gb.canvas.width/2 - 100, y: 600 });
    	var edit = Gb.create('Edit', 'First', viewports, { x: Gb.canvas.width/2 + 100, y: 600 });

    	var tl = new TimelineLite({onComplete: function() {

    	}});

			tl.to(fly, 0.5, { x: Gb.canvas.width/2});
			tl.to(shoot, 0.5, { x: Gb.canvas.width/2});
			tl.to(die, 0.5, { x: Gb.canvas.width/2});
			tl.to(loop, 0.5, { x: Gb.canvas.width/2 - 50 });

			tl.to(play, 0.5, { y: 250 });
			tl.to(edit, 0.5, { y: 250 });

			tl.play();


			var children = edit.findChildren().allWithType("MarkerArrow");

			for (var i = 0; i < children.length; i++) {
				children[i].hide();
			}

			Keyboard.onKeyDown(Keyboard.GAME_LEFT, this, function() {
				this.onLeftPress(play, edit);
			});

			Keyboard.onKeyDown(Keyboard.GAME_RIGHT, this, function() {
				this.onRightPress(play, edit);
			})
    }, 

    onLeftPress: function(play, edit) {
    	var children = play.findChildren().allWithType("MarkerArrow");

			for (var i = 0; i < children.length; i++) {
				children[i].show();
			}

			var children = edit.findChildren().allWithType("MarkerArrow");

			for (var i = 0; i < children.length; i++) {
				children[i].hide();
			}
    },

    onRightPress: function(play, edit) {
    	var children = play.findChildren().allWithType("MarkerArrow");

			for (var i = 0; i < children.length; i++) {
				children[i].hide();
			}

			var children = edit.findChildren().allWithType("MarkerArrow");

			for (var i = 0; i < children.length; i++) {
				children[i].show();
			}
    },

    recycle: function() {
    	this._super();

    	Keyboard.removeKeyDown(Keyboard.GAME_LEFT, this, this.onLeftPress);
    	Keyboard.removeKeyDown(Keyboard.GAME_RIGHT, this, this.onRightPress);
    }
  });

  return Title;
});

