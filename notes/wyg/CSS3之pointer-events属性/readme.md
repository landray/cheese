### css3属性：pointer-events

#### 说明：

**设置或检索在何时成为属性事件的target。 **CSS属性指针事件允许作者在什么情况下控制（如果有）一个特定的元素可以成为鼠标事件的目标。（感觉好枯燥无力的解释，有没有）

#### 取值：

**auto**：

与pointer-events属性未指定时的表现效果相同。在svg内容上与`visiblepainted`值相同

**none**：

正常情况来说，元素永远不会成为鼠标事件的target。但是，当其后代元素的pointer-events属性指定其他值时（**一定要传**），鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶触发父元素的事件侦听器。还有，它支持冒泡。

**简单一点**：   顾名思意，就是**鼠标事件拜拜**的意思。元素应用了该CSS属性值，链接啊，点击啊什么的都变成了“浮云牌酱油”。

**ps**: 还有其它好多值（ visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit )，这些值只能应用在**SVG**上。

#### 用法：

例子1：img标签

```css
<style>
  img {
  	pointer-events: none;
  }
</style>
<img src="images/641.jpg" title="img">
```

例子2：a标签

```html
<style>
  a {
  	pointer-events: none;
  }
</style>
<a href="https://www.baidu.com" >测试(我是有pointer-events属性的)</a>
```

ps: 但是它不能阻止键盘；通过键盘还是可以选到它；那怎么办？ 有一个办法：**把href值去掉；**

#### 兼容情况：

移动端大部分都支持，ie只有11支持;

 ![kk_image](example\images\kk_image.png)