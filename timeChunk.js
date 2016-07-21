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

var data = [];

for (var i = 0; i <= 1000; i++) {
  data.push(i);
}

var renderFriendList = timeChunk(data, function(n) {
  var div = document.createElement('div');
  var color = n % 2 == 0 ? '#fff' : '#ccf';
  div.innerHTML = n;
  div.style.backgroundColor = color;
  document.body.appendChild(div);
}, 10, 200);

renderFriendList();
