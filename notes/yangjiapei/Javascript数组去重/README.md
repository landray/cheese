# Javascript 数组去重

## 1、[Array.prototype.indexOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

```js
    function unique (arr) {
        var newArr = [];
        arr.forEach(function (item) {
            if (newArr.indexOf(item) === -1) {
                newArr.push(item);
            }
        });
        return newArr;
    }
```

> [indexOf 使用的是严格比较 ===](http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.indexof)

### ES2015/ES6定义了四种相等性判断算法
- [Abstract Equality Comparison(==)](http://www.ecma-international.org/ecma-262/6.0/#sec-abstract-equality-comparison)
- [Strict Equality Comparison(===)](http://www.ecma-international.org/ecma-262/6.0/#sec-strict-equality-comparison)
- [SameValue(同值相等)](http://www.ecma-international.org/ecma-262/6.0/#sec-samevalue)
- [SameValueZero(零值相等)](http://www.ecma-international.org/ecma-262/6.0/#sec-samevaluezero)

### [Strict Equality Comparison(===)](http://www.ecma-international.org/ecma-262/6.0/#sec-strict-equality-comparison) 

```js
1.If Type(x) is Number, then
    a.If x is NaN, return false.
    b.If y is NaN, return false.
    c.If x is the same Number value as y, return true.
    d.If x is +0 and y is −0, return true.
    e.If x is −0 and y is +0, return true.
    f.Return false.
```

这意味着任何涉及到NaN的情况都不能简单地使用比较运算来判定是否相等。比较科学的方法只能是使用isNaN()。

> 所以，indexOf 不能处理NaN的相等性判断。

```js
    var arr = [1, 2, 3, 4, 4, 2, NaN, 3, 5, NaN];
    unique(arr);      // [1, 2, 3, 4, NaN, 5, NaN]
```

## 2、[Array.prototype.includes()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
`Array.prototype.includes()`是ES2016中新增的方法，用于判断数组中是否包含某个元素，所以上面使用indexOf()方法的第二个版本可以改写成如下版本：

```js
    function unique (arr) {
        var newArr = [];
        arr.forEach(function (item) {
            if (!newArr.includes(item)) {
                newArr.push(item);
            }
        });
    }
```

includes()又是用什么方法来比较的呢？它跟indexOf()不同，它使用的是另外一种方法，叫做["SameValueZero"](https://tc39.github.io/ecma262/2016/#sec-array.prototype.includes),可以看一下它的[规范](https://tc39.github.io/ecma262/2016/#sec-samevaluezero)。

```js
1、If Type(x) is Number, then
    a.If x is NaN and y is NaN, return true.
    b.If x is +0 and y is -0, return true.
    c.If x is -0 and y is +0, return true.
    d.If x is the same Number value as y, return true.
    e.Return false.
```

我们可以验证一下
```js
var arr = [1,2,3, NaN];
arr.indexOf(NaN);    // -1
arr.includes(NaN);   // true
```

## 3、[Set实现](http://es6.ruanyifeng.com/#docs/set-map)

> 使用es6新增的`Array.from()` 和 `new Set()` 

```js
    function unique (arr) {
        return Array.from(new Set(arr));
    }
```

Set内部判断两个值是否不同，使用的算法叫做Same-value equality
