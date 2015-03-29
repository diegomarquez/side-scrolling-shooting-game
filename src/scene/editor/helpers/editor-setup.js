define(function(require) {
  var gb = require('gb');
  var world = require('world');
  var editorConfig = require('editor-config');
  var editorDelegates = require('editor-delegates');
  var editorViewports = require('editor-viewports');

  var EditorSetup = require('class').extend({
    init: function() {},

    config: function() {
      return editorConfig;
    },

    begin: function() {
      gb.toggleDebug(true);

      this.clear();
      this.world();
      this.groups();
      this.mainViewport();

      this.pools();

      this.display();
    },

    display: function() {
    	this.setupViewports();  
      this.setupGameObjects();
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
      // Turn global debug setting off
      gb.toggleDebug(false);
      // Remove all editor related delegates
      editorDelegates.clean();
      // Destroy toggles
      $('input[editor-toggle]').bootstrapToggle('destroy');
      // Remove left over dialogs
      $('.ui-dialog').remove();
    },

    clear: function() {
      // Claim all Game Objects and clean up the pools from instances
      gb.reclaimer.clearAllObjectsFromPools().now();
      // Remove all update groups
      gb.groups.removeAll();
      // Remove all Viewports
      gb.viewports.removeAll();
    },

    pools: function() {
      require('outline-bundle').create();
      require('grid-bundle').create();
      require('gizmo-bundle').create();
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
      var name = editorConfig.getMainViewportName();
      var width = gb.canvas.width;
      var height = gb.canvas.height;

      var mainViewport = editorViewports.add(name, width, height).NoClipping().NoCulling().NoMouseBounded().Stroke(1, '#4E91F0').viewport;

      mainViewport.addLayer(editorConfig.getDefaultLayerName());
      mainViewport.addLayer(editorConfig.getOutlineLayerName());

      mainViewport.addLayer(editorConfig.getGizmoFarBackLayerName());
      mainViewport.addLayer(editorConfig.getGizmoBackLayerName());
      mainViewport.addLayer(editorConfig.getGizmoMiddleLayerName());
      mainViewport.addLayer(editorConfig.getGizmoFrontLayerName());
      mainViewport.addLayer(editorConfig.getGizmoCloseFrontLayerName());

      mainViewport.hideLayer(editorConfig.getGizmoMiddleLayerName());
      mainViewport.hideLayer(editorConfig.getGizmoFrontLayerName());
      mainViewport.hideLayer(editorConfig.getGizmoCloseFrontLayerName());
      mainViewport.hideLayer(editorConfig.getGizmoFarBackLayerName());
    },

    gridViewport: function() {
    	var name = editorConfig.getGridViewportName();
    	var width = gb.canvas.width;
      var height = gb.canvas.height;

      // Setup the grid viewport
      var gridViewport = editorViewports.add(name, width, height).NoClipping().NoCulling().viewport;
      
      gridViewport.addLayer(editorConfig.getDefaultLayerName());

      // Hidden by default
      gridViewport.hide();
    },

    setupViewports: function() {
    	this.gridViewport();
    },

    setupGameObjects: function() {
    	var gridBundle = require('grid-bundle');

    	// Add Grid
      gb.add(gridBundle.getGridId(), editorConfig.getDefaultGroupName(), [{viewport:editorConfig.getGridViewportName(), layer:editorConfig.getDefaultLayerName()}]);
    }
  });

  return new EditorSetup();
});
