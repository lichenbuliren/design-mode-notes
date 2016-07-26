// 数组求差值
var arr1 = [1, 2, 4, 9, 0];
var arr2 = [2, 4, 7, 8];

var difference = function(arr1, arr2) {
  var diff = [];
  var tmp = arr2;

  arr1.forEach(function(val1, i){
    if (arr2.indexOf(val1) < 0) {
      diff.push(val1);
    } else {
      tmp.splice(tmp.indexOf(val1), 1);
    }
  });

  console.log(diff.concat(tmp));
}

difference(arr1, arr2);
