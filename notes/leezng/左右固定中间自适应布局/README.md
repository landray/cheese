# 左右固定宽度，中间自适应布局

## 利用 float 实现

```css
.box-1 {
  overflow: hidden;
}
.box-1 .left {
  float: left;
  width: 100px;
}
.box-1 .center {
  margin: 0 100px;
}
.box-1 .right {
  float: right;
  width: 100px;
}
```

## 利用 float 实现 中间优先渲染 (圣杯布局)

```css
.box-2 {
  overflow: hidden;
}
.box-2 .center {
  float: left;
  width: 100%;
}
.box-2 .left {
  float: left;
  width: 100px;
  margin-left: -100%;
}
.box-2 .right {
  float: left;
  width: 100px;
  margin-left: -100px;
}
```

## 利用 absolute 实现

附：absolute做中间优先渲染也是很方便的

```css
.box-3 {
  position: relative;
  overflow: hidden;
}
.box-3 .left {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
}
.box-3 .center {
  margin: 0 100px;
}
.box-3 .right {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
}
```

## 利用 table 实现

```css
.box-4 {
  display: table;
  width: 100%;
  table-layout: fixed
}
.box-4 div { 
  display: table-cell;
}
.box-4 .left { 
  width: 100px;
}
.box-4 .right { 
  width: 100px; 
}
```

## 利用 flex 实现

```css
.box-5 {
  display: flex;
}
.box-5 .left {
  width: 100px;
}
.box-5 .center {
  flex: 1;
}
.box-5 .right {
  width: 100px;
}
```
