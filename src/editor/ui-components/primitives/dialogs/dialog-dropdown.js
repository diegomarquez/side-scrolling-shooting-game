define(function(require) {
  var DialogDropDown = require('class').extend({
    init: function() {

    },

    create: function(options) {
      var container = document.createElement('div');
      container.id = options.id;
      $(container).addClass('dialog');      

      var form = document.createElement('form');
      var fieldset = document.createElement('fieldset');
    
      $(container).append(form);
      $(form).append(fieldset);

      var label = document.createElement('label');
      label.innerHTML = 'Select a Scene';
      $(label).attr('for', options.id + '-label');

      var select = document.createElement('select');
      $(select).attr('id', options.id + '-label');
      $(select).attr('name', options.id + '-label');

      $(fieldset).append(label);
      $(fieldset).append(select);

      $.each(options.buttons, function(action, buttonCallback) {
        options.buttons[action] = function(f, action) {
          return function () {
            f.call(dialog);
          }
        }.call(this, buttonCallback, action);
      });

      options.create = function (event, ui) {
        $(this).css("minWidth", options.minWidth);
      }

      options.open = function() { 
        $(select).empty().prop( "disabled", (options.data().length == 0)).selectBoxIt({
          populate: options.data()
        })
        .bind( 'open', function() { 
          $(this).parents().each( function() { 
            if( $(this).hasClass('ui-accordion-content') || $(this).hasClass('ui-dialog-content') || $(this).hasClass('ui-dialog') ) {
              $(this).css( 'overflow', 'visible' )
            }
          });
        }) 
        .bind( 'close', function() { 
          $(this).parents().each( function() { 
            if( $(this).hasClass('ui-accordion-content') || $(this).hasClass('ui-dialog-content') || $(this).hasClass('ui-dialog')) {
              $(this).css( 'overflow', 'hidden' );
            } 
          });
        });
      }

      options.resizeStop = function (event, ui) {
        $(dialog).dialog("option", "position", { my: "center", at: "center", of: window });
      }

      options.clear = function () {
        if (options.data().length == 0) {
          $(select)[0].value = "";
        }
      }

      // Create the jQuery ui dialog
      var dialog = $.extend($(container).dialog(options), {
        'SelectedOption': function () {
          return $(select)[0].value;
        } 
      });

      // Prevent form submition
      $(dialog).submit( function(e) {
        e.preventDefault();
      });

      return dialog;
    }
  });

  return DialogDropDown;
});