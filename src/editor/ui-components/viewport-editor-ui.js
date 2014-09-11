define(function(require) {
  var wrapper = require('wrap-in-div');
  var gb = require('gb');

  var checkbox = require('label-checkbox');
  var button = require('button');
  var editableDropdown = require('editable-dropdown');
  var oneDimentionInput = require('one-dimention-input');
  var twoDimentionsInput = require('two-dimentions-input');

  var setupViewport = require('setup-viewport');
  
  var masonry = require('masonry-v2-shim');

  var ViewportEditor = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var container = document.createElement('div');
      container.id = 'viewport-control';

      // Selection check box
      var labelCheckboxUI = new checkbox().create({
        id: 'viewport-active-checkbox-' + options.viewport.name,
        label: options.viewport.name
      });

      // Selection check box
      var outlineCheckboxUI = new checkbox().create({
        id: 'viewport-outline-checkbox-' + options.viewport.name,
        label: 'Outline',
        onChange: function(event) {
          if (event.target.checked) {
            setupViewport.addOutline(options.viewport.name);
          } else {
            setupViewport.removeOutline(options.viewport.name);
          }
        }
      });
   
      //  Remove Button
      var buttonUI = new button().create({
        label: 'Remove',
        onClick: function() {
          // Remove viewport
          var viewportGos = gb.viewports.remove(options.viewport.name);

          // TODO: this logic can go in the guts of the framework
          // Check which game objects are not renderer in any viewport
          for (var i = 0; i < viewportGos.length; i++) {
            var go = viewportGos[i];

            // If a game object is not renderer anywhere send it back to it's pool
            if (!go.hasViewport()) {
              gb.reclaimer.claim(go);
            }
          }
          /**
           * --------------------------------
           */

          // Remove the UI component from it's parent
          container.parentNode.removeChild(container);
        }
      });

      // Viewport layers selector. Skips the 'Outline layer that all viewports have'
      var layersUI = new editableDropdown().create({
        id: 'layers-' + options.viewport.name,
        defaultMessage: 'Select a Layer',
        selectedMessage: 'Selected Layer:',
        disabledItems: ['Outline'],
        data: options.viewport.layers.map(function(layer) { return layer.name; }),
        onEdit: function(value, newIndex, oldIndex) {
          // TODO: arrange layers
        }
      });

      //  Size editor
      var sizeUI = new twoDimentionsInput().create({
        id: 'size-container',
        containerClass: 'viewport-editor-container',
        label: 'Size',
        labelClass: 'viewport-editor-label',
        inputClass: 'viewport-editor-input-double',
        xValue: options.viewport.Width,
        yValue: options.viewport.Height,
        onXChange: function(event) { 
          gb.viewports.get(options.viewport.name).Width = event.target.value; 
        },
        onYChange: function(event) { 
          gb.viewports.get(options.viewport.name).Height = event.target.value; 
        }
      });

      // Offset editor
      var offsetUI = new twoDimentionsInput().create({
        id: 'offset-container',
        containerClass: 'viewport-editor-container',
        label: 'Offset',
        labelClass: 'viewport-editor-label',
        inputClass: 'viewport-editor-input-double',
        xValue: options.viewport.OffsetX,
        yValue: options.viewport.OffsetY,
        onXChange: function(event) { 
          gb.viewports.get(options.viewport.name).OffsetX = event.target.value; 
        },
        onYChange: function(event) { 
          gb.viewports.get(options.viewport.name).OffsetY = event.target.value; 
        }
      });

      // Scale editor
      var scaleUI = new twoDimentionsInput().create({
        id: 'scale-container',
        containerClass: 'viewport-editor-container',
        label: 'Scale',
        labelClass: 'viewport-editor-label',
        inputClass: 'viewport-editor-input-double',
        xValue: options.viewport.ScaleX,
        yValue: options.viewport.ScaleY,
        onXChange: function(event) { 
          gb.viewports.get(options.viewport.name).ScaleX = event.target.value; 
        },
        onYChange: function(event) { 
          gb.viewports.get(options.viewport.name).ScaleY = event.target.value; 
        }
      });

      var stroke = options.viewport.getStroke();

      // Stroke color editor
      var strokeColorUI = new oneDimentionInput().create({
        id: 'stroke-color-container',
        containerClass: 'viewport-editor-container',
        label: 'Stroke Color',
        labelClass: 'viewport-editor-label',
        inputClass: 'viewport-editor-input-single',
        value: stroke.color,
        onChange: function(event) { 
          gb.viewports.get(options.viewport.name).setStroke(null, event.target.value); 
        }
      });

      // Stroke color editor
      var strokeSizeUI = new oneDimentionInput().create({
        id: 'stroke-size-container',
        containerClass: 'viewport-editor-container',
        label: 'Stroke Size',
        labelClass: 'viewport-editor-label',
        inputClass: 'viewport-editor-input-single',
        value: stroke.width,
        onChange: function(event) { 
          gb.viewports.get(options.viewport.name).setStroke(event.target.value, null); 
        }
      });

      container.appendChild(labelCheckboxUI);
      container.appendChild(outlineCheckboxUI);
      container.appendChild(buttonUI);
      container.appendChild(layersUI);  

      var colWidth = function () {
        var w = $(c).width();
        var columnNum;

        if (w > 1200) {
          columnNum  = 5;
        } else if (w > 900) {
          columnNum  = 4;
        } else if (w > 600) {
          columnNum  = 3;
        } else {
          columnNum  = 2;
        }

        var columnWidth = Math.floor(w/columnNum) - 0.5;
        
        $(c).find('.viewport-editor-container').each(function() {
          var $item = $(this);    

          var margins = parseFloat($item.css('margin-left')) + parseFloat($item.css('margin-right'))

          $item.css('width', columnWidth - margins);
        });

        return columnWidth;
      }
      
      var c = document.createElement('div');

      c.appendChild(sizeUI);
      c.appendChild(offsetUI);
      c.appendChild(scaleUI);
      c.appendChild(strokeColorUI);
      c.appendChild(strokeSizeUI);

      container.appendChild(c);

      var wrapped = wrapper.wrap(container);

      $(document).on('DOMNodeInserted', function(event) {
        // TODO: Hacer que esto pase de una forma copada
        if ($(wrapped).is($(event.target).children().children())) {
          $(c).masonry({
            itemSelector: '.viewport-editor-container',
            columnWidth:  colWidth,
            transitionDuration: 0
          });

          $(document).off(event);
        }
      });

      return wrapped;
    }
  });

  return ViewportEditor;
});

