##setTimeout


###1.setTimeout回调函数的this


###2.setTimeout()不止两个参数


###3.setTimeout原理 及setTimeout与0的姻缘
	setTimeout 时间间隔为500ms；可由于while循环的存在，只有当间隔时间大于1000毫秒时才会跳出while循环；
	1000毫秒之前由于while循环占据着javascript线程。而javascript是单线程执行的，在任何时间点，有且只有一个线程在运行javascript程序；
	所以只有跳出while后，线程才会空闲下来，才会去执行setTimeout.即主线程的语句和方法，会阻塞定时任务的运行，执行引擎只有在执行完主线程的语句后，
	定时任务才会实际执行，这期间的时间，可能大于注册任务时设置的延时时间。

	事件循环模型：Javascript执行引擎之外，有一个任务队列，当在代码中调用setTimeout()方法时，注册的延时方法会交由浏览器内核其他模块
	（以webkit为例，是webcore模块）处理，当延时方法到达触发条件，即到达设置的延时时间时，这一延时方法被添加至任务队列里。这一过程由浏览器内核其他模块处理，
	与执行引擎主线程独立，执行引擎在主线程方法执行完毕，到达空闲状态时，会从任务队列中顺序获取任务来执行，这一过程是一个不断循环的过程，称为事件循环模型。

	小结：setTimeout只能保证在指定的时间后将任务插入任务队列中等候，但是不保证这个任务在什么时候执行，
	一旦执行javascript的线程空闲出来，自行从队列中取出任务并执行它。（队列机制）

	补充：浏览器的内核是多线程的，它们在内核控制下相互配合以保持同步，一个浏览器至少实现三个常驻线程：javascript引擎线程；GUI渲染线程；
	浏览器事件触发线程。
 
	javascript引擎是基于事件驱动单线程执行的，javascript引擎一直等待着任务队列中的任务的到来并加以处理，
	浏览器无论什么时候都只有一个javascript线程在运行javascript程序。


	GUI渲染线程负责渲染浏览器的界面，当界面需求重绘（repaint）或由于某些操作引发的回流（reflow）时会执行，
	GUI线程与javascript引擎是互斥的，当javascript引擎执行时，GUI线程会被挂起，
	GUI更新会保存在一个队列中等到javascript引擎空闲时立即被执行


	事件触发线程：当一个事件被触发，该线程把事件添加到待处理队列的队尾，等待javascript引擎的处理。
	（事件可来源于当前javascript引擎执行代码块如setTImeout，浏览器内核的其他线程如鼠标点击、ajax异步请求等）


	setTimeout(function(){},0);(表象的立即执行函数，实际实现的是插队操作，要求浏览器尽可能快地进行回调，目的在于改变任务的执行顺序)；
	因为浏览器会默认执行完当前任务队列的任务，再执行setTimeout队列中积累的任务。

	[http://www.cnblogs.com/Medeor/p/4945687.html](http://www.cnblogs.com/Medeor/p/4945687.html]
	(http://www.cnblogs.com/Medeor/p/4945687.html](http://www.cnblogs.com/Medeor/p/4945687.html)