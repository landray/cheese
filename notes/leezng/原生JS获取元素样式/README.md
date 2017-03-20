# 原生JS获取或设置元素样式的方法

## element.style

```js
$0.style
// return $0 html结构直接样式
```

例如在 `<div style="color: black;"></div>` 中， `$0.style.color` 将返回 `"black"` ，如果在样式表中，该 div 同时存在其他样式 `position: "relative;"` ，使用 style 方法是无法获取到的。

该方法可读可写，例如通过 `$0.style.display = "table"` 可以为其添加或修改 `display` 的属性值为 `table` 。

## window.getComputedStyle

```js
window.getComputedStyle(element, [pseudoElement])
// 参数1为dom元素(必选)，参数2为伪元素(可选)
// return $0 所有最终应用的样式
```

该方法是只读的(只能获取)，不可写(不能设置样式)。在 `getComputedStyle` 获取计算样式中，同样以上例， `getComputedStyle` 将返回当前 `div` 所有最终使用的样式结果，该结果可参照 chrome 控制台中 Styles 中列出的结果。该方法只能作用与 IE9 及以上的现代浏览器，IE9以下使用 `currentStyle` 代替。

```js
window.getComputedStyle($0).position // return "relative"
window.getComputedStyle($0).color // return "black"
window.getComputedStyle($0, ':after').color // return $0:after的计算样式
```

## element.currentStyle

这是IE浏览器独有的一个 API，实现效果类似于 `getComputedStyle` ，但使用类似于 `style` 。不同的是，它无法实现对伪元素样式的获取。

```js
$0.currentStyle.position // return "relative"
```

## cssText

这种方法的实现效果类似于设置 element 的 `style` 属性，它是一个销毁后重建的过程。在下例中，

```js
$0.style.cssText = 'display: block; position: relative;'
```



