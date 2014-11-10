define(function(require) {
  var wrapper = require('wrap-in-div');

  var EditorSideMenu = require('class').extend({
    init: function() {},

    create: function(editorRegions) {
      var ul = document.createElement('ul');
      ul.id = 'editor-side-menu';

      var items = [];

      items.push(createTitleItem('Scene Editor'));
      
      items.push(createRegionOptionItem('Canvas', 'icon-question-sign', 'View the created objects in the canvas. They can be dragged and right clicking will display a context menu on them. Use the scrollbars to view more of the game world if it doesn\'t fit in the canvas.' ,function (event) {
        editorRegions.getTopLeftContainer().effect("highlight", {color: '#FFD180'}, 500);
      }));
      
      items.push(createRegionOptionItem('Settings', 'icon-question-sign', 'Global settings. These options affect the whole scene.', function (event) {
        editorRegions.getTopRightContainer().effect("highlight", {color: '#FFD180'}, 500);
      }));
      
      items.push(createRegionOptionItem('Game Objects', 'icon-question-sign', 'Use this section to create predifined objects. After selecting an object type and the viewports it should be displayed in click the "Create Game Object" button to add it to the scene.', function (event) {
        editorRegions.getBottomLeftContainer().effect("highlight", {color: '#FFD180'}, 500);
      }));
      
      items.push(createRegionOptionItem('Viewports', 'icon-question-sign', 'Add new viewports, edit and sort them in this section. Sorting is done by dragging and dropping.', function (event) {
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

      $(ul).tooltip({
        items: ".side-menu-option",
        content: function() {
          return $(this).attr('region-description');
        },
        position: {
          my: "left+15 left",
          at: "right center"
        }
      });

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

  var createRegionOptionItem = function(content, iconName, description, onClick) {
    var li = createOptionItem(content, iconName);

    $(li).on('click', onClick);
    $(li).attr('region-description', description);

    return li;
  }

  var createItem = function(content) {
    var li = document.createElement('li');
    li.innerHTML = content;

    return li;
  }

  return EditorSideMenu;
});