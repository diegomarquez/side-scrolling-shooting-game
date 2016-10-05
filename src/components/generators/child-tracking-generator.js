define(["editor-component", "gb"], function(EditorComponent, Gb) {
	var ChildTrackingGenerator = EditorComponent.extend({
		init: function() {
			this._super();

			this.maxAmountToSpray = null;
			this.sprayDelay = null;
			this.amountPerSpray = null;
			this.objectType = null;
			this.startingPositionTransformation = null;
			
			this.currentSprayCount = null;
			this.delayTime = null;
			this.createdObjects = [];
			this.stopped = false;
			this.viewports = null;

			this.self = ChildTrackingGenerator;
			this.gb = Gb;
		},

		editorStart: function(parent) {
			this.delayTime = 0;
			this.currentSprayCount = 0;
			this.createdObjects.length = 0;
			this.stopped = false;
		},

		editorUpdate: function(delta) {
			this.delayTime += delta;

			if (this.delayTime >= this.sprayDelay) {
				this.spray(this.self.args);
				this.delayTime = 0;
			}
		},

		stop: function() {
			this.stopped = true;
			this.createdObjects.length = 0;
			this.disable();
		},

		disable: function() {
			this._super();
			this.delayTime = 0;
			this.currentSprayCount = 0;
		},

		recycle: function(parent) {
			this.viewports = null;
		},

		spray: function(args) {
			if (this.stopped)
				return;

			if (!this.maxAmountToSpray) {
				if (this.isEnabled()) {
					for (var i=0; i < this.amountPerSpray; i++) {
						args['x'] = 0;
						args['y'] = 0;

						if (this.startingPositionTransformation) {
							for (var j = 0; j < this.startingPositionTransformation.length; j++) {
								this.startingPositionTransformation[j].call(this, args);
							}	
						}

						var go = this.gb.addChildTo(this.parent, this.objectType, this.viewports, args, 'create');

						this.createdObjects.push(go);
						
						go.once(go.RECYCLE, this, onRecycle);

						this.currentSprayCount++;
					}

					this.execute(this.SPRAY);
					this.parent.execute(this.SPRAY);
				}
			} else {
				if (this.currentSprayCount > this.maxAmountToSpray) {
					this.disable();
					this.execute(this.STOP_CREATION);
					this.parent.execute(this.STOP_CREATION);
				} else {
					if (this.isEnabled()) {
						for (var i=0; i < this.amountPerSpray; i++) {
							args['x'] = 0;
							args['y'] = 0;

							if (this.startingPositionTransformation) {
								for (var j = 0; j < this.startingPositionTransformation.length; j++) {
									this.startingPositionTransformation[j].call(this, args);
								}
							}

							var go = this.gb.addChildTo(this.parent, this.objectType, this.viewports, args, 'create');

							this.createdObjects.push(go);
							
							go.once(go.RECYCLE, this, onRecycle);

							this.currentSprayCount++;
						}

						this.execute(this.SPRAY);
						this.parent.execute(this.SPRAY);
					}
				}	
			}
		}
	}); 

	var onRecycle = function(go) {
		if (this.stopped)
			return;

		var index = this.createdObjects.indexOf(go);

		if (index != -1) {
			this.createdObjects.splice(index, 1);
		}
		
		if (!this.isEnabled() && this.createdObjects.length == 0) {
			this.execute(this.STOP_AND_ALL_RECYCLED);
		}
	}

	ChildTrackingGenerator.args = {
		x: null,
		y: null
	};

	Object.defineProperty(ChildTrackingGenerator.prototype, "SPRAY", { get: function() { return 'spray'; } });
	Object.defineProperty(ChildTrackingGenerator.prototype, "STOP_CREATION", { get: function() { return 'stop_creation'; } });
	Object.defineProperty(ChildTrackingGenerator.prototype, "STOP_AND_ALL_RECYCLED", { get: function() { return 'stop_and_all_recycled'; } });

	return ChildTrackingGenerator;
});