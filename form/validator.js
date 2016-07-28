var Validator = function() {
  this.cache = [];
};

Validator.prototype.add = function(val, rule, errorMsg) {
  var ruleArr = rule.split(':');
  this.cache.push(function() {
    var strategy = ruleArr.shift(); //策略函数
    ruleArr.unshift(val); //将要检验的值压入数组第一位
    ruleArr.push(errorMsg);
    return strategies[strategy].apply({}, ruleArr);
  });
};

Validator.prototype.start = function() {
  for (var i = 0, validatorFun; validatorFun = this.cache[i++];) {
    var msg = validatorFun();
    if (msg) {
      return msg;
    }
  }
}
