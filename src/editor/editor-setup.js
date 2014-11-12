define(function(require) {
  var gb = require('gb');
  var world = require('world');
  var editorConfig = require('editor-config');

  var EditorSetup = require('class').extend({
    init: function() {

    },

    config: function() {
      return editorConfig;
    },

    begin: function() {
      this.clear();
      this.world();
      this.groups();
      this.mainViewport();
      this.gridViewport();  
      this.pools();
    },

    end: function() {
      gb.viewports.on(gb.viewports.ADD, this, function (v) {
        // Initialize new toogles
        $('input[editor-toggle').bootstrapToggle();
      });

      // Initialize first toggles
      $('input[editor-toggle').bootstrapToggle();
    },

    clear: function() {
      // Claim all Game Objects
      gb.reclaimer.claimAll();
      // Remove all update groups
      gb.groups.removeAll();
      // Remove all Viewports
      gb.viewports.removeAll();
      
      // TODO: Remove all objects from pools to start with a clean slate
    },

    pools: function() {
      require('outline-bundle').create();
      require('grid-bundle').create();
    },

    world: function() {
      // Setup the default world size and world step
      world.create(gb.canvas.width, gb.canvas.height, 50);
    },

    groups: function() {
      // Setup the default update group
      gb.groups.add(editorConfig.getDefaultGroupName());
    },

    mainViewport: function() {
      // Setup the default viewport
      var mainViewport = gb.viewports.add(editorConfig.getMainViewportName(), gb.canvas.width, gb.canvas.height, 0, 0);
      mainViewport.addLayer(editorConfig.getDefaultLayerName());
      mainViewport.addLayer(editorConfig.getOutlineLayerName());
    },

    gridViewport: function() {
      // Setup the grid viewport
      var gridViewport = gb.viewports.add(editorConfig.getGridViewportName(), gb.canvas.width, gb.canvas.height, 0, 0);
      // This viewport does not perform any culling logic
      gridViewport.Culling = false;
      gridViewport.addLayer(editorConfig.getGridLayerName());
    }

  });

  return new EditorSetup();
});



      
      
      