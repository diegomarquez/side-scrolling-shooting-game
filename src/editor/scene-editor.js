define(function(require) {

  var gb = require('gb');
  var sceneSerializer = require('scene-serializer');
  var sceneLoader = require('scene-loader');
  var setupEditorObject = require('setup-editor-object');

  var selectedValues = {
    selectedGameObject: null,
    selectedGroup: null,
    selectedViewport: null,
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
        defaultMessage: 'Set a Level Name',
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

      container.appendChild(setupDropdown({
        id: 'viewport-selector',
        defaultMessage: 'Choose a Viewport',
        data: gb.getViewportShortCuts(),
        property: 'selectedViewport'
      }));

      container.appendChild(setupButton({
        id: 'game-object-create-button',
        defaultMessage: 'Create',
        onClick: function(event) {
            setupEditorObject.setupWithViewport(selectedValues.selectedGameObject, 
                                                selectedValues.selectedGroup, 
                                                selectedValues.selectedViewport, 
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
    var hr = document.createElement('hr');  
    hr.style.width = '50%';
  
    return wrapInDiv(hr);
  }

  var setupFileLoaderButton = function(options) {
    var button = document.createElement('input');

    button.id = options.id;
    button.type = 'file';
    button.innerHTML = options.defaultMessage;
    button.style.width = '100%';
    button.style.border = 1;

    button.onchange = options.onClick;

    return wrapInDiv(button);
  }

  var setupButton = function(options) {
    var button = document.createElement('button');

    button.id = options.id;
    button.type = 'button';
    button.innerHTML = options.defaultMessage;
    button.style.width = '100%';
    
    button.onclick = options.onClick;

    return wrapInDiv(button);
  }

  var setupTextbox = function(options) {
    var input = document.createElement('input');

    input.id = options.id;
    input.type = 'text';
    input.placeholder = options.defaultMessage;
    input.style.width = '100%';

    input.onchange = options.onChange;

    return wrapInDiv(input);
  }

  var setupDropdown = function(options) {
    var dropdown = document.createElement('select');

    dropdown.id = options.id;
    dropdown.style.width = '100%';

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

  return new SceneEditor();
});
