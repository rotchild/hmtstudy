// Generated by CoffeeScript 1.7.1
(function() {
  var Config;

  Function.prototype.property = function(prop, desc) {
    return Object.defineProperty(this.prototype, prop, desc);
  };

  Config = (function() {
    function Config(type) {
      this.type = type;
      this.errMsg = '';
    }

    Config.property('projecttype', {
      get: function() {
        return "" + this.type;
      }
    });

    return Config;

  })();

  module.exports = Config;

}).call(this);

//# sourceMappingURL=config.map
