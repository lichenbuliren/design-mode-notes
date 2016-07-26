function Person() {

};

// friend 指向一个构造函数 Person 默认的原型对象
var friend = new Person();

// 这里从写了构造函数 Person() 的原型对象，相当于一个新的原型对象
Person.prototype = {
  constructor: Person,
  name: 'Heaven',
  sayName: function() {
    console.log(this.name);
  }
};


// 默认的 Person() 对象中没有 sayName() ，所以这里报错
// friend.sayName();

// 这里的 friend2 指向重写过后的 Person() 的原型对象，
// 新的原型对象中有 sayName() 方法， 故这里能够正确的调用 sayName() 函数
var friend2 = new Person();
friend2.sayName();

// 原型式继承 == Object.create();
function object(obj) {
  function F(){};
  F.prototype = obj;

  return new F();
};


