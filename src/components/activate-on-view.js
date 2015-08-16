define(["editor-component", "player-getter"], function(EditorComponent, PlayerGetter) {
	var p = {};
	
	var activateParent = function() {
		// Re assign update anf start methods
		this.parent.editorStart = this.parent.saveEditorStart;
		this.parent.editorUpdate = this.parent.saveEditorUpdate;

		// Set some state
		this.parent.activatedOnView = true;
		this.parent.saveEditorStart = null;
		this.parent.saveEditorUpdate = null;

		activateCollider.call(this);
	}

	var deActivateParent = function() {
		// Override the start method and store it in a different variable to restore it later
		if (!this.parent.saveEditorStart) {
			this.parent.saveEditorStart = this.parent.editorStart;
			this.parent.editorStart = function() {};
		}

		// Override the update method and store it in a different variable to restore it later
		if (!this.parent.saveEditorUpdate) {
			this.parent.saveEditorUpdate = this.parent.editorUpdate;
			this.parent.editorUpdate = function() {};
		}

		// Set some state
		this.parent.activatedOnView = false;

		deactivateCollider.call(this);	
	}

	var deactivateCollider = function() {
		var collisionComponent = this.parent.findComponents().firstWithProp('collider');
		
		if (collisionComponent)
			collisionComponent.disable();
	}

	var activateCollider = function() {
		var collisionComponent = this.parent.findComponents().firstWithProp('collider');
		
		if (collisionComponent)
			collisionComponent.enable();
	}

	var ActivateOnView = EditorComponent.extend({
		init: function() {
			this._super();

			// Player is unblocked
			this.onPlayerUnblock = function() {
				if (!this.parent.activatedOnView && this.parent.getViewportVisibility('Main')) {
					activateParent.call(this);
					// Call start on the parent
					this.parent.editorStart();
				}
			}
		},

		editorStart: function(parent) {
			
		},

		editorAdded: function(parent) {
			deActivateParent.call(this);

			PlayerGetter.getAsync(function(player) {
				// Setup a listener to get notified when the player is unblocked
				player.on(player.UNBLOCK, this, this.onPlayerUnblock);
			}.bind(this));

			this.parent.once(this.parent.START, this, function() {
				// Deactive the parent collider after the parent game object has been started
				deactivateCollider.call(this);
			});
		},

		editorUpdate: function(delta) {
			// Was not active, and just became visible
			if (!this.parent.activatedOnView && this.parent.getViewportVisibility('Main')) {

				// Player is blocked, skip
				if (PlayerGetter.get().isBlocked())
					return;

				activateParent.call(this);
				// Call start on the parent
				this.parent.editorStart();
    		}

    		// Was active and just became invisible
    		if (this.parent.activatedOnView && !this.parent.getViewportVisibility('Main')) {
    			deActivateParent.call(this);
				// Call deactivate on the parent
				this.parent.deActivate();
    		}
		},

		recycle: function(parent) {
			PlayerGetter.getAsync(function(player) {
				// Remove the unblock listener
				player.removeDelegate(player.UNBLOCK, this, this.onPlayerUnblock);
			}.bind(this));

			this._super(parent);
		}
	});

	return ActivateOnView;
});