# vue-loader的一些被忽略的可选项

## 1. preserveWhitespace

- 类型: **Boolean**
- 默认: **true**

> 当设置为false时，模板html标签之间的空格会被忽略掉

模板内容较多时占用一部分体积，设置为false阻止元素间生成空白内容，减少体积

```vue
<teamplate>
  <ul>
    <li>1111</li>
    <li>2222</li>
  </ul>
</teamplate>
```

```javascript
// webpack 1.x
{
  entry: ...
  module: {
    loaders: [
      {
        // vue-loader
        test: /\.vue$/,
        loader: 'vue'
      }
    ],
    vue: {
      preserveWhitespace: false
    }
  },
}
```
```javascript
// webpack 2.x
{
  module: {
    rules: [
      {
        // vue-loader
        test: /\.vue$/,
        loader: 'vue',
        options: {
          preserveWhitespace: false
        }
      }
    ]
  }
}
```



## 2. transformToRequire

```vue
<template>
  <div>
    <image-preview :img-src="imgSrc"></image-preview>
  </div>
</template>

<script>
  export default {
    created () {
      this.imgSrc = require('./assets/default-avatar.png')
    }
  }
</script>
```

- 类型: **{ [tag: string]: string | Array\<string\> }**
- 默认: **{ img: 'src', image: 'xlink:href' }**

> 当模板编译的时候，会把一些标签属性，例如 **src** URLs转变成 **require** 来引入，这样子会让webpack来处理这些静态资源。
>
> 比如 **\<img\>** 标签的 **src** 属性， SVG **\<image\>** 标签的 **xlink:href** 属性

```vue
<template>
  <div>
    <image-preview :img-src="./assets/default-avatar.png"></image-preview>
    <img src="" />
  </div>
</template>
```

```javascript
// webpack 1.x
{
  vue: {
    transformToRequire: {
      'image-preview': ['img-src']
    }
  }
}
```
```javascript
// webpack 2.x
{
  module: {
    rules: [
      {
        // vue-loader
        test: /\.vue$/,
        loader: 'vue',
        options: {
          transformToRequire: {
            'image-preview': ['img-src']
          }
        }
      }
    ]
  }
}
```



## 3. Custom Blocks

> vue-loader 10.2.0+

可以在 ***.vue** 文件中自定义一个语言块标签，这个标签里面的内容会被 **vue-loader** 的选项 **loaders** 对象中匹配的loader处理

如果**loaders** 对象没有匹配的loader时，这个自定义语言块会被vue-loader忽略掉

```vue
<docs>
## This is an Example component.
</docs>

<template>
  <h2 class="red">{{msg}}</h2>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello from Component A!'
    }
  }
}
</script>

<style>
comp-a h2 {
  color: #f00;
}
</style>
```
```javascript
// webpack 1.x
var ExtractTextPlugin = require("extract-text-webpack-plugin")
{
  vue: {
    loaders: {
      'docs': ExtractTextPlugin.extract('raw-loader'),
    }
  },
  plugins: [
    // output all docs into a single file
    new ExtractTextPlugin('docs.md')
  ]
}
```
```javascript
// Webpack 2.x
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue',
        options: {
          loaders: {
            // extract all <docs> content as raw text
            'docs': ExtractTextPlugin.extract('raw-loader'),
          }
        }
      }
    ],
    plugins: [
      // output all docs into a single file
      new ExtractTextPlugin('docs.md')
    ]
  }
}
```

这个还有点问题……自己测试的时候不能正常使用

# 如何写一个 webpack loader

```javascript
//  a.text
{
 "a": 1
}
// text-loader.js
module.exports = function (source) {
  this.cacheable && this.cacheable()
  this.value = source
  // 内容处理...
  return "module.exports = " + source
}
```

```javascript
// webpack
var textLoader = path.join(__dirname, 'text-loader')
{
  module: {
    loaders | rules: [
      {
        test: /\.txt$/,
        loader: textLoader
      }
    ]
  }
}
```

```javascript
const loaderUtils = require('loader-utils')
```

[loader-utils]: https://github.com/webpack/loader-utils