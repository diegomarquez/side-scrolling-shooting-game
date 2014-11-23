define(function(require) {
  var wrapper = require('wrap-in-div');
  var buttonUI = require('button');

  var EditableDropdownAddRemove = require('editable-dropdown-remove').extend({
    init: function() {

    },

    createMainUI: function(options, container, contentContainer, optionElements) {
      // Get the content inherited
      var parentContent = this._super(options, container, contentContainer, optionElements);

      // Crete the add button
      var addButton = new buttonUI().create({        
        label: 'Add',

        onClick: function(event) {
          if (options().onAdd) {
            options().onAdd();
          }
        }.bind(this)
      });

      // Initialize the add button with jQuery UI button()
      $(addButton).button().addClass('add-button');

      // Wrap everything in a div
      var container = wrapper.wrap([parentContent, addButton], {
        className: 'split-button'
      });

      // Initialize the container with jQuery UI buttonset() 
      $(container).buttonset();

      return container;
    },

    setMainUIController: function(mainUIHtml) {
      return this.getComponentController({
        destroy: function() { 
          $(mainUIHtml).find('.main-button').button('destroy');
          $(mainUIHtml).find('.add-button').button('destroy');
          $(mainUIHtml).find('.split-button').buttonset('destroy');
        }.bind(this)
      }, mainUIHtml);
    } 
  });

  return EditableDropdownAddRemove;
});

