##JavaScript 中如何实现函数队列


### 假设你有几个函数fn1、fn2和fn3需要按顺序调用，最简单的方式当然是：
fn1();  
fn2();  
fn3();  

### 但有时候这些函数是运行时一个个添加进来的，调用的时候并不知道都有些什么函数；这个时候可以预先定义一个数组，添加函数的时候把函数push 进去，需要的时候从数组中按顺序一个个取出来，依次调用： 
	var stack = [];
	// 执行其他操作，定义fn1
	stack.push(fn1);
	// 执行其他操作，定义fn2、fn3
	stack.push(fn2, fn3);
	// 调用的时候
	stack.forEach(function(fn) { fn() });

这样函数有没名字也不重要，直接把匿名函数传进去也可以

	var stack = [];
 
	function fn1() {
    	console.log('第一个调用');
	}
	stack.push(fn1);
 
	function fn2() {
    	console.log('第二个调用');
	}
	stack.push(fn2, function() { 
		console.log('第三个调用') 
	});
 
	stack.forEach(function(fn) {
		fn() 
	}); 
	// 按顺序输出'第一个调用'、'第二个调用'、'第三个调用'


这个实现目前为止工作正常，但我们忽略了一个情况，就是异步函数的调用。  
假如stack 队列中有某个函数是类似的 `异步函数` ，我们的实现就乱套了：  

	var stack = [];
 
	function fn1() { 
		console.log('第一个调用') 
	};
	stack.push(fn1);
 
	function fn2() {
    	setTimeout(function fn2Timeout() {
         	console.log('第二个调用');
    	}, 0);
	}
	stack.push(fn2, function() { 
		console.log('第三个调用') 
	});
 
	stack.forEach(function(fn) { fn() }); 
	// 输出'第一个调用'、'第三个调用'、'第二个调用'

问题很明显，fn2确实按顺序调用了，但setTimeout里的function fn2Timeout() { console.log('第二个调用') }却不是立即执行的（即使把timeout 设为0）；fn2调用之后马上返回，接着执行fn3，fn3执行完了然才真正轮到fn2Timeout.  
 这里的关键在于fn2Timeout，我们必须等到它真正执行完才调用fn3，理想情况下大概像这样

	function fn2() {
    	setTimeout(function() {
        	fn2Timeout();
        	fn3();
    	}, 0);
	}
但这样做相当于把原来的fn2Timeout整个拿掉换成一个新函数，再把原来的fn2Timeout和fn3插进去。做肯定是能做，写起来很绕，容易把自己绕进去，有没更好的办法？

我们退一步，不强求等fn2Timeout完全执行完才去执行fn3，而是在fn2Timeout函数体的最后一行去调用：

	function fn2() {
    	setTimeout(function fn2Timeout() {
        	console.log('第二个调用');
        	fn3();       // 注{1}
    	}, 0);
	}
这样看起来好了点，不过定义fn2的时候都还没有fn3，这fn3哪来的？

还有一个问题，fn2里既然要调用fn3，那我们就不能通过stack.forEach去调用fn3了,否则fn3会重复调用两次。

我们不能把fn3写死在fn2里。

相反，我们只需要在fn2Timeout末尾里找出stack中fn2的下一个函数，再调用：

	function fn2() {
    	setTimeout(function fn2Timeout() {
       		console.log('第二个调用');
       	 	next();
    	}, 0);
	}

这个next函数负责找出stack 中的下一个函数并执行。我们现在来实现next：  

	var index = 0;
 
	function next() {
    	var fn = stack[index];
    	index = index + 1; // 其实也可以用shift 把fn 拿出来
    	if (typeof fn === 'function') fn();
	}

next通过stack[index]去获取stack中的函数，每调用next一次index会加1，从而达到取出下一个函数的目的。

	var stack = [];
 
	// 定义index 和next(上文)
 
	function fn1() {
    	console.log('第一个调用');
    	next();  // stack 中每一个函数都必须调用`next`
	};
	stack.push(fn1);
 
	function fn2() {
    	setTimeout(function fn2Timeout() {
         	console.log('第二个调用');
         	next();  // 调用`next`
    	}, 0);
	}
	stack.push(fn2, function() {
    	console.log('第三个调用');
    	next(); // 最后一个可以不调用，调用也没用。
	});
 
	next(); 
	// 调用next，最终按顺序输出'第一个调用'、'第二个调用'、'第三个调用'。


现在stack.forEach一行已经删掉了，我们自行调用一次next，next会找出stack中的第一个函数fn1执行，fn1 里调用next，去找出下一个函数fn2并执行，fn2里再调用next，依此类推。

每一个函数里都必须调用next，如果某个函数里不写，执行完该函数后程序就会直接结束，没有任何机制继续。
