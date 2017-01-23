#CSS-Variables

##变量定义与引用规则

变量定义： `--*`

变量使用： `var(--*)`

```
:root {
    --initFontSize: 30px;
}
h1 {
    font-size: var(--initFontSize)
}
```

自定义变量字符可以由 `0-9 || a-z || A-Z || 下划线_ || 短横线-` 组成，还可以是中文。。。

```
:root {
    --我是中文: 30px;
}
h1 {
    font-size: var(--我是中文)
}
```

##作用域

CSS变量的使用一定要在声明块{}里面，同时{}也是变量的作用域，以下例子是错误的：

```
--initFontSize: 30px; // 错误，不能在{}外
h1 {
    font-size: var(--initFontSize) // 返回浏览器默认值
}
```

```
h1 {
    --initFontSize: 30px; // 作用域只在h1
}
h2 {
    font-size: var(--initFontSize) // 错误，h2返回浏览器默认值
}
```

##缺省值

完整语法 `var(--variable, 20px)` ，其中20px是一个可选属性值，表示当变量 **没有定义时** 所使用的样式值，如果变量的定义与使用场景不匹配（不合法），此时将会返回浏览器对应的默认值。

```
div {
  background-color: var(--color, #eee); // --color未定义，返回#eee
}
```

```
div {
  --color: 30px;
  background-color: var(--color, #eee); // 不合法，返回浏览器默认值transparent
}
```