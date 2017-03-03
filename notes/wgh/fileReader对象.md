##FileReader对象

	使用FileReader对象,web应用程序可以异步的读取存储在用户计算机上的文件(或者原始数据缓冲)内容,
	可以使用File对象或者Blob对象(存储着大量二进制的大对象)来指定所要处理的文件或数据.
	其中File对象可以为：
	1、来自用户在一个<input>元素上选择文件后返回的FileList对象,
	2、来自拖放操作生成的 DataTransfer对象,
	3、来自在一个HTMLCanvasElement上执行mozGetAsFile()方法后的返回结果.

###用法：
```
	var reader = new FileReader()
```
###属性：

	error:	在读取文件时发生的错误.
	onabort:当读取操作被中止时调用
	onerror:当读取操作发生错误时调用.
	onload:当读取操作成功完成时调用.
	onloadend:当读取操作完成时调用,不管是成功还是失败.该处理程序在onload或者onerror之后调用.
	onloadstart:当读取操作将要开始之前调用.
	onprogress:在读取数据过程中周期性调用.
	readyState:表明FileReader对象的当前状态. 
	{
	EMPTY : 0 : No data has been loaded yet.
	LOADING : 1 : Data is currently being loaded.
	DONE : 2 : The entire read request has been completed. 
	} 
	result:读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.

###方法：

	readAsArrayBuffer()
	开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.
	同时,result属性中将包含一个ArrayBuffer对象以表示所读取文件的内容.

	readAsBinaryString()
	开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.
	同时,result属性中将包含所读取文件的原始二进制数据.


	readAsDataURL()
	开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.
	同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.

###FileReader兼容性：
[http://caniuse.com/#search=fileReader](http://caniuse.com/#search=fileReader)
	
###补充accept使用于文件上传控件
```
	<input type="file" name="pic" accept="" />
```
	
	image/*,audio/*,video*

	image/gif

####accept兼容性：Internet Explorer 10、Firefox、Opera、Chrome 和 Safari 6 支持 accept 属性。
[http://caniuse.com/#search=accept](http://caniuse.com/#search=accept)

