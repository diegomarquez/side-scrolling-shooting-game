define(["editor-component", "gb"], function(EditorComponent, Gb) {
	var ChildGenerator = EditorComponent.extend({
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

			this.self = ChildGenerator;
			this.gb = Gb;
		},

		editorStart: function(parent) {
			this.delayTime = 0;
			this.currentSprayCount = 0;
			this.createdObjects.length = 0;
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
				this.create(args);
				this.execute(this.SPRAY);	
			} else {
				if (this.currentSprayCount > this.maxAmountToSpray) {
					this.disable();
					this.execute(this.STOP_CREATION);
				} else {
					this.create(args);
					this.execute(this.SPRAY);	
				}	
			}
		},

		create: function(args) {
			if (!this.isEnabled()) return;

			for (var i=0; i < this.amountPerSpray; i++) {
				this.startingPostion(args);

				this.gb.addChildTo(this.parent, this.objectType, null, args, 'create');

				this.currentSprayCount++;
			}
		},

		startingPostion: function(args) {
			args['x'] = 0;
			args['y'] = 0;

			if (this.startingPositionTransformation) {
				for (var i = 0; i < this.startingPositionTransformation.length; i++) {
					this.startingPositionTransformation[i].call(this, args);
				}	
			}
		}	
	});

	ChildGenerator.args = {
		x: null,
		y: null
	};

	Object.defineProperty(ChildGenerator.prototype, "SPRAY", { get: function() { return 'spray'; } });
	Object.defineProperty(ChildGenerator.prototype, "STOP_CREATION", { get: function() { return 'stop_creation'; } });

	return ChildGenerator;
});