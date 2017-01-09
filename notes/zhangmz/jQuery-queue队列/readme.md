# jquery 队列使用

jquery的队列对于一系列需要按次序运行的函数特别有用。特别animate动画，ajax，以及timeout等需要一定时间或者异步的函数。

## 1. 队列初始化

首先建议建立了一个函数数组，里边是一些列需要依次执行的动画，
然后定义一个函数，用dequeue方法用来执行队列中的下一个函数

```javascript
/* @param fx为队列名，默认为'fx'
 * @param functionArray为函数数组
 * @return this
 */
$(dom).queue(fx, functionArray); 
```

functionArray中的每一个function执行完回调中需要调用```$(dom).dequeue(fx);```

用来保证数组中的函数可以依次执行。

## 2. 队列执行

```javascript
/* @param fx为队列名
 * @return this
 */
$(dom).dequeue(fx);
```

## 3. 清除队列

```javascript
/* @param fx为队列名
 * @return this
 */
$(dom).clearQueue(fx);;
```

## 4. 队列中所有的任务执行完回调

```javascript
// @param fx为队列名
// @return promise, promise是Deferred对象的简化版
var promise = $(dom).promise(fx);
// callback是回调函数
promise.done(callback);
```

## 5. 例子

```javascript
// 函数数组
// 在jq1.3以上，如果不是函数，在dequeue执行时会报错
var functionArray = [
    function () {
      console.log('11111111')
      $(document).dequeue("myQueue")
    },
    function () {
      console.time('time1')
      setTimeout(function () {
        console.log('延迟1.5s打印的')
        console.timeEnd('time1')
        $(document).dequeue("myQueue")
      }, 1500)
    },
    function () {
      console.time('time2')
      setTimeout(function() {
        console.log('延迟4s打印的')
        console.timeEnd('time2')
        // 清空队列
        $(document).clearQueue("myQueue");
      }, 4000)
    },
    function () {
      console.log('上面清空队列了，这个函数不会执行')
    }
  ];
  // 初始化队列，不加队列名时默认为fx
  $(document).queue('myQueue', functionArray);
  // promise是Deferred对象的简化版
  var promise = $(document).promise('myQueue');
  // 所有队列执行完
  promise.done(function() {
    console.log('所有队列都执行完了');
  })
  // 队列开始执行
  $(document).dequeue("myQueue");
```

## 6. 自己实现队列效果

```javascript
class Queue {
  constructor(tasks) {
    this.tasks = tasks
    
    setTimeout(function () {
      this.next()
    }.bind(this), 0)
  }

  next () {
    let fn = this.tasks.shift()
    fn && fn()
  }

  clear () {
    this.tasks.length = 0
  }
}
```