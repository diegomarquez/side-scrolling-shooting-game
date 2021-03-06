define(function(require) {
  var wrapper = require('wrap-in-div');
  var gb = require('gb');
  var editorDelegates = require('editor-delegates');  

  var dropdownUI = require('editable-dropdown-add-remove');
  var dialogUI = require('dialog');
  
  var GroupSelector = require('ui-component').extend({
    init: function() {
      this.addGroupDialogUI = null;
      this.groupsUI = null;
    },

    create: function() {
      this.addGroupDialogUI = new dialogUI().create({
        id: 'add-group-dialog',
        title: 'Add a new update group',
        tip: 'Use a unique name',
        autoOpen: false,
        minHeight: 'auto',
        minWidth: 'auto',
        modal: true,
        
        fields: [
          { 
            name: 'Group Name', 
            value: '',
            validations: [
              {
                check: function(groupName) { return groupName != ''; },
                tip: "Group name can't be empty"
              },
              {
                check: function(groupName) { return !gb.groups.exists(groupName); },
                tip: 'This group Id is already in use'
              }
            ]
          }
        ],

        buttons: {
          Add: function () {            
            gb.groups.add(this.GroupName());
            $(this).dialog('close');
          }
        },

        validateOnAction: {
          'Add': ['Group Name'] 
        }
      });

      this.groupsUI = new dropdownUI().create({
        id: 'group-selector',
        defaultMessage: 'Select a Group',
        selectedMessage: 'Selected Group:',
        
        data: function() {
          return gb.groups.allGroupNames();
        },
        onAdd: function() {
          $(addGroupDialogUI).dialog('open');
        },
        onEdit: function(groupName, newIndex) {
          gb.groups.change(groupName, newIndex);
        },
        onRemove: function(groupName) {
          gb.groups.remove(groupName);
        }
      });

      // When a group is added, refresh the content of the UI
      editorDelegates.add(gb.groups, gb.groups.ADD, this, function (group) {
        groupsUI.refresh();
      });

      return wrapper.wrap(groupsUI.html);
    }
  });

  return GroupSelector;
});
