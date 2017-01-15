# 一、伪元素的妙用 :before :after 

## 1、清除浮动

```css
:clearfix: {
  content: '',
  display: table;
  clear: both
}
```

##  2、增强用户体验，使用伪元素实现增大点击热区 

> 有什么办法在不改变按钮大小的情况下增大它的点击区域？

```css
// 伪元素可以代替宿主元素来响应鼠标交互事件
.btn:before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
}
```

# 二、纯css的导航栏切换方案

## 1、:target 伪类选择器

> `:target` 是 CSS3 新增的一个伪类，可用于选取当前活动的目标元素。当然 URL 末尾带有锚名称 #，就可以指向文档内某个具体的元素。这个被链接的元素就是目标元素(target element)。它需要一个 id 去匹配文档中的 target 。

假设我们的 HTML 代码如下：
```html
<ul class='nav'>
    <li><a href="#content1">列表1</a></li>
    <li><a href="#content2">列表2</a></li>
</ul>
<div id="content1">列表1内容:123456</div>
<div id="content2">列表2内容:abcdefgkijkl</div>
```
上面 <a href="#content1"> 中的锚点 #content1 就对应了列表1 <div id="content1"> 。锚点2与之相同对应列表2。
我们就可以使用 :target 接受到点击事件，并操作对应的 DOM 了：
```css
#content1,
#content2{
    display:none;
}

#content1:target,
#content2:target{
    display:block;
}
```
上面的 CSS 代码，一开始页面中的 #content1 与 #content2 都是隐藏的，当点击列表1触发 href="#content1" 时，页面的 URL 会发生变化：
1、由 www.example.com 变成 www.example.com#content1
2、接下来会触发 #content1:target{ } 这条 CSS 规则，#content1 元素由 display:none 变成 display:block ，点击列表2亦是如此。
如此即达到了 Tab 切换
[demo1](http://codepen.io/Chokcoco/pen/mAxQBv)

## 2、`<input type="radio"` && `<label for="">`

假设有这样一个结构
```html
<input class="nav1" type="radio">
<ul class='nav'>
    <li>列表1</li>
</ul>
```
对于上面的结构，当我们点击 <input class="nav1" type="radio"> 单选框表单元素的时候，使用 :checked 是可以捕获到点击事件的。
```css
.nav1:checked ~ .nav li {
  // 进行样式操作
}
```
但是，这里有个问题 我们的 Tab 切换，要点击的是<li>元素，而不是表单元素，所以这里很重要的一点是，使用 <label for=""> 绑定表单元素。看看如下结构：
```html
<input class="nav1" id="li1" type="radio">
<ul class='nav'>
    <li><label for="li1">列表1</label></li>
</ul>
```
通过使用 <label> 包裹一个 <li> 元素，而 <label> 有一个属性 for 可以绑定一个表单元素。
上面的 <li> 中，有一层 <label for="li"> ，里面的 for="li1" 意思是绑定 id 为li1 的表单元素。

> label 标签中的 for 定义：for 属性规定 label 与哪个表单元素绑定。

这样改造之后，当我们点击 <li> 元素的时候，相当于点击了 <input class="nav1" id="li1" type="radio"> 这个单选框表单元素，而这个表单元素被点击选中的时候，又可以被 :checked 伪类捕获到。
这个时候，我们就可以将页面上的表单元素隐藏，做到点击 <li> 相当于点击表单：
```
input{
    display:none;
}
```
[demo2](https://codepen.io/Chokcoco/pen/VKXXEq)