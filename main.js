// side-shmup's main entry point

define(function(require){
  var gb = require('gb');

  // var soundPlayer = require('sound-player');
  // var viewportFollow = require('viewport-follow');
  // var viewportOutline = require('viewport-outline');
  // var playerShipGetter = require('player-ship-getter');

  var sceneEditor = require('scene-editor');
  // var mainViewportControl = require('main-viewport-control');

  // var starField = require('star-field');

  gb.debug = true;

  // Storing some references to avoid excesive typing
  var game = gb.game;

  game.add_extension(require("display-setup"));
  game.add_extension(require("mouse-events"));
  game.add_extension(require("activity-display"));

  // This is the main initialization function
  game.on(game.CREATE, this, function() {

    // var collision_resolver = require('collision-resolver');
    // collision_resolver.addCollisionPair('shipColliderId', 'dummyColliderId');

    // require('stars-bundle').create();
    require('ship-bundle').create();
    require('outline-bundle').create();
    // require('bullets-bundle').create();

    sceneEditor.create();
    // mainViewportControl.create('Main', 50);

    // soundPlayer.createChannels(5);
    // soundPlayer.load('SHOT', assetMap['SPACEINVADERS_FIRE.WAV']);
    // soundPlayer.assignChannels('SHOT', 5);

    // starField.create();

    // Add player ship
    // var ship = playerShipGetter.get();
    // playerShipGetter.get();

    // Make 'Main' viewport follow the position of the player ship
    // viewportFollow.setFollow('Main', playerShipGetter.get());

    // Make the outline in the minimap follow the position of the 'Main' viewport
    // viewportOutline.setOutline('Main', 'Outline', 'First', 'MiniFront');
  });

  // This is the main update loop
  game.on(game.UPDATE, this, function() {
    // starField.update(game.delta);
    // viewportFollow.update(game.delta);
    // viewportOutline.update(game.delta);
  });

  // This is the main setup that kicks off the whole thing
  // Notice how it needs to find a '#main' and '#game' in the document
  game.create(document.getElementById('main'), document.getElementById('game'));
});
