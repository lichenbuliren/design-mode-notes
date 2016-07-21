var currying = function(fn) {
  var args = [];

  return function() {
    if (arguments.length === 0) {
      return fn.apply(this, args);
    } else {
      // 这里使用 apply 允许我们传入多个值
      [].push.apply(args, arguments);
      // 返回函数本身，这里指向 return 后面的匿名函数！
      return arguments.callee;
    }
  }
};

var cost = (function() {
  // 闭包存储最后的值
  var money = 0;

  return function() {
    for (var i = 0, len = arguments.length; i < len; i++) {
      money += arguments[i];
    }

    return money;
  }
})();

// 转化成 currying 函数
// 这个时候，闭包内部的 fn 指向真正的求值函数
// 也就是 cost 自运行的时候返回的匿名函数
var cost = currying(cost);

cost(200);
cost(300,100);
cost(500);

// 求值输出
console.log(cost());
