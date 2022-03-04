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

<!-- ## 继承

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
``` -->

## 数组去重

```js
// Es5
function unique(arr) {
  let newArr = arr.filter((item, index, array) => {
    // array: 调用filter的对象：arr
    // filter 函数为判断条件
    // array.indexOf(item)!==-1    X
    return array.indexOf(item) === index;
  });
  return newArr;
}
// es6
const unique = (arr) => [...new Set(arr)];
```
<!-- 
## 数组扁平化

```js
const flat = (arr)=>{
  let result = []

}
[1, [2, [3]]].flat(2)  // [1, 2, 3]


``` -->