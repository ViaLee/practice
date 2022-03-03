# 手写题

## 类型检测

```js
function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
typeOf([]); // 'array'
typeOf({}); // 'object'
typeOf(new Date()); // 'date'
```

## 继承

### 原型链继承

```js
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
```
