var Singleton = function(name) {
  this.name = name;
};

Singleton.prototype.getName = function() {
  return this.name;
};

Singleton.getInstance = (function() {
  var instance = null;

  return function(name) {
    if (!instance) {
      return instance = new Singleton(name);
    }

    return instance;
  }
})();

var a = Singleton.getInstance('a');
var b = Singleton.getInstance('b');

console.log('a.getName: ' + a.getName(), '\nb.getName: ' + b.getName());
console.log(a === b);
