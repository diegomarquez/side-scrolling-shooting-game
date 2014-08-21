define(function(require) {

  var gb = require('gb');
  var gameObjectMouseInteraction = require('game-object-input-interaction');

  var selectedValues = {
    selectedGameObject: null,
    selectedGroup: null,
    selectedViewport: null
  }

  var mainViewport = null

  var GameObjectDropdown = require("class").extend({
    init: function() {
  
    },

    create: function(main) {
      mainViewport = main;

      var container = document.createElement('div');

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

      container.appendChild(setupCreateButton(document.createElement('button')));

      document.getElementById('main').appendChild(container)
    }
  });

  var setupCreateButton = function(button) {
    button.id = 'game-object-create-button';
    button.type = 'button';
    button.innerHTML = 'Create';

    button.style.float = 'right';

    var viewport = gb.viewports.get(mainViewport);

    button.onclick = function(event) {
      if (selectedValues.selectedGameObject && selectedValues.selectedGroup && selectedValues.selectedViewport) {
        // Create an editor object and place it in the middle of the viewport
        var createdObject = createGameObject(selectedValues, viewport);
        // Setup events to be able to interact with it
        gameObjectMouseInteraction.setupInteraction(createdObject);
      }
    };

    return button;
  }

  var createGameObject = function(data, viewport) {
    var object = gb.add(data.selectedGameObject, data.selectedGroup, data.selectedViewport);

    object.x = -viewport.x + viewport.width/2;
    object.y = -viewport.y + viewport.height/2;

    object.update = function(delta) {}

    return object;
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

    return dropdown;
  }

  var createOption = function(name, value) {
    var option = document.createElement("option");

    option.text = name;
    option.value = value;

    return option;
  }

  return new GameObjectDropdown();
});
