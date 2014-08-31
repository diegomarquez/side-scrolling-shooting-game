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

      container.style.position = 'relative';

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

      container.appendChild(setupHorizontalLine());

      var allViewports = gb.viewports.allAsArray();

      for (var i = 0; i < allViewports.length; i++) {
        var viewport = allViewports[i];

        container.appendChild(setupViewportSelector({
          id: 'viewport-selector-' + viewport.name,
          name: viewport.name,
          defaultMessage: 'Choose a Layer',
          data: viewport.layers.map(function(layer) { return layer.name; }),
          property: 'selectedViewport'
        }));
      }

      container.appendChild(setupButton({
        id: 'game-object-create-button',
        defaultMessage: 'Create',
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
    return wrapInDiv(document.createElement('hr'));
  }

  var setupFileLoaderButton = function(options) {
    var button = document.createElement('input');

    button.id = options.id;
    button.type = 'file';
    button.innerHTML = options.defaultMessage;
    button.style.width = '50%';
    button.style.border = 1;

    button.onchange = options.onClick;

    return wrapInDiv(button);
  }

  var setupButton = function(options) {
    var button = document.createElement('button');

    button.id = options.id;
    button.type = 'button';
    button.innerHTML = options.defaultMessage;
    button.style.width = '50%';
    
    button.onclick = options.onClick;

    return wrapInDiv(button);
  }

  var setupTextbox = function(options) {
    var input = document.createElement('input');

    input.id = options.id;
    input.type = 'text';
    input.placeholder = options.defaultMessage;
    input.style.width = '50%';

    input.onchange = options.onChange;

    return wrapInDiv(input);
  }

  var setupDropdown = function(options) {
    var dropdown = document.createElement('select');

    dropdown.id = options.id;
    dropdown.style.width = '50%';

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

    container.appendChild(input);
    container.appendChild(label);

    var dropdown = setupLayerDropdown({
      id: 'layers-' + options.id,
      defaultMessage: options.defaultMessage,
      data: options.data,
      property: 'selectedLayer'      
    });

    container.appendChild(dropdown);

    return wrapInDiv(container); 
  }

  var setupLayerDropdown = function(options) {
    var dropdown = document.createElement('select');

    dropdown.id = options.id;
    dropdown.style.width = '100%';

    var data = gb.goPool.getConfigurationTypes();

    dropdown.add(createOption(options.defaultMessage, 'Nothing'));

    for(var i=0; i<options.data.length; i++) {
      dropdown.add(createOption(options.data[i], options.data[i]));
    }

    return wrapInDiv(dropdown);
  }

  return new SceneEditor();
});
