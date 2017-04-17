define(function(require) {
	var wrapper = require('wrap-in-div');
	var util = require('util');
	var statusMessage = require('create-status-message');
	var componentFactory = require('ui-component-factory');

	var topLeftVisible = true;
	var topRightVisible = true;
	var bottomLeftVisible = true;
	var bottomRightVisible = true;

	if (require('mode').isBasic()) {
		var topLeftVisible = true;
		var topRightVisible = false;
		var bottomLeftVisible = false;
		var bottomRightVisible = false;
	}

	var EditorRegions = require('ui-component').extend({
		init: function() {
			this.controller = null;
		},

		get: function() {
			if (!this.controller) {
				this.controller = this.create();
			}

			return this.controller;
		},

		create: function() {
			var regionsComponentExtension = {
				appendToTopLeft: function(content) {
					this.getTopLeft().append(content);
				},

				appendToTopRight: function(content) {
					this.getTopRight().append(content);
				},

				appendToBottomLeft: function(content) {
					this.getBottomLeft().append(content);
				},

				appendToBottomRight: function(content) {
					this.getBottomRight().append(content);
				},

				getTopLeft: function() {
					return $(this.html).find('#topLeft');
				},

				getTopRight: function() {
					return $(this.html).find('#topRight');
				},

				getBottomLeft: function() {
					return $(this.html).find('#bottomLeft');
				},

				getBottomRight: function() {
					return $(this.html).find('#bottomRight');
				},

				getTopLeftContainer: function() {
					return this.getTopLeft().parent('.region');
				},

				getTopRightContainer: function() {
					return this.getTopRight().parent('.region');
				},

				getBottomLeftContainer: function() {
					return this.getBottomLeft().parent('.region');
				},

				getBottomRightContainer: function() {
					return this.getBottomRight().parent('.region');
				},

				getRegion: function(child) {
					var getters = this.regionGetters();

					for (var i = 0; i < getters.length; i++) {
						var r = isInRegion(getters[i].call(this), child);

						if (r.contains) {
							return r.region;
						}
					}
				},

				toggleRegion: function(regionElement) {
					var style = regionElement.style;

					if (this.getTopLeftContainer()[0] === regionElement) {
						if (style.display === '') {
							style.display = 'none';
							topLeftVisible = false;
						} else {
							style.display = '';
							topLeftVisible = true;
						}
					} else if (this.getTopRightContainer()[0] === regionElement) {
						if (style.display === '') {
							style.display = 'none';
							topRightVisible = false;
						} else {
							style.display = '';
							topRightVisible = true;
						}
					} else if (this.getBottomLeftContainer()[0] === regionElement) {
						if (style.display === '') {
							style.display = 'none';
							bottomLeftVisible = false;
						} else {
							style.display = '';
							bottomLeftVisible = true;
						}

						if (require('mode').isBasic()) {
							style.display = 'none';
							bottomLeftVisible = false;
						}

					} else if (this.getBottomRightContainer()[0] === regionElement) {
						if (style.display === '') {
							style.display = 'none';
							bottomRightVisible = false;
						} else {
							style.display = '';
							bottomRightVisible = true;
						}

						if (require('mode').isBasic()) {
							bottomRightVisible = false;
							style.display = 'none';
						}
					}
				},

				showAll: function() {
					this.getTopLeftContainer()[0].style.display = '';
					topLeftVisible = true;

					this.getTopRightContainer()[0].style.display = '';
					topRightVisible = true;
					
					this.getBottomLeftContainer()[0].style.display = '';
					bottomLeftVisible = true;
					
					this.getBottomRightContainer()[0].style.display = '';
					bottomRightVisible = true;
				},

				regionsVisibility: function() {
					return [topLeftVisible, topRightVisible, bottomLeftVisible, bottomRightVisible];
				},

				setRegionVisibility: function(topLeft, topRight, bottomLeft, bottomRight) {
					topLeftVisible = topLeft;
					topRightVisible = topRight;
					bottomLeftVisible = bottomLeft;
					bottomRightVisible = bottomRight;
				},

				regionGetters: util.cache(function() {
					return [this.getTopLeft, this.getTopRight, this.getBottomLeft, this.getBottomRight];
				})
			}

			this.controller = componentFactory.getController(regionsComponentExtension, getHTML());

			return this.controller;
		}
	});

	var getHTML = function() {
		return wrapper.wrap(wrapper.wrap(
		[
			createRegion('topLeft'),
			createRegion('topRight'),
			createRegion('bottomLeft'),
			createRegion('bottomRight')
		],
		{
			id: 'editor-regions',
			classNames: ['ui-widget']
		}
		),
		{
			id: 'editor-regions-wrapper'
		});
	}

	var isInRegion = function(region, child) {
		return {
			contains: $(region).find(child).length == 1,
			region: $(region)[0]
		};
	}

	var createRegion = function(id) {
		var content = document.createElement('div');

		content.id = id;
		$(content).addClass('region-container');

		return wrapper.wrap([content], { className: 'region'});
	}

	return new EditorRegions();
});