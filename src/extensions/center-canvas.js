define(["gb", "extension"], function(Gb, Extension) {
	var CenterCanvas = Extension.extend({
		type: function() {
			return Gb.game.CREATE;
		},

		execute: function() {
			this.container = Gb.game.mainContainer;
			this.canvas = Gb.game.canvas;

			var containerStyle = window.getComputedStyle(this.container, null);
			var canvasStyle = window.getComputedStyle(this.canvas, null);

			this.initContainerTop = containerStyle.getPropertyValue("top");
			this.initContainerLeft = containerStyle.getPropertyValue("left");
			this.initContainerMarginTop = containerStyle.getPropertyValue("margin-top");
			this.initContainerMarginLeft = containerStyle.getPropertyValue("margin-left");
			this.initContainerPosition = containerStyle.getPropertyValue("position");

			this.initCanvasPaddingLeft = canvasStyle.getPropertyValue("padding-left");
			this.initCanvasPaddingRight = canvasStyle.getPropertyValue("padding-right");
			this.initCanvasMarginLeft = canvasStyle.getPropertyValue("margin-left");
			this.initCanvasMarginRight = canvasStyle.getPropertyValue("margin-right");

    	this.container.style.top  		= '50%';
    	this.container.style.left 		= '50%';
			this.container.style.marginLeft = '-' + Gb.game.canvas.width/2 + 'px';
			this.container.style.marginTop  = '-' + Gb.game.canvas.height/2 + 'px';
			this.container.style.position   = 'fixed';

			this.canvas.style.paddingLeft  = 0;
    	this.canvas.style.paddingRight = 0;
    	this.canvas.style.marginLeft   = 'auto';
    	this.canvas.style.marginRight  = 'auto';

			window.addEventListener('resize', this.resizeListener, false);			
		},

		destroy: function() {
			this.container.style.top  		  = this.initContainerTop;
    	this.container.style.left 		  = this.initContainerLeft;
			this.container.style.marginTop  = this.initContainerMarginTop;
			this.container.style.marginLeft = this.initContainerMarginLeft;
			this.container.style.position   = this.initContainerPosition;

			this.canvas.style.paddingLeft  = this.initCanvasPaddingLeft;
    	this.canvas.style.paddingRight = this.initCanvasPaddingRight;
    	this.canvas.style.marginLeft   = this.initCanvasMarginLeft;
    	this.canvas.style.marginRight  = this.initCanvasMarginRight;

    	delete this['container'];
    	delete this['canvas'];

    	delete this['initContainerTop'];
    	delete this['initContainerLeft'];
			delete this['initContainerMarginTop'];
			delete this['initContainerMarginLeft'];
			delete this['initContainerPosition'];

			delete this['initCanvasPaddingLeft'];
    	delete this['initCanvasPaddingRight'];
    	delete this['initCanvasMarginLeft'];
    	delete this['initCanvasMarginRight'];

    	delete this['resizeListener']
		}
	});

	return CenterCanvas;
});