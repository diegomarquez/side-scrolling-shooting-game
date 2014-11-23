define(function(require) {
  var wrapper = require('wrap-in-div');
  var gb = require('gb');
  var viewportEditorUI = require('viewport-editor-ui');
  var setupViewport = require('setup-viewport');
  var editorConfig = require('editor-config');
  var editorRegions = require('editor-regions');

  var ViewportSelector = require('ui-component').extend({
    init: function() {
      this.container = null;
      this.children = {};
    },

    create: function() {
      this.container = document.createElement('div');
      this.container.id = 'viewports-container';

      var wrapped = wrapper.wrap(this.container, {
        classNames: ['well', 'well-small'],
      });

      setupSortable(this.container);
      
      var allViewports = editorConfig.getViewports();

      for (var i = 0; i < allViewports.length; i++) {
        this.add(allViewports[i]);
      }

      return wrapped;
    },

    add: function(viewport) {
      setupViewport.setup(viewport.name);

      var viewportEditor = new viewportEditorUI().create({
        viewport: viewport
      })

      this.children[viewport.name] = viewportEditor;

      $(this.container).append($(viewportEditor.html));

      $(this.container).sortable('refresh');
    },

    remove: function(viewport) {
      $(this.children[viewport.name].html).remove();
      $(this.container).sortable('refresh');
      
      delete this.children[viewport.name];
    },

    destroy: function() {
      $(this.container).sortable('destroy');
    }
  });

  var setupSortable = function(element) {
    $(element).sortable({
      placeholder: 'ui-state-highlight',
      items: '> div',
      cursor: 'move', 
      delay: 15,

      start: function (event, ui) {
        ui.placeholder.width(ui.item.outerWidth());
        ui.placeholder.height(ui.item.outerHeight());
      },

      update: function (event, ui) {
        gb.viewports.change($(ui.item).find('.viewport-control').attr('viewport-name'), ui.item.index());
      }
    }).disableSelection();
  }

  return ViewportSelector;
});