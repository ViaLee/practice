let isMount = true; // 区分 mount update
let workInProgressHook = null; //当前处理的hook 链表（指针）

const fiber = {
  stateNode: App,
  memorizedState: null, //链表，保存的是组件的所有state
};

function useState(initialState) {
  let hook; //当前useState保存的数据, 链表
  //  ---------- 获取当前useState的数据 start--------------
  if (isMount) {
    // 首次渲染要创建hook
    hook = {
      memorizedState: initialState, //当前状态 num
      next: null,
      queue: {
        //队列，将要改变的队列
        pending: null,
      },
    };
    if (!fiber.memorizedState) {
      // 首次渲染第一个useState 不存在
      fiber.memorizedState = hook;
      workInProgressHook = hook;
    } else {
      // 非首次渲染第二个之后的useState hook 存在
      workInProgressHook.next = hook; //连接形成链表
    }
  } else {
    //  update 获取当前hook
    hook = workInProgressHook;
    workInProgressHook = workInProgressHook.next;
  }
  //  ----------- 获取当前useState的数据 start -------------

  //  ----------- updateState -------------
  //   基于baseState通过dispatchAction获得新的状态
  let baseState = hook.memorizedState; //上一次状态
  if (hook.queue.pending) {
    //   有需要更新的任务
    let firstUpdate = hook.queue.pending.next;
    do {
      // 遍历链表
      const action = firstUpdate.action;
      baseState = action(baseState); //新的状态
      firstUpdate = firstUpdate.next;
    } while (firstUpdate !== hook.queue.pending.next);
    {
      //等于第一个时停止
      hook.queue.pending = null;
    }
  }
  hook.memorizedState = baseState; //更新
  return [baseState, dispatchAction.bind(null, hook.queue)];
}

function dispatchAction(queue, action) {
  // updateState
  // 怎样将 dispatchAction 和 当前state 对应： queue
  const update = {
    //代表一次更新，是个环状链表：因为react中更新有优先级
    action,
    next: null,
  };
  if (queue.pending === null) {
    //当前hook 还没有需要触发的更新，次数 update为首次更新
    // u0->u0->u0
    update.next = update; //形成环状链表
  } else {
    // 插入链表中
    // u1->u0->u1
    // u1:update.next,queue.pending.next:u0
    // queue.pending 链表最后一个update
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;

  schedule(); //触发更新
}

function schedule() {
  workInProgressHook = fiber.memorizedState; //每次更新时 将指针指向 memorizedState
  const app = fiber.stateNode(); //首次 触发render
  isMount = false; // update
  return app;
}

function App() {
  const [num, updataNum] = useState(0); //state 保存在fiber中
  const [num1, updataNum1] = useState(0); //每次useState 都会在fiber中创建一个hook

  return {
    onClick() {
      updataNum(num + 1);
    },
  };
}

window.app = schedule();

// app.onClick()  模拟点击
