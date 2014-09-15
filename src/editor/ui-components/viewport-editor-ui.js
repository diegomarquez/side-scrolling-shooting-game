define(function(require) {
  var wrapper = require('wrap-in-div');
  var gb = require('gb');
  var world = require('world');
  
  var checkboxSet = require('checkbox-set');
  var editableDropdown = require('editable-dropdown');
  var oneDimentionInput = require('one-dimention-input');
  var twoDimentionsInput = require('two-dimentions-input');

  var setupViewport = require('setup-viewport');

  var ViewportEditor = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var container = document.createElement('div');
      container.id = 'viewport-control';

      var checkboxSetUI = new checkboxSet().create({
        id: 'viewport-checkboxes',
        checkboxes: [
          {
            label: options.viewport.name
          },
          {
            label: 'Outline',
            onChange: function (event) {
              if (event.target.checked) {
                setupViewport.addOutline(options.viewport.name);
              } else {
                setupViewport.removeOutline(options.viewport.name);
              }
            }
          },
          {
            label: 'Fit World',
            onChange: function (event) {
              if (event.target.checked) {
                world.scaleViewportToFit(options.viewport);
                options.viewport.worldFit = true;
                scaleUI.X = options.viewport.ScaleX;
                scaleUI.Y = options.viewport.ScaleY;
              } else {
                options.viewport.worldFit = false;
                options.viewport.ScaleX = 1;
                options.viewport.ScaleY = 1; 
              }
            }
          },
          {
            label: 'Remove',
            onChange: function (event) {
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
          }
        ]
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

          if (options.viewport.worldFit) {
            world.scaleViewportToFit(options.viewport);
          }
        },
        onYChange: function(event) { 
          gb.viewports.get(options.viewport.name).ScaleY = event.target.value; 

          if (options.viewport.worldFit) {
            world.scaleViewportToFit(options.viewport);
          }
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

      container.appendChild(checkboxSetUI);
      container.appendChild(layersUI);  
      container.appendChild(wrapper.wrap([sizeUI.html, offsetUI.html, scaleUI.html, strokeColorUI.html, strokeSizeUI.html], {
        className: 'viewport-options'
      }));

      return wrapper.wrap(container);
    }
  });

  return ViewportEditor;
});

