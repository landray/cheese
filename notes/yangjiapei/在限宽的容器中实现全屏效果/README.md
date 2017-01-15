# 在限宽的容器中实现全屏效果

假设有这样一个页面结构
```
<div class="main">
    <div class="container">
        <p>....</p>
        <figure class="full-width">
            <img src="" alt="">
        </figure>
        <p>...</p>
    </div>
</div>
```

```css
.container {
    width: 960px;
    margin-left: auto;
    margin-right: auto;
}

.banner .container {
    width: 100%;
}

.banner img {
    width: 100%;
    max-width: 100%
}
```

> 如何让.full-width中的img能实现全屏的效果？？？

## 方法一： 使用translateX 、calc
容器的宽度是960px，全屏的宽度是100vw，他们之间相差就是960px - 100vw， 但我们只需要向左拉出其值的一半，也就是(960px - 100vw) / 2。
```
.full-width {
    width: 100vw;
    transform: translateX(calc(( 960px - 100vw ) / 2));
}
```

## 方法二： margin-left、margin-right
在CSS中margin-left和margin-right取值为负值时，也一样能实现位置变化。这样我们的代码可以调整为：
```css
.full-width {
    margin-left: calc( (960px - 100vw) / 2);
    margin-right: calc( (960px - 100vw) / 2);
}
```
