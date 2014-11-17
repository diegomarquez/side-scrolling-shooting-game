define(function(require) {
  var wrapper = require('wrap-in-div');

  var sceneSaveDialog = require('scene-save-ui');
  var sceneLoadDialog = require('scene-load-ui');
  var sceneDeleteDialog = require('scene-delete-ui');

  var listCreator = require('list');

  var editorRegions = require('editor-regions');

  var EditorSideMenu = require('class').extend({
    init: function() {
      this.saveDialog = new sceneSaveDialog();
      this.loadDialog = new sceneLoadDialog();
      this.deleteDialog = new sceneDeleteDialog();

      this.tooltipListCreator = new listCreator();

      this.canvasTooltipContent = this.tooltipListCreator.create({
        id: 'canvas-section-tooltip',
        items: [
          {
            type: 'item',
            content: 'View the created objects.'
          },
          {
            type: 'item',
            content: 'Drag them around the world.'
          },
          {
            type: 'item',
            content: 'Right click on them for more editing options.'
          },
          {
            type: 'item',
            content: 'Use the scrollbars to view all the world.'
          }
        ]
      });

      this.settingsTooltipContent = this.tooltipListCreator.create({
        id: 'settings-section-tooltip',
        items: [
          {
            type: 'item',
            content: 'Toggle the grid on and off.'
          },
          {
            type: 'item',
            content: 'Toggle snap to grid when dragging objects.'
          },
          {
            type: 'item',
            content: 'Change the size of the world.'
          }
        ]
      });

      this.gameObjectsTooltipContent = this.tooltipListCreator.create({
        id: 'game-objects-section-tooltip',
        items: [
          {
            type: 'item',
            content: 'Choose an object type to create.'
          },
          {
            type: 'item',
            content: 'Choose the viewports the object will appear in. Drag on the menu to select more than one viewport.'
          }
        ]
      });

      'Add new viewports, edit and sort them in this section. Sorting is done by dragging and dropping.'

      this.viewportsTooltipContent = this.tooltipListCreator.create({
        id: 'viewports-section-tooltip',
        items: [
          {
            type: 'item',
            content: 'Add new viewports.'
          },
          {
            type: 'item',
            content: 'Edit them after creation.'
          },
          {
            type: 'item',
            content: 'Sort them to change drawing order by draggin them in their container.'
          },
          {
            type: 'item',
            content: 'Add, remove and sort layers of each viewport.'
          }
        ]
      });
    },

    create: function() {
      var ul = document.createElement('ul');
      ul.id = 'editor-side-menu';

      $(ul).addClass('nav nav-list');

      var items = [];

      items.push(createTitleItem('Untitled', 'side-menu-scene-title'));

      items.push(createDivider());

      items.push(createTitleItem('Sections'));

      items.push(createRegionOptionItem('Canvas', 'glyphicon-question-sign', this.canvasTooltipContent.html.outerHTML ,function (event) {
        editorRegions.get().getTopLeftContainer().effect("highlight", {color: '#FFD180'}, 500);
      }));
      
      items.push(createRegionOptionItem('Misc. Settings', 'glyphicon-question-sign', this.settingsTooltipContent.html.outerHTML, function (event) {
        editorRegions.get().getTopRightContainer().effect("highlight", {color: '#FFD180'}, 500);
      }));
      
      items.push(createRegionOptionItem('Game Objects', 'glyphicon-question-sign', this.gameObjectsTooltipContent.html.outerHTML, function (event) {
        editorRegions.get().getBottomLeftContainer().effect("highlight", {color: '#FFD180'}, 500);
      }));
      
      items.push(createRegionOptionItem('Viewports', 'glyphicon-question-sign', this.viewportsTooltipContent.html.outerHTML, function (event) {
        editorRegions.get().getBottomRightContainer().effect("highlight", {color: '#FFD180'}, 500);
      }));

      items.push(createDivider());

      items.push(createTitleItem('Storage'));
      items.push(createOptionItem(
        'Save', 
        'glyphicon-floppy-save', 
        function() { this.open() }.bind(this.saveDialog)
      ));

      items.push(createOptionItem(
        'Open', 
        'glyphicon-floppy-open', 
        function() { this.open() }.bind(this.loadDialog)
      ));
      
      items.push(createOptionItem(
        'Delete', 
        'glyphicon-trash', 
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
   
    var icon = document.createElement('span');
    $(icon).addClass('side-menu-icon');
    $(icon).addClass('glyphicon icon-white');
    $(icon).addClass(iconName);
    $(a).append(icon);

    return li;
  }

  var createRegionOptionItem = function(title, iconName, description, onClick) {
    var li = createOptionItem(title, iconName, onClick);

    var a = $(li).find('.side-menu-icon');
    
    a.attr('data-toogle', 'popover');
    a.attr('data-placement', 'right');
    a.attr('data-html', true);
    a.attr('title', title);
    a.attr('data-content', description);

    $(li).on('mouseover', function() {  
      a.popover({
        container: 'body'
      }).on("show.bs.popover", function() {
        $(this).data("popover").tip().css({ maxWidth: "350px" });
      });

      a.popover('show');
    });

    $(li).on('mouseout', function() {
      a.popover('destroy');
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