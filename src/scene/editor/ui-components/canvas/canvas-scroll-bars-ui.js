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

				viewport.X = -left;
				viewport.Y = -top;

				this.gridBundle.setOffsetX(left);
				this.gridBundle.setOffsetY(top);

				this.self.latestScrollLeft = left;
				this.self.latestScrollTop = top;
			}.bind(scrollContext);

			this.onContextMenu = function(event) {
				event.preventDefault();

				var evt = new MouseEvent("contextmenu", {
					clientX: event.clientX,
					clientY: event.clientY,
				});

				gb.canvas.dispatchEvent(evt);
			};
			
			this.onMouseDown = function(event) {
				this.scrollingContainer.style.pointerEvents = "none";

				var evt = new MouseEvent("mousedown", {
					clientX: event.clientX,
					clientY: event.clientY,
				});

				gb.canvas.dispatchEvent(evt);
			}.bind(this);

			this.documentMouseUp = function(event) {
				this.scrollingContainer.style.pointerEvents = "";
			}.bind(this);

			this.justCreated = true;

			this.scrollingContainer = null;
			this.latestScrollLeft = 0;
			this.latestScrollTop = 0;
		},

		getScrollingLeft: function() {
			return this.latestScrollLeft;
		},

		getScrollingTop: function() {
			return this.latestScrollTop
		},

		setScrollingLeft: function(scroll, skip) {
			if (skip) {
				this.latestScrollLeft = scroll;
			} else {
				requestAnimationFrame(function() {
					this.latestScrollLeft = scroll;
					this.scrollingContainer.scrollLeft = scroll;
				}.bind(this));
			}
		},

		setScrollingTop: function(scroll, skip) {
			if (skip) {
				this.latestScrollTop = scroll;
			} else {
				requestAnimationFrame(function() {
					this.latestScrollTop = scroll;
					this.scrollingContainer.scrollTop = scroll;
				}.bind(this));
			}
		},

		create: function() {
			var viewport = gb.viewports.get(editorConfig.getMainViewportName());

			gb.canvas.style.position = 'absolute';
			gb.canvas.style.left = '0px';
			gb.canvas.style.top = '0px';
			gb.canvas.style.transition = 'none';

			var scrollContainer = document.createElement('div');
			scrollContainer.id = 'scrollerContainer';
			scrollContainer.style.position = 'absolute';
			scrollContainer.style.top = '0px';
			scrollContainer.style.left = '0px';
			scrollContainer.style.transition = 'none';
			
			var scroller = document.createElement('div');
			scroller.id = 'scroller';
			scroller.style.position = 'absolute';
			scroller.style.top = '0px';
			scroller.style.left = '0px';
			scroller.style.transition = 'none';
			scroller.style.pointerEvents = 'none';
			
			scrollContainer.style.width = "100%";
			scrollContainer.style.height = "100%";
			scrollContainer.style.overflowX = 'scroll';
			scrollContainer.style.overflowY = 'scroll';
			scrollContainer.appendChild(scroller);
			
			scrollContainer.addEventListener('scroll', this.onScroll, { passive: true });
			scrollContainer.addEventListener('contextmenu', this.onContextMenu);
			scrollContainer.addEventListener('mousedown', this.onMouseDown);
			document.body.addEventListener('mouseup', this.documentMouseUp);

			this.scrollingContainer = scrollContainer;

			var main = document.querySelector('#main');
			main.style.transition = 'none';
			main.style.pointerEvents = 'all';
			main.appendChild(scrollContainer);

			// Stuff to do when a new 'Main' viewport is added. AKA, load a new scene
			editorDelegates.add(gb.viewports, gb.viewports.ADD, this, function (v) {
				// Make sure the following is only done when it is detected that a viewport with name 'Main' was added
				if (v.name == editorConfig.getMainViewportName()) {
					// Update the viewport reference
					viewport = v;
					viewport.X = 0;
					viewport.Y = 0;

					if (this.justCreated) {
						this.justCreated = false;
					} else {
						this.setScrollingLeft(0);
						this.setScrollingTop(0);
					}
					
					var diff = (world.getWidth() - gb.game.WIDTH);
					scroller.style.width = diff > 0 ? (gb.game.WIDTH + diff).toString() + "px" : gb.game.WIDTH + "px";

					diff = (world.getHeight() - gb.game.HEIGHT);
					scroller.style.height = diff > 0 ? (gb.game.HEIGHT + diff).toString() + "px" : gb.game.HEIGHT + "px";
				}
			});

			editorDelegates.add(world, world.CHANGE_WIDTH, this, function (width) {
				updateScrollWidth(scroller, main, width, gb.game.WIDTH, this);
			});

			editorDelegates.add(world, world.CHANGE_HEIGHT, this, function (height) {
				updateScrollHeight(scroller, main, height, gb.game.HEIGHT, this);
			});

			editorDelegates.add(gb.game, gb.game.CHANGE_WIDTH, this, function (width) {
				updateScrollWidth(scroller, main, world.getWidth(), width, this);
			});

			editorDelegates.add(gb.game, gb.game.CHANGE_HEIGHT, this, function (height) {
				updateScrollHeight(scroller, main, world.getHeight(), height, this);
			});
		},

		destroy: function() {
			this.scrollingContainer.removeEventListener('scroll', this.onScroll);
			this.scrollingContainer.removeEventListener('contextmenu', this.onContextMenu);
			this.scrollingContainer.removeEventListener('mousedown', this.onMouseDown);
			
			document.body.addEventListener('mouseup', this.documentMouseUp);

			main = document.querySelector('#main');
			main.style.overflowX = '';
			main.style.overflowY = '';
			main.removeChild(document.querySelector('#scrollerContainer'));
			
			gb.canvas.style.position = '';
			gb.canvas.style.left = '';
			gb.canvas.style.top = '';
			gb.canvas.style.transform = '';

			this.scrollingContainer = null;
		}
	});

	var updateScrollWidth = function (scroller, canvasContainer, worldWidth, canvasWidth, ui) {
		var diff = (worldWidth - canvasWidth);

		if (diff > 0) {
			scroller.style.width = (canvasWidth + diff) + "px";
		} else {
			scroller.style.width = canvasWidth + "px";
		}

		diff = parseInt(scroller.style.width) - main.scrollWidth;

		if (diff < 0) {
			ui.setScrollingLeft(canvasContainer.scrollLeft + diff, true);
		}
	}

	var updateScrollHeight = function (scroller, canvasContainer, worldHeight, canvasHeight, ui) {
		var diff = (worldHeight - canvasHeight);

		if (diff > 0) {
			scroller.style.height = (canvasHeight + diff) + "px";
		} else {
			scroller.style.height = canvasHeight + "px";
		}

		diff = parseInt(scroller.style.height) - main.scrollWidth;

		if (diff < 0) {
			ui.setScrollingTop(canvasContainer.scrollTop + diff, true);
		}
	}

	return CanvasScrollBars;
});