# 每周分享(2016.12.23)

​	本周分享内容是数组原生方法(不含ES6)

## Array.prototype

### 分类1： 遍历数组

​	应该注意的是，以下几个方法只会遍历数组的可遍历项，例如(以map方法为例)：

```javascript
// 应注意：
var a1 = [,,3].map(function(item, index){
  console.log(index); // 只执行了一次，index = 2
  return item;
});	// a1 = [,,3]

var a2 = [undefined, undefined, 3].map(function(item, index){
  console.log(index); // 输出了3次，index分别是0,1,2
  return item;
}); // a2 = [undefined,undefined,3]
```

#### forEach

​	无返回值，回调第一个参数为数组的每一项，第二个参数为数组的每一项下标，第三个参数为数组本身

```javascript
[5,4,3,2,1].forEach(function(item, index, array){
  console.log(item === array[index]);	// 每一次循环都输出true;
});
```

#### every

​	返回布尔型，回调参数同forEach

​	意义：可以减少循环次数。只有当所有循环的回调函数都返回true时，最后结果才为true，只要有一项返回false，立即返回最后结果false

```javascript
var flag = [5,4,3,2,1].every(function(item, index, array){
  return item === array[index];
});	// flag为true
```

#### some

​	返回布尔型，回调参数同forEach

​	意义：可以减少循环次数。只要某次循环返回true时，立即返回结果true;当所有循环结果都为false时，最后结果才为false

```javascript
var flag = [5,4,3,2,1].some(function(item, index, array){
  return item !== array[index];
});	// flag为false
```

#### filter

​	返回新数组，回调参数同forEach

​	意义：对数组进行筛选，返回满足筛选条件的项组成的新数组

```javascript
var newArr = [5,4,3,2,1].filter(function(item, index, array){
  return item > 3;
});	// newArr = [5,4];
```

#### map

​	返回与源数组相同长度的新数组，回调参数同forEach

​	意义：源数组通过某种映射关系形成一个新的数组

```javascript
var newArr = [5,4,3,2,1].map(function(item, index, array){
  return item * 2;
});	// newArr = [10,8,6,4,2];
```

#### reduce

​	原型：Array.prototype.reduce(callback[, initalVal]);

​	回调参数第一个是累计值，第二个是数组的某一项，第三个是数组某一项的下标，第四个是数组本身，若传initalVal，acc初始值即为initalVal；若不传initalVal，acc初始值为数组第一项，然后数组将从第二项开始遍历	

​	将当前累计值与数组的下一项进行运算，得到结果计入累计值，当数组循环完成时，将累计值作为结果返回

```javascript
var res = [5,4,3,2,1].reduce(function(acc, item, index, array){
  return acc + item;
}, 0); // res = 15; 循环执行次数为5;

var res = [5,4,3,2,1].reduce(function(acc, item, index, array){
  return acc + item;
}); // res = 15; 循环执行次数为4;
```



### 分类2： 模拟栈与队列 

​	使用push和pop可以构造后进先出的栈模型，shift和unshift类同

​	使用push和shift可以构造先进先出的队列模型，pop和unshift类同

#### push

​	返回现数组长度，可同时添加多项，添加到数组末尾

#### unshift

​	返回现数组长度，可同时添加多项，添加到数组开头

#### pop

​	返回被弹出的元素，数组长度-1，被弹出的元素为数组末尾的元素

#### shift

​	返回被弹出的元素，数组长度-1，被弹出的元素为数组开头的元素

### 分类3： 常用方法

#### concat

​	返回新数组，不影响原数组。

#### join

​	返回数组元素+分隔符组成的字符串，不影响原数组。默认使用逗号分隔

```javascript
var arr = [1,2,[3,4,[5]]];
console.log(arr.join() === arr.join(','));	// true
console.log(arr.join() === arr.toString());	// true
console.log(arr.join('-'));	// 需要注意的是数组嵌套的情况，1-2-3,4,5

// 使用此方法是将数组组成字符串，所以数组相应项是调用toString()后输出的，
// 例： 数组arr中数组的数据项是数字类型
console.log(arr);	// [1,2,[3,4,[5]]]
console.log(arr.join());	// 1,2,3,4,5
console.log(arr.join().split(','));	// ['1','2','3','4','5']
```

#### indexOf与lastIndexOf

​	indexOf: 从数组第一项开始往最后一项搜寻匹配项，若找到，立即返回相应的下标位置，否则返回-1;

​	lastIndexOf: 从数组最后一项开始往第一项搜寻匹配项，若找到，立即返回相应的下标位置，否则返回-1;

```javascript
var arr = [1,2,3,2,1];
console.log(arr.indexOf(2));	// 1
console.log(arr.lastIndexOf(2));	// 3
console.log(arr.indexOf(4));	// -1
console.log(arr.lastIndexOf(4));	// -1
```

#### slice

​	与String的slice方法类同，Array.prototype.slice([startIndex[, endIndex]])

​	返回新数组，不影响旧数组。返回从旧数组的startIndex下标开始，到endIndex-1下标(包含)为止的所有项组成的新数组。

​	startIndex需小于endIndex，否则返回空数组

​	若endIndex不传，则默认直到数组末尾

​	若不传参数，则默认从下标0直至数组末尾

​	若参数为负数，则会先被替换为数组长度+负数

```javascript
var arr = [1,2,3,4,5];
console.log(arr.slice());	// [1,2,3,4,5]
console.log(arr.slice(1));	// [2,3,4,5]
console.log(arr.slice(-1));	// [5]
console.log(arr.slice(2,4));	// [3,4]
console.log(arr.slice(2,-1));	// [3,4]
```

​	此方法还有一个比较常用的场景是将一个类数组转换成数组，例:

```javascript
function sthFn() {
  var args = Array.prototype.slice.call(arguments);
  console.log(args);	// 参数数组
}
```

#### splice

​	Array.prototype.splice(index, delCount, ...newData)

​	从数组的下标index开始，删除delCount个项目，并将newData插入到index位置

​	返回被删除项目组成的数组，该方法会修改源数组

```javascript
var arr = [1,2,3,4,5];
var rmData = arr.splice(2,2,'0');
console.log(rmData);	// [3,4]
console.log(arr);	// [1,2,'0',5]
arr.splice(3,1);	// 只删除，不插入数组
console.log(arr);	// [1,2,'0']
arr.splice(1);		// 删除从下标1开始至数组末尾的所有数据
console.log(arr);	// [1]
arr.splice(1,0,2,3);// 将2,3插入到数组下标1的位置
console.log(arr);	// [1,2,3]
```

#### reverse

​	数组逆序，数组第一项和最后一项交换，第二项和倒数第二项交换，以此类推。

​	该方法会影响源数组

```javascript
var arr = [1,2,3,4,5];
arr.reverse();
console.log(arr);	// [5,4,3,2,1];

var str = 'hello world';
// 将字符串中的单词逆序
console.log(str.split(' ').reverse().join(' '));	// 	"world hello"
// 将字符串中的单词内部逆序，单词位置不变
console.log(str.split('').reverse().join('').split(' ').reverse().join(' '));	// "olleh dlrow"
```

#### sort

​	对数组按照指定方法进行排序。

​	该方法会改变源数组

```javascript
var arr = [1,23,12,4,5,556,622,11];
arr.sort();	// 默认根据unicode码排序
console.log(arr); // [1, 11, 12, 23, 4, 5, 556, 622]
arr.sort(function(a,b){return a>b;});	// 升序排序
console.log(arr); // [1, 4, 5, 11, 12, 23, 556, 622]
arr.sort(function(a,b){return a<b;});	// 降序排序
console.log(arr); // [622, 556, 23, 12, 11, 5, 4, 1]
```





