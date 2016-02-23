define(["editor-component", "gb", "TweenLite", "EasePack"], function(Component, Gb, Tweenlite) {
	var BlobShrapnel = Component.extend({
		init: function() {
			this._super();

			this.objectType = null;
			this.amount = null;
		},

		editorStart: function(parent) {

			if (!this.objectType)
				throw new Error("Missing objectType attribute");

			if (!this.amount)
				throw new Error("Missing amount attribute");

			this.parent.on('destroyed', this, function() {
				
				if (this.amount == 'x2') {

					this.easeBlob(Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						x: this.parent.x,
						y: this.parent.y
					}));

					this.easeBlob(Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						x: this.parent.x,
						y: this.parent.y
					}));
				}

				if (this.amount == 'x3') {
					this.easeBlob(Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						x: this.parent.x,
						y: this.parent.y
					}));

					this.easeBlob(Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						x: this.parent.x,
						y: this.parent.y
					}));

					this.easeBlob(Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						x: this.parent.x,
						y: this.parent.y
					}));
				}				
			});

			this.parent.on('damage', this, function() {
				
				if (this.amount == 'x2') {

					this.easeBlob(Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						x: this.parent.x,
						y: this.parent.y
					}));

					this.easeBlob(Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						x: this.parent.x,
						y: this.parent.y
					}));
				}

				if (this.amount == 'x3') {
					this.easeBlob(Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						x: this.parent.x,
						y: this.parent.y
					}));

					this.easeBlob(Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						x: this.parent.x,
						y: this.parent.y
					}));

					this.easeBlob(Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						x: this.parent.x,
						y: this.parent.y
					}));
				}				
			});
		},

		easeBlob: function(blob) {
			var angle = Math.random() * (Math.PI*2);
			var distance = 50 + Math.random() * 70;
			var vecX = Math.cos(angle) * distance;
			var vecY = Math.sin(angle) * distance;

			Tweenlite.to(blob, 1.2, { x: '+=' + vecX, y: '+=' + vecY, ease: Power2.easeOut });
		}
	});

	return BlobShrapnel;
});