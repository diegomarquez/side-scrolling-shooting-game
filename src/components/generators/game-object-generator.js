define(["editor-component", "gb"], function(EditorComponent, Gb) {
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

			this.viewports = this.parent.getViewportList();
			this.updateGroup = this.parent.getUpdateGroup();
		},

		editorUpdate: function(delta) {
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

		spray: function(args) {
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

						this.gb.create(this.objectType, this.updateGroup, this.viewports, args);

						this.currentSprayCount++;
					}
				}

				this.execute(this.SPRAY);
				this.parent.execute(this.SPRAY);
			} else {
				if (this.currentSprayCount > this.maxAmountToSpray) {
					this.disable();
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

							this.gb.create(this.objectType, this.updateGroup, this.viewports, args);

							this.currentSprayCount++;
						}
					}
					
					this.execute(this.SPRAY);
					this.parent.execute(this.SPRAY);
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