define(function(require) {
  var EditableDropdownBasic = require('dropdown-base').extend({
    init: function() {

    },

    setupUI: function (container, contentContainer, options) {
      var oldIndex;
      var newIndex;

      contentContainer.find('ul').sortable({
        placeholder: 'ui-state-highlight',
        items: 'li:not(.ui-state-disabled)',
        cursor: 'move', 
        delay: 15,

        start: function (event, ui) {
          oldIndex = ui.item.index();
          ui.placeholder.height(ui.item.height());
        },

        update: function (event, ui) {
          if (options.onEdit) {
            newIndex = ui.item.index();
            options.onEdit(ui.item.attr('value'), newIndex, oldIndex);
          }
        }
      }).disableSelection();
    } 
  });

  return EditableDropdownBasic;
});

