// 在软件开发中也常常遇到类似的情况，
// 实现某一个功能有多种算法或者策略，
// 我们可以根据环境或者条件的不同选择不同的算法或者策略来完成该功能。


/**
 * 这里我们编写一个计算工资的 Demo
 * 表现为 S 级别的为工资乘以4
 * 表现为 A 级别的为工资乘以3
 * 表现为 B 级别的为工资乘以2
 * @type {Object}
 */
var strategies = {
  "S": function(salary) {
    return salary * 4;
  },
  "A": function(salary) {
    return salary * 3;
  },
  "B": function(salary) {
    return salary * 2;
  }
};

var calculateBonus = function(level, salary) {
  return strategies[level](salary);
};

console.log(calculateBonus("S", 12000));
console.log(calculateBonus("A", 2000));
console.log(calculateBonus("B", 1000));
