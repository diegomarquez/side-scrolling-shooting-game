define(function(require) {
  var editorConfig = require('editor-config');

  var wrapper = require('wrap-in-div');
  var gb = require('gb');
  var world = require('world');

  var checkboxSet = require('checkbox-set');
  var editableDropdown = require('editable-dropdown-add-remove');
  var dialogUI = require('dialog');

  var setupViewport = require('setup-viewport');

  var ViewportEditor = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var container = document.createElement('div');
      container.id = 'viewport-control';
      container.className = 'viewport-control'
      
      $(container).attr('viewport-name', options.viewport.name);

      // Button set with main options
      var checkboxSetUI = new checkboxSet().create({
        id: 'viewport-checkboxes-' + options.viewport.name,
        containerClass: 'viewport-checkboxes',
        checkboxes: getOptions(options.viewport, container)
      });

      // Layer creator Dialog
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
        defaultMessage: 'Arrange Layers',
        data: function() {
          return editorConfig.getViewportLayers(options.viewport);
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

      container.appendChild(checkboxSetUI);
      container.appendChild(layersUI.html);  

      return wrapper.wrap(container);
    }
  });

  var getOptions = function(viewport) {
    var buttons;

    if (viewport.name == editorConfig.getMainViewportName()) {
      // Options available on Main viewport
      buttons = [
        getVisibilityButton
      ]
    } else {
      // Options available on additional viewports
      buttons = [
        getEditButton,
        getOutlineButton,
        getFitToWorldButton,
        getVisibilityButton,
        getRemoveButton
      ]
    }

    var args = arguments;

    return $.map(buttons, function(f) {
      return f.apply(null, args);
    });
  }

  var getEditButton = function(viewport, container) { 
    // Layer creator Dialog
    var editViewportDialogUI = new dialogUI().create({
      id: 'edit-viewport-dialog',
      title: 'Edit viewport ' + viewport.name,
      tip: '',
      autoOpen: false,
      minHeight: 'auto',
      minWidth: 'auto',
      modal: true,
      resetOnClose: true,
      
      fields: [
        { 
          name: 'Width', 
          value: gb.canvas.width,
          validations: [
            {
              check: function(width) { return width > 0; },
              tip: "Width must be greater than 0"
            }
          ]
        },
        { 
          name: 'Height', 
          value: gb.canvas.height,
          validations: [
            {
              check: function(height) { return height > 0; },
              tip: "Height must be greater than 0"
            },
          ]
        },
        { 
          name: 'Offset X', 
          value: viewport.OffsetX
        },
        { 
          name: 'Offset Y', 
          value: viewport.OffsetY
        },
        { 
          name: 'Scale X', 
          value: viewport.ScaleX,
          validations: [
            {
              check: function(scale) { return scale > 0; },
              tip: "Scale X must be greater to 0"
            }
          ]
        },
        { 
          name: 'Scale Y', 
          value: viewport.ScaleY,
          validations: [
            {
              check: function(scale) { return scale > 0; },
              tip: "Scale Y must be greater to 0"
            }
          ]
        },
        { 
          name: 'Stroke Color', 
          value: viewport.getStroke().color
        },
        { 
          name: 'Stroke Width', 
          value: viewport.getStroke().width
        }
      ],

      buttons: {
        Save: function () {
          viewport.Width = this.Width();
          viewport.Height = this.Height();
          viewport.OffsetX = this.OffsetX();
          viewport.OffsetY = this.OffsetY();
          viewport.ScaleX = this.ScaleX();
          viewport.ScaleY = this.ScaleY();
          viewport.setStroke(this.StrokeWidth(), this.StrokeColor());

          if(viewport.WorldFit) {
            world.scaleViewportToFit(options.viewport);
          }

          $(this).dialog('close');
        }
      },

      validateOnAction: {
        'Save': ['Width', 'Height', 'Scale X', 'Scale Y'] 
      }
    });

    return {
      label: 'Edit',
      onChange: function (event) {
        editViewportDialogUI.dialog('open');

        if (viewport.WorldFit) {
          editViewportDialogUI.dialog('option', 'disableField')('ScaleX');
          editViewportDialogUI.dialog('option', 'disableField')('ScaleY');
        } else {
          editViewportDialogUI.dialog('option', 'enableField')('ScaleX');
          editViewportDialogUI.dialog('option', 'enableField')('ScaleY');
        }
        
        editViewportDialogUI.dialog('option', 'setField')('ScaleX', viewport.ScaleX);
        editViewportDialogUI.dialog('option', 'setField')('ScaleY', viewport.ScaleY);
      }
    }
  }

  var getOutlineButton = function(viewport, container) {
    return {
      label: editorConfig.getOutlineLayerName(),
      onChange: function (event) {
        if (event.target.checked) {
          setupViewport.addOutline(viewport.name);
        }
        else { 
          setupViewport.removeOutline(viewport.name);
        }
      }
    }
  }

  var getFitToWorldButton = function(viewport, container) { 
    return {
      label: 'Fit World',
      state: viewport.WorldFit,
      onChange: function (event) {
        if (event.target.checked) {
          world.scaleViewportToFit(viewport);
        } 
        else {
          world.resetViewportScale(viewport);
        }
      }
    }
  }

  var getVisibilityButton = function(viewport, container) {
    return {
      onLabel: 'Show',
      offLabel: 'Hide',
      onChange: function (event) {
        if (event.target.checked) {
          viewport.hide()
        } else {
          viewport.show()
        }
      }
    }
  }

  var getRemoveButton = function (viewport, container) {
    return {
      label: 'Remove',
      disable: (viewport.name == editorConfig.getMainViewportName()),
      onChange: function (event) {
        gb.viewports.remove(viewport.name);
      }
    }
  }
  
  return ViewportEditor;
});

