## JavaScript 设计模式与开发实践读书笔记

### 1、currying 函数柯里化
currying 又称*部分求值*。一个 currying 的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，将刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性的用于求值。

假设我们需要编写一个计算每个月开销的函数，在每天结束之前，我们要记录每天花掉了多少钱。

通用 currying 函数：
```javascript
var currying = function(fn) {
  var args = [];

  return function() {
    if (arguments.length === 0) {
      return fn.apply(this, args);
    } else {
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
cost(300);
cost(500);

// 求值输出
console.log(cost());
```

### 2、uncurrying 函数
``` javascript
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
```

### 3、函数节流
JavaScript 中的函数大多数情况下都是由用户主动调用触发的，除非是函数本身的实现不合理，否则我们一般不会遇到跟性能相关的问题。但是在一些少数情况下，函数的触发不是有由用户直接控制的。在这些场景下，函数有可能被非常频繁的调用，而造成大的性能问题。

函数被频繁调用的场景：

- window.onresize 事件
- mousemove 事件
- 上传进度

#### 函数节流原理

上面三个提到的场景，可以发现它们面临的共同问题是函数被触发的频率太高。

比如我们在 window.onresize 事件中要打印当前浏览器窗口大小，在我们拖拽改变窗口大小的时候，控制台1秒钟进行了 10 次。而我们实际上只需要 2 次或者 3 次。这就需要我们按时间段来忽略掉一些事件请求，比如确保在 500ms 内打印一次。很显然，我们可以借助 setTimeout 来完成。

#### 函数节流实现

``` javascript
/**
 * 函数节流实现
 * @param  {Function} fn       需要节流执行的函数
 * @param  {[type]}   interval 事件执行间隔时间，单位 ms
 * @return {[type]}            [description]
 */
var throttle = function(fn, interval) {
  var _self = fn,
      timer,
      firstTime = true;

  console.log(_self);

  return function() {
    var args = arguments,
        _me = this;  // 这里代表当前的匿名函数

    console.log(_me);

    if (firstTime) {
      _self.apply(_me, args);
      return firstTime = false;
    }

    if (timer) {
      return false;
    }

    timer = setTimeout(function() {
      clearTimeout(timer);
      timer = null;
      _self.apply(_me, args);
    }, interval || 500);
  };
};

window.onresize = throttle(function() {
  console.log('test');
}, 500);
```

### 4、分时函数

我们经常会遇到这么一种情况，某些函数确实是用户主动调用的，但是因为一些客观原因，这些函数会严重地影响页面性能。

一个例子就是创建 WebQQ 的 QQ 好友列表。列表中通常会有成百上千个好友，如果一个好友用一个节点来表示，当我们在页面中渲染这个列表的时候，可能要一次性往页面中创建成百上千个节点。

在短时间内往页面中大量添加 DOM 节点显然也会让浏览器吃不消，我们看到的结果往往就是浏览器的卡顿甚至假死。所以我们需要一个分时函数来解决这个问题

``` javascript
/**
 * 分时函数例子
 * 以创建 WebQQ 列表为例
 * @param  {[type]}   data     函数执行需要用到的数据
 * @param  {Function} fn       真正需要分时执行的函数
 * @param  {[type]}   count    每次创建一批节点的数量
 * @param  {[type]}   interval 函数执行间隔
 * @return {[type]}            [description]
 */
var timeChunk = function(data, fn, count, interval) {
  var t;

  var len = data.length;

  var start = function() {
    for (var i = 0; i < Math.min(count || 1, data.length); i++) {
      var obj = data.shift();
      fn(obj);
    }
  }

  return function() {
    t = setInterval(function() {
      if (data.length === 0) {
        return clearInterval(t);
      }

      start();
    }, interval);
  }
}
```

### 5、惰性加载函数

以创建事件绑定函数为例：
在进入第一个条件分支之后，在函数内部重写这个函数，重写之后，就是我们所需要的函数，在下一次进入的时候，就不再需要判断了。

``` javascript
/**
 * 事件绑定
 * @param {[type]} el      [description]
 * @param {[type]} type    [description]
 * @param {[type]} handler [description]
 */
var addEvent = function(el, type, handler) {
  if (window.addEventListener) {
    addEvent = function(el, type, handler) {
      el.addEventListener(type, handler, false);
    }
  } else if (window.attachEvent) {
    addEvent = function(el, type, handler) {
      el.attachEvent('on' + type, handler);
    }
  }

  addEvent(el, type, handler);
}
```
