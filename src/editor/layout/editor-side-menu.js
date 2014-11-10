define(function(require) {
  var wrapper = require('wrap-in-div');

  var EditorSideMenu = require('class').extend({
    init: function() {},

    create: function(editorRegions) {
      var ul = document.createElement('ul');
      ul.id = 'editor-side-menu';

      var items = [];

      items.push(createTitleItem('Scene Editor'));
      
      items.push(createRegionOptionItem('Canvas', 'icon-question-sign', function (event) {
        editorRegions.getTopLeftContainer().effect("highlight", {color: '#FFD180'}, 500);
      }));
      
      items.push(createRegionOptionItem('Settings', 'icon-question-sign', function (event) {
        editorRegions.getTopRightContainer().effect("highlight", {color: '#FFD180'}, 500);
      }));
      
      items.push(createRegionOptionItem('Game Objects', 'icon-question-sign', function (event) {
        editorRegions.getBottomLeftContainer().effect("highlight", {color: '#FFD180'}, 500);
      }));
      
      items.push(createRegionOptionItem('Viewports', 'icon-question-sign', function (event) {
        editorRegions.getBottomRightContainer().effect("highlight", {color: '#FFD180'}, 500);
      }));

      items.push(createTitleItem('Storage'));
      items.push(createOptionItem('Save', 'icon-folder-close'));
      items.push(createOptionItem('Open', 'icon-folder-open'));
      items.push(createOptionItem('Delete', 'icon-trash'));
      items.push(createOptionItem('Upload', 'icon-upload'));
 
      $(items).each(function(index, element) {
        this.tabIndex = index;
      })

      $(ul).append($(items));

      return {
         html: wrapper.wrap(ul, { id: 'editor-side-menu-wrapper' })
      }
    }
  });

  var createTitleItem = function(content) {
    var li = createItem(content);
    
    $(li).addClass('side-menu-title');

    return li; 
  }

  var createOptionItem = function(content, iconName) {
    var li = createItem(content);
    
    $(li).addClass('side-menu-option');

    var icon = document.createElement('i');
    $(icon).addClass('side-menu-icon');
    $(icon).addClass('icon-white');
    $(icon).addClass(iconName);

    $(li).append(icon);

    return li;
  }

  var createRegionOptionItem = function(content, iconName, onClick) {
    var li = createOptionItem(content, iconName);

    $(li).on('click', onClick);

    return li;
  }

  var createItem = function(content) {
    var li = document.createElement('li');
    li.innerHTML = content;

    return li;
  }

  return EditorSideMenu;
});