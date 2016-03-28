define(function(require) {
	var gb = require('gb');
	var world = require('world');
	var editorConfig = require('editor-config');
	var editorDelegates = require('editor-delegates');
	var canvasContainer = require('canvas-container');

	var CanvasScrollBars = require('ui-component').extend({
		init: function() {
			this._super();

			var scrollContext = {
				canvas: gb.canvas,
				viewports: gb.viewports,
				config: editorConfig,
				gridBundle: require('grid-bundle')
			}

			this.onScroll = function (event) {
				var viewport = this.viewports.get(this.config.getMainViewportName());
				var left = event.target.scrollLeft;
				var top = event.target.scrollTop;

				var translate = "translate(" + left + "px," + top + "px" + ")";

				this.canvas.style.webkitTransform = translate;
				this.canvas.style.transform = translate;

				viewport.X = -left;
				viewport.Y = -top;

				this.gridBundle.setOffsetX(left);
				this.gridBundle.setOffsetY(top);
			}.bind(scrollContext);
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

			// Stuff to do when a new 'Main' viewport is added. AKA, load a new scene
			editorDelegates.add(gb.viewports, gb.viewports.ADD, this, function (v) {
				// Make sure the following is only done when it is detected that a viewport with name 'Main' was added
				if (v.name == editorConfig.getMainViewportName()) {
					// Update the viewport reference
					viewport = v;
					viewport.X = 0;
					viewport.Y = 0;

					main.scrollLeft = 0;
					main.scrollTop = 0;

					gb.canvas.style.webkitTransform = "translate(" + 0 + "px," + 0 + "px" + ")";
					gb.canvas.style.transform = "translate(" + 0 + "px," + 0 + "px" + ")";
					
					var diff = (world.getWidth() - gb.game.WIDTH);
					scrollContainer.style.width = diff > 0 ? gb.game.WIDTH + diff : gb.game.WIDTH;

					diff = (world.getHeight() - gb.game.HEIGHT);
					scrollContainer.style.height = diff > 0 ? gb.game.HEIGHT + diff : gb.game.HEIGHT;
				}
			});

			editorDelegates.add(world, world.CHANGE_WIDTH, this, function (width) {				
				updateScrollWidth(scrollContainer, main, width, gb.game.WIDTH);
			});

			editorDelegates.add(world, world.CHANGE_HEIGHT, this, function (height) {
				updateScrollHeight(scrollContainer, main, height, gb.game.HEIGHT);
			});

			editorDelegates.add(gb.game, gb.game.CHANGE_WIDTH, this, function (width) {
				updateScrollWidth(scrollContainer, main, world.getWidth(), width);
			});

			editorDelegates.add(gb.game, gb.game.CHANGE_HEIGHT, this, function (height) {
				updateScrollHeight(scrollContainer, main, world.getHeight(), height);
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

	var updateScrollWidth = function (scroller, canvasContainer, worldWidth, canvasWidth) {
		var diff = (worldWidth - canvasWidth);

		if (diff > 0) {
			scroller.style.width = canvasWidth + diff;
		} else {
			scroller.style.width = canvasWidth;
		}

		diff = parseInt(scroller.style.width) - main.scrollWidth;

		if (diff < 0) {
			canvasContainer.scrollLeft += diff;
		}
	}

	var updateScrollHeight = function (scroller, canvasContainer, worldHeight, canvasHeight) {
		var diff = (worldHeight - canvasHeight);

		if (diff > 0) {
			scroller.style.height = canvasHeight + diff;
		} else {
			scroller.style.height = canvasHeight;
		}

		diff = parseInt(scroller.style.height) - main.scrollWidth;

		if (diff < 0) {
			canvasContainer.scrollTop += diff;
		}
	}

	return CanvasScrollBars;
});