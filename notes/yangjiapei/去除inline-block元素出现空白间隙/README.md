# 去除inline-block元素出现空白间隙

```html
<ul>
  <li>item1</li>
  <li>item2</li>
  <li>item3</li>
  <li>item4</li>
  <li>item5</li>
</ul>
```

```css
*{
  margin: 0;
  padding: 0;
}
ul {
  list-style: none outside none;
  padding: 10px;
  background: green;
  text-align: center;
}
ul li {
  display: inline-block;
  *display: inline;
  zoom: 1;
  background: orange;
  padding: 5px;
}
```

原因： 元素间留白间距出现的原因就是标签段之间的空格

## 方法一: 改变HTML结构
结构一：
```html
<ul>
    <li>item1
    </li><li>item2
    </li><li>item3
    </li><li>item4
    </li><li>item5</li>
  </ul>
```
结构二：
```html
<ul>
    <li>item1</li
    ><li>item2</li
    ><li>item3</li
    ><li>item4</li
    ><li>item5</li>
  </ul>
```

## 方法二: 负的margin(margin负值的大小与上下文的字体和文字大小相关)
```css
.demo {
      font-size: 12px;
    }
.demo li {
      margin-right: -4px; 
    }
```
这种解决方法并不完美，如果你的父元素设置的字号不一样，可能你的“-4px”就不能解决问题。况且在Chrome中你需要另外设置一个负的margin值才能实现同等的效果。

## 方法三：设置父元素字体为0 (这样处理在Firexfox,chrome等浏览器下是达到了效果，可是在Safari下可问题依然存在)

```css
.demo {
    font-size: 0px;
}
.demo li {
    font-size: 12px;
}
```
这样处理在Firexfox,chrome等浏览器下是达到了效果，可是在Safari下可问题依然存在

## 使用jquery
```javascript
$('.demo3').contents().filter(function() {
      return this.nodeType === 3;
    }).remove();
```
通过jQuery来改变“nodeType”的值，从而实现我们需要的效果。