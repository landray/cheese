# 深拷贝

> 深度优先循环算法

```javascript
/**
 * 深度复制
 * @param {Object|Array} obj 需要复制的对象|数组
 * @return {Object|Array}
 */
function deepCopy(obj) {
  // 复制后的对象|数组
  let newObj = Array.isArray(obj) ? [] : {}
  let srcQueue = [obj]
  let copyQueue = [newObj]
  // 遍历过的对象
  let srcVisited = []
  let copyVisited = []
  // 循环遍历
  while (srcQueue.length) {
    let srcObj = srcQueue.shift()
    let copyObj = copyQueue.shift()

    srcVisited.push(srcObj)
    copyVisited.push(copyObj)

    for (let key in srcObj) {
      // 如果是简单类型,直接赋值复制
      if (typeof srcObj[key] !== 'object') {
        copyObj[key] = srcObj[key]
      } else {
        // 是否在已经遍历过的数组里,是的话为环
        let index = srcVisited.indexOf(srcObj[key])
        if (index >= 0) {
          copyObj[key] = copyVisited[index]
        } else {
          // 如果不是环,增加srcQueue长度继续循环遍历
          copyObj[key] = Array.isArray(srcObj[key]) ? [] : {}
          copyQueue.push(copyObj[key])
          srcQueue.push(srcObj[key])
        }
      }
    }
  }
  return newObj
}
```

```javascript
// 环
var a = {}
a.b = a
```