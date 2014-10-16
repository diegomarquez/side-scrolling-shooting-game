define(function(require) {
  var EditableDropdownBase = require('dropdown-base').extend({
    init: function() {

    },

    setupUI: function(contentContainer, options) {
      contentContainer.selectable();
    }
  });

  return EditableDropdownBase;
});

