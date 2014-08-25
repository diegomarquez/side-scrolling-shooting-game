define(function(require) {

  var gb = require('gb');
  var gameObjectMouseInteraction = require('game-object-input-interaction');
  var levelSerializer = require('level-serializer');

  var selectedValues = {
    selectedGameObject: null,
    selectedGroup: null,
    selectedViewport: null,
    levelName: null
  }

  var mainViewport = null

  var GameObjectDropdown = require("class").extend({
    init: function() {
  
    },

    create: function(main) {
      mainViewport = main;

      var container = document.createElement('div');

      container.style.position = 'relative';

      container.appendChild(setupTextbox({
        id: 'level-name',
        defaultMessage: 'Set a Level Name',
        onChange: function() {
          selectedValues['levelName'] = this.value;
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
          var viewport = gb.viewports.get(mainViewport);
          
          if (selectedValues.selectedGameObject && selectedValues.selectedGroup && selectedValues.selectedViewport) {
            // Create an editor object and place it in the middle of the viewport
            var createdObject = createGameObject(selectedValues, viewport);
            // Setup events to be able to interact with it
            gameObjectMouseInteraction.setupInteraction(createdObject);
            // Add the recently created object to the serializer module
            levelSerializer.add(createdObject, selectedValues);
          }
        }
      }));

      container.appendChild(setupHorizontalLine());
      
      container.appendChild(setupButton({
        id: 'game-object-export-button',
        defaultMessage: 'Export',
        onClick: function(event) {
          if (selectedValues['levelName']) {
            // Set the level name before ssending everything to the server 
            levelSerializer.setLevelName(selectedValues['levelName']);
            // Serialize all the currently active objects in the editor
            var data = levelSerializer.serialize();

            // Post the result to the server so the file can be saved localy
            var request = new XMLHttpRequest();
            request.open("POST", "http://localhost:3000", true);
            request.send(data);
          } else {
            console.error("Missing level name field");
          }
        }
      }));

      document.getElementById('main').appendChild(container)
    }
  });

  var createGameObject = function(data, viewport) {
    var object = gb.add(data.selectedGameObject, data.selectedGroup, data.selectedViewport);

    object.x = -viewport.x + viewport.width/2;
    object.y = -viewport.y + viewport.height/2;

    object.update = function(delta) {}

    return object;
  }

  var wrapInDiv = function(child) {
    var container = document.createElement('div')

    container.appendChild(child);

    return container;
  }

  var setupHorizontalLine = function(data) {
    var hr = document.createElement('hr');  
    hr.style.width = '50%';
  
    return wrapInDiv(hr);
  }

  var setupButton = function(data) {
    var button = document.createElement('button');

    button.id = data.id;
    button.type = 'button';
    button.innerHTML = data.defaultMessage;
    button.style.width = '100%';
    
    button.onclick = data.onClick;

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

  return new GameObjectDropdown();
});
