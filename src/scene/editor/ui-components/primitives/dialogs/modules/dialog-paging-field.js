define(function(require) {
	var wrapper = require('wrap-in-div');
	var util = require('util')

	var DialogPagingField = require('class').extend({
		init: function(options) {
			this.options = options;
			this.page = 0;
			this.cachedData = null;
			this.cachedPages = null;
			this.dialog = null;
		},

		name: function() {
			return this.options.name;
		},

		html: function() {
			return this.h;
		},

		validations: function() {
			return this.options.validations;
		},

		itemsPerPage: function() {
			return this.options.itemsPerPage;
		},

		unknownPageLimit: function() {
			return !this.options.data;
		},

		data: function() {
			if (this.options.data) {
				return this.options.data();	
			}
			else if (this.cachedData) {
				return this.cachedData;
			} else {
				return [];
			}
		},

		pages: function() {
			return Math.ceil(this.data().length / this.itemsPerPage());
		},

		currentPage: function() {
			return this.page;
		},

		getDialog: function() {
			return this.dialog;
		},

		create: function() {
			var lowerCaseName = this.name().toLowerCase();

			var label = document.createElement('label');
			label.innerHTML = this.name();
			$(label).attr('for', lowerCaseName);

			var container = document.createElement('div');
			
			var data = this.data();

			this.addListItem(container, { 'margin-top': '0px' }, data[0], 0);

			for (var i = 0; i < this.itemsPerPage() - 2; i++) {
				this.addListItem(container, null, data[i+1], i+1);
			}

			if (this.options.hideNavagationButtons) {
				this.addListItem(container, { 'margin-bottom': '0px' }, data[this.itemsPerPage()-1], this.itemsPerPage()-1);
			} else {
				this.addListItem(container, null, data[this.itemsPerPage()-1], this.itemsPerPage()-1);
				this.addNavigationButtons(container);
			}
			
			$(container).addClass('ui-corner-all');
			$(container).addClass('well');
			$(container).addClass('well-small');

			this.h = wrapper.wrap([label, container]);

			if (this.options.disabled)
				this.disable();
		},

		addListItem: function(container, styles, text, index) {
			var label = document.createElement('label');
			label.setAttribute('index', index);

			$(label).addClass('radio');
			
			label.style.marginBottom = '13px';

			if (styles) {
				$(label).css(styles);
			}
			
			var input = document.createElement('input');
			input.type = 'radio';
			input.name = this.name().toLowerCase() + "_radio";
			input.style.width = 'auto';
			input.style.marginTop = '1px';

			label.appendChild(input);

			if (text) {
				label.appendChild(document.createTextNode(text));
				input.setAttribute("text", text);

				$(input).attr("disabled", false).removeClass("ui-state-disabled");
			} else {
				label.appendChild(document.createTextNode("No Data"));
				input.setAttribute("text", "no-data");

				$(input).attr("disabled", true).addClass("ui-state-disabled");
			}

			label.style.fontWeight = "normal";

			container.appendChild(label);
		},

		addNavigationButtons: function(container) {
			var ul = document.createElement('ul');
			var last = document.createElement('li');
			var next = document.createElement('li');
			var aLast = document.createElement('a');
			var aNext = document.createElement('a');

			$(ul).addClass('pager');

			ul.style.marginBottom = '0px';

			aLast.href = "#";
			aNext.href = "#";
			aLast.textContent = "<< Last";
			aNext.textContent = "Next >>";

			$(aLast).on("click", function() {
				this.page--;

				if (this.page < 0) {
					this.page = 0;
				} else {
					this.update();
				}
			}.bind(this));

			$(aNext).on("click", function() {
				this.page++;

				if (this.unknownPageLimit()) {
					if (this.cachedPages.indexOf(this.page) === -1) {
						this.options.next.call(this);
					} else {
						this.update();
					}
				} else {
					if (this.page > this.pages()-1) {
						this.page = this.pages()-1;
					} else {
						this.update();
					}
				}
			}.bind(this));

			ul.appendChild(last);
			ul.appendChild(next);
			last.appendChild(aLast);
			next.appendChild(aNext);

			container.appendChild(ul);
		},

		open: function(dialog) {
			this.dialog = dialog;

			if (this.options.data) {
				this.update();

				if (this.options.data().length === 0) {
					this.disable();
				} else {
					this.enable();
				}
			}
		},

		reset: function() {
			this.page = 0;
			this.cachedData = null;
			this.cachedPages = null;
		},

		update: function(data) {
			if (this.unknownPageLimit()) {
				if (data) {
					if (!this.cachedData)
						this.cachedData = [];
				
					if (!this.cachedPages)
						this.cachedPages = [];
					
					if (data.length > 0) {
						if (this.cachedPages.indexOf(this.page) === -1) {
							
							var p = this.page;
							
							for (var i = 0; i < data.length; i++) {
								this.cachedData.push(data[i]);
								
								if (this.cachedData.length % this.itemsPerPage() === 0) {
									p++;
									this.cachedPages.push(p);
								}
							}
							
							this.cachedPages.push(this.page);
						}
					}
					else {
						this.page--;

						if (this.page < 0) {
							this.page = 0;
						}
					}
				}
			}
			
			var data = this.data();
			var itemsPerPage = this.itemsPerPage();

			for (var i = 0; i < itemsPerPage; i++) {
				var text = "";
				var d = data[(this.page * itemsPerPage) + i];

				if (util.isObject(d)) {
					if (!d.hasOwnProperty('displaytext'))
						throw new Error('missing required property "displaytext"');

					if (typeof d['displaytext'] !== 'string')
						throw new Error('"displaytext" property must be a string');

					text = d['displaytext'];
				}
				else {
					text = d;
				}

				var label = $(this.html()).find('label[index="' + i + '"]');
				var input = label.find('input');

				var children = label.children();
    			
    			label.empty();
    			label.append(children);

    			if (text) {
					label.append(document.createTextNode(text));
					input.attr("text", text);

					if (util.isObject(d)) {
						input.attr("hasAttributes", true);

						for (var k in d) {
							input.attr(k, d[k]);
						}
					}

					input.attr("text", text);

					$(input).attr("disabled", false).removeClass("ui-state-disabled");
				} else {
					label.append(document.createTextNode("No Data"));
					input.attr("text", "no-data");

					$(input).attr("disabled", true).addClass("ui-state-disabled");
				}

				input.prop('checked', false);
			}
		},

		valueGetter: function() {
			var self = this;

			return function() {
				var input = $(self.html()).find('input:checked');

				if (input) {
					if (input.attr("hasAttributes")) {
						var result = {};
						
						$.each(input.get(0).attributes, function() {
							if(this.specified) {
								result[this.name] = this.value;
							}
						});
						
						return result;
					} else {
						return input.attr("text");	
					}
				} else {
					return 'no-data';
				}
			}
		},

		applyFeedback: function() {
			
		},

		resetFeedback: function() {
			
		},

		enable: function() {
			var all = $(this.html());

			all.attr("disabled", false).removeClass("ui-state-disabled");
			all.find("a").attr("disabled", false).removeClass("ui-state-disabled");

			all.css({
				pointerEvents: 'all'
			});

			all.find("a").css({
				pointerEvents: 'all'
			});
		},

		disable: function() {
			var all = $(this.html());

			all.attr("disabled", true).addClass("ui-state-disabled");
			all.find("a").attr("disabled", true).addClass("ui-state-disabled");

			all.css({
				pointerEvents: 'none'
			});

			all.find("a").css({
				pointerEvents: 'none'
			});
		}
	});

	return DialogPagingField;
});