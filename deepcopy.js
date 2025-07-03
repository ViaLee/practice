// 手写深拷贝
// weakMap
// 遍历
// 递归？ 嵌套
// 对象深拷贝
// {a: 1, b: {c: 2},d:function(){},e:[1,2,3],f:{g:{h:1}}
// typeof [a,b,c] object
// typeof null object
// typeof undefined undefined
// typeof fn function
const obj = {
  a: 1,
  b: {
    c: 2,
  },
  d: function () {},
  e: [1, 2, 3],
  f: {
    g: {
      h: 1,
    },
  },
};

function deepCopy(obj) {
  if (typeof obj !== "object") {
    return obj;
  }
  const newObj = Array.isArray(obj) ? [] : {}; //区分数组和对象
  if (typeof obj === "object") {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepCopy(obj[key]);
      }
    }
  }
}
