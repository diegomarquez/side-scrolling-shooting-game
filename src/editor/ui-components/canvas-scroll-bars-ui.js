define(function(require) {
  var scrollBar = require('scroll-bar');
  var gb = require('gb');
  var editorConfig = require('editor-config');

  var CanvasScrollBars = require('class').extend({
    init: function() {},

    create: function() {
      var canvas = document.getElementById('main');
      var viewport = gb.viewports.get(editorConfig.getMainViewportName());

      var verticalScrollBar = new scrollBar().create({
        id: 'canvas-vertical-scroll-bar',
        value: viewport.height,
        min: 0,
        max: viewport.height,
        step: 1,
        orientation: 'vertical',
        style: {
          height: (viewport.height-2) + 'px',
          display: 'inline-block'
        },
        onChange: function(event, ui) {
          console.log(ui.value);

          // viewport.Y = ui.value;
        } 
      });

      var horizontalScrollBar = new scrollBar().create({
        id: 'canvas-horizontal-scroll-bar', 
        value: 0,
        min: 0,
        max: viewport.width,
        step: 1,
        orientation: 'horizontal',
        style: {
          width: (viewport.width-2) + 'px'
        },
        onChange: function(event, ui) {
          console.log(ui.value);
          // viewport.X = ui.value;
        }
      });

      canvas.appendChild(verticalScrollBar);
      canvas.appendChild(horizontalScrollBar);
    }
  });

  return CanvasScrollBars;
});