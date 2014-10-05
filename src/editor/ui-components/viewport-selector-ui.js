define(function(require) {
  var wrapper = require('wrap-in-div');
  var gb = require('gb');
  var viewportEditorUI = require('viewport-editor-ui');
  var setupViewport = require('setup-viewport');

  var ViewportSelector = require('class').extend({
    init: function() {
      this.container = null;
      this.children = {};
    },

    create: function() {
      this.container = document.createElement('div');
      this.container.id = 'viewports-container';

      var allViewports = gb.viewports.allAsArray();

      setupSortable(this.container)

      for (var i = 0; i < allViewports.length; i++) {
        this.add(allViewports[i]);
      }

      return wrapper.wrap(this.container);
    },

    add: function(viewport) {
      setupViewport.setup(viewport.name);

      var viewportEditor = new viewportEditorUI().create({
        viewport: viewport
      })

      this.children[viewport.name] = viewportEditor;

      $(this.container).append($(viewportEditor));
      $(this.container).sortable('refresh');
    },

    remove: function(viewport) {
      $(this.children[viewport.name]).remove();
      $(this.container).sortable('refresh');
      
      delete this.children[viewport.name];
    }
  });

  var setupSortable = function(element) {
    var oldIndex, newIndex;

    $(element).sortable({
      placeholder: 'ui-state-highlight',
      items: '.viewport-control',
      cursor: 'move', 
      delay: 15,

      start: function (event, ui) {
        oldIndex = ui.item.index();
        ui.placeholder.height(ui.item.height());
      },

      update: function (event, ui) {
        newIndex = ui.item.index();
        gb.viewports.swap(newIndex, oldIndex);
      }
    }).disableSelection();
  }

  return ViewportSelector;
});