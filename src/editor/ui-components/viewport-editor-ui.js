define(function(require) {
  var editorConfig = require('editor-config');

  var wrapper = require('wrap-in-div');
  var gb = require('gb');
  var world = require('world');

  var checkboxSet = require('checkbox-set');
  var editableDropdown = require('editable-dropdown-add-remove');
  var dialogUI = require('dialog');
  var oneDimentionInput = require('one-dimention-input');
  var twoDimentionsInput = require('two-dimentions-input');

  var setupViewport = require('setup-viewport');

  var ViewportEditor = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var container = document.createElement('div');
      container.id = 'viewport-control';
      container.className = 'viewport-control'
      
      $(container).attr('viewport-name', options.viewport.name);

      var checkboxSetUI = new checkboxSet().create({
        id: 'viewport-checkboxes-' + options.viewport.name,
        containerClass: 'viewport-checkboxes',
        checkboxes: [
          { 
            label: 'MoreOptions',
            text: false,
            state: false,
            icons: { on: 'ui-icon-plus', off: "ui-icon-minus" }, 
            onChange: function (event) {
              if (event.target.checked) {
                $(container).find('[id*=viewport-options]').slideDown();
              }
              else { 
                $(container).find('[id*=viewport-options]').slideUp();
              }
            }
          },
          {
            label: options.viewport.name,
            classNames: ['active-viewport']
          },
          {
            label: editorConfig.getOutlineLayerName(),
            onChange: function (event) {
              if (event.target.checked) {
                setupViewport.addOutline(options.viewport.name);
              }
              else { 
                setupViewport.removeOutline(options.viewport.name);
              }
            }
          },
          {
            label: 'Fit World',
            state: options.viewport.WorldFit,
            onChange: function (event) {
              if (event.target.checked) {
                world.scaleViewportToFit(options.viewport);
                scaleUI.disable();
              } 
              else {
                world.resetViewportScale(options.viewport);
                scaleUI.enable();
              }
            }
          },
          {
            onLabel: 'Show',
            offLabel: 'Hide',
            onChange: function (event) {
              if (event.target.checked) {
                options.viewport.hide()
              } else {
                options.viewport.show()
              }
            }
          },
          {
            label: 'Remove',
            disable: (options.viewport.name == editorConfig.getMainViewportName()),
            onChange: function (event) {
              gb.viewports.remove(options.viewport.name);
            }
          }
        ]
      });

      var addLayerDialogUI = new dialogUI().create({
        id: 'add-layer-dialog-' + options.viewport.name,
        title: 'Add a new layer in viewport ' + options.viewport.name,
        tip: 'Use a unique name',
        autoOpen: false,
        minHeight: 'auto',
        minWidth: 'auto',
        modal: true,
        
        fields: [
          { 
            name: 'Layer Name', 
            value: '',
            validations: [
              {
                check: function(value) { return value != ''; },
                tip: "Layer name can't be empty"
              },
              {
                check: function(value) { return !options.viewport.layerExists(value); },
                tip: 'This layer Id is already in use'
              }
            ]
          }
        ],

        buttons: {
          Add: function () {            
            options.viewport.addLayerBefore(this.LayerName(), editorConfig.getOutlineLayerName());
            $(this).dialog('close');
          }
        },

        validateOnAction: {
          'Add': ['Layer Name'] 
        }
      });

      // Viewport layers selector. Skips the 'Outline layer that all viewports have'
      var layersUI = new editableDropdown().create({
        id: 'layers-' + options.viewport.name,
        defaultMessage: 'Select a Layer',
        selectedMessage: 'Selected Layer:',
        disabledItems: [editorConfig.getOutlineLayerName()],
        data: function() {
          return options.viewport.layers.map(function(layer) { return layer.name; })
        },
        onAdd: function() {
          $(addLayerDialogUI).dialog('open');
        },
        onEdit: function(value, newIndex) {
          options.viewport.changeLayer(value, newIndex);
        },
        onRemove: function(layerName) {
          options.viewport.removeLayer(layerName);
        }
      });

      // When a layer is added, refresh the content of the UI
      options.viewport.on(options.viewport.ADD, this, function (layer) {
        layersUI.refresh();
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

          if (options.viewport.WorldFit) {
            world.scaleViewportToFit(options.viewport);
          }
        },
        onYChange: function(event) { 
          gb.viewports.get(options.viewport.name).Height = event.target.value; 

          if (options.viewport.WorldFit) {
            world.scaleViewportToFit(options.viewport);
          }
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

          if (options.viewport.WorldFit) {
            world.scaleViewportToFit(options.viewport);
          }
        },
        onYChange: function(event) { 
          gb.viewports.get(options.viewport.name).ScaleY = event.target.value; 

          if (options.viewport.WorldFit) {
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
      container.appendChild(layersUI.html);  

      var additionalOptions = wrapper.wrap([sizeUI.html, offsetUI.html, scaleUI.html, strokeColorUI.html, strokeSizeUI.html], {
        id: 'viewport-options-' + options.viewport.name,
        className: 'viewport-options'
      });

      container.appendChild(additionalOptions);
      $(additionalOptions).hide();

      if (options.viewport.WorldFit) {
        scaleUI.disable();
      }

      return wrapper.wrap(container);
    }
  });

  return ViewportEditor;
});

