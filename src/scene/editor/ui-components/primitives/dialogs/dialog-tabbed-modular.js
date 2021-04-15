define(function(require) {

	var statusMessage = require('create-status-message');
	var util = require("util");

	var Dialog = require('ui-component').extend({
		init: function() {

		},

		create: function(options) {
			var container = document.createElement('div');
			container.id = options.id;
			$(container).addClass('dialog');

			var tip = statusMessage.createInfoMessage(options.tip);
			tip.appendTo(container);

			var tabContainer = document.createElement('div');
			var tabList = document.createElement('ul');

			$(tabContainer).css({
				'padding-top': '5px',
				'min-height': '220px',
			});

			$(tabContainer).append(tabList);
			$(container).append(tabContainer);

			var fieldObjects = {};

			options.tabs = $(options.tabs).filter(function(index, tab) {
				return !!tab;
			});

			$.each(options.tabs, function(index, tab) {
				var tabItem = document.createElement('li');
				var tabAnchor = document.createElement('a');
				var tabContent = document.createElement('div');
				
				tabAnchor.setAttribute('href', '#' + options.id + '-tab-' + index);
				tabAnchor.innerHTML = tab.name;

				tabContent.setAttribute('id', options.id + '-tab-' + index);

				$(tabItem).append(tabAnchor);
				$(tabList).append(tabItem);
				$(tabContainer).append(tabContent);

				var form = document.createElement('form');
				var fieldset = document.createElement('fieldset');

				$(tabContent).append(form);
				$(form).append(fieldset);

				$(form).css({
					'padding': '2px'
				});

				var fields = tab.fields;

				fieldObjects[tab.name] = {};

				$.each(fields, function(index, field) {
					// Create the HTML corresponding for each field
					field.create();
					
					$(field.html()).css({
						'margin-bottom': '5px'
					});

					fieldObjects[tab.name][toMethodName(field.name())] = field;

					// Append the HTML fragment created by the field object it to the fieldset property of the dialog
					$(fieldset).append(field.html());
				});

				var buttons = tab.buttons;
				var validateActions = tab.validateOnAction;

				$.each(buttons, function(action, buttonCallback) {
					
					buttons[action] = function(f, action, validateActions, fields) {
						return function () {
							// Remove any feedback styling
							resetFeedback(tip, fields, options);

							// Validate the fields corresponding to this action
							result = validate.call(dialog, tip, validateActions[action], fields);

							if (result === true) {
								// Change the context of the dialog buttons callback so they point to this dialog instance
								f.call(dialog);
							}
						}
					}.call(this, buttonCallback, action, validateActions, fields);
				});
			});

			options.close = function() {
				var title = $(arguments[0].currentTarget).attr('title');

				$.each(options.tabs, function(index, tab) {
					resetFeedback(tip, tab.fields, options);

					$.each(tab.fields, function(index, field) {
						if (options.resetOnClose) {
							if (title == 'Close') {
								field.reset();
							}
						} else {
							field.reset();
						}
					});
				});
			}
			
			options.open = function() {
				$.each($(tabs).find(".ui-tabs-panel"), function(index, tb) {
					var tab = options.tabs[index];
					
					$.each(tab.fields, function(index, field) {
						if (field.setTab)
							field.setTab(tb);
					});
				});

				$.each(options.tabs, function(index, tab) {
					$.each(tab.fields, function(index, field) {
						field.open(dialog);
					});

					resetFeedback(tip, tab.fields, options);
				});

				$(dialog).dialog("option", "position", { my: "center", at: "center", of: window });

				var activeTabIndex = $(tabs).tabs('option', 'active');
				activateTab.call(dialog, options.tabs[activeTabIndex]);
			}
			
			options.create = function (event, ui) {
				$(this).css("minWidth", options.minWidth);
			}

			options.resizeStop = function (event, ui) {
				$(dialog).dialog("option", "position", { my: "center", at: "center", of: window });
			}

			options.updateField = function(tab, name, value) {
				fieldObjects[tab][toMethodName(name)].update(value);
			}

			options.enableField = function(tab, name) {
				fieldObjects[tab][toMethodName(name)].enable();
			}

			options.disableField = function(tab, name) {
				fieldObjects[tab][toMethodName(name)].disable();
			}

			options.resetField = function(tab, name) {
				fieldObjects[tab][toMethodName(name)].reset();
			}

			options.showLoadingFeedback = function() {
				$(dialog).attr("disabled", true).addClass("ui-state-disabled");
				$(dialog).css({ pointerEvents: 'none' });
				$(dialog).parent().css({ pointerEvents: 'none' });
			}

			options.hideLoadingFeedback = function() {
				$(dialog).attr("disabled", false).removeClass("ui-state-disabled");
				$(dialog).css({ pointerEvents: 'all' });
				$(dialog).parent().css({ pointerEvents: 'all' });
			}

			options.showErrorFeedback = function(message) {
				applyFeedback(tip, null, message);
				$(dialog).dialog("option", "position", { my: "center", at: "center", of: window });
			}

			// Build the object with all the getters for each field
			var valueGetters = {};
			
			for (var tab in fieldObjects) {
				for (var field in fieldObjects[tab]) {
					valueGetters[toMethodName(fieldObjects[tab][field].name())] = fieldObjects[tab][field].valueGetter();
				}
			}

			// Set the buttons of the first tab
			options.buttons = options.tabs[0].buttons;

			// Create the jQuery ui dialog
			var dialog = $.extend($(container).dialog(options), valueGetters);

			// Create the tabs, when a tab is activated show the proper buttons in the bottom of the dialog
			var tabs = $(tabContainer).tabs({
				activate: function() {
					var activeTabIndex = $(tabs).tabs('option', 'active');
					$(dialog).dialog('option', 'buttons', options.tabs[activeTabIndex].buttons);

					$.each(options.tabs, function(index, tab) {
						resetFeedback(tip, tab.fields, options);
					});

					activateTab.call(dialog, options.tabs[activeTabIndex]);
				}
			});

			

			// Prevent form submition
			$(dialog).submit( function(e) {
				e.preventDefault();
			});

			// Center the dialog when width changes
			$(dialog).on('autoCenter', function() {
				$(dialog).dialog("option", "position", { my: "center", at: "center", of: window });
			});

			this.dialog = dialog;
			this.tip = tip;
			this.tabs = tabs;

			return dialog;
		},

		destroy: function() {
			$(this.tabs).tabs('destroy').remove();
			$(this.dialog).dialog('destroy').remove();
		}
	});

	var activateTab = function(tab, options) {
		if (util.isFunction(tab.activate)) {
			tab.activate.call(this);
		}
	}

	var validate = function(tip, actions, fields) {
		try {
			var self = this;

			$.each(actions, function(i, action) {
				$.each(fields, function(j, field) {

					var validations = field.validations();
					var valueGetter = field.valueGetter();

					// No validations to do
					if (!validations) 
						return;

					if (field.name() == action) {
						$.each(validations, function(k, validation) {     
							if (!validation.check.call(self, valueGetter())) {
								// Apply the feedback for the failed validation
								applyFeedback(tip, field, validation.tip);
								// Trigger event to center the dialog if needed
								$(self).trigger('autoCenter');
								// Hack to exit the nested for loop with validation error
								throw new Error(validation.tip);
							}
						});
					}
				});
			});
		} catch (e) {
			return e.message;
		}

		return true;
	}

	var applyFeedback = function(tipContainer, fieldObject, validationTipMessage) {
		tipContainer.toError(validationTipMessage);
		
		if (fieldObject) {
			fieldObject.applyFeedback();
		}
	}

	var resetFeedback = function(tipContainer, fieldObjects, options) {
		if (fieldObjects[0].getTab)
		{
			var tab = fieldObjects[0].getTab();
			
			if (tab && $(tab).is(":hidden"))
				return;
		}

		tipContainer.toInfo(options.tip);

		if (fieldObjects) {
			$.each(fieldObjects, function (key, field) {
				field.resetFeedback(tipContainer);
			});
		}
	}

	var toMethodName = function(name) {
		return name.replace(/ /g,'');
	}

	return Dialog;
});