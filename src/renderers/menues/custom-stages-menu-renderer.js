define(["path-renderer", "draw"], function(PathRenderer, Draw) {
  var ArrowRenderer = PathRenderer.extend({
    init: function() {
      this._super();

      this.width = 750;
      this.height = 360;
      
      this.name = 'custom-stages-menu-renderer';
    },

    start: function() {
    	this._super();    	
    },

    drawPath: function(context) {
      context.save();

      // Border
      Draw.rectangle(context, 0, 0, this.width, this.height, null, '#FFFFFF', 5);
      // Column divider
      Draw.rectangle(context, 100, 0, 2, this.height, '#FFFFFF', '#FFFFFF', 1);
      // Rows
      Draw.rectangle(context, 0, (this.height/4)*1, this.width, 2, '#FFFFFF', '#FFFFFF', 1);
      Draw.rectangle(context, 0, (this.height/4)*2, this.width, 2, '#FFFFFF', '#FFFFFF', 1);
      Draw.rectangle(context, 0, (this.height/4)*3, this.width, 2, '#FFFFFF', '#FFFFFF', 1);

      context.restore();
    }
  });

  return ArrowRenderer;
});
