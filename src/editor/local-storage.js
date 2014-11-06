define(function(require) {
  var gb = require('gb');

  var LocalStorage = require('delegate').extend({
    init: function () {
      try {
          localStorage.setItem('testEntry', 'testValue');
          localStorage.removeItem('testEntry');

          this.available = true;
      } catch(e) {
          this.execute(this.LOCAL_STORAGE_NOT_AVAILABLE);

          this.available = false;
      }
    },

    setLevel: function (key, value) {
      this.setItem.call(this, 'level_' + key, value);
    },

    getLevel: function (key, value) {
      this.getItem.call(this, 'level_' + key);
    },

    removeLevel: function (key) {
      this.removeItem.call(this, 'level_' + key);
    },

    getAllLevelKeys: function() {
      available.call(this);

      return Object.keys(localStorage).filter(function(key) {
        return key.search(/^level_/) != -1;
      });
    },

    clearLevels: function () {
      available.call(this);

      var levels = this.getAllLevelKeys();

      for (var i = 0; i < levels.length; i++) {
        this.removeItem.call(this, thie.levels[i]);
      };
    },

    clear: function () {
      available.call(this);

      localStorage.clear();
    }
  });

  var available = function() {
    if (!this.available) {
      throw new Error('Local Storage Not Available');
    }
  }

  var setItem = function (key, value) {
    available.call(this);

    try {
      localStorage.setItem(key, value);
    } catch (e) {
      this.execute(this.STORAGE_LIMIT_REACHED, {
        key: key,
        value: value
      });
    }
  }

  var removeItem = function (key) {
    available.call(this);

    localStorage.removeItem(key);
  }

  var getItem = function (key) {
    available.call(this);

    return localStorage.getItem(key);
  }

  Object.defineProperty(LocalStorage.prototype, "LOCAL_STORAGE_NOT_AVAILABLE", { get: function() { return 'local_storage_not_available'; } });
  Object.defineProperty(LocalStorage.prototype, "LOCAL_STORAGE_LIMIT_REACHED", { get: function() { return 'local_storage_limit_reached'; } });

  return new LocalStorage();
});