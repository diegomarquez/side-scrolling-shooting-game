define(["editor-component", "gb", "util"], function(EditorComponent, Gb, Util) {
	var GameObjectGenerator = EditorComponent.extend({
		init: function() {
			this._super();

			this.maxAmountToSpray = null;
			this.sprayDelay = null;
			this.amountPerSpray = null;
			this.objectType = null;
			this.startingPositionTransformation = null;
			
			this.currentSprayCount = null;
			this.delayTime = null;
			this.viewports = null;
			this.updateGroup = null;

			this.self = GameObjectGenerator;
			this.gb = Gb;
		},

		editorStart: function(parent) {
			this.delayTime = 0;
			this.currentSprayCount = 0;

			if (!this.args.viewports)
				this.viewports = this.parent.getViewportList();
			
			if (!this.args.updateGroup)
				this.updateGroup = this.parent.getUpdateGroup();
		},

		editorUpdate: function(delta) {
			if (!this.isEnabled())
				return;

			this.delayTime += delta;

			if (this.delayTime >= this.sprayDelay) {
				this.spray(this.self.args);
				this.delayTime = 0;
			}
		},

		disable: function() {
			this._super();

			this.delayTime = 0;
			this.currentSprayCount = 0;
		},

		recycle: function(parent) {
			this.maxAmountToSpray = null;
			this.sprayDelay = null;
			this.amountPerSpray = null;
			this.objectType = null;
			this.startingPositionTransformation = null;
			
			this.currentSprayCount = null;
			this.delayTime = null;
			this.viewports = null;
			this.updateGroup = null;
		},

		spray: function(args) {
			if (!this.isEnabled())
				return;
			
			if (!this.maxAmountToSpray) {
				if (this.isEnabled()) {
					for (var i=0; i < this.amountPerSpray; i++) {
						args['x'] = this.parent.X;
						args['y'] = this.parent.Y;

						if (this.startingPositionTransformation) {
							for (var j = 0; j < this.startingPositionTransformation.length; j++) {
								this.startingPositionTransformation[j].call(this, args);
							}
						}

						if (Util.isArray(this.objectType)) {
							var index = Util.rand_i(0, this.objectType.length-1);

							this.gb.create(this.objectType[index], this.updateGroup, this.viewports, args);

						} else {
							this.gb.create(this.objectType, this.updateGroup, this.viewports, args);
						}

						this.currentSprayCount++;
					}
				}

				this.parent.execute(this.SPRAY);
				this.execute(this.SPRAY);
			} else {
				if (this.currentSprayCount >= this.maxAmountToSpray) {
					this.disable();

					this.parent.execute(this.STOP_CREATION);
					this.execute(this.STOP_CREATION);
				} else {
					if (this.isEnabled()) {
						for (var i=0; i < this.amountPerSpray; i++) {
							args['x'] = this.parent.X;
							args['y'] = this.parent.Y;

							if (this.startingPositionTransformation) {
								for (var j = 0; j < this.startingPositionTransformation.length; j++) {
									this.startingPositionTransformation[j].call(this, args);
								}
							}

							if (Util.isArray(this.objectType)) {
								var index = Util.rand_i(0, this.objectType.length-1);

								this.gb.create(this.objectType[index], this.updateGroup, this.viewports, args);

							} else {
								this.gb.create(this.objectType, this.updateGroup, this.viewports, args);	
							}

							this.currentSprayCount++;

							if (this.currentSprayCount >= this.maxAmountToSpray) {
								this.disable();

								this.parent.execute(this.STOP_CREATION);
								this.execute(this.STOP_CREATION);
								
								return;
							}
						}
					}
					
					this.parent.execute(this.SPRAY);
					this.execute(this.SPRAY);
					
				}
			}
		}
	});

	GameObjectGenerator.args = {
		x: null,
		y: null
	}

	Object.defineProperty(GameObjectGenerator.prototype, "SPRAY", { get: function() { return 'spray'; } });
	Object.defineProperty(GameObjectGenerator.prototype, "STOP_CREATION", { get: function() { return 'stop_creation'; } });

	return GameObjectGenerator;
});