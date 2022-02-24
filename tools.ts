import { useEffect, useState } from 'react';

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) => value === undefined || value === null || value === '';
export const cleanObject = (object: { [key: string]: unknown }) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

// export function throttle(fn: () => void, interval: number) {
//   let enterTime = 0; // 触发的时间
//   const gapTime = interval || 300; // 间隔时间，如果interval不传，则默认300ms
//   return function () {
//     const context = this;
//     const backTime = new Date(); // 第一次函数return即触发的时间
//     if (backTime - enterTime > gapTime) {
//       fn.call(context, ...arguments);
//       enterTime = backTime; // 赋值给第一次触发的时间，这样就保存了第二次触发的时间
//     }
//   };
// }

export function throttle<F extends Function>(fn: F, interval: number) {
  let timer = null;
  let startTime = Date.now();

  return function () {
    let curTime = Date.now();
    let remaining = interval - (curTime - startTime);
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    if (remaining <= 0) {
      fn.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(fn, remaining);
    }
  };
}

export const useDebounce = <V>(value: V, delay?: number) => {
  const [val, setVal] = useState(value);

  useEffect(() => {
    let time = setTimeout(() => {
      setVal(value);
    }, delay);
    return () => {
      clearTimeout(time);
    };
  }, [value, delay]);
  return val;
};

// 处理树形结构数据的key,输出parentId-id-childrenId
export function initTreeKey<T extends { key: string; children: T[] }>(
  preIndex: string,
  list: T[],
  key: string = 'id',
  ifConcat?:boolean
) {
  return list.map((i, index) => {
    if(ifConcat){
      if (!preIndex) {
        i.key = i[key];
      } else {
        i.key = `${preIndex}-${i[key]}`;
      }
    }else {
      i.key = i[key];
    }
    if (i.children) {
      initTreeKey(i.key, i.children,key,ifConcat);
    }
    return i;
  });
}

export function deepForEach(config) {
  const { list, handle, childrenKey = 'children', otherParams } = config;
  // otherParams handle中用的其他参数
  list.forEach((i, index) => {
    handle(i, index, otherParams);
    if (i[childrenKey]) {
      deepForEach({ ...config, list: i[childrenKey] });
    }
  });
}
// 根据key扁平对象数组
export function flatObjArr(list: any[], key: string = 'children') {
  if (!list || !Array.isArray(list)) {
    return list || [];
  }
  let finalList = [...list, list.map((i) => flatObjArr(i[key]))];
  return finalList.flat(Infinity);
}

export const useUrlQueryParam = () => {};

export const debounce = (func, delay = 1000) => {
  let timeout;
  return (...param) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      func(...param);
    }, delay);
  };
};
