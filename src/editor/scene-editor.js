define(function(require) {

  var gb = require('gb');
  var sceneSerializer = require('scene-serializer');
  var sceneLoader = require('scene-loader');
  var setupEditorObject = require('setup-editor-object');
  var activeViewports = require('active-viewports');

  var selectedValues = {
    selectedGameObject: null,
    selectedGroup: null,
    sceneName: null
  }

  var mainViewport = null

  var SceneEditor = require("class").extend({
    init: function() {
  
    },

    create: function(main) {
      mainViewport = main;

      var container = document.createElement('div');
      container.id = "editor-container";

      container.appendChild(setupTextbox({
        id: 'scene-name',
        defaultMessage: 'Set a Scene Name',
        onChange: function() {
          selectedValues['sceneName'] = this.value;
        }
      }));

      container.appendChild(setupHorizontalLine());

      container.appendChild(setupDropdown({
        id: 'game-object-selector',
        defaultMessage: 'Choose a Game Object',
        data: gb.goPool.getConfigurationTypes(),
        property: 'selectedGameObject'
      }));

      container.appendChild(setupDropdown({
        id: 'group-selector',
        defaultMessage: 'Choose an Update Group',
        data: gb.groups.allGroupNames(),
        property: 'selectedGroup'
      }));

      var allViewports = gb.viewports.allAsArray();

      var viewportsContainer = document.createElement('div');
      viewportsContainer.id = 'viewports-container';

      for (var i = 0; i < allViewports.length; i++) {
        var viewport = allViewports[i];

        viewportsContainer.appendChild(setupViewportSelector({
          id: 'viewport-selector-' + viewport.name,
          name: viewport.name,
          viewport: viewport, 
          defaultMessage: 'Choose a Layer',
          data: viewport.layers.map(function(layer) { return layer.name; })
        }));

        container.appendChild(viewportsContainer);
      }

      container.appendChild(setupViewportCreateButton({
        id: 'viewport-creation',
        defaultMessage: 'Add Viewport'
      }));

      container.appendChild(setupHorizontalLine());


      container.appendChild(setupButton({
        id: 'game-object-create-button',
        defaultMessage: 'Create Game Object',
        onClick: function(event) {
          setupEditorObject.setupWithViewport(selectedValues.selectedGameObject, 
                                              selectedValues.selectedGroup, 
                                              activeViewports.get(), 
                                              gb.viewports.get(mainViewport));
        }
      }));

      container.appendChild(setupHorizontalLine());      
      
      container.appendChild(setupButton({
        id: 'level-save-button',
        defaultMessage: 'Save',
        onClick: function(event) {
          if (selectedValues['sceneName']) {
            // Set the level name before ssending everything to the server 
            sceneSerializer.setSceneName(selectedValues['sceneName']);
            // Serialize all the currently active objects in the editor
            var data = sceneSerializer.serialize();

            // Post the result to the server so the file can be saved localy
            var request = new XMLHttpRequest();
            request.open("POST", "http://localhost:3000", true);
            request.send(data);
          } else {
            console.error("Missing level name field");
          }
        }
      }));

      container.appendChild(setupFileLoaderButton({
        id: 'level-load-button',
        defaultMessage: 'Load',
        onClick: function(event) {
          var file = event.target.files[0];

          var reader = new FileReader();

          reader.onload = function(f) {
            var data = JSON.parse(this.result);

            selectedValues['sceneName'] = data.name;
            document.getElementById('scene-name').value = data.name;
            
            sceneLoader.load(data);
          };

          reader.readAsText(file);
        }
      }));

      document.getElementById('main').appendChild(container);
    }
  });

  var wrapInDiv = function(child) {
    var container = document.createElement('div')
    container.appendChild(child);
    return container;
  }

  var setupHorizontalLine = function(options) {
    return document.createElement('hr');
  }

  var setupFileLoaderButton = function(options) {
    var button = document.createElement('input');

    button.id = options.id;
    button.type = 'file';
    button.innerHTML = options.defaultMessage;
    
    button.onchange = options.onClick;

    return wrapInDiv(button);
  }

  var setupButton = function(options) {
    var button = document.createElement('button');

    button.id = options.id;
    button.type = 'button';
    button.innerHTML = options.defaultMessage;
    
    button.onclick = options.onClick;

    return wrapInDiv(button);
  }

  var setupTextbox = function(options) {
    var input = document.createElement('input');

    input.id = options.id;
    input.type = 'text';
    input.placeholder = options.defaultMessage;

    input.onchange = options.onChange;

    return wrapInDiv(input);
  }

  var setupDropdown = function(options) {
    var dropdown = document.createElement('select');

    dropdown.id = options.id;

    var data = gb.goPool.getConfigurationTypes();

    dropdown.add(createOption(options.defaultMessage, 'Nothing'));

    for(var i=0; i<options.data.length; i++) {
      dropdown.add(createOption(options.data[i], options.data[i]));
    }

    dropdown.onchange = function(event) {
      var value = event.target.selectedOptions[0].value;

      if (value != 'Nothing') {
        selectedValues[options.property] = value;
      }
    }

    return wrapInDiv(dropdown);
  }

  var createOption = function(name, value) {
    var option = document.createElement("option");

    option.text = name;
    option.value = value;

    return option;
  }

  var setupViewportSelector = function(options) {
    var container = document.createElement('div');

    container.id = 'viewportCheckbox';

    var input = document.createElement('input');

    input.id = options.id;
    input.type  = 'checkbox';
    input.name  = options.name;
    input.value = options.name;

    var label = document.createElement('label');
    
    label.setAttribute('for', input.id);
    label.innerHTML = options.name;

    var button = document.createElement('button');
    button.innerHTML = 'Remove'
    button.type  = 'button';

    button.onclick = function(event) {
      var viewportGos = gb.viewports.remove(options.name);

      for (var i = 0; i < viewportGos.length; i++) {
        var go = viewportGos[i];

        if (!go.hasViewport()) {
          gb.reclaimer.claim(go);
        }
      }
      
      var viewportsContainer = document.querySelector('#viewports-container');
      viewportsContainer.removeChild(container.parentNode);
    };

    var sizeContainer = document.createElement('div');
    sizeContainer.id = 'size-container';
    sizeContainer.className += 'viewport-editor-container';

    var sizeLabel = document.createElement('div');
    sizeLabel.innerHTML = 'Size';
    sizeLabel.className += 'viewport-editor-label';

    var sizeX = document.createElement('input');
    sizeX.type  = 'text';
    sizeX.className += 'viewport-editor-input';
    sizeX.value = options.viewport.Width;

    sizeX.onchange = function(event) {
      gb.viewports.get(options.name).Width = event.target.value;
    }

    var sizeY = document.createElement('input');
    sizeY.type  = 'text';
    sizeY.className += 'viewport-editor-input';
    sizeY.value = options.viewport.Height;

    sizeY.onchange = function(event) {
      gb.viewports.get(options.name).Height = event.target.value;
    }

    sizeContainer.appendChild(sizeLabel);
    sizeContainer.appendChild(sizeX);
    sizeContainer.appendChild(sizeY);

    /**
     * --------------------------------
     */

    var offsetContainer = document.createElement('div');
    offsetContainer.id = 'offset-container';
    offsetContainer.className += 'viewport-editor-container';

    var offsetLabel = document.createElement('div');
    offsetLabel.innerHTML = 'Offset';
    offsetLabel.className += 'viewport-editor-label';

    var offsteX = document.createElement('input');
    offsteX.type  = 'text';
    offsteX.className += 'viewport-editor-input';
    offsteX.value = options.viewport.OffsetX;

    offsteX.onchange = function(event) {
      gb.viewports.get(options.name).OffsetX = event.target.value;
    }

    var offsteY = document.createElement('input');
    offsteY.type  = 'text'; 
    offsteY.className += 'viewport-editor-input';
    offsteY.value = options.viewport.OffsetY;

    offsteY.onchange = function(event) {
      gb.viewports.get(options.name).OffsetY = event.target.value;
    }

    offsetContainer.appendChild(offsetLabel);
    offsetContainer.appendChild(offsteX);
    offsetContainer.appendChild(offsteY);

    /**
     * --------------------------------
     */
    
    var scaleContainer = document.createElement('div');
    scaleContainer.id = 'scale-container';
    scaleContainer.className += 'viewport-editor-container';

    var scaleLabel = document.createElement('div');
    scaleLabel.innerHTML = 'Scale';
    scaleLabel.className += 'viewport-editor-label';

    var scaleX = document.createElement('input');
    scaleX.type  = 'text';
    scaleX.className += 'viewport-editor-input';
    scaleX.value = options.viewport.ScaleX;

    scaleX.onchange = function(event) {
      gb.viewports.get(options.name).ScaleX = event.target.value;
    }

    var scaleY = document.createElement('input');
    scaleY.type  = 'text'; 
    scaleY.className += 'viewport-editor-input';
    scaleY.value = options.viewport.ScaleY;

    scaleY.onchange = function(event) {
      gb.viewports.get(options.name).ScaleY = event.target.value;
    }

    scaleContainer.appendChild(scaleLabel);
    scaleContainer.appendChild(scaleX);
    scaleContainer.appendChild(scaleY);

    /**
     * --------------------------------
     */

    var stroke = options.viewport.getStroke();

    var strokeColorContainer = document.createElement('div');
    strokeColorContainer.id = 'stroke-color-container';
    strokeColorContainer.className += 'viewport-editor-container';

    var strokeColorLabel = document.createElement('div');
    strokeColorLabel.innerHTML = 'Stroke Color';
    strokeColorLabel.className += 'viewport-editor-label';

    var strokeColor = document.createElement('input');
    strokeColor.type  = 'text';
    strokeColor.className += 'viewport-editor-input';
    strokeColor.value = stroke.color;

    strokeColor.onchange = function(event) {
      gb.viewports.get(options.name).setStroke(null, event.target.value);
    }

    strokeColorContainer.appendChild(strokeColorLabel);
    strokeColorContainer.appendChild(strokeColor);

    /**
     * --------------------------------
     */

    var strokeSizeContainer = document.createElement('div');
    strokeSizeContainer.id = 'stroke-size-container';
    strokeSizeContainer.className += 'viewport-editor-container';

    var strokeSizeLabel = document.createElement('div');
    strokeSizeLabel.className += 'viewport-editor-label';
    strokeSizeLabel.innerHTML = 'Stroke Size';

    var strokeSize = document.createElement('input');
    strokeSize.type  = 'text';
    strokeSize.className += 'viewport-editor-input';
    strokeSize.value = stroke.width;

    strokeSize.onchange = function(event) {
      gb.viewports.get(options.name).setStroke(event.target.value, null);
    }

    strokeSizeContainer.appendChild(strokeSizeLabel);
    strokeSizeContainer.appendChild(strokeSize);

    /**
     * --------------------------------
     */

    container.appendChild(input);
    container.appendChild(label);
    container.appendChild(button);

    var dropdown = setupLayerDropdown({
      id: 'layers-' + options.id,
      defaultMessage: options.defaultMessage,
      data: options.data,
      property: 'selectedLayer'      
    });

    container.appendChild(dropdown);
    container.appendChild(sizeContainer);
    container.appendChild(offsetContainer);
    container.appendChild(scaleContainer);
    container.appendChild(strokeColorContainer);
    container.appendChild(strokeSizeContainer);

    return wrapInDiv(container); 
  }

  var setupLayerDropdown = function(options) {
    var dropdown = document.createElement('select');

    dropdown.id = options.id;

    var data = gb.goPool.getConfigurationTypes();

    dropdown.add(createOption(options.defaultMessage, 'Nothing'));

    for(var i = 0; i < options.data.length; i++) {
      dropdown.add(createOption(options.data[i], options.data[i]));
    }

    return wrapInDiv(dropdown);
  }

  var setupViewportCreateButton = function(options) {
    var container = document.createElement('div');
    container.id = options.id;

    var button = document.createElement('button');
    button.type  = 'button';
    button.innerHTML = options.defaultMessage;

    var text = document.createElement('input');
    text.type  = 'text';
    text.placeholder = 'Set a viewport name';

    container.appendChild(text);
    container.appendChild(button);

    button.onclick = function(event) {
      if (text.value) {
        if (!gb.viewports.exists(text.value)) {
          var viewport = gb.viewports.add(text.value, gb.canvas.width, gb.canvas.height, 0, 0);  

          var viewportsContainer = document.getElementById('viewports-container');

          viewportsContainer.appendChild(setupViewportSelector({
            id: 'viewport-selector-' + viewport.name,
            name: viewport.name,
            viewport: viewport,
            defaultMessage: 'Choose a Layer',
            data: viewport.layers.map(function(layer) { return layer.name; })
          }));
        }
      }
    }

    return wrapInDiv(container);
  }

  return new SceneEditor();
});
