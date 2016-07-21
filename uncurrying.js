Function.prototype.uncurrying = function() {
  // 此时 selft 是后面例子中的 Array.prototype.push;
  var self = this;

  return function() {
    // arguments: { '0': { '0': 1, length: 1 }, '1': 2 }
    var obj = Array.prototype.shift.call(arguments);
    return self.apply(obj, arguments);
  }
};

// 另外一种实现方式
Function.prototype.uncurrying = function() {
  var self = this;

  return function() {
    return Function.prototype.call.apply(self, arguments);
  }
};

var push = Array.prototype.push.uncurrying();

var obj = {
  "length": 1,
  "0": 1
};

push(obj, 2);
console.log(obj);
