define(function(require) {
	var scrollBar = require('scroll-bar');
	var gb = require('gb');
	var world = require('world');
	var editorConfig = require('editor-config');
	var editorDelegates = require('editor-delegates');
	var canvasContainer = require('canvas-container');

	var CanvasScrollBars = require('ui-component').extend({
		init: function() {

		},

		create: function() {
			var main = document.querySelector('#main');

			main.style.overflowX = 'scroll';
			main.style.overflowY = 'scroll';

			var scrollContainer = document.createElement('div');

			scrollContainer.style.position = 'absolute';
			scrollContainer.style.top = '0px';
			scrollContainer.style.left = '0px';
			scrollContainer.style.pointerEvents = 'none';
			
			main.appendChild(scrollContainer);

			// var canvas = canvasContainer.getCanvasContainer();
			// var viewport = gb.viewports.get(editorConfig.getMainViewportName());
			// var getGridCellSize = editorConfig.getGridCellSize();

			// this.verticalScrollBar = new scrollBar().create(function() {
			// 	return {
			// 		id: 'canvas-vertical-scroll-bar',
			// 		value: clampAtCero(world.getHeight(), viewport.height),
			// 		min: 0,
			// 		max: clampAtCero(world.getHeight(), viewport.height),
			// 		step: getGridCellSize.height,
			// 		orientation: 'vertical',
			// 		height: viewport.height,
			// 		contentHeight: world.getHeight(),
			// 		style: {
			// 			height: (gb.canvas.height - 13) + 'px'
			// 		},
			// 		onSlide: function(event, ui) {
			// 			viewport.Y = -(clampAtCero(world.getHeight(), viewport.height) - ui.value);
			// 		} 
			// 	}
			// });

			// this.horizontalScrollBar = new scrollBar().create(function() {
			// 	return {
			// 		id: 'canvas-horizontal-scroll-bar', 
			// 		value: 0,
			// 		min: 0,
			// 		max: clampAtCero(world.getWidth(), viewport.width),
			// 		step: getGridCellSize.width,
			// 		orientation: 'horizontal',
			// 		width: viewport.width,
			// 		contentWidth: world.getWidth(),
			// 		style: {
			// 			width: (gb.canvas.width - 14) + 'px'
			// 		},
			// 		onSlide: function(event, ui) {
			// 			viewport.X = -ui.value;
			// 		}
			// 	} 
			// });

			// Stuff to do when a new 'Main' viewport is added. AKA, load a new scene
			// editorDelegates.add(gb.viewports, gb.viewports.ADD, this, function (v) {
			// 	// Make sure the following is only done when it is detected that a viewport with name 'Main' was added
			// 	if (v.name == editorConfig.getMainViewportName()) {
			// 		// Update the viewport reference
			// 		viewport = v;
			// 		// Reset scroll bars position          
			// 		this.horizontalScrollBar.slider('value', 0);
			// 		this.verticalScrollBar.slider('value', 0);
			// 	}
			// });

			editorDelegates.add(world, world.CHANGE_WIDTH, this, function (width) {				
				var diff = (width - gb.game.WIDTH);
				
				if (diff > 0) {
					scrollContainer.style.width = gb.game.WIDTH + diff;
				} else {
					scrollContainer.style.width = gb.game.WIDTH;
				}
			});

			editorDelegates.add(world, world.CHANGE_HEIGHT, this, function (height) {
				var diff = (height - gb.game.HEIGHT);
				
				if (diff > 0) {
					scrollContainer.style.height = gb.game.HEIGHT + diff;
				} else {
					scrollContainer.style.height = gb.game.HEIGHT;
				}
			});

			// Adjust the viewport offset when the world decreases and the scrollbar is at it's maximum value
			// editorDelegates.add(world, world.CHANGE_HEIGHT_DECREASE, this, function (value) {
			// 	if(this.verticalScrollBar.isAtMaxEdge()) {
			// 		viewport.Y += this.verticalScrollBar.option('step');
			// 	}
			// });

			// editorDelegates.add(world, world.CHANGE_WIDTH_DECREASE, this, function (value) {
			// 	if(this.horizontalScrollBar.isAtMaxEdge()) {
			// 		viewport.X += this.horizontalScrollBar.option('step');
			// 	}
			// });

			editorDelegates.add(gb.game, gb.game.CHANGE_WIDTH, this, function (width) {
				scrollContainer.style.width = width;
			});

			editorDelegates.add(gb.game, gb.game.CHANGE_HEIGHT, this, function (height) {
				scrollContainer.style.height = height;
			});
		}
	});

	return CanvasScrollBars;
});