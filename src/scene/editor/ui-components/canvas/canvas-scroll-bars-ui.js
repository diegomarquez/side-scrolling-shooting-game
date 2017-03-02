define(function(require) {
	var gb = require('gb');
	var world = require('world');
	var editorConfig = require('editor-config');
	var editorDelegates = require('editor-delegates');
	var canvasContainer = require('canvas-container');
	var storage = require('local-storage');

	var CanvasScrollBars = require('ui-component').extend({
		init: function() {
			this._super();

			var scrollContext = {
				canvas: gb.canvas,
				viewports: gb.viewports,
				config: editorConfig,
				gridBundle: require('grid-bundle'),
				self: this
			}

			this.onScroll = function (event) {
				var viewport = this.viewports.get(this.config.getMainViewportName());
				var left = event.target.scrollLeft;
				var top = event.target.scrollTop;

				var translate = "translate(" + left + "px," + top + "px" + ")";

				console.log(left, top);

				this.canvas.style.webkitTransform = translate;
				this.canvas.style.transform = translate;

				viewport.X = -left;
				viewport.Y = -top;

				this.gridBundle.setOffsetX(left);
				this.gridBundle.setOffsetY(top);

				this.self.latestScrollLeft = left;
				this.self.latestScrollTop = top;
			}.bind(scrollContext);

			this.scrollingContainer = null;

			this.scrollLeftRafId = -1;
			this.scrollTopRafId = -1;
			this.latestScrollLeft = 0;
			this.latestScrollTop = 0;

			this.onScrollLeftFinished = null;
			this.onScrollTopFinished = null;
		},

		getScrollingLeft() {
			return this.latestScrollLeft;
		},

		getScrollingTop() {
			return this.latestScrollTop
		},

		setScrollingLeft(scroll) {
			this.latestScrollLeft = scroll;

			if (this.scrollLeftRafId !== -1)
				return;

			if (this.scrollTopRafId === -1) {
				this.onScrollTopFinished = null;

				this.scrollLeftRafId = setTimeout(function() {
					this.scrollLeftRafId = -1;

					this.scrollingContainer.scrollLeft = this.latestScrollLeft;

					if (this.onScrollLeftFinished)
						this.onScrollLeftFinished();

					this.onScrollLeftFinished = null;

				}.bind(this), 1000);
			} else {
				this.onScrollTopFinished = function() {
					this.setScrollingLeft(this.latestScrollLeft);
				}.bind(this);
			}
		},

		setScrollingTop(scroll) {
			this.latestScrollTop = scroll;

			if (this.scrollTopRafId !== -1)
				return;

			if (this.scrollLeftRafId === -1) {
				this.onScrollLeftFinished = null;

				this.scrollTopRafId = setTimeout(function() {
					this.scrollTopRafId = -1;

					this.scrollingContainer.scrollTop = this.latestScrollTop;

					if (this.onScrollTopFinished)
						this.onScrollTopFinished();

					this.onScrollTopFinished = null;

				}.bind(this), 1000);
			} else {
				this.onScrollLeftFinished = function() {
					this.setScrollingTop(this.latestScrollTop)
				}.bind(this);
			}
		},

		create: function() {
			var viewport = gb.viewports.get(editorConfig.getMainViewportName());

			gb.canvas.style.position = 'absolute';
			gb.canvas.style.left = '0px';
			gb.canvas.style.top = '0px';

			var scrollContainer = document.createElement('div');
			scrollContainer.id = 'scroller';
			scrollContainer.style.position = 'absolute';
			scrollContainer.style.top = '0px';
			scrollContainer.style.left = '0px';
			scrollContainer.style.pointerEvents = 'none';
			
			var main = document.querySelector('#main');
			main.style.overflowX = 'scroll';
			main.style.overflowY = 'scroll';
			main.appendChild(scrollContainer);
			main.addEventListener('scroll', this.onScroll);

			this.scrollingContainer = main;
			this.scrollLeftRafId = -1;
			this.scrollTopRafId = -1;

			this.latestScrollLeft = 0;
			this.latestScrollTop = 0;

			// Stuff to do when a new 'Main' viewport is added. AKA, load a new scene
			editorDelegates.add(gb.viewports, gb.viewports.ADD, this, function (v) {
				// Make sure the following is only done when it is detected that a viewport with name 'Main' was added
				if (v.name == editorConfig.getMainViewportName()) {
					// Update the viewport reference
					viewport = v;
					viewport.X = 0;
					viewport.Y = 0;

					gb.canvas.style.webkitTransform = "translate(" + 0 + "px," + 0 + "px" + ")";
					gb.canvas.style.transform = "translate(" + 0 + "px," + 0 + "px" + ")";
					
					var diff = (world.getWidth() - gb.game.WIDTH);
					scrollContainer.style.width = diff > 0 ? gb.game.WIDTH + diff : gb.game.WIDTH;

					diff = (world.getHeight() - gb.game.HEIGHT);
					scrollContainer.style.height = diff > 0 ? gb.game.HEIGHT + diff : gb.game.HEIGHT;

					var scrolling = storage.getScrolling();

					if (scrolling) {
						this.setScrollingLeft(scrolling['left']);
						this.setScrollingTop(scrolling['top']);
					} else {
						this.setScrollingLeft(0);
						this.setScrollingTop(0);
					}
				}
			});

			editorDelegates.add(world, world.CHANGE_WIDTH, this, function (width) {
				updateScrollWidth(scrollContainer, main, width, gb.game.WIDTH, this);
			});

			editorDelegates.add(world, world.CHANGE_HEIGHT, this, function (height) {
				updateScrollHeight(scrollContainer, main, height, gb.game.HEIGHT, this);
			});

			editorDelegates.add(gb.game, gb.game.CHANGE_WIDTH, this, function (width) {
				updateScrollWidth(scrollContainer, main, world.getWidth(), width, this);
			});

			editorDelegates.add(gb.game, gb.game.CHANGE_HEIGHT, this, function (height) {
				updateScrollHeight(scrollContainer, main, world.getHeight(), height, this);
			});
		},

		destroy: function() {
			main = document.querySelector('#main');
			main.style.overflowX = '';
			main.style.overflowY = '';
			main.removeChild(document.querySelector('#scroller'));
			main.removeEventListener('scroll', this.onScroll);

			gb.canvas.style.position = '';
			gb.canvas.style.left = '';
			gb.canvas.style.top = '';
			gb.canvas.style.transform = '';
		}
	});

	var updateScrollWidth = function (scroller, canvasContainer, worldWidth, canvasWidth, ui) {
		var diff = (worldWidth - canvasWidth);

		if (diff > 0) {
			scroller.style.width = canvasWidth + diff;
		} else {
			scroller.style.width = canvasWidth;
		}

		diff = parseInt(scroller.style.width) - main.scrollWidth;

		if (diff < 0) {
			ui.setScrollingLeft(canvasContainer.scrollLeft + diff);
		}
	}

	var updateScrollHeight = function (scroller, canvasContainer, worldHeight, canvasHeight, ui) {
		var diff = (worldHeight - canvasHeight);

		if (diff > 0) {
			scroller.style.height = canvasHeight + diff;
		} else {
			scroller.style.height = canvasHeight;
		}

		diff = parseInt(scroller.style.height) - main.scrollWidth;

		if (diff < 0) {
			ui.setScrollingTop(canvasContainer.scrollTop + diff);
		}
	}

	return CanvasScrollBars;
});