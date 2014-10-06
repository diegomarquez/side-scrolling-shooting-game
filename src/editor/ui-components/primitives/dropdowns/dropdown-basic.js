define(function(require) {
  require('jquery');
  require('jquery-ui');

  var EditableDropdownBase = require('dropdown-base').extend({
    init: function() {

    },

    setupUI: function(contentContainer, options) {
      contentContainer.selectable();
    }
  });

  return EditableDropdownBase;
});

