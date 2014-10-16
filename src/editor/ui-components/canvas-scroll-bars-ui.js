define(function(require) {
  var scrollBar = require('scroll-bar');
  var gb = require('gb');
  var world = require('world');
  var editorConfig = require('editor-config');

  var CanvasScrollBars = require('class').extend({
    init: function() {},

    create: function() {
      var canvas = document.getElementById('main');
      var viewport = gb.viewports.get(editorConfig.getMainViewportName());

      var verticalScrollBar = new scrollBar().create(function() {
        return {
          id: 'canvas-vertical-scroll-bar',
          value: clampAtCero(world.getHeight(), viewport.height),
          min: 0,
          max: clampAtCero(world.getHeight(), viewport.height),
          step: editorConfig.getGridCellSize().height,
          orientation: 'vertical',
          height: viewport.height,
          contentHeight: world.getHeight(),
          style: {
            height: (viewport.height-2) + 'px',
            display: 'inline-block'
          },
          onSlide: function(event, ui) {
            viewport.Y = -(clampAtCero(world.getHeight(), viewport.height) - ui.value);
          } 
        }
      });

      var horizontalScrollBar = new scrollBar().create(function() {
       return {
          id: 'canvas-horizontal-scroll-bar', 
          value: 0,
          min: 0,
          max: clampAtCero(world.getWidth(), viewport.width),
          step: editorConfig.getGridCellSize().width,
          orientation: 'horizontal',
          width: viewport.width,
          contentWidth: world.getWidth(),
          style: {
            width: (viewport.width-2) + 'px'
          },
          onSlide: function(event, ui) {
            viewport.X = -ui.value;
          }
        } 
      });

      canvas.appendChild(verticalScrollBar.html);
      canvas.appendChild(horizontalScrollBar.html);

      // Refresh the scrollbars when the world changes
      world.on(world.CHANGE_HEIGHT, this, function(value) {
        verticalScrollBar.refresh();
      });
      
      world.on(world.CHANGE_WIDTH, this, function(value) {
        horizontalScrollBar.refresh();
      });

      // Adjust the viewport offset when the world decreases and the scrollbar is at it's maximum value
      world.on(world.CHANGE_HEIGHT_DECREASE, this, function(value) {
        if(verticalScrollBar.isAtMaxEdge()) {
          viewport.Y += verticalScrollBar.option('step');
        }
      });
      
      world.on(world.CHANGE_WIDTH_DECREASE, this, function(value) {
        if(horizontalScrollBar.isAtMaxEdge()) {
          viewport.X += horizontalScrollBar.option('step');
        }
      });
    }
  });

  var clampAtCero = function (first, second) {
    var result = first - second;
    return result < 0 ? 0 : result;
  }

  return CanvasScrollBars;
});