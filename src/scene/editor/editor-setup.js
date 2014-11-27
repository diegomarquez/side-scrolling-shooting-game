define(function(require) {
  var gb = require('gb');
  var world = require('world');
  var editorConfig = require('editor-config');
  var editorDelegates = require('editor-delegates');

  var EditorSetup = require('class').extend({
    init: function() {},

    config: function() {
      return editorConfig;
    },

    begin: function() {
      gb.toggleDebug();

      this.clear();
      this.world();
      this.groups();
      this.mainViewport();
      this.gridViewport();  
      this.pools();
    },

    end: function() {
      editorDelegates.add(gb.viewports, gb.viewports.ADD, this, function (v) {
        // Initialize new toogles
        $('input[editor-toggle]').bootstrapToggle();
      });

      // Initialize first toggles 
      $('input[editor-toggle]').bootstrapToggle();
    },

    exit: function() {
      var mainContainer = $('#main-editor-container');

      // Hide the main editor container by setting it's display property to none
      // Everything is still there to be destroyed by hidden and not taking part of the page layout
      mainContainer.toggle();

      // Turn global debug setting off
      gb.toggleDebug();
      // Remove all editor related delegates
      editorDelegates.clean();
      // Claim all Game Objects and clean up the pools from instances
      gb.reclaimer.clearAllObjectsFromPools();
      // Remove all update groups
      gb.groups.removeAll();
      // Remove all Viewports
      gb.viewports.removeAll();
      // Destroy the pools
      gb.reclaimer.clearAllPools();
      
      // Destroy toggles
      $('input[editor-toggle]').bootstrapToggle('destroy');
      // Remove left over dialogs
      $('.ui-dialog').remove();
    },

    clear: function() {
      // Claim all Game Objects and clean up the pools from instances
      gb.reclaimer.clearAllObjectsFromPools();
      // Remove all update groups
      gb.groups.removeAll();
      // Remove all Viewports
      gb.viewports.removeAll();
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



      
      
      