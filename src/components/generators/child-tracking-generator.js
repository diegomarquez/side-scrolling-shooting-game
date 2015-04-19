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
		},

		editorStart: function(parent) {
			this.delayTime = 0;
			this.currentSprayCount = 0;
			this.createdObjects.length = 0;
		},

		editorUpdate: function(delta) {
			this.delayTime += delta;

			if (this.delayTime >= this.sprayDelay) {
				this.spray(ChildTrackingGenerator.args);
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
				create.call(this, args);
				this.execute(this.SPRAY);	
			} else {
				if (this.currentSprayCount > this.maxAmountToSpray) {
					this.disable();
					this.execute(this.STOP_CREATION);
				} else {
					create.call(this, args);
					this.execute(this.SPRAY);	
				}	
			}
		}
	});

	var create = function(args) {
		if (!this.isEnabled()) return;

		for (var i=0; i < this.amountPerSpray; i++) {
			startingPostion.call(this, args);

			var go = Gb.addChildTo(this.parent, this.objectType, null, args, 'create');

			this.createdObjects.push(go);
			
			go.once(go.RECYCLE, this, onRecycle);

			this.currentSprayCount++;
		}
	} 

	var onRecycle = function(go) {
		this.createdObjects.splice(this.createdObjects.indexOf(go), 1);

		if (!this.isEnabled() && this.createdObjects.length == 0) {
			this.execute(this.STOP_AND_ALL_RECYCLED);
		}
	}

	var startingPostion = function(args) {
		args['x'] = 0;
		args['y'] = 0;

		if (this.startingPositionTransformation) {
			for (var i = 0; i < this.startingPositionTransformation.length; i++) {
				this.startingPositionTransformation[i].call(this, args);
			}	
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