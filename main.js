// side-shmup's main entry point

define(function(require){
  var gb = require('gb');
  var loaderContainer = require('loader-container');

  var game = gb.game;

  game.add_extension(require("patch-collider-components"));
  game.add_extension(require("patch-game-object-configuration"));
  game.add_extension(require("patch-game-object-pool"));

  game.add_extension(require("pause"));
  game.add_extension(require("resume"));
  game.add_extension(require("sound-control"));
  game.add_extension(require("timers-control"));
  game.add_extension(require("tweens-control"));

  var stateMachineFactory = require('state-machine');
  var mainStateMachine = stateMachineFactory.createFixedStateMachine(); 

  mainStateMachine.add((require('splash-state'))('splash_state'));
  mainStateMachine.add((require('game-modes-state'))('game_modes_state'));

  gb.toggleDebug(true);
  gb.toggleGameObjectDebug(true);

  // This is the main initialization function
  game.on(game.CREATE, this, function() {
  	// Start the main state machine
  	mainStateMachine.start();
  	// Open the loader
    loaderContainer.open();
  });

  // This is the main update loop
  game.on(game.UPDATE, this, function (delta) {
  	mainStateMachine.update(delta);
  });

  // This is the main setup that kicks off the whole thing
  game.create();
});
