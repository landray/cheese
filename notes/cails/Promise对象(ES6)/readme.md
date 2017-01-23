# ES6 Promise

## 场景: 进行连续几次的异步获取数据

​	假设我们需要一个应用需要加载一堆组件(即加载组件的入口文件index.js)，需要加载的组件路径记录在modules.json中; 并且组件内部可能需要引入静态的图片或者其他相关文件(在组件入口文件中指明是否需要引入这些静态资源)，这些要引入的静态资源路径放在组件目录下的assets.json中。

​	即我们需要分成以下步骤加载组件：

​	1) 请求modules.json

​	2) 根据modules.json指明的路径请求组件入口文件index.js

​	3) 根据index.js中的信息决定是否请求组件内部静态资源; 若需要请求资源，转步骤4)，若不需要请求静态资源，转步骤6)

​	4) 根据index.js中assets.json的路径信息请求组件内部的assets.json

​	5) 根据assets.json中的路径信息请求静态资源数据

​	6) 处理请求到数据，组件加载完毕

​	以上过程可用以下代码表示：

```javascript
$.get('modules.json', function (modules) {
  // ... 假设modules被处理成组件入口路径组成的数组
  modules.forEach(function (url) {
    $.get(url, function (module) {
      // 记录组件信息
      if (module.assetsUrl) {
        $.get(module.assetsUrl, function (assets) {
          // ... 假设assets为静态资源路径组成的数组
          assets.forEach(function (item) {
            $.get(item, function (asset) {
              // 处理静态资源
            })
          })
        })
      }
    })
  })
})
```

所出现的 **问题** ：

当这条获取数据的链条不断延长，所嵌套的回调层数会越深( **回调陷阱** )；

此时还未包括失败回调，若加上失败回调，代码将更 **难以阅读** 。

问题 **梳理** ：

js是单线程的，现实中的时间线也是单线程的，我们知道从表A到表C获取数据的逻辑顺序，且关心获取数据的成与败，但我们无需把我们等待结果这件事描述进我们的代码中。

套用此场景，则，(任意一处获取数据失败都导致最终失败)

以往编程思路： 请求modules.json→等待期，获得组件index.js路径→请求index.js→等待期，获得组件assets.json路径→请求assets.json→等待期，获得组件静态资源路径→请求静态资源→完成；

优化思路： 请求modules.json→请求组件index.js→请求asset.json→请求静态资源→完成

**Promise**便是这种优化思路的体现。



参考: [ES6 JavaScript Promise的感性认知](http://www.zhangxinxu.com/wordpress/2014/02/es6-javascript-promise-%E6%84%9F%E6%80%A7%E8%AE%A4%E7%9F%A5/)



## Promise 详解

### Promise 概念

简单来说，Promise就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。Promise比传统的回调函数和事件更合理和强大，是一种新的异步编程解决方案。

### Promise 状态

`Promise`对象代表一个异步操作，有三种状态：`Pending`（进行中）、`Resolved`（已完成，又称Fulfilled）和`Rejected`（已失败）。

### Promise 特点

1. 对象的状态不受外界影响：只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

2. 状态一旦改变，就不会再变：`Promise`对象的状态改变，只有两种可能：从`Pending`变为`Resolved`和从`Pending`变为`Rejected`，一旦状态变为`Resolved`或者`Rejected`，状态就固定下来，不再发生变化。

### Promise 基本用法

```javascript
var promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

```javascript
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    var image = new Image();
    image.onload = function() {
      resolve(image);
    };
    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };
    image.src = url;
  });
}
var promise = loadImageAsync('http://img.zcool.cn/community/012bde56f243c632f875a944e339e9.png');
promise.then(function(img) {
  console.log('图片可访问');
}).catch(function(err) {
  console.log(err);
});
```



### Promise 原型方法

#### Promise.prototype.then

​	接收两个参数，即普遍意义上的成功回调与失败回调。

​	返回新的Promise对象，故可进行链式操作。

```javascript
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("Resolved: ", comments),
  err => console.log("Rejected: ", err)
);
```

#### Promise.prototype.catch

​	`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

需要注意的是：

1. `then`方法指定的回调函数，如果运行中抛出错误，也会被`catch`方法捕获。
2. 如果Promise状态已经变成`Resolved`，再抛出错误是无效的。
3. 错误总是会被下一个`catch`语句捕获。
4. 一般来说，不要在`then`方法里面定义Reject状态的回调函数（即`then`的第二个参数），总是使用`catch`方法。因为`catch`方法更接近于同步的写法（`try/catch`），也更易阅读，且可以捕获前面then方法抛出的异常。
5. Promise对象抛出的错误不会传递到外层代码



### Promise 静态方法

#### Promise.all

​	`Promise.all`方法用于将多个Promise实例，包装成一个新的Promise实例。

```javascript
var p = Promise.all([p1, p2, p3]);
```

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

（1）只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

（2）只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

具体例子：

```javascript
// 生成一个Promise对象的数组
var promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON("/post/" + id + ".json");
});

Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});
```



#### Promise.race

```javascript
var p = Promise.race([p1, p2, p3]);
```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

#### Promise.resolve

`Promise.resolve`方法将现有对象转为Promise对象。

`Promise.resolve`方法的参数分成四种情况。

1. **参数是一个Promise实例**

   如果参数是Promise实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。	

2. **参数是一个thenable对象**

   `thenable`对象指的是具有`then`方法的对象。

   `Promise.resolve`方法会将这个对象转为Promise对象，然后就立即执行`thenable`对象的`then`方法。

   ```javascript
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };

   let p1 = Promise.resolve(thenable);
   p1.then(function(value) {
     console.log(value);  // 42
   });
   ```

3. **参数不是具有then方法的对象，或根本就不是对象**

   如果参数是一个原始值，或者是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的Promise对象，状态为`Resolved`。

4. **不带有任何参数**

   `Promise.resolve`方法允许调用时不带参数，直接返回一个`Resolved`状态的Promise对象。

#### Promise.reject

​	`Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

注意：`Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致。

```javascript
const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
};

Promise.reject(thenable)
.catch(e => {
  console.log(e === thenable)
})
// true
```

参考：[ECMAScript 6入门](http://es6.ruanyifeng.com/#docs/promise)

