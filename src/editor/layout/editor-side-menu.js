define(function(require) {
  var wrapper = require('wrap-in-div');

  var sceneSaveDialog = require('scene-save-ui');
  var sceneLoadDialog = require('scene-load-ui');
  var sceneDeleteDialog = require('scene-delete-ui');

  var editorRegions = require('editor-regions');

  var EditorSideMenu = require('class').extend({
    init: function() {
      this.saveDialog = new sceneSaveDialog();
      this.loadDialog = new sceneLoadDialog();
      this.deleteDialog = new sceneDeleteDialog();
    },

    create: function() {
      var ul = document.createElement('ul');
      ul.id = 'editor-side-menu';

      $(ul).addClass('nav nav-list');

      var items = [];

      items.push(createTitleItem('Untitled', 'side-menu-scene-title'));

      items.push(createDivider());

      items.push(createTitleItem('Sections'));
      
      items.push(createRegionOptionItem('Canvas', 'icon-question-sign', 'View the created objects in the canvas. They can be dragged and right clicking will display a context menu on them. Use the scrollbars to view more of the game world if it doesn\'t fit in the canvas.' ,function (event) {
        editorRegions.get().getTopLeftContainer().effect("highlight", {color: '#FFD180'}, 500);
      }));
      
      items.push(createRegionOptionItem('Settings', 'icon-question-sign', 'Global settings. These options affect the whole scene.', function (event) {
        editorRegions.get().getTopRightContainer().effect("highlight", {color: '#FFD180'}, 500);
      }));
      
      items.push(createRegionOptionItem('Game Objects', 'icon-question-sign', 'Use this section to create predifined objects. After selecting an object type and the viewports it should be displayed in click the "Create Game Object" button to add it to the scene.', function (event) {
        editorRegions.get().getBottomLeftContainer().effect("highlight", {color: '#FFD180'}, 500);
      }));
      
      items.push(createRegionOptionItem('Viewports', 'icon-question-sign', 'Add new viewports, edit and sort them in this section. Sorting is done by dragging and dropping.', function (event) {
        editorRegions.get().getBottomRightContainer().effect("highlight", {color: '#FFD180'}, 500);
      }));

      items.push(createDivider());

      items.push(createTitleItem('Storage'));
      items.push(createOptionItem(
        'Save', 
        'icon-folder-close', 
        function() { this.open() }.bind(this.saveDialog)
      ));

      items.push(createOptionItem(
        'Open', 
        'icon-folder-open', 
        function() { this.open() }.bind(this.loadDialog)
      ));
      
      items.push(createOptionItem(
        'Delete', 
        'icon-trash', 
        function() { this.open() }.bind(this.deleteDialog)
      ));

      $(items).each(function(index, element) {
        this.tabIndex = index;
      })

      $(ul).append($(items));

      return {
         html: wrapper.wrap(ul, { id: 'editor-side-menu-wrapper' })
      }
    }
  });

  var createTitleItem = function(content, className) {
    var li = createItem(content);
  
    $(li).addClass('nav-header');

    if (className) {
      $(li).addClass(className);
    } else {
      $(li).addClass('side-menu-title');
    }

    return li; 
  }

  var createOptionItem = function(content, iconName, onClick) {
    var li = document.createElement('li'); 
    var a = document.createElement('a');

    a.href = '#'
    a.innerHTML = content;

    $(li).append(a);
    $(li).addClass('side-menu-item');
    
    $(li).on('click', onClick);
    
    var icon = document.createElement('i');
    $(icon).addClass('side-menu-icon');
    $(icon).addClass('icon-white');
    $(icon).addClass(iconName);
    $(a).append(icon);

    return li;
  }

  var createRegionOptionItem = function(content, iconName, description, onClick) {
    var li = createOptionItem(content, iconName, onClick);

    var a = $(li).find('.side-menu-icon');
    
    a.attr('data-toogle', 'tooltip');
    a.attr('data-placement', 'right');
    a.attr('title', description);

    $(li).on('mouseover', function() {  
      a.tooltip({
        container: 'body'
      });
      a.tooltip('show');
    });

    $(li).on('mouseout', function() {
      a.tooltip('destroy');
    });
    
    return li;
  }

  var createDivider = function() {
    var li = document.createElement('li');

    $(li).addClass('divider');

    return li;
  }

  var createItem = function(content) {
    var li = document.createElement('li');
    li.innerHTML = content;

    return li;
  }

  return EditorSideMenu;
});