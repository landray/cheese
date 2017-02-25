



**图片加载失败   想用默认图片代替，怎么做？？？**



### onerror事件

onerror 事件会在文档或图像加载过程中发生错误时被触发。

在装载文档或图像的过程中如果发生了错误，就会调用该事件句柄。

**支持该事件的 HTML 标签：**

```html
<img>, <object>, <style>...
```

**支持该事件的 JavaScript 对象：**

```javascript
window, image...
```

#### **例子：**

window: 

- 当**JavaScript运行时错误**（包括语法错误）发生时，**window**会触发一个error事件，并执行**window.onerror**事件。
- 当一项资源（如**<`img`>**或**`<script>`**）加载失败，加载资源的元素会触发一个error事件，并执行该元素上的onerror()处理函数。这些error事件不会向上冒泡到window.


#### 语法：

由于历史原因，`window.onerror`和`element.onerror`接受不同的参数。



window.error  语法：

```javascript
window.onerror = function(message, source, lineno, colno, error) { ... }
```



- `message`：错误信息（字符串）。
- `source`：发生错误的脚本URL（字符串）
- `lineno`：发生错误的行号（数字）
- `colno`：发生错误的列号（数字）
- `error`：[Error对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)（对象）




element.onerror  语法

- ```javascript
  element.onerror = function(event) { ... }
  ```



当加载自[不同域](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)的脚本中发生语法**(?)**错误时，为避免信息泄露），语法错误的细节将不会报告，而代之简单的**"Script error."**。



#### 代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  
  <img src="">
  
  <script>
    
    var img = document.getElementsByTagName('img')[0];

    // img.onload = function () {
    //   alert('加载完成');
    // }
    img.onerror = function (e) {
      console.log(e);
      img.onerror = null; //很重要，否则进入死循环
      img.setAttribute('src','images/641.jpg');
    }

    // img-onerror错误不会冒泡到window上面
    window.onerror =function (msg, src, lineNum, colNum, err){
      alert('[ERROR in line ' + lineNum + ', col ' + colNum + '][' + msg + '](' + src + ') ' + err);
    };

    //设置src
    img.setAttribute('src','images/641.jpga');
    
    err();
  </script>
  
  <!-- <script src="err.js"></script> -->
  <script src="https://www.baidu.com/image/err.js"></script>
</body>
</html>
```

