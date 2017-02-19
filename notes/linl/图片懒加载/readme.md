# 图片懒加载(延迟加载)

在图片比较多的页面中，图片过多会导致页面的加载速度缓慢，为了**提高页面加载速度**，我们可以将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。这样对于页面加载性能上会有很大的提升，也提高了用户体验。

### 原理

1. 首先，将页面中的`<img>`的属性`src`指向一张默认小图片(default.png或loading.gif)，然后将自定义属性`data-src`指向真实的图片。（把src指向一张默认的图片，因为当src为空时也会向服务器发送一次请求。)

```html
<img src="default.png" data-src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg" alt="" />
<img src="default.jpg" data-src="http://ww1.sinaimg.cn/large/006y8mN6gw1fa7kaed2hpj30sg0l9q54.jpg" alt="">
```

​	然后，当载入页面时，监听**滚动事件**，将在可视区域内`<img>`的`data-src`属性值附给`src`，然后，用户即将看到的图	片才进行加载，这样便实现了懒加载。

```	js
 window.addEventListener('scroll',lazyload,200);
//可见区域高度
var seeHeight = document.documentElement.clientHeight; 
//页面滚动触发事件
function lazyload() { 
    for (var i = n; i < num; i++) {
      if (img[i].getAttribute("src") != "default.png") continue;
      // 当页面进入可视区域时才替换真实图片
      if (img[i].getBoundingClientRect().top < seeHeight ) {
          img[i].src = img[i].getAttribute("data-src");
        n = i + 1;
      }
    }
```

2.  为了优化性能，使用节流函数。

   因为页面绑定滚动事件，当鼠标滚动时会频繁触发事件，现在使用 **节流函数**，限制触发频率，来优化性能。

```js
//目地：在threshhold时间内，只执行一次fn函数
   // fn 要执行的函数
   // threshhold 延迟时间
     function throttle(fn, threshhold) {
       console.log('lla');
       // 记录上次执行的时间
       var last;
       // 定时器
       var timer;
       // 默认间隔为 250ms
       threshhold || (threshhold = 250);
       // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
       return function () {
         // 保存函数调用时的上下文和参数，传递给 fn
         var context = this;
         var args = arguments;
         var now = +new Date();
         // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
         // 执行 fn，并重新计时
         if (last && now < last + threshhold) {
           clearTimeout(timer);
           // 保证在当前时间区间结束后，再执行一次 fn
           timer = setTimeout(function () {
             last = now;
             fn.apply(context, args)
           }, threshhold);
         // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
         } else {
           last = now;
           fn.apply(context, args);
         }
       }
     }
//监听事件改为
 window.addEventListener('scroll',throttle(lazyload,200));
```

   具体的函数请看[example.html](example/index.html).
