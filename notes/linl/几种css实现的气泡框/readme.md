

# 圆角(css)

**核心:**

border-radius(含义是"边框半径"),即使元素没有边框，圆角也可以用到 background上面，单位可为;

![border-radius-sh.png](border-radius-sh.png)

**语法:**

```css
border-radius ： none | <length>{1,4} [/ <length>{1,4} ]?
// <length>： 由浮点数字和单位标识符组成的长度值,不可为负值,单位可为：px,em,pt.,ex,%
// 4个圆角分别为 top-left, top-right, bottom-right,bottom-left 
```

**示例:**

```css
border-radius: none;  // 上图1

border-radius: 4px;   // 每个圆角水平半径和垂直半径均为4px,效果上图2
border-radius: 4px 5px;  // top-left、bottom-right的水平和垂直半径为4px, top-right,bottom-left为4px,对角线
border-radius: 4px 5px 6px; // top-left的水平和垂直半径为4px,top-right,bottom-left为4px,bottom-right为6px
order-radius: 4px 5px 6px 7px; // 顺时针依次设置圆角半径

// '/'分开的2组值,第1组表示水平半径，第2组为垂直半径，应用规则和上面相同
border-radius: 4px / 5px;   // 每个圆角水平半径为4px,垂直半径均为5px
border-radius: 15px 5px / 3px; // top-left、bottom-right水平半径为15px, top-right、bottom-left水平半径为5px,4个圆角垂直半径均为3px,依次设置
```

**气泡框实例**：

[气泡框](http://jsbin.com/wudiqozeno/edit?output)