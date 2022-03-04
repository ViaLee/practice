// 类型检测
function typeOf(obj) {
  // 评论区里提到的更好的写法
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
typeOf([]); // 'array'
typeOf({}); // 'object'
typeOf(new Date()); // 'date'

// 原型链继承
function Animal() {
  this.colors = ["black", "white"];
}
Animal.prototype.getColor = function () {
  return this.colors;
};
function Dog() {}
Dog.prototype = new Animal();

let dog1 = new Dog();
dog1.colors.push("brown");
let dog2 = new Dog();
console.log(dog2.colors);

// 构造函数继承
function Animal2(name) {
  this.name = name;
  this.getName = function () {
    return this.name;
  };
}
function Dog2(name) {
  Animal.call(this, name);
}
Dog.prototype = new Animal2();

// 组合继承

// 寄生式组合继承

// class 继承
class Animal5 {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

class Dog extends Animal5 {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}

// 数组去重
// Es5
function unique(arr){
  let newArr = arr.filter((item,index,array)=>{
    // array: 调用filter的对象：arr
    // filter 函数为判断条件
    // array.indexOf(item)!==-1    X
    return array.indexOf(item) === index
  })
  return newArr
}
// es6
const unique = arr=>[...new Set(arr)]