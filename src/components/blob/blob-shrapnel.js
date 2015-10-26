define(["editor-component", "gb", "util"], function(Component, Gb, Util) {
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
				
				if (this.amount == 'x8') {
					Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						angle: 0,
						x: this.parent.x,
						y: this.parent.y,
					});

					Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						angle: 90,
						x: this.parent.x,
						y: this.parent.y,
					});

					Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						angle: 180,
						x: this.parent.x,
						y: this.parent.y,
					});

					Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						angle: 270,
						x: this.parent.x,
						y: this.parent.y,
					});

					Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						angle: 45,
						x: this.parent.x,
						y: this.parent.y,
					});

					Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						angle: 135,
						x: this.parent.x,
						y: this.parent.y,
					});

					Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						angle: 225,
						x: this.parent.x,
						y: this.parent.y,
					});

					Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
						angle: 315,
						x: this.parent.x,
						y: this.parent.y,
					});
				}

				if (this.amount == 'x4') {
					if (Util.rand_b()) {
						Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
							angle: 0,
							x: this.parent.x,
							y: this.parent.y,
						});

						Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
							angle: 90,
							x: this.parent.x,
							y: this.parent.y,
						});

						Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
							angle: 180,
							x: this.parent.x,
							y: this.parent.y,
						});

						Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
							angle: 270,
							x: this.parent.x,
							y: this.parent.y,
						});
					}
					else {
						Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
							angle: 45,
							x: this.parent.x,
							y: this.parent.y,
						});

						Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
							angle: 135,
							x: this.parent.x,
							y: this.parent.y,
						});

						Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
							angle: 225,
							x: this.parent.x,
							y: this.parent.y,
						});

						Gb.create(this.objectType, this.parent.getUpdateGroup(), this.parent.getViewportList(), {
							angle: 315,
							x: this.parent.x,
							y: this.parent.y,
						});
					}	
				}

				
			});
		}
	});

	return BlobShrapnel;
});