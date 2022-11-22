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

function render(){
  const list = [{id:'name',colNum:1},
  {id:'gender',colNum:4},
  {id:'gender',colNum:3},
  {id:'gender',colNum:3},
  {id:'gender',colNum:2}]
  let row = []
  const parentElement = $('div')
  const sum = 0
  for(let i=0;i<list.length;i++){
    sum += i.colNum
    if(sum>4){
      // 加上当前这项超过4就只渲染这项之前的
      parentElement.append(`
      // row 里存的项,结合
      `)
      // 添加之后清空row
      row = []
    }else if(sum===4){
      // 加上当前这项 刚好等于4
      row.push(i)
      parentElement.append(`
      // row 里存的项
      `)
    }else{
      row.push(i)
    }
  }
}



function render(){
  const list = [{id:'name',colNum:1},
  {id:'gender',colNum:4},
  {id:'gender',colNum:3},
  {id:'gender',colNum:3},
  {id:'gender',colNum:2}]
  return <Form>
    <Row gutter={12} wrap>
    {list.map(i=><Col span={6*i.colNum} >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      </Col>
    )
    }
    </Row>
  </Form>
}


